/**
 * RSS Feed Generator for Fortnite Nexus News
 * Generates RSS 2.0 compliant feed for news articles
 */

import { NEWS_ARTICLES } from '../data/news';

export interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  category: string;
  guid: string;
}

/**
 * Generate RSS 2.0 feed for news articles
 */
export function generateRSSFeed(): string {
  const siteUrl = 'https://fortnitenexus.netlify.app';
  const feedTitle = 'Fortnite Nexus News';
  const feedDescription = 'Die neuesten Fortnite News, Patch Notes und Updates';
  const feedLanguage = 'de-de';

  const items = NEWS_ARTICLES.map((article) => ({
    title: article.title,
    description: article.excerpt,
    link: `${siteUrl}/news/${article.slug}`,
    pubDate: new Date(article.publishedAt).toUTCString(),
    category: article.category,
    guid: `${siteUrl}/news/${article.slug}`,
  }));

  const itemXML = items
    .map(
      (item) => `
    <item>
      <title>${escapeXML(item.title)}</title>
      <description>${escapeXML(item.description)}</description>
      <link>${item.link}</link>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <language>${feedLanguage}</language>
    <link>${siteUrl}/news</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemXML}
  </channel>
</rss>`;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate RSS feed for specific category
 */
export function generateCategoryRSSFeed(category: string): string {
  const siteUrl = 'https://fortnitenexus.netlify.app';
  const feedTitle = `Fortnite Nexus News - ${category}`;
  const feedDescription = `Die neuesten Fortnite ${category} News und Updates`;

  const items = NEWS_ARTICLES
    .filter((article) => article.category === category)
    .map((article) => ({
      title: article.title,
      description: article.excerpt,
      link: `${siteUrl}/news/${article.slug}`,
      pubDate: new Date(article.publishedAt).toUTCString(),
      category: article.category,
      guid: `${siteUrl}/news/${article.slug}`,
    }));

  const itemXML = items
    .map(
      (item) => `
    <item>
      <title>${escapeXML(item.title)}</title>
      <description>${escapeXML(item.description)}</description>
      <link>${item.link}</link>
      <pubDate>${item.pubDate}</pubDate>
      <category>${item.category}</category>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <description>${feedDescription}</description>
    <language>de-de</language>
    <link>${siteUrl}/news</link>
    <atom:link href="${siteUrl}/rss/${category}.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${itemXML}
  </channel>
</rss>`;
}
