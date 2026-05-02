import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'wouter';
import VisualEffectsLayer, { SectionEntrance } from '../components/visuals/VisualEffectsLayer';

const Footer = lazy(() => import('../components/Footer'));

const TRENDING_GUIDES = [
  {
    slug: 'fortnite-aim-verbessern-2026',
    title: 'Fortnite Aim Guide 2026',
    description: 'Sensitivity-Optimierung, Crosshair-Placement und Aim-Training für alle Skill-Levels.',
    category: 'fortnite',
    views: 12500,
    rating: 4.9,
  },
  {
    slug: 'fortnite-building-guide',
    title: 'Fortnite Building Guide 2026',
    description: '90°-Edits, Speed-Builds und Height-Management – alles was du wissen musst.',
    category: 'fortnite',
    views: 9800,
    rating: 4.8,
  },
  {
    slug: 'fortnite-best-settings-2026',
    title: 'Fortnite Best Settings 2026',
    description: 'PC, Controller, Mobile und Konsolen – alle optimalen Konfigurationen im Vergleich.',
    category: 'fortnite',
    views: 8500,
    rating: 4.7,
  },
  {
    slug: 'fortnite-weapon-tier-list',
    title: 'Weapon Tier List Chapter 6 Season 2',
    description: 'Alle Waffen im Meta-Ranking mit DPS-Stats und Pro-Recommendations.',
    category: 'fortnite',
    views: 15200,
    rating: 4.7,
  },
  {
    slug: 'fortnite-ranked-tipps',
    title: 'Ranked Tips für Bronze bis Champion',
    description: 'Strategien für jede Ranked-Division mit Zone-Wars und Placement-Fokus.',
    category: 'fortnite',
    views: 7600,
    rating: 4.8,
  },
  {
    slug: 'fortnite-meta-strategie',
    title: 'Meta-Strategie: Wie du den Meta dominierst',
    description: 'Rotation-Pfade, Loadout-Switching und Late-Game Tactics für Competitive-Spieler.',
    category: 'Meta',
    views: 11200,
    rating: 4.9,
  },
];

const STATS = [
  { label: 'Spieler', value: '12.500+', sublabel: 'nutzen unsere Guides wöchentlich' },
  { label: 'Guides', value: '27', sublabel: 'umfassende Guides online' },
  { label: 'News-Artikel', value: '8/Woche', sublabel: 'Patch Notes & Updates' },
  { label: 'Tools', value: '10+', sublabel: 'interaktive Tools' },
  { label: 'Bewertung', value: '4.9/5', sublabel: 'Community-Rating' },
];

export default function NexusUltimatePage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.title = 'Fortnite Nexus – Die ultimative deutsche Fortnite Community 2026';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Fortnite Nexus – Die ultimative deutsche Fortnite Community 2026. Guides, Meta, Tools und News – Alles für Fortnite Spieler auf Deutsch. Von Anfänger bis Pro.',
    );
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Hier würde die Newsletter-Signup-Logik implementiert werden
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white relative overflow-hidden">
      {/* Visual Effects Layer */}
      <VisualEffectsLayer enabled effects={{
        chaosBus: true,
        floatingSkins: true,
        thumbnailSnake: true,
        midScrollStorm: true,
        neonCursorTrail: true,
      }} />

      <main className="relative">
        {/* HERO SECTION */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 text-center">
          <SectionEntrance>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="font-cyber text-[10px] tracking-widest text-neon-cyan">
                FORTNITE NEXUS · DEUTSCHE COMMUNITY 2026
              </span>
            </div>

            <h1 className="font-cyber text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-6 leading-none">
              FORTNITE NEXUS
            </h1>

            <p className="text-white/70 font-body text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              Die ultimative deutsche Fortnite Community 2026. Guides, Meta, Tools und News – 
              Alles für Fortnite Spieler auf Deutsch. Von Anfänger bis Pro.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link href="/de/guides">
                <a className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform">
                  GUIDES LESEN
                </a>
              </Link>
              <Link href="/tools">
                <a className="inline-block px-8 py-4 rounded-xl border border-white/20 bg-white/5 font-cyber text-sm tracking-widest text-white hover:bg-white/10 transition-colors">
                  TOOLS TESTEN
                </a>
              </Link>
              <Link href="/de/news">
                <a className="inline-block px-8 py-4 rounded-xl border border-white/20 bg-white/5 font-cyber text-sm tracking-widest text-white hover:bg-white/10 transition-colors">
                  NEWS LESEN
                </a>
              </Link>
            </div>

            {/* SAC Code Overlay */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neon-orange/30 bg-neon-orange/5">
              <span className="font-cyber text-xs tracking-widest text-neon-orange">
                Creator Code: <span className="font-black">nexus</span> 💜
              </span>
            </div>
          </SectionEntrance>
        </section>

        {/* FRISCH GEPATCH WIDGET */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <SectionEntrance delay={0.1}>
            <div className="p-6 rounded-2xl border border-neon-pink/30 bg-gradient-to-r from-neon-pink/10 to-neon-blue/10">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-neon-pink animate-pulse" />
                <span className="font-cyber text-sm tracking-widest text-neon-pink font-black">
                  🚨 PATCH ALERT
                </span>
              </div>
              <p className="text-white/80 font-body text-sm leading-relaxed mb-3">
                Chapter 6 Season 2 Patch Notes sind da! Waffen-Buffs, Meta-Verschiebungen und neue Events.
              </p>
              <Link href="/de/news/patch-notes/chapter-6-season-2">
                <a className="font-cyber text-xs tracking-widest text-neon-pink hover:text-white transition-colors">
                  PATCH NOTES LESEN →
                </a>
              </Link>
            </div>
          </SectionEntrance>
        </section>

        {/* TRENDING GUIDES */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <SectionEntrance delay={0.2}>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white mb-2">
                  TRENDING GUIDES
                </h2>
                <p className="text-sm font-body text-white/60">
                  Die beliebtesten Guides der letzten 7 Tage
                </p>
              </div>
              <Link href="/de/guides">
                <a className="font-cyber text-xs tracking-widest text-neon-cyan hover:text-white transition-colors">
                  ALLE GUIDES →
                </a>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRENDING_GUIDES.map((guide) => (
                <Link key={guide.slug} href={`/de/guide/${guide.slug}`}>
                  <a className="block group">
                    <article className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-neon-cyan/30 hover:bg-neon-cyan/5 transition-all h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 rounded text-[10px] font-cyber tracking-widest text-neon-cyan bg-neon-cyan/10">
                          {guide.category}
                        </span>
                        <span className="text-[10px] font-body text-white/40">
                          {guide.views.toLocaleString()} Views
                        </span>
                      </div>
                      <h3 className="font-cyber text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm font-body text-white/60 leading-relaxed mb-4">
                        {guide.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-neon-gold">⭐</span>
                        <span className="text-xs font-body text-white/60">
                          {guide.rating}/5
                        </span>
                      </div>
                    </article>
                  </a>
                </Link>
              ))}
            </div>
          </SectionEntrance>
        </section>

        {/* STATS TEASER */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <SectionEntrance delay={0.3}>
            <div className="text-center mb-10">
              <h2 className="font-cyber text-3xl sm:text-4xl font-black text-white mb-3">
                12.500+ FORNITE SPIELER
              </h2>
              <p className="text-white/60 font-body">
                nutzen unsere Guides wöchentlich
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center"
                >
                  <div className="font-cyber text-2xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-cyber tracking-widest text-white/40 uppercase">
                    {stat.label}
                  </div>
                  <div className="text-[10px] font-body text-white/30 mt-1">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/de/guides">
                <a className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform">
                  COMMUNITY BEITRETEN
                </a>
              </Link>
            </div>
          </SectionEntrance>
        </section>

        {/* NEWSLETTER BLOCK */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 mb-16">
          <SectionEntrance delay={0.4}>
            <div className="p-10 rounded-3xl border border-neon-gold/40 bg-gradient-to-br from-neon-gold/10 via-transparent to-neon-cyan/10">
              <div className="text-center mb-6">
                <h2 className="font-cyber text-3xl sm:text-4xl font-black text-white mb-3">
                  WÖCHENTLICHE META-UPDATES
                </h2>
                <p className="text-white/70 font-body max-w-xl mx-auto leading-relaxed">
                  Patch-Alerts, Meta-Verschiebungen und exklusive Tipps direkt in dein Email-Postfach.
                  Kostenlos. Kein Spam. Nur wertvolle Inhalte.
                </p>
              </div>

              {subscribed ? (
                <div className="text-center p-6 rounded-2xl border border-neon-green/30 bg-neon-green/10">
                  <span className="font-cyber text-lg text-neon-green">✓ Erfolgreich angemeldet!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3 mb-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.com"
                      className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-white/5 font-body text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-neon-gold text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform"
                    >
                      ABONNIEREN
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <input type="checkbox" id="sac-reminder" className="accent-neon-orange" />
                    <label htmlFor="sac-reminder" className="text-xs font-body text-white/60">
                      Erinnere mich an Creator Code <span className="text-neon-orange font-bold">nexus</span> 💜
                    </label>
                  </div>
                </form>
              )}

              <div className="text-center mt-6">
                <p className="text-xs font-body text-white/40">
                  Exklusive Tipps nur für Newsletter-Abonnenten
                </p>
              </div>
            </div>
          </SectionEntrance>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
