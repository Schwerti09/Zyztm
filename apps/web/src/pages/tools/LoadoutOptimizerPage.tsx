import { lazy, Suspense, useCallback } from 'react';
import { Link } from 'wouter';
import LoadoutOptimizer from '../../components/tools/LoadoutOptimizer';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';
import MetaTags from '../../components/seo/MetaTags';
import ShareButton from '../../components/share/ShareButton';
import { generateLoadoutImage, type ShareFormat } from '../../lib/share-image';
import { optimizeLoadout } from '../../lib/loadout-optimizer';

const Footer = lazy(() => import('../../components/Footer'));

export default function LoadoutOptimizerPage() {
  const generateImage = useCallback(async (format: ShareFormat) => {
    const result = optimizeLoadout({
      playStyle: 'balanced',
      zonePhase: 'mid',
      mapArea: 'urban',
      skillLevel: 'ranked',
    });
    const weapons = result.recommendations.map((r) => ({
      name: r.weapon.name,
      tier: r.weapon.tier,
      slot: r.slot,
    }));
    return generateLoadoutImage(
      { weapons, style: 'Balanced', phase: 'Mid-Game', score: result.totalScore },
      { format },
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <MetaTags
        title="Loadout Optimizer AI — Optimale Fortnite Waffen-Kombi | Fortnite Nexus"
        description="AI-gestützter Loadout-Optimizer für Fortnite. Wähle Spielstil, Zone-Phase und Karten-Bereich — erhalte das optimale 5-Slot-Loadout mit Score-System."
        path="/tools/loadout-optimizer"
        image="https://fortnitenexus.space/og/og-tools.png"
        keywords={['Fortnite Loadout', 'Loadout Optimizer', 'Beste Waffen Fortnite', 'Fortnite Meta', 'Loadout Tipps']}
      />
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

        {/* Share CTA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-2">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-neon-blue/20 bg-neon-blue/5">
            <div className="flex-1">
              <p className="text-sm font-cyber tracking-wide text-white">
                📤 LOADOUT TEILEN
              </p>
              <p className="text-xs font-body text-white/50 mt-0.5">
                Teile dein optimales Loadout auf Twitter oder Discord
              </p>
            </div>
            <ShareButton
              generateImage={generateImage}
              filename="fortnite-loadout-optimiert"
              tweetText="Mein optimiertes Fortnite Loadout — berechnet mit dem Fortnite Nexus Loadout Optimizer!"
              shareUrl="https://fortnitenexus.space/tools/loadout-optimizer"
              hashtags={['Fortnite', 'FortniteLoadout', 'FortniteNexus']}
              variant="primary"
            />
          </div>
        </div>

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
