import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import BuildTrainer from '../../components/tools/BuildTrainer';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function BuildTrainerPage() {
  useEffect(() => {
    document.title = 'Build Trainer Pro — Fortnite Building Training im Browser | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Browser-basierter Fortnite Building Trainer. Trainiere 90s, Double-Ramp und Tunneling mit messbarem Performance-Score und Best-Time-Tracking.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Build Trainer Pro"
        description="Browser-basierter Fortnite Building Trainer. Trainiere 90s, Double-Ramp und Tunneling mit messbarem Performance-Score."
        url="https://fortnitenexus.space/tools/build-trainer"
        ratingValue={4.9}
        ratingCount={203}
        featureList={[
          '4 Building-Drills',
          'Keyboard-Input-Tracking',
          'Best-Time Speicherung',
          'Streak-System',
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
          <span className="text-white/60">Build Trainer</span>
        </nav>

        <BuildTrainer />

        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="font-cyber text-2xl text-purple-400 mb-4">
            Muscle-Memory aufbauen — im Browser
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Building ist Muscle-Memory. Je öfter du die gleiche Sequenz unter Zeitdruck
            ausführst, desto schneller wirst du. Unser Browser-Trainer spart dir den
            Creative-Map-Code und die Ladezeit — direkt im Browser, sofort loslegen.
          </p>
          <h3 className="font-cyber text-xl text-white mb-3 mt-6">Die 4 Drills</h3>
          <ul className="space-y-3 text-white/70 font-body">
            <li>
              <strong className="text-white">Basics (Wall → Ramp):</strong> Die Grundlage
              jeder Build-Sequenz. Ziel: unter 1.5s.
            </li>
            <li>
              <strong className="text-white">90s (Wall-Ramp-Floor-Wall):</strong> Der
              klassische High-Ground-Take. Ziel: unter 2.5s.
            </li>
            <li>
              <strong className="text-white">Double-Ramp-Rush:</strong> Aggressive
              Pusher-Technik. Ziel: unter 2.0s.
            </li>
            <li>
              <strong className="text-white">Tunneling:</strong> Für Rotations unter
              Druck. 5 Pieces in unter 3.0s.
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
