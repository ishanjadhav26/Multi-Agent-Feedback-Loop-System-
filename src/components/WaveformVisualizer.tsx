'use client';

interface WaveformVisualizerProps {
  active: boolean;
  color?: string;
  barCount?: number;
}

export default function WaveformVisualizer({
  active,
  color = '#2D68FF',
  barCount = 28,
}: WaveformVisualizerProps) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      height: 56,
      padding: '0 8px',
    }}>
      {bars.map((i) => {
        const delay = (i * (1000 / barCount)).toFixed(0);
        const height = active ? undefined : 4;
        return (
          <div
            key={i}
            style={{
              width: 3,
              height: height ?? '100%',
              borderRadius: 4,
              background: active
                ? `linear-gradient(to top, ${color}, #B439FF)`
                : '#E5E7EB',
              transformOrigin: 'bottom',
              animationName: active ? 'waveform-bar' : 'none',
              animationDuration: active ? `${0.8 + (i % 5) * 0.12}s` : '0s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationDelay: active ? `${delay}ms` : '0ms',
              transition: 'height 0.3s ease, background 0.3s ease',
            }}
          />
        );
      })}
    </div>
  );
}
