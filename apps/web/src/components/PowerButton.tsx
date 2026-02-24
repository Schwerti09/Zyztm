import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';
import type { Channel } from './SocialCard';

const BLAST_EMOJIS = ['💥', '⚡', '🔥', '✨', '💫', '🎆', '🎇', '⭐'];

export default function PowerButton({ channels }: { channels: Channel[] }) {
  const [blasting, setBlasting] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const handlePower = () => {
    if (blasting) return;
    setBlasting(true);

    // Generate explosion particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.cos((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
      y: Math.sin((i / 12) * Math.PI * 2) * (60 + Math.random() * 40),
      emoji: BLAST_EMOJIS[i % BLAST_EMOJIS.length],
    }));
    setParticles(newParticles);

    // Flash effect for all cards
    channels.forEach((ch) => {
      const card = document.getElementById(`card-${ch.id}`);
      if (!card) return;
      card.classList.add('power-flash');
      card.addEventListener('animationend', () => card.classList.remove('power-flash'), { once: true });
    });

    // Open tabs with staggered delay to avoid popup blockers
    channels.forEach((ch, idx) => {
      setTimeout(() => {
        window.open(ch.url, '_blank');
      }, idx * 150);
    });

    showToast({ message: '💥 ZYZTM BLAST – Alle Kanäle geöffnet!', type: 'success' });

    setTimeout(() => {
      setBlasting(false);
      setParticles([]);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <p className="font-cyber text-white/50 text-sm tracking-widest uppercase">
        Zyztm Blast – Alle Kanäle auf einmal
      </p>
      <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
        {/* Pulsing rings */}
        <span
          className="power-ring absolute rounded-full"
          style={{ width: '100%', height: '100%', border: '2px solid #ff0055', inset: 0 }}
        />
        <span
          className="power-ring absolute rounded-full"
          style={{ width: '100%', height: '100%', border: '2px solid #ff0055', inset: 0, animationDelay: '0.5s' }}
        />

        {/* Explosion particles */}
        <AnimatePresence>
          {blasting && particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute text-xl pointer-events-none z-20"
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          animate={blasting ? {
            scale: [1, 1.4, 0.9, 1.1, 1],
            boxShadow: [
              '0 0 30px rgba(255,0,85,0.5)',
              '0 0 80px rgba(255,0,85,0.9), 0 0 120px rgba(255,215,0,0.5)',
              '0 0 40px rgba(255,0,85,0.6)',
              '0 0 30px rgba(255,0,85,0.5)',
            ],
          } : {}}
          transition={{ duration: 0.6 }}
          onClick={handlePower}
          aria-label="Zyztm Blast – Alle Kanäle öffnen"
          className="relative w-24 h-24 rounded-full font-cyber text-4xl flex items-center justify-center select-none z-10"
          style={{
            background: blasting
              ? 'linear-gradient(135deg, rgba(255,215,0,0.4), rgba(255,0,85,0.4))'
              : 'linear-gradient(135deg, rgba(255,0,85,0.25), rgba(13,17,23,0.95))',
            border: '2px solid #ff0055',
            boxShadow: '0 0 30px rgba(255,0,85,0.5), 0 0 60px rgba(255,0,85,0.2), inset 0 0 20px rgba(255,0,85,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {blasting ? '💥' : '⚡'}
        </motion.button>
      </div>
      <p className="text-white/25 text-xs font-cyber tracking-wider">KLICK = EXPLOSION</p>
    </div>
  );
}
