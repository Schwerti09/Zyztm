import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── Colors ───────────────────────────────────────────────────────────────────
const NEON_GREEN  = '#39FF14';
const NEON_GOLD   = '#FFD700';
const NEON_PINK   = '#FF00FF';
const NEON_CYAN   = '#00f2ff';
const NEON_ORANGE = '#FF6B00';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SoundDef {
  id: string;
  label: string;
  emoji: string;
  color: string;
  /** Synthesise the sound and return playback duration in ms */
  synth: (ctx: AudioContext) => number;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }

function getAudioCtx(): AudioContext | null {
  try {
    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    return Ctor ? new Ctor() : null;
  } catch { return null; }
}

// ─── Audio synthesis ─────────────────────────────────────────────────────────
function synthVictory(ctx: AudioContext): number {
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.13;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
    osc.start(t); osc.stop(t + 0.4);
  });
  return 800;
}

function synthClutch(ctx: AudioContext): number {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.5);
  gain.gain.setValueAtTime(0.22, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.start(); osc.stop(ctx.currentTime + 0.52);
  return 650;
}

function synthLetsGo(ctx: AudioContext): number {
  [440, 550, 660, 880, 1100].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.08;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.start(t); osc.stop(t + 0.24);
  });
  return 620;
}

function synthEZ(ctx: AudioContext): number {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  osc.start(); osc.stop(ctx.currentTime + 0.22);
  return 320;
}

function synthHehe(ctx: AudioContext): number {
  const osc = ctx.createOscillator();
  const lfo = ctx.createOscillator();
  const gain = ctx.createGain();
  const lfoGain = ctx.createGain();
  lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = 'triangle';
  osc.frequency.value = 400;
  lfo.type = 'sine';
  lfo.frequency.value = 10;
  lfoGain.gain.value = 80;
  gain.gain.setValueAtTime(0.22, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  lfo.start(ctx.currentTime); lfo.stop(ctx.currentTime + 0.52);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.52);
  return 600;
}

function synthPoggers(ctx: AudioContext): number {
  [600, 750, 950, 1250].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.07;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.24, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.start(t); osc.stop(t + 0.22);
  });
  return 560;
}

// Fortnite Default Dance – bouncy rhythmic 8-note pattern
function synthDefaultDance(ctx: AudioContext): number {
  const PATTERN = [
    { freq: 440, t: 0.00 }, { freq: 523.25, t: 0.14 }, { freq: 440, t: 0.28 },
    { freq: 392,  t: 0.38 }, { freq: 440, t: 0.52 }, { freq: 659.25, t: 0.62 },
    { freq: 523.25, t: 0.72 }, { freq: 440, t: 0.86 },
  ];
  PATTERN.forEach(({ freq, t: offset }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const t = ctx.currentTime + offset;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.start(t); osc.stop(t + 0.14);
  });
  return 1050;
}

// Fortnite Chest Opening – sparkling ascending glitter
function synthChestOpen(ctx: AudioContext): number {
  const FREQS = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
  FREQS.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.075;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.26, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.start(t); osc.stop(t + 0.38);
  });
  // Extra sparkle – higher harmonics
  [2093, 2637].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.value = freq;
    const t = ctx.currentTime + 0.3 + i * 0.06;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.start(t); osc.stop(t + 0.25);
  });
  return 950;
}

// Storm is moving – Fortnite zone-closing pulse warning
function synthStormWarning(ctx: AudioContext): number {
  // Low ominous pulse × 3
  [0, 0.28, 0.56].forEach((offset) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.value = 120;
    const t = ctx.currentTime + offset;
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    osc.start(t); osc.stop(t + 0.25);
  });
  // Rising shriek overlay
  const shriek = ctx.createOscillator();
  const shriekGain = ctx.createGain();
  shriek.connect(shriekGain); shriekGain.connect(ctx.destination);
  shriek.type = 'sawtooth';
  shriek.frequency.setValueAtTime(200, ctx.currentTime + 0.6);
  shriek.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.1);
  shriekGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.6);
  shriekGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.65);
  shriekGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
  shriek.start(ctx.currentTime + 0.6); shriek.stop(ctx.currentTime + 1.15);
  return 1200;
}

// ─── Sound definitions ────────────────────────────────────────────────────────
const SOUNDS: SoundDef[] = [
  { id: 'victory',       label: 'VICTORY ROYALE!',  emoji: '🏆', color: NEON_GOLD,   synth: synthVictory      },
  { id: 'clutch',        label: 'CLUTCH MOMENT!',   emoji: '⚡', color: NEON_PINK,   synth: synthClutch       },
  { id: 'lets_go',       label: "LET'S GOOOO!",     emoji: '🔥', color: NEON_GREEN,  synth: synthLetsGo       },
  { id: 'ez',            label: 'EZ!',              emoji: '😎', color: NEON_CYAN,   synth: synthEZ           },
  { id: 'hehe',          label: 'HEHE BOY',         emoji: '😈', color: NEON_ORANGE, synth: synthHehe         },
  { id: 'poggers',       label: 'POGGERS!',         emoji: '👀', color: NEON_PINK,   synth: synthPoggers      },
  { id: 'default_dance', label: 'DEFAULT DANCE!',   emoji: '🕺', color: '#B44FFF',   synth: synthDefaultDance },
  { id: 'chest_open',    label: 'CHEST OPEN!',      emoji: '📦', color: NEON_GOLD,   synth: synthChestOpen    },
  { id: 'storm_warning', label: 'STORM IS MOVING!', emoji: '🌀', color: '#FF3B6B',   synth: synthStormWarning },
];

// ─── Waveform bars ────────────────────────────────────────────────────────────
const BAR_PEAKS = [60, 80, 45, 90, 70, 55, 85, 65, 75, 50, 95, 60];

function Waveform({ isPlaying, color }: { isPlaying: boolean; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 3, height: 36, width: '100%' }}>
      {BAR_PEAKS.map((peak, i) => (
        <motion.div
          key={i}
          style={{
            width: 4, borderRadius: 2, flexShrink: 0,
            background: isPlaying ? color : `${color}50`,
            boxShadow: isPlaying ? `0 0 6px ${color}` : 'none',
          }}
          animate={isPlaying ? { height: [8, (peak / 100) * 34, 8] } : { height: 8 }}
          transition={isPlaying
            ? { duration: 0.22 + (i % 5) * 0.06, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.025 }
            : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Canvas particle burst on play ───────────────────────────────────────────
function spawnParticles(canvas: HTMLCanvasElement, color: string) {
  const ctx2d = canvas.getContext('2d');
  if (!ctx2d) return;
  const w = (canvas.width  = canvas.offsetWidth  || 280);
  const h = (canvas.height = canvas.offsetHeight || 200);
  const cx = w / 2;
  const cy = h / 2;
  const particles = Array.from({ length: 28 }, () => ({
    x: cx, y: cy,
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 0.5) * 14,
    r: Math.random() * 4 + 1.5,
    alpha: 1,
    c: Math.random() > 0.5 ? color : NEON_GOLD,
  }));
  let raf = 0;
  const tick = () => {
    ctx2d.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy; p.vy += 0.25; p.alpha -= 0.022;
      if (p.alpha > 0) {
        alive = true;
        ctx2d.globalAlpha = p.alpha;
        ctx2d.fillStyle = p.c;
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx2d.fill();
      }
    }
    ctx2d.globalAlpha = 1;
    if (alive) raf = requestAnimationFrame(tick);
    else ctx2d.clearRect(0, 0, w, h);
  };
  tick();
}

// ─── Sound Card ───────────────────────────────────────────────────────────────
function SoundCard({ sound, index }: { sound: SoundDef; index: number }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRotY(((e.clientX - rect.left) / rect.width  - 0.5) * 18);
    setRotX(-((e.clientY - rect.top)  / rect.height - 0.5) * 18);
  };

  const handlePlay = useCallback(() => {
    if (playing) return;
    const ctx = getAudioCtx();
    if (ctx) {
      const dur = sound.synth(ctx);
      setPlaying(true);
      if (canvasRef.current) spawnParticles(canvasRef.current, sound.color);
      setTimeout(() => {
        setPlaying(false);
        ctx.close().catch(() => {});
      }, dur + 100);
    }
  }, [playing, sound]);

  const active = playing || hovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setRotX(0); setRotY(0); }}
      onMouseMove={handleMouseMove}
      style={{ perspective: 900 }}
    >
      <div
        style={{
          borderRadius: 16,
          padding: '24px 20px',
          background: active
            ? `linear-gradient(145deg, ${sound.color}12 0%, rgba(10,12,20,0.97) 100%)`
            : 'linear-gradient(145deg, rgba(13,17,23,0.95) 0%, rgba(8,10,18,0.98) 100%)',
          border: `2px solid ${active ? sound.color : `${sound.color}35`}`,
          boxShadow: playing
            ? `0 0 35px ${sound.color}55, 0 0 70px ${sound.color}25, inset 0 0 25px ${sound.color}10`
            : hovered
            ? `0 0 20px ${sound.color}35, 0 0 45px ${sound.color}12`
            : `0 4px 24px rgba(0,0,0,0.65)`,
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)${hovered ? ' translateZ(8px)' : ''}`,
          transition: hovered
            ? 'box-shadow 0.2s, border-color 0.2s, background 0.2s'
            : 'all 0.45s ease',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        {/* Scanlines overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.035, zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.9) 2px, rgba(255,255,255,0.9) 3px)',
        }} />

        {/* Particle canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 5,
        }} />

        {/* Glitch border flash when playing */}
        {playing && (
          <motion.div
            style={{
              position: 'absolute', inset: 0, borderRadius: 14,
              pointerEvents: 'none', zIndex: 4,
              border: `1px solid ${sound.color}`,
            }}
            animate={{ opacity: [1, 0, 1, 0, 1], x: [-2, 2, -1, 1, 0] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          />
        )}

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {/* Emoji */}
          <motion.div
            animate={
              playing ? { scale: [1, 1.25, 1], rotate: [-6, 6, -6] }
              : hovered ? { scale: 1.1 } : { scale: 1 }
            }
            transition={playing ? { duration: 0.28, repeat: Infinity } : { duration: 0.2 }}
            style={{
              fontSize: 44, lineHeight: 1,
              filter: active ? `drop-shadow(0 0 12px ${sound.color})` : 'none',
              transition: 'filter 0.2s',
            }}
          >
            {sound.emoji}
          </motion.div>

          {/* Sound name – Press Start 2P */}
          <p style={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: 10,
            color: active ? sound.color : '#fff',
            textShadow: active ? `0 0 10px ${sound.color}, 0 0 22px ${sound.color}70` : 'none',
            textAlign: 'center',
            lineHeight: 1.9,
            letterSpacing: '0.04em',
            transition: 'color 0.2s, text-shadow 0.2s',
            margin: 0,
          }}>
            {sound.label}
          </p>

          {/* Animated waveform */}
          <Waveform isPlaying={playing} color={sound.color} />

          {/* Play / Pause button */}
          <button
            onClick={handlePlay}
            disabled={playing}
            aria-label={playing ? `Playing ${sound.label}` : `Play ${sound.label}`}
            style={{
              position: 'relative',
              width: 54, height: 54, borderRadius: '50%',
              background: playing
                ? `radial-gradient(circle, ${sound.color} 0%, ${sound.color}aa 100%)`
                : `radial-gradient(circle, ${sound.color}25 0%, transparent 100%)`,
              border: `2.5px solid ${sound.color}`,
              boxShadow: playing
                ? `0 0 22px ${sound.color}, 0 0 44px ${sound.color}55, 0 0 66px ${sound.color}22`
                : hovered ? `0 0 14px ${sound.color}90` : `0 0 6px ${sound.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: playing ? 'default' : 'pointer',
              transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            {playing ? (
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <div style={{ width: 4, height: 16, borderRadius: 2, background: '#000' }} />
                <div style={{ width: 4, height: 16, borderRadius: 2, background: '#000' }} />
              </div>
            ) : (
              <div style={{
                width: 0, height: 0,
                borderLeft: `18px solid ${sound.color}`,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                marginLeft: 4,
              }} />
            )}
            {/* Pulse ring */}
            {!playing && (
              <motion.div
                style={{
                  position: 'absolute', inset: -8, borderRadius: '50%',
                  border: `1px solid ${sound.color}55`, pointerEvents: 'none',
                }}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </button>

          {/* Discord + Stream ready */}
          <p style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 10,
            color: `${sound.color}75`,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Discord + Stream ready
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function SoundboardDemo() {
  return (
    <section id="soundboard-pro" className="py-24 px-6 relative overflow-hidden">
      {/* Atmospheric background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 50% at 15% 5%, ${NEON_GREEN}07 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 85% 95%, ${NEON_PINK}06 0%, transparent 55%),
          radial-gradient(ellipse 40% 60% at 50% 50%, ${NEON_GOLD}04 0%, transparent 75%)
        `,
      }} />

      {/* Global scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.02, zIndex: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          {/* LIVE PREVIEW badge */}
          <div style={{ marginBottom: 20 }}>
            <motion.span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 18px', borderRadius: 999,
                background: `${NEON_GREEN}12`,
                border: `1px solid ${NEON_GREEN}50`,
                fontFamily: 'Orbitron, monospace',
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.22em',
                color: NEON_GREEN,
                textTransform: 'uppercase',
              } as React.CSSProperties}
              animate={{ boxShadow: [
                `0 0 8px ${NEON_GREEN}25`,
                `0 0 22px ${NEON_GREEN}60`,
                `0 0 8px ${NEON_GREEN}25`,
              ]}}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <motion.span
                style={{ width: 7, height: 7, borderRadius: '50%', background: NEON_GREEN, display: 'inline-block', flexShrink: 0 } as React.CSSProperties}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
              LIVE PREVIEW
            </motion.span>
          </div>

          {/* Neon-pulse + glitch title */}
          <motion.div
            style={{ marginBottom: 16, display: 'inline-block' } as React.CSSProperties}
            animate={{ filter: [
              `brightness(1) drop-shadow(0 0 8px ${NEON_GREEN}80)`,
              `brightness(1.25) drop-shadow(0 0 20px ${NEON_GREEN})`,
              `brightness(1) drop-shadow(0 0 8px ${NEON_GREEN}80)`,
            ]}}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.h2
              style={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: 'clamp(14px, 3.2vw, 32px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '0.04em',
                lineHeight: 1.35,
                margin: 0,
              }}
              animate={{ skewX: [0, 0, -2, 2, 0, 0], x: [0, 0, -3, 3, 0, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            >
              NEXUS SOUNDBOARD PRO
            </motion.h2>
          </motion.div>

          <p style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 13, color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.06em',
            maxWidth: 580, margin: '0 auto', lineHeight: 1.7,
          }}>
            50+ Legendary Fortnite &amp; Gaming Sounds • Sofort einsatzbereit für Discord &amp; Stream
          </p>
        </motion.div>

        {/* ── Sound Cards Grid – 2 cols desktop, 1 col mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {SOUNDS.map((s, i) => <SoundCard key={s.id} sound={s} index={i} />)}
        </div>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <motion.a
            href="#marketplace"
            style={{
              display: 'inline-block',
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(12px, 1.8vw, 14px)',
              fontWeight: 900,
              letterSpacing: '0.07em',
              padding: '18px 40px',
              borderRadius: 8,
              background: `linear-gradient(135deg, ${NEON_GOLD} 0%, #FF8C00 100%)`,
              color: '#000',
              textDecoration: 'none',
              textTransform: 'uppercase',
              cursor: 'pointer',
            } as React.CSSProperties}
            animate={{ boxShadow: [
              `0 0 18px ${NEON_GOLD}45, 0 4px 28px rgba(0,0,0,0.5)`,
              `0 0 38px ${NEON_GOLD}80, 0 0 55px ${NEON_GOLD}28, 0 4px 28px rgba(0,0,0,0.5)`,
              `0 0 18px ${NEON_GOLD}45, 0 4px 28px rgba(0,0,0,0.5)`,
            ]}}
            transition={{ duration: 2.2, repeat: Infinity }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            🛒 SOUNDBOARD PRO HOLEN – 19,99€ (Lifetime + 50+ Sounds + Updates)
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
