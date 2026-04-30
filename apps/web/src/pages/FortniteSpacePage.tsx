import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';

const Footer = lazy(() => import('../components/Footer'));

interface FeaturedTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  color: string;
  status: 'live' | 'coming-soon';
}

const FEATURED_TOOLS: FeaturedTool[] = [
  {
    slug: 'sensitivity-converter',
    name: 'Sensitivity Converter Pro',
    tagline: 'Cross-Game Sens-Berechnung',
    description: '8 Spiele. cm/360°-Methode. FOV-Scaling. DPI-Kompensation.',
    icon: '🎯',
    color: '#ff0055',
    status: 'live',
  },
  {
    slug: 'loadout-optimizer',
    name: 'Loadout Optimizer AI',
    tagline: 'Optimales 5-Slot-Loadout',
    description: 'Multi-Criteria Decision-Engine. 25+ Waffen. Situational Score.',
    icon: '🎒',
    color: '#00f2ff',
    status: 'live',
  },
  {
    slug: 'stats-dashboard',
    name: 'Stats Dashboard Pro',
    tagline: 'AI-Performance-Analyse',
    description: '4-Dimensionen Skill-Score. Personalisierte Trainingspläne.',
    icon: '📊',
    color: '#f5c518',
    status: 'live',
  },
];

const STATS = [
  { label: 'Pro Tools', value: '8', sublabel: 'Alle live & einsatzbereit' },
  { label: 'Waffen-Datenbank', value: '25+', sublabel: 'Mit Live-DPS-Berechnung' },
  { label: 'Spiele', value: '8', sublabel: 'Cross-Game Sens-Support' },
  { label: 'Mobile-Ready', value: '100%', sublabel: 'Responsive Design' },
];

export default function FortniteSpacePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title =
      'Fortnite Nexus — Pro Tools für Competitive Spieler | Loadouts, Stats, Sensitivity';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Fortnite Nexus: 8 High-Tech-Tools für kompetitive Spieler. Sensitivity-Converter, Loadout-Optimizer, Stats-Dashboard mit AI-Insights. Wissenschaftlich. Präzise.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white relative overflow-hidden">
      {/* HERO */}
      <main className="relative">
        {/* Glow Background */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, #ff0055 0%, #00f2ff 50%, transparent 80%)',
          }}
        />

        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-pink animate-pulse" />
            <span className="font-cyber text-[10px] tracking-widest text-neon-pink">
              FORTNITE NEXUS · PRO ARSENAL
            </span>
          </div>

          <h1 className="font-cyber text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
            DIE TOOLS{' '}
            <span
              className="bg-gradient-to-r from-neon-pink via-neon-blue to-neon-gold bg-clip-text text-transparent"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              DER PROS
            </span>
          </h1>

          <p className="text-white/70 font-body text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            8 High-Tech-Tools für Fortnite-Profis. Wissenschaftlich. Präzise. Sofort
            einsetzbar. <strong className="text-white">Keine Spielzeuge.</strong>
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link href="/tools">
              <a className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform">
                ALLE TOOLS ENTDECKEN →
              </a>
            </Link>
            <Link href="/shop">
              <a className="inline-block px-8 py-4 rounded-xl border border-white/20 bg-white/5 font-cyber text-sm tracking-widest text-white hover:bg-white/10 transition-colors">
                NEXUS PRO €14,99
              </a>
            </Link>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl border border-white/10 bg-white/[0.03]"
              >
                <div className="font-cyber text-3xl font-black text-white mb-1">
                  {s.value}
                </div>
                <div className="text-[10px] font-cyber tracking-widest text-white/40 uppercase">
                  {s.label}
                </div>
                <div className="text-[10px] font-body text-white/30 mt-1">
                  {s.sublabel}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED TOOLS */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white mb-2">
                LIVE-TOOLS
              </h2>
              <p className="text-sm font-body text-white/60">
                Sofort nutzbar. Kein Login. Kein Tracking.
              </p>
            </div>
            <Link href="/tools">
              <a className="font-cyber text-xs tracking-widest text-neon-blue hover:text-white transition-colors">
                ALLE 8 TOOLS →
              </a>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURED_TOOLS.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                <a className="block group">
                  <article
                    className="p-6 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.05] transition-all h-full"
                    style={{
                      borderColor: `${tool.color}30`,
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                      style={{
                        background: `${tool.color}15`,
                        border: `1px solid ${tool.color}40`,
                      }}
                    >
                      {tool.icon}
                    </div>

                    <div
                      className="text-xs font-cyber tracking-widest mb-1"
                      style={{ color: tool.color }}
                    >
                      {tool.tagline}
                    </div>

                    <h3 className="font-cyber text-lg font-bold text-white mb-2 leading-tight">
                      {tool.name}
                    </h3>

                    <p className="text-sm font-body text-white/60 leading-relaxed mb-4">
                      {tool.description}
                    </p>

                    <div
                      className="font-cyber text-xs tracking-widest transition-all group-hover:translate-x-1"
                      style={{ color: tool.color }}
                    >
                      JETZT NUTZEN →
                    </div>
                  </article>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* LIVE DATA HUB */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
            <div>
              <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white mb-2">
                LIVE DATA HUB
              </h2>
              <p className="text-sm font-body text-white/60">
                Daten statt Hype. Immer aktuell, immer ehrlich.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/item-shop">
              <a className="block group">
                <article className="p-6 rounded-2xl border border-neon-pink/30 bg-gradient-to-br from-neon-pink/10 to-transparent hover:from-neon-pink/20 transition-all h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[10px] font-cyber tracking-widest text-neon-pink">
                      LIVE · DAILY ROTATION
                    </span>
                  </div>
                  <div className="text-3xl mb-3">🛒</div>
                  <h3 className="font-cyber text-xl font-bold text-white mb-2">
                    Item Shop heute
                  </h3>
                  <p className="text-sm font-body text-white/70 leading-relaxed mb-4">
                    Aktueller Fortnite Shop mit Rarity-Rating und Shop-History. Creator-Code{' '}
                    <strong className="text-neon-pink">ZYZTM</strong> für jedes Item.
                  </p>
                  <div className="font-cyber text-xs tracking-widest text-neon-pink group-hover:translate-x-1 transition-transform">
                    SHOP ANSEHEN →
                  </div>
                </article>
              </a>
            </Link>

            <Link href="/pros">
              <a className="block group">
                <article className="p-6 rounded-2xl border border-neon-blue/30 bg-gradient-to-br from-neon-blue/10 to-transparent hover:from-neon-blue/20 transition-all h-full">
                  <div className="mb-4">
                    <span className="text-[10px] font-cyber tracking-widest text-neon-blue">
                      20+ TOP-PROS
                    </span>
                  </div>
                  <div className="text-3xl mb-3">🏆</div>
                  <h3 className="font-cyber text-xl font-bold text-white mb-2">
                    Pro Settings
                  </h3>
                  <p className="text-sm font-body text-white/70 leading-relaxed mb-4">
                    Bugha, Clix, Mongraal, Tayson, Aqua — alle Sensitivities, Keybinds und Gear-Setups.
                  </p>
                  <div className="font-cyber text-xs tracking-widest text-neon-blue group-hover:translate-x-1 transition-transform">
                    PROS ENTDECKEN →
                  </div>
                </article>
              </a>
            </Link>

            <Link href="/weapons">
              <a className="block group">
                <article className="p-6 rounded-2xl border border-neon-gold/30 bg-gradient-to-br from-neon-gold/10 to-transparent hover:from-neon-gold/20 transition-all h-full">
                  <div className="mb-4">
                    <span className="text-[10px] font-cyber tracking-widest text-neon-gold">
                      25+ WAFFEN · DPS DATA
                    </span>
                  </div>
                  <div className="text-3xl mb-3">⚔️</div>
                  <h3 className="font-cyber text-xl font-bold text-white mb-2">
                    Waffen-Datenbank
                  </h3>
                  <p className="text-sm font-body text-white/70 leading-relaxed mb-4">
                    Tier-Liste, DPS-Berechnung, Combat-Stats und Pro-Tipps für jede Waffe im Spiel.
                  </p>
                  <div className="font-cyber text-xs tracking-widest text-neon-gold group-hover:translate-x-1 transition-transform">
                    WAFFEN ANSEHEN →
                  </div>
                </article>
              </a>
            </Link>
          </div>
        </section>

        {/* WHY US */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="font-cyber text-3xl sm:text-4xl font-black text-white mb-3">
              WARUM NEXUS?
            </h2>
            <p className="text-white/60 font-body">
              Andere bauen Communities. Wir bauen Werkzeuge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl mb-3">🧪</div>
              <h3 className="font-cyber text-base font-bold text-white mb-2">
                Wissenschaft statt Bauchgefühl
              </h3>
              <p className="text-sm font-body text-white/60 leading-relaxed">
                Jede Empfehlung basiert auf Daten. cm/360°, Multi-Criteria-Scoring,
                statistische Modelle.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-cyber text-base font-bold text-white mb-2">
                Sofort einsetzbar
              </h3>
              <p className="text-sm font-body text-white/60 leading-relaxed">
                Browser-Tools, kein Download, kein Account. Werte werden lokal
                gespeichert.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="text-3xl mb-3">🇩🇪</div>
              <h3 className="font-cyber text-base font-bold text-white mb-2">
                Deutsch first
              </h3>
              <p className="text-sm font-body text-white/60 leading-relaxed">
                Komplett auf Deutsch. Kein automatisch übersetzter Schrott. Perfekt für
                den DACH-Markt.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 mb-16">
          <div className="p-10 rounded-3xl border border-neon-gold/40 bg-gradient-to-br from-neon-gold/10 via-transparent to-neon-pink/10 text-center">
            <h2 className="font-cyber text-3xl sm:text-4xl font-black text-white mb-3">
              READY TO LEVEL UP?
            </h2>
            <p className="text-white/70 font-body max-w-xl mx-auto mb-6 leading-relaxed">
              Starte mit einem unserer Live-Tools — alle kostenlos in der Basic-Version.
              Upgrade zu Nexus Pro für unlimited Access.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/tools/sensitivity-converter">
                <a className="px-6 py-3 rounded-xl bg-neon-pink text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform">
                  SENSITIVITY CONVERTER
                </a>
              </Link>
              <Link href="/tools/loadout-optimizer">
                <a className="px-6 py-3 rounded-xl bg-neon-blue text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform">
                  LOADOUT OPTIMIZER
                </a>
              </Link>
              <Link href="/tools/stats-dashboard">
                <a className="px-6 py-3 rounded-xl bg-neon-gold text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform">
                  STATS DASHBOARD
                </a>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
