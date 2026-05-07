'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const stored = localStorage.getItem('voiceai_theme') as 'dark' | 'light' | null;
    const initial = stored || 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('voiceai_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const isDark = theme === 'dark';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled
        ? (isDark ? 'rgba(8,8,20,0.95)' : 'rgba(255,255,255,0.95)')
        : (isDark ? 'rgba(8,8,20,0.7)' : 'rgba(255,255,255,0.7)'),
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      padding: '0 24px',
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 64,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #2D68FF, #B439FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(45,104,255,0.4)',
          }}>
            <span style={{ fontSize: 18 }}>🎙️</span>
          </div>
          <span style={{
            fontWeight: 800, fontSize: 20,
            color: isDark ? '#fff' : '#111216',
            letterSpacing: '-0.5px',
          }}>
            Voice<span style={{ color: '#2D68FF' }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={navLinkStyle(isDark)}>Home</Link>
          <Link href="/dashboard" style={navLinkStyle(isDark)}>Dashboard</Link>
          <Link href="/voice" style={{
            background: 'linear-gradient(135deg, #2D68FF, #B439FF)',
            color: '#fff',
            padding: '8px 20px', borderRadius: 10,
            fontWeight: 600, fontSize: 14,
            textDecoration: 'none', transition: 'all 0.2s',
            display: 'inline-block',
            boxShadow: '0 4px 16px rgba(45,104,255,0.35)',
          }}>
            Start Call
          </Link>

          {/* Dark Mode Toggle */}
          {isMounted && (
            <button
              onClick={toggleTheme}
              title="Toggle dark/light mode"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}`,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, transition: 'all 0.3s ease',
                marginLeft: 4,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

const navLinkStyle = (isDark: boolean): React.CSSProperties => ({
  color: isDark ? '#94A3B8' : '#6B7280',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 14,
  padding: '6px 14px',
  borderRadius: 8,
  transition: 'all 0.2s',
});
