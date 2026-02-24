import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BASE_COUNT = 13742;
const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';

export default function FanCounter() {
  const [count, setCount] = useState(BASE_COUNT);

  useEffect(() => {
    // Simulate live fan count fluctuating slightly
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor((Math.random() - 0.3) * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-12 px-6 relative"
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="cyber-card rounded-2xl p-8 text-center relative overflow-hidden"
          style={{ borderColor: `${NEON_PINK}30` }}
        >
          {/* Background pulse */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${NEON_PINK}08 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10">
            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                className="w-2.5 h-2.5 rounded-full"
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: NEON_PINK, boxShadow: `0 0 8px ${NEON_PINK}` }}
              />
              <span className="font-cyber text-xs tracking-widest" style={{ color: NEON_PINK }}>
                JETZT IM ZYZTM-UNIVERSUM
              </span>
            </div>

            {/* Count */}
            <motion.div
              key={count}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="font-cyber text-5xl md:text-6xl font-bold mb-2"
              style={{
                color: NEON_BLUE,
                textShadow: `0 0 20px ${NEON_BLUE}, 0 0 40px ${NEON_BLUE}50`,
              }}
            >
              {count.toLocaleString('de-DE')}
            </motion.div>

            <p className="text-white/60 font-body text-lg">
              Fans gerade im{' '}
              <span className="font-cyber font-bold" style={{ color: NEON_PINK }}>
                Zyztm-Universum
              </span>
            </p>

            {/* Small stats */}
            <div className="flex justify-center gap-6 mt-6 flex-wrap">
              {[
                { label: 'KICK VIEWERS', value: '3.241', color: '#53fc18' },
                { label: 'DISCORD ONLINE', value: '1.847', color: '#5865f2' },
                { label: 'TIKTOK LIVE', value: '8.654', color: NEON_PINK },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-cyber text-lg font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-white/30 text-[10px] font-cyber tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
