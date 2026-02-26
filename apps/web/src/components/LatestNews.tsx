import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEON_GREEN = '#39FF14';
const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_BLUE = '#00f2ff';

interface NewsItem {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  teaser: string;
  date: string;
  readTime: string;
  icon: string;
  url: string;
  imgBg: string;
  imgEmoji: string;
}

const ALL_NEWS: NewsItem[] = [
  {
    id: 1,
    tag: 'EVENT',
    tagColor: NEON_GOLD,
    title: 'LANTERN FEST 2026 – 8-PLAYER RELOAD TEAMS',
    teaser:
      'Das Lantern Festival kehrt zurück mit dem neuen 8-Spieler Reload Teams Modus! Erlebe spektakuläre Feuerwerke, exklusive Lantern-Cosmetics und zeitlich begrenzte Quests. Limited-Edition Pickaxe nur bis 25. Feb erhältlich.',
    date: '18. Feb 2026',
    readTime: '3 min',
    icon: '🏮',
    url: 'https://www.fortnite.com/news/lantern-fest-2026',
    imgBg: `linear-gradient(135deg, ${NEON_GOLD}30 0%, #ff6b0020 60%, ${NEON_GOLD}10 100%)`,
    imgEmoji: '🏮',
  },
  {
    id: 2,
    tag: 'PATCH',
    tagColor: NEON_GREEN,
    title: 'NEW ANTI-CHEAT PC REQUIREMENTS – WAS DU WISSEN MUSST',
    teaser:
      'Epic Games verschärft die Anti-Cheat-Anforderungen massiv. EasyAntiCheat erzwingt nun Kernel-Level-Zugriff. Minimum: Windows 10 22H2, TPM 2.0, Secure Boot. Alle Details zu den neuen System-Anforderungen und was das für deinen Setup bedeutet.',
    date: '10. Feb 2026',
    readTime: '5 min',
    icon: '🛡️',
    url: 'https://www.epicgames.com/fortnite/news/anti-cheat-requirements-2026',
    imgBg: `linear-gradient(135deg, ${NEON_GREEN}25 0%, #003300 60%, ${NEON_GREEN}08 100%)`,
    imgEmoji: '🛡️',
  },
  {
    id: 3,
    tag: 'EVENT',
    tagColor: NEON_PINK,
    title: "LOVE & LEGENDS COLLIDE IN FEBRUARY",
    teaser:
      'Valentinstag trifft Fortnite: Love & Legends Event bringt romantische POIs, exklusive Heart-Burst Emotes und das ikonische "Together Forever" Duo-Bundle. Limited-Time Mode: Love Loot nur mit deinem Squad. Skins & Challenges ab sofort verfügbar!',
    date: '5. Feb 2026',
    readTime: '4 min',
    icon: '💘',
    url: 'https://www.fortnite.com/news/love-legends-february-2026',
    imgBg: `linear-gradient(135deg, ${NEON_PINK}25 0%, #330033 60%, ${NEON_PINK}08 100%)`,
    imgEmoji: '💘',
  },
  {
    id: 4,
    tag: 'COLLAB',
    tagColor: NEON_BLUE,
    title: 'CHAPPELL ROAN IN FORTNITE FESTIVAL SEASON 13',
    teaser:
      'Pop-Sensation Chappell Roan betritt Fortnite Festival Season 13 als Headliner! Exklusive Outfits, ein komplettes Roan Stage Bundle und ihre Hits als spielbare Tracks. Main Stage-Event am 14. Feb mit Millionen Live-Zuschauern weltweit.',
    date: '3. Feb 2026',
    readTime: '4 min',
    icon: '🎤',
    url: 'https://www.fortnite.com/news/chappell-roan-festival-season-13',
    imgBg: `linear-gradient(135deg, ${NEON_BLUE}25 0%, #001133 60%, ${NEON_BLUE}08 100%)`,
    imgEmoji: '🎤',
  },
  {
    id: 5,
    tag: 'PATCH',
    tagColor: NEON_GREEN,
    title: 'V39.50 UPDATE – LANTERN FEST & POWER HOURS',
    teaser:
      'v39.50 ist live: Lantern Fest Integration, neue Power Hour Events (doppelte EP jeden Abend), Balancing-Fixes für den Kinetic Boomerang und Twitch-Drop-Verbindung reaktiviert. Dazu: Bugfixes für das neue Crime City POI und Map-Adjustments.',
    date: '19. Feb 2026',
    readTime: '6 min',
    icon: '⚡',
    url: 'https://www.fortnite.com/news/v39-50-patch-notes',
    imgBg: `linear-gradient(135deg, ${NEON_GREEN}25 0%, #001100 60%, ${NEON_GREEN}08 100%)`,
    imgEmoji: '⚡',
  },
  {
    id: 6,
    tag: 'LEAK',
    tagColor: '#ff6b35',
    title: 'CHAPTER 7 SEASON 2 LEAKS / ROADMAP – MÄRZ 2026',
    teaser:
      'Exklusive Datamine-Leaks enthüllen Chapter 7 Season 2 Roadmap für März 2026: Neue Biom "Stormrift", Graviton-Mechanik, 3 bestätigte Kollaborationen (Anime-Tier) und das Comeback von OG-Weapons. Season-Start: voraussichtlich 15. März 2026.',
    date: 'März 2026',
    readTime: '7 min',
    icon: '🔮',
    url: 'https://www.dexerto.com/fortnite/chapter-7-season-2-leaks-roadmap',
    imgBg: `linear-gradient(135deg, #ff6b3525 0%, #1a0800 60%, #ff6b3508 100%)`,
    imgEmoji: '🔮',
  },
];

const EXTRA_NEWS: NewsItem[] = [
  {
    id: 7,
    tag: 'EVENT',
    tagColor: NEON_GOLD,
    title: 'ARMORED TRAIN HEIST – NEUES GAMEPLAY FEATURE',
    teaser:
      'Der gepanzerte Zug durchquert die Map in festen Intervallen. Überfalle ihn mit deinem Squad, knacke den Vault an Bord und sichre dir Mythic-Loot. Achtung: NPC-Wachen auf höchstem Schwierigkeitsgrad!',
    date: '21. Feb 2026',
    readTime: '4 min',
    icon: '🚂',
    url: 'https://www.dexerto.com/fortnite/armored-train-heist-chapter-6-season-2',
    imgBg: `linear-gradient(135deg, ${NEON_GOLD}25 0%, #1a1100 60%, ${NEON_GOLD}08 100%)`,
    imgEmoji: '🚂',
  },
  {
    id: 8,
    tag: 'COLLAB',
    tagColor: NEON_PINK,
    title: 'COWBOY BEBOP X FORTNITE – SPIKE & FAYE IM SHOP',
    teaser:
      'Spike Spiegel & Faye Valentine landen im Fortnite Item Shop! Ikonisches Cel-Shading-Design, authentische Bebop-Accessories und Bebop-Quests bis 18. März mit exklusivem Wrap als Belohnung.',
    date: '28. Feb 2026',
    readTime: '3 min',
    icon: '🚀',
    url: 'https://www.dexerto.com/fortnite/cowboy-bebop-fortnite-collab',
    imgBg: `linear-gradient(135deg, ${NEON_PINK}25 0%, #330022 60%, ${NEON_PINK}08 100%)`,
    imgEmoji: '🚀',
  },
  {
    id: 9,
    tag: 'ZYZTM',
    tagColor: NEON_GREEN,
    title: 'ZYZTM TURNIER – 5.000€ PRIZE POOL ANNOUNCED',
    teaser:
      'Das offizielle ZYZTM Fortnite Turnier ist bestätigt: 5.000€ Prize Pool, 64 Slots, Custom Lobbies. Anmeldung ab sofort über den offiziellen Discord. Format: Duo-Squads, Chapter 6 Ruleset, 3 Runden.',
    date: '25. Feb 2026',
    readTime: '5 min',
    icon: '🏆',
    url: 'https://discord.gg/zyztm',
    imgBg: `linear-gradient(135deg, ${NEON_GREEN}25 0%, #001100 60%, ${NEON_GREEN}08 100%)`,
    imgEmoji: '🏆',
  },
];

const HOT_ITEMS = [
  { text: 'v39.50 LIVE – Lantern Fest & Power Hours', icon: '⚡', color: NEON_GREEN },
  { text: 'Chapter 7 Season 2 Leaks – März 2026 Roadmap enthüllt', icon: '🔮', color: NEON_PINK },
  { text: 'Chappell Roan x Fortnite Festival Season 13', icon: '🎤', color: NEON_BLUE },
  { text: 'Lantern Fest: 8-Player Reload Teams jetzt verfügbar', icon: '🏮', color: NEON_GOLD },
  { text: 'New Anti-Cheat Requirements – Update Now!', icon: '🛡️', color: NEON_GREEN },
  { text: 'Love & Legends Event LIVE bis 14. Feb', icon: '💘', color: NEON_PINK },
  { text: 'Cowboy Bebop Collab – Spike & Faye im Item Shop', icon: '🚀', color: NEON_GOLD },
  { text: 'ZYZTM Turnier 5.000€ Prize Pool – Jetzt anmelden!', icon: '🏆', color: NEON_GREEN },
  { text: 'Armored Train Heist – Neues Gameplay Feature', icon: '🚂', color: NEON_BLUE },
  { text: 'Crime City – Neue Map POI Details', icon: '🌆', color: NEON_PINK },
];

// ---- Particle component (decorative dots that burst on hover) ----
function ParticleBurst({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  const particles = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {particles.map((i) => {
        const angle = (i / 10) * 360;
        const dist = 40 + Math.random() * 40;
        const x = Math.cos((angle * Math.PI) / 180) * dist;
        const y = Math.sin((angle * Math.PI) / 180) * dist;
        const size = 2 + Math.random() * 3;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: i % 2 === 0 ? color : NEON_GOLD,
              left: '50%',
              top: '50%',
              boxShadow: `0 0 6px ${color}`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x, y, opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.6 + Math.random() * 0.4, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

// ---- Lightbox ----
function Lightbox({
  item,
  onClose,
}: {
  item: NewsItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(16px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
          style={{
            background: item.imgBg,
            border: `1px solid ${item.tagColor}60`,
            boxShadow: `0 0 60px ${item.tagColor}40, 0 24px 80px rgba(0,0,0,0.8)`,
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Lightbox thumbnail area */}
          <div
            className="flex items-center justify-center py-20 relative"
            style={{ background: item.imgBg }}
          >
            <div className="text-9xl">{item.imgEmoji}</div>
            {/* scanlines overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
              }}
            />
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-cyber text-xs px-3 py-1 rounded border tracking-widest"
                style={{
                  color: item.tagColor,
                  borderColor: `${item.tagColor}40`,
                  background: `${item.tagColor}15`,
                }}
              >
                {item.tag}
              </span>
              <span className="text-white/40 text-xs font-cyber">{item.date}</span>
              <span className="text-white/30 text-xs">• {item.readTime} read</span>
            </div>
            <h3
              className="font-cyber text-2xl font-bold mb-4 leading-tight"
              style={{ color: item.tagColor, textShadow: `0 0 20px ${item.tagColor}50` }}
            >
              {item.title}
            </h3>
            <p className="text-white/65 text-sm leading-relaxed mb-6">{item.teaser}</p>
            <div className="flex gap-3">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read full article: ${item.title} (opens in new tab)`}
                className="flex-1 py-3 rounded font-cyber text-xs tracking-widest font-bold text-center transition-all duration-200"
                style={{
                  background: item.tagColor,
                  color: '#000',
                  boxShadow: `0 0 20px ${item.tagColor}60`,
                }}
              >
                READ FULL PATCH →
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded font-cyber text-xs tracking-widest border transition-all duration-200 text-white/60 hover:text-white"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---- News Card ----
function NewsCard({ item, index, onImageClick }: { item: NewsItem; index: number; onImageClick: (item: NewsItem) => void }) {
  const [hovered, setHovered] = useState(false);
  const [burst, setBurst] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setTilt({ x, y });
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 800);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl overflow-hidden flex flex-col cursor-pointer select-none"
      style={{
        background: hovered
          ? `linear-gradient(135deg, rgba(14,16,28,0.98) 0%, rgba(8,10,20,1) 100%)`
          : `linear-gradient(135deg, rgba(10,12,20,0.93) 0%, rgba(6,8,15,0.97) 100%)`,
        border: `1px solid ${hovered ? item.tagColor : `${item.tagColor}30`}`,
        boxShadow: hovered
          ? `0 0 40px ${item.tagColor}35, 0 0 80px ${item.tagColor}15, 0 16px 48px rgba(0,0,0,0.7), inset 0 0 40px ${item.tagColor}05`
          : `0 4px 24px rgba(0,0,0,0.55)`,
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? 6 : 0}px)`,
        transition: hovered ? 'border 0.2s, box-shadow 0.2s' : 'all 0.35s ease',
        backdropFilter: 'blur(14px)',
        willChange: 'transform',
      }}
    >
      {/* Scanlines overlay */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-xl"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 6px)',
            animation: 'scanlines-drift 8s linear infinite',
          }}
        />
      )}

      {/* Glitch border pulse on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl z-10"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{
            boxShadow: `inset 0 0 20px ${item.tagColor}20`,
            border: `1px solid ${item.tagColor}60`,
          }}
        />
      )}

      {/* Particle Burst */}
      <ParticleBurst active={burst} color={item.tagColor} />

      {/* Thumbnail */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden cursor-zoom-in"
        style={{ background: item.imgBg, borderBottom: `1px solid ${item.tagColor}20` }}
        onClick={() => onImageClick(item)}
        role="button"
        aria-label={`View full image for ${item.title}`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onImageClick(item)}
      >
        <motion.div
          className="text-6xl z-10 relative"
          animate={{ scale: hovered ? 1.15 : 1, y: hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {item.imgEmoji}
        </motion.div>

        {/* Image zoom shimmer */}
        {hovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, ${item.tagColor}15 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Bottom shimmer line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          animate={{ opacity: hovered ? 1 : 0.3 }}
          style={{ background: `linear-gradient(90deg, transparent, ${item.tagColor}, transparent)` }}
        />

        {/* Zoom icon hint */}
        {hovered && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded bg-black/50 flex items-center justify-center">
            <span className="text-[10px]">🔍</span>
          </div>
        )}

        {/* Glitch effect on thumbnail hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: [-2, 2, -1, 0], opacity: [0, 0.6, 0.3, 0] }}
            transition={{ duration: 0.15, repeat: 3, repeatDelay: 2 }}
            style={{ background: `${item.tagColor}15`, mixBlendMode: 'screen' }}
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-4 flex-1 flex flex-col gap-2.5">
        {/* Tag + Date row */}
        <div className="flex items-center justify-between gap-2">
          <span
            className="font-cyber text-[10px] px-2.5 py-0.5 rounded border tracking-widest shrink-0"
            style={{
              color: item.tagColor,
              borderColor: `${item.tagColor}40`,
              background: `${item.tagColor}12`,
              boxShadow: hovered ? `0 0 8px ${item.tagColor}30` : 'none',
            }}
          >
            {item.tag}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-white/35 text-[10px] font-cyber">{item.date}</span>
            <span className="text-white/20 text-[10px]">•</span>
            <span className="text-white/30 text-[10px]">{item.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <motion.h3
          className="font-cyber text-sm font-bold leading-snug"
          animate={{ color: hovered ? item.tagColor : '#ffffff' }}
          transition={{ duration: 0.2 }}
          style={{ textShadow: hovered ? `0 0 12px ${item.tagColor}60` : 'none' }}
        >
          {item.title}
        </motion.h3>

        {/* Teaser */}
        <p className="text-white/48 text-xs leading-relaxed line-clamp-3 flex-1">{item.teaser}</p>

        {/* READ FULL PATCH button */}
        <motion.a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read full patch notes: ${item.title} (opens in new tab)`}
          className="mt-1 flex items-center justify-center gap-2 py-2.5 rounded font-cyber text-[11px] tracking-widest font-bold transition-colors duration-200 relative overflow-hidden group"
          style={{
            background: hovered ? item.tagColor : `${item.tagColor}10`,
            border: `1px solid ${item.tagColor}55`,
            color: hovered ? '#000' : item.tagColor,
            boxShadow: hovered ? `0 0 20px ${item.tagColor}55` : 'none',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => e.stopPropagation()}
        >
          READ FULL PATCH
          <motion.span
            animate={{ x: hovered ? [0, 4, 0] : 0 }}
            transition={{ duration: 0.5, repeat: hovered ? Infinity : 0, repeatType: 'loop' }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </motion.article>
  );
}

// ---- Glitch Heading ----
function GlitchHeading() {
  return (
    <h2
      className="font-cyber text-3xl md:text-5xl font-black text-white relative inline-block glitch-text"
      data-text="LATEST NEWS • CHAPTER 6 BATTLE LOG"
    >
      <span style={{ color: NEON_GREEN, textShadow: `0 0 20px ${NEON_GREEN}, 0 0 40px ${NEON_GREEN}50` }}>
        LATEST NEWS
      </span>{' '}
      <span className="text-white/30">•</span>{' '}
      <span style={{ color: NEON_GOLD, textShadow: `0 0 20px ${NEON_GOLD}, 0 0 40px ${NEON_GOLD}50` }}>
        CHAPTER 6
      </span>{' '}
      <span className="text-white">BATTLE LOG</span>
    </h2>
  );
}

// ---- Load More Button ----
function LoadMoreButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className="relative font-cyber text-sm tracking-widest font-bold px-10 py-4 rounded-lg overflow-hidden"
      style={{
        background: loading
          ? 'rgba(57,255,20,0.05)'
          : `linear-gradient(135deg, ${NEON_GREEN}18, ${NEON_GREEN}08)`,
        border: `1px solid ${loading ? NEON_GREEN + '30' : NEON_GREEN + '55'}`,
        color: loading ? `${NEON_GREEN}60` : NEON_GREEN,
        boxShadow: loading ? 'none' : `0 0 24px ${NEON_GREEN}20`,
      }}
      whileHover={!loading ? { scale: 1.04, boxShadow: `0 0 40px ${NEON_GREEN}40` } : {}}
      whileTap={!loading ? { scale: 0.97 } : {}}
    >
      {loading ? (
        <span className="flex items-center gap-3">
          <motion.span
            className="w-4 h-4 rounded-full border-2 block"
            style={{ borderColor: `${NEON_GREEN}40`, borderTopColor: NEON_GREEN }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
          />
          LOADING...
        </span>
      ) : (
        <span className="flex items-center gap-2">
          LOAD MORE NEWS
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </span>
      )}
    </motion.button>
  );
}

// ---- Main Export ----
export default function LatestNews() {
  const [showExtra, setShowExtra] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<NewsItem | null>(null);
  const [tickerPaused, setTickerPaused] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setShowExtra(true);
      setLoading(false);
    }, 1400);
  };

  const displayedNews = showExtra ? [...ALL_NEWS, ...EXTRA_NEWS] : ALL_NEWS;

  const tickerItems = [...HOT_ITEMS, ...HOT_ITEMS];

  return (
    <section id="latest-news" className="py-20 px-4 md:px-6 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${NEON_GREEN}05 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 80%, ${NEON_PINK}04 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{
              borderColor: `${NEON_GREEN}40`,
              background: `${NEON_GREEN}08`,
              color: NEON_GREEN,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full block"
              style={{ background: NEON_GREEN, boxShadow: `0 0 8px ${NEON_GREEN}` }}
            />
            BATTLE LOG LIVE
          </div>
          <div className="block">
            <GlitchHeading />
          </div>
          <p className="text-white/40 mt-3 text-sm">
            Real-time Fortnite News, Patches &amp; Chapter 6 Events • Stand: Februar 2026
          </p>
        </motion.div>

        {/* HOT RIGHT NOW Ticker */}
        <div className="mb-10 relative overflow-hidden rounded-lg"
          style={{
            background: `linear-gradient(90deg, rgba(57,255,20,0.06), rgba(255,215,0,0.04), rgba(255,0,255,0.06))`,
            border: `1px solid ${NEON_GREEN}20`,
          }}
        >
          <div className="flex items-stretch">
            {/* Label */}
            <div
              className="shrink-0 flex items-center px-4 py-3 z-10"
              style={{
                background: `linear-gradient(90deg, rgba(3,5,10,1) 80%, transparent)`,
                paddingRight: '2.5rem',
              }}
            >
              <span
                className="font-cyber text-[10px] tracking-widest font-bold whitespace-nowrap flex items-center gap-2"
                style={{ color: NEON_GOLD }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="w-2 h-2 rounded-full block"
                  style={{ background: NEON_GOLD, boxShadow: `0 0 8px ${NEON_GOLD}` }}
                />
                HOT RIGHT NOW
              </span>
            </div>

            {/* Ticker */}
            <div
              className="flex-1 overflow-hidden py-3"
              onMouseEnter={() => setTickerPaused(true)}
              onMouseLeave={() => setTickerPaused(false)}
            >
              <div
                className="flex gap-0 whitespace-nowrap"
                style={{
                  animation: 'latest-news-ticker 50s linear infinite',
                  animationPlayState: tickerPaused ? 'paused' : 'running',
                }}
              >
                {tickerItems.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-6">
                    <span className="text-sm">{item.icon}</span>
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
          </div>

          {/* Right fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(3,5,10,0.95))' }}
          />
        </div>

        {/* 3-Column Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedNews.map((item, i) => (
            <NewsCard
              key={item.id}
              item={item}
              index={i}
              onImageClick={setLightboxItem}
            />
          ))}
        </div>

        {/* Load More */}
        {!showExtra && (
          <div className="flex justify-center mt-12">
            <LoadMoreButton onClick={handleLoadMore} loading={loading} />
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}

      <style>{`
        @keyframes latest-news-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scanlines-drift {
          0% { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }
      `}</style>
    </section>
  );
}
