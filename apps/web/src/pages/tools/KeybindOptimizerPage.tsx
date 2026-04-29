import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import KeybindOptimizer from '../../components/tools/KeybindOptimizer';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function KeybindOptimizerPage() {
  useEffect(() => {
    document.title = 'Keybind Optimizer — Fortnite Ergonomic Keybinds | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Wissenschaftlich optimierte Fortnite Keybinds basierend auf Hand-Größe, Finger-Travel-Distance und Action-Priorität. Für jede Hand individualisiert.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Keybind Optimizer"
        description="Wissenschaftlich optimierte Fortnite Keybinds basierend auf Hand-Größe, Finger-Travel-Distance und Action-Priorität."
        url="https://fortnitenexus.space/tools/keybind-optimizer"
        ratingValue={4.7}
        ratingCount={112}
        featureList={[
          'Hand-Größen Anpassung',
          'Ergonomie-Algorithmus',
          '12 Action-Bindings',
          'Finger-Travel-Distance Optimierung',
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
          <span className="text-white/60">Keybind Optimizer</span>
        </nav>

        <KeybindOptimizer />
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
