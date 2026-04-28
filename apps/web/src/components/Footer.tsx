import { Link } from 'wouter';
import AdSpot from './AdSpot';
import SacReminder from './SacReminder';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="font-cyber text-xl font-bold text-neon-pink mb-3 neon-text-pink">FORTNITE NEXUS</h3>
            <p className="text-white/50 text-sm">Die ultimative deutsche Fortnite Community. Guides, Meta, Tools und News – alles für Fortnite Spieler auf Deutsch.</p>
            <p className="text-white/30 text-xs mt-3 font-cyber tracking-widest">
              DEINE COMMUNITY · DEIN HUB
            </p>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">GUIDES</h4>
            <div className="space-y-2">
              <Link href="/de/guide/fortnite-ultimate-guide-2026">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Ultimate Guide</a>
              </Link>
              <Link href="/de/guide/fortnite-aim-verbessern-2026">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Aim Guide</a>
              </Link>
              <Link href="/de/guide/fortnite-building-guide">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Building Guide</a>
              </Link>
              <Link href="/de/guide/fortnite-best-settings-2026">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Best Settings</a>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">META</h4>
            <div className="space-y-2">
              <Link href="/de/meta/waffen">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Waffen</a>
              </Link>
              <Link href="/de/meta/karten">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Karten</a>
              </Link>
              <Link href="/de/ranked">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Ranked</a>
              </Link>
              <Link href="/de/guide/fortnite-weapon-tier-list">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Weapon Tier List</a>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">TOOLS</h4>
            <div className="space-y-2">
              <Link href="/de/tools/waffen-datenbank">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Waffen-Datenbank</a>
              </Link>
              <Link href="/de/tools/loadout-builder">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Loadout Builder</a>
              </Link>
              <Link href="/de/guide/fortnite-sensitivity-calculator">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Sensitivity Calculator</a>
              </Link>
              <Link href="/de/tools/stats-checker">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Stats Checker</a>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">LEGAL</h4>
            <div className="space-y-2">
              <Link href="/de/impressum">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Impressum</a>
              </Link>
              <Link href="/de/datenschutz">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">Datenschutz</a>
              </Link>
              <Link href="/de/agb">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">AGB</a>
              </Link>
            </div>
          </div>
        </div>

        {/* Ad Spot in Footer */}
        <div className="flex justify-center mb-8">
          <AdSpot position="banner" size="small" />
        </div>

        {/* SAC Code Reminder - Footer Context */}
        <div className="flex justify-center mb-8 max-w-xl mx-auto">
          <SacReminder context="footer" showDismiss={true} />
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
          <span>© 2026 Fortnite Nexus. Alle Rechte vorbehalten.</span>
          <div className="flex gap-4 mt-2 md:mt-0 flex-wrap">
            <Link href="/impressum"><a className="hover:text-white/60 transition-colors font-cyber">IMPRESSUM</a></Link>
            <Link href="/datenschutz"><a className="hover:text-white/60 transition-colors font-cyber">DATENSCHUTZ</a></Link>
            <Link href="/agb"><a className="hover:text-white/60 transition-colors font-cyber">AGB</a></Link>
            <span className="font-cyber">POWERED BY NEXUS ENGINE v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

