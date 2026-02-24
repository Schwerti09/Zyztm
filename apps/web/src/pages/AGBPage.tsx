import { motion } from 'framer-motion';
import { Link } from 'wouter';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';

export default function AGBPage() {
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
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-pink/30 bg-neon-pink/5">
              <span className="text-neon-pink text-xs font-cyber tracking-widest">📜 LEGAL ZONE</span>
            </div>
            <h1 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
              <span style={{ color: NEON_PINK, textShadow: `0 0 15px ${NEON_PINK}` }}>AGB</span>
            </h1>
            <p className="text-white/40 text-xs font-cyber tracking-widest">ALLGEMEINE GESCHÄFTSBEDINGUNGEN</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="cyber-card rounded-xl p-8 space-y-6 overflow-y-auto"
            style={{ borderColor: `${NEON_PINK}30`, maxHeight: '75vh' }}
          >
            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>§ 1 GELTUNGSBEREICH</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Käufe und Nutzungen des digitalen
                Angebots auf Zyztm Nexus (nachfolgend „Plattform"). Mit dem Kauf eines Produkts oder der
                Nutzung des Coin-Systems erklärst du dich mit diesen AGB einverstanden.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>§ 2 PRODUKTE & DIGITALE INHALTE</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm mb-3">
                Die auf der Plattform angebotenen Produkte sind ausschließlich digitale Inhalte (z.B.
                Voice Packs, Soundboards, KI-Chatbot-Zugänge, digitale Sammelkarten). Mit dem Kauf erhältst
                du eine nicht übertragbare Lizenz zur persönlichen Nutzung.
              </p>
              <div
                className="p-3 rounded border text-sm font-body"
                style={{ borderColor: `${NEON_PINK}40`, background: `${NEON_PINK}08`, color: 'rgba(255,255,255,0.7)' }}
              >
                ⚠️ <strong>Kein Widerrufsrecht bei digitalen Inhalten:</strong> Gemäß § 356 Abs. 5 BGB erlischt das
                Widerrufsrecht bei Verträgen über die Lieferung von digitalen Inhalten, die nicht auf einem
                körperlichen Datenträger geliefert werden, sobald die Ausführung begonnen hat und du ausdrücklich
                zugestimmt hast. Eine Rückerstattung erfolgt nur, wenn gesetzlich vorgeschrieben.
              </div>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>§ 3 JOJOJO COINS</h2>
              <ul className="text-white/70 font-body text-sm space-y-2 list-disc list-inside">
                <li>JOJOJO Coins sind virtuelle Währungseinheiten ohne realen Gegenwert.</li>
                <li>Coins können nicht in echtes Geld umgetauscht werden.</li>
                <li>Gekaufte Coins verfallen nicht, solange dein Konto aktiv ist.</li>
                <li>Tägliche Bonus-Coins werden einmal pro Kalendertag gutgeschrieben.</li>
                <li>Im Falle einer Kontosperrung werden Coins nicht erstattet.</li>
                <li>Der Betreiber behält sich vor, das Coin-System zu ändern oder einzustellen.</li>
              </ul>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>§ 4 GEWINNSPIELE & EVENTS</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Für Gewinnspiele und Events gelten jeweils eigene Teilnahmebedingungen, die bei Ankündigung
                veröffentlicht werden. Der Rechtsweg ist ausgeschlossen. Mitarbeiter und nahestehende Personen
                sind von der Teilnahme ausgeschlossen.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>§ 5 NUTZUNGSREGELN</h2>
              <ul className="text-white/70 font-body text-sm space-y-2 list-disc list-inside">
                <li>Kein Missbrauch des Systems (z.B. mehrfache Accounts für Tagesbonuse).</li>
                <li>Kein Weiterverkauf oder Übertragung von Coins oder digitalen Produkten.</li>
                <li>Respektvoller Umgang in der Community.</li>
                <li>Bei Verstößen können Konten gesperrt und Coins eingefroren werden.</li>
              </ul>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_PINK }}>§ 6 HAFTUNGSBESCHRÄNKUNG</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Die Plattform übernimmt keine Haftung für Unterbrechungen des Dienstes, technische Fehler
                oder Datenverluste. Digitale Inhalte werden „wie besehen" bereitgestellt. Die Haftung ist
                auf vorsätzliche und grob fahrlässige Handlungen beschränkt.
              </p>
            </section>

            <div className="border-t border-white/10" />

            <section>
              <h2 className="font-cyber text-lg font-bold mb-3" style={{ color: NEON_BLUE }}>§ 7 SCHLUSSBESTIMMUNGEN</h2>
              <p className="text-white/70 font-body leading-relaxed text-sm">
                Es gilt deutsches Recht. Gerichtsstand ist [Ort]. Sollten einzelne Bestimmungen
                unwirksam sein, bleibt der Rest der AGB hiervon unberührt. Stand: 2025.
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
              { label: 'DATENSCHUTZ', href: '/datenschutz' },
              { label: 'COINS', href: '/coins' },
            ].map((link) => (
              <Link key={link.label} href={link.href}>
                <a
                  className="font-cyber text-xs tracking-widest px-4 py-2 rounded border transition-all"
                  style={{ borderColor: 'rgba(255,0,85,0.3)', color: 'rgba(255,0,85,0.6)' }}
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
