import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ─── Color Palette ─── */
const NEON_GREEN = '#39FF14'; // neon green
const GOLD = '#FFD700';       // victory gold
const PINK = '#FF2D78';       // fortnite pink
const CYAN = '#00f2ff';

/* ─── Constants ─── */
const CREATOR_CODE = 'JOJOJO';
const PARTICLE_BURST_COUNT = 8;
const PARTICLE_SPREAD_RADIUS = 30;

/* ─── Official Shop Items ─── */
interface FnItem {
  id: string; name: string; icon: string; type: string;
  rarity: string; color: string; vbucks: number; featured?: boolean;
}

const FEATURED_ITEMS: FnItem[] = [
  { id: 'midas6', name: 'Midas Ch.6', icon: '✨', type: 'OUTFIT', rarity: 'LEGENDARY', color: GOLD, vbucks: 2000, featured: true },
  { id: 'astrojack', name: 'Astro Jack', icon: '🎤', type: 'OUTFIT', rarity: 'LEGENDARY', color: GOLD, vbucks: 2000, featured: true },
  { id: 'jonesey_neon', name: 'Neon Jonesey', icon: '🕹️', type: 'OUTFIT', rarity: 'EPIC', color: PINK, vbucks: 1500 },
];

const DAILY_ITEMS: FnItem[] = [
  { id: 'renegade2', name: 'Renegade Raider V2', icon: '🪖', type: 'OUTFIT', rarity: 'RARE', color: CYAN, vbucks: 1200 },
  { id: 'zy_pick', name: 'ZY Pickaxe', icon: '⛏️', type: 'HARVESTING', rarity: 'EPIC', color: PINK, vbucks: 1500 },
  { id: 'battlebus_gli', name: 'Battle Bus Glider', icon: '🚌', type: 'GLIDER', rarity: 'EPIC', color: PINK, vbucks: 1500 },
  { id: 'victoryumbrella', name: 'Victory Umbrella', icon: '☂️', type: 'GLIDER', rarity: 'RARE', color: NEON_GREEN, vbucks: 800 },
  { id: 'boogiewoogie', name: 'Boogie Woogie', icon: '🕺', type: 'EMOTE', rarity: 'UNCOMMON', color: CYAN, vbucks: 500 },
  { id: 'rift_wrap', name: 'Rift Wrap', icon: '🌀', type: 'WRAP', rarity: 'RARE', color: NEON_GREEN, vbucks: 300 },
];

/* ─── Exclusive Drop Products ─── */
interface ExclItem {
  id: string; name: string; icon: string; price: string;
  badge: 'BEST SELLER' | 'LIMITED' | 'NEW DROP' | 'HOT 🔥';
  badgeColor: string; color: string; desc: string; stars: number;
}

const EXCL_ITEMS: ExclItem[] = [
  {
    id: 'soundboard_pro', name: 'Soundboard Pro', icon: '🎛️',
    price: '€9.99', badge: 'BEST SELLER', badgeColor: GOLD, color: GOLD,
    desc: '200+ Fortnite FX, custom sweaty sounds, pro stream-ready pack.', stars: 5,
  },
  {
    id: 'preset_pack', name: 'Preset Pack Vol.2', icon: '🎨',
    price: '€7.99', badge: 'HOT 🔥', badgeColor: PINK, color: PINK,
    desc: "Zyztm's personal color-grading LUTs & Lightroom presets.", stars: 5,
  },
  {
    id: 'ai_wallpaper', name: 'AI Wallpaper Bundle', icon: '🖼️',
    price: '€4.99', badge: 'NEW DROP', badgeColor: NEON_GREEN, color: NEON_GREEN,
    desc: '50x AI-generated 4K Fortnite wallpapers – exclusive art.', stars: 4,
  },
  {
    id: 'loadout_guide', name: 'Pro Loadout Guide', icon: '📖',
    price: '€12.99', badge: 'LIMITED', badgeColor: PINK, color: PINK,
    desc: 'Chapter 6 meta builds, keybinds, settings & ranked strategies.', stars: 5,
  },
  {
    id: 'pickaxe_sound', name: 'Exclusive Pickaxe Sound Pack', icon: '🔊',
    price: '€6.99', badge: 'LIMITED', badgeColor: GOLD, color: GOLD,
    desc: 'Custom hit-sounds & pickaxe audio for stream & video edits.', stars: 4,
  },
];

/* ─── Helpers ─── */
function Stars({ n, color }: { n: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < n ? color : 'rgba(255,255,255,0.15)', fontSize: 11 }}>★</span>
      ))}
    </div>
  );
}

/* ─── Official Shop Card ─── */
function OfficialCard({ item, idx }: { item: FnItem; idx: number }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative rounded-xl overflow-hidden flex flex-col cursor-pointer select-none"
      style={{
        background: hov
          ? `linear-gradient(135deg, ${item.color}18 0%, rgba(10,12,20,0.93) 100%)`
          : 'linear-gradient(135deg,rgba(10,12,20,0.93)0%,rgba(6,8,15,0.97)100%)',
        border: `1px solid ${hov ? item.color : item.color + '30'}`,
        boxShadow: hov ? `0 0 32px ${item.color}30, 0 6px 32px rgba(0,0,0,0.6)` : '0 4px 18px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(14px)',
        transition: 'all 0.22s ease',
      }}
    >
      {item.featured && (
        <div className="absolute top-2 left-2 z-10 font-cyber text-[8px] tracking-widest px-2 py-0.5 rounded"
          style={{ background: item.color, color: '#000', fontWeight: 800 }}>★ FEATURED</div>
      )}
      <div className="py-1 px-3 flex justify-between items-center"
        style={{ background: `linear-gradient(90deg,${item.color}25,transparent)`, borderBottom: `1px solid ${item.color}18` }}>
        <span className="font-cyber text-[9px] font-bold" style={{ color: item.color }}>{item.rarity}</span>
        <span className="font-cyber text-[9px] text-white/35">{item.type}</span>
      </div>
      <div className="flex-1 flex items-center justify-center py-6"
        style={{ background: hov ? `radial-gradient(circle,${item.color}12 0%,transparent 70%)` : 'transparent', transition: 'background 0.25s' }}>
        <motion.span className="text-5xl"
          animate={hov ? { scale: [1, 1.12, 1], rotate: [-4, 4, -4] } : { scale: 1, rotate: 0 }}
          transition={hov ? { duration: 0.7, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.25 }}
          style={{ filter: hov ? `drop-shadow(0 0 14px ${item.color})` : 'none' }}>
          {item.icon}
        </motion.span>
      </div>
      <div className="px-3 pb-3 flex flex-col gap-1.5">
        <h4 className="font-cyber text-xs font-bold text-center leading-tight"
          style={{ color: hov ? item.color : 'white', transition: 'color 0.2s' }}>{item.name}</h4>
        <div className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg"
          style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
          <span className="text-sm">💎</span>
          <span className="font-cyber text-base font-bold" style={{ color: item.color }}>{item.vbucks.toLocaleString()}</span>
          <span className="font-cyber text-[9px] text-white/35">V-BUCKS</span>
        </div>
        <button className="w-full py-2 rounded-lg font-cyber text-[10px] tracking-widest font-bold transition-all duration-200"
          style={{
            background: hov ? `linear-gradient(90deg,${item.color},${item.color}bb)` : `${item.color}10`,
            border: `1px solid ${item.color}50`,
            color: hov ? '#000' : item.color,
            boxShadow: hov ? `0 0 16px ${item.color}45` : 'none',
          }}>
          🛒 KAUFEN
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Exclusive Drop Card with 3D Tilt + Particle Burst + Glitch ─── */
function ExclCard({ item, idx }: { item: ExclItem; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const particleIdRef = useRef(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const glowX = useTransform(springY, [-15, 15], [-20, 20]);
  const glowY = useTransform(springX, [-15, 15], [20, -20]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 14);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 14);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    setHov(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const spawnParticles = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const batch = Array.from({ length: PARTICLE_BURST_COUNT }, () => ({
      id: ++particleIdRef.current,
      x: x + (Math.random() - 0.5) * PARTICLE_SPREAD_RADIUS,
      y: y + (Math.random() - 0.5) * PARTICLE_SPREAD_RADIUS,
    }));
    setParticles(prev => [...prev, ...batch]);
    setTimeout(() => setParticles(prev => prev.filter(p => !batch.find(b => b.id === p.id))), 700);
  }, []);

  // Glitch keyframes injected once via style tag
  useEffect(() => {
    const id = 'dis-glitch-style';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = `
        @keyframes dis-glitch {
          0%,88%,100%{transform:translate(0,0);opacity:0}
          89%{transform:translate(-3px,1px);opacity:0.7;clip-path:polygon(0 25%,100% 25%,100% 45%,0 45%)}
          91%{transform:translate(3px,-2px);opacity:0.7;clip-path:polygon(0 55%,100% 55%,100% 70%,0 70%)}
          93%{transform:translate(-2px,2px);opacity:0}
        }
        @keyframes dis-scanline {
          0%{transform:translateY(-100%)}100%{transform:translateY(200%)}
        }
        @keyframes dis-particle-rise {
          0%{transform:translate(0,0) scale(1);opacity:1}
          100%{transform:translate(var(--tx),var(--ty)) scale(0);opacity:0}
        }
      `;
      document.head.appendChild(s);
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.09 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleMouseLeave}
      onClick={spawnParticles}
      style={{
        rotateX: springX, rotateY: springY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      className="relative rounded-2xl overflow-hidden flex flex-col cursor-pointer select-none"
    >
      {/* Glass BG */}
      <div className="absolute inset-0 rounded-2xl" style={{
        background: hov
          ? `linear-gradient(135deg,${item.color}20 0%,rgba(6,8,15,0.95) 60%,${PINK}10 100%)`
          : 'linear-gradient(135deg,rgba(13,17,23,0.92)0%,rgba(6,8,15,0.97)100%)',
        border: `1.5px solid ${hov ? item.color : item.color + '30'}`,
        boxShadow: hov
          ? `0 0 50px ${item.color}35, 0 10px 50px rgba(0,0,0,0.7), inset 0 1px 0 ${item.color}30`
          : `0 4px 24px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)`,
        backdropFilter: 'blur(18px)',
        transition: 'all 0.25s ease',
      }} />

      {/* Scanlines overlay */}
      {hov && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '40px',
            background: `linear-gradient(transparent, ${item.color}12, transparent)`,
            animation: 'dis-scanline 1.2s linear infinite',
          }} />
          {/* Static scanline texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Glitch overlay */}
      {hov && (
        <div className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
          style={{
            background: `linear-gradient(135deg,${item.color}08,transparent)`,
            animation: 'dis-glitch 2.2s infinite',
            color: item.color,
          }} />
      )}

      {/* Glow shimmer */}
      {hov && (
        <motion.div className="absolute pointer-events-none z-10 rounded-full"
          style={{
            width: 120, height: 120, borderRadius: '50%',
            background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)`,
            filter: 'blur(18px)',
            left: glowX, top: glowY,
          }} />
      )}

      {/* Particle burst */}
      {particles.map(p => {
        const customProps: Record<string, string> = {
          '--tx': `${(Math.random() - 0.5) * 60}px`,
          '--ty': `${-(20 + Math.random() * 50)}px`,
        };
        return (
          <div key={p.id} className="absolute pointer-events-none z-30"
            style={{
              left: `${p.x}%`, top: `${p.y}%`,
              width: 6, height: 6, borderRadius: '50%',
              background: item.color,
              boxShadow: `0 0 8px ${item.color}`,
              animation: 'dis-particle-rise 0.7s ease-out forwards',
              ...customProps,
            } as React.CSSProperties} />
        );
      })}

      {/* Badge */}
      <div className="absolute top-3 right-3 z-30">
        <span className="font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded font-black"
          style={{ background: item.badgeColor, color: '#000', boxShadow: `0 0 10px ${item.badgeColor}60` }}>
          {item.badge}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3 p-5">
        {/* Icon area */}
        <div className="flex items-center justify-center h-20"
          style={{ background: hov ? `radial-gradient(circle,${item.color}15 0%,transparent 65%)` : 'transparent', borderRadius: 12, transition: 'background 0.3s' }}>
          <motion.span className="text-5xl"
            animate={hov ? { scale: [1, 1.2, 1], rotate: [-5, 5, -5] } : { scale: 1, rotate: 0 }}
            transition={hov ? { duration: 0.75, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.3 }}
            style={{ filter: hov ? `drop-shadow(0 0 16px ${item.color}) drop-shadow(0 0 30px ${item.color}80)` : 'none' }}>
            {item.icon}
          </motion.span>
        </div>

        {/* Name */}
        <div>
          <h3 className="font-cyber text-sm font-black text-center leading-tight mb-1"
            style={{ color: hov ? item.color : 'white', textShadow: hov ? `0 0 14px ${item.color}` : 'none', transition: 'all 0.2s' }}>
            {item.name}
          </h3>
          <p className="text-white/50 text-xs text-center leading-relaxed">{item.desc}</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center"><Stars n={item.stars} color={item.color} /></div>

        {/* Price row */}
        <div className="flex items-center justify-between px-1">
          <span className="font-cyber text-2xl font-black"
            style={{ color: item.color, textShadow: hov ? `0 0 18px ${item.color}` : `0 0 8px ${item.color}60` }}>
            {item.price}
          </span>
          <span className="font-cyber text-[9px] text-white/30 tracking-widest">EINMALIGER KAUF</span>
        </div>

        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl font-cyber text-xs tracking-widest font-black transition-all duration-200"
          style={{
            background: hov
              ? `linear-gradient(90deg, ${item.color}, ${item.color}cc)`
              : `linear-gradient(90deg, ${item.color}18, ${item.color}08)`,
            border: `1.5px solid ${item.color}${hov ? 'dd' : '40'}`,
            color: hov ? '#000' : item.color,
            boxShadow: hov ? `0 0 24px ${item.color}55, 0 4px 20px rgba(0,0,0,0.5)` : 'none',
          }}>
          ⚡ SOFORT DOWNLOAD
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function FortniteItemShop() {
  return (
    <section id="daily-item-shop" className="py-20 px-4 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${GOLD}05 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 100%, ${NEON_GREEN}04 0%, transparent 50%)`,
      }} />
      {/* Scanline texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Section Header ── */}
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${GOLD}45`, background: `${GOLD}0a`, color: GOLD }}>
            🏆 DAILY ITEM SHOP
          </div>
          <h2 className="font-cyber text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
            ZYZTM{' '}
            <span style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}, 0 0 50px ${GOLD}60` }}>FORTNITE</span>
            {' '}NEXUS
          </h2>
          <p className="text-white/40 text-sm tracking-wide">Today's official drops + exclusive Zyztm digital products</p>
        </motion.div>

        {/* ── Creator Code Banner ── */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="mb-12 rounded-2xl overflow-hidden relative"
          style={{
            background: `linear-gradient(135deg, rgba(57,255,20,0.12) 0%, rgba(6,8,15,0.97) 40%, rgba(255,215,0,0.10) 100%)`,
            border: `2px solid ${NEON_GREEN}`,
            boxShadow: `0 0 60px ${NEON_GREEN}20, inset 0 1px 0 ${NEON_GREEN}30`,
            backdropFilter: 'blur(18px)',
          }}>
          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)',
          }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="font-cyber text-xs tracking-[0.3em] text-white/40">SUPPORT A CREATOR</span>
              <div className="flex items-center gap-4">
                <span className="text-4xl">🎮</span>
                <div>
                  <div className="font-cyber text-[11px] text-white/50 tracking-widest mb-0.5">CREATOR CODE</div>
                  <div className="font-cyber text-5xl md:text-6xl font-black tracking-widest"
                    style={{ color: NEON_GREEN, textShadow: `0 0 24px ${NEON_GREEN}, 0 0 60px ${NEON_GREEN}70, 0 0 100px ${NEON_GREEN}40` }}>
                    {CREATOR_CODE}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 text-center md:text-right max-w-xs">
              <p className="text-white/60 text-sm leading-relaxed">
                Gib Code <span className="font-cyber font-bold" style={{ color: NEON_GREEN }}>{CREATOR_CODE}</span> im Fortnite Item Shop ein →{' '}
                <span className="font-cyber font-bold text-white">5–10%</span> gehen <span style={{ color: GOLD }}>direkt an Zyztm</span>!
              </p>
              <motion.a
                href={`https://www.epicgames.com/fortnite/en-US/creative/support-a-creator?creator=${CREATOR_CODE}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 50px ${NEON_GREEN}55` }}
                whileTap={{ scale: 0.97 }}
                className="font-cyber text-sm font-black tracking-widest px-8 py-3.5 rounded-xl transition-all"
                style={{
                  background: `linear-gradient(135deg, ${NEON_GREEN}, #22cc08)`,
                  color: '#000',
                  boxShadow: `0 0 30px ${NEON_GREEN}40, 0 6px 24px rgba(0,0,0,0.5)`,
                  border: `1px solid ${NEON_GREEN}`,
                  display: 'inline-block',
                  textDecoration: 'none',
                }}>
                🛒 JETZT KAUFEN &amp; ZYZTM SUPPORTEN
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* ── Two-Column Layout ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

          {/* LEFT — Official Fortnite Shop */}
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
              <span className="font-cyber text-xs tracking-[0.25em]" style={{ color: GOLD }}>📅 TODAY'S FORTNITE ITEM SHOP</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${GOLD}, transparent)` }} />
            </motion.div>

            {/* Featured */}
            <div className="mb-4">
              <span className="font-cyber text-[10px] tracking-widest text-white/35 mb-2 block">— FEATURED ITEMS —</span>
              <div className="grid grid-cols-3 gap-3">
                {FEATURED_ITEMS.map((item, i) => <OfficialCard key={item.id} item={item} idx={i} />)}
              </div>
            </div>

            {/* Daily */}
            <div>
              <span className="font-cyber text-[10px] tracking-widest text-white/35 mb-2 block">— DAILY ITEMS —</span>
              <div className="grid grid-cols-3 gap-3">
                {DAILY_ITEMS.map((item, i) => <OfficialCard key={item.id} item={item} idx={i + 3} />)}
              </div>
            </div>

            {/* Shop CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-6 p-5 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${GOLD}10, rgba(6,8,15,0.9))`,
                border: `1px solid ${GOLD}30`,
                backdropFilter: 'blur(14px)',
              }}>
              <p className="font-cyber text-xs text-white/50 mb-3 tracking-widest">
                CODE <span style={{ color: NEON_GREEN, fontWeight: 900, fontSize: 14 }}>{CREATOR_CODE}</span> NICHT VERGESSEN!
              </p>
              <motion.a
                href="https://www.epicgames.com/fortnite/en-US/shop"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${GOLD}45` }}
                whileTap={{ scale: 0.97 }}
                className="font-cyber text-sm font-black tracking-widest px-8 py-3 rounded-xl inline-block transition-all"
                style={{
                  background: `linear-gradient(135deg, ${GOLD}, #e6b800)`,
                  color: '#000',
                  boxShadow: `0 0 24px ${GOLD}40`,
                  textDecoration: 'none',
                }}>
                💎 ZUM FORTNITE ITEM SHOP
              </motion.a>
              <p className="font-cyber text-[9px] text-white/20 mt-3 tracking-widest">
                NICHT ECHTE WÄHRUNG · NUR ZUR ILLUSTRATION · PREISE IN V-BUCKS
              </p>
            </motion.div>
          </div>

          {/* RIGHT — Zyztm Exclusive Drops */}
          <div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${PINK}, transparent)` }} />
              <span className="font-cyber text-xs tracking-[0.25em]" style={{ color: PINK }}>⚡ ZYZTM EXCLUSIVE DROPS</span>
              <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, ${PINK}, transparent)` }} />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {EXCL_ITEMS.map((item, i) => <ExclCard key={item.id} item={item} idx={i} />)}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-cyber text-xs tracking-[0.3em] text-white/30">MEHR CONTENT · MEHR DROPS · MEHR WINS</p>
            <motion.a
              href="#marketplace"
              whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${PINK}50` }}
              whileTap={{ scale: 0.97 }}
              className="font-cyber text-base font-black tracking-widest px-10 py-4 rounded-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${PINK}, #cc0055, ${GOLD}cc)`,
                color: '#fff',
                boxShadow: `0 0 40px ${PINK}35, 0 8px 32px rgba(0,0,0,0.5)`,
                textDecoration: 'none',
                display: 'inline-block',
              }}>
              🔥 MEHR DROPS ENTDECKEN →
            </motion.a>
            <p className="font-cyber text-[10px] text-white/20 tracking-widest">
              VICTORY ROYALE ENERGY · CHAPTER 6 · ZYZTM NEXUS
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
