'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import WaveBackground from '@/components/WaveBackground';

interface Session {
  id: string;
  date: string;
  duration: number;
  exchanges: number;
  transcript: { role: string; content: string }[];
}

export default function AdminDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const stored = localStorage.getItem('voiceai_sessions');
    if (stored) {
      try {
        setSessions(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const totalExchanges = sessions.reduce((acc, s) => acc + s.exchanges, 0);
  const totalDuration = sessions.reduce((acc, s) => acc + s.duration, 0);

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all user logs?')) {
      localStorage.removeItem('voiceai_sessions');
      setSessions([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAFBFF', position: 'relative' }}>
      <WaveBackground />
      <Navbar />

      <main style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1200, margin: '0 auto',
        padding: '104px 24px 60px',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 36,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 32 }}>🛡️</span>
              <h1 style={{ fontSize: 32, fontWeight: 800, color: '#111216', letterSpacing: '-0.8px' }}>
                Admin Console
              </h1>
            </div>
            <p style={{ color: '#6B7280', fontSize: 15 }}>
              Monitor system activity and review user session logs.
            </p>
          </div>
          
          <button onClick={clearLogs} style={{
            background: '#FEF2F2', border: '1px solid #FECACA',
            color: '#EF4444', padding: '10px 20px', borderRadius: 10,
            fontWeight: 600, fontSize: 14, cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            🗑️ Clear Logs
          </button>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20,
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.1s',
        }}>
          {[
            { label: 'Total Sessions', value: sessions.length, color: '#2D68FF', icon: '📊' },
            { label: 'Total Exchanges', value: totalExchanges, color: '#B439FF', icon: '💬' },
            { label: 'Total Audio Mins', value: (totalDuration / 60).toFixed(1), color: '#22C55E', icon: '⏱️' },
            { label: 'Active Agents', value: '2', color: '#FB7118', icon: '🤖' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16,
              padding: '24px', display: 'flex', alignItems: 'center', gap: 16,
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.03)';
            }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logs Table */}
        <div style={{
          background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16,
          overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s ease 0.2s',
        }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', background: '#F9FAFB' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111216' }}>Recent Chat Logs</h3>
          </div>
          
          {sessions.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: '#9CA3AF' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ fontSize: 15, fontWeight: 500 }}>No chat logs found.</p>
              <p style={{ fontSize: 13 }}>When users complete voice calls, they will appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#fff', borderBottom: '1px solid #E5E7EB', color: '#6B7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Session Date</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Duration</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Exchanges</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>Last Message Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {[...sessions].reverse().map((session) => {
                    const lastMsg = session.transcript[session.transcript.length - 1];
                    const preview = lastMsg ? lastMsg.content : 'No transcript available';
                    return (
                      <tr key={session.id} style={{ borderBottom: '1px solid #F3F4F6', transition: 'background 0.2s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = '#F9FAFB'}
                        onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}
                      >
                        <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 500, color: '#111216' }}>{session.date}</td>
                        <td style={{ padding: '16px 24px', fontSize: 14, color: '#6B7280' }}>
                          <span style={{ background: '#F3F4F6', padding: '4px 8px', borderRadius: 6 }}>{session.duration}s</span>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: 14, color: '#6B7280' }}>
                          <span style={{ background: '#EEF2FF', color: '#2D68FF', padding: '4px 8px', borderRadius: 6, fontWeight: 600 }}>{session.exchanges}</span>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: 13, color: '#4B5563', maxWidth: 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ fontWeight: 600, color: lastMsg?.role === 'user' ? '#111216' : '#B439FF', marginRight: 8 }}>
                            {lastMsg?.role === 'user' ? 'User:' : 'AI:'}
                          </span>
                          {preview}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
