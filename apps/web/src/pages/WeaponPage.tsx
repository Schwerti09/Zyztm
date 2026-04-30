import { lazy, Suspense, useCallback } from 'react';
import { Link, useParams } from 'wouter';
import { WEAPONS, type Weapon } from '../data/weapons-data';
import MetaTags from '../components/seo/MetaTags';
import ShareButton from '../components/share/ShareButton';
import { generateWeaponImage, type ShareFormat } from '../lib/share-image';

const Footer = lazy(() => import('../components/Footer'));

const RARITY_COLORS: Record<Weapon['rarity'], string> = {
  Common: '#9CA3AF',
  Uncommon: '#22C55E',
  Rare: '#3B82F6',
  Epic: '#A855F7',
  Legendary: '#F59E0B',
};

const TIER_COLORS: Record<Weapon['tier'], string> = {
  S: '#EF4444',
  A: '#F59E0B',
  B: '#22C55E',
  C: '#3B82F6',
  D: '#9CA3AF',
};

const TYPE_ROLES: Record<Weapon['type'], string> = {
  AR: 'Mid-Range Primary',
  SMG: 'Close-Range Rusher',
  Shotgun: 'Close-Range Burst',
  Sniper: 'Long-Range Precision',
  Pistol: 'Utility / Secondary',
  Explosive: 'Anti-Build / Box-Fight',
};

export default function WeaponPage() {
  const params = useParams<{ slug: string }>();
  const weapon = WEAPONS.find((w) => w.id === params.slug);

  const generateImage = useCallback(async (format: ShareFormat) => {
    if (!weapon) throw new Error('No weapon data');
    return generateWeaponImage(
      {
        name: weapon.name,
        tier: weapon.tier,
        damage: weapon.damage,
        dps: weapon.dps,
        range: weapon.range,
        rarity: weapon.rarity,
      },
      { format },
    );
  }, [weapon]);

  if (!weapon) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="font-cyber text-3xl mb-2">Waffe nicht gefunden</h1>
          <Link href="/weapons">
            <a className="text-neon-pink underline">Zurück zur Waffen-Übersicht</a>
          </Link>
        </div>
      </div>
    );
  }

  const rarityColor = RARITY_COLORS[weapon.rarity];
  const tierColor = TIER_COLORS[weapon.tier];

  // Damage-per-mag & time-to-kill berechnungen
  const damagePerMag = weapon.damage * weapon.magSize;
  const timeToKill = (100 / weapon.dps).toFixed(2); // 100 HP target
  const timeToKillShield = (200 / weapon.dps).toFixed(2); // 100 HP + 100 Shield
  const headshotDamage = weapon.damage * weapon.headshotMultiplier;

  // Alternativen (gleicher Type)
  const alternatives = WEAPONS.filter(
    (w) => w.type === weapon.type && w.id !== weapon.id,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <MetaTags
        title={`${weapon.name} — Damage, DPS & Stats Guide 2026 | Fortnite Nexus`}
        description={`${weapon.name} komplett analysiert: ${weapon.damage} Damage, ${weapon.dps.toFixed(0)} DPS, ${weapon.tier}-Tier. Pro-Tipps, Vergleiche und Loadout-Empfehlungen.`}
        path={`/weapon/${weapon.id}`}
        image="https://fortnitenexus.space/og/og-weapons.png"
        keywords={[`${weapon.name} Fortnite`, `${weapon.name} Stats`, `Fortnite ${weapon.type}`, `${weapon.name} DPS`, 'Fortnite Waffen']}
      />
      <main>
        <nav
          aria-label="Breadcrumb"
          className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 text-xs font-body text-white/40 flex gap-2 flex-wrap"
        >
          <Link href="/">
            <a className="hover:text-neon-pink transition-colors">Home</a>
          </Link>
          <span>/</span>
          <Link href="/weapons">
            <a className="hover:text-neon-pink transition-colors">Waffen</a>
          </Link>
          <span>/</span>
          <span className="text-white/60">{weapon.name}</span>
        </nav>

        {/* HERO */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span
              className="text-[10px] font-cyber tracking-widest px-3 py-1 rounded-full"
              style={{
                background: `${rarityColor}20`,
                color: rarityColor,
                border: `1px solid ${rarityColor}50`,
              }}
            >
              {weapon.rarity.toUpperCase()}
            </span>
            <span
              className="text-[10px] font-cyber tracking-widest px-3 py-1 rounded-full"
              style={{
                background: `${tierColor}20`,
                color: tierColor,
                border: `1px solid ${tierColor}50`,
              }}
            >
              {weapon.tier}-TIER
            </span>
            <span className="text-[10px] font-cyber tracking-widest text-white/40">
              {weapon.type} · {TYPE_ROLES[weapon.type]}
            </span>
          </div>

          <h1 className="font-cyber text-4xl sm:text-6xl font-black text-white mb-3 leading-none">
            {weapon.name}
          </h1>
          <p className="text-white/70 font-body text-lg leading-relaxed max-w-3xl mb-4">
            {weapon.description}
          </p>
          <ShareButton
            generateImage={generateImage}
            filename={`${weapon.id}-fortnite-stats`}
            tweetText={`${weapon.name} Stats: ${weapon.damage} DMG | ${weapon.dps.toFixed(0)} DPS | ${weapon.tier}-Tier — via Fortnite Nexus!`}
            shareUrl={`https://fortnitenexus.space/weapon/${weapon.id}`}
            hashtags={['Fortnite', 'FortniteWeapons', 'FortniteNexus']}
            variant="compact"
          />
        </section>

        {/* CORE STATS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-pink mb-4">
            📊 CORE-STATS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl border border-neon-pink/30 bg-neon-pink/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                DAMAGE
              </div>
              <div className="font-mono text-3xl font-black text-neon-pink">
                {weapon.damage}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-neon-blue/30 bg-neon-blue/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                DPS
              </div>
              <div className="font-mono text-3xl font-black text-neon-blue">
                {weapon.dps.toFixed(0)}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-neon-gold/30 bg-neon-gold/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                FIRE-RATE
              </div>
              <div className="font-mono text-3xl font-black text-neon-gold">
                {weapon.fireRate}
              </div>
              <div className="text-[9px] font-body text-white/40">shots/sec</div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                RANGE
              </div>
              <div className="font-mono text-3xl font-black text-white">
                {weapon.range}m
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                MAG-SIZE
              </div>
              <div className="font-mono text-2xl font-black text-white">
                {weapon.magSize}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                RELOAD
              </div>
              <div className="font-mono text-2xl font-black text-white">
                {weapon.reloadTime}s
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                HEADSHOT-MULT
              </div>
              <div className="font-mono text-2xl font-black text-white">
                {weapon.headshotMultiplier}×
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-1">
                DAMAGE/MAG
              </div>
              <div className="font-mono text-2xl font-black text-white">
                {damagePerMag}
              </div>
            </div>
          </div>
        </section>

        {/* COMBAT CALCS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-blue mb-4">
            ⚔️ COMBAT-BERECHNUNG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-2">
                TIME-TO-KILL (100 HP)
              </div>
              <div className="font-mono text-3xl font-black text-green-400 mb-1">
                {timeToKill}s
              </div>
              <div className="text-xs text-white/50 font-body">
                Gegner ohne Schild
              </div>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-2">
                TIME-TO-KILL (100 HP + 100 SHIELD)
              </div>
              <div className="font-mono text-3xl font-black text-amber-400 mb-1">
                {timeToKillShield}s
              </div>
              <div className="text-xs text-white/50 font-body">
                Vollgeschildeter Gegner
              </div>
            </div>
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
              <div className="text-[10px] font-cyber tracking-widest text-white/40 mb-2">
                HEADSHOT-DAMAGE
              </div>
              <div className="font-mono text-3xl font-black text-red-400 mb-1">
                {headshotDamage}
              </div>
              <div className="text-xs text-white/50 font-body">
                {Math.ceil(200 / headshotDamage)} Headshots = Full-Kill
              </div>
            </div>
          </div>
        </section>

        {/* PRO TIPS */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="font-cyber text-xl sm:text-2xl font-bold text-neon-gold mb-4">
            💡 PRO-TIPPS
          </h2>
          <ul className="space-y-3">
            {generateTips(weapon).map((tip, i) => (
              <li
                key={i}
                className="flex gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
              >
                <span className="text-neon-gold font-cyber text-lg shrink-0">
                  {i + 1}.
                </span>
                <span className="text-sm text-white/80 font-body leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ALTERNATIVES */}
        {alternatives.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
            <h2 className="font-cyber text-xl sm:text-2xl font-bold text-white mb-4">
              🔀 ALTERNATIVEN ({weapon.type})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {alternatives.map((alt) => (
                <Link key={alt.id} href={`/weapon/${alt.id}`}>
                  <a className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition-all block">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-[9px] font-cyber tracking-widest px-2 py-0.5 rounded"
                        style={{
                          background: `${TIER_COLORS[alt.tier]}20`,
                          color: TIER_COLORS[alt.tier],
                        }}
                      >
                        {alt.tier}
                      </span>
                    </div>
                    <div className="font-cyber text-sm font-bold text-white mb-1 leading-tight">
                      {alt.name}
                    </div>
                    <div className="text-[10px] text-white/50 font-body">
                      DMG {alt.damage} · DPS {alt.dps.toFixed(0)}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* LOADOUT CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
          <div className="p-6 rounded-2xl border border-neon-pink/30 bg-gradient-to-br from-neon-pink/10 to-neon-blue/5 text-center">
            <h3 className="font-cyber text-xl font-bold text-white mb-2">
              OPTIMALES LOADOUT MIT DIESER WAFFE
            </h3>
            <p className="text-sm text-white/70 font-body mb-4 max-w-xl mx-auto">
              Nutze unseren Loadout Optimizer um die perfekte 5-Slot-Kombination für
              deinen Spielstil zu finden.
            </p>
            <Link href="/tools/loadout-optimizer">
              <a className="inline-block px-6 py-3 rounded-xl bg-neon-pink text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform">
                LOADOUT OPTIMIZER ÖFFNEN →
              </a>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-10">
          <h2 className="font-cyber text-xl text-white mb-4">
            FAQ zu {weapon.name}
          </h2>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Wie viel Damage macht die {weapon.name}?
            </summary>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              {weapon.damage} Damage pro Schuss ({headshotDamage} Headshot). Das
              entspricht {weapon.dps.toFixed(0)} DPS.
            </p>
          </details>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Ist die {weapon.name} Meta?
            </summary>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              {weapon.tier === 'S' &&
                'Ja — S-Tier und absolut Meta. Pflicht-Waffe für Competitive.'}
              {weapon.tier === 'A' &&
                'Solide A-Tier Waffe. Competitive-viable, aber nicht dominant.'}
              {weapon.tier === 'B' &&
                'B-Tier. Brauchbar in Pubs, aber nicht optimal für Ranked.'}
              {(weapon.tier === 'C' || weapon.tier === 'D') &&
                'Low-Tier. Nur als Notlösung oder für Spaß-Runs.'}
            </p>
          </details>
          <details className="mb-2 p-4 rounded-xl border border-white/10 bg-white/5">
            <summary className="font-cyber text-sm text-neon-pink cursor-pointer">
              Welcher Slot für die {weapon.name}?
            </summary>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">
              {TYPE_ROLES[weapon.type]} — nutze Slot 1 oder 2 für schnellen Zugriff.
            </p>
          </details>
        </article>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

function generateTips(weapon: Weapon): string[] {
  const tips: string[] = [];

  if (weapon.type === 'AR') {
    tips.push(
      `Burst-Fire auf mittlere Distanz (30-60m). Volle Mag nur in Close-Range-Situationen.`,
    );
    tips.push('Erster Schuss ist am präzisesten — nutze Tap-Fire für Long-Range-Peeks.');
  }
  if (weapon.type === 'Shotgun') {
    tips.push(
      'Nur in 0-15m nutzen. Darüber ist der Spread zu hoch.',
    );
    tips.push('Pre-Shot beim Editen — nicht warten bis Gegner sichtbar ist.');
  }
  if (weapon.type === 'SMG') {
    tips.push('Perfekt für Wall-Replacement-Pushes und Box-Fights.');
    tips.push('Nutze Hipfire in Close-Range, ADS nur über 20m.');
  }
  if (weapon.type === 'Sniper') {
    tips.push(
      `Lead Target bei >100m Distanz. Projektil-Geschwindigkeit berücksichtigen.`,
    );
    tips.push('Nach jedem Schuss sofort Position wechseln — sonst Counter-Sniper.');
  }
  if (weapon.type === 'Explosive') {
    tips.push('Nur gegen Mega-Builds im Endgame verwenden, nicht als Primary.');
    tips.push('Self-Damage beachten — mindestens 3m Abstand halten.');
  }

  if (weapon.headshotMultiplier >= 2) {
    tips.push(
      `Crosshair-Placement auf Kopfhöhe — ${weapon.headshotMultiplier}× Headshot-Multiplier ist massiv.`,
    );
  }

  if (weapon.reloadTime > 2.5) {
    tips.push(
      `Lange Reload-Zeit (${weapon.reloadTime}s) — reload nur hinter Deckung, nie mid-fight.`,
    );
  }

  if (weapon.tier === 'S') {
    tips.push('Pflicht-Loadout-Slot in Ranked und Competitive.');
  }

  return tips;
}
