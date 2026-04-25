import { motion } from 'framer-motion';

const milestones = [
  {
    year: '2020',
    icon: '🎮',
    title: 'Der Start',
    text: 'Mit einer Vision und Leidenschaft startete Fortnite Nexus. Erste Mitglieder, erste Guides – und die Community war geboren.',
    color: '#00f2ff',
  },
  {
    year: '2021',
    icon: '🚀',
    title: 'Wachstum',
    text: 'Die Community wuchs rasant. Mit neuen Guides und Tutorials baute Fortnite Nexus eine der engagiertesten deutschen Fortnite-Communities auf.',
    color: '#53fc18',
  },
  {
    year: '2022',
    icon: '📺',
    title: 'Content-Expansion',
    text: 'Highlights, Tutorials und epische Clutch-Momente – der Content wuchs. Die Community wurde zur Familie.',
    color: '#ff0000',
  },
  {
    year: '2023',
    icon: '🏆',
    title: 'Creator Features',
    text: 'Neue Features und Tools wurden eingeführt. Fortnite Nexus bewies, dass es mehr als nur eine Fanseite ist.',
    color: '#ffd700',
  },
  {
    year: '2024',
    icon: '💎',
    title: 'Community-Meilenstein',
    text: 'Tausende aktive Mitglieder. Eine 24/7-Community mit Guides, News und Support – unvergesslich.',
    color: '#ff0055',
  },
];

const traits = [
  { icon: '🎯', label: 'Quality Guides', text: 'Top-Notch Fortnite Guides – jeder Guide ist sorgfältig erstellt.' },
  { icon: '😂', label: 'Community Humor', text: 'Kein Tag ohne Lachen. Die Community macht den Unterschied.' },
  { icon: '🤝', label: 'Community First', text: 'Fortnite Nexus kennt seine Mitglieder – und das zeigt sich jeden Tag.' },
  { icon: '📡', label: 'Multi-Plattform', text: 'YouTube, TikTok, Discord – Fortnite Nexus ist überall für dich erreichbar.' },
];

export default function AboutZyztm() {
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
            MEINE{' '}
            <span className="text-neon-pink neon-text-pink">GAMING-REISE</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Von einem kleinen Stream zu über einer Million Fans – das ist die Geschichte hinter dem Namen.
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
              WER IST <span className="text-neon-pink neon-text-pink">FORTNITE NEXUS?</span>
            </h3>
            <div className="space-y-4 text-white/70 font-body leading-relaxed">
              <p>
                Fortnite Nexus ist keine gewöhnliche Community. Es ist ein Ort für Gamer, Content Creator und vor allem
                ein Mensch, der echte Verbindungen zu seiner Community aufbaut. Hinter dem Controller
                stecken Personen, die mit echter Leidenschaft für Games und echtem Respekt für ihre Fans
                jeden Tag auf die Plattformen geht.
              </p>
              <p>
                Was angefangen hat als Hobby – einfach spielen und die Welt daran teilhaben lassen –
                wurde zu einem Lebenswerk. Mit seinem unverwechselbaren Stil, einer Mischung aus
                explosivem Gameplay und authentischem Humor, schafft Fortnite Nexus eine Atmosphäre, die einen
                immer wieder zurückzieht.
              </p>
              <p>
                Diese Fanseite existiert, weil die Community verdient, einen Ort zu haben, der genauso
                lebendig ist wie die Streams selbst. Ein Ort für alle, die Teil der Reise sein wollen.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {['#Fortnite', '#Guides', '#Creator', '#Community'].map((tag) => (
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
            DIE <span className="text-neon-blue neon-text-blue">MEILENSTEINE</span>
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
