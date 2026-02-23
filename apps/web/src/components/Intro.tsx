import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Intro() {
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem('intro-seen');
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSkip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    sessionStorage.setItem('intro-seen', '1');
    setShowIntro(false);
  }, []);

  const handleEnded = () => {
    handleSkip();
  };

  useEffect(() => {
    if (!showIntro) return;
    // Auto-dismiss after 10 seconds
    timerRef.current = setTimeout(handleSkip, 10000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [showIntro, handleSkip]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          <video
            autoPlay
            muted
            playsInline
            onEnded={handleEnded}
            onError={handleSkip}
            className="w-full h-full object-cover"
          >
            <source src="/intro.mp4" type="video/mp4" />
          </video>

          {/* Fallback overlay when no video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-cyber text-6xl md:text-8xl font-black text-neon-pink"
              style={{ textShadow: '0 0 20px #ff0055, 0 0 60px #ff0055, 0 0 120px #ff0055' }}
            >
              ZYZTM NEXUS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="font-cyber text-2xl md:text-3xl text-neon-blue mt-4 tracking-widest"
              style={{ textShadow: '0 0 10px #00f2ff, 0 0 30px #00f2ff' }}
            >
              CREATOR CODE: JOJOJO
            </motion.p>
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
