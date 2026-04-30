import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { PRO_PLAYERS, type ProPlayer } from '../data/pro-players';

const Footer = lazy(() => import('../components/Footer'));

type FilterStyle = 'all' | 'low' | 'medium' | 'high';
type FilterRegion = 'all' | 'DACH' | 'EU' | 'NA' | 'BR' | 'APAC';

export default function ProsHubPage() {
  const [style, setStyle] = useState<FilterStyle>('all');
  const [region, setRegion] = useState<FilterRegion>('all');

  useEffect(() => {
    document.title = 'Fortnite Pro Settings — Sensitivity, Keybinds & Gear aller Top-Pros | Fortnite Nexus';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Alle Fortnite Pro Settings 2026: Bugha, Clix, Mongraal, Tfue, Aqua, Tayson & mehr. Sensitivity, Keybinds, Gear, cm/360° für 20+ Top-Pros.',
    );
  }, []);

  let filtered: ProPlayer[] = PRO_PLAYERS;
  if (style !== 'all') filtered = filtered.filter((p) => p.style === style);
  if (region !== 'all') filtered = filtered.filter((p) => p.region === region);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <main>
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap">
          <Link href="/"><a className="hover:text-neon-pink">Home</a></Link>
          <span>/</span>
          <span className="text-white/60">Pro Settings</span>
        </nav>

        <header className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-3 leading-none">PRO SETTINGS</h1>
          <p className="text-white/60 font-body text-lg max-w-2xl leading-relaxed mb-6">
            Sensitivity, Keybinds und Gear von {PRO_PLAYERS.length}+ der weltbesten Fortnite-Pros. Alle Settings stets aktuell gepflegt.
          </p>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-cyber tracking-widest text-white/40 mr-3">STIL:</span>
              {(['all', 'low', 'medium', 'high'] as const).map((s) => (
                <button key={s} onClick={() => setStyle(s)} className={`mr-2 mb-2 px-3 py-1.5 rounded-lg font-cyber text-[11px] tracking-widest transition-colors ${style === s ? 'bg-neon-pink text-bg-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            <div>
              <span className="text-[10px] font-cyber tracking-widest text-white/40 mr-3">REGION:</span>
              {(['all', 'DACH', 'EU', 'NA'] as const).map((r) => (
                <button key={r} onClick={() => setRegion(r)} className={`mr-2 mb-2 px-3 py-1.5 rounded-lg font-cyber text-[11px] tracking-widest transition-colors ${region === r ? 'bg-neon-blue text-bg-dark' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((pro) => {
              const styleColor = pro.style === 'low' ? '#3B82F6' : pro.style === 'high' ? '#EF4444' : '#A855F7';
              return (
                <Link key={pro.slug} href={`/pro/${pro.slug}`}>
                  <a className="block p-5 rounded-2xl border bg-white/[0.03] hover:bg-white/[0.07] transition-all" style={{ borderColor: `${styleColor}30` }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-cyber tracking-widest px-2 py-0.5 rounded" style={{ background: `${styleColor}20`, color: styleColor, border: `1px solid ${styleColor}50` }}>
                        {pro.style.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-cyber text-white/40">{pro.region}</span>
                    </div>
                    <h2 className="font-cyber text-xl font-black text-white mb-1">{pro.name}</h2>
                    <div className="text-xs text-white/50 font-body mb-3">{pro.team} · {pro.country}</div>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                      <div>
                        <div className="text-[9px] font-cyber text-white/40 tracking-widest">SENS</div>
                        <div className="font-mono text-sm text-neon-pink font-bold">{pro.sensitivity.xAxis}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-cyber text-white/40 tracking-widest">DPI</div>
                        <div className="font-mono text-sm text-neon-blue font-bold">{pro.sensitivity.dpi}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-cyber text-white/40 tracking-widest">cm/360</div>
                        <div className="font-mono text-sm text-neon-gold font-bold">{pro.sensitivity.cm360}</div>
                      </div>
                    </div>
                  </a>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/40 font-body">
              Keine Pros mit diesen Filtern gefunden.
            </div>
          )}
        </section>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}
