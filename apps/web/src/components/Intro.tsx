import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_MESSAGES = [
  'ZYZTM NEXUS OS v2.4.1 — INITIALISIERUNG...',
  'KERNEL GELADEN ✓',
  'NEON-PROTOKOLL AKTIV ✓',
  'VERBINDUNG WIRD HERGESTELLT...',
  'STREAM-INTERFACE BEREIT ✓',
  'ZUGANG GEWÄHRT ✓',
];

export default function Intro() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('intro-seen');
  });
  const [videoFailed, setVideoFailed] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSkip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    sessionStorage.setItem('intro-seen', '1');
    setShowIntro(false);
  }, []);

  const handleEnded = () => {
    handleSkip();
  };

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    // Auto-dismiss after 10 seconds
    timerRef.current = setTimeout(handleSkip, 10000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showIntro, handleSkip]);

  // Typewriter boot sequence for fallback
  useEffect(() => {
    if (!showIntro) return;
    let step = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const advance = () => {
      step += 1;
      setBootStep(step);
      if (step < BOOT_MESSAGES.length) {
        timers.push(setTimeout(advance, 420));
      }
    };
    timers.push(setTimeout(advance, 600));
    return () => timers.forEach(clearTimeout);
  }, [showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Cyber grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,242,255,0.06) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,242,255,0.06) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Radial vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)',
            }}
          />

          {/* Video (when available) */}
          {!videoFailed && (
            <video
              autoPlay
              muted
              playsInline
              onEnded={handleEnded}
              onError={handleVideoError}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>
          )}

          {/* Animated scan line */}
          <motion.div
            className="absolute inset-x-0 h-[2px] pointer-events-none z-20"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.7), transparent)',
              top: 0,
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Fallback overlay (always rendered, visible when video fails or is absent) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Title with animated glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 100 }}
            >
              <motion.h1
                className="font-cyber text-6xl md:text-9xl font-black text-neon-pink text-center"
                animate={{
                  textShadow: [
                    '0 0 20px #ff0055, 0 0 60px #ff0055, 0 0 120px #ff0055',
                    '0 0 30px #ff0055, 0 0 80px #ff0055, 0 0 160px #ff0055',
                    '2px 0 #00f2ff, -2px 0 #ff0055, 0 0 40px #ff0055',
                    '0 0 20px #ff0055, 0 0 60px #ff0055, 0 0 120px #ff0055',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
              >
                ZYZTM NEXUS
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.4em' }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-cyber text-xl md:text-3xl text-neon-blue mt-4"
              style={{ textShadow: '0 0 10px #00f2ff, 0 0 30px #00f2ff' }}
            >
              CREATOR CODE: JOJOJO
            </motion.p>

            {/* Boot messages */}
            <div className="mt-8 font-mono text-xs text-left w-72 space-y-1">
              {BOOT_MESSAGES.slice(0, bootStep).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: i === bootStep - 1 ? '#00f2ff' : 'rgba(0,242,255,0.35)' }}
                >
                  &gt; {msg}
                </motion.div>
              ))}
              {bootStep > 0 && bootStep < BOOT_MESSAGES.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  style={{ color: '#00f2ff', display: 'inline-block' }}
                >
                  █
                </motion.span>
              )}
            </div>

            {/* Loading bar */}
            <div className="mt-5 w-72 h-[2px]" style={{ background: 'rgba(0,242,255,0.15)' }}>
              <motion.div
                className="h-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 9.5, ease: 'linear' }}
                style={{
                  background: 'linear-gradient(90deg, #00f2ff, #ff0055)',
                  boxShadow: '0 0 8px #00f2ff',
                }}
              />
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={handleSkip}
            className="absolute bottom-10 right-10 font-cyber text-sm tracking-widest px-6 py-3 border border-white/30 text-white/70 hover:text-white hover:border-white/60 transition-all duration-300 cursor-pointer"
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            ÜBERSPRINGEN ▶
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
