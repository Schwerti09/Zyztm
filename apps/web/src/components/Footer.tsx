export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-cyber text-xl font-bold text-neon-pink mb-3 neon-text-pink">ZYZTM NEXUS</h3>
            <p className="text-white/50 text-sm">Der offizielle Hub für den #1 Fortnite Creator. Stream, Shop, Community.</p>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">SOCIALS</h4>
            <div className="space-y-2">
              {[
                { label: '🟢 Kick', url: 'https://kick.com/zyztm' },
                { label: '📺 YouTube', url: 'https://youtube.com/@Zyztm' },
                { label: '🎵 TikTok', url: 'https://www.tiktok.com/@zyztm' },
                { label: '💬 Discord', url: 'https://discord.gg/DEINLINK' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="block text-white/50 text-sm hover:text-neon-blue transition-colors">{s.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-cyber text-sm font-bold text-white mb-3 tracking-widest">LINKS</h4>
            <div className="space-y-2">
              {['Marketplace', 'Dashboard', 'Impressum', 'Datenschutz'].map((l) => (
                <a key={l} href="#" className="block text-white/50 text-sm hover:text-neon-pink transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/30 text-xs">
          <span>© 2025 Zyztm Nexus. Alle Rechte vorbehalten.</span>
          <span className="font-cyber mt-2 md:mt-0">POWERED BY NEXUS ENGINE v1.0</span>
        </div>
      </div>
    </footer>
  );
}
