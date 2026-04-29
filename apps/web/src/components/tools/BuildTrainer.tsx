import { useState, useEffect, useRef, useCallback } from 'react';

type BuildType = 'wall' | 'ramp' | 'floor' | 'cone';
type DrillId = 'basics' | '90s' | 'double-ramp' | 'tunneling';

interface BuildPiece {
  type: BuildType;
  x: number;
  y: number;
  placedAt: number;
}

interface DrillConfig {
  id: DrillId;
  name: string;
  description: string;
  targetSequence: BuildType[];
  targetTime: number; // ms
  difficulty: 1 | 2 | 3 | 4;
}

const DRILLS: DrillConfig[] = [
  {
    id: 'basics',
    name: 'Basics: Wall → Ramp',
    description: 'Fundamentale Kombi. Ziel: 1500ms.',
    targetSequence: ['wall', 'ramp'],
    targetTime: 1500,
    difficulty: 1,
  },
  {
    id: '90s',
    name: '90-Degree',
    description: 'Wall, Ramp, Floor, Wall. Ziel: 2500ms.',
    targetSequence: ['wall', 'ramp', 'floor', 'wall'],
    targetTime: 2500,
    difficulty: 2,
  },
  {
    id: 'double-ramp',
    name: 'Double Ramp Rush',
    description: 'Ramp + Wall + Ramp für aggressive Approaches. Ziel: 2000ms.',
    targetSequence: ['ramp', 'wall', 'ramp'],
    targetTime: 2000,
    difficulty: 2,
  },
  {
    id: 'tunneling',
    name: 'Tunneling',
    description: 'Wall + Ramp + Floor + Wall + Ramp. Für Rotations unter Druck. Ziel: 3000ms.',
    targetSequence: ['wall', 'ramp', 'floor', 'wall', 'ramp'],
    targetTime: 3000,
    difficulty: 3,
  },
];

const KEY_MAP: Record<string, BuildType> = {
  '1': 'wall',
  '2': 'ramp',
  '3': 'floor',
  '4': 'cone',
  q: 'wall',
  w: 'ramp',
  e: 'floor',
  r: 'cone',
};

const PIECE_COLORS: Record<BuildType, string> = {
  wall: '#00f2ff',
  ramp: '#ff0055',
  floor: '#f5c518',
  cone: '#22C55E',
};

const PIECE_ICONS: Record<BuildType, string> = {
  wall: '🟦',
  ramp: '🔺',
  floor: '⬜',
  cone: '🔶',
};

export default function BuildTrainer() {
  const [selectedDrill, setSelectedDrill] = useState<DrillConfig>(DRILLS[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [placed, setPlaced] = useState<BuildPiece[]>([]);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [lastTime, setLastTime] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [errors, setErrors] = useState(0);

  const rafRef = useRef<number | undefined>(undefined);

  // Load best time from localStorage
  useEffect(() => {
    try {
      const key = `nexus-build-trainer-best-${selectedDrill.id}`;
      const raw = localStorage.getItem(key);
      setBestTime(raw ? parseInt(raw, 10) : null);
    } catch {
      setBestTime(null);
    }
  }, [selectedDrill.id]);

  // Timer
  useEffect(() => {
    if (running && startTime) {
      const tick = () => {
        setElapsed(Date.now() - startTime);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, startTime]);

  const resetDrill = useCallback(() => {
    setCurrentStep(0);
    setRunning(false);
    setStartTime(null);
    setElapsed(0);
    setPlaced([]);
    setErrors(0);
  }, []);

  const finishDrill = useCallback(
    (success: boolean, totalTime: number) => {
      setRunning(false);

      if (success) {
        setLastTime(totalTime);
        setStreak((s) => s + 1);

        if (!bestTime || totalTime < bestTime) {
          setBestTime(totalTime);
          try {
            localStorage.setItem(
              `nexus-build-trainer-best-${selectedDrill.id}`,
              String(totalTime),
            );
          } catch {
            // ignore
          }
        }
      } else {
        setStreak(0);
      }
    },
    [bestTime, selectedDrill.id],
  );

  const placePiece = useCallback(
    (type: BuildType) => {
      if (!running || !startTime) return;

      const expected = selectedDrill.targetSequence[currentStep];

      if (type !== expected) {
        setErrors((e) => e + 1);
        return;
      }

      const now = Date.now();
      setPlaced((p) => [
        ...p,
        {
          type,
          x: 50 + (currentStep - selectedDrill.targetSequence.length / 2) * 15,
          y: 50,
          placedAt: now - startTime,
        },
      ]);

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (nextStep >= selectedDrill.targetSequence.length) {
        const totalTime = now - startTime;
        finishDrill(totalTime <= selectedDrill.targetTime * 1.5, totalTime);
      }
    },
    [running, startTime, currentStep, selectedDrill, finishDrill],
  );

  const startDrill = useCallback(() => {
    resetDrill();
    setRunning(true);
    setStartTime(Date.now());
  }, [resetDrill]);

  // Keyboard Input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const type = KEY_MAP[e.key.toLowerCase()];
      if (type) {
        e.preventDefault();
        placePiece(type);
      }
      if (e.key === ' ' && !running) {
        e.preventDefault();
        startDrill();
      }
      if (e.key === 'Escape') {
        resetDrill();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [placePiece, running, startDrill, resetDrill]);

  const progress = (currentStep / selectedDrill.targetSequence.length) * 100;
  const timeColor =
    elapsed <= selectedDrill.targetTime
      ? '#22C55E'
      : elapsed <= selectedDrill.targetTime * 1.5
      ? '#F59E0B'
      : '#EF4444';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-purple-400 mb-3 leading-tight">
          BUILD TRAINER PRO
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Browser-basiertes Building-Training. Drills für 90s, Double-Ramps & Tunneling.
          Mit Keybind-Tracking und Progression-History.
        </p>
      </div>

      {/* DRILL SELECTOR */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {DRILLS.map((drill) => (
          <button
            key={drill.id}
            onClick={() => {
              setSelectedDrill(drill);
              resetDrill();
            }}
            className="p-4 rounded-xl border text-left transition-all"
            style={{
              borderColor:
                selectedDrill.id === drill.id
                  ? '#A855F7'
                  : 'rgba(255,255,255,0.1)',
              background:
                selectedDrill.id === drill.id
                  ? 'rgba(168,85,247,0.1)'
                  : 'rgba(255,255,255,0.03)',
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-cyber text-sm font-bold text-white">
                {drill.name}
              </span>
              <span className="font-cyber text-[10px] text-white/40">
                {'●'.repeat(drill.difficulty)}
              </span>
            </div>
            <p className="text-[11px] text-white/50 leading-snug">
              {drill.description}
            </p>
          </button>
        ))}
      </section>

      {/* STAGE */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mb-6">
        <div className="aspect-video relative rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-bg-darker to-bg-dark overflow-hidden">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />

          {/* Ground Line */}
          <div
            className="absolute bottom-1/3 left-0 right-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)',
            }}
          />

          {/* Target Sequence Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-2">
              ZIELSEQUENZ
            </div>
            <div className="flex gap-2 flex-wrap">
              {selectedDrill.targetSequence.map((type, i) => (
                <div
                  key={i}
                  className="px-2 py-1 rounded-lg border text-xs font-cyber"
                  style={{
                    borderColor:
                      i < currentStep
                        ? PIECE_COLORS[type]
                        : i === currentStep
                        ? PIECE_COLORS[type]
                        : 'rgba(255,255,255,0.1)',
                    background:
                      i < currentStep
                        ? `${PIECE_COLORS[type]}30`
                        : i === currentStep
                        ? `${PIECE_COLORS[type]}10`
                        : 'transparent',
                    color:
                      i < currentStep
                        ? PIECE_COLORS[type]
                        : i === currentStep
                        ? '#fff'
                        : 'rgba(255,255,255,0.4)',
                    fontWeight: i === currentStep ? 'bold' : 'normal',
                    animation: i === currentStep ? 'pulse 1s ease-in-out infinite' : 'none',
                  }}
                >
                  {PIECE_ICONS[type]} {type}
                </div>
              ))}
            </div>
          </div>

          {/* Placed Pieces */}
          {placed.map((p, i) => (
            <div
              key={i}
              className="absolute w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{
                left: `${p.x}%`,
                bottom: `${35 + (p.type === 'ramp' ? 5 : p.type === 'floor' ? -5 : 0)}%`,
                background: `${PIECE_COLORS[p.type]}40`,
                border: `2px solid ${PIECE_COLORS[p.type]}`,
                boxShadow: `0 0 12px ${PIECE_COLORS[p.type]}80`,
                transform: 'translate(-50%, 0)',
                animation: 'fadeInUp 0.2s ease-out',
              }}
            >
              {PIECE_ICONS[p.type]}
            </div>
          ))}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <div
              className="h-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, #A855F7, #ff0055)`,
              }}
            />
          </div>

          {/* Timer */}
          {running && (
            <div
              className="absolute top-4 right-4 font-mono text-3xl font-black tabular-nums"
              style={{ color: timeColor, textShadow: `0 0 10px ${timeColor}` }}
            >
              {(elapsed / 1000).toFixed(2)}s
            </div>
          )}

          {/* Start Overlay */}
          {!running && currentStep === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="text-center">
                <button
                  onClick={startDrill}
                  className="px-10 py-4 rounded-xl bg-gradient-to-r from-neon-pink to-purple-500 font-cyber text-sm tracking-widest text-white font-black hover:scale-105 transition-transform"
                >
                  DRILL STARTEN (LEERTASTE)
                </button>
                <p className="text-xs font-body text-white/50 mt-4">
                  Nutze Tasten <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-neon-blue">Q</kbd>/
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-neon-pink">W</kbd>/
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-neon-gold">E</kbd>/
                  <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-green-400">R</kbd>
                </p>
              </div>
            </div>
          )}

          {/* Completion Overlay */}
          {!running && currentStep === selectedDrill.targetSequence.length && lastTime && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <div className="text-center">
                <div className="font-cyber text-2xl text-white/60 tracking-widest mb-2">
                  COMPLETE
                </div>
                <div
                  className="font-mono text-6xl font-black tabular-nums mb-2"
                  style={{
                    color:
                      lastTime <= selectedDrill.targetTime ? '#22C55E' : '#F59E0B',
                  }}
                >
                  {(lastTime / 1000).toFixed(2)}s
                </div>
                <div className="font-body text-sm text-white/50 mb-4">
                  Ziel: {(selectedDrill.targetTime / 1000).toFixed(2)}s
                  {errors > 0 && ` · ${errors} Fehler`}
                </div>
                <button
                  onClick={startDrill}
                  className="px-8 py-3 rounded-xl bg-neon-pink font-cyber text-sm tracking-widest text-bg-dark font-black hover:scale-105 transition-transform"
                >
                  NOCHMAL (LEERTASTE)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STATS PANEL */}
        <aside className="space-y-3">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
              BEST TIME
            </div>
            <div className="font-mono text-2xl font-black text-neon-gold tabular-nums">
              {bestTime ? `${(bestTime / 1000).toFixed(2)}s` : '—'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
              LAST TIME
            </div>
            <div className="font-mono text-2xl font-black text-white tabular-nums">
              {lastTime ? `${(lastTime / 1000).toFixed(2)}s` : '—'}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
              STREAK
            </div>
            <div className="font-mono text-2xl font-black text-green-400 tabular-nums">
              {streak}
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
              ERRORS
            </div>
            <div className="font-mono text-2xl font-black text-red-400 tabular-nums">
              {errors}
            </div>
          </div>
        </aside>
      </section>

      {/* MOBILE BUTTONS */}
      <section className="lg:hidden grid grid-cols-4 gap-2 mb-6">
        {(['wall', 'ramp', 'floor', 'cone'] as BuildType[]).map((type) => (
          <button
            key={type}
            onClick={() => placePiece(type)}
            disabled={!running}
            className="p-4 rounded-xl border disabled:opacity-40 font-cyber text-xs tracking-widest transition-all"
            style={{
              borderColor: PIECE_COLORS[type],
              background: `${PIECE_COLORS[type]}15`,
              color: PIECE_COLORS[type],
            }}
          >
            <div className="text-2xl mb-1">{PIECE_ICONS[type]}</div>
            {type.toUpperCase()}
          </button>
        ))}
      </section>

      {/* KEYBIND INFO */}
      <section className="p-5 rounded-2xl border border-white/10 bg-white/5">
        <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
          KEYBINDS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: 'Q / 1', label: 'Wall', color: PIECE_COLORS.wall },
            { key: 'W / 2', label: 'Ramp', color: PIECE_COLORS.ramp },
            { key: 'E / 3', label: 'Floor', color: PIECE_COLORS.floor },
            { key: 'R / 4', label: 'Cone', color: PIECE_COLORS.cone },
          ].map((k) => (
            <div
              key={k.label}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
            >
              <kbd
                className="px-2 py-1 rounded font-mono text-xs font-bold"
                style={{ background: `${k.color}30`, color: k.color }}
              >
                {k.key}
              </kbd>
              <span className="font-body text-sm text-white/70">{k.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
