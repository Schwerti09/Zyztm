import { useState, useMemo, useEffect } from 'react';
import {
  GAMES,
  convertSensitivity,
  classifySensitivity,
  calculateEDPI,
  toCm360,
} from '../../lib/sensitivity-math';

const STORAGE_KEY = 'nexus-sensitivity-converter-v1';

interface StoredState {
  fromGame: string;
  toGame: string;
  sensitivity: number;
  dpi: number;
  fromFov: number;
  toFov: number;
}

function loadState(): Partial<StoredState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(s: StoredState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

export default function SensitivityConverter() {
  const saved = useMemo(loadState, []);

  const [fromGame, setFromGame] = useState(saved.fromGame ?? 'fortnite');
  const [toGame, setToGame] = useState(saved.toGame ?? 'valorant');
  const [sensitivity, setSensitivity] = useState(saved.sensitivity ?? 0.08);
  const [dpi, setDpi] = useState(saved.dpi ?? 800);
  const [fromFov, setFromFov] = useState(saved.fromFov ?? 80);
  const [toFov, setToFov] = useState(saved.toFov ?? 103);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    saveState({ fromGame, toGame, sensitivity, dpi, fromFov, toFov });
  }, [fromGame, toGame, sensitivity, dpi, fromFov, toFov]);

  const fromGameConfig = GAMES.find((g) => g.id === fromGame)!;
  const toGameConfig = GAMES.find((g) => g.id === toGame)!;

  const result = useMemo(() => {
    try {
      return convertSensitivity(
        { gameId: fromGame, sensitivity, dpi, fov: fromFov },
        toGame,
        toFov,
      );
    } catch {
      return null;
    }
  }, [fromGame, toGame, sensitivity, dpi, fromFov, toFov]);

  const cm360Value = useMemo(() => {
    try {
      return toCm360({ gameId: fromGame, sensitivity, dpi });
    } catch {
      return 0;
    }
  }, [fromGame, sensitivity, dpi]);

  const classification = classifySensitivity(cm360Value);
  const edpi = calculateEDPI(sensitivity, dpi);

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(String(result.targetSensitivity));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-neon-pink mb-3 leading-tight">
          SENSITIVITY CONVERTER PRO
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Konvertiere deine Sensitivity zwischen 8 Shootern. Wissenschaftlich exakt mit
          cm/360°-Methode, FOV-Scaling und DPI-Kompensation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* SOURCE */}
        <section className="p-6 rounded-2xl border border-neon-blue/30 bg-neon-blue/5">
          <header className="flex items-center justify-between mb-5">
            <h2 className="font-cyber text-sm tracking-widest text-neon-blue">
              📤 VON (QUELLE)
            </h2>
            <span className="text-xs font-body text-white/40">
              {fromGameConfig.unit}
            </span>
          </header>

          <label className="block mb-4">
            <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
              SPIEL
            </span>
            <select
              value={fromGame}
              onChange={(e) => setFromGame(e.target.value)}
              className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-body text-white focus:border-neon-blue outline-none transition-colors"
            >
              {GAMES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4">
            <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
              SENSITIVITY
            </span>
            <input
              type="number"
              step="0.001"
              min={fromGameConfig.sensRange.min}
              max={fromGameConfig.sensRange.max}
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value) || 0)}
              className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-neon-blue focus:border-neon-blue outline-none transition-colors"
            />
          </label>

          <label className="block mb-4">
            <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
              MAUS-DPI
            </span>
            <input
              type="number"
              step="100"
              min={100}
              max={32000}
              value={dpi}
              onChange={(e) => setDpi(parseFloat(e.target.value) || 800)}
              className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-neon-blue focus:border-neon-blue outline-none transition-colors"
            />
          </label>

          {fromGameConfig.fovScaling && (
            <label className="block">
              <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
                FOV (DEIN AKTUELLES) — nur bei FOV-Scaling relevant
              </span>
              <input
                type="number"
                step="1"
                min={60}
                max={120}
                value={fromFov}
                onChange={(e) => setFromFov(parseFloat(e.target.value) || fromGameConfig.defaultFov)}
                className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-white/90 focus:border-neon-blue outline-none"
              />
            </label>
          )}
        </section>

        {/* TARGET */}
        <section className="p-6 rounded-2xl border border-neon-pink/30 bg-neon-pink/5">
          <header className="flex items-center justify-between mb-5">
            <h2 className="font-cyber text-sm tracking-widest text-neon-pink">
              📥 ZU (ZIEL)
            </h2>
            <span className="text-xs font-body text-white/40">
              {toGameConfig.unit}
            </span>
          </header>

          <label className="block mb-4">
            <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
              SPIEL
            </span>
            <select
              value={toGame}
              onChange={(e) => setToGame(e.target.value)}
              className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-body text-white focus:border-neon-pink outline-none transition-colors"
            >
              {GAMES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </label>

          <div className="mb-4">
            <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
              KONVERTIERTE SENSITIVITY
            </span>
            <div className="flex gap-2">
              <div className="flex-1 bg-bg-darker border border-neon-pink/50 rounded-lg px-4 py-3 font-mono text-2xl font-bold text-neon-pink tracking-wider">
                {result ? result.targetSensitivity : '—'}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-3 rounded-lg border border-neon-pink/50 bg-neon-pink/10 hover:bg-neon-pink/20 text-neon-pink font-cyber text-xs tracking-widest transition-colors"
              >
                {copied ? '✓ KOPIERT' : 'KOPIEREN'}
              </button>
            </div>
          </div>

          {toGameConfig.fovScaling && (
            <label className="block mb-4">
              <span className="text-xs font-cyber tracking-wider text-white/50 mb-1 block">
                FOV (DEIN ZIEL)
              </span>
              <input
                type="number"
                step="1"
                min={60}
                max={120}
                value={toFov}
                onChange={(e) => setToFov(parseFloat(e.target.value) || toGameConfig.defaultFov)}
                className="w-full bg-bg-darker border border-white/10 rounded-lg px-3 py-2.5 text-sm font-mono text-white/90 focus:border-neon-pink outline-none"
              />
            </label>
          )}

          {result?.fovAdjusted && (
            <div className="text-xs text-green-400 font-body mb-2">
              ✓ FOV-Scaling automatisch angewendet
            </div>
          )}
          {result?.warning && (
            <div className="text-xs text-yellow-400 font-body border border-yellow-500/30 bg-yellow-500/10 rounded-lg px-3 py-2 mt-2">
              ⚠ {result.warning}
            </div>
          )}
        </section>
      </div>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-xs font-cyber tracking-widest text-white/40 mb-1">cm/360°</div>
          <div className="font-mono text-2xl font-bold text-white">
            {cm360Value.toFixed(2)}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-xs font-cyber tracking-widest text-white/40 mb-1">inch/360°</div>
          <div className="font-mono text-2xl font-bold text-white">
            {(cm360Value / 2.54).toFixed(2)}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-xs font-cyber tracking-widest text-white/40 mb-1">eDPI</div>
          <div className="font-mono text-2xl font-bold text-white">{edpi}</div>
        </div>
        <div
          className="p-4 rounded-xl border bg-white/5"
          style={{ borderColor: `${classification.color}80` }}
        >
          <div className="text-xs font-cyber tracking-widest text-white/40 mb-1">KLASSE</div>
          <div
            className="font-cyber text-lg font-bold tracking-wide"
            style={{ color: classification.color }}
          >
            {classification.label}
          </div>
        </div>
      </section>

      {/* CLASSIFICATION DESCRIPTION */}
      <section className="p-5 rounded-2xl border border-white/10 bg-white/5 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ background: classification.color }}
          />
          <h3 className="font-cyber text-sm tracking-widest text-white/60">
            DEINE SENS-KATEGORIE
          </h3>
        </div>
        <p className="text-sm font-body text-white/80 leading-relaxed">
          {classification.description}
        </p>
      </section>

      {/* INFO-BOX */}
      <section className="p-6 rounded-2xl border border-neon-gold/30 bg-neon-gold/5">
        <h3 className="font-cyber text-sm tracking-widest text-neon-gold mb-3">
          🎯 WARUM DIESER CONVERTER PRÄZISER IST
        </h3>
        <ul className="space-y-2 text-sm font-body text-white/70 leading-relaxed">
          <li>
            <span className="text-white font-semibold">cm/360° Methode:</span>{' '}
            Wir berechnen Zentimeter pro vollständiger 360°-Drehung — der Goldstandard unter
            Pros.
          </li>
          <li>
            <span className="text-white font-semibold">FOV-Scaling:</span>{' '}
            Apex Legends und CoD scalen Aim mit FOV. Wir korrigieren das automatisch.
          </li>
          <li>
            <span className="text-white font-semibold">DPI-Neutral:</span>{' '}
            Die Berechnung ist DPI-unabhängig — ändere die Maus ohne Re-Konvertierung.
          </li>
          <li>
            <span className="text-white font-semibold">Lokal gespeichert:</span>{' '}
            Deine Werte werden automatisch im Browser behalten.
          </li>
        </ul>
      </section>
    </div>
  );
}
