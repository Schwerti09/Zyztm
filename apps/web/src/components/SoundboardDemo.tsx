import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';
const NEON_GOLD = '#ffd700';

interface Sound {
  id: string;
  label: string;
  emoji: string;
  color: string;
  // We'll synthesize sounds via the Web Audio API for demo (no file needed)
  freq: number;
  type: OscillatorType;
  duration: number;
}

const DEMO_SOUNDS: Sound[] = [
  { id: 'victory', label: 'VICTORY ROYALE!', emoji: '🏆', color: NEON_GOLD, freq: 880, type: 'sine', duration: 0.6 },
  { id: 'clutch', label: 'CLUTCH MOMENT!', emoji: '⚡', color: NEON_PINK, freq: 440, type: 'sawtooth', duration: 0.4 },
  { id: 'lets_go', label: "LET'S GOOOO!", emoji: '🔥', color: NEON_BLUE, freq: 660, type: 'square', duration: 0.5 },
];

type AudioContextConstructor = typeof AudioContext;
declare global {
  interface Window { webkitAudioContext?: AudioContextConstructor; }
}

function playBeep(freq: number, type: OscillatorType, duration: number) {
  try {
    const Ctx = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + duration);

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Audio not supported
  }
}

export default function SoundboardDemo() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [showBuy, setShowBuy] = useState(false);
  const clickCount = useRef(0);

  const handlePlay = (sound: Sound) => {
    if (playing) return;
    setPlaying(sound.id);
    playBeep(sound.freq, sound.type, sound.duration);
    setTimeout(() => {
      setPlaying(null);
      clickCount.current += 1;
      if (clickCount.current >= 2) {
        setShowBuy(true);
      }
    }, sound.duration * 1000 + 200);
  };

  return (
    <section className="py-20 px-6 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${NEON_BLUE}04 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5">
            <span className="text-neon-blue text-xs font-cyber tracking-widest">🎵 KOSTENLOSE VORSCHAU</span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            SOUNDBOARD{' '}
            <span style={{ color: NEON_BLUE, textShadow: `0 0 15px ${NEON_BLUE}` }}>DEMO</span>
          </h2>
          <p className="text-white/50">3 kostenlose Sounds zum Testen – über 50 Sounds im Pro-Paket!</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {DEMO_SOUNDS.map((sound, i) => {
            const isPlaying = playing === sound.id;
            return (
              <motion.button
                key={sound.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handlePlay(sound)}
                disabled={!!playing}
                className="relative rounded-xl p-6 text-center cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
                style={{
                  background: isPlaying
                    ? `linear-gradient(135deg, ${sound.color}20 0%, ${sound.color}10 100%)`
                    : 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(10,12,21,0.95) 100%)',
                  border: `2px solid ${isPlaying ? sound.color : `${sound.color}40`}`,
                  boxShadow: isPlaying
                    ? `0 0 30px ${sound.color}40, 0 0 60px ${sound.color}20`
                    : `0 4px 20px rgba(0,0,0,0.4)`,
                }}
              >
                <motion.div
                  animate={isPlaying ? { scale: [1, 1.2, 1], rotate: [-5, 5, -5] } : {}}
                  transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0 }}
                  className="text-5xl mb-3"
                >
                  {sound.emoji}
                </motion.div>
                <p
                  className="font-cyber text-sm font-bold tracking-wider"
                  style={{ color: isPlaying ? sound.color : 'rgba(255,255,255,0.8)' }}
                >
                  {sound.label}
                </p>
                <p className="text-white/30 text-xs font-cyber mt-2 tracking-widest">
                  {isPlaying ? '▶ SPIELT...' : '▷ ABSPIELEN'}
                </p>

                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{ opacity: [0.5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    style={{ background: `radial-gradient(circle, ${sound.color}15 0%, transparent 70%)` }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showBuy && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="cyber-card rounded-xl p-6 text-center"
              style={{ borderColor: `${NEON_GOLD}40`, background: `linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(13,17,23,0.9) 100%)` }}
            >
              <p className="text-neon-gold font-cyber text-lg font-bold mb-2">🔥 KLINGT GUT?</p>
              <p className="text-white/60 font-body text-sm mb-4">
                Das Zyztm Soundboard Pro hat über 50 Sounds – perfekt für Discord & Stream!
              </p>
              <a
                href="#marketplace"
                onClick={() => setShowBuy(false)}
                className="inline-block font-cyber text-xs tracking-widest px-6 py-3 rounded transition-all"
                style={{
                  background: `linear-gradient(90deg, ${NEON_GOLD}, ${NEON_GOLD}cc)`,
                  color: '#000',
                  fontWeight: 700,
                  boxShadow: `0 0 15px ${NEON_GOLD}50`,
                }}
              >
                🛒 SOUNDBOARD PRO HOLEN →
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {!showBuy && (
          <p className="text-center text-white/30 text-xs font-cyber tracking-widest">
            KOSTENLOSE DEMO · KEIN DOWNLOAD · DIREKT IM BROWSER
          </p>
        )}
      </div>
    </section>
  );
}
