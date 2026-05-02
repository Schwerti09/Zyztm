/**
 * News Page - Overview of all news articles
 * ENHANCED: Multi-language support
 */
import { lazy, Suspense } from 'react';
import NewsList from '../components/NewsList';
import { getLanguageFromPath, type Language } from '../lib/i18n';

const Footer = lazy(() => import('../components/Footer'));

export default function NewsPage() {
  const lang: Language = 'de';

  const description = 'Alle Fortnite News auf einen Blick: Patch Notes, Item Shop Rotation, Events, Wettbewerbe und Tipps. Täglich aktualisiert für die deutsche Community.';

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-darker">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="font-cyber text-4xl sm:text-5xl font-bold text-white mb-4">
            Fortnite News
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl">
            {description}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Featured News */}
        <section className="mb-12">
          <h2 className="font-cyber text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-neon-pink">★</span>
            Featured News
          </h2>
          <NewsList featured={true} limit={3} />
        </section>

        {/* All News */}
        <section>
          <h2 className="font-cyber text-2xl font-bold text-white mb-6">
            All Articles
          </h2>
          <NewsList limit={12} />
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
