'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import WaveBackground from '@/components/WaveBackground';

interface TEntry { role: 'user' | 'assistant'; content: string; timestamp: string; }
interface SessionData { transcript: TEntry[]; duration: number; exchanges: number; startedAt: string; }

function fmt(s: number) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }

const INSIGHTS_TEMPLATES = [
  '🧠 Dual-agent system improved response quality through critique and refinement.',
  '⚡ Average response generated in under 3 seconds using GPT-4o Mini.',
  '🔊 All responses synthesized using ElevenLabs ultra-realistic voice.',
  '🔄 Agent 2 reviewed every draft ensuring accuracy and completeness.',
];

export default function SummaryPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('voiceai_session');
      if (raw) setSession(JSON.parse(raw));
    } catch { /* ignore */ }
    setTimeout(() => setVisible(true), 100);
  }, []);

  const noSession = !session || session.transcript.length === 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <WaveBackground />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '104px 24px 60px' }}>

        {/* Hero banner */}
        <div style={{
          background: 'linear-gradient(135deg, #2D68FF 0%, #B439FF 60%, #524161 100%)',
          borderRadius: 20, padding: '36px 40px', marginBottom: 28,
          position: 'relative', overflow: 'hidden',
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>✅</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.5px' }}>Session Complete!</h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
              {noSession ? 'No session data found.' : `Started ${session.startedAt} · ${session.exchanges} exchange${session.exchanges !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>

        {noSession ? (
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '48px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111216', marginBottom: 8 }}>No Session Found</h3>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Start a voice call first to see your session summary here.</p>
            <Link href="/voice" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              🎙️ Start a Call
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
              opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.1s',
            }}>
              {[
                { icon: '⏱️', label: 'Duration', value: fmt(session.duration), color: '#2D68FF' },
                { icon: '💬', label: 'Exchanges', value: String(session.exchanges), color: '#B439FF' },
                { icon: '🤖', label: 'AI Agents', value: '2 Used', color: '#22C55E' },
                { icon: '🔊', label: 'Voice Engine', value: 'ElevenLabs', color: '#FB7118' },
              ].map(stat => (
                <div key={stat.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '18px 16px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{stat.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Key Insights */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.15s' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111216', marginBottom: 16 }}>✨ Key Insights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INSIGHTS_TEMPLATES.map((insight, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: i % 2 === 0 ? '#F8FAFF' : '#F9F5FF', borderRadius: 10, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
                    {insight}
                  </div>
                ))}
              </div>
            </div>

            {/* Last AI Response */}
            {session.transcript.filter(e => e.role === 'assistant').length > 0 && (
              <div style={{ background: 'linear-gradient(135deg,#F0F4FF,#F5F0FF)', border: '1px solid #C7D7FE', borderRadius: 16, padding: '24px', opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.2s' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111216', marginBottom: 12 }}>🤖 Final AI Response</h3>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
                  {session.transcript.filter(e => e.role === 'assistant').at(-1)?.content}
                </p>
              </div>
            )}

            {/* Full Transcript */}
            <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.25s' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111216', marginBottom: 16 }}>📋 Full Transcript</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 400, overflowY: 'auto' }}>
                {session.transcript.map((entry, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: entry.role === 'user' ? 'row-reverse' : 'row', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: entry.role === 'user' ? 'linear-gradient(135deg,#111216,#374151)' : 'linear-gradient(135deg,#2D68FF,#B439FF)' }}>
                      {entry.role === 'user' ? '👤' : '🤖'}
                    </div>
                    <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: entry.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: entry.role === 'user' ? '#111216' : '#F3F4F6', color: entry.role === 'user' ? '#fff' : '#111216', fontSize: 13, lineHeight: 1.6 }}>
                      {entry.content}
                      {entry.timestamp && <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4 }}>{entry.timestamp}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', paddingTop: 8, opacity: visible ? 1 : 0, transition: 'all 0.5s ease 0.3s' }}>
              <Link href="/voice" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#000', color: '#fff', padding: '13px 28px', borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                🎙️ New Voice Call
              </Link>
              <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E5E7EB', color: '#111216', padding: '13px 28px', borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                📊 Dashboard
              </Link>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
