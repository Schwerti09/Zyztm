import { useState } from 'react';
import { motion } from 'framer-motion';

const NEON_GREEN = '#39FF14';
const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_BLUE = '#00f2ff';

const TICKER_ITEMS = [
  { text: 'New Skin: NEXUS Exclusive', icon: '🎮', color: NEON_GREEN },
  { text: '2x XP Weekend ACTIVE', icon: '⚡', color: NEON_GOLD },
  { text: 'New Map POI: The Underworld', icon: '🗺️', color: NEON_BLUE },
  { text: 'v31.10 Live Now', icon: '🔥', color: NEON_PINK },
  { text: 'Travis Scott Collab Confirmed', icon: '🎤', color: NEON_GOLD },
  { text: 'Zerostorm Rifle – Mythic Loot', icon: '🔫', color: NEON_GREEN },
  { text: 'Tilted Towers Returns!', icon: '🏙️', color: NEON_BLUE },
  { text: 'Chapter 6 Season 2 Teaser Leaked', icon: '📱', color: NEON_PINK },
  { text: 'NEXUS Turnier: 5.000€ Prize Pool', icon: '🏆', color: NEON_GOLD },
  { text: 'Battle Pass Level 87 – Grind Mode ON', icon: '💪', color: NEON_GREEN },
];

export default function HotRightNow() {
  const [paused, setPaused] = useState(false);

  // Duplicate items for infinite loop effect
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section className="py-0 relative overflow-hidden">
      {/* Top border */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${NEON_GREEN}60, ${NEON_GOLD}60, ${NEON_PINK}60, transparent)` }} />

      <div
        className="relative py-3"
        style={{
          background: `linear-gradient(90deg, rgba(57,255,20,0.06) 0%, rgba(255,215,0,0.04) 50%, rgba(255,0,255,0.06) 100%)`,
          borderTop: `1px solid ${NEON_GREEN}20`,
          borderBottom: `1px solid ${NEON_GREEN}20`,
        }}
      >
        {/* HOT RIGHT NOW label */}
        <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 shrink-0"
          style={{
            background: `linear-gradient(90deg, rgba(3,5,10,1) 75%, transparent)`,
            paddingRight: '2rem',
          }}
        >
          <span
            className="font-cyber text-[10px] tracking-widest font-bold whitespace-nowrap flex items-center gap-1.5"
            style={{ color: NEON_GREEN }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full block"
              style={{ background: NEON_GREEN, boxShadow: `0 0 8px ${NEON_GREEN}` }}
            />
            HOT RIGHT NOW
          </span>
        </div>

        {/* Scrolling ticker */}
        <div
          className="overflow-hidden ml-44"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-0 whitespace-nowrap"
            style={{
              animation: `ticker-scroll 40s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 px-6">
                <span className="text-base">{item.icon}</span>
                <span
                  className="font-cyber text-xs font-bold tracking-wide"
                  style={{ color: item.color, textShadow: `0 0 8px ${item.color}50` }}
                >
                  {item.text}
                </span>
                <span className="text-white/25 mx-2 font-bold">•</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(3,5,10,0.9))' }}
        />
      </div>

      {/* Bottom border */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${NEON_PINK}60, ${NEON_GOLD}60, ${NEON_GREEN}60, transparent)` }} />

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
