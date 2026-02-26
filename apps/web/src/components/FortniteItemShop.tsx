import { useState } from 'react';
import { motion } from 'framer-motion';

const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_BLUE = '#00f2ff';
const NEON_GREEN = '#39FF14';

interface FnItem {
  id: string;
  name: string;
  icon: string;
  type: string;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Uncommon';
  rarityColor: string;
  vbucks: number;
  description: string;
  featured?: boolean;
}

const FN_SHOP_ITEMS: FnItem[] = [
  {
    id: 'travis_scott',
    name: 'Astro Jack',
    icon: '🎤',
    type: 'OUTFIT',
    rarity: 'Legendary',
    rarityColor: NEON_GOLD,
    vbucks: 2000,
    description: 'Travis Scott kollaboriert mit Fortnite. Astronomical Edition!',
    featured: true,
  },
  {
    id: 'peely_god',
    name: 'Peely God',
    icon: '🍌',
    type: 'OUTFIT',
    rarity: 'Legendary',
    rarityColor: NEON_GOLD,
    vbucks: 2000,
    description: 'Der ultimative Peely – jetzt mit göttlichen Kräften ausgestattet.',
  },
  {
    id: 'midas_reborn',
    name: 'Midas Reborn',
    icon: '✨',
    type: 'OUTFIT',
    rarity: 'Legendary',
    rarityColor: NEON_GOLD,
    vbucks: 2000,
    description: 'Alles was er berührt wird zu Gold. Chapter 6 Edition.',
  },
  {
    id: 'renegade_raider_v2',
    name: 'Renegade Raider V2',
    icon: '🪖',
    type: 'OUTFIT',
    rarity: 'Rare',
    rarityColor: NEON_BLUE,
    vbucks: 1200,
    description: 'Der OG-Klassiker kehrt zurück – jetzt mit Neon-Effekten.',
  },
  {
    id: 'zy_pickaxe',
    name: 'ZY Exclusive Pickaxe',
    icon: '⛏️',
    type: 'HARVESTING TOOL',
    rarity: 'Epic',
    rarityColor: NEON_PINK,
    vbucks: 1500,
    description: 'Zyztm-signierte Spitzhacke. Limitiertes Collector-Item.',
  },
  {
    id: 'battle_bus_glider',
    name: 'Battle Bus Glider',
    icon: '🚌',
    type: 'GLIDER',
    rarity: 'Epic',
    rarityColor: NEON_PINK,
    vbucks: 1500,
    description: 'Gleite wie ein echter Battle Bus – mit Hupe-Emote inklusive!',
  },
];

const RARITY_BG: Record<string, string> = {
  [NEON_GOLD]: 'linear-gradient(135deg, rgba(255,215,0,0.18) 0%, rgba(255,140,0,0.08) 100%)',
  [NEON_PINK]: 'linear-gradient(135deg, rgba(255,0,255,0.18) 0%, rgba(180,0,200,0.08) 100%)',
  [NEON_BLUE]: 'linear-gradient(135deg, rgba(0,242,255,0.18) 0%, rgba(0,100,200,0.08) 100%)',
  [NEON_GREEN]: 'linear-gradient(135deg, rgba(57,255,20,0.18) 0%, rgba(0,200,50,0.08) 100%)',
};

function ShopCard({ item, index }: { item: FnItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const bg = RARITY_BG[item.rarityColor] ?? RARITY_BG[NEON_BLUE];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: hovered
          ? bg
          : `linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)`,
        border: `1px solid ${hovered ? item.rarityColor : `${item.rarityColor}35`}`,
        boxShadow: hovered
          ? `0 0 40px ${item.rarityColor}35, 0 8px 40px rgba(0,0,0,0.6)`
          : `0 4px 20px rgba(0,0,0,0.5)`,
        transition: 'all 0.25s ease',
        backdropFilter: 'blur(14px)',
      }}
    >
      {/* Featured banner */}
      {item.featured && (
        <div
          className="absolute top-2 left-2 z-10 font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded"
          style={{ background: item.rarityColor, color: '#000', fontWeight: 700 }}
        >
          ★ FEATURED
        </div>
      )}

      {/* Rarity stripe */}
      <div
        className="w-full py-1.5 px-4 flex justify-between items-center"
        style={{
          background: `linear-gradient(90deg, ${item.rarityColor}30, ${item.rarityColor}10, transparent)`,
          borderBottom: `1px solid ${item.rarityColor}20`,
        }}
      >
        <span
          className="font-cyber text-[10px] tracking-widest font-bold"
          style={{ color: item.rarityColor }}
        >
          {item.rarity.toUpperCase()}
        </span>
        <span className="font-cyber text-[10px] text-white/40 tracking-widest">{item.type}</span>
      </div>

      {/* Icon */}
      <div
        className="flex-1 flex items-center justify-center py-8"
        style={{
          background: hovered ? `radial-gradient(circle, ${item.rarityColor}15 0%, transparent 70%)` : 'transparent',
          transition: 'background 0.3s',
        }}
      >
        <motion.span
          className="text-7xl"
          animate={hovered ? { scale: [1, 1.15, 1], rotate: [-3, 3, -3] } : { scale: 1, rotate: 0 }}
          transition={hovered ? { duration: 0.8, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.3 }}
          style={{ filter: hovered ? `drop-shadow(0 0 18px ${item.rarityColor})` : 'none' }}
        >
          {item.icon}
        </motion.span>
      </div>

      {/* Info */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        <h3
          className="font-cyber text-sm font-bold text-center leading-tight"
          style={{ color: hovered ? item.rarityColor : 'white', transition: 'color 0.2s' }}
        >
          {item.name}
        </h3>
        <p className="text-white/45 text-xs text-center leading-relaxed line-clamp-2">{item.description}</p>

        {/* Price */}
        <div
          className="flex items-center justify-center gap-2 py-2 rounded-lg mt-1"
          style={{ background: `${item.rarityColor}12`, border: `1px solid ${item.rarityColor}30` }}
        >
          <span className="text-base">💎</span>
          <span
            className="font-cyber text-xl font-bold"
            style={{
              color: item.rarityColor,
              textShadow: hovered ? `0 0 12px ${item.rarityColor}` : `0 0 6px ${item.rarityColor}60`,
            }}
          >
            {item.vbucks.toLocaleString()}
          </span>
          <span className="font-cyber text-[10px] text-white/40 tracking-widest">V-BUCKS</span>
        </div>

        <button
          className="w-full py-2.5 rounded-xl font-cyber text-xs tracking-widest font-bold transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${item.rarityColor}, ${item.rarityColor}cc)`
              : `${item.rarityColor}12`,
            border: `1px solid ${item.rarityColor}60`,
            color: hovered ? '#000' : item.rarityColor,
            boxShadow: hovered ? `0 0 20px ${item.rarityColor}50` : 'none',
          }}
        >
          🛒 IN DEN SHOP
        </button>
      </div>
    </motion.div>
  );
}

export default function FortniteItemShop() {
  return (
    <section className="py-20 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${NEON_GOLD}04 0%, transparent 60%)`,
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
            style={{ borderColor: `${NEON_GOLD}40`, background: `${NEON_GOLD}08`, color: NEON_GOLD }}
          >
            🏪 DAILY ITEM SHOP
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
            FORTNITE{' '}
            <span style={{ color: NEON_GOLD, textShadow: `0 0 15px ${NEON_GOLD}` }}>
              ITEM SHOP
            </span>
          </h2>
          <p className="text-white/45">Heutige Featured &amp; Daily Items – exklusiv für Zyztm's Community</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {FN_SHOP_ITEMS.map((item, i) => (
            <ShopCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-cyber text-[10px] tracking-widest text-white/25 mt-8"
        >
          PREISE IN V-BUCKS · NICHT ECHTE WÄHRUNG · NUR ZUR ILLUSTRATION
        </motion.p>
      </div>
    </section>
  );
}
