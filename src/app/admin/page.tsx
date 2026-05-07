'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

type AdminTab = 'overview' | 'analytics' | 'users' | 'logs' | 'settings';

const USERS = [
  { id: 'USR-001', name: 'Priya Sharma', email: 'priya@example.com', role: 'Student', calls: 24, joined: 'Jan 12, 2025', status: 'Active' },
  { id: 'USR-002', name: 'Dr. Rajesh Mehta', email: 'rmehta@college.edu', role: 'Educator', calls: 51, joined: 'Jan 15, 2025', status: 'Active' },
  { id: 'USR-003', name: 'Aarav Kapoor', email: 'aarav.k@gmail.com', role: 'Student', calls: 18, joined: 'Feb 03, 2025', status: 'Active' },
  { id: 'USR-004', name: 'Sneha Reddy', email: 'sneha.r@univ.ac.in', role: 'Educator', calls: 37, joined: 'Feb 10, 2025', status: 'Active' },
  { id: 'USR-005', name: 'Karan Patel', email: 'kpatel@student.edu', role: 'Student', calls: 9, joined: 'Mar 01, 2025', status: 'Inactive' },
  { id: 'USR-006', name: 'Meera Nair', email: 'meera.n@gmail.com', role: 'Student', calls: 31, joined: 'Mar 14, 2025', status: 'Active' },
];

const CALL_LOGS = [
  { id: 'LOG-2341', user: 'Priya Sharma', date: 'May 06, 10:42 AM', duration: '3m 22s', exchanges: 5, status: 'Completed' },
  { id: 'LOG-2340', user: 'Dr. Rajesh Mehta', date: 'May 06, 10:15 AM', duration: '7m 48s', exchanges: 11, status: 'Completed' },
  { id: 'LOG-2339', user: 'Aarav Kapoor', date: 'May 06, 09:55 AM', duration: '1m 12s', exchanges: 2, status: 'Dropped' },
  { id: 'LOG-2338', user: 'Sneha Reddy', date: 'May 05, 04:30 PM', duration: '5m 04s', exchanges: 8, status: 'Completed' },
  { id: 'LOG-2337', user: 'Meera Nair', date: 'May 05, 02:12 PM', duration: '2m 55s', exchanges: 4, status: 'Completed' },
  { id: 'LOG-2336', user: 'Karan Patel', date: 'May 04, 11:00 AM', duration: '0m 45s', exchanges: 1, status: 'Dropped' },
  { id: 'LOG-2335', user: 'Priya Sharma', date: 'May 04, 09:20 AM', duration: '4m 10s', exchanges: 7, status: 'Completed' },
];

const ACTIVITY = [
  { time: '10:42 AM', event: 'Priya Sharma completed a 5-exchange voice call' },
  { time: '10:39 AM', event: 'Agent 2 validated response in 38ms' },
  { time: '10:35 AM', event: 'New user registered: meera.n@gmail.com' },
  { time: '10:15 AM', event: 'Dr. Rajesh Mehta started a mock interview session' },
  { time: '10:00 AM', event: 'System health check passed — all services nominal' },
];

const BAR_DATA = [58, 72, 55, 88, 70, 95, 110];
const BAR_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AdminPanel() {
  const [tab, setTab] = useState<AdminTab>('overview');
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  const isDark = true;

  const metrics = [
    { label: 'Total Calls', value: '12,430', color: '#2D68FF', change: '+14%', icon: '📞' },
    { label: 'Active Users', value: '1,240', color: '#B439FF', change: '+8%', icon: '👥' },
    { label: 'Avg Session', value: '4m 12s', color: '#22C55E', change: '+5%', icon: '⏱️' },
    { label: 'AI Accuracy', value: '94%', color: '#FB7118', change: '+2%', icon: '🎯' },
  ];

  const tabStyle = (t: AdminTab): React.CSSProperties => ({
    padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14,
    cursor: 'pointer', transition: 'all 0.2s', border: 'none',
    background: tab === t ? 'linear-gradient(135deg, #2D68FF, #B439FF)' : 'rgba(255,255,255,0.05)',
    color: tab === t ? '#fff' : '#94A3B8',
  });

  const cardStyle: React.CSSProperties = {
    background: 'rgba(20,20,45,0.7)', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16, padding: '24px', backdropFilter: 'blur(16px)',
  };

  const thStyle: React.CSSProperties = { padding: '14px 20px', fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)' };
  const tdStyle: React.CSSProperties = { padding: '14px 20px', fontSize: 14, color: '#CBD5E1', borderBottom: '1px solid rgba(255,255,255,0.04)' };

  return (
    <div style={{ minHeight: '100vh', background: '#080814', color: '#F0F0FF', position: 'relative' }}>
      {/* bg orbs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(45,104,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(180,57,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(8,8,20,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #2D68FF, #B439FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎙️</div>
            <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: '-0.5px' }}>Voice<span style={{ color: '#2D68FF' }}>AI</span> <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B', marginLeft: 4 }}>Admin</span></span>
          </Link>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Link href="/dashboard" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>User Dashboard</Link>
            <Link href="/" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Home</Link>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E' }} />
          </div>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1300, margin: '0 auto', padding: '88px 24px 60px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.5s ease' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', letterSpacing: '-0.8px', marginBottom: 4 }}>Admin Command Center</h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>Manage users, monitor calls, and track system health.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {(['overview', 'analytics', 'users', 'logs', 'settings'] as AdminTab[]).map(t => (
            <button key={t} onClick={() => setTab(t)} style={tabStyle(t)}>
              {t === 'overview' ? '📊 Overview' : t === 'analytics' ? '📈 Analytics' : t === 'users' ? '👥 Users' : t === 'logs' ? '📋 Call Logs' : '⚙️ Settings'}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {metrics.map(m => (
                <div key={m.label} style={{ ...cardStyle, borderTop: `2px solid ${m.color}`, transition: 'transform 0.3s ease' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>{m.label}</span>
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{m.value}</div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#22C55E' }}>{m.change} this week</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
              {/* Chart */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Calls This Week</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 160, paddingBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
                  {BAR_DATA.map((h, i) => {
                    const pct = (h / 120) * 100;
                    return (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: '100%', height: `${pct}%`, background: i === 6 ? 'linear-gradient(180deg, #2D68FF, #B439FF)' : 'rgba(45,104,255,0.4)', borderRadius: '4px 4px 0 0', transition: 'all 0.3s ease', boxShadow: i === 6 ? '0 0 16px rgba(45,104,255,0.5)' : 'none' }} />
                        <span style={{ fontSize: 10, color: '#64748B' }}>{BAR_LABELS[i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity */}
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Recent Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {ACTIVITY.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 10, color: '#2D68FF', fontWeight: 700, minWidth: 52, marginTop: 2 }}>{a.time}</span>
                      <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.5 }}>{a.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              {[
                { label: 'API Status', value: 'Operational', color: '#22C55E' },
                { label: 'Response Time', value: '~120ms', color: '#2D68FF' },
                { label: 'Agent 1 (Analyzer)', value: '94% success', color: '#B439FF' },
                { label: 'Agent 2 (Validator)', value: '98% success', color: '#FB7118' },
                { label: 'TTS Service', value: 'Online', color: '#22C55E' },
              ].map(s => (
                <div key={s.label} style={{ ...cardStyle, padding: '16px 20px' }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {tab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { label: 'Total Sessions (All Time)', value: '12,430', color: '#2D68FF' },
                { label: 'Avg Exchanges/Call', value: '6.2', color: '#B439FF' },
                { label: 'Completion Rate', value: '87%', color: '#22C55E' },
                { label: 'Returning Users', value: '68%', color: '#FB7118' },
              ].map(m => (
                <div key={m.label} style={{ ...cardStyle, borderLeft: `3px solid ${m.color}` }}>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#fff' }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Usage Funnel</h3>
                {[['Total Visitors', 100, '#2D68FF'], ['Started Call', 78, '#B439FF'], ['Completed Call', 65, '#22C55E'], ['Returned Next Day', 42, '#FB7118']].map(([l, v, c]) => (
                  <div key={l as string} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: '#94A3B8' }}>{l}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{v}%</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${v}%`, height: '100%', background: c as string, borderRadius: 4, boxShadow: `0 0 10px ${c}80` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={cardStyle}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>User Breakdown</h3>
                {[['Students', 68, '#2D68FF'], ['Educators', 22, '#B439FF'], ['Others', 10, '#FB7118']].map(([l, v, c]) => (
                  <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', border: `4px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: c as string }}>{v}%</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{l}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{Math.round((v as number) * 12.43)} total users</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>User Management</h3>
              <span style={{ fontSize: 12, color: '#64748B', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 100 }}>{USERS.length} users</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['User ID', 'Name', 'Email', 'Role', 'Calls', 'Joined', 'Status'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USERS.map(u => (
                    <tr key={u.id} style={{ transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                      <td style={{ ...tdStyle, color: '#64748B', fontSize: 12 }}>{u.id}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{u.name}</td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}><span style={{ background: u.role === 'Educator' ? 'rgba(180,57,255,0.15)' : 'rgba(45,104,255,0.15)', color: u.role === 'Educator' ? '#B439FF' : '#2D68FF', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{u.role}</span></td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#fff' }}>{u.calls}</td>
                      <td style={tdStyle}>{u.joined}</td>
                      <td style={tdStyle}><span style={{ background: u.status === 'Active' ? 'rgba(34,197,94,0.15)' : 'rgba(100,116,139,0.15)', color: u.status === 'Active' ? '#22C55E' : '#64748B', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{u.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LOGS TAB */}
        {tab === 'logs' && (
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Call Logs / History</h3>
              <span style={{ fontSize: 12, color: '#64748B', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 100 }}>{CALL_LOGS.length} recent logs</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Log ID', 'User', 'Date & Time', 'Duration', 'Exchanges', 'Status'].map(h => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CALL_LOGS.map(l => (
                    <tr key={l.id} style={{ transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.background = 'transparent'}>
                      <td style={{ ...tdStyle, color: '#64748B', fontSize: 12 }}>{l.id}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{l.user}</td>
                      <td style={tdStyle}>{l.date}</td>
                      <td style={tdStyle}><span style={{ background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: 6, fontSize: 12 }}>{l.duration}</span></td>
                      <td style={{ ...tdStyle, fontWeight: 700, color: '#2D68FF' }}>{l.exchanges}</td>
                      <td style={tdStyle}><span style={{ background: l.status === 'Completed' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', color: l.status === 'Completed' ? '#22C55E' : '#EF4444', padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600 }}>{l.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {tab === 'settings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { title: 'AI Model', desc: 'Primary language model for agent responses', value: 'llama-3.3-70b-versatile (Groq)' },
              { title: 'TTS Provider', desc: 'Text-to-speech voice synthesis engine', value: 'ElevenLabs – Rachel Voice' },
              { title: 'Max Tokens / Response', desc: 'Maximum tokens per AI response', value: '300 tokens' },
              { title: 'Session Storage', desc: 'Where user session data is stored', value: 'localStorage (client-side)' },
              { title: 'Speech Recognition', desc: 'Browser speech-to-text engine', value: 'Web Speech API (Chrome/Edge)' },
            ].map(s => (
              <div key={s.title} style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>{s.desc}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2D68FF', background: 'rgba(45,104,255,0.1)', padding: '6px 14px', borderRadius: 8, whiteSpace: 'nowrap', marginLeft: 20 }}>{s.value}</div>
              </div>
            ))}
            <div style={{ ...cardStyle, padding: '20px 24px' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Danger Zone</h3>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444', padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                  onClick={() => { if (confirm('Clear all session logs?')) { localStorage.removeItem('voiceai_sessions'); alert('Logs cleared.'); } }}>
                  🗑️ Clear All Logs
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
