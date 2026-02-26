import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  url: string;
  // position in percent (relative to map container)
  top: string;
  left: string;
  stats: string;
  detail: string;
  live?: boolean;
}

const MAP_NODES: MapNode[] = [
  {
    id: 'kick',
    label: 'KICK',
    icon: '🟢',
    color: '#53fc18',
    url: 'https://kick.com/zyztm',
    top: '28%',
    left: '22%',
    stats: '28.5K Follower',
    detail: 'Live jetzt? → kick.com/zyztm · Rekord: 3.598 Zuschauer',
    live: true,
  },
  {
    id: 'youtube',
    label: 'YOUTUBE',
    icon: '📺',
    color: '#ff0000',
    url: 'https://youtube.com/@Zyztm',
    top: '18%',
    left: '55%',
    stats: '356K Abos',
    detail: 'Neuestes Video auf YouTube · @Zyztm',
    live: false,
  },
  {
    id: 'tiktok',
    label: 'TIKTOK',
    icon: '🎵',
    color: '#ff0055',
    url: 'https://tiktok.com/@zyztm',
    top: '58%',
    left: '70%',
    stats: '651K Follower · 13,5M Likes',
    detail: 'Neuester Clip · 8,24% Engagement · @zyztm',
    live: false,
  },
  {
    id: 'instagram',
    label: 'INSTA',
    icon: '📸',
    color: '#e1306c',
    url: 'https://instagram.com/zyztm2.0',
    top: '72%',
    left: '35%',
    stats: 'Folge uns!',
    detail: 'Letztes Bild · @zyztm2.0',
    live: false,
  },
  {
    id: 'discord',
    label: 'DISCORD',
    icon: '💬',
    color: '#5865f2',
    url: 'https://discord.gg/zyztm',
    top: '42%',
    left: '48%',
    stats: '12K Mitglieder',
    detail: 'Community Hub · discord.gg/zyztm',
    live: false,
  },
];

function MapNode({ node, isHovered, onHover }: {
  node: MapNode;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  return (
    <div
      className="absolute"
      style={{ top: node.top, left: node.left, transform: 'translate(-50%, -50%)' }}
    >
      {/* Ripple for live node */}
      {node.live && (
        <>
          <span
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 56,
              height: 56,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: `2px solid ${node.color}`,
              animation: 'ripple 2s linear infinite',
            }}
          />
          <span
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 56,
              height: 56,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: `2px solid ${node.color}`,
              animation: 'ripple 2s linear infinite',
              animationDelay: '0.7s',
            }}
          />
        </>
      )}

      {/* Icon button */}
      <motion.a
        href={node.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center rounded-full cursor-pointer select-none z-10"
        style={{
          width: 52,
          height: 52,
          background: isHovered
            ? `radial-gradient(circle, ${node.color}40 0%, ${node.color}15 100%)`
            : `radial-gradient(circle, ${node.color}20 0%, rgba(13,17,23,0.9) 100%)`,
          border: `2px solid ${node.color}${isHovered ? 'ff' : '70'}`,
          boxShadow: isHovered
            ? `0 0 20px ${node.color}80, 0 0 40px ${node.color}30`
            : `0 0 8px ${node.color}30`,
          fontSize: 24,
          transition: 'box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease',
        }}
        animate={node.live ? { scale: [1, 1.06, 1] } : {}}
        transition={node.live ? { duration: 2, repeat: Infinity } : {}}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        onClick={(e) => e.stopPropagation()}
        aria-label={`${node.label} öffnen`}
      >
        {node.icon}
      </motion.a>

      {/* Label below icon */}
      <div
        className="absolute font-cyber text-[9px] tracking-widest text-center pointer-events-none"
        style={{
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: 4,
          color: node.color,
          textShadow: `0 0 6px ${node.color}`,
          whiteSpace: 'nowrap',
        }}
      >
        {node.label}
      </div>

      {/* Hover preview card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 pointer-events-none"
            style={{
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              minWidth: 180,
            }}
          >
            <div
              className="rounded-lg px-3 py-2.5 text-center"
              style={{
                background: 'rgba(6,8,15,0.96)',
                border: `1px solid ${node.color}60`,
                boxShadow: `0 0 20px ${node.color}25`,
              }}
            >
              <p
                className="font-cyber text-xs font-bold mb-0.5"
                style={{ color: node.color }}
              >
                {node.icon} {node.label}
              </p>
              <p className="text-white/80 text-[11px] font-cyber">{node.stats}</p>
              <p className="text-white/40 text-[10px] mt-1 leading-snug">{node.detail}</p>
              {node.live && (
                <span
                  className="inline-block mt-1 text-[9px] font-cyber tracking-widest px-1.5 py-0.5 rounded"
                  style={{ background: `${node.color}25`, color: node.color, border: `1px solid ${node.color}50` }}
                >
                  🔴 LIVE
                </span>
              )}
              {/* Arrow */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                style={{ background: 'rgba(6,8,15,0.96)', border: `1px solid ${node.color}60`, borderTop: 'none', borderLeft: 'none' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ZyztmLiveMap() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-gold/30 bg-neon-gold/5">
            <span className="text-neon-gold text-xs font-cyber tracking-widest">🗺️ ZYZTM UNIVERSE</span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            LIVE <span className="text-neon-blue neon-text-blue">MAP</span>
          </h2>
          <p className="text-white/50 text-sm">Interaktive Karte aller Zyztm-Plattformen – hover für Details, klick zum Besuchen</p>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '16/7',
            background: `
              radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,242,255,0.06) 0%, transparent 70%),
              linear-gradient(180deg, rgba(0,15,30,0.97) 0%, rgba(5,10,20,0.99) 100%)
            `,
            border: '1px solid rgba(0,242,255,0.18)',
            boxShadow: '0 0 60px rgba(0,242,255,0.08), inset 0 0 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Grid lines (Fortnite map style) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="mapgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,242,255,0.06)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mapgrid)" />
          </svg>

          {/* Glowing center cross */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 1,
              height: '60%',
              background: 'linear-gradient(to bottom, transparent, rgba(0,242,255,0.12), transparent)',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(0,242,255,0.12), transparent)',
            }}
          />

          {/* Scan line animation */}
          <motion.div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              height: 2,
              background: 'linear-gradient(to right, transparent, rgba(0,242,255,0.3), transparent)',
            }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />

          {/* Sector labels */}
          {[
            { text: 'STREAM ZONE', top: '8%', left: '10%' },
            { text: 'CONTENT HUB', top: '8%', left: '65%' },
            { text: 'SOCIAL DISTRICT', top: '82%', left: '50%' },
          ].map((s) => (
            <div
              key={s.text}
              className="absolute font-cyber text-[9px] tracking-[0.2em] pointer-events-none"
              style={{ top: s.top, left: s.left, color: 'rgba(0,242,255,0.2)' }}
            >
              {s.text}
            </div>
          ))}

          {/* Map nodes */}
          {MAP_NODES.map((node) => (
            <MapNode
              key={node.id}
              node={node}
              isHovered={hoveredId === node.id}
              onHover={setHoveredId}
            />
          ))}

          {/* Corner decoration */}
          {(['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'] as const).map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-4 h-4 pointer-events-none`}
              style={{
                border: '2px solid rgba(0,242,255,0.3)',
                borderRight: pos.includes('right') ? '2px solid rgba(0,242,255,0.3)' : 'none',
                borderBottom: pos.includes('bottom') ? '2px solid rgba(0,242,255,0.3)' : 'none',
                borderLeft: pos.includes('left') ? '2px solid rgba(0,242,255,0.3)' : 'none',
                borderTop: pos.includes('top') ? '2px solid rgba(0,242,255,0.3)' : 'none',
              }}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          {MAP_NODES.map((node) => (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 hover:scale-105"
              style={{
                borderColor: `${node.color}30`,
                background: `${node.color}08`,
                color: node.color,
                textDecoration: 'none',
              }}
            >
              <span>{node.icon}</span>
              <span className="font-cyber text-xs tracking-wider">{node.label}</span>
              <span className="text-[10px] opacity-60">{node.stats}</span>
              {node.live && (
                <span className="text-[9px] font-cyber px-1 py-0.5 rounded" style={{ background: `${node.color}25`, border: `1px solid ${node.color}50` }}>
                  LIVE
                </span>
              )}
            </a>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
