import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
// REAL-TIME LIVE STATS 2026: Import live stats hook
import { useLiveStats } from '../hooks/useLiveStats';

function formatCounterValue(value: number, suffix: string): string {
  const rounded = Math.round(value);
  if (rounded >= 1000) {
    const thousands = rounded / 1000;
    const formatted = rounded % 1000 === 0 ? thousands.toFixed(0) : thousands.toFixed(2);
    return `${formatted.replace('.', ',')}K${suffix}`;
  }
  return `${rounded}${suffix}`;
}

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  useEffect(() => {
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = formatCounterValue(v, suffix);
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0</span>;
}

// REAL-TIME LIVE STATS 2026: Risk level → neon colour mapping (module-level to avoid re-creation)
const RISK_COLORS: Record<string, string> = {
  LOW: '#00ff88',
  MEDIUM: '#ffd700',
  HIGH: '#ff8800',
  CRITICAL: '#ff0055',
};

export default function HeroSection() {
  // REAL-TIME LIVE STATS 2026: Live stats from SSE stream
  const { stats, connected, flash, formatGermanNumber } = useLiveStats();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-cyber-grid bg-[size:50px_50px] opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-bg-dark" />
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-neon-gold/50 text-neon-gold text-xs font-cyber tracking-widest mb-6 bg-neon-gold/5"
        >
          <span>⚡</span>
          <span>#1 FORTNITE CREATOR</span>
          <span>⚡</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-cyber text-5xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
        >
          <span className="bg-gradient-to-r from-neon-pink via-white to-neon-blue bg-clip-text text-transparent">
            WILLKOMMEN
          </span>
          <br />
          <span className="text-white">BEI </span>
          <span className="text-neon-pink neon-text-pink">ZYZTM</span>
          <br />
          <span className="bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            NEXUS
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/60 text-lg md:text-xl mb-8 font-body"
        >
          Dein exklusiver Hub für Streams, digitale Produkte & die Community
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            className="btn-primary rounded-sm text-sm"
            onClick={() => document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🎮 JETZT SHOPPEN
          </button>
          <a
            href="https://kick.com/zyztm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary rounded-sm text-sm"
          >
            📺 STREAM ANSCHAUEN
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { label: 'YouTube', value: 356, icon: '📺' },
            { label: 'TikTok', value: 651, icon: '🎵' },
            { label: 'Kick', value: 180, icon: '🟢' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-cyber font-bold text-neon-blue neon-text-blue">
                <AnimatedCounter target={stat.value} suffix="K" />
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* REAL-TIME LIVE STATS 2026: Live platform statistics panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div
            className="relative border rounded-sm px-6 py-4"
            style={{
              borderColor: 'rgba(0,242,255,0.25)',
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* header row */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-cyber text-xs tracking-widest text-white/50 uppercase">
                🔒 LIVE SECURITY STATS
              </span>
              {/* REAL-TIME LIVE STATS 2026: Connection status dot */}
              <span className="flex items-center gap-1 text-xs">
                <motion.span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: connected ? '#00ff88' : '#ff0055' }}
                  animate={{ opacity: connected ? [1, 0.4, 1] : 1 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <span style={{ color: connected ? '#00ff88' : '#ff0055' }}>
                  {connected ? 'LIVE' : 'OFFLINE'}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* REAL-TIME LIVE STATS 2026: Total Checks counter */}
              <div className="text-center">
                <motion.div
                  className="text-xl md:text-2xl font-cyber font-bold"
                  style={{
                    color: '#00f2ff',
                    textShadow: flash === 'green' ? '0 0 16px #00ff88' : '0 0 8px #00f2ff',
                    transition: 'text-shadow 0.4s ease',
                  }}
                >
                  {formatGermanNumber(stats.totalChecks)}
                </motion.div>
                <div className="text-white/50 text-xs mt-1 tracking-wider">TOTAL CHECKS</div>
              </div>

              {/* REAL-TIME LIVE STATS 2026: Exposed Instances counter */}
              <div className="text-center">
                <motion.div
                  className="text-xl md:text-2xl font-cyber font-bold"
                  style={{
                    color: '#ff0055',
                    textShadow: '0 0 8px #ff0055',
                  }}
                >
                  {formatGermanNumber(stats.exposedInstances)}
                </motion.div>
                <div className="text-white/50 text-xs mt-1 tracking-wider">EXPOSED</div>
              </div>

              {/* REAL-TIME LIVE STATS 2026: Today's checks */}
              <div className="text-center">
                <motion.div
                  className="text-xl md:text-2xl font-cyber font-bold"
                  style={{
                    color: '#bf5fff',
                    textShadow: '0 0 8px #bf5fff',
                  }}
                >
                  {formatGermanNumber(stats.checksToday)}
                </motion.div>
                <div className="text-white/50 text-xs mt-1 tracking-wider">HEUTE</div>
              </div>

              {/* REAL-TIME LIVE STATS 2026: Auth-Bypass Risk Level */}
              <div className="text-center">
                <motion.div
                  className="text-xl md:text-2xl font-cyber font-bold"
                  style={{
                    color: RISK_COLORS[stats.authBypassRisk] ?? '#00ff88',
                    textShadow: `0 0 8px ${RISK_COLORS[stats.authBypassRisk] ?? '#00ff88'}`,
                  }}
                  animate={
                    stats.authBypassRisk === 'CRITICAL'
                      ? { opacity: [1, 0.5, 1] }
                      : {}
                  }
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  {stats.authBypassRisk}
                </motion.div>
                <div className="text-white/50 text-xs mt-1 tracking-wider">RISK LEVEL</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </section>
  );
}
