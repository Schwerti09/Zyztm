import { useEffect, useRef } from 'react';

/**
 * ChaosBusBackground
 *
 * Renders an animated Fortnite Chaos Bus flying across the fixed background.
 * The bus loops from right to left with a neon-cyberpunk glow trail.
 * Parachute jumpers are periodically spawned to drop from the bus.
 */

const BUS_EMOJI = '🚌';
const BALLOON_EMOJI = '🎈';
const CHUTE_EMOJI = '🪂';
const CHUTE_SPAWN_INTERVAL_MS = 2400;
const CHUTE_COUNT = 6;

function spawnParachuter(busEl: HTMLElement): void {
  const rect = busEl.getBoundingClientRect();
  const el = document.createElement('span');
  el.textContent = CHUTE_EMOJI;
  const x = rect.left + rect.width * 0.4 + (Math.random() - 0.5) * 40;
  const startY = rect.bottom - 10;
  el.style.cssText = [
    'position:fixed',
    `left:${x}px`,
    `top:${startY}px`,
    'font-size:22px',
    'z-index:1',
    'pointer-events:none',
    'animation:chaosBusChutefall 3.2s ease-in forwards',
    `animation-delay:${Math.random() * 0.3}s`,
  ].join(';');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3800);
}

export default function ChaosBusBackground() {
  const busRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!busRef.current) return;

    // Periodically drop parachuters from the bus position.
    // Guard: only spawn when the bus element is within the viewport horizontally.
    const spawnBatch = () => {
      const el = busRef.current;
      if (!el) return;
      const { left, right } = el.getBoundingClientRect();
      // Skip spawning when the bus is fully outside the visible viewport
      if (right < 0 || left > window.innerWidth) return;
      for (let i = 0; i < CHUTE_COUNT; i++) {
        setTimeout(() => {
          if (busRef.current) spawnParachuter(busRef.current);
        }, i * 280);
      }
    };

    const initial = setTimeout(spawnBatch, 3000);
    const interval = setInterval(spawnBatch, CHUTE_SPAWN_INTERVAL_MS);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Neon trail behind the bus */}
      <div
        style={{
          position: 'absolute',
          top: '11vh',
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,242,255,0.08) 30%, rgba(255,0,85,0.22) 60%, transparent 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* The Chaos Bus */}
      <div
        ref={busRef}
        className="chaos-bus"
        style={{
          position: 'absolute',
          top: '8vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0px',
          filter:
            'drop-shadow(0 0 12px rgba(0,242,255,0.8)) drop-shadow(0 0 28px rgba(255,0,85,0.5))',
          willChange: 'transform',
          userSelect: 'none',
        }}
      >
        {/* Balloon on top */}
        <span style={{ fontSize: '28px', lineHeight: 1, marginBottom: '-4px' }}>
          {BALLOON_EMOJI}
        </span>
        {/* Rope */}
        <span
          style={{
            display: 'block',
            width: '2px',
            height: '14px',
            background: 'rgba(255,255,255,0.45)',
            margin: '0 auto',
          }}
        />
        {/* Bus body */}
        <span style={{ fontSize: '48px', lineHeight: 1 }}>{BUS_EMOJI}</span>
        {/* Neon glow label */}
        <span
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '8px',
            fontWeight: 900,
            letterSpacing: '0.15em',
            color: '#00f2ff',
            textShadow: '0 0 8px #00f2ff, 0 0 16px #00f2ff',
            marginTop: '2px',
            textTransform: 'uppercase',
          }}
        >
          CHAOS BUS
        </span>
      </div>
    </div>
  );
}

