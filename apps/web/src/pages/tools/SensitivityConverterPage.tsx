import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';
import SensitivityConverter from '../../components/tools/SensitivityConverter';
import SoftwareAppSchema from '../../components/SoftwareAppSchema';

const Footer = lazy(() => import('../../components/Footer'));

export default function SensitivityConverterPage() {
  useEffect(() => {
    document.title =
      'Sensitivity Converter Pro — Fortnite zu Valorant, CS2, Apex | Fortnite Nexus';

    // Meta-Description setzen
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Konvertiere Fortnite-Sensitivity zu Valorant, CS2, Apex Legends, CoD und mehr. Mit FOV-Scaling, cm/360°-Methode und DPI-Kompensation. Wissenschaftlich exakt.',
    );
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SoftwareAppSchema
        name="Sensitivity Converter Pro"
        description="Cross-Game Sensitivity Konverter für 8 Shooter. Mit cm/360°-Methode, FOV-Scaling und DPI-Kompensation."
        url="https://fortnitenexus.space/tools/sensitivity-converter"
        applicationCategory="GameApplication"
        ratingValue={4.9}
        ratingCount={142}
        featureList={[
          '8 unterstützte Spiele (Fortnite, Valorant, CS2, Apex, CoD, Overwatch, R6, PUBG)',
          'cm/360° Berechnung',
          'FOV-Scaling Korrektur',
          'DPI-Neutrale Konvertierung',
          'Automatische Speicherung im Browser',
        ]}
      />
      <main>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-blue transition-colors">Home</a>
          </Link>
          <span>/</span>
          <Link href="/tools">
            <a className="hover:text-neon-blue transition-colors">Tools</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">Sensitivity Converter</span>
        </nav>

        <SensitivityConverter />

        {/* SEO-Content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 prose prose-invert">
          <h2 className="font-cyber text-2xl text-neon-blue mb-4">
            Wie konvertiere ich meine Fortnite-Sensitivity?
          </h2>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Wenn du von Fortnite zu Valorant, CS2 oder Apex wechselst, willst du das
            gleiche Maus-Gefühl. Der Schlüssel ist <strong>cm/360°</strong> — wieviele
            Zentimeter du deine Maus bewegen musst, um eine 360°-Drehung zu machen.
          </p>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Unser Converter berechnet diesen Wert aus deiner aktuellen Sens und DPI, und
            gibt dir die exakte Sens für das Zielspiel — unter Berücksichtigung von
            FOV-Scaling (das nutzen Apex und CoD).
          </p>
          <h3 className="font-cyber text-xl text-white mb-3 mt-6">FAQ</h3>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-blue cursor-pointer">
              Welche cm/360° nutzen Pros?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              Pros liegen meist zwischen 25–45 cm/360° (medium-low). FaZe Bugha: 32 cm.
              Tfue: 28 cm. Clix: 30 cm. Niedriger ist präziser, aber langsamer.
            </p>
          </details>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-blue cursor-pointer">
              Was ist FOV-Scaling?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              In Apex und CoD ändert sich das Aim-Gefühl, wenn du dein FOV änderst. Unser
              Converter korrigiert das automatisch — bei anderen Tools musst du selbst
              rechnen.
            </p>
          </details>
          <details className="mb-3 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-blue cursor-pointer">
              Sollte ich meine DPI ändern?
            </summary>
            <p className="text-sm text-white/70 mt-2">
              Industry-Standard ist 800 DPI. Höhere DPI = mehr Mikro-Bewegung,
              empfindlicher für Schreibtisch-Vibration. 400-1600 DPI ist der Sweet-Spot.
            </p>
          </details>
        </article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
