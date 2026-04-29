import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import StatsDashboard from '../../components/tools/StatsDashboard';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function StatsDashboardPage() {
  useEffect(() => {
    document.title =
      'Stats Dashboard Pro — Fortnite Performance Analyse mit AI | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Fortnite Stats-Analyse mit AI-Insights. Skill-Score in 4 Dimensionen, personalisierte 3-Wochen-Ziele und Rank-Bewertung. Gib deinen Username ein.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Stats Dashboard Pro"
        description="Fortnite Performance-Analyse mit AI-Insights. Skill-Score in 4 Dimensionen, personalisierte 3-Wochen-Trainingspläne."
        url="https://fortnitenexus.space/tools/stats-dashboard"
        ratingValue={4.7}
        ratingCount={156}
        featureList={[
          '4-Dimensionen Skill-Rating',
          'Automatische Wochen-Ziele',
          'Rank-Bewertung (Bronze-Unreal)',
          'Personal Coaching Insights',
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
          <span className="text-white/60">Stats Dashboard</span>
        </nav>

        <StatsDashboard />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-cyber text-2xl text-neon-gold mb-4">
            Mehr als nur Zahlen — Personal Coaching
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Andere Stats-Sites zeigen dir nur K/D und Win-Rate. Wir analysieren deine
            Performance in <strong>4 Skill-Dimensionen</strong> (Aim, Positioning,
            Building, Decision Making) und geben dir konkrete{' '}
            <strong>3-Wochen-Trainingspläne</strong>.
          </p>
          <h3 className="font-cyber text-xl text-white mb-3 mt-6">
            Wie wird dein Skill-Score berechnet?
          </h3>
          <ul className="space-y-2 text-white/70 font-body">
            <li>
              <strong className="text-white">Aim (30%):</strong> K/D + Kills/Match
            </li>
            <li>
              <strong className="text-white">Positioning (25%):</strong> Top-10-Rate +
              Win-Rate
            </li>
            <li>
              <strong className="text-white">Building (20%):</strong> Materialien +
              Placement-Average
            </li>
            <li>
              <strong className="text-white">Decision Making (25%):</strong>{' '}
              Consistency-Score + Win-Rate
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
