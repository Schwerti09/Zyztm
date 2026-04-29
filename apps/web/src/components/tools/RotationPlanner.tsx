import { useState, useMemo } from 'react';
import { DROP_LOCATIONS } from '../../data/drop-locations';

/**
 * Rotation Planner — Zone-Pull Pathfinder
 *
 * Berechnet optimale Rotation-Routes basierend auf:
 * - Start-POI
 * - Wahrscheinliche Endzone (8 Directions)
 * - Gefahren-Zones (Hot POIs)
 * - Rotations-Score jedes POI
 */

interface RoutePoint {
  x: number;
  y: number;
  label: string;
  type: 'start' | 'waypoint' | 'end' | 'danger';
  note: string;
}

interface Route {
  id: string;
  name: string;
  points: RoutePoint[];
  totalDistance: number;
  dangerLevel: number; // 0-10
  recommended: boolean;
  description: string;
}

type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'CENTER';

const DIRECTIONS: { id: Direction; label: string; x: number; y: number }[] = [
  { id: 'NW', label: '↖ NW', x: 15, y: 15 },
  { id: 'N', label: '↑ N', x: 50, y: 15 },
  { id: 'NE', label: '↗ NE', x: 85, y: 15 },
  { id: 'W', label: '← W', x: 15, y: 50 },
  { id: 'CENTER', label: '◯ MITTE', x: 50, y: 50 },
  { id: 'E', label: '→ E', x: 85, y: 50 },
  { id: 'SW', label: '↙ SW', x: 15, y: 85 },
  { id: 'S', label: '↓ S', x: 50, y: 85 },
  { id: 'SE', label: '↘ SE', x: 85, y: 85 },
];

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.sqrt((bx - ax) ** 2 + (by - ay) ** 2);
}

function planRoutes(startId: string, endDir: Direction): Route[] {
  const start = DROP_LOCATIONS.find((l) => l.id === startId);
  if (!start) return [];

  const endpoint = DIRECTIONS.find((d) => d.id === endDir)!;
  const directDistance = distance(start.x, start.y, endpoint.x, endpoint.y);

  // Direct Route
  const direct: Route = {
    id: 'direct',
    name: 'Direkte Route',
    points: [
      { x: start.x, y: start.y, label: start.name, type: 'start', note: 'Landepunkt' },
      { x: endpoint.x, y: endpoint.y, label: endpoint.label, type: 'end', note: 'Endzone' },
    ],
    totalDistance: directDistance,
    dangerLevel: 8,
    recommended: false,
    description: 'Schnellste Route aber durch potenzielle Kampfzonen.',
  };

  // Safe Route (über sichere POIs)
  const safePois = DROP_LOCATIONS.filter((l) => l.category === 'safe' || l.category === 'mid');
  const midPoint = safePois.reduce((best, poi) => {
    const detour = distance(start.x, start.y, poi.x, poi.y) + distance(poi.x, poi.y, endpoint.x, endpoint.y);
    const bestDetour = distance(start.x, start.y, best.x, best.y) + distance(best.x, best.y, endpoint.x, endpoint.y);
    const penalty = poi.contestLevel;
    return (detour + penalty) < (bestDetour + best.contestLevel) ? poi : best;
  }, safePois[0]);

  const safe: Route = {
    id: 'safe',
    name: 'Sichere Route',
    points: [
      { x: start.x, y: start.y, label: start.name, type: 'start', note: 'Landepunkt' },
      { x: midPoint.x, y: midPoint.y, label: midPoint.name, type: 'waypoint', note: 'Re-Stock + Heal' },
      { x: endpoint.x, y: endpoint.y, label: endpoint.label, type: 'end', note: 'Endzone' },
    ],
    totalDistance: distance(start.x, start.y, midPoint.x, midPoint.y) + distance(midPoint.x, midPoint.y, endpoint.x, endpoint.y),
    dangerLevel: 3,
    recommended: true,
    description: 'Umweg über sicheren POI. Kostet Zeit, spart Kämpfe.',
  };

  // Contested Route (über Hot POIs für Kills)
  const hotPois = DROP_LOCATIONS.filter((l) => l.category === 'hot' || l.category === 'mid');
  const bestHot = hotPois.reduce((best, poi) => {
    const detour = distance(start.x, start.y, poi.x, poi.y) + distance(poi.x, poi.y, endpoint.x, endpoint.y);
    const bestDetour = distance(start.x, start.y, best.x, best.y) + distance(best.x, best.y, endpoint.x, endpoint.y);
    // For contested: prefer higher lootScore
    return detour - poi.lootScore * 5 < bestDetour - best.lootScore * 5 ? poi : best;
  }, hotPois[0]);

  const contested: Route = {
    id: 'contested',
    name: 'Kill-Route',
    points: [
      { x: start.x, y: start.y, label: start.name, type: 'start', note: 'Landepunkt' },
      { x: bestHot.x, y: bestHot.y, label: bestHot.name, type: 'danger', note: 'High-Loot + Kills' },
      { x: endpoint.x, y: endpoint.y, label: endpoint.label, type: 'end', note: 'Endzone' },
    ],
    totalDistance: distance(start.x, start.y, bestHot.x, bestHot.y) + distance(bestHot.x, bestHot.y, endpoint.x, endpoint.y),
    dangerLevel: 9,
    recommended: false,
    description: 'Aggressive Route für Kill-Heavy Spielstil.',
  };

  return [safe, direct, contested];
}

const ROUTE_COLORS: Record<string, string> = {
  safe: '#22C55E',
  direct: '#F59E0B',
  contested: '#EF4444',
};

export default function RotationPlanner() {
  const [startId, setStartId] = useState('pleasant-park');
  const [endDir, setEndDir] = useState<Direction>('CENTER');
  const [selectedRoute, setSelectedRoute] = useState<string>('safe');

  const routes = useMemo(() => planRoutes(startId, endDir), [startId, endDir]);
  const activeRoute = routes.find((r) => r.id === selectedRoute) || routes[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-blue-400 mb-3 leading-tight">
          ROTATION PLANNER
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Mathematische Zone-Pull-Analyse. Wähle Landepunkt und vermutete Endzone — wir
          berechnen 3 Routen (Safe/Direct/Contested) mit Gefahren-Score.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* START */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
            LANDEPUNKT
          </h3>
          <select
            value={startId}
            onChange={(e) => setStartId(e.target.value)}
            className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-body text-white focus:border-neon-blue outline-none"
          >
            {DROP_LOCATIONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.category.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        {/* DIRECTION */}
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
            VERMUTETE ENDZONE-RICHTUNG
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {DIRECTIONS.map((d) => (
              <button
                key={d.id}
                onClick={() => setEndDir(d.id)}
                className={`p-2 rounded font-cyber text-xs transition-colors ${
                  endDir === d.id
                    ? 'bg-neon-blue text-bg-dark'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 mb-6">
        <div className="aspect-square relative rounded-2xl border border-white/10 bg-gradient-to-br from-bg-darker to-bg-dark overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid */}
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid-pattern)" />

            {/* All POIs (dim) */}
            {DROP_LOCATIONS.map((loc) => (
              <circle
                key={loc.id}
                cx={loc.x}
                cy={loc.y}
                r={1}
                fill="rgba(255,255,255,0.3)"
              />
            ))}

            {/* Route Path */}
            {activeRoute && (
              <>
                {activeRoute.points.slice(0, -1).map((p, i) => {
                  const next = activeRoute.points[i + 1];
                  return (
                    <line
                      key={i}
                      x1={p.x}
                      y1={p.y}
                      x2={next.x}
                      y2={next.y}
                      stroke={ROUTE_COLORS[activeRoute.id]}
                      strokeWidth="0.8"
                      strokeDasharray="2,1"
                      opacity="0.9"
                    />
                  );
                })}
                {activeRoute.points.map((p, i) => (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={2.5}
                      fill={
                        p.type === 'start'
                          ? '#00f2ff'
                          : p.type === 'end'
                          ? '#ff0055'
                          : p.type === 'danger'
                          ? '#EF4444'
                          : '#22C55E'
                      }
                      stroke="#fff"
                      strokeWidth="0.3"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={4}
                      fill="none"
                      stroke={ROUTE_COLORS[activeRoute.id]}
                      strokeWidth="0.3"
                      opacity="0.5"
                    />
                  </g>
                ))}
              </>
            )}
          </svg>

          {/* POI Labels */}
          {activeRoute?.points.map((p, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 font-cyber text-[9px] tracking-wider whitespace-nowrap"
              style={{
                left: `${p.x}%`,
                top: `${p.y + 4}%`,
                color:
                  p.type === 'start'
                    ? '#00f2ff'
                    : p.type === 'end'
                    ? '#ff0055'
                    : p.type === 'danger'
                    ? '#EF4444'
                    : '#22C55E',
                fontWeight: 'bold',
              }}
            >
              {p.label}
            </div>
          ))}

          <div className="absolute top-3 left-3 text-[10px] font-cyber tracking-widest text-white/40">
            ROUTE-PLANNER · CHAPTER 6
          </div>
        </div>

        {/* ROUTE LIST */}
        <aside className="space-y-3">
          {routes.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRoute(r.id)}
              className="w-full p-4 rounded-xl border text-left transition-all"
              style={{
                borderColor:
                  selectedRoute === r.id
                    ? ROUTE_COLORS[r.id]
                    : 'rgba(255,255,255,0.1)',
                background:
                  selectedRoute === r.id
                    ? `${ROUTE_COLORS[r.id]}15`
                    : 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4
                  className="font-cyber text-sm font-bold"
                  style={{ color: selectedRoute === r.id ? ROUTE_COLORS[r.id] : '#fff' }}
                >
                  {r.name}
                </h4>
                {r.recommended && (
                  <span className="text-[10px] font-cyber text-neon-pink">★ TOP</span>
                )}
              </div>
              <p className="text-[11px] text-white/60 mb-3 leading-snug">
                {r.description}
              </p>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-body">
                <div>
                  <div className="text-white/40">DISTANZ</div>
                  <div className="font-mono text-white">{r.totalDistance.toFixed(0)}u</div>
                </div>
                <div>
                  <div className="text-white/40">DANGER</div>
                  <div
                    className="font-mono font-bold"
                    style={{
                      color:
                        r.dangerLevel > 7
                          ? '#EF4444'
                          : r.dangerLevel > 4
                          ? '#F59E0B'
                          : '#22C55E',
                    }}
                  >
                    {r.dangerLevel}/10
                  </div>
                </div>
              </div>
            </button>
          ))}
        </aside>
      </section>

      {/* ROUTE DETAILS */}
      {activeRoute && (
        <section className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-cyber text-sm tracking-widest text-blue-400 mb-3">
            📍 ROUTE-DETAILS
          </h3>
          <ol className="space-y-3">
            {activeRoute.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-cyber text-xs font-bold"
                  style={{
                    background:
                      p.type === 'start'
                        ? '#00f2ff30'
                        : p.type === 'end'
                        ? '#ff005530'
                        : p.type === 'danger'
                        ? '#EF444430'
                        : '#22C55E30',
                    color:
                      p.type === 'start'
                        ? '#00f2ff'
                        : p.type === 'end'
                        ? '#ff0055'
                        : p.type === 'danger'
                        ? '#EF4444'
                        : '#22C55E',
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="font-cyber text-sm font-bold text-white">
                    {p.label}
                  </div>
                  <div className="text-xs text-white/60 font-body">{p.note}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
