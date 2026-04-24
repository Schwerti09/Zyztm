import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2024',
    icon: '🚀',
    title: 'Launch von Fortnite Nexus',
    text: 'Als ultimativer deutscher Fortnite Hub gestartet – mit Guides, News und einer wachsenden Community von Fortnite-Spielern.',
    color: '#00f2ff',
  },
  {
    year: '2024',
    icon: '⭐',
    title: 'Creator Marketplace',
    text: 'Eröffnung des Creator Marketplaces – deutsche Creator können jetzt ihre Codes teilen und von der Community profitieren.',
    color: '#ffd700',
  },
  {
    year: '2025',
    icon: '📚',
    title: '500+ Guides',
    text: 'Die Guide-Sammlung wächst auf über 500 detaillierte Fortnite Guides – von Building-Strategien bis Meta-Analysis.',
    color: '#ff0055',
  },
  {
    year: '2025',
    icon: '🏆',
    title: 'Community Tournaments',
    text: 'Erste offizielle Community Tournaments mit Prize Pools – die besten deutschen Spieler treten gegeneinander an.',
    color: '#53fc18',
  },
  {
    year: '2026',
    icon: '💎',
    title: '50K+ Mitglieder',
    text: 'Die Community erreicht 50.000 aktive Mitglieder – Fortnite Nexus wird zur größten deutschen Fortnite Community.',
    color: '#bf5fff',
  },
];

const traits = [
  { icon: '🎮', label: 'Community First', text: 'Alles was wir tun, ist für die Community – von Guides bis Tournaments.' },
  { icon: '📊', label: 'Data-Driven', text: 'Echte Stats, echte Meta-Analysis – basierend auf Daten, nicht auf Meinungen.' },
  { icon: '🤝', label: 'Creator Support', text: 'Wir unterstützen deutsche Creator – mit Creator Codes, Marketplace und Revenue Share.' },
  { icon: '🌍', label: 'Deutsch & Global', text: 'Fokus auf deutsche Community, aber mit globalem Anspruch und Content.' },
];

export default function AboutNexus() {
  return (
    <section className="py-20 px-6 relative" id="about">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,0,85,0.05) 0%, transparent 70%)',
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
            UNSERE{' '}
            <span className="text-neon-pink neon-text-pink">COMMUNITY-REISE</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Von einer Idee zur größten deutschen Fortnite Community – das ist unsere Geschichte.
          </p>
        </motion.div>

        {/* Two-column intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-cyber text-2xl md:text-3xl font-bold text-white mb-6">
              WAS IST <span className="text-neon-pink neon-text-pink">FORTNITE NEXUS?</span>
            </h3>
            <div className="space-y-4 text-white/70 font-body leading-relaxed">
              <p>
                Fortnite Nexus ist mehr als nur eine Website – es ist die ultimative deutsche Fortnite Community.
                Wir bieten alles, was ein Fortnite Spieler braucht: Guides, News, Stats, Item Shop Tracker,
                und eine Plattform für Creator um zu wachsen.
              </p>
              <p>
                Was angefangen hat als Idee – einen zentralen Ort für deutsche Fortnite-Spieler zu schaffen –
                wurde zu einer lebendigen Community mit Tausenden von Mitgliedern. Mit datenbasierten Guides,
                einem Creator Marketplace und regelmäßigen Tournaments bringen wir die deutsche Fortnite
                Community auf das nächste Level.
              </p>
              <p>
                Unser Ziel ist es, jeden deutschen Fortnite Spieler zu unterstützen – vom Beginner bis zum Pro.
                Mit exklusiven Guides, Creator Codes und einer aktiven Community ist Fortnite Nexus der Ort,
                wo deutsche Fortnite Fans zusammenkommen.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {['#FortniteDE', '#Community', '#Guides', '#Creators'].map((tag) => (
                <span
                  key={tag}
                  className="font-cyber text-xs tracking-widest px-3 py-1.5 rounded border"
                  style={{ color: '#ff0055', borderColor: 'rgba(255,0,85,0.3)', background: 'rgba(255,0,85,0.05)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: trait cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="cyber-card rounded-lg p-5"
              >
                <div className="text-3xl mb-3">{trait.icon}</div>
                <h4 className="font-cyber text-sm font-bold text-white mb-2">{trait.label}</h4>
                <p className="text-white/50 text-xs leading-relaxed font-body">{trait.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="font-cyber text-2xl md:text-3xl font-bold text-white">
            UNSERE <span className="text-neon-blue neon-text-blue">MEILENSTEINE</span>
          </h3>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,0,85,0.4), rgba(0,242,255,0.4), transparent)' }}
          />

          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-6 items-center ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card */}
                <div className="flex-1">
                  <div
                    className="cyber-card rounded-lg p-6"
                    style={{ borderColor: `${m.color}30` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{m.icon}</span>
                      <div>
                        <span
                          className="font-cyber text-xs tracking-widest px-2 py-0.5 rounded"
                          style={{ color: m.color, background: `${m.color}15`, border: `1px solid ${m.color}30` }}
                        >
                          {m.year}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-cyber text-sm font-bold text-white mb-2">{m.title}</h4>
                    <p className="text-white/60 text-xs leading-relaxed font-body">{m.text}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div
                  className="hidden md:flex w-4 h-4 rounded-full shrink-0 z-10"
                  style={{
                    background: m.color,
                    boxShadow: `0 0 10px ${m.color}, 0 0 20px ${m.color}60`,
                  }}
                />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
