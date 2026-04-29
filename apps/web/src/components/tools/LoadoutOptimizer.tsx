import { useState, useMemo } from 'react';
import {
  optimizeLoadout,
  type PlayStyle,
  type ZonePhase,
  type MapArea,
  type SkillLevel,
} from '../../lib/loadout-optimizer';

interface OptionConfig<T extends string> {
  value: T;
  label: string;
  icon: string;
  description: string;
}

const PLAYSTYLES: OptionConfig<PlayStyle>[] = [
  { value: 'aggressive', label: 'Aggressiv', icon: '⚔️', description: 'Pushes, Close-Range-Duelle' },
  { value: 'balanced', label: 'Balanced', icon: '⚖️', description: 'Flexibel, situativ' },
  { value: 'passive', label: 'Passiv', icon: '🎯', description: 'Positioning, Long-Range' },
];

const PHASES: OptionConfig<ZonePhase>[] = [
  { value: 'early', label: 'Early', icon: '🚀', description: 'Landung, erste Kämpfe' },
  { value: 'mid', label: 'Mid', icon: '🗺️', description: 'Rotations, Mid-Game' },
  { value: 'end', label: 'End', icon: '👑', description: 'Endzone, Box-Fights' },
];

const AREAS: OptionConfig<MapArea>[] = [
  { value: 'open', label: 'Offen', icon: '🌾', description: 'Weite Felder, keine Deckung' },
  { value: 'urban', label: 'Urban', icon: '🏙️', description: 'POIs, Stadt, Gebäude' },
  { value: 'coastal', label: 'Küste', icon: '🌊', description: 'Mixed, Strand, Cliffs' },
];

const SKILLS: OptionConfig<SkillLevel>[] = [
  { value: 'casual', label: 'Casual', icon: '🎮', description: 'Pubs, Zero Build' },
  { value: 'ranked', label: 'Ranked', icon: '🏅', description: 'Arena, Competitive' },
  { value: 'competitive', label: 'Competitive', icon: '🏆', description: 'Cash Cups, FNCS' },
];

function OptionGrid<T extends string>({
  label,
  options,
  value,
  onChange,
  color,
}: {
  label: string;
  options: OptionConfig<T>[];
  value: T;
  onChange: (v: T) => void;
  color: string;
}) {
  return (
    <div>
      <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">{label}</h3>
      <div className="grid grid-cols-3 gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className="p-3 rounded-xl border text-left transition-all"
              style={{
                borderColor: active ? color : 'rgba(255,255,255,0.1)',
                background: active ? `${color}15` : 'rgba(255,255,255,0.03)',
              }}
            >
              <div className="text-2xl mb-1">{opt.icon}</div>
              <div
                className="font-cyber text-sm tracking-wide mb-0.5"
                style={{ color: active ? color : 'white' }}
              >
                {opt.label}
              </div>
              <div className="text-[10px] text-white/40 leading-snug">
                {opt.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LoadoutOptimizer() {
  const [playStyle, setPlayStyle] = useState<PlayStyle>('balanced');
  const [zonePhase, setZonePhase] = useState<ZonePhase>('mid');
  const [mapArea, setMapArea] = useState<MapArea>('urban');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('ranked');

  const result = useMemo(
    () => optimizeLoadout({ playStyle, zonePhase, mapArea, skillLevel }),
    [playStyle, zonePhase, mapArea, skillLevel],
  );

  const rarityColor = (r: string): string => {
    const map: Record<string, string> = {
      Common: '#9CA3AF',
      Uncommon: '#22C55E',
      Rare: '#3B82F6',
      Epic: '#A855F7',
      Legendary: '#F59E0B',
    };
    return map[r] ?? '#9CA3AF';
  };

  const tierColor = (t: string): string => {
    const map: Record<string, string> = {
      S: '#EF4444',
      A: '#F59E0B',
      B: '#22C55E',
      C: '#3B82F6',
      D: '#9CA3AF',
    };
    return map[t] ?? '#9CA3AF';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-neon-blue mb-3 leading-tight">
          LOADOUT OPTIMIZER AI
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Wähle deinen Spielstil, Zonen-Phase und Kartenbereich — unsere Decision-Engine
          berechnet das optimale 5-Slot-Loadout mit Situational-Score.
        </p>
      </div>

      {/* INPUT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-2xl border border-white/10 bg-white/5">
        <OptionGrid
          label="SPIELSTIL"
          options={PLAYSTYLES}
          value={playStyle}
          onChange={setPlayStyle}
          color="#ff0055"
        />
        <OptionGrid
          label="ZONEN-PHASE"
          options={PHASES}
          value={zonePhase}
          onChange={setZonePhase}
          color="#00f2ff"
        />
        <OptionGrid
          label="KARTEN-BEREICH"
          options={AREAS}
          value={mapArea}
          onChange={setMapArea}
          color="#F59E0B"
        />
        <OptionGrid
          label="SKILL-LEVEL"
          options={SKILLS}
          value={skillLevel}
          onChange={setSkillLevel}
          color="#22C55E"
        />
      </section>

      {/* RESULT */}
      <section className="mb-8">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-cyber text-xl tracking-widest text-neon-blue">
            📦 EMPFOHLENES LOADOUT
          </h2>
          <div className="font-mono text-sm">
            <span className="text-white/40">TOTAL-SCORE: </span>
            <span className="text-neon-pink font-bold text-lg">
              {result.totalScore}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {result.recommendations.map((rec) => (
            <div
              key={rec.slot}
              className="p-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-neon-blue/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-cyber text-xs text-white/40 tracking-widest">
                  SLOT {rec.slot}
                </span>
                <span
                  className="font-cyber text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${tierColor(rec.weapon.tier)}20`,
                    color: tierColor(rec.weapon.tier),
                    border: `1px solid ${tierColor(rec.weapon.tier)}50`,
                  }}
                >
                  {rec.weapon.tier}-TIER
                </span>
              </div>

              <div
                className="font-cyber text-xs tracking-wider mb-1"
                style={{ color: rarityColor(rec.weapon.rarity) }}
              >
                {rec.role}
              </div>

              <h3 className="font-cyber text-lg font-bold text-white mb-2 leading-tight">
                {rec.weapon.name}
              </h3>

              <div className="space-y-1 text-xs font-body mb-3">
                <div className="flex justify-between">
                  <span className="text-white/40">DMG</span>
                  <span className="text-white">{rec.weapon.damage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">DPS</span>
                  <span className="text-white">{rec.weapon.dps.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Range</span>
                  <span className="text-white">{rec.weapon.range}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Score</span>
                  <span className="text-neon-pink font-bold">{rec.score}</span>
                </div>
              </div>

              <p className="text-[11px] text-white/50 font-body leading-snug italic">
                {rec.reasoning}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TIPS */}
      <section className="p-6 rounded-2xl border border-neon-gold/30 bg-neon-gold/5">
        <h2 className="font-cyber text-sm tracking-widest text-neon-gold mb-4">
          💡 STRATEGIE-TIPPS FÜR DEIN SETUP
        </h2>
        <ul className="space-y-3">
          {result.tips.map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm font-body text-white/80 leading-relaxed"
            >
              <span className="text-neon-gold font-bold shrink-0">→</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
