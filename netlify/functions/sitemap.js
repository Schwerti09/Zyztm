/**
 * GET /sitemap.xml → /.netlify/functions/sitemap
 *
 * Dynamically generates an XML sitemap covering:
 * - Static pages (/, /impressum, /datenschutz, /agb, /coins)
 * - Guide hub pages (/de/guides/:category)
 * - Individual guide pages (/de/guide/:slug)
 *
 * Re-indexing trigger: every deploy regenerates the sitemap with current lastmod dates.
 */

const BASE_URL = 'https://zyztm.com';

/** Guide slugs and metadata – keep in sync with apps/web/src/data/guides.ts */
const GUIDES = [
  { slug: 'fortnite-aim-verbessern-2026', category: 'fortnite', lastmod: '2026-02-01', priority: '0.9' },
  { slug: 'fortnite-best-settings-2026', category: 'settings', lastmod: '2026-01-28', priority: '0.9' },
  { slug: 'fortnite-building-guide', category: 'fortnite', lastmod: '2026-02-10', priority: '0.8' },
  { slug: 'fortnite-ranked-tipps', category: 'ranked', lastmod: '2026-02-15', priority: '0.8' },
  { slug: 'hardware-gaming-pc-budget-2026', category: 'hardware', lastmod: '2026-01-20', priority: '0.8' },
  { slug: 'hardware-gaming-maus-empfehlung', category: 'hardware', lastmod: '2026-01-15', priority: '0.7' },
  { slug: 'obs-stream-einstellungen-2026', category: 'stream', lastmod: '2026-02-05', priority: '0.8' },
  { slug: 'windows-gaming-optimierung', category: 'settings', lastmod: '2026-02-20', priority: '0.8' },
];

const HUB_CATEGORIES = ['fortnite', 'hardware', 'stream', 'settings', 'ranked'];

const STATIC_PAGES = [
  { url: '/', lastmod: '2026-02-01', priority: '1.0', changefreq: 'weekly' },
  { url: '/coins', lastmod: '2026-01-15', priority: '0.7', changefreq: 'monthly' },
  { url: '/impressum', lastmod: '2025-06-01', priority: '0.3', changefreq: 'yearly' },
  { url: '/datenschutz', lastmod: '2025-06-01', priority: '0.3', changefreq: 'yearly' },
  { url: '/agb', lastmod: '2025-06-01', priority: '0.3', changefreq: 'yearly' },
];

function urlEntry({ loc, lastmod, changefreq = 'monthly', priority = '0.7' }) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const handler = async () => {
  const entries = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry({ loc: `${BASE_URL}${page.url}`, ...page }));
  }

  // Hub pages
  for (const cat of HUB_CATEGORIES) {
    entries.push(urlEntry({
      loc: `${BASE_URL}/de/guides/${cat}`,
      lastmod: '2026-02-01',
      changefreq: 'weekly',
      priority: '0.8',
    }));
  }

  // Individual guide pages
  for (const guide of GUIDES) {
    entries.push(urlEntry({
      loc: `${BASE_URL}/de/guide/${guide.slug}`,
      lastmod: guide.lastmod,
      changefreq: 'monthly',
      priority: guide.priority,
    }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.join('\n')}
</urlset>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
    body: xml,
  };
};
