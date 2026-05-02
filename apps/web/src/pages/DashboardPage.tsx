import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useLocation } from 'wouter';
import { useStore } from '../store/useStore';
import { ALL_CARDS } from '@nexus/shared-types';
import type { Card } from '@nexus/shared-types';
import { useAuth } from '../contexts/AuthContext';

/* ─── Rarity config ───────────────────────────────────────────────────────── */
const rarityColors: Record<string, string> = {
  common: '#9b9b9b',
  rare: '#00f2ff',
  epic: '#bf5fff',
  legendary: '#ffd700',
};

const rarityGlow: Record<string, string> = {
  common: '0 0 8px #9b9b9b40',
  rare: '0 0 16px #00f2ff60, 0 0 32px #00f2ff20',
  epic: '0 0 16px #bf5fff60, 0 0 32px #bf5fff20',
  legendary: '0 0 20px #ffd70080, 0 0 40px #ffd70030',
};

/* ─── Animated counter ────────────────────────────────────────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 18 });
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => { mv.set(value); }, [value, mv]);
  useEffect(() =>
    spring.on('change', (v) => { if (ref.current) ref.current.textContent = Math.round(v).toString(); }),
  [spring]);

  return <span ref={ref}>0</span>;
}

/* ─── Sparkline bar chart ─────────────────────────────────────────────────── */
function Sparkline({ color }: { color: string }) {
  const bars = useRef(Array.from({ length: 12 }, () => 20 + Math.random() * 80));
  return (
    <div className="flex items-end gap-0.5 h-8 mt-2 opacity-60">
      {bars.current.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: 'easeOut' }}
          className="flex-1 rounded-sm"
          style={{ background: color }}
        />
      ))}
    </div>
  );
}

/* ─── XP progress bar ─────────────────────────────────────────────────────── */
const RANK_TIERS = [
  { name: 'RECRUIT', min: 0, max: 500, color: '#9b9b9b' },
  { name: 'ELITE', min: 500, max: 2000, color: '#00f2ff' },
  { name: 'VETERAN', min: 2000, max: 5000, color: '#bf5fff' },
  { name: 'LEGENDARY', min: 5000, max: 10000, color: '#ffd700' },
  { name: 'NEXUS GOD', min: 10000, max: Infinity, color: '#ff0055' },
];

function getRank(xp: number) {
  return RANK_TIERS.find((t) => xp >= t.min && xp < t.max) ?? RANK_TIERS[RANK_TIERS.length - 1];
}

function XpBar({ xp }: { xp: number }) {
  const rank = getRank(xp);
  const nextTier = RANK_TIERS[RANK_TIERS.indexOf(rank) + 1];
  const pct = nextTier
    ? Math.min(100, ((xp - rank.min) / (nextTier.min - rank.min)) * 100)
    : 100;

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center mb-1">
        <span className="font-cyber text-xs tracking-widest" style={{ color: rank.color }}>
          ◆ {rank.name}
        </span>
        {nextTier && (
          <span className="text-white/40 text-xs">
            {xp} / {nextTier.min} XP
          </span>
        )}
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${rank.color}88, ${rank.color})`,
            boxShadow: `0 0 8px ${rank.color}80`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Achievement badge ───────────────────────────────────────────────────── */
interface Achievement {
  id: string;
  icon: string;
  label: string;
  unlocked: boolean;
  color: string;
}

function AchievementBadge({ a }: { a: Achievement }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      className="relative flex flex-col items-center gap-1 cursor-pointer"
      title={a.label}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
        style={{
          background: a.unlocked ? `${a.color}22` : 'rgba(255,255,255,0.03)',
          border: `1px solid ${a.unlocked ? a.color + '60' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: a.unlocked ? `0 0 12px ${a.color}40` : 'none',
          filter: a.unlocked ? 'none' : 'grayscale(1) opacity(0.3)',
        }}
      >
        {a.icon}
      </div>
      <span className="text-xs text-white/40 text-center leading-tight w-12 truncate">{a.label}</span>
    </motion.div>
  );
}

/* ─── Activity feed item ──────────────────────────────────────────────────── */
interface FeedItem {
  id: number;
  icon: string;
  text: string;
  time: string;
  color: string;
}

function ActivityItem({ item }: { item: FeedItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
    >
      <span
        className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
        style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
      >
        {item.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-white/80 text-xs leading-snug">{item.text}</p>
        <p className="text-white/30 text-xs mt-0.5">{item.time}</p>
      </div>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
    </motion.div>
  );
}

/* ─── Holographic card ────────────────────────────────────────────────────── */
function HoloCard({ card, isNew = false }: { card: Card; isNew?: boolean }) {
  const color = rarityColors[card.rarity] ?? '#9b9b9b';
  return (
    <motion.div
      initial={isNew ? { opacity: 0, rotateY: 180, scale: 0.6 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{ duration: isNew ? 0.6 : 0.3, type: 'spring' }}
      whileHover={{ scale: 1.08, y: -6, rotateZ: 1 }}
      className="relative rounded-xl p-3 text-center cursor-pointer overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, #0d111788 100%)`,
        border: `1px solid ${color}40`,
        boxShadow: rarityGlow[card.rarity] ?? 'none',
      }}
    >
      {/* holographic shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 40%, ${color}18 50%, transparent 60%)`,
          animation: 'holoShimmer 3s linear infinite',
        }}
      />
      <div className="relative z-10">
        <div className="text-3xl mb-1">{card.emoji}</div>
        <div className="font-cyber text-xs font-bold text-white mb-0.5 truncate">{card.name}</div>
        <div className="text-xs font-cyber tracking-widest" style={{ color }}>{card.rarity.toUpperCase()}</div>
        {isNew && (
          <div className="mt-1 text-xs text-white/60 leading-tight line-clamp-2">{card.description}</div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Stat card ────────────────────────────────────────────────────────────── */
function StatCard({
  label, value, icon, color, sub,
}: {
  label: string; value: number | string; icon: string; color: string; sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}12 0%, #0d111799 100%)`,
        border: `1px solid ${color}30`,
        boxShadow: `0 0 20px ${color}10`,
      }}
    >
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${color}18`, border: `1px solid ${color}30` }}
        >
          {icon}
        </div>
        <div
          className="text-xs font-cyber px-2 py-0.5 rounded-full"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          LIVE
        </div>
      </div>

      <div className="font-cyber text-3xl font-black" style={{ color }}>
        {typeof value === 'number' ? <AnimatedNumber value={value} /> : value}
      </div>
      <div className="text-white/50 text-xs font-cyber tracking-widest mt-0.5">{label}</div>
      {sub && <div className="text-white/30 text-xs mt-0.5">{sub}</div>}

      <Sparkline color={color} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN DASHBOARD                                                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

const STATIC_FEED_ITEMS: FeedItem[] = [
  { id: 1, icon: '🎙️', text: 'Voice Credit Pack wurde aktiviert', time: 'Gerade eben', color: '#00f2ff' },
  { id: 2, icon: '💎', text: '+50 JOJOJO Coins durch Community-Bonus', time: 'vor 2 Min', color: '#ff0055' },
  { id: 3, icon: '🃏', text: 'Neue legendäre Karte gefunden!', time: 'vor 5 Min', color: '#ffd700' },
  { id: 4, icon: '🏆', text: 'Achievement "Pack Opener" freigeschaltet', time: 'vor 12 Min', color: '#bf5fff' },
  { id: 5, icon: '🔥', text: 'Streak Day 7 erreicht – Bonus aktiviert!', time: 'vor 23 Min', color: '#ff6600' },
  { id: 6, icon: '📺', text: 'Stream-Bonus: +25 XP verdient', time: 'vor 1 Std', color: '#00f2ff' },
];

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const { credits, coins, cards, setCards } = useStore();
  const { isAuthenticated, isLoading } = useAuth();
  const [packOpening, setPackOpening] = useState(false);
  const [newCards, setNewCards] = useState<Card[]>([]);
  const [activeTab, setActiveTab] = useState<'collection' | 'activity' | 'achievements'>('collection');

  // Auth check - redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="font-cyber text-neon-pink animate-pulse">LOADING…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  const [achievements] = useState<Achievement[]>([
    { id: 'first_pack', icon: '🃏', label: 'Pack Opener', unlocked: cards.length > 0, color: '#ffd700' },
    { id: 'collector', icon: '🏆', label: 'Collector', unlocked: cards.length >= 10, color: '#bf5fff' },
    { id: 'rich', icon: '💎', label: 'Diamond', unlocked: coins >= 100, color: '#00f2ff' },
    { id: 'vip', icon: '👑', label: 'VIP', unlocked: true, color: '#ffd700' },
    { id: 'streak', icon: '🔥', label: 'Hot Streak', unlocked: true, color: '#ff6600' },
    { id: 'legendary', icon: '⚡', label: 'Legendary', unlocked: cards.some((c) => c.rarity === 'legendary'), color: '#ff0055' },
    { id: 'social', icon: '🌐', label: 'Networker', unlocked: false, color: '#00f2ff' },
    { id: 'veteran', icon: '🎖️', label: 'Veteran', unlocked: false, color: '#bf5fff' },
  ]);

  // Compute a simple XP value from user data
  const xp = credits * 2 + coins * 5 + cards.length * 20 + 250;

  const openPack = async () => {
    setPackOpening(true);
    try {
      const res = await fetch('/api/cards/open-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user' }),
      });
      const data = await res.json();
      setNewCards(data.cards);
      setCards([...cards, ...data.cards]);
    } catch {
      const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5).slice(0, 5);
      setNewCards(shuffled);
      setCards([...cards, ...shuffled]);
    } finally {
      setPackOpening(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark relative overflow-x-hidden">
      {/* ── Animated grid background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-cyber-grid bg-[size:40px_40px] opacity-20" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #00f2ff08 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 80% 80%, #ff005508 0%, transparent 60%)' }} />
        {/* scanline */}
        <div
          className="absolute left-0 right-0 h-px opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, #00f2ff, transparent)',
            animation: 'dashScan 6s linear infinite',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between py-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#00f2ff', boxShadow: '0 0 8px #00f2ff', animation: 'pulse 2s infinite' }}
              />
              <span className="text-white/40 text-xs font-cyber tracking-widest">SYSTEM ONLINE</span>
            </div>
            <h1
              className="font-cyber text-4xl md:text-5xl font-black tracking-tight glitch-text"
              data-text="NEXUS DASHBOARD"
            >
              <span style={{ color: '#ff0055', textShadow: '0 0 20px #ff005580, 0 0 40px #ff005540' }}>NEXUS</span>
              <span className="text-white"> DASHBOARD</span>
            </h1>
            <p className="text-white/30 text-xs font-cyber tracking-widest mt-1">NEXUS // SECURE CONTROL PANEL v2.0</p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/coins')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cyber"
              style={{
                background: 'linear-gradient(135deg, #ffd70018, #ffd70008)',
                border: '1px solid #ffd70040',
                color: '#ffd700',
                boxShadow: '0 0 12px #ffd70020',
              }}
            >
              💎 COINS KAUFEN
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-cyber"
              style={{ border: '1px solid #00f2ff40', color: '#00f2ff', background: '#00f2ff0a' }}
            >
              ← HOME
            </motion.button>
          </div>
        </motion.div>

        {/* ── User profile + XP bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl p-5 mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255,0,85,0.08) 0%, rgba(13,17,23,0.9) 60%, rgba(0,242,255,0.06) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #ff005530, #00f2ff20)',
                  border: '1px solid #ff005550',
                  boxShadow: '0 0 20px #ff005530',
                }}
              >
                👑
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: '#00f2ff', boxShadow: '0 0 8px #00f2ff' }}
              >
                <span className="text-black text-xs font-black">V</span>
              </div>
            </div>

            {/* info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-cyber text-lg font-bold text-white">NEXUS MEMBER</span>
                <span
                  className="text-xs font-cyber px-2 py-0.5 rounded-full"
                  style={{ background: '#ff005520', color: '#ff0055', border: '1px solid #ff005540' }}
                >
                  VIP
                </span>
                <span
                  className="text-xs font-cyber px-2 py-0.5 rounded-full"
                  style={{ background: '#ffd70015', color: '#ffd700', border: '1px solid #ffd70035' }}
                >
                  ⚡ {xp} XP
                </span>
              </div>
              <XpBar xp={xp} />
            </div>

            {/* quick metrics */}
            <div className="flex gap-4 flex-shrink-0">
              {[
                { v: achievements.filter((a) => a.unlocked).length, l: 'Achievements', c: '#bf5fff' },
                { v: cards.length, l: 'Cards', c: '#ffd700' },
              ].map(({ v, l, c }) => (
                <div key={l} className="text-center">
                  <div className="font-cyber text-xl font-black" style={{ color: c }}>{v}</div>
                  <div className="text-white/40 text-xs">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'VOICE CREDITS', value: credits, icon: '🎙️', color: '#00f2ff', sub: '+10 heute' },
            { label: 'JOJOJO COINS', value: coins, icon: '💎', color: '#ff0055', sub: 'Digital Währung' },
            { label: 'KARTEN', value: cards.length, icon: '🃏', color: '#ffd700', sub: `${cards.filter((c) => c.rarity === 'legendary').length} Legendary` },
            { label: 'NEXUS RANK', value: getRank(xp).name as string | number, icon: '⚡', color: '#bf5fff', sub: `${xp} XP Total` },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </div>

        {/* ── Tabs + main panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left – tab panels */}
          <div className="lg:col-span-2">
            {/* tab bar */}
            <div
              className="flex gap-1 p-1 rounded-xl mb-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {(['collection', 'activity', 'achievements'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-cyber tracking-widest transition-all duration-200"
                  style={
                    activeTab === tab
                      ? { background: 'linear-gradient(135deg, #ff005530, #00f2ff20)', color: '#fff', border: '1px solid #00f2ff30' }
                      : { color: 'rgba(255,255,255,0.35)' }
                  }
                >
                  {tab === 'collection' ? '🃏 COLLECTION' : tab === 'activity' ? '⚡ ACTIVITY' : '🏆 ACHIEVEMENTS'}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* ─ Collection tab ─ */}
              {activeTab === 'collection' && (
                <motion.div
                  key="collection"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(10,12,21,0.9) 100%)',
                    border: '1px solid rgba(0,242,255,0.15)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-cyber text-lg font-bold text-white">CARD COLLECTION</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openPack}
                      disabled={packOpening}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-cyber disabled:opacity-40"
                      style={{
                        background: packOpening ? '#ff005540' : 'linear-gradient(135deg, #ff0055, #cc0044)',
                        color: 'white',
                        boxShadow: '0 0 20px #ff005550',
                        border: 'none',
                      }}
                    >
                      {packOpening ? (
                        <>
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                          ÖFFNE...
                        </>
                      ) : (
                        <> 🃏 PACK ÖFFNEN</>
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {newCards.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div
                          className="rounded-xl p-4 mb-2"
                          style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.2)' }}
                        >
                          <div className="font-cyber text-sm text-neon-gold mb-3 flex items-center gap-2">
                            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: 3 }}>✨</motion.span>
                            NEUE KARTEN ERHALTEN!
                          </div>
                          <div className="grid grid-cols-5 gap-3">
                            {newCards.map((card, idx) => (
                              <motion.div key={`${card.id}-${idx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}>
                                <HoloCard card={card} isNew />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {cards.length > 0 ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-cyber text-xs text-white/40 tracking-widest">MEINE KARTEN</span>
                        <span
                          className="text-xs font-cyber px-2 py-0.5 rounded-full"
                          style={{ background: '#ffd70015', color: '#ffd700', border: '1px solid #ffd70030' }}
                        >
                          {cards.length} TOTAL
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {cards.map((card, i) => (
                          <HoloCard key={i} card={card} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-5xl mb-3 opacity-30">🃏</div>
                      <p className="text-white/30 text-sm font-cyber">KEINE KARTEN.</p>
                      <p className="text-white/20 text-xs mt-1">Öffne ein Pack um deine Collection zu starten!</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ─ Activity tab ─ */}
              {activeTab === 'activity' && (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(10,12,21,0.9) 100%)',
                    border: '1px solid rgba(0,242,255,0.15)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <h2 className="font-cyber text-lg font-bold text-white mb-5 flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#00f2ff', boxShadow: '0 0 8px #00f2ff', animation: 'pulse 2s infinite' }}
                    />
                    LIVE ACTIVITY FEED
                  </h2>
                  <div>
                    {STATIC_FEED_ITEMS.map((item) => (
                      <ActivityItem key={item.id} item={item} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ─ Achievements tab ─ */}
              {activeTab === 'achievements' && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(10,12,21,0.9) 100%)',
                    border: '1px solid rgba(0,242,255,0.15)',
                    backdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-cyber text-lg font-bold text-white">ACHIEVEMENTS</h2>
                    <span className="text-xs font-cyber text-white/40">
                      {achievements.filter((a) => a.unlocked).length} / {achievements.length} UNLOCKED
                    </span>
                  </div>

                  {/* progress */}
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievements.filter((a) => a.unlocked).length / achievements.length) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #bf5fff, #ff0055)', boxShadow: '0 0 8px #bf5fff80' }}
                    />
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {achievements.map((a) => (
                      <AchievementBadge key={a.id} a={a} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right – sidebar panels */}
          <div className="flex flex-col gap-4">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(13,17,23,0.95), rgba(10,12,21,0.9))',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3 className="font-cyber text-sm font-bold text-white mb-4 tracking-widest">⚡ QUICK ACTIONS</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'COINS KAUFEN', icon: '💎', color: '#ffd700', href: '/coins' },
                  { label: 'STREAM WATCH', icon: '📺', color: '#00f2ff', href: 'https://youtube.com/@FortniteNexusDE' },
                  { label: 'PACK ÖFFNEN', icon: '🃏', color: '#ff0055', action: openPack },
                  { label: 'COMMUNITY', icon: '🌐', color: '#bf5fff', href: 'https://discord.gg/fortnitenexus' },
                ].map((btn) => (
                  <motion.button
                    key={btn.label}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (btn.action) btn.action();
                      else if (btn.href?.startsWith('http')) window.open(btn.href, '_blank', 'noopener,noreferrer');
                      else if (btn.href) navigate(btn.href);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-xs font-cyber text-left transition-all"
                    style={{
                      background: `${btn.color}0a`,
                      border: `1px solid ${btn.color}25`,
                      color: btn.color,
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${btn.color}18` }}
                    >
                      {btn.icon}
                    </span>
                    {btn.label}
                    <span className="ml-auto opacity-50">→</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Rank Tiers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(13,17,23,0.95), rgba(10,12,21,0.9))',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3 className="font-cyber text-sm font-bold text-white mb-4 tracking-widest">◆ RANG SYSTEM</h3>
              <div className="flex flex-col gap-2">
                {RANK_TIERS.filter((t) => t.max !== Infinity).map((tier) => {
                  const current = getRank(xp);
                  const isActive = tier.name === current.name;
                  return (
                    <div
                      key={tier.name}
                      className="flex items-center justify-between px-3 py-2 rounded-xl"
                      style={{
                        background: isActive ? `${tier.color}15` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isActive ? tier.color + '40' : 'transparent'}`,
                        boxShadow: isActive ? `0 0 12px ${tier.color}20` : 'none',
                      }}
                    >
                      <span className="font-cyber text-xs" style={{ color: isActive ? tier.color : 'rgba(255,255,255,0.3)' }}>
                        {isActive ? '▶ ' : ''}{tier.name}
                      </span>
                      <span className="text-xs text-white/30">{tier.min}+ XP</span>
                    </div>
                  );
                })}
                <div
                  className="flex items-center justify-between px-3 py-2 rounded-xl"
                  style={{
                    background: getRank(xp).name === 'NEXUS GOD' ? '#ff005515' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${getRank(xp).name === 'NEXUS GOD' ? '#ff005540' : 'transparent'}`,
                  }}
                >
                  <span className="font-cyber text-xs" style={{ color: getRank(xp).name === 'NEXUS GOD' ? '#ff0055' : 'rgba(255,255,255,0.3)' }}>
                    {getRank(xp).name === 'NEXUS GOD' ? '▶ ' : ''}NEXUS GOD
                  </span>
                  <span className="text-xs text-white/30">10000+ XP</span>
                </div>
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl p-5"
              style={{
                background: 'linear-gradient(135deg, rgba(13,17,23,0.95), rgba(10,12,21,0.9))',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <h3 className="font-cyber text-sm font-bold text-white mb-4 tracking-widest">🖥 SYSTEM STATUS</h3>
              {[
                { label: 'NEXUS CORE', status: 'ONLINE', color: '#00f2ff' },
                { label: 'CARD ENGINE', status: 'ONLINE', color: '#00f2ff' },
                { label: 'AI SYNTH', status: 'STANDBY', color: '#ffd700' },
                { label: 'STREAM LINK', status: 'LIVE', color: '#ff0055' },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <span className="text-xs text-white/40 font-cyber">{s.label}</span>
                  <span
                    className="text-xs font-cyber flex items-center gap-1.5"
                    style={{ color: s.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: s.color, boxShadow: `0 0 6px ${s.color}`, animation: 'pulse 2s infinite' }}
                    />
                    {s.status}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
