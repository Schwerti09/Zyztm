import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  { id: 'kick', label: 'KICK', emoji: '🟢', color: '#53fc18', url: 'https://kick.com/zyztm', followers: '28.9K' },
  { id: 'youtube', label: 'YOUTUBE', emoji: '📺', color: '#ff0000', url: 'https://youtube.com/@Zyztm', followers: '356K' },
  { id: 'tiktok', label: 'TIKTOK', emoji: '🎵', color: NEON_PINK, url: 'https://tiktok.com/@zyztm', followers: '651K' },
  { id: 'instagram', label: 'INSTAGRAM', emoji: '📸', color: '#e1306c', url: 'https://instagram.com/zyztm2.0', followers: 'Follow!' },
  { id: 'discord', label: 'DISCORD', emoji: '💬', color: '#5865f2', url: 'https://discord.gg/zyztm', followers: '12K' },
  { id: 'twitter', label: 'TWITTER/X', emoji: '🐦', color: '#1da1f2', url: 'https://twitter.com/zyztm', followers: 'Follow!' },
];

export default function ZyztmBlast() {
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [totalFollowers, setTotalFollowers] = useState(1047500);

  // Animate follow counter up
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalFollowers((c) => c + Math.floor(Math.random() * 3));
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
                whileHover={{ scale: 1.04, y: -4 }}
                className="cyber-card rounded-xl p-4 text-center relative overflow-hidden"
                style={{ borderColor: `${platform.color}${isFollowed ? '60' : '25'}` }}
              >
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
