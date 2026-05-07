'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WaveBackground from '@/components/WaveBackground';

interface Session {
  id: string;
  date: string;
  duration: string;
  exchanges: number;
  preview: string;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    date: 'Today, 2:45 PM',
    duration: '3m 22s',
    exchanges: 5,
    preview: 'Discussed the latest trends in artificial intelligence and machine learning…',
  },
  {
    id: '2',
    date: 'Today, 11:10 AM',
    duration: '1m 48s',
    exchanges: 3,
    preview: 'Asked about Python best practices for writing clean, maintainable code…',
  },
  {
    id: '3',
    date: 'Yesterday, 9:30 PM',
    duration: '5m 04s',
    exchanges: 8,
    preview: 'Explored ideas for building a startup and validated the business model…',
  },
  {
    id: '4',
    date: 'Yesterday, 4:15 PM',
    duration: '2m 11s',
    exchanges: 4,
    preview: 'Got help understanding how transformers work and attention mechanisms…',
  },
];

const QUICK_STARTS = [
  { emoji: '💡', label: 'Brainstorm ideas' },
  { emoji: '📚', label: 'Explain a concept' },
  { emoji: '🧮', label: 'Solve a problem' },
  { emoji: '✍️', label: 'Write something' },
  { emoji: '🌍', label: 'Learn a topic' },
  { emoji: '🤔', label: 'Think through a decision' },
];

export default function DashboardPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <WaveBackground />
      <Navbar />

      <main style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1100, margin: '0 auto',
        padding: '104px 24px 60px',
      }}>
        {/* Header */}
        <div style={{
          marginBottom: 36,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111216', letterSpacing: '-0.8px', marginBottom: 6 }}>
            Good evening 👋
          </h1>
          <p style={{ color: '#6B7280', fontSize: 15 }}>
            Ready for a conversation? Start a new voice session below.
          </p>
        </div>

        {/* New Session CTA */}
        <div style={{
          background: 'linear-gradient(135deg, #2D68FF 0%, #B439FF 60%, #524161 100%)',
          borderRadius: 20, padding: '36px 40px',
          marginBottom: 32, position: 'relative', overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.1s',
        }}>
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', right: -40, top: -40,
            width: 200, height: 200, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }} />
          <div style={{
            position: 'absolute', right: 60, bottom: -60,
            width: 160, height: 160, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 100, padding: '4px 12px', marginBottom: 16,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#22C55E',
                animation: 'pulse-glow 2s infinite',
              }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
                AI Online · Ready
              </span>
            </div>

            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 10, letterSpacing: '-0.5px' }}>
              Start a New Voice Session
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginBottom: 24, maxWidth: 440 }}>
              Speak to your AI assistant and get intelligent, voice-spoken responses powered by dual-agent AI.
            </p>

            <Link href="/voice" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: '#111216',
              padding: '12px 28px', borderRadius: 12,
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
            }}>
              🎙️ Start Voice Call
            </Link>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24,
          opacity: visible ? 1 : 0,
          transition: 'all 0.5s ease 0.2s',
        }}>
          {/* Recent Sessions */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111216', marginBottom: 16 }}>
              Recent Sessions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MOCK_SESSIONS.map((session) => (
                <div key={session.id} style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: 14, padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'linear-gradient(135deg, #EEF2FF, #F5F0FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    🎙️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111216' }}>
                        {session.date}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        color: '#6B7280',
                        background: '#F3F4F6',
                        padding: '2px 8px', borderRadius: 100,
                      }}>
                        {session.duration}
                      </span>
                    </div>
                    <p style={{
                      fontSize: 13, color: '#6B7280',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {session.preview}
                    </p>
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    color: '#2D68FF', background: '#EEF2FF',
                    padding: '4px 10px', borderRadius: 100, flexShrink: 0,
                  }}>
                    {session.exchanges} exchanges
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Quick Start */}
            <div style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: 16, padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111216', marginBottom: 14 }}>
                Quick Start Topics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {QUICK_STARTS.map((q) => (
                  <Link key={q.label} href="/voice" style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 10,
                    background: '#FAFAFA', border: '1px solid #F3F4F6',
                    textDecoration: 'none', color: '#374151',
                    fontSize: 13, fontWeight: 500,
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = '#EEF2FF';
                      (e.currentTarget as HTMLElement).style.borderColor = '#C7D7FE';
                      (e.currentTarget as HTMLElement).style.color = '#2D68FF';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = '#FAFAFA';
                      (e.currentTarget as HTMLElement).style.borderColor = '#F3F4F6';
                      (e.currentTarget as HTMLElement).style.color = '#374151';
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{q.emoji}</span>
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div style={{
              background: '#fff', border: '1px solid #E5E7EB',
              borderRadius: 16, padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111216', marginBottom: 14 }}>
                Session Stats
              </h4>
              {[
                { label: 'Total Sessions', value: '4', color: '#2D68FF' },
                { label: 'Total Exchanges', value: '20', color: '#B439FF' },
                { label: 'Avg Duration', value: '3m 06s', color: '#22C55E' },
                { label: 'Agents Used', value: '2 / query', color: '#FB7118' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '10px 0',
                  borderBottom: '1px solid #F9FAFB',
                }}>
                  <span style={{ fontSize: 13, color: '#6B7280' }}>{stat.label}</span>
                  <span style={{
                    fontSize: 14, fontWeight: 700, color: stat.color,
                  }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
