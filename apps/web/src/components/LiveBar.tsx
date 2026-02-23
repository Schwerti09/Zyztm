import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveBar() {
  const [viewers, setViewers] = useState(3241);
  const [discord, setDiscord] = useState(1847);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 34, s: 10 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor((Math.random() - 0.5) * 100));
      setDiscord((d) => d + Math.floor((Math.random() - 0.5) * 20));
      setTimeLeft((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 3; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neon-pink/30">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-cyber">
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_#ff0055]" />
            <span className="text-neon-pink font-bold tracking-widest">LIVE AUF KICK</span>
          </motion.div>
          <span className="text-white/50">|</span>
          <span className="text-white/80">👁 {viewers.toLocaleString()} ZUSCHAUER</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-white/60">
            NÄCHSTER STREAM:{' '}
            <span
              className="text-neon-blue font-bold glitch-text"
              data-text={`${String(timeLeft.h).padStart(2,'0')}:${String(timeLeft.m).padStart(2,'0')}:${String(timeLeft.s).padStart(2,'0')}`}
              style={{ textShadow: '0 0 8px #00f2ff, 0 0 20px #00f2ff' }}
            >
              {String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}
            </span>
          </span>
          <span className="text-white/80">💬 {discord.toLocaleString()} ONLINE</span>
        </div>
        <a href="/dashboard" className="text-neon-blue hover:text-white transition-colors text-xs tracking-widest">
          NEXUS →
        </a>
      </div>
    </div>
  );
}
