import { lazy, Suspense } from 'react';
import { Link } from 'wouter';
import ToolCard, { ToolCardProps } from '../components/tools/ToolCard';
import VisualEffectsLayer from '../components/visuals/VisualEffectsLayer';

const Footer = lazy(() => import('../components/Footer'));

const ALL_TOOLS: ToolCardProps[] = [
  {
    slug: 'loadout-god',
    name: 'Loadout God',
    tagline: 'Ultimative Loadout-Optimierung',
    description: '5-Slot-Loadout Engine. 25+ Waffen. Situational Scoring. Meta-aware.',
    icon: '�',
    color: '#ff6b00',
    status: 'live',
    tier: 'elite',
    badge: 'featured',
  },
  {
    slug: 'stats-dashboard',
    name: 'Stats Dashboard Pro',
    tagline: 'AI-Performance-Analyse',
    description: '4-Dimensionen Skill-Score. Personalisierte Trainingspläne. KPI-Tracking.',
    icon: '📊',
    color: '#8b5cf6',
    status: 'live',
    tier: 'pro',
    badge: 'popular',
  },
  {
    slug: 'sensitivity-converter',
    name: 'Sensitivity Converter Pro',
    tagline: 'Cross-Game Sens-Berechnung',
    description: '8 Spiele. cm/360°-Methode. FOV-Scaling. DPI-Kompensation.',
    icon: '🎯',
    color: '#10b981',
    status: 'live',
    tier: 'pro',
  },
  {
    slug: 'drop-location-analyzer',
    name: 'Drop Location Analyzer',
    tagline: 'Strategische Drop-Zonen',
    description: 'Heatmap-Analyse. Loot-Dichte. Rotation-Pfade. POI-Ranking.',
    icon: '📍',
    color: '#ff6b00',
    status: 'live',
    tier: 'pro',
  },
  {
    slug: 'meta-predictor',
    name: 'Meta Predictor',
    tagline: 'Meta-Vorhersage Engine',
    description: 'AI-basierte Meta-Analyse. Trend-Vorhersage. Nerf/Buff-Tracking.',
    icon: '🔮',
    color: '#8b5cf6',
    status: 'live',
    tier: 'elite',
    badge: 'new',
  },
  {
    slug: 'rotation-planner',
    name: 'Rotation Planner',
    tagline: 'Intelligente Routenplanung',
    description: 'Optimale Rotation-Pfade. Storm-Tracking. Zone-Management.',
    icon: '�️',
    color: '#10b981',
    status: 'live',
    tier: 'pro',
  },
  {
    slug: 'build-trainer',
    name: 'Build Trainer',
    tagline: 'Build-Training System',
    description: '90°-Training. Speed-Drills. Height-Management. Edit-Timing.',
    icon: '🏗️',
    color: '#ff6b00',
    status: 'live',
    tier: 'pro',
  },
  {
    slug: 'keybind-optimizer',
    name: 'Keybind Optimizer',
    tagline: 'Optimale Keybind-Konfiguration',
    description: 'Ergonomie-Analyse. Reach-Optimierung. Conflict-Detection.',
    icon: '⌨️',
    color: '#8b5cf6',
    status: 'live',
    tier: 'pro',
  },
];

export default function ToolsPage() {
  const liveCount = ALL_TOOLS.filter((t) => t.status === 'live').length;

  return (
    <div className="min-h-screen bg-bg-dark text-white relative overflow-hidden">
      {/* Visual Effects Layer */}
      <VisualEffectsLayer enabled effects={{
        chaosBus: true,
        floatingSkins: true,
        thumbnailSnake: false,
        midScrollStorm: true,
        neonCursorTrail: true,
      }} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* HERO */}
        <header className="mb-12 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-nexus-orange/30 bg-nexus-orange/5">
            <span className="font-cyber text-[10px] tracking-widest text-nexus-orange">
              FORTNITE NEXUS · PRO ARSENAL
            </span>
          </div>
          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-4 leading-none">
            DIE TOOLS{' '}
            <span className="bg-gradient-to-r from-nexus-orange via-nexus-purple to-nexus-green bg-clip-text text-transparent">
              DER PROS
            </span>
          </h1>
          <p className="text-white/60 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            8 High-Tech-Tools für kompetitive Fortnite-Spieler. Wissenschaftlich, präzise,
            sofort einsetzbar. <span className="text-nexus-orange">{liveCount} / {ALL_TOOLS.length} live</span>.
          </p>
        </header>

        {/* GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ALL_TOOLS.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </section>

        {/* PREMIUM-CTA */}
        <section className="mt-16 p-8 rounded-3xl border border-nexus-orange/30 bg-gradient-to-br from-nexus-orange/10 via-transparent to-nexus-purple/10 text-center glass">
          <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white mb-3">
            ALLE TOOLS UNLIMITED — NEXUS PRO
          </h2>
          <p className="text-white/70 font-body max-w-xl mx-auto mb-6 leading-relaxed">
            Free-Tier hat tägliche Limits. Mit Nexus Pro nutzt du alle 8 Tools unlimited,
            erhältst Wochen-Reports und 10% Rabatt auf alle digitalen Produkte.
          </p>
          <Link href="/subscription">
            <a className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-nexus-orange to-nexus-purple font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform">
              JETZT UPGRADEN — €14,99/MONAT
            </a>
          </Link>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
