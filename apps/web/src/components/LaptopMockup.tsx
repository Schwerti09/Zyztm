import { motion } from 'framer-motion';

export default function LaptopMockup() {
  return (
    <section className="py-20 px-6 relative flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="text-neon-blue neon-text-blue">NEXUS</span>{' '}
          <span className="text-white">PREVIEW</span>
        </h2>
        <p className="text-white/50 text-sm">Dein exklusiver Hub – so sieht er aus</p>
      </motion.div>

      {/* Laptop wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        whileHover={{ y: -12, scale: 1.02 }}
        className="relative w-full max-w-3xl"
        style={{ filter: 'drop-shadow(0 0 40px rgba(0,242,255,0.25)) drop-shadow(0 0 80px rgba(255,0,85,0.15))' }}
      >
        {/* Screen bezel */}
        <div
          className="relative mx-auto rounded-t-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1f2e, #0d1117)',
            border: '2px solid rgba(0,242,255,0.3)',
            boxShadow: '0 0 30px rgba(0,242,255,0.15), inset 0 0 30px rgba(0,0,0,0.8)',
            paddingTop: '2%',
            paddingLeft: '2%',
            paddingRight: '2%',
          }}
        >
          {/* Camera dot */}
          <div className="flex justify-center mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: '#222', boxShadow: '0 0 4px rgba(0,242,255,0.4)' }}
            />
          </div>

          {/* Screen glass */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              aspectRatio: '16/10',
              background: '#03050a',
              border: '1px solid rgba(0,242,255,0.2)',
            }}
          >
            {/* Reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(0,242,255,0.04) 100%)',
              }}
            />

            {/* Scan line */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.6), transparent)',
                animation: 'scan 4s linear infinite',
              }}
            />

            {/* Static screenshot / preview content */}
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
              <div
                className="font-cyber text-4xl md:text-5xl font-black text-neon-pink"
                style={{ textShadow: '0 0 15px #ff0055, 0 0 40px #ff0055' }}
              >
                ZYZTM NEXUS
              </div>
              <div className="flex gap-6 text-xs font-cyber">
                <span className="text-neon-blue" style={{ textShadow: '0 0 8px #00f2ff' }}>
                  1.05M YOUTUBE
                </span>
                <span className="text-neon-pink" style={{ textShadow: '0 0 8px #ff0055' }}>
                  CREATOR CODE: JOJOJO
                </span>
                <span style={{ color: '#53fc18', textShadow: '0 0 8px #53fc18' }}>
                  180K KICK
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm mt-2">
                {[
                  { color: '#00f2ff', label: 'VOICE SYNTH' },
                  { color: '#ff0055', label: 'DEEPI AI' },
                  { color: '#ffd700', label: 'CARD BOOSTER' },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="rounded p-2 text-center"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}15, rgba(10,12,21,0.9))`,
                      border: `1px solid ${card.color}40`,
                      boxShadow: `0 0 10px ${card.color}20`,
                    }}
                  >
                    <div className="font-cyber text-xs" style={{ color: card.color, fontSize: '9px' }}>
                      {card.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Laptop base / hinge */}
        <div
          className="relative mx-auto"
          style={{
            background: 'linear-gradient(180deg, #181e2c, #0d1117)',
            border: '2px solid rgba(0,242,255,0.2)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            height: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        >
          {/* Trackpad hint */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '60px',
              height: '10px',
              background: 'rgba(0,242,255,0.05)',
              border: '1px solid rgba(0,242,255,0.15)',
              borderRadius: '3px',
            }}
          />
        </div>

        {/* Base shadow */}
        <div
          className="mx-auto mt-1"
          style={{
            height: '8px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)',
            borderRadius: '0 0 50% 50%',
            filter: 'blur(6px)',
          }}
        />
      </motion.div>
    </section>
  );
}
