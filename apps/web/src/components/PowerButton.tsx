import { motion } from 'framer-motion';
import { showToast } from './Toast';
import type { Channel } from './SocialCard';

export default function PowerButton({ channels }: { channels: Channel[] }) {
  const handlePower = () => {
    // Flash effect for all cards – removed via animationend to stay in sync with CSS
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

    showToast({ message: '🚀 Power Explosion – Alle Kanäle geöffnet!', type: 'success' });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      <p className="font-cyber text-white/50 text-sm tracking-widest uppercase">
        Alle Kanäle mit einem Klick
      </p>
      <div className="relative flex items-center justify-center">
        {/* Pulsing rings */}
        <span
          className="power-ring absolute rounded-full"
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid #ff0055',
            inset: 0,
          }}
        />
        <span
          className="power-ring absolute rounded-full"
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid #ff0055',
            inset: 0,
            animationDelay: '0.5s',
          }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePower}
          aria-label="Alle Kanäle öffnen"
          className="relative w-24 h-24 rounded-full font-cyber text-4xl flex items-center justify-center select-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,0,85,0.25), rgba(13,17,23,0.95))',
            border: '2px solid #ff0055',
            boxShadow:
              '0 0 30px rgba(255,0,85,0.5), 0 0 60px rgba(255,0,85,0.2), inset 0 0 20px rgba(255,0,85,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          ⚡
        </motion.button>
      </div>
    </div>
  );
}
