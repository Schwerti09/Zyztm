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
  url: string;
  live?: boolean;
}

const FN_NEWS: FnNewsItem[] = [
  {
    id: 1,
    tag: 'PATCH NOTES',
    tagColor: NEON_GREEN,
    title: 'CHAPTER 6 SEASON 2 „LAWLESS" – OFFIZIELLE PATCH NOTES',
    teaser:
      'Die neue Season bringt Crime City, Outlaw Oasis, Shiny Shafts & Lonewolf Lair. Neue Heist-Mechanik: überfalle gepanzerte Züge, knacke Tresore & kaufe Mythic-Gear an Black Markets mit Dill Bits!',
    date: '21. Feb 2026',
    icon: '📋',
    url: 'https://www.dexerto.com/fortnite/fortnite-chapter-6-season-2-patch-notes-3137316/',
    live: true,
  },
  {
    id: 2,
    tag: 'COLLAB',
    tagColor: NEON_PINK,
    title: 'COWBOY BEBOP x FORTNITE – Spike & Faye jetzt im Item Shop!',
    teaser:
      'Spike Spiegel & Faye Valentine landen mit ikonischem Cel-Shading-Look in Fortnite. Bebop-Quests laufen bis 18. März – Belohnungen: exklusiver Wrap & Bebop Legends Loading Screen!',
    date: '28. Feb 2026',
    icon: '🚀',
    url: 'https://www.dexerto.com/fortnite/fortnite-cowboy-bebop-collab-release-date-cosmetics-3139930/',
  },
  {
    id: 3,
    tag: 'MYTHIC',
    tagColor: NEON_GOLD,
    title: 'NEUE WAFFEN: DOUBLE DOWN PISTOL, FALCON EYE SNIPER & CO.',
    teaser:
      'Fletcher Kanes Mythic Double Down Pistol & der Collateral Damage AR dominieren den neuen Meta. Dazu: Plasma Burst Laser, Falcon Eye Sniper, Thermite zum Tresor-Knacken & Med-Mist Grenade!',
    date: '21. Feb 2026',
    icon: '🔫',
    url: 'https://beebom.com/fortnite-chapter-6-season-2-patch-notes/',
  },
  {
    id: 4,
    tag: 'CROSSOVER',
    tagColor: NEON_BLUE,
    title: 'SUB-ZERO (MORTAL KOMBAT) IST JETZT IN FORTNITE!',
    teaser:
      'Sub-Zero bringt sein Kombat Kit mit einzigartigen Eiskräften nach Fortnite Chapter 6 Season 2. Der Skin ist im Item Shop erhältlich und passt perfekt zum Outlaw-Thema der Lawless Season.',
    date: '21. Feb 2026',
    icon: '🧊',
    url: 'https://www.cgmagonline.com/news/fortnite-lawless-brings-pickles-and-bebop/',
  },
  {
    id: 5,
    tag: 'MAP',
    tagColor: '#ff6b35',
    title: 'NEUE MAP: CRIME CITY, GOLD RUSH & HEIST-GAMEPLAY!',
    teaser:
      'Crime City dominiert die Kartenmitte mit neon-getränkter Großstadt-Atmosphäre. Gold Rush-Mechanic: Berühre goldene Quellen für Bewegungs-Buff. Armored Train & Vault-Heists sorgen für maximale Action!',
    date: '21. Feb 2026',
    icon: '🌆',
    url: 'https://esports.gg/news/fortnite/fortnite-chapter-6-season-2-patch-notes-everything-included-in-the-new-season/',
  },
  {
    id: 6,
    tag: 'BATTLE PASS',
    tagColor: '#00ff88',
    title: 'BATTLE PASS S2: CASSIDY QUINN, BIG DILL, VALENTINA & MEHR',
    teaser:
      'Der Season-2-Battle-Pass enthält Cassidy Quinn, Fletcher Kane, den rappenden Big Dill-Pickle, Valentina, Keisha Cross & Sub-Zero. Season läuft bis 2. Mai 2026 – jetzt freischalten!',
    date: '21. Feb 2026',
    icon: '🎫',
    url: 'https://www.dexerto.com/fortnite/fortnite-chapter-6-season-2-patch-notes-3137316/',
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
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read more about ${item.title} (opens in new tab)`}
          className="mt-2 block w-full py-2 rounded font-cyber text-[11px] tracking-widest font-bold transition-all duration-200 text-center"
          style={{
            background: hovered ? item.tagColor : `${item.tagColor}12`,
            border: `1px solid ${item.tagColor}60`,
            color: hovered ? '#000' : item.tagColor,
            boxShadow: hovered ? `0 0 16px ${item.tagColor}50` : 'none',
          }}
        >
          READ MORE →
        </a>
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
