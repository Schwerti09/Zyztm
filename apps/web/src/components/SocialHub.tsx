import { motion } from 'framer-motion';

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
