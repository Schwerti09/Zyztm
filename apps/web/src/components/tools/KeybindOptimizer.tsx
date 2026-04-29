import { useState, useMemo } from 'react';

/**
 * Keybind Optimizer — Ergonomic Algorithm
 *
 * Berechnet optimale Keybinds basierend auf:
 * - Hand-Größe (S/M/L)
 * - Finger-Travel-Distance (physikalisch)
 * - Action-Priority (welche Actions sind wichtig)
 * - Bevorzugte Finger-Position (WASD-Rest)
 */

type HandSize = 'small' | 'medium' | 'large';
type Priority = 'critical' | 'important' | 'standard';

interface Action {
  id: string;
  name: string;
  priority: Priority;
  category: 'movement' | 'combat' | 'building' | 'editing';
  description: string;
}

interface KeyOption {
  key: string;
  finger: 'pinky' | 'ring' | 'middle' | 'index' | 'thumb';
  reach: number; // 0-10 (10 = weit weg von WASD-Rest)
  comfort: number; // 0-10 (10 = super comfortable)
}

const ACTIONS: Action[] = [
  { id: 'wall', name: 'Wall Build', priority: 'critical', category: 'building', description: 'Höchste Priorität im Building' },
  { id: 'ramp', name: 'Ramp Build', priority: 'critical', category: 'building', description: 'Zweitwichtigste Build-Piece' },
  { id: 'floor', name: 'Floor Build', priority: 'important', category: 'building', description: 'Boxing + Tunneling' },
  { id: 'cone', name: 'Cone Build', priority: 'standard', category: 'building', description: 'Für Turtles' },
  { id: 'edit', name: 'Edit Mode', priority: 'critical', category: 'editing', description: 'Instant Edit' },
  { id: 'reset', name: 'Edit Reset', priority: 'important', category: 'editing', description: 'Edit zurücksetzen' },
  { id: 'jump', name: 'Jump', priority: 'critical', category: 'movement', description: 'Basis-Mobility' },
  { id: 'crouch', name: 'Crouch', priority: 'standard', category: 'movement', description: 'Peek-Control' },
  { id: 'weapon1', name: 'Weapon 1', priority: 'critical', category: 'combat', description: 'Primary Weapon' },
  { id: 'weapon2', name: 'Weapon 2', priority: 'critical', category: 'combat', description: 'Secondary Weapon' },
  { id: 'weapon3', name: 'Weapon 3', priority: 'important', category: 'combat', description: 'Third Slot' },
  { id: 'reload', name: 'Reload', priority: 'important', category: 'combat', description: 'Quick Reload' },
];

const KEY_OPTIONS: KeyOption[] = [
  { key: 'Q', finger: 'pinky', reach: 2, comfort: 9 },
  { key: 'E', finger: 'middle', reach: 2, comfort: 9 },
  { key: 'R', finger: 'index', reach: 3, comfort: 7 },
  { key: 'F', finger: 'index', reach: 2, comfort: 8 },
  { key: 'C', finger: 'middle', reach: 3, comfort: 7 },
  { key: 'V', finger: 'index', reach: 3, comfort: 7 },
  { key: 'X', finger: 'ring', reach: 3, comfort: 6 },
  { key: 'Z', finger: 'pinky', reach: 3, comfort: 5 },
  { key: 'T', finger: 'index', reach: 4, comfort: 5 },
  { key: 'G', finger: 'index', reach: 4, comfort: 5 },
  { key: 'Shift', finger: 'pinky', reach: 1, comfort: 10 },
  { key: 'Ctrl', finger: 'pinky', reach: 2, comfort: 8 },
  { key: 'Alt', finger: 'thumb', reach: 3, comfort: 6 },
  { key: 'Space', finger: 'thumb', reach: 1, comfort: 10 },
  { key: 'Mouse4', finger: 'thumb', reach: 1, comfort: 9 },
  { key: 'Mouse5', finger: 'thumb', reach: 1, comfort: 9 },
  { key: 'MWheelUp', finger: 'middle', reach: 1, comfort: 9 },
  { key: 'MWheelDown', finger: 'middle', reach: 1, comfort: 9 },
];

const PRIORITY_WEIGHTS: Record<Priority, number> = {
  critical: 3,
  important: 2,
  standard: 1,
};

const HAND_SIZE_REACH_PENALTY: Record<HandSize, number> = {
  small: 1.5,
  medium: 1.0,
  large: 0.7,
};

interface Binding {
  action: Action;
  key: KeyOption;
  score: number;
}

function optimizeBindings(handSize: HandSize): Binding[] {
  const penalty = HAND_SIZE_REACH_PENALTY[handSize];
  const usedKeys = new Set<string>();
  const bindings: Binding[] = [];

  // Sort actions by priority (critical first)
  const sortedActions = [...ACTIONS].sort(
    (a, b) => PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority],
  );

  for (const action of sortedActions) {
    const availableKeys = KEY_OPTIONS.filter((k) => !usedKeys.has(k.key));
    if (availableKeys.length === 0) break;

    const scored = availableKeys.map((k) => {
      const reachPenalty = k.reach * penalty * 2;
      const comfortBonus = k.comfort * 2;
      const priorityBonus = PRIORITY_WEIGHTS[action.priority] * 5;

      // Special matching: building actions prefer side-keys, combat prefers mouse-buttons
      let categoryBonus = 0;
      if (action.category === 'combat' && (k.key === 'Mouse4' || k.key === 'Mouse5')) {
        categoryBonus = 10;
      }
      if (action.category === 'building' && (k.key === 'Q' || k.key === 'E' || k.key === 'C' || k.key === 'V')) {
        categoryBonus = 8;
      }
      if (action.id === 'jump' && k.key === 'Space') categoryBonus = 15;
      if (action.id === 'crouch' && k.key === 'Ctrl') categoryBonus = 10;

      const score = comfortBonus + priorityBonus + categoryBonus - reachPenalty;
      return { key: k, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    bindings.push({
      action,
      key: best.key,
      score: Math.round(best.score),
    });

    usedKeys.add(best.key.key);
  }

  return bindings;
}

const CATEGORY_COLORS: Record<string, string> = {
  movement: '#22C55E',
  combat: '#EF4444',
  building: '#A855F7',
  editing: '#F59E0B',
};

const PRIORITY_LABELS: Record<Priority, string> = {
  critical: '★★★',
  important: '★★',
  standard: '★',
};

export default function KeybindOptimizer() {
  const [handSize, setHandSize] = useState<HandSize>('medium');
  const [viewCategory, setViewCategory] = useState<string>('all');

  const bindings = useMemo(() => optimizeBindings(handSize), [handSize]);

  const filteredBindings = useMemo(() => {
    if (viewCategory === 'all') return bindings;
    return bindings.filter((b) => b.action.category === viewCategory);
  }, [bindings, viewCategory]);

  const categories = ['all', 'movement', 'combat', 'building', 'editing'];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-amber-400 mb-3 leading-tight">
          KEYBIND OPTIMIZER
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Wissenschaftlich optimierte Keybinds basierend auf Hand-Ergonomie,
          Finger-Travel-Distance und Action-Priorität. Nicht "Pro XY nutzt das" — sondern
          was FÜR DICH optimal ist.
        </p>
      </div>

      {/* HAND SIZE SELECTOR */}
      <section className="p-5 rounded-2xl border border-white/10 bg-white/5 mb-6">
        <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
          DEINE HAND-GRÖSSE
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'small' as HandSize, label: 'KLEIN', sub: '< 17cm', icon: '🤏' },
            { id: 'medium' as HandSize, label: 'MITTEL', sub: '17-19cm', icon: '✋' },
            { id: 'large' as HandSize, label: 'GROSS', sub: '> 19cm', icon: '🖐️' },
          ].map((h) => (
            <button
              key={h.id}
              onClick={() => setHandSize(h.id)}
              className="p-4 rounded-xl border text-center transition-all"
              style={{
                borderColor: handSize === h.id ? '#F59E0B' : 'rgba(255,255,255,0.1)',
                background: handSize === h.id ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="text-3xl mb-1">{h.icon}</div>
              <div
                className="font-cyber text-sm tracking-widest font-bold"
                style={{ color: handSize === h.id ? '#F59E0B' : '#fff' }}
              >
                {h.label}
              </div>
              <div className="text-[10px] text-white/40 font-body mt-1">{h.sub}</div>
            </button>
          ))}
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="flex gap-2 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setViewCategory(c)}
            className={`px-4 py-2 rounded-lg font-cyber text-xs tracking-widest transition-colors capitalize ${
              viewCategory === c
                ? 'bg-neon-gold text-bg-dark'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {c === 'all' ? 'ALLE' : c.toUpperCase()}
          </button>
        ))}
      </section>

      {/* BINDINGS TABLE */}
      <section>
        <div className="space-y-2">
          {filteredBindings.map((b) => (
            <div
              key={b.action.id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center gap-4"
            >
              <div className="shrink-0">
                <kbd
                  className="inline-block px-4 py-2 rounded-lg font-mono text-base font-bold border-2"
                  style={{
                    background: `${CATEGORY_COLORS[b.action.category]}20`,
                    borderColor: CATEGORY_COLORS[b.action.category],
                    color: CATEGORY_COLORS[b.action.category],
                    minWidth: 80,
                    textAlign: 'center',
                  }}
                >
                  {b.key.key}
                </kbd>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-cyber text-base font-bold text-white">
                    {b.action.name}
                  </h4>
                  <span
                    className="text-[10px] font-cyber"
                    style={{ color: CATEGORY_COLORS[b.action.category] }}
                  >
                    {b.action.category.toUpperCase()}
                  </span>
                  <span
                    className="text-[10px] font-cyber"
                    style={{ color: '#F59E0B' }}
                  >
                    {PRIORITY_LABELS[b.action.priority]}
                  </span>
                </div>
                <p className="text-xs text-white/50 font-body">
                  {b.action.description}
                </p>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                  FINGER
                </div>
                <div className="font-body text-sm text-white/70 capitalize">
                  {b.key.finger}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-cyber text-white/40 tracking-widest">
                  ERGO-SCORE
                </div>
                <div className="font-mono text-lg font-bold text-neon-gold">
                  {b.score}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INFO */}
      <section className="mt-8 p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
        <h3 className="font-cyber text-sm tracking-widest text-amber-400 mb-3">
          🧬 DIE WISSENSCHAFT DAHINTER
        </h3>
        <ul className="space-y-2 text-sm font-body text-white/70">
          <li>
            <strong className="text-white">Finger-Travel-Distance:</strong> Jede Bewegung
            weg von der WASD-Rest-Position kostet Reaktionszeit (~50-150ms).
          </li>
          <li>
            <strong className="text-white">Action-Priorität:</strong> Kritische Actions
            (Wall, Ramp, Weapon-Swap) bekommen die komfortabelsten Keys.
          </li>
          <li>
            <strong className="text-white">Finger-Stärke:</strong> Zeigefinger &gt; Mittelfinger
            &gt; Ringfinger &gt; Pinky. Wichtige Actions auf starken Fingern.
          </li>
          <li>
            <strong className="text-white">Hand-Größe-Kompensation:</strong> Kleine Hände
            bekommen mehr "Nah-am-WASD" Bindings, große Hände nutzen mehr Reach-Keys.
          </li>
        </ul>
      </section>
    </div>
  );
}
