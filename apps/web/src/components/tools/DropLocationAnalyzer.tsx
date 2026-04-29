import { useState, useMemo } from 'react';
import {
  DROP_LOCATIONS,
  calculateMatchScore,
  recommendDropLocation,
  type DropLocation,
} from '../../data/drop-locations';

type PlayStyle = 'aggressive' | 'balanced' | 'passive';
type SkillLevel = 'casual' | 'ranked' | 'competitive';

const CATEGORY_COLORS: Record<string, string> = {
  hot: '#EF4444',
  mid: '#F59E0B',
  safe: '#22C55E',
  remote: '#3B82F6',
};

const CATEGORY_LABELS: Record<string, string> = {
  hot: 'HOT',
  mid: 'MID',
  safe: 'SAFE',
  remote: 'REMOTE',
};

export default function DropLocationAnalyzer() {
  const [playStyle, setPlayStyle] = useState<PlayStyle>('balanced');
  const [skillLevel, setSkillLevel] = useState<SkillLevel>('ranked');
  const [selectedLocation, setSelectedLocation] = useState<DropLocation | null>(null);

  const recommendations = useMemo(
    () => recommendDropLocation(playStyle, skillLevel),
    [playStyle, skillLevel],
  );

  const recIds = useMemo(() => new Set(recommendations.map((r) => r.id)), [recommendations]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-white">
      <div className="mb-8">
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-green-400 mb-3 leading-tight">
          DROP LOCATION ANALYZER
        </h1>
        <p className="text-white/60 font-body max-w-2xl">
          Finde den optimalen Landepunkt für deinen Spielstil. Mit echten Win-Rate-Daten,
          Contest-Level und Rotations-Score.
        </p>
      </div>

      {/* CONTROLS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
            DEIN SPIELSTIL
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(['aggressive', 'balanced', 'passive'] as PlayStyle[]).map((s) => (
              <button
                key={s}
                onClick={() => setPlayStyle(s)}
                className={`px-4 py-3 rounded-lg font-cyber text-xs tracking-widest transition-colors capitalize ${
                  playStyle === s
                    ? 'bg-neon-pink text-bg-dark'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {s === 'aggressive' ? 'AGGRO' : s === 'balanced' ? 'BALANCED' : 'PASSIV'}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <h3 className="font-cyber text-xs tracking-widest text-white/50 mb-3">
            SKILL-LEVEL
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(['casual', 'ranked', 'competitive'] as SkillLevel[]).map((s) => (
              <button
                key={s}
                onClick={() => setSkillLevel(s)}
                className={`px-4 py-3 rounded-lg font-cyber text-xs tracking-widest transition-colors capitalize ${
                  skillLevel === s
                    ? 'bg-neon-blue text-bg-dark'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {s === 'casual' ? 'CASUAL' : s === 'ranked' ? 'RANKED' : 'COMP'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 mb-8">
        <div className="aspect-square relative rounded-2xl border border-white/10 bg-gradient-to-br from-bg-darker to-bg-dark overflow-hidden">
          {/* Grid Background */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="10%"
                height="10%"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <div className="absolute top-3 left-3 text-[10px] font-cyber tracking-widest text-white/40">
            FORTNITE MAP — CHAPTER 6 SEASON 2
          </div>

          {/* Locations */}
          {DROP_LOCATIONS.map((loc) => {
            const isRecommended = recIds.has(loc.id);
            const isSelected = selectedLocation?.id === loc.id;
            const color = CATEGORY_COLORS[loc.category];
            const size = isRecommended ? 28 : 16;

            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group transition-all hover:scale-110"
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  zIndex: isSelected ? 30 : isRecommended ? 20 : 10,
                }}
                aria-label={loc.name}
              >
                <div
                  className="rounded-full transition-all"
                  style={{
                    width: size,
                    height: size,
                    background: color,
                    boxShadow: isSelected
                      ? `0 0 0 4px ${color}50, 0 0 20px ${color}80`
                      : isRecommended
                      ? `0 0 0 2px ${color}80, 0 0 12px ${color}60`
                      : `0 0 8px ${color}50`,
                    border: isSelected ? `2px solid #fff` : `1px solid ${color}`,
                  }}
                />
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] font-cyber tracking-wider transition-opacity"
                  style={{
                    color: isRecommended || isSelected ? color : 'rgba(255,255,255,0.5)',
                    fontWeight: isRecommended ? 'bold' : 'normal',
                  }}
                >
                  {loc.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAIL PANEL */}
        <aside className="lg:sticky lg:top-6 self-start">
          {selectedLocation ? (
            <div
              className="p-5 rounded-2xl border bg-white/5"
              style={{
                borderColor: `${CATEGORY_COLORS[selectedLocation.category]}50`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-cyber tracking-widest px-2 py-0.5 rounded"
                  style={{
                    background: `${CATEGORY_COLORS[selectedLocation.category]}20`,
                    color: CATEGORY_COLORS[selectedLocation.category],
                  }}
                >
                  {CATEGORY_LABELS[selectedLocation.category]}
                </span>
                {recIds.has(selectedLocation.id) && (
                  <span className="text-[10px] font-cyber tracking-widest text-neon-pink">
                    ★ EMPFOHLEN
                  </span>
                )}
              </div>

              <h2 className="font-cyber text-2xl font-bold text-white mb-2 leading-tight">
                {selectedLocation.name}
              </h2>

              <p className="text-sm font-body text-white/60 leading-relaxed mb-4">
                {selectedLocation.description}
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { label: 'Loot-Score', value: selectedLocation.lootScore, max: 10, color: '#F59E0B' },
                  { label: 'Win-Rate', value: selectedLocation.winRate, max: 15, suffix: '%', color: '#22C55E' },
                  { label: 'Contest', value: selectedLocation.contestLevel, max: 10, color: '#EF4444' },
                  { label: 'Rotation', value: selectedLocation.rotationScore, max: 10, color: '#00f2ff' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-body mb-1">
                      <span className="text-white/50">{stat.label}</span>
                      <span className="text-white font-mono">
                        {stat.value}{stat.suffix ?? ''}
                        {!stat.suffix && `/${stat.max}`}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(stat.value / stat.max) * 100}%`,
                          background: stat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                  MATCH-SCORE FÜR DEIN PROFIL
                </div>
                <div className="font-cyber text-3xl font-black text-neon-gold">
                  {calculateMatchScore(selectedLocation, playStyle, skillLevel)}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-white/10 text-center">
              <div className="text-3xl mb-2 opacity-40">📍</div>
              <p className="text-sm font-body text-white/40">
                Klicke auf einen Punkt auf der Map für Details.
              </p>
            </div>
          )}
        </aside>
      </section>

      {/* TOP 5 RECOMMENDATIONS */}
      <section>
        <h2 className="font-cyber text-xl font-bold text-neon-pink mb-4">
          ★ TOP-5 EMPFEHLUNGEN FÜR DICH
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {recommendations.map((loc, i) => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-neon-pink/40 transition-all text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-cyber text-2xl font-black text-white/30">
                  #{i + 1}
                </span>
                <span
                  className="text-[10px] font-cyber tracking-widest px-2 py-0.5 rounded"
                  style={{
                    background: `${CATEGORY_COLORS[loc.category]}20`,
                    color: CATEGORY_COLORS[loc.category],
                  }}
                >
                  {CATEGORY_LABELS[loc.category]}
                </span>
              </div>
              <div className="font-cyber text-sm text-white mb-1 leading-tight">
                {loc.name}
              </div>
              <div className="text-[10px] font-body text-white/40">
                Win {loc.winRate}% · Loot {loc.lootScore}/10
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
