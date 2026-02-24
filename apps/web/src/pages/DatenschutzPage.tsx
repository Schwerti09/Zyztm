import { motion } from 'framer-motion';
import { Link } from 'wouter';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';

export default function DatenschutzPage() {
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
              <span className="text-neon-blue text-xs font-cyber tracking-widest">🔒 LEGAL ZONE</span>
            </div>
            <h1 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
              <span style={{ color: NEON_BLUE, textShadow: `0 0 15px ${NEON_BLUE}` }}>DATENSCHUTZ</span>
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
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>1. DATENSCHUTZ AUF EINEN BLICK</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten
                passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du
                persönlich identifiziert werden kannst.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>2. DATENERHEBUNG AUF DIESER WEBSITE</h2>
              <h3 className="font-cyber text-sm font-bold mb-2 text-white/80">Wer ist verantwortlich für die Datenerhebung?</h3>
              <p className="text-white/70 font-body leading-relaxed text-sm mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber (Zyztm Nexus).
                Die Kontaktdaten findest du im Impressum.
              </p>
              <h3 className="font-cyber text-sm font-bold mb-2 text-white/80">Welche Daten werden erhoben?</h3>
              <ul className="text-white/70 font-body text-sm space-y-1 list-disc list-inside">
                <li>E-Mail-Adresse (für das Coin-System und Käufe)</li>
                <li>Zahlungsdaten (werden ausschließlich von Stripe verarbeitet)</li>
                <li>Technische Daten: IP-Adresse, Browser-Typ, Betriebssystem (Server-Logs)</li>
                <li>Nutzungsdaten: besuchte Seiten, Interaktionen</li>
              </ul>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>3. ZAHLUNGEN (STRIPE)</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Zahlungen werden über den Dienst Stripe abgewickelt. Anbieter ist die Stripe, Inc.,
                510 Townsend Street, San Francisco, CA 94103, USA. Stripe verarbeitet deine Zahlungsdaten
                gemäß ihrer eigenen Datenschutzrichtlinie: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-white transition-colors">stripe.com/de/privacy</a>.
                Deine Kreditkartendaten gelangen nie auf unsere Server.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>4. YOUTUBE-API</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Diese Website nutzt die YouTube-API von Google für die Anzeige von Videos.
                Anbieter: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                Datenschutzrichtlinie: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-white transition-colors">policies.google.com/privacy</a>.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>5. TIKTOK-EMBEDS</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Diese Website kann TikTok-Inhalte einbetten. Anbieter: TikTok Technology Limited,
                10 Earlsfort Terrace, Dublin, D02 T380, Irland.
                Datenschutzrichtlinie: <a href="https://www.tiktok.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:text-white transition-colors">tiktok.com/legal/privacy-policy-eea</a>.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>6. LOKALER SPEICHER (LOCALSTORAGE)</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Diese Website nutzt den lokalen Speicher deines Browsers (localStorage), um folgende
                Daten zu speichern: deine E-Mail-Adresse (für das Coin-System), Abstimmungen (für Gamer's Choice),
                und den Zeitpunkt des letzten Tagesbonus. Diese Daten verlassen deinen Browser nicht automatisch.
                Du kannst sie jederzeit im Browser löschen.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>7. DEINE RECHTE</h2>
              <ul className="text-white/70 font-body text-sm space-y-1 list-disc list-inside">
                <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              </ul>
              <p className="text-white/70 font-body text-sm mt-3">
                Anfragen bitte an: <a href="mailto:info@zyztm.de" className="text-neon-blue hover:text-white transition-colors">info@zyztm.de</a>
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>8. BESCHWERDERECHT</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
                deiner personenbezogenen Daten zu beschweren.
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
              { label: 'IMPRESSUM', href: '/impressum' },
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
