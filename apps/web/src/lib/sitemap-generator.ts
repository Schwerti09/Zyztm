/**
 * Sitemap Generator for Fortnite Nexus
 * Generates sitemap XML including all regional and language variants
 * ENHANCED: Multi-language support for 10 languages
 */

import { GUIDES, getAllGuideSlugs } from '../data/guides';
import { NEWS_ARTICLES } from '../data/news';
import { REGIONS } from './geo-seo';
import { LANGUAGES, type Language } from './i18n';

const BASE_URL = 'https://fortnitenexus.netlify.app';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate complete sitemap with all guides, regions, and language variants
 */
export function generateCompleteSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Base pages
  entries.push({ url: BASE_URL, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 1.0 });
  entries.push({ url: `${BASE_URL}/news`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.9 });

  // Guide pages with all language variants
  getAllGuideSlugs().forEach(slug => {
    LANGUAGES.forEach(lang => {
      const guide = GUIDES.find(g => g.slug === slug);
      if (guide) {
        entries.push({
          url: `${BASE_URL}/${lang.code}/guide/${slug}`,
          lastmod: guide.lastUpdated,
          changefreq: 'weekly',
          priority: 0.8,
        });

        // Add regional variants for each language
        Object.values(REGIONS).forEach(regionData => {
          entries.push({
            url: `${BASE_URL}/${lang.code}/guide/${slug}?region=${regionData.id}`,
            lastmod: guide.lastUpdated,
            changefreq: 'weekly',
            priority: 0.7,
          });
        });
      }
    });
  });

  // News pages with all language variants
  NEWS_ARTICLES.forEach(article => {
    LANGUAGES.forEach(lang => {
      entries.push({
        url: `${BASE_URL}/${lang.code}/news/${article.slug}`,
        lastmod: article.publishedAt,
        changefreq: 'daily',
        priority: 0.7,
      });
    });
  });

  return entries;
}

/**
 * Generate XML sitemap string
 */
export function generateSitemapXML(): string {
  const entries = generateCompleteSitemap();

  const xmlEntries = entries.map((entry) => {
    return `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join('')}
</urlset>`;
}

/**
 * Generate sitemap index for multiple sitemaps (if needed)
 */
export function generateSitemapIndexXML(): string {
  const sitemaps = [];

  // Main sitemap
  sitemaps.push({
    loc: 'https://fortnitenexus.netlify.app/sitemap.xml',
    lastModified: new Date().toISOString(),
  });

  const xmlEntries = sitemaps.map((sitemap) => {
    return `
  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastModified}</lastmod>
  </sitemap>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries.join('')}
</sitemapindex>`;
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats() {
  const entries = generateCompleteSitemap();
  const guideEntries = entries.filter(e => e.url.includes('/guide/'));
  const newsEntries = entries.filter(e => e.url.includes('/news/'));
  const regionalEntries = entries.filter(e => e.url.includes('?region='));

  return {
    total: entries.length,
    guides: guideEntries.length,
    news: newsEntries.length,
    regional: regionalEntries.length,
    languages: LANGUAGES.length,
    regions: Object.keys(REGIONS).length,
  };
}
