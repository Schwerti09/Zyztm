import { useState } from 'react';
import { motion } from 'framer-motion';

const NEON_GREEN = '#39FF14';
const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_BLUE = '#00f2ff';

interface FnNewsItem {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  teaser: string;
  date: string;
  icon: string;
  live?: boolean;
}

const FN_NEWS: FnNewsItem[] = [
  {
    id: 1,
    tag: 'PATCH NOTES',
    tagColor: NEON_GREEN,
    title: 'v31.10 PATCH NOTES – Neue Waffen & Map-Änderungen',
    teaser:
      'Mythic Pump Shotgun zurück, neue Storm-Mechanic & Battle Bus-Route geändert. Full patchlist jetzt live!',
    date: '20. Feb 2026',
    icon: '📋',
    live: true,
  },
  {
    id: 2,
    tag: 'EVENT',
    tagColor: NEON_PINK,
    title: 'TRAVIS SCOTT KONZERT – Astronomical Returns!',
    teaser:
      'Das legendäre In-Game Konzert kommt zurück – Chapter 6 Edition mit exklusivem Astro-Jack Skin Drop!',
    date: '22. Feb 2026',
    icon: '🎤',
  },
  {
    id: 3,
    tag: 'MYTHIC',
    tagColor: NEON_GOLD,
    title: 'NEUER MYTHIC WEAPON: Zerostorm Rifle',
    teaser:
      'Die neue Zerostorm Rifle löscht Zero-Build Gegner in 2 Shots. Nur bei The Underworld POI looten!',
    date: '21. Feb 2026',
    icon: '🔫',
  },
  {
    id: 4,
    tag: 'ZYZTM',
    tagColor: NEON_BLUE,
    title: 'ZYZTM TURNIER ANGEKÜNDIGT – 5.000€ Preisgeld!',
    teaser:
      'Zyztm veranstaltet sein erstes Community-Turnier mit 5.000€ Preisgeld. Anmeldung ab sofort im Discord!',
    date: '24. Feb 2026',
    icon: '🏆',
  },
  {
    id: 5,
    tag: 'SEASON',
    tagColor: '#ff6b35',
    title: 'CHAPTER 6 SEASON 2 – FIRST TEASER LEAKED!',
    teaser:
      'Erste offizielle Teaser deuten auf ein Neon-Noir Metropolis Theme hin. Neue Mechs & Cyberpunk-Skins incoming!',
    date: '25. Feb 2026',
    icon: '🌆',
  },
  {
    id: 6,
    tag: 'OG MAP',
    tagColor: '#00ff88',
    title: 'OG MAP RETURNS – Tilted Towers ist BACK!',
    teaser:
      'Fortnite OG Map kehrt für 2 Wochen zurück. Tilted Towers, Dusty Depot & Loot Lake in voller Chapter-1-Glory!',
    date: '26. Feb 2026',
    icon: '🗺️',
  },
];

function GlitchHeading() {
  return (
    <h2
      className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block glitch-text"
      data-text="CHAPTER 6 NEWS & PATCH NOTES"
    >
      CHAPTER 6{' '}
      <span style={{ color: NEON_GREEN, textShadow: `0 0 15px ${NEON_GREEN}, 0 0 30px ${NEON_GREEN}60` }}>
        NEWS
      </span>{' '}
      &amp;{' '}
      <span style={{ color: NEON_GOLD, textShadow: `0 0 15px ${NEON_GOLD}, 0 0 30px ${NEON_GOLD}60` }}>
        PATCH NOTES
      </span>
    </h2>
  );
}

function NewsCard({ item, index }: { item: FnNewsItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(14,16,28,0.97) 0%, rgba(8,10,20,0.99) 100%)`
          : `linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)`,
        border: `1px solid ${hovered ? item.tagColor : `${item.tagColor}35`}`,
        boxShadow: hovered
          ? `0 0 30px ${item.tagColor}40, 0 8px 40px rgba(0,0,0,0.6)`
          : `0 4px 20px rgba(0,0,0,0.5)`,
        transition: 'all 0.25s ease',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Thumbnail */}
      <div
        className="h-32 flex items-center justify-center text-5xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${item.tagColor}20, ${item.tagColor}08)`,
          borderBottom: `1px solid ${item.tagColor}25`,
        }}
      >
        <motion.span
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
        >
          {item.icon}
        </motion.span>

        {/* LIVE badge */}
        {item.live && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full"
            style={{ background: '#ff0000cc', border: '1px solid #ff000080' }}>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-red-400 block"
            />
            <span className="font-cyber text-[10px] text-white font-bold tracking-widest">LIVE</span>
          </div>
        )}

        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${item.tagColor}60, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className="font-cyber text-[10px] px-2 py-0.5 rounded border tracking-widest"
            style={{
              color: item.tagColor,
              borderColor: `${item.tagColor}40`,
              background: `${item.tagColor}12`,
            }}
          >
            {item.tag}
          </span>
          <span className="text-white/35 text-xs">{item.date}</span>
        </div>

        <h3
          className="font-cyber text-sm font-bold leading-snug flex-1"
          style={{ color: hovered ? item.tagColor : 'white', transition: 'color 0.2s' }}
        >
          {item.title}
        </h3>

        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{item.teaser}</p>

        {/* READ MORE button */}
        <button
          className="mt-2 w-full py-2 rounded font-cyber text-[11px] tracking-widest font-bold transition-all duration-200"
          style={{
            background: hovered ? item.tagColor : `${item.tagColor}12`,
            border: `1px solid ${item.tagColor}60`,
            color: hovered ? '#000' : item.tagColor,
            boxShadow: hovered ? `0 0 16px ${item.tagColor}50` : 'none',
          }}
        >
          READ MORE →
        </button>
      </div>
    </motion.article>
  );
}

export default function FortniteNewsSection() {
  return (
    <section className="py-20 px-6 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${NEON_GREEN}06 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{
              borderColor: `${NEON_GREEN}40`,
              background: `${NEON_GREEN}08`,
              color: NEON_GREEN,
            }}
          >
            🎮 FORTNITE NEXUS — BREAKING
          </div>
          <div className="block">
            <GlitchHeading />
          </div>
          <p className="text-white/45 mt-3">Alle aktuellen Fortnite Updates, Leaks &amp; Events</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FN_NEWS.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
