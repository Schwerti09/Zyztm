import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import LoadoutOptimizer from '../../components/tools/LoadoutOptimizer';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function LoadoutOptimizerPage() {
  useEffect(() => {
    document.title =
      'Loadout Optimizer AI — Optimale Fortnite Waffen-Kombi | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'AI-gestützter Loadout-Optimizer für Fortnite. Wähle Spielstil, Zone-Phase und Karten-Bereich — erhalte das optimale 5-Slot-Loadout mit Score-System.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Loadout Optimizer AI"
        description="AI-gestützter Fortnite Loadout-Optimizer. Berechnet das optimale 5-Slot-Loadout basierend auf Spielstil, Zonen-Phase, Karten-Bereich und Skill-Level."
        url="https://fortnitenexus.space/tools/loadout-optimizer"
        ratingValue={4.8}
        ratingCount={98}
        featureList={[
          'Multi-Criteria Decision Engine',
          '25+ Waffen-Datenbank',
          '4-Dimensionen Scoring',
          'Strategie-Tipps pro Setup',
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
          <span className="text-white/60">Loadout Optimizer</span>
        </nav>

        <LoadoutOptimizer />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-cyber text-2xl text-neon-blue mb-4">
            Wie funktioniert der Loadout Optimizer?
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Unsere Decision-Engine bewertet jede der 25+ Waffen mit einem{' '}
            <strong>Situational Score</strong> basierend auf vier Dimensionen: Spielstil,
            Zone-Phase, Karten-Bereich und Skill-Level. Die Top-5 Waffen — eine pro
            taktischer Rolle — bilden dein optimales Loadout.
          </p>
          <h3 className="font-cyber text-xl text-white mb-3 mt-6">
            Warum diese 4 Dimensionen?
          </h3>
          <ul className="space-y-3 text-white/70 font-body">
            <li>
              <strong className="text-white">Spielstil:</strong> Aggressive Spieler
              brauchen Shotguns + SMGs für Pushes. Passive Spieler profitieren von
              Snipern + Long-Range AR.
            </li>
            <li>
              <strong className="text-white">Zone-Phase:</strong> Im Endgame dominieren
              Box-Fights (Shotguns + Explosive). Im Mid-Game zählen Mid-Range Duelle.
            </li>
            <li>
              <strong className="text-white">Karten-Bereich:</strong> Offenes Gelände
              bestraft Shotguns. Urbane POIs bestrafen Sniper.
            </li>
            <li>
              <strong className="text-white">Skill-Level:</strong> Competitive-Spieler
              priorisieren Tier-S-Waffen. Casual-Spieler brauchen forgiving Auto-Weapons.
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
