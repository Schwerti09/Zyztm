import { lazy, Suspense } from 'react';
import { Link } from 'wouter';

const Footer = lazy(() => import('../components/Footer'));

interface ToolCard {
  slug: string;
  name: string;
  description: string;
  icon: string;
  status: 'live' | 'beta' | 'coming-soon';
  category: 'aim' | 'strategy' | 'analysis';
  color: string;
  uniqueAngle: string;
}

const TOOLS: ToolCard[] = [
  {
    slug: 'sensitivity-converter',
    name: 'Sensitivity Converter Pro',
    description:
      'Konvertiere Sens zwischen 8 Shootern. Mit FOV-Scaling, cm/360°-Methode & DPI-Kompensation.',
    icon: '🎯',
    status: 'live',
    category: 'aim',
    color: '#ff0055',
    uniqueAngle: 'Berücksichtigt FOV-Scaling — andere Tools nicht.',
  },
  {
    slug: 'loadout-optimizer',
    name: 'Loadout Optimizer AI',
    description:
      'Optimales 5-Slot-Loadout basierend auf Spielstil, Zone-Phase, Kartenbereich & Skill.',
    icon: '🎒',
    status: 'live',
    category: 'strategy',
    color: '#00f2ff',
    uniqueAngle: 'Multi-Criteria Decision Engine mit 25+ Waffen-Datensätzen.',
  },
  {
    slug: 'stats-dashboard',
    name: 'Stats Dashboard Pro',
    description:
      'Live-Performance-Analyse mit AI-Insights. Skill-Score in 4 Dimensionen + Wochen-Ziele.',
    icon: '📊',
    status: 'live',
    category: 'analysis',
    color: '#f5c518',
    uniqueAngle: 'Generiert automatisch personalisierte 3-Wochen-Trainingspläne.',
  },
  {
    slug: 'drop-locations',
    name: 'Drop Location Analyzer',
    description:
      'Heatmap aller Drop-Spots mit Win-Rate-Daten und AI-Empfehlung für deinen Spielstil.',
    icon: '🗺️',
    status: 'live',
    category: 'strategy',
    color: '#22C55E',
    uniqueAngle: 'Echte Win-Rate-Daten pro POI — kein Bauchgefühl.',
  },
  {
    slug: 'build-trainer',
    name: 'Build Trainer Pro',
    description:
      'Browser-Building-Trainer für 90s, Double-Ramp & Tunneling. Performance-Score + Progression.',
    icon: '🏗️',
    status: 'live',
    category: 'aim',
    color: '#A855F7',
    uniqueAngle: 'Läuft im Browser — kein Creative-Code, keine Wartezeit.',
  },
  {
    slug: 'meta-predictor',
    name: 'Meta Predictor',
    description:
      'AI-Prognose für nächsten Patch. Welche Waffen steigen, welche fallen — mit Konfidenz-Score.',
    icon: '🔮',
    status: 'live',
    category: 'analysis',
    color: '#EF4444',
    uniqueAngle: 'Patch-Trend-Analyse statt nur Tier-Listen.',
  },
  {
    slug: 'rotation-planner',
    name: 'Rotation Planner',
    description:
      'Optimale Rotations-Route von Drop zu Endzone basierend auf Zone-Pull-Statistik.',
    icon: '🧭',
    status: 'live',
    category: 'strategy',
    color: '#3B82F6',
    uniqueAngle: 'Mathematische Zone-Pull-Vorhersage mit Pathfinding.',
  },
  {
    slug: 'keybind-optimizer',
    name: 'Keybind Optimizer',
    description:
      'Wissenschaftlich optimierte Keybinds basierend auf Hand-Größe & Finger-Travel-Distance.',
    icon: '⌨️',
    status: 'live',
    category: 'aim',
    color: '#F59E0B',
    uniqueAngle: 'Ergonomie-Algorithmus — nicht "Pro XY nutzt das".',
  },
];

function StatusBadge({ status }: { status: ToolCard['status'] }) {
  const config = {
    live: { label: 'LIVE', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
    beta: { label: 'BETA', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
    'coming-soon': {
      label: 'BALD',
      color: '#9CA3AF',
      bg: 'rgba(156,163,175,0.15)',
    },
  };
  const c = config[status];
  return (
    <span
      className="text-[10px] font-cyber tracking-widest px-2 py-0.5 rounded"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.color}40` }}
    >
      {c.label}
    </span>
  );
}

function ToolCardLink({ tool }: { tool: ToolCard }) {
  const isLive = tool.status === 'live';
  const content = (
    <article
      className="group p-6 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.05] transition-all h-full flex flex-col"
      style={{
        borderColor: `${tool.color}30`,
        boxShadow: isLive ? `0 0 20px ${tool.color}10` : 'none',
        opacity: isLive ? 1 : 0.55,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{
            background: `${tool.color}15`,
            border: `1px solid ${tool.color}40`,
          }}
        >
          {tool.icon}
        </div>
        <StatusBadge status={tool.status} />
      </div>

      <h3
        className="font-cyber text-lg font-bold mb-2 leading-tight transition-colors"
        style={{ color: isLive ? '#fff' : 'rgba(255,255,255,0.7)' }}
      >
        {tool.name}
      </h3>

      <p className="text-sm font-body text-white/60 leading-relaxed mb-4 flex-1">
        {tool.description}
      </p>

      <div
        className="text-xs font-body italic mb-3 pl-3 border-l-2"
        style={{
          color: tool.color,
          borderColor: `${tool.color}80`,
        }}
      >
        {tool.uniqueAngle}
      </div>

      {isLive && (
        <div
          className="font-cyber text-xs tracking-widest text-right transition-all group-hover:translate-x-1"
          style={{ color: tool.color }}
        >
          ÖFFNEN →
        </div>
      )}
    </article>
  );

  if (!isLive) return content;

  return (
    <Link href={`/tools/${tool.slug}`}>
      <a className="block h-full">{content}</a>
    </Link>
  );
}

export default function ToolsPage() {
  const liveCount = TOOLS.filter((t) => t.status === 'live').length;

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* HERO */}
        <header className="mb-12 text-center">
          <div className="inline-block mb-4 px-3 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/5">
            <span className="font-cyber text-[10px] tracking-widest text-neon-pink">
              FORTNITE NEXUS · TOOLS
            </span>
          </div>
          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-4 leading-none">
            DAS PRO-ARSENAL
          </h1>
          <p className="text-white/60 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            8 High-Tech-Tools für kompetitive Fortnite-Spieler. Wissenschaftlich, präzise,
            sofort einsetzbar. <span className="text-neon-pink">{liveCount} / {TOOLS.length} live</span>.
          </p>
        </header>

        {/* GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool) => (
            <ToolCardLink key={tool.slug} tool={tool} />
          ))}
        </section>

        {/* PREMIUM-CTA */}
        <section className="mt-16 p-8 rounded-2xl border border-neon-gold/30 bg-gradient-to-br from-neon-gold/10 via-transparent to-neon-pink/10 text-center">
          <h2 className="font-cyber text-2xl sm:text-3xl font-black text-white mb-3">
            ALLE TOOLS UNLIMITED — NEXUS PRO
          </h2>
          <p className="text-white/70 font-body max-w-xl mx-auto mb-6 leading-relaxed">
            Free-Tier hat tägliche Limits. Mit Nexus Pro nutzt du alle 8 Tools unlimited,
            erhältst Wochen-Reports und 10% Rabatt auf alle digitalen Produkte.
          </p>
          <Link href="/shop">
            <a className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-gold font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform">
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
