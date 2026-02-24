import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEON_PINK = '#ff0055';

interface Reel {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  gradient: string;
  tag: string;
}

const REELS: Reel[] = [
  {
    id: 'r1',
    title: 'SOLO vs. SQUAD WIPE',
    subtitle: '4 Kills in 8 Sekunden – unmöglich? Nicht für Zyztm!',
    emoji: '💥',
    gradient: 'linear-gradient(135deg, #ff0055 0%, #cc0044 100%)',
    tag: 'CLUTCH',
  },
  {
    id: 'r2',
    title: 'VICTORY ROYALE #342',
    subtitle: 'Stream-Rekord: 3.598 gleichzeitige Zuschauer!',
    emoji: '🏆',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
    tag: 'LEGEND',
  },
  {
    id: 'r3',
    title: '360° NO-SCOPE',
    subtitle: 'Der Clip, der TikTok zum Explodieren brachte: 4,2M Views',
    emoji: '🎯',
    gradient: 'linear-gradient(135deg, #00f2ff 0%, #0070dd 100%)',
    tag: 'VIRAL',
  },
  {
    id: 'r4',
    title: 'BUILD BATTLE INSANE',
    subtitle: '94 Kills in einem einzigen Tournament – Weltklasse!',
    emoji: '🔨',
    gradient: 'linear-gradient(135deg, #53fc18 0%, #22bb00 100%)',
    tag: 'GOD MODE',
  },
  {
    id: 'r5',
    title: 'LAST ZONE WIN',
    subtitle: 'Nur 5 HP und trotzdem gewonnen – Herz aus Stahl!',
    emoji: '❤️',
    gradient: 'linear-gradient(135deg, #a335ee 0%, #7a1fcc 100%)',
    tag: 'LUCKY',
  },
];

export default function ClutchReel() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % REELS.length);
    }, 10000);
  };

  useEffect(() => {
    if (isAuto) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isAuto]);

  const go = (i: number) => {
    setCurrent(i);
    setIsAuto(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reel = REELS[current];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated background gradient from current reel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${NEON_PINK}06 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-pink/30 bg-neon-pink/5">
            <span className="text-neon-pink text-xs font-cyber tracking-widest">🎬 AUTO-REEL</span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            CLUTCH{' '}
            <span style={{ color: NEON_PINK, textShadow: `0 0 15px ${NEON_PINK}` }}>REEL</span>
          </h2>
          <p className="text-white/50">Die unvergesslichsten Momente – wechseln alle 10 Sekunden</p>
        </motion.div>

        {/* Main reel card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.97 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative rounded-2xl overflow-hidden mb-6"
            style={{
              aspectRatio: '16/7',
              background: 'linear-gradient(160deg, rgba(6,8,15,0.97) 0%, rgba(3,5,10,0.99) 100%)',
              border: `1px solid ${NEON_PINK}25`,
              boxShadow: `0 0 40px ${NEON_PINK}15, 0 8px 40px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Gradient overlay suggesting video content */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${reel.gradient.match(/#[0-9a-f]+/gi)?.[0] ?? NEON_PINK}15 0%, transparent 60%)` }}
            />

            {/* Scan line */}
            <motion.div
              className="absolute inset-x-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(to right, transparent, ${NEON_PINK}40, transparent)` }}
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [-3, 3, -3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-8xl mb-6"
                  style={{ filter: `drop-shadow(0 0 20px ${NEON_PINK})` }}
                >
                  {reel.emoji}
                </motion.div>
                <div
                  className="inline-block px-3 py-1 rounded font-cyber text-xs tracking-widest font-bold mb-4"
                  style={{ background: `${NEON_PINK}25`, border: `1px solid ${NEON_PINK}50`, color: NEON_PINK }}
                >
                  {reel.tag}
                </div>
                <h3
                  className="font-cyber text-2xl md:text-3xl font-bold text-white mb-3 glitch-text"
                  data-text={reel.title}
                >
                  {reel.title}
                </h3>
                <p className="text-white/60 font-body text-sm md:text-base max-w-lg mx-auto">
                  {reel.subtitle}
                </p>
              </div>
            </div>

            {/* Corner decorations */}
            {(['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'] as const).map((pos) => (
              <div
                key={pos}
                className={`absolute ${pos} w-5 h-5 pointer-events-none`}
                style={{
                  borderTop: pos.includes('top') ? `2px solid ${NEON_PINK}50` : 'none',
                  borderBottom: pos.includes('bottom') ? `2px solid ${NEON_PINK}50` : 'none',
                  borderLeft: pos.includes('left') ? `2px solid ${NEON_PINK}50` : 'none',
                  borderRight: pos.includes('right') ? `2px solid ${NEON_PINK}50` : 'none',
                }}
              />
            ))}

            {/* Progress bar */}
            {isAuto && (
              <motion.div
                key={`progress-${current}`}
                className="absolute bottom-0 left-0 h-0.5"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 10, ease: 'linear' }}
                style={{ background: `linear-gradient(to right, ${NEON_PINK}, ${NEON_PINK}80)` }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3">
          {REELS.map((r, i) => (
            <button
              key={r.id}
              onClick={() => go(i)}
              className="transition-all duration-300"
              style={{
                width: current === i ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: current === i ? NEON_PINK : 'rgba(255,255,255,0.2)',
                boxShadow: current === i ? `0 0 8px ${NEON_PINK}` : 'none',
              }}
              aria-label={`Reel ${i + 1}: ${r.title}`}
            />
          ))}
        </div>

        {!isAuto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <button
              onClick={() => { setIsAuto(true); startTimer(); }}
              className="font-cyber text-xs tracking-widest text-white/30 hover:text-white/60 transition-colors"
            >
              ▶ AUTO FORTSETZEN
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://kick.com/zyztm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
            style={{ borderColor: `${NEON_PINK}50`, color: NEON_PINK }}
          >
            🎬 ALLE CLIPS ANSEHEN →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
