import { useState, useMemo } from 'react';
import { WEAPONS, type Weapon } from '../../data/weapons-data';

interface PatchScenario {
  id: string;
  name: string;
  description: string;
  adjustments: {
    weaponId: string;
    damageChange: number; // % (negative = nerf)
    fireRateChange: number;
    rangeChange: number;
  }[];
}

const SCENARIOS: PatchScenario[] = [
  {
    id: 'shotgun-meta',
    name: 'Shotgun-Meta-Shift',
    description: 'Typisches Mid-Season Balance-Update. Shotguns nerfed, ARs buffed.',
    adjustments: [
      { weaponId: 'shotgun-combat', damageChange: -10, fireRateChange: -5, rangeChange: 0 },
      { weaponId: 'shotgun-pump', damageChange: -8, fireRateChange: 0, rangeChange: 0 },
      { weaponId: 'ar-assault', damageChange: 8, fireRateChange: 5, rangeChange: 10 },
      { weaponId: 'ar-heavy', damageChange: 5, fireRateChange: 0, rangeChange: 5 },
    ],
  },
  {
    id: 'sniper-buff',
    name: 'Sniper-Comeback',
    description: 'Snipers werden competitive-viable. Headshot-Multiplier erhöht.',
    adjustments: [
      { weaponId: 'sniper-bolt', damageChange: 10, fireRateChange: 10, rangeChange: 20 },
      { weaponId: 'sniper-heavy', damageChange: 15, fireRateChange: 0, rangeChange: 15 },
      { weaponId: 'sniper-semi', damageChange: 8, fireRateChange: 0, rangeChange: 10 },
    ],
  },
  {
    id: 'smg-rework',
    name: 'SMG-Rework',
    description: 'Close-Range Meta-Shift. SMGs dominieren Shotguns.',
    adjustments: [
      { weaponId: 'smg-mp5', damageChange: 15, fireRateChange: 0, rangeChange: 10 },
      { weaponId: 'smg-p90', damageChange: 10, fireRateChange: 0, rangeChange: 10 },
      { weaponId: 'smg-tactical', damageChange: 12, fireRateChange: 5, rangeChange: 5 },
      { weaponId: 'shotgun-combat', damageChange: -15, fireRateChange: 0, rangeChange: 0 },
    ],
  },
  {
    id: 'explosive-era',
    name: 'Explosive-Era',
    description: 'RPGs und Granaten dominieren Endgame-Box-Fights.',
    adjustments: [
      { weaponId: 'explosive-rpg', damageChange: 20, fireRateChange: 10, rangeChange: 20 },
      { weaponId: 'explosive-rocket', damageChange: 15, fireRateChange: 0, rangeChange: 15 },
      { weaponId: 'explosive-grenade', damageChange: 10, fireRateChange: 5, rangeChange: 10 },
    ],
  },
];

interface Projection {
  weapon: Weapon;
  currentScore: number;
  projectedScore: number;
  change: number;
  trend: 'rising' | 'falling' | 'stable';
  confidence: number; // 0-100
}

function calculateCurrentScore(w: Weapon): number {
  const tierMap: Record<Weapon['tier'], number> = { S: 100, A: 80, B: 60, C: 40, D: 20 };
  return Math.round(tierMap[w.tier] * 0.6 + w.dps / 3);
}

function projectScenario(scenario: PatchScenario): Projection[] {
  return WEAPONS.map((w) => {
    const adjustment = scenario.adjustments.find((a) => a.weaponId === w.id);
    const currentScore = calculateCurrentScore(w);

    let projectedScore = currentScore;
    let change = 0;

    if (adjustment) {
      const dmgImpact = (adjustment.damageChange / 100) * 20;
      const frImpact = (adjustment.fireRateChange / 100) * 15;
      const rangeImpact = (adjustment.rangeChange / 100) * 10;
      change = dmgImpact + frImpact + rangeImpact;
      projectedScore = Math.max(0, Math.min(100, currentScore + change));
    }

    let trend: 'rising' | 'falling' | 'stable' = 'stable';
    if (change > 3) trend = 'rising';
    else if (change < -3) trend = 'falling';

    const confidence = adjustment ? 85 : 20;

    return {
      weapon: w,
      currentScore,
      projectedScore: Math.round(projectedScore),
      change: Math.round(change * 10) / 10,
      trend,
      confidence,
    };
  }).sort((a, b) => Math.abs(b.change) - Math.abs(a.change));
}

export default function MetaPredictor() {
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const projections = useMemo(() => projectScenario(scenario), [scenario]);
  const topMovers = projections.filter((p) => p.trend !== 'stable').slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-red-400 mb-3 leading-tight">
          META PREDICTOR
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Prognose-Engine für Meta-Shifts. Wähle ein Patch-Szenario — wir berechnen
          welche Waffen steigen und welche fallen. Mit Konfidenz-Score.
        </p>
      </div>

      {/* SCENARIO SELECTOR */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenarioId(s.id)}
            className="p-4 rounded-xl border text-left transition-all"
            style={{
              borderColor: scenarioId === s.id ? '#EF4444' : 'rgba(255,255,255,0.1)',
              background: scenarioId === s.id ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.03)',
            }}
          >
            <h3 className="font-cyber text-sm font-bold text-white mb-1">{s.name}</h3>
            <p className="text-[11px] text-white/60 leading-snug">{s.description}</p>
          </button>
        ))}
      </section>

      {/* TOP MOVERS */}
      <section>
        <h2 className="font-cyber text-xl font-bold text-red-400 mb-4">
          📈 TOP-10 META-MOVERS
        </h2>
        <div className="space-y-2">
          {topMovers.map((p) => (
            <div
              key={p.weapon.id}
              className="p-4 rounded-xl border bg-white/[0.03] flex items-center gap-4"
              style={{
                borderColor:
                  p.trend === 'rising'
                    ? 'rgba(34,197,94,0.3)'
                    : p.trend === 'falling'
                    ? 'rgba(239,68,68,0.3)'
                    : 'rgba(255,255,255,0.1)',
              }}
            >
              <div className="shrink-0 w-10 text-center">
                <div
                  className="font-cyber text-2xl font-black"
                  style={{
                    color:
                      p.trend === 'rising'
                        ? '#22C55E'
                        : p.trend === 'falling'
                        ? '#EF4444'
                        : '#9CA3AF',
                  }}
                >
                  {p.trend === 'rising' ? '▲' : p.trend === 'falling' ? '▼' : '▬'}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-cyber text-base font-bold text-white">
                  {p.weapon.name}
                </div>
                <div className="text-xs text-white/50">
                  {p.weapon.type} · {p.weapon.rarity} · DPS {p.weapon.dps.toFixed(0)}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                    CURRENT
                  </div>
                  <div className="font-mono text-lg text-white/70">
                    {p.currentScore}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                    PROJECTED
                  </div>
                  <div
                    className="font-mono text-lg font-bold"
                    style={{
                      color:
                        p.trend === 'rising'
                          ? '#22C55E'
                          : p.trend === 'falling'
                          ? '#EF4444'
                          : '#fff',
                    }}
                  >
                    {p.projectedScore}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                    Δ CHANGE
                  </div>
                  <div
                    className="font-mono text-lg font-bold"
                    style={{
                      color: p.change > 0 ? '#22C55E' : p.change < 0 ? '#EF4444' : '#fff',
                    }}
                  >
                    {p.change > 0 ? '+' : ''}
                    {p.change.toFixed(1)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                    CONFIDENCE
                  </div>
                  <div className="font-mono text-lg text-neon-gold">{p.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {topMovers.length === 0 && (
          <div className="p-8 text-center rounded-xl border border-dashed border-white/10">
            <p className="text-white/40">
              Keine Meta-Shifts in diesem Szenario vorhergesagt.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
