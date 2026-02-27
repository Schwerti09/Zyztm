import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-cyber text-xl font-bold text-neon-pink mb-3 neon-text-pink">ZYZTM NEXUS</h3>
            <p className="text-white/50 text-sm">Der offizielle Hub für den #1 Fortnite Creator. Stream, Shop, Community.</p>
            <p className="text-white/30 text-xs mt-3 font-cyber tracking-widest">
              CREATOR CODE: <span className="text-neon-pink">JOJOJO</span>
            </p>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">SOCIALS</h4>
            <div className="space-y-2">
              {[
                { label: '🟢 Kick', url: 'https://kick.com/zyztm' },
                { label: '📺 YouTube', url: 'https://www.youtube.com/@Zyztm' },
                { label: '🎵 TikTok', url: 'https://www.tiktok.com/@zyztm' },
                { label: '📸 Instagram', url: 'https://www.instagram.com/zyztm2.0' },
                { label: '🌐 Linktree', url: 'https://linktr.ee/zyztm' },
                { label: '💬 Discord', url: 'https://discord.gg/zyztm' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="block text-white/50 text-sm hover:text-neon-blue transition-colors">{s.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-neon-blue mb-3 tracking-widest">GUIDES & TIPPS</h4>
            <div className="space-y-2">
              <Link href="/de/guides/fortnite">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">🎮 Fortnite Guides</a>
              </Link>
              <Link href="/de/guides/settings">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">⚙️ Settings & Config</a>
              </Link>
              <Link href="/de/guides/hardware">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">🖥️ Hardware Guide</a>
              </Link>
              <Link href="/de/guides/stream">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">📡 Stream Setup</a>
              </Link>
              <Link href="/de/guides/ranked">
                <a className="block text-white/50 text-sm hover:text-neon-blue transition-colors">🏆 Ranked & Competitive</a>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">LINKS</h4>
            <div className="space-y-2">
              <a href="#marketplace" className="block text-white/50 text-sm hover:text-neon-pink transition-colors">Marketplace</a>
              <Link href="/dashboard">
                <a className="block text-white/50 text-sm hover:text-neon-pink transition-colors">Dashboard</a>
              </Link>
              <Link href="/coins">
                <a className="block text-white/50 text-sm hover:text-neon-gold transition-colors">💎 JOJOJO Coins</a>
              </Link>
              <Link href="/impressum">
                <a className="block text-white/50 text-sm hover:text-neon-pink transition-colors">Impressum</a>
              </Link>
              <Link href="/datenschutz">
                <a className="block text-white/50 text-sm hover:text-neon-pink transition-colors">Datenschutz</a>
              </Link>
              <Link href="/agb">
                <a className="block text-white/50 text-sm hover:text-neon-pink transition-colors">AGB</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
          <span>© 2026 Zyztm Nexus. Alle Rechte vorbehalten.</span>
          <div className="flex gap-4 mt-2 md:mt-0 flex-wrap">
            <Link href="/impressum"><a className="hover:text-white/60 transition-colors font-cyber">IMPRESSUM</a></Link>
            <Link href="/datenschutz"><a className="hover:text-white/60 transition-colors font-cyber">DATENSCHUTZ</a></Link>
            <Link href="/agb"><a className="hover:text-white/60 transition-colors font-cyber">AGB</a></Link>
            <span className="font-cyber">POWERED BY NEXUS ENGINE v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

