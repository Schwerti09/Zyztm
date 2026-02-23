import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface YouTubeVideo {
  title: string;
  thumbnail: string;
  videoId: string;
  url: string;
}

// Replace DEINE_DISCORD_SERVER_ID with your real Discord server ID to enable the widget
const DISCORD_SERVER_ID = 'DEINE_DISCORD_SERVER_ID';

const socials = [
  {
    name: 'KICK',
    icon: '🟢',
    color: '#53fc18',
    stats: '180K Follower',
    description: 'Live Gaming Streams',
    url: 'https://kick.com/zyztm',
    bg: 'from-green-950/50 to-bg-card',
    live: true,
  },
  {
    name: 'YOUTUBE',
    icon: '📺',
    color: '#ff0000',
    stats: '1.05M Abonnenten',
    description: 'Videos & Highlights',
    url: 'https://youtube.com/@Zyztm',
    bg: 'from-red-950/50 to-bg-card',
    live: false,
  },
  {
    name: 'TIKTOK',
    icon: '🎵',
    color: '#ffffff',
    stats: '651K Follower',
    description: 'Short Clips & Vibes',
    url: 'https://tiktok.com/@zyztm',
    bg: 'from-gray-800/50 to-bg-card',
    live: false,
  },
  {
    name: 'DISCORD',
    icon: '💬',
    color: '#5865f2',
    stats: '12K Mitglieder',
    description: 'Community & Chat',
    url: 'https://discord.gg/DEINLINK', // TODO: Replace DEINLINK with your real Discord invite code
    bg: 'from-indigo-950/50 to-bg-card',
    live: false,
  },
];

export default function SocialHub() {
  const [ytVideos, setYtVideos] = useState<YouTubeVideo[]>([]);
  const [ytLoading, setYtLoading] = useState(true);

  useEffect(() => {
    fetch('/api/youtube/latest')
      .then((r) => r.json())
      .then((data) => {
        if (data.videos && data.videos.length > 0) {
          setYtVideos(data.videos);
        }
      })
      .catch(() => {})
      .finally(() => setYtLoading(false));
  }, []);
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            SOCIAL <span className="text-neon-blue neon-text-blue">HUB</span>
          </h2>
          <p className="text-white/50">Folg mir auf allen Plattformen</p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`cyber-card rounded-lg p-6 text-center bg-gradient-to-b ${s.bg} cursor-pointer no-underline block relative`}
              style={{ borderColor: `${s.color}30` }}
            >
              {/* Live badge for Kick */}
              {s.live && (
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: '#53fc18', boxShadow: '0 0 6px #53fc18' }}
                  />
                  <span className="font-cyber text-xs" style={{ color: '#53fc18' }}>LIVE</span>
                </div>
              )}
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="font-cyber text-xl font-bold mb-1" style={{ color: s.color }}>
                {s.name}
              </h3>
              <div className="text-white font-bold text-lg mb-1">{s.stats}</div>
              <p className="text-white/50 text-sm">{s.description}</p>
              <div
                className="mt-4 text-xs font-cyber tracking-widest py-2 px-4 border rounded"
                style={{ color: s.color, borderColor: `${s.color}50` }}
              >
                FOLGEN →
              </div>
            </motion.a>
          ))}
        </div>

        {/* YouTube Latest Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-cyber text-2xl font-bold text-white mb-6 text-center">
            <span className="text-red-500">▶</span> NEUESTE VIDEOS
          </h3>
          {ytLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="cyber-card rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-video bg-white/5" />
                  <div className="p-4">
                    <div className="h-3 bg-white/10 rounded mb-2 w-3/4" />
                    <div className="h-2 bg-white/5 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : ytVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {ytVideos.map((video, i) => (
                <motion.a
                  key={video.videoId}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="cyber-card rounded-lg overflow-hidden no-underline block group"
                  style={{ borderColor: 'rgba(255,0,0,0.2)' }}
                >
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-4xl">▶</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-body font-bold truncate">{video.title}</p>
                    <p className="text-red-500 text-xs font-cyber mt-1">YOUTUBE →</p>
                  </div>
                </motion.a>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <a
                href="https://youtube.com/@Zyztm"
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-card rounded-lg p-8 text-center no-underline flex flex-col items-center gap-4 max-w-sm w-full"
                style={{ borderColor: 'rgba(255,0,0,0.2)' }}
              >
                <div className="text-6xl">📺</div>
                <p className="font-cyber text-xl font-bold text-red-500">ZYZTM AUF YOUTUBE</p>
                <p className="text-white/50 text-sm">Alle Videos & Highlights ansehen</p>
                <div className="text-xs font-cyber tracking-widest py-2 px-6 border border-red-500/50 rounded text-red-500">
                  KANAL ÖFFNEN →
                </div>
              </a>
            </div>
          )}
        </motion.div>

        {/* Discord Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h3 className="font-cyber text-2xl font-bold text-white mb-6 text-center">
            <span style={{ color: '#5865f2' }}>💬</span> DISCORD COMMUNITY
          </h3>
          {DISCORD_SERVER_ID !== 'DEINE_DISCORD_SERVER_ID' ? (
            <iframe
              src={`https://discord.com/widget?id=${DISCORD_SERVER_ID}&theme=dark`}
              width="350"
              height="500"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="rounded-lg border border-indigo-500/30"
              title="Discord Server Widget"
            />
          ) : (
            // TODO: Replace DEINLINK with your real Discord invite code
            <a
              href="https://discord.gg/DEINLINK"
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-card rounded-lg p-8 text-center no-underline flex flex-col items-center gap-4 max-w-sm w-full"
              style={{ borderColor: '#5865f230' }}
            >
              <div className="text-6xl">💬</div>
              <p className="font-cyber text-xl font-bold" style={{ color: '#5865f2' }}>
                JOIN DISCORD
              </p>
              <p className="text-white/50 text-sm">Werde Teil der Community!</p>
              <div
                className="text-xs font-cyber tracking-widest py-2 px-6 border rounded"
                style={{ color: '#5865f2', borderColor: '#5865f250' }}
              >
                SERVER BEITRETEN →
              </div>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
