import { motion } from 'framer-motion';

export default function HeroSection() {
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
          <button className="btn-primary rounded-sm text-sm">
            🎮 JETZT SHOPPEN
          </button>
          <button className="btn-secondary rounded-sm text-sm">
            📺 STREAM ANSCHAUEN
          </button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { label: 'YouTube', value: '1.05M', icon: '📺' },
            { label: 'TikTok', value: '651K', icon: '🎵' },
            { label: 'Kick', value: '180K', icon: '🟢' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-cyber font-bold text-neon-blue neon-text-blue">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </section>
  );
}
