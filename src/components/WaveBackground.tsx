'use client';

export default function WaveBackground() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0,
      overflow: 'hidden', pointerEvents: 'none',
    }}>
      {/* Top-left cyan blob */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '60vw', height: '60vw', maxWidth: 800, maxHeight: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #DCEFF6 0%, rgba(220,239,246,0) 70%)',
        animation: 'waveFloat 8s ease-in-out infinite',
        opacity: 0.7,
      }} />

      {/* Right lavender blob */}
      <div style={{
        position: 'absolute', top: '10%', right: '-15%',
        width: '55vw', height: '55vw', maxWidth: 700, maxHeight: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #E0E7FF 0%, rgba(224,231,255,0) 70%)',
        animation: 'waveFloat2 10s ease-in-out infinite',
        opacity: 0.65,
      }} />

      {/* Bottom center cyan */}
      <div style={{
        position: 'absolute', bottom: '-20%', left: '20%',
        width: '70vw', height: '50vw', maxWidth: 900, maxHeight: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #DCEFF6 0%, rgba(220,239,246,0) 70%)',
        animation: 'waveFloat 12s ease-in-out infinite reverse',
        opacity: 0.5,
      }} />

      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(45,104,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,104,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}
