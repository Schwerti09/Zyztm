import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';
const NEON_GOLD = '#ffd700';

interface SocialPlatform {
  id: string;
  label: string;
  emoji: string;
  color: string;
  url: string;
  followers: string;
}

const PLATFORMS: SocialPlatform[] = [
  { id: 'kick', label: 'KICK', emoji: '🟢', color: '#53fc18', url: 'https://kick.com/zyztm', followers: '28.5K' },
  { id: 'youtube', label: 'YOUTUBE', emoji: '📺', color: '#ff0000', url: 'https://youtube.com/@Zyztm', followers: '1,05M' },
  { id: 'tiktok', label: 'TIKTOK', emoji: '🎵', color: NEON_PINK, url: 'https://tiktok.com/@zyztm', followers: '651K' },
  { id: 'instagram', label: 'INSTAGRAM', emoji: '📸', color: '#e1306c', url: 'https://instagram.com/zyztm2.0', followers: 'Follow!' },
  { id: 'discord', label: 'DISCORD', emoji: '💬', color: '#5865f2', url: 'https://discord.gg/zyztm', followers: '12K' },
  { id: 'twitter', label: 'TWITTER/X', emoji: '🐦', color: '#1da1f2', url: 'https://twitter.com/zyztm', followers: 'Follow!' },
];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

let particleId = 0;

export default function ZyztmBlast() {
  const [blasted, setBlasted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [totalFollowers, setTotalFollowers] = useState(1695000);

  // Animate follow counter up
  useEffect(() => {
    if (!blasted) return;
    const interval = setInterval(() => {
      setTotalFollowers((c) => c + Math.floor(Math.random() * 3));
    }, 500);
    return () => clearInterval(interval);
  }, [blasted]);

  const handleBlast = () => {
    setBlasted(true);
    // Spawn particles
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: particleId++,
      emoji: ['💥', '⚡', '🔥', '💎', '🏆', '✨'][i % 6],
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }));
    setParticles((p) => [...p, ...newParticles]);
    setTimeout(() => setParticles([]), 2000);
  };

  const handleFollow = (platform: SocialPlatform) => {
    setFollowed((prev) => new Set(prev).add(platform.id));
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, ${NEON_PINK}05 0%, transparent 70%)`,
        }}
      />

      {/* Explosion particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0, x: '50vw', y: '50vh' }}
            animate={{
              opacity: 0,
              scale: p.scale,
              x: `${p.x}vw`,
              y: `${p.y}vh`,
              rotate: p.rotation,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed pointer-events-none z-40 text-3xl"
            style={{ left: 0, top: 0 }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-pink/30 bg-neon-pink/5">
            <span className="text-neon-pink text-xs font-cyber tracking-widest">💥 SOCIAL EXPLOSION</span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            ZYZTM{' '}
            <span style={{ color: NEON_PINK, textShadow: `0 0 20px ${NEON_PINK}` }}>BLAST</span>
          </h2>
          <p className="text-white/50">Folge Zyztm überall – und mach die Community noch größer!</p>
        </motion.div>

        {/* Total follower counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-block cyber-card rounded-xl px-8 py-5"
            style={{ borderColor: `${NEON_GOLD}30` }}
          >
            <p className="text-white/40 text-xs font-cyber tracking-widest mb-1">ZYZTM COMMUNITY INSGESAMT</p>
            <motion.p
              key={totalFollowers}
              initial={{ scale: 1.03 }}
              animate={{ scale: 1 }}
              className="font-cyber text-4xl font-bold"
              style={{ color: NEON_GOLD, textShadow: `0 0 20px ${NEON_GOLD}` }}
            >
              {totalFollowers.toLocaleString('de-DE')}+
            </motion.p>
            <p className="text-white/30 text-xs font-cyber mt-1">FOLLOWERS GESAMT</p>
          </div>
        </motion.div>

        {/* BLAST button */}
        <div className="flex justify-center mb-12">
          <motion.button
            onClick={handleBlast}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={blasted ? { scale: [1, 1.15, 1] } : {}}
            transition={blasted ? { duration: 0.4 } : {}}
            className="relative font-cyber text-lg tracking-widest font-bold px-12 py-5 rounded-full"
            style={{
              background: blasted
                ? `linear-gradient(135deg, ${NEON_GOLD}, #ff8c00)`
                : `linear-gradient(135deg, ${NEON_PINK}, #cc0044)`,
              color: blasted ? '#000' : '#fff',
              boxShadow: blasted
                ? `0 0 40px ${NEON_GOLD}60, 0 0 80px ${NEON_GOLD}30`
                : `0 0 30px ${NEON_PINK}50, 0 0 60px ${NEON_PINK}20`,
            }}
          >
            {blasted ? '💥 BLAST AKTIV!' : '💥 ZYZTM BLAST!'}
          </motion.button>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {PLATFORMS.map((platform, i) => {
            const isFollowed = followed.has(platform.id);
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                animate={blasted ? { y: [0, -8, 0] } : {}}
                whileHover={{ scale: 1.04, y: -4 }}
                className="cyber-card rounded-xl p-4 text-center relative overflow-hidden"
                style={{ borderColor: `${platform.color}${isFollowed ? '60' : '25'}` }}
              >
                {/* Glow on blast */}
                {blasted && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    animate={{ opacity: [0.3, 0] }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    style={{ background: `radial-gradient(circle, ${platform.color}20 0%, transparent 70%)` }}
                  />
                )}

                <div className="text-3xl mb-2">{platform.emoji}</div>
                <p
                  className="font-cyber text-xs font-bold mb-1 tracking-wider"
                  style={{ color: platform.color }}
                >
                  {platform.label}
                </p>
                <p className="text-white/40 text-xs font-cyber mb-3">{platform.followers}</p>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleFollow(platform)}
                  className="block w-full py-2 rounded font-cyber text-xs tracking-widest transition-all"
                  style={{
                    background: isFollowed ? `${platform.color}20` : 'transparent',
                    border: `1px solid ${platform.color}${isFollowed ? '60' : '40'}`,
                    color: isFollowed ? platform.color : 'rgba(255,255,255,0.5)',
                    boxShadow: isFollowed ? `0 0 10px ${platform.color}25` : 'none',
                  }}
                >
                  {isFollowed ? '✓ FOLGE ICH' : 'FOLGEN →'}
                </a>
              </motion.div>
            );
          })}
        </div>

        {followed.size >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div
              className="inline-block cyber-card rounded-xl px-8 py-5"
              style={{ borderColor: `${NEON_BLUE}40` }}
            >
              <p className="text-neon-blue font-cyber text-lg font-bold mb-1">🏆 COMMUNITY CHAMPION!</p>
              <p className="text-white/50 font-body text-sm">Du folgst Zyztm auf {followed.size} Plattformen – du bist ein echter Diggah!</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
