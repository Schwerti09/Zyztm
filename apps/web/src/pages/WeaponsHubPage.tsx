import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { WEAPONS, type Weapon } from '../data/weapons-data';

const Footer = lazy(() => import('../components/Footer'));

const TIER_COLORS: Record<Weapon['tier'], string> = {
  S: '#EF4444',
  A: '#F59E0B',
  B: '#22C55E',
  C: '#3B82F6',
  D: '#9CA3AF',
};

const TYPES: (Weapon['type'] | 'All')[] = [
  'All',
  'AR',
  'SMG',
  'Shotgun',
  'Sniper',
  'Pistol',
  'Explosive',
];

type SortBy = 'tier' | 'dps' | 'damage' | 'range';

export default function WeaponsHubPage() {
  const [filterType, setFilterType] = useState<Weapon['type'] | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortBy>('tier');

  useEffect(() => {
    document.title =
      'Fortnite Waffen 2026 — Alle Stats, DPS & Tier-Liste | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Alle Fortnite Waffen mit Damage, DPS, Fire-Rate und Tier-Rating. 25+ Waffen-Datenbank mit Pro-Tipps und Combat-Berechnungen. Täglich aktuell.',
    );
  }, []);

  let filtered = filterType === 'All' ? WEAPONS : WEAPONS.filter((w) => w.type === filterType);

  const tierOrder = { S: 5, A: 4, B: 3, C: 2, D: 1 };
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'tier') return tierOrder[b.tier] - tierOrder[a.tier];
    if (sortBy === 'dps') return b.dps - a.dps;
    if (sortBy === 'damage') return b.damage - a.damage;
    return b.range - a.range;
  });

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <main>
        <nav
          aria-label="Breadcrumb"
          className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-pink transition-colors">Home</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">Waffen</span>
        </nav>

        <header className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-3 leading-none">
            FORTNITE WAFFEN
          </h1>
          <p className="text-white/60 font-body text-lg max-w-2xl leading-relaxed mb-6">
            Die komplette Waffen-Datenbank mit {WEAPONS.length}+ Einträgen. Damage, DPS,
            Tier-Rating, Combat-Berechnungen und Pro-Tipps.
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-cyber tracking-widest text-white/40 mr-3">
                TYP:
              </span>
              {TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`mr-2 mb-2 px-3 py-1.5 rounded-lg font-cyber text-[11px] tracking-widest transition-colors ${
                    filterType === t
                      ? 'bg-neon-pink text-bg-dark'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            <div>
              <span className="text-[10px] font-cyber tracking-widest text-white/40 mr-3">
                SORTIEREN:
              </span>
              {(['tier', 'dps', 'damage', 'range'] as SortBy[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`mr-2 mb-2 px-3 py-1.5 rounded-lg font-cyber text-[11px] tracking-widest transition-colors ${
                    sortBy === s
                      ? 'bg-neon-blue text-bg-dark'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((w) => (
              <Link key={w.id} href={`/weapon/${w.id}`}>
                <a
                  className="block p-5 rounded-2xl border bg-white/[0.03] hover:bg-white/[0.07] transition-all"
                  style={{ borderColor: `${TIER_COLORS[w.tier]}30` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-cyber tracking-widest px-2 py-0.5 rounded"
                      style={{
                        background: `${TIER_COLORS[w.tier]}20`,
                        color: TIER_COLORS[w.tier],
                        border: `1px solid ${TIER_COLORS[w.tier]}50`,
                      }}
                    >
                      {w.tier}-TIER
                    </span>
                    <span className="text-[10px] font-cyber text-white/40">
                      {w.type}
                    </span>
                  </div>
                  <h2 className="font-cyber text-lg font-black text-white mb-1 leading-tight">
                    {w.name}
                  </h2>
                  <div className="text-xs text-white/50 font-body mb-3">
                    {w.rarity}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                    <div>
                      <div className="text-[9px] font-cyber text-white/40 tracking-widest">
                        DMG
                      </div>
                      <div className="font-mono text-sm text-neon-pink font-bold">
                        {w.damage}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-cyber text-white/40 tracking-widest">
                        DPS
                      </div>
                      <div className="font-mono text-sm text-neon-blue font-bold">
                        {w.dps.toFixed(0)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-cyber text-white/40 tracking-widest">
                        RANGE
                      </div>
                      <div className="font-mono text-sm text-neon-gold font-bold">
                        {w.range}m
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
