import { motion } from 'framer-motion';

export default function KickEmbed() {
  return (
    <section className="py-12 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="font-cyber text-lg font-bold tracking-widest" style={{ color: '#53fc18' }}>
              VIDEO
            </span>
          </div>
          <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white">
            ZYZTM AUF{' '}
            <span className="font-cyber" style={{ color: '#53fc18', textShadow: '0 0 15px #53fc18' }}>
              KICK
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: '#53fc18', boxShadow: '0 0 6px #53fc18' }}
            />
            <a
              href="https://kick.com/zyztm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cyber text-sm tracking-widest"
              style={{ color: '#53fc18' }}
              aria-label="Zyztm Live-Stream auf Kick besuchen"
            >
              LIVE AUF KICK →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative rounded-lg overflow-hidden"
          style={{
            border: '1px solid #53fc1840',
            boxShadow: '0 0 40px #53fc1820',
          }}
        >
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/live_stream?channel=UC_REPLACE_WITH_CHANNEL_ID"
              title="Fortnite Nexus auf YouTube"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center"
        >
          <a
            href="https://kick.com/zyztm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-cyber tracking-widest py-2 px-6 rounded border transition-all duration-300 hover:scale-105"
            style={{ color: '#ff0000', borderColor: '#ff000050', background: '#ff000010' }}
          >
            🟢 AUF YOUTUBE FOLGEN →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
