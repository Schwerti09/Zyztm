import { motion } from 'framer-motion';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';
const NEON_GOLD = '#ffd700';

const testimonials = [
  {
    id: 1,
    quote: 'Zyztm hat mich zu einem besseren Spieler gemacht. Durch seine Tutorials habe ich endlich meinen ersten Solo-Win geholt!',
    name: 'xX_Gaming_Luca_Xx',
    platform: 'Discord',
    icon: '🎮',
    color: NEON_BLUE,
  },
  {
    id: 2,
    quote: 'Kein Stream ohne Zyztm. Der Mann ist einfach zu unterhaltsam – ich lache jedes Mal Tränen.',
    name: 'SarahPlays',
    platform: 'Kick',
    icon: '😂',
    color: NEON_PINK,
  },
  {
    id: 3,
    quote: 'Die Community ist wie eine Familie. Danke Zyztm, dass du diesen Raum für uns alle geschaffen hast!',
    name: 'Nexus_Fan_2024',
    platform: 'YouTube',
    icon: '💙',
    color: NEON_GOLD,
  },
];

const topSupporters = [
  { rank: 1, name: 'EliteGamer_Max', badge: '💎', stat: '500 Sub-Monate', color: NEON_GOLD },
  { rank: 2, name: 'NexusFan_Jana', badge: '🏆', stat: '350 Sub-Monate', color: '#c0c0c0' },
  { rank: 3, name: 'ZyztmArmy_Kevin', badge: '⚡', stat: '280 Sub-Monate', color: '#cd7f32' },
  { rank: 4, name: 'FortniteKing_Tim', badge: '🎯', stat: '210 Sub-Monate', color: NEON_BLUE },
  { rank: 5, name: 'StreamQueen_Lisa', badge: '🌟', stat: '190 Sub-Monate', color: NEON_PINK },
];

const fanArtPlaceholders = [
  { id: 1, emoji: '🎨', label: 'Fan-Art von @nexus_art', desc: 'Digitales Portrait' },
  { id: 2, emoji: '🖌️', label: 'Fan-Art von @pixel_girl', desc: 'Pixel-Art Style' },
  { id: 3, emoji: '✏️', label: 'Fan-Art von @sketch_max', desc: 'Bleistift-Skizze' },
  { id: 4, emoji: '🎭', label: 'Fan-Art von @neon_creator', desc: 'Neon-Artwork' },
];

export default function CommunitySpotlight() {
  return (
    <section className="py-20 px-6 relative" id="community">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 70% 50%, rgba(0,242,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            COMMUNITY{' '}
            <span className="text-neon-blue neon-text-blue">SPOTLIGHT</span>
          </h2>
          <p className="text-white/50">Die besten Fans der Welt – ihr seid der Grund für alles</p>
        </motion.div>

        {/* Fan Art Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-cyber text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span style={{ color: NEON_PINK }}>🎨</span> FAN-ART GALERIE
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {fanArtPlaceholders.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="cyber-card rounded-lg overflow-hidden cursor-pointer group"
                style={{ borderColor: `${NEON_PINK}20` }}
              >
                <div
                  className="aspect-square flex flex-col items-center justify-center gap-3"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,0,85,0.08) 0%, rgba(0,242,255,0.05) 100%)`,
                  }}
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </span>
                  <span
                    className="font-cyber text-[10px] tracking-widest px-2 py-0.5 rounded"
                    style={{ color: NEON_PINK, background: `${NEON_PINK}15`, border: `1px solid ${NEON_PINK}30` }}
                  >
                    FAN-ART
                  </span>
                </div>
                <div className="p-3">
                  <p className="text-white/70 text-xs font-body line-clamp-1">{item.label}</p>
                  <p className="text-white/30 text-[10px] font-cyber tracking-widest mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA to submit fan art */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 cyber-card rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: `${NEON_PINK}25` }}
          >
            <div>
              <p className="font-cyber text-sm font-bold text-white mb-1">🎨 DEIN FAN-ART HIER?</p>
              <p className="text-white/50 text-xs font-body">
                Schick uns deine Kreation per Discord – die besten werden hier featured!
              </p>
            </div>
            <a
              href="https://discord.gg/zyztm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all whitespace-nowrap shrink-0"
              style={{ borderColor: `${NEON_PINK}50`, color: NEON_PINK }}
            >
              DISCORD BEITRETEN →
            </a>
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-cyber text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span style={{ color: NEON_GOLD }}>💬</span> FAN-STIMMEN
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="cyber-card rounded-lg p-6 flex flex-col gap-4"
                style={{ borderColor: `${t.color}25` }}
              >
                <div className="text-3xl">{t.icon}</div>
                <blockquote className="text-white/70 text-sm font-body leading-relaxed italic flex-1">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-cyber text-xs font-bold" style={{ color: t.color }}>
                      {t.name}
                    </p>
                    <p className="text-white/30 text-[10px] font-cyber tracking-widest">{t.platform}</p>
                  </div>
                  <span
                    className="font-cyber text-[10px] tracking-widest px-2 py-0.5 rounded border"
                    style={{ color: t.color, borderColor: `${t.color}30` }}
                  >
                    FAN
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Supporters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-cyber text-xl font-bold text-white mb-6 flex items-center gap-3">
            <span style={{ color: NEON_GOLD }}>🏆</span> TOP SUPPORTER
          </h3>
          <div className="cyber-card rounded-lg overflow-hidden" style={{ borderColor: `${NEON_GOLD}20` }}>
            {topSupporters.map((s, i) => (
              <motion.div
                key={s.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`flex items-center gap-4 px-6 py-4 ${
                  i < topSupporters.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <span className="font-cyber text-2xl w-8 text-center">{s.badge}</span>
                <div className="flex-1">
                  <p className="font-cyber text-sm font-bold" style={{ color: s.color }}>
                    {s.name}
                  </p>
                  <p className="text-white/40 text-xs font-body">{s.stat}</p>
                </div>
                <span
                  className="font-cyber text-xs tracking-widest px-2 py-0.5 rounded"
                  style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}
                >
                  #{s.rank}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <p className="text-white/30 text-xs font-cyber tracking-widest">
              – Werde Teil der Community und erscheine hier –
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
