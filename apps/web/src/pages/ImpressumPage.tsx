import { motion } from 'framer-motion';
import { Link } from 'wouter';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
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
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5">
              <span className="text-neon-blue text-xs font-cyber tracking-widest">⚖️ LEGAL ZONE</span>
            </div>
            <h1 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
              <span style={{ color: NEON_BLUE, textShadow: `0 0 15px ${NEON_BLUE}` }}>IMPRESSUM</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="cyber-card rounded-xl p-8 space-y-6 overflow-y-auto"
            style={{ borderColor: `${NEON_BLUE}30`, maxHeight: '75vh' }}
          >
            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>ANGABEN GEMÄSS § 5 TMG</h2>
              <p className="text-white/70 font-body leading-relaxed">
                Fortnite Nexus<br />
                [Straße und Hausnummer]<br />
                [PLZ Ort]<br />
                Deutschland
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>KONTAKT</h2>
              <p className="text-white/70 font-body leading-relaxed">
                E-Mail: <a href="mailto:info@fortnitenexus.de" className="text-neon-blue hover:text-white transition-colors">info@fortnitenexus.de</a><br />
                Soziale Medien: <a href="https://youtube.com/@FortniteNexusDE" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-white transition-colors">youtube.com/@FortniteNexusDE</a>
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>VERANTWORTLICH FÜR DEN INHALT NACH § 55 ABS. 2 RSTV</h2>
              <p className="text-white/70 font-body leading-relaxed">
                Fortnite Nexus (Betreiber dieser Seite)<br />
                [Anschrift wie oben]
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>HAFTUNGSAUSSCHLUSS</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Die Inhalte dieser Seite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
                und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter sind wir gemäß
                § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
                §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
                fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                hinweisen.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>URHEBERRECHT</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>HINWEIS</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Diese Seite ist eine Fan-/Creator-Seite. Fortnite ist eine eingetragene Marke von Epic Games, Inc.
                Diese Seite steht in keiner Verbindung zu Epic Games.
              </p>
            </section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 mt-6 flex-wrap justify-center"
          >
            {[
              { label: 'DATENSCHUTZ', href: '/datenschutz' },
              { label: 'AGB', href: '/agb' },
              { label: 'COINS', href: '/coins' },
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
