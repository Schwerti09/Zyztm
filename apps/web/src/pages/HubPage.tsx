import { Link, useParams } from 'wouter';
import { lazy, Suspense } from 'react';
import { getGuidesByCategory } from '../data/guides';
import { HUB_CATEGORIES } from '../lib/pseo';
import type { GuideCategory } from '../lib/pseo';
import MultiRegionalHub from '../components/MultiRegionalHub';

const Footer = lazy(() => import('../components/Footer'));

/**
 * Hub page for a guide category.
 * Routes: /de/guides/:category  (e.g. /de/guides/fortnite, /de/guides/hardware)
 *
 * Acts as a strong topical authority hub with all guides in the category.
 */
export default function HubPage() {
  const params = useParams<{ category: string }>();
  const category = params.category as GuideCategory;

  const hub = HUB_CATEGORIES.find((h) => h.slug === category);
  const guides = getGuidesByCategory(category);

  if (!hub) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center px-6">
        <p className="font-cyber text-5xl text-neon-pink mb-4">404</p>
        <p className="font-body text-white/60 mb-8">Diese Kategorie existiert nicht.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {HUB_CATEGORIES.map((h) => (
            <Link key={h.slug} href={`/de/guides/${h.slug}`}>
              <a className="font-cyber text-sm text-neon-blue border border-neon-blue/30 px-4 py-2 rounded-xl hover:bg-neon-blue/10 transition-colors">
                {h.emoji} {h.label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* ── Hub Header ── */}
      <header className="border-b border-white/10 bg-bg-darker">
        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs font-body text-white/40 flex gap-2 mb-6 flex-wrap">
            <Link href="/"><a className="hover:text-neon-blue transition-colors">Home</a></Link>
            <span>/</span>
            <span className="text-white/60">Guides</span>
            <span>/</span>
            <span className="text-white/80">{hub.label}</span>
          </nav>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{hub.emoji}</span>
            <h1 className="font-cyber text-4xl font-bold text-white">{hub.label}</h1>
          </div>
          <p className="font-body text-white/60 text-lg max-w-2xl">{hub.description}</p>
          <p className="font-body text-white/30 text-sm mt-2">{guides.length} Guides verfügbar</p>
        </div>
      </header>

      {/* ── All Guides in this category ── */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* ── Multi-Regional Hub ── */}
        <MultiRegionalHub showAllRegions={true} />

        {guides.length === 0 ? (
          <p className="font-body text-white/40 text-center py-16">
            Noch keine Guides in dieser Kategorie. Bald verfügbar!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guides.map((guide) => (
              <Link key={guide.slug} href={`/de/guide/${guide.slug}`}>
                <a className="group flex flex-col p-6 rounded-2xl border border-white/10 bg-bg-card/60 hover:border-neon-blue/50 hover:bg-bg-card transition-all duration-200 h-full">
                  <h2 className="font-cyber text-base text-white group-hover:text-neon-blue transition-colors leading-snug mb-2">
                    {guide.title}
                  </h2>
                  <p className="font-body text-white/50 text-sm leading-relaxed flex-1 mb-4">
                    {guide.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="text-xs font-body text-white/30">
                      ⏱ {guide.readingTimeMin} Min.
                    </span>
                    <span className="text-xs font-body text-white/30">
                      📅 {new Date(guide.lastUpdated).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        )}

        {/* ── Hub Cross-links ── */}
        <section className="mt-14">
          <h2 className="font-cyber text-lg font-bold text-white/50 mb-5 tracking-widest">
            WEITERE KATEGORIEN
          </h2>
          <div className="flex flex-wrap gap-3">
            {HUB_CATEGORIES.filter((h) => h.slug !== category).map((h) => (
              <Link key={h.slug} href={`/de/guides/${h.slug}`}>
                <a className="flex items-center gap-2 font-body text-sm text-white/60 border border-white/10 px-4 py-2 rounded-xl hover:border-neon-blue/40 hover:text-white transition-all">
                  <span>{h.emoji}</span>
                  <span>{h.label}</span>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
