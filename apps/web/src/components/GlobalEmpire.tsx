import { motion } from 'framer-motion';

const NEON_BLUE = '#00f2ff';
const NEON_PINK = '#ff0055';
const NEON_GREEN = '#53fc18';

const platforms = [
  {
    icon: '🎵',
    value: '676K',
    label: 'TIKTOK',
    sub: '14.2 Million Likes',
    color: NEON_PINK,
  },
  {
    icon: '📺',
    value: '356K',
    label: 'YOUTUBE',
    sub: 'Haupt + Nexus PLUS',
    color: '#ff0000',
  },
  {
    icon: '🟢',
    value: '28.9K',
    label: 'KICK',
    sub: '+372 letzte 30 Tage',
    color: NEON_GREEN,
  },
  {
    icon: '🌍',
    value: '1.06M',
    label: 'TOTAL REACH',
    sub: 'Warriors weltweit',
    color: NEON_BLUE,
  },
];

const achievements = [
  {
    badge: 'BIGGEST MOMENT 2026',
    title: '„Mädchen fangen die Jungs" Turnier',
    text: 'Eines der viralsten deutschen Fortnite-Events',
    color: '#ffd700',
  },
  {
    badge: 'RECORD',
    title: '676.000 TikTok Follower',
    text: 'Stärkstes organisches Wachstum DACH Fortnite',
    color: NEON_PINK,
  },
  {
    badge: 'COMMUNITY',
    title: 'Regelmäßige große Turniere',
    text: 'Hunderte Teilnehmer pro Event',
    color: NEON_BLUE,
  },
];

export default function GlobalEmpire() {
  return (
    <section className="py-20 px-6 relative" id="global-empire">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0,242,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="font-cyber text-xs tracking-widest px-3 py-1 rounded border inline-block mb-4"
            style={{ color: NEON_BLUE, borderColor: `${NEON_BLUE}40`, background: `${NEON_BLUE}10` }}
          >
            GLOBAL EMPIRE
          </span>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            NEXUS{' '}
            <span
              className="neon-text-blue"
              style={{ color: NEON_BLUE, textShadow: `0 0 30px ${NEON_BLUE}, 0 0 60px ${NEON_BLUE}60` }}
            >
              2026
            </span>
          </h2>
          <p className="text-white/50 font-body text-lg">
            1.06M+ Warriors grind with us
          </p>
        </motion.div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {platforms.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="cyber-card rounded-xl p-6 text-center relative overflow-hidden"
              style={{ borderColor: `${p.color}30` }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${p.color}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <div className="text-3xl mb-3">{p.icon}</div>
                <div
                  className="font-cyber text-3xl font-bold mb-1"
                  style={{ color: p.color, textShadow: `0 0 15px ${p.color}80` }}
                >
                  {p.value}
                </div>
                <div className="font-cyber text-xs tracking-widest text-white/80 mb-1">
                  {p.label}
                </div>
                <div className="text-white/40 text-[11px] font-body">{p.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {achievements.map((a, i) => (
            <motion.div
              key={a.badge}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="cyber-card rounded-xl p-6 relative overflow-hidden"
              style={{ borderColor: `${a.color}30` }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 70% 50% at 0% 0%, ${a.color}08 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10">
                <span
                  className="font-cyber text-[10px] tracking-widest px-2 py-0.5 rounded border inline-block mb-3"
                  style={{
                    color: a.color,
                    borderColor: `${a.color}40`,
                    background: `${a.color}12`,
                  }}
                >
                  {a.badge}
                </span>
                <h4 className="font-cyber text-sm font-bold text-white mb-2 leading-snug">
                  {a.title}
                </h4>
                <p className="text-white/50 text-xs font-body leading-relaxed">{a.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
