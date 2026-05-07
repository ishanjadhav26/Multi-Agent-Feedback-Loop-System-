'use client';

type CallStatus = 'idle' | 'connecting' | 'listening' | 'processing' | 'speaking' | 'ended';

interface VoiceOrbProps {
  status: CallStatus;
  onClick?: () => void;
}

const STATUS_CONFIG: Record<CallStatus, {
  label: string;
  emoji: string;
  bg: string;
  ringColor: string;
  pulse: boolean;
}> = {
  idle: {
    label: 'Start Call',
    emoji: '📞',
    bg: 'linear-gradient(135deg, #000 0%, #1a1a2e 100%)',
    ringColor: 'rgba(0,0,0,0.3)',
    pulse: false,
  },
  connecting: {
    label: 'Connecting…',
    emoji: '📡',
    bg: 'linear-gradient(135deg, #2D68FF 0%, #524161 100%)',
    ringColor: 'rgba(45,104,255,0.4)',
    pulse: true,
  },
  listening: {
    label: 'Listening…',
    emoji: '🎙️',
    bg: 'linear-gradient(135deg, #2D68FF 0%, #B439FF 100%)',
    ringColor: 'rgba(45,104,255,0.5)',
    pulse: true,
  },
  processing: {
    label: 'Thinking…',
    emoji: '🧠',
    bg: 'linear-gradient(135deg, #B439FF 0%, #524161 100%)',
    ringColor: 'rgba(180,57,255,0.4)',
    pulse: true,
  },
  speaking: {
    label: 'Speaking…',
    emoji: '🔊',
    bg: 'linear-gradient(135deg, #22C55E 0%, #2D68FF 100%)',
    ringColor: 'rgba(34,197,94,0.4)',
    pulse: true,
  },
  ended: {
    label: 'Call Ended',
    emoji: '✅',
    bg: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
    ringColor: 'rgba(107,114,128,0.3)',
    pulse: false,
  },
};

export default function VoiceOrb({ status, onClick }: VoiceOrbProps) {
  const cfg = STATUS_CONFIG[status];

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: status === 'idle' ? 'pointer' : 'default',
      }}
    >
      {/* Outer pulse rings */}
      {cfg.pulse && (
        <>
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: cfg.ringColor,
            animation: 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
          }} />
          <div style={{
            position: 'absolute',
            width: '100%', height: '100%',
            borderRadius: '50%',
            background: cfg.ringColor,
            animation: 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite 0.5s',
          }} />
        </>
      )}

      {/* Middle ring */}
      <div style={{
        position: 'absolute',
        width: '88%', height: '88%',
        borderRadius: '50%',
        background: cfg.ringColor,
        opacity: 0.3,
      }} />

      {/* Core orb */}
      <div style={{
        position: 'relative',
        width: 120,
        height: 120,
        borderRadius: '50%',
        background: cfg.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 40px ${cfg.ringColor}, 0 8px 32px rgba(0,0,0,0.2)`,
        transition: 'all 0.4s ease',
        zIndex: 2,
      }}>
        <span style={{ fontSize: 36 }}>{cfg.emoji}</span>
      </div>

      {/* Label below */}
      <div style={{
        position: 'absolute',
        bottom: -32,
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
        fontWeight: 600,
        fontSize: 14,
        color: '#111216',
        letterSpacing: '0.3px',
      }}>
        {cfg.label}
      </div>
    </div>
  );
}
