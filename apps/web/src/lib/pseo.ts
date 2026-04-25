/**
 * Programmatic SEO (pSEO) utilities for Fortnite Nexus
 * Generates structured data, meta tags, and content helpers for Guide pages
 * Implements HowTo + FAQPage + Speakable schema for Google AEO / 2026 algorithms
 * 
 * ENHANCED: Geo-SEO integration for worldwide targeting
 */

import { generateGeoSchema, type Region, REGIONS } from './geo-seo';

export type GuideCategory = 'fortnite' | 'hardware' | 'stream' | 'settings' | 'ranked';

export interface FAQ {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  metric?: string;
}

export interface CliCommand {
  description: string;
  command: string;
  output: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface GuideData {
  slug: string;
  title: string;
  /** First ~150 chars — answers the user question directly (AEO-ready) */
  description: string;
  /** One-sentence direct answer for the first 100 words (featured snippet bait) */
  directAnswer: string;
  category: GuideCategory;
  keywords: string[];
  lastUpdated: string;
  readingTimeMin: number;
  faqs: FAQ[];
  steps: HowToStep[];
  relatedSlugs: string[];
  beforeAfter?: BeforeAfter;
  cliCommands?: CliCommand[];
  /** "Was andere Guides nicht sagen" section */
  hiddenInsight: string;
  /** "Mein persönlicher Tipp als Fortnite-Profi" section */
  expertTip: string;
  content: ContentSection[];
}

// ---------------------------------------------------------------------------
// Author / E-E-A-T data
// ---------------------------------------------------------------------------

export const AUTHOR = {
  name: 'Rolf Schwertfechter',
  handle: '@FortniteNexusDE',
  title: 'Fortnite Pro-Streamer & Content Creator',
  bio: 'Rolf streamt seit 2020 täglich Fortnite auf Kick und YouTube. Mit über 5 Jahren Erfahrung in kompetitivem Fortnite und PC-Optimierung teilt er sein Wissen mit der Community. Über 10.000 Stunden Spielzeit, Unreal-Rang, und regelmäßige Tests mit Capture-Software und Frame-Counter.',
  experience: '5+ Jahre kompetitives Fortnite · 10.000+ Stunden Spielzeit · Unreal-Rang',
  sources: [
    'Epic Games offizielle Patch Notes',
    'Fortnite Competitive Subreddit (r/FortniteCompetitive)',
    'ProSettings.net Hardware-Daten',
    'Eigene Test-Sessions mit CapFrameX & MSI Afterburner',
    'NVIDIA GeForce Game Ready Driver Changelogs',
  ],
  socials: {
    kick: 'https://youtube.com/@FortniteNexusDE',
    youtube: 'https://www.youtube.com/@FortniteNexusDE',
    tiktok: 'https://www.tiktok.com/@fortnitenexus',
    discord: 'https://discord.gg/fortnitenexus',
  },
} as const;

// ---------------------------------------------------------------------------
// Schema generators
// ---------------------------------------------------------------------------

export function generateHowToSchema(guide: GuideData, pageUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.title,
    description: guide.description,
    dateModified: guide.lastUpdated,
    inLanguage: 'de-DE',
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: `https://fortnitenexus.netlify.app/de/author`,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    step: guide.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: { '@type': 'ImageObject', url: step.image } } : {}),
    })),
    totalTime: `PT${guide.readingTimeMin * 2}M`, // ×2: reading time + implementation/practice time
  };
}

export function generateFAQSchema(faqs: FAQ[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateSpeakableSchema(cssSelectors: string[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}

export function generateArticleSchema(guide: GuideData, pageUrl: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    inLanguage: 'de-DE',
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: `https://fortnitenexus.netlify.app/de/author`,
      description: AUTHOR.bio,
      knowsAbout: ['Fortnite', 'PC Gaming', 'Stream Setup', 'Game Optimization', 'NVIDIA Settings'],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fortnite Nexus',
      url: 'https://fortnitenexus.netlify.app',
      logo: { '@type': 'ImageObject', url: 'https://fortnitenexus.netlify.app/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    keywords: guide.keywords.join(', '),
    about: { '@type': 'Thing', name: guide.category },
  };
}

export function generateBreadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** Combine all schemas for a guide into a JSON string (inject into a script tag) */
export function buildAllSchemas(guide: GuideData, pageUrl: string): string {
  const schemas = [
    generateArticleSchema(guide, pageUrl),
    generateHowToSchema(guide, pageUrl),
    generateFAQSchema(guide.faqs),
    generateSpeakableSchema(['[data-speakable]', '.guide-direct-answer', 'h1']),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://fortnitenexus.netlify.app/' },
      { name: 'Guides', url: `https://fortnitenexus.netlify.app/de/guides/${guide.category}` },
      { name: guide.title, url: pageUrl },
    ]),
  ];
  return JSON.stringify(schemas);
}

// ---------------------------------------------------------------------------
// Meta tag helpers
// ---------------------------------------------------------------------------

export interface MetaTags {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  articleAuthor: string;
  articleModified: string;
}

export function generateMetaTags(guide: GuideData, pageUrl: string): MetaTags {
  return {
    title: `${guide.title} | Fortnite Nexus`,
    description: guide.description,
    canonical: pageUrl,
    robots: 'index, follow',
    ogTitle: guide.title,
    ogDescription: guide.description,
    ogUrl: pageUrl,
    twitterTitle: guide.title,
    twitterDescription: guide.description,
    articleAuthor: AUTHOR.name,
    articleModified: guide.lastUpdated,
  };
}

// ---------------------------------------------------------------------------
// Internal linking helper
// ---------------------------------------------------------------------------

/** Return 8–12 related guides for contextual internal linking */
export function getRelatedGuides(
  guide: GuideData,
  allGuides: GuideData[],
  limit = 10
): GuideData[] {
  const bySlug = allGuides.filter(
    (g) => g.slug !== guide.slug && guide.relatedSlugs.includes(g.slug)
  );
  const byCategory = allGuides.filter(
    (g) =>
      g.slug !== guide.slug &&
      g.category === guide.category &&
      !guide.relatedSlugs.includes(g.slug)
  );
  const combined = [
    ...new Map([...bySlug, ...byCategory].map((g) => [g.slug, g])).values(),
  ];
  return combined.slice(0, Math.min(limit, 12));
}

/** Hub categories with labels and slugs */
export const HUB_CATEGORIES: Array<{
  slug: GuideCategory;
  label: string;
  emoji: string;
  description: string;
}> = [
  {
    slug: 'fortnite',
    label: 'Fortnite Guides',
    emoji: '🎮',
    description:
      'Tipps, Tricks und Strategien für Fortnite – von Basics bis Unreal-Rang.',
  },
  {
    slug: 'settings',
    label: 'Settings & Config',
    emoji: '⚙️',
    description:
      'Optimale Fortnite und Windows Einstellungen für maximale Performance.',
  },
  {
    slug: 'hardware',
    label: 'Hardware Guide',
    emoji: '🖥️',
    description:
      'PC-Builds, Peripherie und Hardware-Empfehlungen für Fortnite-Profis.',
  },
  {
    slug: 'stream',
    label: 'Stream Setup',
    emoji: '📡',
    description:
      'OBS, Kick-Streaming und alles rund um deinen perfekten Stream.',
  },
  {
    slug: 'ranked',
    label: 'Ranked & Competitive',
    emoji: '🏆',
    description:
      'Strategien, Rotationen und Mentalität für den Weg in den Unreal-Rang.',
  },
];

// ============================================================================
// GEO-SEO ENHANCEMENTS - Schema generation with geo-targeting
// ============================================================================

/**
 * Generate geo-targeted HowTo schema with regional data
 * This creates unique schema for each region for better SEO
 */
export function generateGeoTargetedHowToSchema(guide: GuideData, region: Region): object {
  const baseSchema = generateHowToSchema(guide);
  const geoSchema = generateGeoSchema(region, guide);
  
  // Merge base schema with geo enhancements
  return {
    ...baseSchema,
    ...(geoSchema as any),
    // Add regional keywords to description
    description: `${(geoSchema as any).description} ${(geoSchema as any).name}`,
    // Add geo-specific audience targeting
    audience: (geoSchema as any).audience,
    // Add geo location data
    geo: (geoSchema as any).geo,
    locationCreated: (geoSchema as any).locationCreated,
  };
}

/**
 * Generate regional FAQ schema with local expert citations
 */
export function generateRegionalFAQSchema(guide: GuideData, region: Region): object {
  const regionData = REGIONS[region];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.answer} Regional insight for ${regionData.name}: ${regionData.localExpert.quote}`,
        author: {
          '@type': 'Person',
          name: regionData.localExpert.name,
          jobTitle: regionData.localExpert.title,
        },
      },
    })),
    about: {
      '@type': 'Thing',
      name: `Fortnite Guide for ${regionData.name}`,
      description: `${guide.description} Optimized for ${regionData.name} players`,
    },
  };
}

/**
 * Generate multi-regional sitemap entries
 * This creates separate URLs for each region variant
 */
export function generateRegionalSitemapEntries(guide: GuideData): Array<{
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}> {
  const entries = [];
  
  // Base entry
  entries.push({
    url: `https://fortnitenexus.netlify.app/guides/${guide.slug}`,
    lastModified: guide.lastUpdated,
    changeFrequency: 'weekly',
    priority: 1.0,
  });
  
  // Regional variants
  Object.keys(REGIONS).forEach((regionKey) => {
    const region = regionKey as Region;
    const regionData = REGIONS[region];
    
    entries.push({
      url: `https://fortnitenexus.netlify.app/guides/${guide.slug}?region=${region}`,
      lastModified: guide.lastUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
    
    // Language-specific variants
    if (regionData.primaryLanguage !== 'English') {
      entries.push({
        url: `https://fortnitenexus.netlify.app/guides/${guide.slug}?region=${region}&lang=${regionData.primaryLanguage.toLowerCase()}`,
        lastModified: guide.lastUpdated,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  });
  
  return entries;
}

/**
 * Generate geo-targeted meta tags
 */
export function generateGeoMetaTags(guide: GuideData, region: Region): Array<{
  name: string;
  content: string;
}> {
  const regionData = REGIONS[region];
  
  return [
    {
      name: 'geo.region',
      content: `${regionData.countryCode}`,
    },
    {
      name: 'geo.placename',
      content: regionData.serverLocation,
    },
    {
      name: 'geo.position',
      content: `${regionData.geoCoordinates.lat};${regionData.geoCoordinates.lng}`,
    },
    {
      name: 'ICBM',
      content: `${regionData.geoCoordinates.lat}, ${regionData.geoCoordinates.lng}`,
    },
    {
      name: 'audience',
      content: `${regionData.name} Fortnite Players`,
    },
    {
      name: 'distribution',
      content: 'global',
    },
    {
      name: 'language',
      content: regionData.primaryLanguage,
    },
  ];
}
