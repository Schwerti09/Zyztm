import { lazy, Suspense, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { getProBySlug, PRO_PLAYERS } from '../data/pro-players';

const Footer = lazy(() => import('../components/Footer'));

export default function ProPlayerPage() {
  const params = useParams<{ slug: string }>();
  const pro = getProBySlug(params.slug);

  useEffect(() => {
    if (!pro) return;
    document.title = `${pro.name} Fortnite Settings, Keybinds & Sensitivity 2026 | Fortnite Nexus`;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      `Alle ${pro.name} (${pro.team}) Fortnite Settings: Sensitivity ${pro.sensitivity.xAxis}, DPI ${pro.sensitivity.dpi}, ${pro.sensitivity.cm360} cm/360°. Keybinds, Maus & Monitor. Aktuell 2026.`,
    );

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: pro.name,
      alternateName: pro.realName,
      nationality: pro.country,
      memberOf: { '@type': 'SportsTeam', name: pro.team },
      description: pro.bio,
      url: `https://fortnitenexus.space/pro/${pro.slug}`,
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `schema-pro-${pro.slug}`;
    script.textContent = JSON.stringify(schema);
    const existing = document.getElementById(`schema-pro-${pro.slug}`);
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(`schema-pro-${pro.slug}`);
      if (el) el.remove();
    };
  }, [pro]);

  if (!pro) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="font-cyber text-3xl mb-2">Pro nicht gefunden</h1>
          <Link href="/pros">
            <a className="text-neon-pink underline">Zurück zur Pro-Übersicht</a>
          </Link>
        </div>
      </div>
    );
  }

  const styleConfig = {
    low: { label: 'LOW SENS', color: '#3B82F6', desc: 'Präzise, langsam' },
    medium: { label: 'MEDIUM SENS', color: '#A855F7', desc: 'Ausgewogen' },
    high: { label: 'HIGH SENS', color: '#EF4444', desc: 'Schnell, aggressiv' },
  };
  const style = styleConfig[pro.style];

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <main>
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap">
          <Link href="/"><a className="hover:text-neon-pink">Home</a></Link>
          <span>/</span>
          <Link href="/pros"><a className="hover:text-neon-pink">Pros</a></Link>
          <span>/</span>
          <span className="text-white/60">{pro.name}</span>
        </nav>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-baseline gap-3 mb-4">
            <span className="text-xs font-cyber tracking-widest px-3 py-1 rounded-full" style={{ background: `${style.color}20`, color: style.color, border: `1px solid ${style.color}50` }}>
              {style.label}
            </span>
            <span className="text-xs font-cyber tracking-widest text-white/40">
              {pro.team} · {pro.country} · {pro.region}
            </span>
          </div>
          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-3 leading-none">{pro.name}</h1>
          <p className="text-white/50 font-body text-lg mb-4">
            {pro.realName}
            {pro.earnings && <span className="ml-3 text-neon-gold">· ${pro.earnings} Lifetime</span>}
          </p>
          <p className="text-white/70 font-body leading-relaxed mb-6 max-w-3xl">{pro.bio}</p>
          <div className="flex flex-wrap gap-2">
            {pro.twitter && <a href={`https://twitter.com/${pro.twitter.replace('@', '')}`} target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-cyber tracking-widest text-white/70">𝕏 TWITTER</a>}
            {pro.twitch && <a href={`https://twitch.tv/${pro.twitch}`} target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-xs font-cyber tracking-widest text-purple-400">TWITCH</a>}
            {pro.youtube && <a href={`https://youtube.com/@${pro.youtube}`} target="_blank" rel="noopener" className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-xs font-cyber tracking-widest text-red-400">YOUTUBE</a>}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-pink mb-4">🎯 SENSITIVITY & DPI</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-neon-pink/30 bg-neon-pink/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">X-AXIS</div>
              <div className="font-mono text-3xl font-black text-neon-pink">{pro.sensitivity.xAxis}</div>
            </div>
            <div className="p-4 rounded-xl border border-neon-pink/30 bg-neon-pink/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">Y-AXIS</div>
              <div className="font-mono text-3xl font-black text-neon-pink">{pro.sensitivity.yAxis}</div>
            </div>
            <div className="p-4 rounded-xl border border-neon-blue/30 bg-neon-blue/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">DPI</div>
              <div className="font-mono text-3xl font-black text-neon-blue">{pro.sensitivity.dpi}</div>
            </div>
            <div className="p-4 rounded-xl border border-neon-gold/30 bg-neon-gold/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">cm/360°</div>
              <div className="font-mono text-3xl font-black text-neon-gold">{pro.sensitivity.cm360}</div>
            </div>
          </div>

          {(pro.sensitivity.build || pro.sensitivity.edit) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {pro.sensitivity.build && (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">BUILD-SENS</div>
                  <div className="font-mono text-2xl font-black text-white">{pro.sensitivity.build}×</div>
                </div>
              )}
              {pro.sensitivity.edit && (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">EDIT-SENS</div>
                  <div className="font-mono text-2xl font-black text-white">{pro.sensitivity.edit}×</div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-neon-pink/10 to-neon-blue/10 border border-white/10">
            <p className="text-sm font-body text-white/80 leading-relaxed">
              <strong className="text-white">Klassifikation:</strong> {style.label} ({style.desc}). {pro.name} gehört mit {pro.sensitivity.cm360} cm/360° zum{' '}
              {pro.style === 'low' ? 'Präzisions-Lager.' : pro.style === 'high' ? 'Speed-Lager.' : 'Balanced-Lager.'}
            </p>
            <Link href="/tools/sensitivity-converter">
              <a className="inline-block mt-3 text-xs font-cyber tracking-widest text-neon-blue hover:text-neon-pink">→ ÜBERNEHMEN MIT SENS-CONVERTER</a>
            </Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-blue mb-4">⌨️ KEYBINDS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { label: 'Wall', value: pro.keybinds.wall },
              { label: 'Ramp', value: pro.keybinds.ramp },
              { label: 'Floor', value: pro.keybinds.floor },
              { label: 'Cone', value: pro.keybinds.cone },
              { label: 'Edit', value: pro.keybinds.edit },
              { label: 'Reset', value: pro.keybinds.reset },
            ].map((k) => (
              <div key={k.label} className="p-3 rounded-xl border border-white/10 bg-white/5 text-center">
                <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">{k.label.toUpperCase()}</div>
                <kbd className="inline-block px-2 py-1 rounded bg-neon-blue/20 border border-neon-blue/40 text-neon-blue font-mono text-sm font-bold">{k.value}</kbd>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-gold mb-4">🖱️ GEAR & HARDWARE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(pro.gear).map(([key, value]) => value ? (
              <div key={key} className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">{key.toUpperCase()}</div>
                <div className="font-body text-white font-semibold">{value}</div>
              </div>
            ) : null)}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-white mb-4">🏆 ACHIEVEMENTS</h2>
          <ul className="space-y-2">
            {pro.achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
                <span className="text-neon-gold font-cyber text-sm shrink-0">▸</span>
                <span className="text-white/80 font-body">{a}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-white mb-4">MEHR {pro.style.toUpperCase()}-SENS PROS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {PRO_PLAYERS.filter((p) => p.style === pro.style && p.slug !== pro.slug).slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/pro/${p.slug}`}>
                <a className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] block">
                  <div className="font-cyber text-base text-white font-bold mb-1">{p.name}</div>
                  <div className="text-xs text-white/50 mb-2">{p.team}</div>
                  <div className="text-[10px] font-cyber text-white/40">{p.sensitivity.cm360} cm/360° · DPI {p.sensitivity.dpi}</div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <h2 className="font-cyber text-xl text-white mb-4">Häufige Fragen zu {pro.name}s Settings</h2>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">Welche Sensitivity nutzt {pro.name}?</summary>
            <p className="text-sm text-white/70 mt-2">{pro.name} nutzt {pro.sensitivity.xAxis} X-Axis und {pro.sensitivity.yAxis} Y-Axis bei {pro.sensitivity.dpi} DPI. Entspricht {pro.sensitivity.cm360} cm/360°.</p>
          </details>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">Welche Maus nutzt {pro.name}?</summary>
            <p className="text-sm text-white/70 mt-2">{pro.name} spielt mit {pro.gear.mouse}{pro.gear.mousepad && ` auf ${pro.gear.mousepad}`}.</p>
          </details>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">Wie übernehme ich {pro.name}s Settings?</summary>
            <p className="text-sm text-white/70 mt-2">
              Nutze unseren <Link href="/tools/sensitivity-converter"><a className="text-neon-blue underline">Sensitivity Converter</a></Link> und <Link href="/tools/keybind-optimizer"><a className="text-neon-blue underline">Keybind Optimizer</a></Link>.
            </p>
          </details>
        </article>
      </main>

      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  );
}
