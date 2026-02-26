import { motion } from 'framer-motion';

const NEON_GOLD = '#FFD700';
const NEON_BLUE = '#00f2ff';
const NEON_GREEN = '#39FF14';
const NEON_PINK = '#FF00FF';

const CURRENT_LEVEL = 87;
const MAX_LEVEL = 100;
const XP_IN_LEVEL = 68; // % through current level

interface LevelMilestone {
  level: number;
  reward: string;
  icon: string;
  color: string;
}

const MILESTONES: LevelMilestone[] = [
  { level: 1, reward: 'Starter Pickaxe', icon: '⛏️', color: NEON_BLUE },
  { level: 25, reward: 'Battle Bus Glider', icon: '🚌', color: NEON_GREEN },
  { level: 50, reward: 'Midas Wrap', icon: '✨', color: NEON_GOLD },
  { level: 75, reward: 'ZYZTM Back Bling', icon: '🎒', color: NEON_PINK },
  { level: 87, reward: '← AKTUELL', icon: '📍', color: NEON_GOLD },
  { level: 100, reward: 'Victory Royale Skin', icon: '🏆', color: NEON_GOLD },
];

export default function BattlePassProgress() {
  const progressPct = (CURRENT_LEVEL / MAX_LEVEL) * 100;

  return (
    <section className="py-20 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 100%, ${NEON_GOLD}05 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${NEON_GOLD}40`, background: `${NEON_GOLD}08`, color: NEON_GOLD }}
          >
            🎖️ ZYZTM'S BATTLE PASS
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
            BATTLE PASS{' '}
            <span style={{ color: NEON_GOLD, textShadow: `0 0 15px ${NEON_GOLD}` }}>PROGRESS</span>
          </h2>
          <p className="text-white/45">Chapter 6 Season 1 – Zyztm's aktueller Stand</p>
        </motion.div>

        {/* Level display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 mb-6"
          style={{
            background: `linear-gradient(135deg, rgba(10,12,20,0.95) 0%, rgba(6,8,15,0.98) 100%)`,
            border: `1px solid ${NEON_GOLD}35`,
            boxShadow: `0 0 40px ${NEON_GOLD}15`,
          }}
        >
          {/* Level numbers */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-cyber text-2xl font-bold"
                style={{
                  background: `linear-gradient(135deg, ${NEON_GOLD}25, ${NEON_GOLD}10)`,
                  border: `2px solid ${NEON_GOLD}60`,
                  color: NEON_GOLD,
                  textShadow: `0 0 12px ${NEON_GOLD}`,
                  boxShadow: `0 0 20px ${NEON_GOLD}30`,
                }}
              >
                {CURRENT_LEVEL}
              </div>
              <div>
                <p className="font-cyber text-xs text-white/40 tracking-widest">AKTUELLES LEVEL</p>
                <p className="font-cyber text-lg font-bold" style={{ color: NEON_GOLD }}>
                  LEVEL {CURRENT_LEVEL}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-cyber text-xs text-white/40 tracking-widest">ZIEL</p>
              <p className="font-cyber text-2xl font-bold text-white/70">100</p>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-cyber text-[10px] tracking-widest text-white/40">GESAMT FORTSCHRITT</span>
              <span className="font-cyber text-[10px] tracking-widest" style={{ color: NEON_GOLD }}>
                {CURRENT_LEVEL}/100
              </span>
            </div>
            <div
              className="relative h-4 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${NEON_GOLD}cc, ${NEON_GOLD}, #fff700)`,
                  boxShadow: `0 0 12px ${NEON_GOLD}80`,
                }}
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                    animation: 'shimmer 2s infinite',
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* XP in current level */}
          <div className="mt-4 mb-2">
            <div className="flex justify-between mb-1">
              <span className="font-cyber text-[10px] tracking-widest text-white/40">XP DIESES LEVEL</span>
              <span className="font-cyber text-[10px] tracking-widest" style={{ color: NEON_BLUE }}>
                {XP_IN_LEVEL}%
              </span>
            </div>
            <div
              className="relative h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${XP_IN_LEVEL}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${NEON_BLUE}cc, ${NEON_BLUE})`,
                  boxShadow: `0 0 8px ${NEON_BLUE}70`,
                }}
              />
            </div>
          </div>

          {/* Level tick marks */}
          <div className="mt-5 relative">
            <div className="flex justify-between">
              {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((lvl) => (
                <div key={lvl} className="flex flex-col items-center gap-1">
                  <div
                    className="w-0.5 h-2 rounded"
                    style={{
                      background: lvl <= CURRENT_LEVEL ? NEON_GOLD : 'rgba(255,255,255,0.15)',
                    }}
                  />
                  <span
                    className="font-cyber text-[8px]"
                    style={{ color: lvl <= CURRENT_LEVEL ? `${NEON_GOLD}90` : 'rgba(255,255,255,0.2)' }}
                  >
                    {lvl}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MILESTONES.map((m, i) => {
            const unlocked = m.level <= CURRENT_LEVEL;
            return (
              <motion.div
                key={m.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-xl p-3 text-center flex flex-col items-center gap-1.5"
                style={{
                  background: unlocked ? `${m.color}10` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${unlocked ? `${m.color}45` : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: unlocked ? `0 0 15px ${m.color}20` : 'none',
                }}
              >
                <span className="text-2xl" style={{ filter: unlocked ? 'none' : 'grayscale(1) opacity(0.4)' }}>
                  {m.icon}
                </span>
                <span
                  className="font-cyber text-xs font-bold"
                  style={{ color: unlocked ? m.color : 'rgba(255,255,255,0.3)' }}
                >
                  LVL {m.level}
                </span>
                <span
                  className="text-[9px] text-center leading-tight"
                  style={{ color: unlocked ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
                >
                  {m.reward}
                </span>
                {unlocked && (
                  <span
                    className="font-cyber text-[8px] tracking-widest px-1.5 py-0.5 rounded"
                    style={{ background: `${m.color}25`, color: m.color }}
                  >
                    ✓ UNLOCKED
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
