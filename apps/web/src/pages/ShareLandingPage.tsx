import { lazy, Suspense, useCallback, useMemo } from 'react';
import { Link, useParams } from 'wouter';
import MetaTags from '../components/seo/MetaTags';
import ShareButton from '../components/share/ShareButton';
import {
  generateSensitivityImage,
  generateLoadoutImage,
  generateStatsImage,
  generateWeaponImage,
  generateProImage,
  type ShareFormat,
} from '../lib/share-image';
import { getProBySlug } from '../data/pro-players';
import { WEAPONS } from '../data/weapons-data';

const Footer = lazy(() => import('../components/Footer'));

const DOMAIN = 'https://fortnitenexus.space';

interface ShareConfig {
  title: string;
  description: string;
  ogImage: string;
  tweetText: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
}

function resolveShareConfig(type: string, id: string): ShareConfig | null {
  switch (type) {
    case 'pro': {
      const pro = getProBySlug(id);
      if (!pro) return null;
      return {
        title: `${pro.name} Fortnite Settings 2026 | Fortnite Nexus`,
        description: `${pro.name} (${pro.team}) spielt mit Sensitivity ${pro.sensitivity.xAxis}, ${pro.sensitivity.dpi} DPI, ${pro.sensitivity.cm360} cm/360\u00b0. Alle Keybinds und Gear.`,
        ogImage: `${DOMAIN}/og/og-pros.png`,
        tweetText: `${pro.name} Fortnite Settings: ${pro.sensitivity.xAxis} Sens | ${pro.sensitivity.dpi} DPI | ${pro.sensitivity.cm360} cm/360\u00b0 \u2014 via Fortnite Nexus! Creator Code: ZYZTM`,
        ctaLabel: `${pro.name} Settings ansehen`,
        ctaHref: `/pro/${pro.slug}`,
        accentColor: '#ff0055',
      };
    }
    case 'weapon': {
      const weapon = WEAPONS.find((w) => w.id === id);
      if (!weapon) return null;
      return {
        title: `${weapon.name} \u2014 ${weapon.damage} DMG, ${weapon.dps.toFixed(0)} DPS | Fortnite Nexus`,
        description: `${weapon.name}: ${weapon.tier}-Tier, ${weapon.damage} Damage, ${weapon.dps.toFixed(0)} DPS, ${weapon.range}m Range. Kompletter Stats-Guide.`,
        ogImage: `${DOMAIN}/og/og-weapons.png`,
        tweetText: `${weapon.name}: ${weapon.damage} DMG | ${weapon.dps.toFixed(0)} DPS | ${weapon.tier}-Tier \u2014 via Fortnite Nexus! Creator Code: ZYZTM`,
        ctaLabel: `${weapon.name} Stats ansehen`,
        ctaHref: `/weapon/${weapon.id}`,
        accentColor: '#f5c518',
      };
    }
    case 'sensitivity':
      return {
        title: 'Meine Fortnite Sensitivity | Fortnite Nexus',
        description: 'Sensitivity-Konvertierung erstellt mit dem Fortnite Nexus Sensitivity Converter Pro. 8 Spiele, cm/360\u00b0-Methode.',
        ogImage: `${DOMAIN}/og/og-tools.png`,
        tweetText: 'Meine Fortnite Sensitivity \u2014 konvertiert mit Fortnite Nexus! Creator Code: ZYZTM',
        ctaLabel: 'Mach deins selbst',
        ctaHref: '/tools/sensitivity-converter',
        accentColor: '#ff0055',
      };
    case 'loadout':
      return {
        title: 'Mein optimiertes Fortnite Loadout | Fortnite Nexus',
        description: 'AI-optimiertes Loadout vom Fortnite Nexus Loadout Optimizer. 4-Dimensionen Scoring.',
        ogImage: `${DOMAIN}/og/og-tools.png`,
        tweetText: 'Mein optimiertes Fortnite Loadout \u2014 via Fortnite Nexus! Creator Code: ZYZTM',
        ctaLabel: 'Mach deins selbst',
        ctaHref: '/tools/loadout-optimizer',
        accentColor: '#00f2ff',
      };
    case 'stats':
      return {
        title: 'Meine Fortnite Stats | Fortnite Nexus',
        description: 'Fortnite Stats analysiert mit dem Fortnite Nexus Stats Dashboard. 4 Skill-Dimensionen + AI-Insights.',
        ogImage: `${DOMAIN}/og/og-tools.png`,
        tweetText: 'Meine Fortnite Stats \u2014 analysiert mit Fortnite Nexus! Creator Code: ZYZTM',
        ctaLabel: 'Mach deins selbst',
        ctaHref: '/tools/stats-dashboard',
        accentColor: '#22c55e',
      };
    default:
      return null;
  }
}

function getImageGenerator(type: string, id: string): ((format: ShareFormat) => Promise<Blob>) | null {
  switch (type) {
    case 'pro': {
      const pro = getProBySlug(id);
      if (!pro) return null;
      return (format: ShareFormat) =>
        generateProImage(
          { name: pro.name, team: pro.team, sens: pro.sensitivity.xAxis, dpi: pro.sensitivity.dpi, cm360: pro.sensitivity.cm360, country: pro.country },
          { format },
        );
    }
    case 'weapon': {
      const weapon = WEAPONS.find((w) => w.id === id);
      if (!weapon) return null;
      return (format: ShareFormat) =>
        generateWeaponImage(
          { name: weapon.name, tier: weapon.tier, damage: weapon.damage, dps: weapon.dps, range: weapon.range, rarity: weapon.rarity },
          { format },
        );
    }
    case 'sensitivity':
      return (format: ShareFormat) =>
        generateSensitivityImage({ dpi: 800, cm360: 33.8, xy: 0.08, games: ['Fortnite', 'Valorant'] }, { format });
    case 'loadout':
      return (format: ShareFormat) =>
        generateLoadoutImage(
          { weapons: [{ name: 'Assault Rifle', tier: 'S', slot: 1 }, { name: 'Pump Shotgun', tier: 'S', slot: 2 }, { name: 'SMG', tier: 'A', slot: 3 }, { name: 'Med-Kit', tier: 'B', slot: 4 }, { name: 'Sniper', tier: 'A', slot: 5 }], style: 'Balanced', phase: 'Mid-Game', score: 82 },
          { format },
        );
    case 'stats':
      return (format: ShareFormat) =>
        generateStatsImage({ username: 'Fortnite Spieler', kd: 1.8, winRate: 9.5, wins: 120, skillScore: 72, rank: 'Platinum' }, { format });
    default:
      return null;
  }
}

export default function ShareLandingPage() {
  const params = useParams<{ type: string; id: string }>();
  const { type, id } = params;

  const config = useMemo(() => resolveShareConfig(type, id), [type, id]);
  const imageGen = useMemo(() => getImageGenerator(type, id), [type, id]);

  const generateImage = useCallback(
    async (format: ShareFormat) => {
      if (!imageGen) throw new Error('No generator');
      return imageGen(format);
    },
    [imageGen],
  );

  if (!config) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="font-cyber text-3xl mb-4">Inhalt nicht gefunden</h1>
          <p className="text-white/60 font-body mb-6">
            Dieser geteilte Link ist leider nicht mehr verf\u00fcgbar.
          </p>
          <Link href="/">
            <a className="px-6 py-3 rounded-xl bg-neon-pink/20 border border-neon-pink/50 text-neon-pink font-cyber text-sm tracking-widest hover:bg-neon-pink/30 transition-colors">
              ZUR\u00dcCK ZUR STARTSEITE
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <MetaTags
        title={config.title}
        description={config.description}
        path={`/share/${type}/${id}`}
        image={config.ogImage}
      />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: config.accentColor }} />
            <span className="text-[10px] font-cyber tracking-widest text-white/40">
              SHARED VIA FORTNITE NEXUS
            </span>
          </div>

          <h1 className="font-cyber text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {config.title.split('|')[0].trim()}
          </h1>
          <p className="text-white/60 font-body text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {config.description}
          </p>

          {/* Share Actions */}
          {imageGen && (
            <div className="flex justify-center mb-10">
              <ShareButton
                generateImage={generateImage}
                filename={`fortnite-nexus-${type}-${id}`}
                tweetText={config.tweetText}
                shareUrl={`${DOMAIN}/share/${type}/${id}`}
                hashtags={['Fortnite', 'FortniteNexus']}
                variant="primary"
                label="AUCH TEILEN"
              />
            </div>
          )}

          {/* CTA */}
          <Link href={config.ctaHref}>
            <a
              className="inline-block px-8 py-4 rounded-2xl font-cyber text-lg tracking-widest text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${config.accentColor}40, ${config.accentColor}20)`,
                border: `2px solid ${config.accentColor}80`,
                boxShadow: `0 0 30px ${config.accentColor}30`,
              }}
            >
              {config.ctaLabel.toUpperCase()} \u2192
            </a>
          </Link>
        </div>

        {/* SAC Reminder */}
        <div className="text-center p-6 rounded-2xl border border-neon-pink/20 bg-neon-pink/5 mt-10">
          <p className="text-xs font-cyber tracking-widest text-white/40 mb-2">
            SUPPORT A CREATOR
          </p>
          <p className="font-cyber text-2xl font-black text-neon-pink mb-2">ZYZTM</p>
          <p className="text-sm font-body text-white/50">
            Nutze Code <strong className="text-neon-pink">ZYZTM</strong> im Fortnite Item Shop.
            Kostet dich nichts, unterst\u00fctzt die Plattform.
          </p>
        </div>

        {/* More Tools CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10">
          <Link href="/tools/sensitivity-converter">
            <a className="block p-4 rounded-xl border border-neon-pink/20 bg-neon-pink/5 hover:bg-neon-pink/10 transition-colors text-center">
              <div className="text-2xl mb-2">\ud83c\udfaf</div>
              <div className="font-cyber text-xs tracking-widest text-neon-pink">SENS CONVERTER</div>
            </a>
          </Link>
          <Link href="/tools/loadout-optimizer">
            <a className="block p-4 rounded-xl border border-neon-blue/20 bg-neon-blue/5 hover:bg-neon-blue/10 transition-colors text-center">
              <div className="text-2xl mb-2">\ud83d\udce6</div>
              <div className="font-cyber text-xs tracking-widest text-neon-blue">LOADOUT OPTIMIZER</div>
            </a>
          </Link>
          <Link href="/tools/stats-dashboard">
            <a className="block p-4 rounded-xl border border-neon-gold/20 bg-neon-gold/5 hover:bg-neon-gold/10 transition-colors text-center">
              <div className="text-2xl mb-2">\ud83d\udcca</div>
              <div className="font-cyber text-xs tracking-widest text-neon-gold">STATS DASHBOARD</div>
            </a>
          </Link>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
