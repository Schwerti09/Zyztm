// Generates sitemap.xml including all programmatic pages (pros + weapons)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOMAIN = 'https://fortnitenexus.space';
const today = new Date().toISOString().slice(0, 10);

// Parse pro slugs
const proFile = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'pro-players.ts'),
  'utf-8',
);
const proSlugs = [...proFile.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

// Parse weapon IDs
const weaponFile = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'weapons-data.ts'),
  'utf-8',
);
const weaponIds = [...weaponFile.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

// Static routes
const staticRoutes = [
  { loc: '/', priority: 1.0, changefreq: 'daily' },
  { loc: '/news', priority: 0.9, changefreq: 'daily' },
  { loc: '/item-shop', priority: 0.95, changefreq: 'daily' },
  { loc: '/pros', priority: 0.9, changefreq: 'weekly' },
  { loc: '/weapons', priority: 0.9, changefreq: 'weekly' },
  { loc: '/tools', priority: 0.95, changefreq: 'weekly' },
  { loc: '/tools/sensitivity-converter', priority: 0.9, changefreq: 'monthly' },
  { loc: '/tools/loadout-optimizer', priority: 0.9, changefreq: 'weekly' },
  { loc: '/tools/stats-dashboard', priority: 0.9, changefreq: 'weekly' },
  { loc: '/tools/drop-locations', priority: 0.85, changefreq: 'weekly' },
  { loc: '/tools/build-trainer', priority: 0.85, changefreq: 'monthly' },
  { loc: '/tools/meta-predictor', priority: 0.85, changefreq: 'weekly' },
  { loc: '/tools/keybind-optimizer', priority: 0.8, changefreq: 'monthly' },
  { loc: '/tools/rotation-planner', priority: 0.8, changefreq: 'weekly' },
  { loc: '/shop', priority: 0.7, changefreq: 'weekly' },
];

const guideRoutes = [
  'fortnite-aim-verbessern-2026',
  'fortnite-best-settings-2026',
  'fortnite-building-guide',
  'fortnite-ranked-tipps',
  'hardware-gaming-pc-budget-2026',
  'hardware-gaming-maus-empfehlung',
  'obs-stream-einstellungen-2026',
  'windows-gaming-optimierung',
].map((slug) => ({
  loc: `/de/guide/${slug}`,
  priority: 0.8,
  changefreq: 'weekly',
}));

const guideCategoryRoutes = ['fortnite', 'hardware', 'stream', 'settings', 'ranked'].map(
  (slug) => ({
    loc: `/de/guides/${slug}`,
    priority: 0.8,
    changefreq: 'weekly',
  }),
);

const proRoutes = proSlugs.map((slug) => ({
  loc: `/pro/${slug}`,
  priority: 0.75,
  changefreq: 'monthly',
}));

const weaponRoutes = weaponIds.map((id) => ({
  loc: `/weapon/${id}`,
  priority: 0.7,
  changefreq: 'monthly',
}));

const allRoutes = [
  ...staticRoutes,
  ...guideRoutes,
  ...guideCategoryRoutes,
  ...proRoutes,
  ...weaponRoutes,
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${DOMAIN}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`✓ Sitemap generated with ${allRoutes.length} URLs → ${outPath}`);
console.log(`  Static: ${staticRoutes.length}`);
console.log(`  Guides: ${guideRoutes.length + guideCategoryRoutes.length}`);
console.log(`  Pros: ${proRoutes.length}`);
console.log(`  Weapons: ${weaponRoutes.length}`);
