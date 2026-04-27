/**
 * Test Sitemap Generator
 * Run locally to check for errors
 */

import { generateSitemapXML, getSitemapStats } from '../src/lib/sitemap-generator';

console.log('=== Sitemap Stats ===');
const stats = getSitemapStats();
console.log(JSON.stringify(stats, null, 2));

console.log('\n=== Sitemap XML (first 500 chars) ===');
const sitemapXML = generateSitemapXML();
console.log(sitemapXML.substring(0, 500));

console.log('\n=== Checking for empty data ===');
import { GUIDES, getAllGuideSlugs } from '../src/data/guides';
import { NEWS_ARTICLES } from '../src/data/news';
import { LANGUAGES } from '../src/lib/i18n';
import { REGIONS } from './geo-seo';

console.log(`GUIDES count: ${GUIDES.length}`);
console.log(`getAllGuideSlugs count: ${getAllGuideSlugs().length}`);
console.log(`NEWS_ARTICLES count: ${NEWS_ARTICLES.length}`);
console.log(`LANGUAGES count: ${LANGUAGES.length}`);
console.log(`REGIONS count: ${Object.keys(REGIONS).length}`);

console.log('\n=== Sample URLs ===');
const entries = [
  `https://fortnitenexus.space/`,
  `https://fortnitenexus.space/de/guide/fortnite-aim-verbessern-2026`,
  `https://fortnitenexus.space/de/guide/fortnite-aim-verbessern-2026?region=eu-central`,
  `https://fortnitenexus.space/de/news/fortnite-patch-notes-v28-10`,
];
entries.forEach(url => console.log(url));
