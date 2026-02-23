import { motion } from 'framer-motion';

const socials = [
  { name: 'KICK', icon: '🟢', color: '#53fc18', stats: '180K Follower', description: 'Live Gaming Streams', url: '#', bg: 'from-green-950/50 to-bg-card' },
  { name: 'YOUTUBE', icon: '📺', color: '#ff0000', stats: '1.05M Abonnenten', description: 'Videos & Highlights', url: '#', bg: 'from-red-950/50 to-bg-card' },
  { name: 'TIKTOK', icon: '🎵', color: '#ffffff', stats: '651K Follower', description: 'Short Clips & Vibes', url: '#', bg: 'from-gray-800/50 to-bg-card' },
  { name: 'DISCORD', icon: '💬', color: '#5865f2', stats: '12K Mitglieder', description: 'Community & Chat', url: '#', bg: 'from-indigo-950/50 to-bg-card' },
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.url}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`cyber-card rounded-lg p-6 text-center bg-gradient-to-b ${s.bg} cursor-pointer no-underline block`}
              style={{ borderColor: `${s.color}30` }}
            >
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
      </div>
    </section>
  );
}
