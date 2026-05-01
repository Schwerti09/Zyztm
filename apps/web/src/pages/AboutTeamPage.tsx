import { motion } from 'framer-motion';
import { Link } from 'wouter';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';

export default function AboutTeamPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neon-pink/30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/">
            <a className="font-cyber text-neon-pink text-sm tracking-widest hover:text-white transition-colors">
              ← ZURÜCK ZUM NEXUS
            </a>
          </Link>
        </div>
      </div>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5">
              <span className="text-neon-blue text-xs font-cyber tracking-widest">⚡ TEAM NEXUS</span>
            </div>
            <h1 className="font-cyber text-4xl md:text-6xl font-bold text-white mb-4">
              <span style={{ color: NEON_BLUE, textShadow: `0 0 15px ${NEON_BLUE}` }}>ÜBER UNS</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Fortnite Nexus ist die deutsche Fortnite-Community für Tools, Guides, Item-Shop-Daten, Meta-Updates und smarte Automationen.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="cyber-card rounded-xl p-8 text-center"
              style={{ borderColor: `${NEON_PINK}30` }}
            >
              <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(255,0,85,0.35)]">
                <span className="font-cyber text-4xl font-bold text-white">RS</span>
              </div>
              <h2 className="font-cyber text-2xl font-bold text-white mb-2">R.Schwertfechter</h2>
              <p className="text-neon-blue font-cyber text-sm tracking-widest mb-4">FOUNDER & FULL-STACK DEVELOPER</p>
              <div className="text-white/60 text-sm space-y-2">
                <p>Dornum, Germany</p>
                <a href="mailto:legal@fortnitenexus.space" className="text-neon-blue hover:text-white transition-colors">
                  legal@fortnitenexus.space
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="cyber-card rounded-xl p-8 space-y-6"
              style={{ borderColor: `${NEON_BLUE}30` }}
            >
              <section>
                <h2 className="font-cyber text-xl font-bold mb-3" style={{ color: NEON_BLUE }}>MISSION</h2>
                <p className="text-white/70 leading-relaxed">
                  Wir bauen Fortnite Nexus als schnellen, mobilen und SEO-starken Hub für deutsche Fortnite-Spieler. Unser Ziel ist eine Plattform, die 24/7 Wert liefert: bessere Entscheidungen im Item Shop, bessere Settings, bessere Guides und eine stärkere Community.
                </p>
              </section>

              <div className="border-t border-white/10" />

              <section>
                <h2 className="font-cyber text-xl font-bold mb-3" style={{ color: NEON_PINK }}>WAS WIR BAUEN</h2>
                <div className="grid md:grid-cols-2 gap-4 text-white/70 text-sm">
                  <div className="rounded-lg border border-white/10 p-4 bg-white/5">Live Item Shop & Wishlist Alerts</div>
                  <div className="rounded-lg border border-white/10 p-4 bg-white/5">Pro Settings & Weapon Datenbanken</div>
                  <div className="rounded-lg border border-white/10 p-4 bg-white/5">Fortnite Tools & Performance Guides</div>
                  <div className="rounded-lg border border-white/10 p-4 bg-white/5">Social, Discord & Newsletter Automation</div>
                </div>
              </section>

              <div className="border-t border-white/10" />

              <section>
                <h2 className="font-cyber text-xl font-bold mb-3" style={{ color: NEON_BLUE }}>TECH STACK</h2>
                <p className="text-white/70 leading-relaxed">
                  React, TypeScript, Vite, Tailwind CSS, Neon Serverless Postgres, Netlify Functions, Stripe, Resend und Discord.js.
                </p>
              </section>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid md:grid-cols-3 gap-4 mb-8"
          >
            {[
              ['COMMUNITY', 'Von Spielern für Spieler — Feedback entscheidet die Roadmap.'],
              ['PERFORMANCE', 'Mobile-first, schnell, sauber indexierbar und conversion-stark.'],
              ['TRANSPARENZ', 'Klare Legal Pages, klare Kontakte, klare Verantwortung.'],
            ].map(([title, text]) => (
              <div key={title} className="cyber-card rounded-xl p-6" style={{ borderColor: `${NEON_BLUE}25` }}>
                <h3 className="font-cyber text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex gap-3 mt-6 flex-wrap justify-center"
          >
            {[
              { label: 'IMPRESSUM', href: '/impressum' },
              { label: 'DATENSCHUTZ', href: '/datenschutz' },
              { label: 'AGB', href: '/agb' },
            ].map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className="font-cyber text-xs tracking-widest px-4 py-2 rounded border transition-all"
                  style={{ borderColor: 'rgba(0,242,255,0.3)', color: 'rgba(0,242,255,0.6)' }}
                >
                  {link.label} →
                </a>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
