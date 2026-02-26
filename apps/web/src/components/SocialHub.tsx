import { motion } from 'framer-motion';
import SocialCard, { type Channel } from './SocialCard';
import PowerButton from './PowerButton';

// Replace DEINE_DISCORD_SERVER_ID with your real Discord server ID to enable the widget
const DISCORD_SERVER_ID = 'DEINE_DISCORD_SERVER_ID';

const socialChannels: Channel[] = [
  {
    id: 'kick',
    name: 'KICK',
    icon: '🟢',
    url: 'https://kick.com/zyztm',
    color: '#53fc18',
    bgColor: 'linear-gradient(135deg, rgba(15,40,15,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: '180K Follower',
    live: true,
    preview: { type: 'video', src: '/vids/kick-preview.mp4' },
  },
  {
    id: 'youtube',
    name: 'YOUTUBE',
    icon: '📺',
    url: 'https://youtube.com/@Zyztm',
    color: '#ff0000',
    bgColor: 'linear-gradient(135deg, rgba(40,5,5,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: '1.05M Abonnenten',
    live: false,
    preview: { type: 'image', src: '/images/yt-fallback.jpg' },
  },
  {
    id: 'tiktok',
    name: 'TIKTOK',
    icon: '🎵',
    url: 'https://tiktok.com/@zyztm',
    color: '#ff0055',
    bgColor: 'linear-gradient(135deg, rgba(30,10,20,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: '651K Follower',
    live: false,
    preview: null,
  },
  {
    id: 'discord',
    name: 'DISCORD',
    icon: '💬',
    url: 'https://discord.gg/zyztm',
    color: '#5865f2',
    bgColor: 'linear-gradient(135deg, rgba(10,15,40,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: 'Community',
    live: false,
    preview: null,
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    icon: '📸',
    url: 'https://instagram.com/zyztm2.0',
    color: '#e1306c',
    bgColor: 'linear-gradient(135deg, rgba(40,5,20,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: 'Folge mir!',
    live: false,
    preview: null,
  },
  {
    id: 'linktree',
    name: 'LINKTREE',
    icon: '🌐',
    url: 'https://linktr.ee/zyztm',
    color: '#43e55e',
    bgColor: 'linear-gradient(135deg, rgba(10,35,15,0.9) 0%, rgba(13,17,23,0.95) 100%)',
    stats: 'Alle Links',
    live: false,
    preview: null,
  },
];

export default function SocialHub() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            THE <span className="text-neon-blue neon-text-blue" style={{ textShadow: '0 0 30px #00f2ff, 0 0 60px #00f2ff60' }}>COMMAND CENTER</span>
          </h2>
          <p className="text-white/50">Live-Daten aus allen Plattformen</p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-16">
          {socialChannels.map((channel, i) => (
            <SocialCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>

        {/* Power Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <PowerButton channels={socialChannels} />
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
            <a
              href="https://discord.gg/zyztm"
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
