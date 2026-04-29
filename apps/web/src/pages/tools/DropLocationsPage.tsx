import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import DropLocationAnalyzer from '../../components/tools/DropLocationAnalyzer';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function DropLocationsPage() {
  useEffect(() => {
    document.title =
      'Drop Location Analyzer — Beste Fortnite Landezonen mit Win-Rate | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Interaktive Heatmap der besten Fortnite-Landezonen. Win-Rate, Contest-Level, Loot-Score & Rotation. Personalisierte Empfehlungen für deinen Spielstil.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Drop Location Analyzer"
        description="Interaktive Heatmap der besten Fortnite-Landezonen mit Win-Rate-Daten, Contest-Level und Rotations-Score."
        url="https://fortnitenexus.space/tools/drop-locations"
        ratingValue={4.8}
        ratingCount={89}
        featureList={[
          '12 POI-Datenbank',
          'Win-Rate pro Location',
          'Personalisierte Empfehlungen',
          'Match-Score Berechnung',
        ]}
      />
      <main>
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-blue transition-colors">Home</a>
          </Link>
          <span>/</span>
          <Link href="/tools">
            <a className="hover:text-neon-blue transition-colors">Tools</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">Drop Locations</span>
        </nav>

        <DropLocationAnalyzer />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-cyber text-2xl text-green-400 mb-4">
            Wie wir die besten Landezonen finden
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Für jede der 12 wichtigsten Drop-Locations berechnen wir{' '}
            <strong>4 Schlüssel-Metriken</strong>: Loot-Score, Win-Rate, Contest-Level
            und Rotation-Score. Basierend auf deinem Spielstil und Skill-Level
            empfehlen wir dir die Top-5 Spots mit Match-Score.
          </p>
          <h3 className="font-cyber text-xl text-white mb-3 mt-6">Die Kategorien</h3>
          <ul className="space-y-2 text-white/70 font-body">
            <li>
              <strong className="text-red-400">HOT:</strong> 8-15 Spieler landen hier.
              Top-Loot, brutaler Contest.
            </li>
            <li>
              <strong className="text-amber-400">MID:</strong> 4-7 Spieler. Balance aus
              Loot und Survival.
            </li>
            <li>
              <strong className="text-green-400">SAFE:</strong> 1-3 Spieler. Sicherer
              Start, weniger Loot.
            </li>
          </ul>
        </article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
