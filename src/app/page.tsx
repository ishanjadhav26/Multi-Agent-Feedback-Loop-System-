'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import StarBackground from '@/components/StarBackground';

const FEATURES = [
  { icon: '🎙️', title: 'Natural Voice Input', desc: 'Speak naturally — real-time speech recognition with high accuracy.', tag: 'Speech AI', color: '#2D68FF' },
  { icon: '🧠', title: 'Dual-Agent Intelligence', desc: 'Two AI agents collaborate — draft, critique, refine — for the best answer.', tag: 'Multi-Agent', color: '#B439FF' },
  { icon: '🔊', title: 'ElevenLabs Voice', desc: 'Ultra-realistic voice synthesis speaks every response back to you.', tag: 'Voice Synthesis', color: '#FB7118' },
  { icon: '⚡', title: 'Instant Processing', desc: 'Get intelligent answers in under 3 seconds with blazing-fast AI.', tag: 'GPT-4o Mini', color: '#22C55E' },
  { icon: '💬', title: 'Live Transcript', desc: 'Every word tracked in a real-time transcript panel.', tag: 'Live Logs', color: '#3B82F6' },
  { icon: '🛡️', title: 'Private & Secure', desc: 'No data stored. Ephemeral sessions. Your conversations stay private.', tag: 'Zero Logs', color: '#a855f7' },
];

const HOW_IT_WORKS = [
  { step: '01', icon: '🗣️', title: 'Start Call', desc: 'Click Start Call and allow microphone access.' },
  { step: '02', icon: '🤖', title: 'AI Conversation', desc: 'Speak naturally — the AI listens, thinks, and responds with voice.' },
  { step: '03', icon: '📋', title: 'Get Summary', desc: 'After the call, view a full transcript and session summary.' },
  { step: '04', icon: '📊', title: 'Dashboard', desc: 'Track all your sessions and insights in the user dashboard.' },
];

const USE_CASES = [
  { icon: '🎓', title: 'Students', subtitle: 'Viva & Exam Prep', desc: 'Practice oral exams, viva voce questions, and get instant AI feedback on your answers.' },
  { icon: '📚', title: 'Educators', subtitle: 'Assessment & Mock Interviews', desc: 'Run AI-powered mock interviews, assess communication skills, and generate transcripts.' },
  { icon: '💼', title: 'Job Seekers', subtitle: 'Interview Practice', desc: 'Practice real interview scenarios with an AI that critiques and helps you improve.' },
  { icon: '🧑‍💻', title: 'Developers', subtitle: 'Technical Q&A', desc: 'Get technical explanations, code reviews, and concept breakdowns via voice.' },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'B.Tech Computer Science, 3rd Year', avatar: '👩‍🎓', text: 'VoiceAI helped me prepare for my viva. The AI asks tough follow-up questions and I could practice at 2am before my exam. Genuinely improved my confidence.' },
  { name: 'Dr. Rajesh Mehta', role: 'Professor, Electronics Engineering', avatar: '👨‍🏫', text: 'I use VoiceAI to simulate mock oral assessments for my students. The transcript feature is brilliant — I can review what they said and give structured feedback.' },
  { name: 'Aarav Kapoor', role: 'Final Year MBA Student', avatar: '🧑‍💼', text: 'The dual-agent system is impressive. It doesnt just answer — it refines its response. Used it to prep for case interviews and it felt like talking to a real expert.' },
  { name: 'Sneha Reddy', role: 'Assistant Professor, Computer Applications', avatar: '👩‍🏫', text: 'Deployed this for student practice sessions. Kids love voice interaction over typing. The summaries are clean and shareable. Highly recommend for any educator.' },
];

export default function LandingPage() {
  const [visible, setVisible] = useState(false);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const el = featureRefs.current[idx];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 120;
    if (dist < maxDist) {
      const factor = (1 - dist / maxDist) * 10;
      el.style.transform = `translate(${-dx / dist * factor}px, ${-dy / dist * factor}px)`;
    }
  };

  const handleMouseLeave = (idx: number) => {
    const el = featureRefs.current[idx];
    if (el) el.style.transform = 'translate(0,0)';
  };

  const s: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(30px)',
    transition: 'all 0.7s ease',
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative', overflowX: 'hidden' }}>
      <StarBackground />
      <Navbar />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        {/* Glow orb */}
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(45,104,255,0.12) 0%, rgba(180,57,255,0.08) 40%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ ...s, transitionDelay: '0s', position: 'relative', zIndex: 1, maxWidth: 860 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(45,104,255,0.1)', border: '1px solid rgba(45,104,255,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 32 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#2D68FF' }}>AI Calling Assistant · Powered by GPT-4o + ElevenLabs</span>
          </div>

          <h1 style={{ fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-3px', color: 'var(--foreground)', marginBottom: 24 }}>
            Your AI Assistant<br />
            <span className="gradient-text">That Speaks Back</span>
          </h1>

          <p style={{ fontSize: 18, color: 'var(--secondary-text)', maxWidth: 560, margin: '0 auto 44px', lineHeight: 1.7 }}>
            Speak naturally. Get intelligent, voice-spoken answers in seconds. Powered by a dual-agent AI system that drafts, critiques, and refines every response.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/voice" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #2D68FF, #B439FF)', color: '#fff', padding: '15px 36px', borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 4px 32px rgba(45,104,255,0.4)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 48px rgba(45,104,255,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 32px rgba(45,104,255,0.4)'; }}>
              🎙️ Start Call
            </Link>
            <Link href="/voice" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', color: 'var(--foreground)', padding: '15px 36px', borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)'; }}>
              👤 Login
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, flexWrap: 'wrap' }}>
            {[['< 3s', 'Response Time'], ['2 AI', 'Agents Per Query'], ['100%', 'Voice-First'], ['Free', 'No Auth Needed']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1px' }}>{v}</div>
                <div style={{ fontSize: 12, color: 'var(--secondary-text)', fontWeight: 500, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 12, color: 'var(--secondary-text)' }}>Scroll to explore</span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, var(--secondary-text), transparent)' }} />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1.5px', marginBottom: 14 }}>Everything in One AI Call</h2>
          <p style={{ color: 'var(--secondary-text)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>Built for speed, accuracy, and a premium voice experience.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 20 }}>
          {FEATURES.map((f, idx) => (
            <div
              key={f.title}
              ref={el => { featureRefs.current[idx] = el; }}
              onMouseMove={e => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{
                background: 'var(--card-bg)', border: `1px solid rgba(${f.color === '#2D68FF' ? '45,104,255' : f.color === '#B439FF' ? '180,57,255' : '255,255,255'},0.12)`,
                borderRadius: 20, padding: '30px 26px',
                backdropFilter: 'blur(20px)',
                boxShadow: `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)`,
                transition: 'transform 0.2s ease, box-shadow 0.3s ease',
                cursor: 'default', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${f.color}20`; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: f.color, background: `${f.color}15`, padding: '4px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.tag}</span>
              <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--secondary-text)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 24px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1.5px', marginBottom: 14 }}>How It Works</h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: 17 }}>Four simple steps to your AI voice experience</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, position: 'relative' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} style={{ textAlign: 'center', position: 'relative' }}>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div style={{ position: 'absolute', top: 36, left: '60%', width: '80%', height: 1, background: 'linear-gradient(90deg, rgba(45,104,255,0.4), transparent)', zIndex: 0 }} />
                )}
                <div style={{ width: 72, height: 72, borderRadius: 20, background: 'linear-gradient(135deg, rgba(45,104,255,0.2), rgba(180,57,255,0.2))', border: '1px solid rgba(45,104,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', position: 'relative', zIndex: 1, boxShadow: '0 0 24px rgba(45,104,255,0.2)' }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#2D68FF', marginBottom: 6, letterSpacing: '1px' }}>STEP {step.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--secondary-text)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1.5px', marginBottom: 14 }}>Built For You</h2>
          <p style={{ color: 'var(--secondary-text)', fontSize: 17 }}>VoiceAI powers real use cases across education and beyond.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {USE_CASES.map(u => (
            <div key={u.title} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '28px', backdropFilter: 'blur(20px)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{u.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--foreground)', marginBottom: 4 }}>{u.title}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#2D68FF', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{u.subtitle}</div>
              <p style={{ fontSize: 14, color: 'var(--secondary-text)', lineHeight: 1.65 }}>{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 24px', background: 'rgba(45,104,255,0.03)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: 'var(--foreground)', letterSpacing: '-1.5px', marginBottom: 14 }}>What Users Say</h2>
            <p style={{ color: 'var(--secondary-text)', fontSize: 17 }}>Students and educators love VoiceAI.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 20, padding: '28px', backdropFilter: 'blur(20px)', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: 24, color: '#B439FF', marginBottom: 14, letterSpacing: 2 }}>❝</div>
                <p style={{ fontSize: 14, color: 'var(--secondary-text)', lineHeight: 1.7, marginBottom: 20 }}>{t.text}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(45,104,255,0.3), rgba(180,57,255,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, border: '1px solid rgba(45,104,255,0.2)' }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--secondary-text)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER / CTA ── */}
      <section style={{ position: 'relative', zIndex: 1, padding: '100px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, color: 'var(--foreground)', letterSpacing: '-2px', marginBottom: 18 }}>
            Ready to <span className="gradient-text">Start Talking?</span>
          </h2>
          <p style={{ color: 'var(--secondary-text)', fontSize: 17, marginBottom: 36 }}>
            Join students and educators already using VoiceAI for smarter learning and assessment.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/voice" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #2D68FF, #B439FF)', color: '#fff', padding: '16px 40px', borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: 'none', boxShadow: '0 8px 40px rgba(45,104,255,0.4)', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}>
              🎙️ Start Your First Call
            </Link>
            <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.06)', color: 'var(--foreground)', padding: '16px 36px', borderRadius: 14, fontWeight: 600, fontSize: 17, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }}>
              🛡️ Admin Panel
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: 36, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          <span style={{ color: 'var(--secondary-text)', fontSize: 13 }}>© 2025 VoiceAI · Built with Next.js, GPT-4o Mini & ElevenLabs</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {[['Home', '/'], ['Dashboard', '/dashboard'], ['Voice Call', '/voice'], ['Admin', '/admin']].map(([label, href]) => (
              <Link key={label} href={href} style={{ color: 'var(--secondary-text)', textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#2D68FF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--secondary-text)'; }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
