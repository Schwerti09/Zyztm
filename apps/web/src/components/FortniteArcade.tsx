import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_BLUE = '#00f2ff';
const NEON_GREEN = '#39FF14';

type AudioContextConstructor = typeof AudioContext;
declare global {
  interface Window { webkitAudioContext?: AudioContextConstructor; }
}

function getAudioContext(): AudioContext | null {
  try {
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    return Ctx ? new Ctx() : null;
  } catch {
    return null;
  }
}

/** Synthesize a Victory Royale-style fanfare */
function playVictoryRoyale() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.18);
    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + i * 0.18 + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.35);
    osc.start(ctx.currentTime + i * 0.18);
    osc.stop(ctx.currentTime + i * 0.18 + 0.4);
  });
}

/** Synthesize a Pickaxe Hit sound */
function playPickaxeHit() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Metallic thud: two oscillators + noise burst
  [200, 400].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.3, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.2 - i * 0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  });

  // Click attack
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let j = 0; j < data.length; j++) data[j] = (Math.random() * 2 - 1) * (1 - j / data.length);
  const src = ctx.createBufferSource();
  const gainN = ctx.createGain();
  src.buffer = buf;
  src.connect(gainN);
  gainN.connect(ctx.destination);
  gainN.gain.setValueAtTime(0.3, ctx.currentTime);
  src.start(ctx.currentTime);
}

/** Synthesize a Battle Bus horn */
function playBattleBus() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc.type = 'sawtooth';
  osc2.type = 'square';
  osc.frequency.setValueAtTime(110, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + 0.6);
  osc2.frequency.setValueAtTime(220, ctx.currentTime);
  osc2.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.6);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
  gain.gain.setValueAtTime(0.3, ctx.currentTime + 0.5);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

  osc.start(ctx.currentTime);
  osc2.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.85);
  osc2.stop(ctx.currentTime + 0.85);
}

interface FnSound {
  id: string;
  label: string;
  subLabel: string;
  emoji: string;
  color: string;
  play: () => void;
  duration: number; // ms
}

const FN_SOUNDS: FnSound[] = [
  {
    id: 'victory',
    label: 'VICTORY ROYALE!',
    subLabel: '#1 VICTORY ROYALE',
    emoji: '🏆',
    color: NEON_GOLD,
    play: playVictoryRoyale,
    duration: 900,
  },
  {
    id: 'pickaxe',
    label: 'PICKAXE HIT',
    subLabel: 'CLANG CLANG CLANG',
    emoji: '⛏️',
    color: NEON_BLUE,
    play: playPickaxeHit,
    duration: 300,
  },
  {
    id: 'battlebus',
    label: 'BATTLE BUS',
    subLabel: 'TOOT TOOT!',
    emoji: '🚌',
    color: NEON_GREEN,
    play: playBattleBus,
    duration: 900,
  },
];

export default function FortniteArcade() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [audioError, setAudioError] = useState(false);

  const handlePlay = (sound: FnSound) => {
    if (playing) return;
    setPlaying(sound.id);
    setLastPlayed(sound.id);
    setAudioError(false);
    try {
      sound.play();
    } catch {
      setAudioError(true);
    }
    setTimeout(() => setPlaying(null), sound.duration + 150);
  };

  return (
    <section className="py-20 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${NEON_PINK}04 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${NEON_PINK}40`, background: `${NEON_PINK}08`, color: NEON_PINK }}
          >
            🔊 FORTNITE SOUNDBOARD
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
            FORTNITE{' '}
            <span style={{ color: NEON_PINK, textShadow: `0 0 15px ${NEON_PINK}` }}>ARCADE</span>
          </h2>
          <p className="text-white/45">Klick auf einen Sound – direkt im Browser!</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FN_SOUNDS.map((sound, i) => {
            const isPlaying = playing === sound.id;
            return (
              <motion.button
                key={sound.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handlePlay(sound)}
                disabled={!!playing}
                aria-label={`${sound.label} abspielen`}
                className="relative rounded-2xl p-6 text-center flex flex-col items-center gap-3 cursor-pointer disabled:cursor-not-allowed"
                style={{
                  background: isPlaying
                    ? `linear-gradient(135deg, ${sound.color}20 0%, ${sound.color}10 100%)`
                    : `linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)`,
                  border: `2px solid ${isPlaying ? sound.color : `${sound.color}40`}`,
                  boxShadow: isPlaying
                    ? `0 0 40px ${sound.color}50, 0 0 80px ${sound.color}20`
                    : `0 4px 24px rgba(0,0,0,0.5)`,
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <motion.span
                  className="text-6xl"
                  animate={isPlaying ? { scale: [1, 1.25, 1], rotate: [-6, 6, -6] } : {}}
                  transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0 }}
                  style={{ filter: isPlaying ? `drop-shadow(0 0 18px ${sound.color})` : 'none' }}
                >
                  {sound.emoji}
                </motion.span>

                <div>
                  <p
                    className="font-cyber text-sm font-bold tracking-wider"
                    style={{ color: isPlaying ? sound.color : 'rgba(255,255,255,0.85)' }}
                  >
                    {sound.label}
                  </p>
                  <p
                    className="font-cyber text-[10px] tracking-widest mt-1"
                    style={{ color: isPlaying ? sound.color : 'rgba(255,255,255,0.35)' }}
                  >
                    {isPlaying ? '▶ SPIELT...' : '▷ ABSPIELEN'}
                  </p>
                </div>

                <span
                  className="font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded border"
                  style={{
                    color: sound.color,
                    borderColor: `${sound.color}40`,
                    background: `${sound.color}10`,
                  }}
                >
                  {sound.subLabel}
                </span>

                {/* Pulse ring when playing */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{ opacity: [0.6, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{ background: `radial-gradient(circle, ${sound.color}18 0%, transparent 70%)` }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Last played feedback */}
        <AnimatePresence>
          {lastPlayed && !audioError && (
            <motion.p
              key={lastPlayed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center font-cyber text-[11px] tracking-widest mt-6"
              style={{ color: FN_SOUNDS.find((s) => s.id === lastPlayed)?.color ?? 'white' }}
            >
              ✓ {FN_SOUNDS.find((s) => s.id === lastPlayed)?.label} GESPIELT
            </motion.p>
          )}
          {audioError && (
            <motion.p
              key="audio-error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center font-cyber text-[11px] tracking-widest mt-6 text-red-400"
            >
              ⚠ AUDIO NICHT VERFÜGBAR – Browser-Permission prüfen
            </motion.p>
          )}
        </AnimatePresence>

        <p className="text-center text-white/25 font-cyber text-[10px] tracking-widest mt-4">
          SYNTHESIZED VIA WEB AUDIO API · KEIN DOWNLOAD · DIREKTER BROWSER-SOUND
        </p>
      </div>
    </section>
  );
}
