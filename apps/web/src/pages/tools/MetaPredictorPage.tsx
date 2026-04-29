import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import MetaPredictor from '../../components/tools/MetaPredictor';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function MetaPredictorPage() {
  useEffect(() => {
    document.title =
      'Meta Predictor — Fortnite Patch-Analyse & Meta-Shifts | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Vorhersage-Engine für Fortnite Meta-Shifts. Simuliere Patch-Szenarien und sieh welche Waffen steigen oder fallen — mit Konfidenz-Score.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Meta Predictor"
        description="Patch-Vorhersage-Engine für Fortnite. Simuliere Balance-Szenarien und sieh welche Waffen steigen oder fallen."
        url="https://fortnitenexus.space/tools/meta-predictor"
        ratingValue={4.6}
        ratingCount={74}
        featureList={[
          '4 Patch-Szenarien',
          'Top-10 Meta-Movers',
          'Konfidenz-Score',
          'Waffen-Impact-Analyse',
        ]}
      />
      <main>
        <nav
          aria-label="Breadcrumb"
          className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-blue transition-colors">Home</a>
          </Link>
          <span>/</span>
          <Link href="/tools">
            <a className="hover:text-neon-blue transition-colors">Tools</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">Meta Predictor</span>
        </nav>

        <MetaPredictor />
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
