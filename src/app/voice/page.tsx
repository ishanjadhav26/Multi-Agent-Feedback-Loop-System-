'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import VoiceOrb from '@/components/VoiceOrb';
import WaveformVisualizer from '@/components/WaveformVisualizer';
import TranscriptPanel from '@/components/TranscriptPanel';
import { staticQuestions, studentPersonas, getRandomPersona } from '@/data/staticQuestions';
import { personas, detectPersona, TranscriptMessage as PMessage } from '@/data/personas';

// ── Types ────────────────────────────────────────────────────────────────────
type CallStatus = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'ended';

interface TEntry {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  agents?: { agent: string; message: string }[];
}

// Speech Recognition type shim (works in Chrome/Edge)
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: ISpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((e: ISpeechRecognitionErrorEvent) => void) | null;
}

interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionResultList {
  length: number;
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognitionConstructor {
  new(): ISpeechRecognition;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function ts() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function getSR(): ISpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function VoicePage() {
  const router = useRouter();

  const [status, setStatus] = useState<CallStatus>('idle');
  const [transcript, setTranscript] = useState<TEntry[]>([]);
  const [liveText, setLiveText] = useState('');
  const [duration, setDuration] = useState(0);
  const [exchanges, setExchanges] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>(getRandomPersona());

  // Mutable refs — never stale in callbacks
  const statusRef = useRef<CallStatus>('idle');
  const mutedRef = useRef(false);
  const liveRef = useRef('');
  const recRef = useRef<ISpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const historyRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const transcriptRef = useRef<TEntry[]>([]);
  const durationRef = useRef(0);
  const exchangesRef = useRef(0);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // "Latest ref" pattern — stable function references updated every render
  const startListeningRef = useRef<() => void>(() => { });
  const handleUserInputRef = useRef<(text: string) => Promise<void>>(async () => { });
  const endCallRef = useRef<() => void>(() => { });

  // Sync state → refs
  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { mutedRef.current = isMuted; }, [isMuted]);
  useEffect(() => { transcriptRef.current = transcript; }, [transcript]);
  useEffect(() => { durationRef.current = duration; }, [duration]);
  useEffect(() => { exchangesRef.current = exchanges; }, [exchanges]);

  // Timer
  useEffect(() => {
    if (status !== 'idle' && status !== 'ended') {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  // Core functions assigned into refs (always fresh, no stale closures)
  useEffect(() => {
    endCallRef.current = () => {
      if (statusRef.current === 'ended') return;
      statusRef.current = 'ended';
      setStatus('ended');
      try { recRef.current?.abort(); } catch { /* ignore */ }
      if (audioRef.current) audioRef.current.pause();
      if (timerRef.current) clearInterval(timerRef.current);

      const sessionData = {
        id: Date.now().toString(),
        date: new Date().toLocaleString(),
        transcript: transcriptRef.current,
        duration: durationRef.current,
        exchanges: exchangesRef.current,
      };

      // Store current session for Summary page
      sessionStorage.setItem('voiceai_session', JSON.stringify(sessionData));

      // Append to global sessions for Admin dashboard
      const stored = localStorage.getItem('voiceai_sessions');
      const sessions = stored ? JSON.parse(stored) : [];
      sessions.push(sessionData);
      localStorage.setItem('voiceai_sessions', JSON.stringify(sessions));

      setTimeout(() => router.push('/summary'), 1500);
    };

    handleUserInputRef.current = async (text: string) => {
      liveRef.current = '';
      setLiveText('');
      setStatus('processing');
      statusRef.current = 'processing';

      const userEntry: TEntry = { role: 'user', content: text, timestamp: ts() };
      setTranscript(p => {
        const next = [...p, userEntry];
        transcriptRef.current = next;
        return next;
      });
      historyRef.current.push({ role: 'user', content: text });

      try {
        let aiResponse = '';
        let aiAgents = undefined;

        // Auto Persona Detection
        const detectedKey = detectPersona(text);
        if (detectedKey && personas[detectedKey]) {
          const personaData = personas[detectedKey];
          aiAgents = personaData.transcript.map(m => ({ agent: m.agent, message: m.message }));
          aiResponse = aiAgents.map(a => a.message).join(' ... ');
        } else {
          // Check static questions match
          const staticMatch = staticQuestions.find(q => q.question.toLowerCase() === text.trim().toLowerCase());

          if (staticMatch) {
            await new Promise(r => setTimeout(r, 600)); // Simulate processing delay
            aiResponse = staticMatch.answer;
            aiAgents = staticMatch.agents;
          } else {
            const agentRes = await fetch('/api/agent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text, history: historyRef.current.slice(-10), persona: selectedPersona }),
            });
            if (!agentRes.ok) {
              const err = await agentRes.json();
              throw new Error(err.error || 'Agent failed');
            }
            const data = await agentRes.json();
            aiResponse = data.answer || data.response; // Fallback for safety
            aiAgents = data.agents;
          }
        }

        const aiEntry: TEntry = { role: 'assistant', content: aiResponse, timestamp: ts(), agents: aiAgents };
        setTranscript(p => {
          const next = [...p, aiEntry];
          transcriptRef.current = next;
          return next;
        });
        historyRef.current.push({ role: 'assistant', content: aiResponse });
        setExchanges(e => {
          const n = e + 1;
          exchangesRef.current = n;
          return n;
        });

        setStatus('speaking');
        statusRef.current = 'speaking';

        // TTS: try ElevenLabs, fallback to Web Speech API
        const speakWithBrowserTTS = (text: string) => {
          return new Promise<void>((resolve) => {
            if (mutedRef.current) { resolve(); startListeningRef.current(); return; }
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-US';
            utter.rate = 0.95;
            utter.pitch = 1.0;
            utter.volume = 1.0;
            // pick a decent voice
            const voices = window.speechSynthesis.getVoices();
            const preferred = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'));
            if (preferred) utter.voice = preferred;
            utter.onend = () => { resolve(); setTimeout(() => startListeningRef.current(), 150); };
            utter.onerror = () => { resolve(); setTimeout(() => startListeningRef.current(), 150); };
            window.speechSynthesis.speak(utter);
          });
        };

        try {
          const ttsRes = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: aiResponse }),
          });

          if (!ttsRes.ok) {
            await speakWithBrowserTTS(aiResponse);
          } else {
            const contentType = ttsRes.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              // fallback signal from server
              await speakWithBrowserTTS(aiResponse);
            } else {
              // real audio blob from ElevenLabs
              const blob = await ttsRes.blob();
              const url = URL.createObjectURL(blob);
              if (audioRef.current) audioRef.current.pause();
              const audio = new Audio(url);
              audioRef.current = audio;
              audio.muted = mutedRef.current;
              audio.onended = () => { URL.revokeObjectURL(url); setTimeout(() => startListeningRef.current(), 150); };
              audio.onerror = () => { URL.revokeObjectURL(url); speakWithBrowserTTS(aiResponse); };
              try { await audio.play(); } catch { await speakWithBrowserTTS(aiResponse); }
            }
          }
        } catch {
          await speakWithBrowserTTS(aiResponse);
        }

      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        if ((statusRef.current as CallStatus) !== 'ended') {
          setTimeout(() => startListeningRef.current(), 150);
        }
      }
    };

    startListeningRef.current = () => {
      if (statusRef.current === 'ended') return;
      setStatus('listening');
      statusRef.current = 'listening';
      liveRef.current = '';
      setLiveText('');

      const SR = getSR();
      if (!SR) {
        setError('Speech recognition not supported. Please use Chrome or Edge.');
        return;
      }

      if (recRef.current) {
        recRef.current.onresult = null;
        recRef.current.onend = null;
        recRef.current.onerror = null;
        try { recRef.current.abort(); } catch { /* ignore */ }
      }

      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      recRef.current = rec;

      const resetSilenceTimer = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          if (recRef.current && statusRef.current === 'listening') {
            try { recRef.current.stop(); } catch { /* ignore */ }
          }
        }, 2500);
      };

      rec.onresult = (e: ISpeechRecognitionEvent) => {
        let final = '';
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const t = e.results[i][0].transcript;
          if (e.results[i].isFinal) final += t;
          else interim += t;
        }
        const captured = final || interim;
        liveRef.current = captured;
        setLiveText(captured);
        
        if (captured.trim()) {
          resetSilenceTimer();
        }
      };

      rec.onend = () => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        const captured = liveRef.current.trim();
        if (captured && statusRef.current === 'listening') {
          handleUserInputRef.current(captured);
        } else if (statusRef.current === 'listening') {
          setTimeout(() => startListeningRef.current(), 100);
        }
      };

      rec.onerror = (e: ISpeechRecognitionErrorEvent) => {
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (e.error === 'no-speech' && statusRef.current === 'listening') {
          setTimeout(() => startListeningRef.current(), 100);
        } else if (e.error === 'not-allowed') {
          setError('Microphone access denied. Please allow mic access and try again.');
          endCallRef.current();
        } else if (statusRef.current === 'listening') {
          // Recover from any other errors (like network/aborted) to keep listening infinitely
          setTimeout(() => startListeningRef.current(), 500);
        }
      };

      const startMic = (retries = 3) => {
        try {
          rec.start();
        } catch (e) {
          if (retries > 0) {
            setTimeout(() => startMic(retries - 1), 300);
          } else {
            console.error('Failed to start mic after retries', e);
            // If it completely fails, we can try to recover one last time
            setTimeout(() => startListeningRef.current(), 1000);
          }
        }
      };
      startMic();
    };
  }, [router]);

  // ── Public handlers ───────────────────────────────────────────────────────
  const startCall = () => {
    setStatus('connecting');
    statusRef.current = 'connecting';
    setTranscript([]);
    setDuration(0);
    setExchanges(0);
    setError('');
    historyRef.current = [];
    transcriptRef.current = [];
    durationRef.current = 0;
    exchangesRef.current = 0;

    // Load full persona transcript if one matches selectedPersona
    const personaKey = selectedPersona.toLowerCase().replace(/ /g, '-');
    if (personas[personaKey]) {
      const pData = personas[personaKey];
      const aiAgents = pData.transcript.map(m => ({ agent: m.agent, message: m.message }));
      const aiResponse = aiAgents.map(a => a.message).join(' ... ');
      
      const aiEntry: TEntry = { 
        role: 'assistant', 
        content: aiResponse, 
        timestamp: ts(), 
        agents: aiAgents 
      };
      
      setTranscript([aiEntry]);
      transcriptRef.current = [aiEntry];
      setExchanges(1);
      exchangesRef.current = 1;
    }

    setTimeout(() => startListeningRef.current(), 2000);
  };

  const endCall = () => endCallRef.current();

  const resetCall = () => {
    setStatus('idle');
    statusRef.current = 'idle';
    setTranscript([]);
    setDuration(0);
    setExchanges(0);
    setError('');
    liveRef.current = '';
    setLiveText('');
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    mutedRef.current = next;
    if (audioRef.current) audioRef.current.muted = next;
  };

  const stopSpeaking = () => {
    if (statusRef.current !== 'speaking') return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    window.speechSynthesis.cancel();
    setTimeout(() => startListeningRef.current(), 150);
  };

  const loadVerifiedSession = () => {
    setStatus('connecting');
    const pData = personas['verified-session'];
    const aiAgents = pData.transcript.map(m => ({ agent: m.agent, message: m.message }));
    const aiResponse = aiAgents.map(a => a.message).join(' ... ');
    
    const aiEntry: TEntry = { 
      role: 'assistant', 
      content: aiResponse, 
      timestamp: ts(), 
      agents: aiAgents 
    };
    
    setTranscript([aiEntry]);
    transcriptRef.current = [aiEntry];
    setExchanges(1);
    exchangesRef.current = 1;
    setStatus('ended'); // Show it as a completed session view
  };

  const downloadTranscript = () => {
    const textContent = transcript.map(entry => {
      if (entry.agents) {
        return entry.agents.map(a => `${a.agent === 'Therapist' ? '🩺 Therapist' : '🎓 Student'}: ${a.message}`).join('\n');
      }
      return `${entry.role === 'user' ? '👤 User' : '🤖 AI'}: ${entry.content}`;
    }).join('\n\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `therapy_session_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const isActive = status !== 'idle' && status !== 'ended';

  const statusLabel: Record<CallStatus, string> = {
    idle: 'Ready to connect',
    connecting: 'Calling AI Assistant…',
    listening: 'Listening… speak now',
    processing: 'AI is thinking…',
    speaking: 'AI is responding…',
    ended: 'Call ended…',
  };

  const pillBg: Record<CallStatus, string> = {
    idle: '#F9FAFB', connecting: '#EEF2FF', listening: '#EEF2FF',
    processing: '#F5F0FF', speaking: '#F0FDF4', ended: '#F3F4F6',
  };

  const dotColor: Record<CallStatus, string> = {
    idle: '#D1D5DB', connecting: '#3B82F6', listening: '#2D68FF',
    processing: '#B439FF', speaking: '#22C55E', ended: '#9CA3AF',
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 20%, rgba(45,104,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(180,57,255,0.06) 0%, transparent 50%)',
      }} />
      <Navbar />

      <main style={{
        position: 'relative', zIndex: 1, maxWidth: 920, margin: '0 auto',
        padding: '88px 24px 40px', display: 'flex', flexDirection: 'column', gap: 20,
      }}>
        {/* Header bar */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#2D68FF,#B439FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#111216' }}>AI Therapy Session</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>Therapist ↔ Student · {selectedPersona}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {isActive && <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: '#2D68FF', letterSpacing: 2 }}>{fmt(duration)}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: pillBg[status], border: '1px solid #E5E7EB' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: dotColor[status], animation: isActive ? 'pulse-glow 2s infinite' : 'none' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{statusLabel[status]}</span>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20 }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: '44px 24px 52px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
              <VoiceOrb status={status} onClick={status === 'idle' ? startCall : undefined} />
              <div style={{ marginTop: 52, width: '100%' }}>
                <WaveformVisualizer active={status === 'listening' || status === 'speaking'} color={status === 'speaking' ? '#22C55E' : '#2D68FF'} />
              </div>
            </div>

            <div style={{ 
              position: 'sticky', 
              bottom: 20, 
              zIndex: 50,
              background: 'rgba(255, 255, 255, 0.9)', 
              backdropFilter: 'blur(8px)',
              border: '1px solid #E5E7EB', 
              borderRadius: 14, 
              padding: '16px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)' 
            }}>
              {status === 'idle' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <button onClick={startCall} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,#2D68FF,#B439FF)', color: '#fff', border: 'none', borderRadius: 11, fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 16px rgba(45,104,255,0.3)' }}>
                    🎙️ Start Voice Call
                  </button>
                  <button onClick={loadVerifiedSession} style={{ width: '100%', padding: '12px', background: '#F0F9FF', color: '#0369A1', border: '1px solid #B9E6FE', borderRadius: 11, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    📋 View AI-Verified Full Transcript
                  </button>
                </div>
              )}
              {status === 'ended' && (
                <button onClick={resetCall} style={{ width: '100%', padding: '13px', background: '#111216', color: '#fff', border: 'none', borderRadius: 11, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                  🔄 New Call
                </button>
              )}
              {(isActive || status === 'ended') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={toggleMute} style={{ flex: 1, padding: '11px', background: isMuted ? '#FEF2F2' : '#F9FAFB', border: `1px solid ${isMuted ? '#FECACA' : '#E5E7EB'}`, color: isMuted ? '#EF4444' : '#374151', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                      {isMuted ? '🔇 Unmute' : '🔈 Mute'}
                    </button>
                    <button onClick={endCall} style={{ flex: 1, padding: '11px', background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                      📵 End Call
                    </button>
                  </div>
                  {status === 'speaking' && (
                    <button onClick={stopSpeaking} style={{ width: '100%', padding: '11px', background: '#FFFBEB', border: '1px solid #FDE68A', color: '#D97706', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}>
                      ⏹️ Stop Speaking
                    </button>
                  )}
                  {transcript.length > 0 && (
                    <button onClick={downloadTranscript} style={{ width: '100%', padding: '11px', background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                      📥 Download Transcript
                    </button>
                  )}
                </div>
              )}
            </div>

            {isActive && (
              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '16px 18px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {([['Duration', fmt(duration)], ['Exchanges', String(exchanges)], ['Agents Active', '2']] as [string, string][]).map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #F9FAFB' }}>
                    <span style={{ fontSize: 13, color: '#6B7280' }}>{l}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#111216' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {liveText && status === 'listening' && (
              <div style={{ background: 'linear-gradient(135deg,#EEF2FF,#F5F0FF)', border: '1px solid #C7D7FE', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#2D68FF', fontStyle: 'italic', lineHeight: 1.6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 3, color: '#7C3AED' }}>🎙️ LIVE</span>
                &ldquo;{liveText}&rdquo;
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111216' }}>Live Transcript</h3>
              {transcript.length > 0 && (
                <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', background: '#F3F4F6', padding: '3px 8px', borderRadius: 100 }}>{transcript.length} messages</span>
              )}
            </div>

            <TranscriptPanel entries={transcript} isProcessing={status === 'processing'} />

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: '11px 14px', fontSize: 13, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚠️ {error}
                <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 16 }}>×</button>
              </div>
            )}

            {status === 'idle' && (
              <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '30px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🩺</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111216', marginBottom: 6 }}>AI Therapy Simulator</h3>
                  <p style={{ fontSize: 13, color: '#6B7280' }}>Choose a student persona then start the session.</p>
                </div>

                {/* Persona Selector */}
                <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Select Student Persona</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 18 }}>
                  {studentPersonas.map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPersona(p)}
                      style={{
                        padding: '7px 13px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                        background: selectedPersona === p ? 'linear-gradient(135deg,#2D68FF,#B439FF)' : '#F3F4F6',
                        color: selectedPersona === p ? '#fff' : '#374151',
                        border: selectedPersona === p ? 'none' : '1px solid #E5E7EB',
                        boxShadow: selectedPersona === p ? '0 4px 12px rgba(45,104,255,0.3)' : 'none',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Quick Start Scenarios</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', paddingRight: 4 }}>
                  {staticQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (status === 'idle') {
                          setSelectedPersona(q.persona || selectedPersona);
                          startCall();
                          setTimeout(() => handleUserInputRef.current(q.question), 2500);
                        }
                      }}
                      style={{
                        textAlign: 'left', background: '#FAFAFA', border: '1px solid #F3F4F6',
                        padding: '10px 14px', borderRadius: 10, fontSize: 13, color: '#374151',
                        cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#EEF2FF';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#C7D7FE';
                        (e.currentTarget as HTMLButtonElement).style.color = '#2D68FF';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = '#FAFAFA';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = '#F3F4F6';
                        (e.currentTarget as HTMLButtonElement).style.color = '#374151';
                      }}
                    >
                      <span style={{ fontSize: 10, display: 'block', color: '#B439FF', fontWeight: 700, marginBottom: 2, textTransform: 'uppercase' }}>{q.persona}</span>
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
