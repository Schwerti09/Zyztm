import { motion } from 'framer-motion';

const galleryItems = [
  { emoji: '🏆', label: 'Victory Royale', bg: 'from-yellow-900/40 to-bg-card' },
  { emoji: '🎮', label: 'Gaming Setup', bg: 'from-blue-900/40 to-bg-card' },
  { emoji: '📺', label: 'Stream Highlights', bg: 'from-red-900/40 to-bg-card' },
  { emoji: '🎯', label: 'Clutch Moments', bg: 'from-pink-900/40 to-bg-card' },
  { emoji: '🤝', label: 'Community', bg: 'from-purple-900/40 to-bg-card' },
  { emoji: '⚡', label: 'Epic Plays', bg: 'from-cyan-900/40 to-bg-card' },
  { emoji: '🦋', label: 'Butterfly Knife', bg: 'from-green-900/40 to-bg-card' },
  { emoji: '🔥', label: 'Fire Moments', bg: 'from-orange-900/40 to-bg-card' },
];

export default function ImageGallery() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            MEDIA <span className="text-neon-pink neon-text-pink">GALLERY</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`aspect-square cyber-card rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br ${item.bg} group overflow-hidden`}
            >
              <span className="text-6xl group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
              <span className="text-white/50 text-xs font-cyber mt-3 tracking-widest group-hover:text-white transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
