import { lazy, Suspense, useEffect } from 'react';
import LoadoutGod from '../components/tools/LoadoutGod';
import SoftwareAppSchema from '../components/SoftwareAppSchema';

const Footer = lazy(() => import('../components/Footer'));

export default function LoadoutGodPage() {
  useEffect(() => {
    document.title = 'Loadout God — Fortnite Loadout Generator | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'AI-generierte Fortnite Loadouts basierend auf Meta, Playstyle und Skill Level. Winrate-Projektion, Flex-Card Export und TikTok-Share.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Loadout God"
        description="AI-generierte Fortnite Loadouts basierend auf Meta, Playstyle und Skill Level"
        url="https://fortnitenexus.space/tools/loadout-god"
        ratingValue={4.9}
        ratingCount={1542}
        featureList={[
          '5 Game Modes',
          '6 Playstyles',
          'Skill-Level Slider',
          'Winrate Projection',
          'Flex-Card Export',
        ]}
      />
      <LoadoutGod />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
