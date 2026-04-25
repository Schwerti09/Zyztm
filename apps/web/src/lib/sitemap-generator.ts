/**
 * Sitemap Generator for Fortnite Nexus
 * Generates sitemap with all regional variants for maximum SEO coverage
 * 
 * This creates 252+ URLs (12 regions × 21 guides) for complete indexing
 */

import { GUIDES } from '../data/guides';
import { REGIONS, type Region } from './geo-seo';

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generate complete sitemap with all regional variants
 */
export function generateCompleteSitemap(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Base pages
  entries.push({
    url: 'https://fortnitenexus.netlify.app/',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // Hub pages
  entries.push({
    url: 'https://fortnitenexus.netlify.app/de/guides/fortnite',
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  });

  // Base guide URLs
  GUIDES.forEach((guide) => {
    entries.push({
      url: `https://fortnitenexus.netlify.app/de/guide/${guide.slug}`,
      lastModified: guide.lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Regional variants for each guide
  GUIDES.forEach((guide) => {
    Object.keys(REGIONS).forEach((regionKey) => {
      const region = regionKey as Region;
      const regionData = REGIONS[region];

      // Regional variant URL
      entries.push({
        url: `https://fortnitenexus.netlify.app/de/guide/${guide.slug}?region=${region}`,
        lastModified: guide.lastUpdated,
        changeFrequency: 'weekly',
        priority: 0.7,
      });

      // Language-specific variant (if different from English)
      if (regionData.primaryLanguage !== 'English') {
        entries.push({
          url: `https://fortnitenexus.netlify.app/de/guide/${guide.slug}?region=${region}&lang=${regionData.primaryLanguage.toLowerCase()}`,
          lastModified: guide.lastUpdated,
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
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
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
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
  const regions = Object.keys(REGIONS);
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
  const guides = GUIDES.length;
  const regions = Object.keys(REGIONS).length;
  const regionalVariants = guides * regions;
  const totalUrls = entries.length;

  return {
    totalUrls,
    guides,
    regions,
    regionalVariants,
    baseUrls: guides + 2, // guides + home + hub
    languageVariants: entries.filter((e) => e.url.includes('lang=')).length,
  };
}
