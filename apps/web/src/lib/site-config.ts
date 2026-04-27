/**
 * =============================================================================
 * SITE CONFIGURATION - Single Source of Truth
 * =============================================================================
 * 
 * PURPOSE:
 * This file contains all site-wide configuration constants to ensure consistency
 * across the entire application. This prevents the domain fragmentation issue
 * where different parts of the site used different URLs (fortnitenexus.netlify.app
 * vs fortnitenexus.com).
 * 
 * CRITICAL RULE:
 * NEVER hardcode URLs in components or other files. Always import from here.
 * 
 * CHANGE LOG:
 * - 2026-04-26: Created to fix domain inconsistency (Phase 14 Authority Plan)
 * - Migrated from scattered hardcoded URLs to centralized config
 * 
 * =============================================================================
 */

// ============================================================================
// DOMAIN CONFIGURATION
// ============================================================================

/**
 * Canonical domain - This is the PRIMARY domain that should be used everywhere
 * All other variations (netlify.app, www subdomain) should redirect here
 */
export const CANONICAL_DOMAIN = 'https://fortnitenexus.space';

/**
 * Alternative domains that should redirect to canonical
 */
export const REDIRECT_DOMAINS = [
  'https://fortnitenexus.netlify.app',
  'https://www.fortnitenexus.space',
  'http://fortnitenexus.space',
  'http://fortnitenexus.netlify.app',
];

/**
 * Subdomain configurations
 */
export const SUBDOMAINS = {
  WWW: 'https://www.fortnitenexus.space',
  APP: 'https://app.fortnitenexus.space',      // Future: App subdomain
  API: 'https://api.fortnitenexus.space',      // Future: API subdomain
  CDN: 'https://cdn.fortnitenexus.space',      // Future: CDN for assets
} as const;

// ============================================================================
// BRAND CONFIGURATION
// ============================================================================

export const BRAND = {
  NAME: 'Fortnite Nexus',
  TAGLINE: 'Die ultimative deutsche Fortnite Community',
  DESCRIPTION: 'Dein deutsches Fortnite Community Hub mit Guides, News, Item Shop Tracker und Stats Checker.',
  FOUNDED: '2020',
  LOGO_URL: `${CANONICAL_DOMAIN}/logo.png`,
  FAVICON: `${CANONICAL_DOMAIN}/favicon.ico`,
} as const;

// ============================================================================
// SOCIAL MEDIA - VERIFIED PROFILES
// ============================================================================

/**
 * Official social media profiles
 * These are used for Organization schema and sameAs links
 */
export const SOCIAL_PROFILES = {
  TWITTER: 'https://twitter.com/FortniteNexusDE',
  YOUTUBE: 'https://www.youtube.com/@FortniteNexusDE',
  TIKTOK: 'https://www.tiktok.com/@FortniteNexusDE',
  INSTAGRAM: 'https://www.instagram.com/fortnitenexusde',
  DISCORD: 'https://discord.gg/fortnitenexus',
  TWITCH: 'https://twitch.tv/fortnitenexus',
  KICK: 'https://kick.com/fortnitenexus',
} as const;

// ============================================================================
// SEO CONFIGURATION
// ============================================================================

export const SEO = {
  DEFAULT_TITLE: `${BRAND.NAME} – ${BRAND.TAGLINE}`,
  DEFAULT_DESCRIPTION: BRAND.DESCRIPTION,
  DEFAULT_LOCALE: 'de_DE',
  DEFAULT_LANGUAGE: 'de',
  TWITTER_HANDLE: '@FortniteNexusDE',
  
  // Google Search Console verification (add when available)
  GOOGLE_SITE_VERIFICATION: '',
  
  // Bing Webmaster Tools verification (add when available)
  BING_SITE_VERIFICATION: '',
  
  // Yandex verification (add when available)
  YANDEX_VERIFICATION: '',
} as const;

// ============================================================================
// URL BUILDERS - Use these instead of string concatenation
// ============================================================================

/**
 * Build a canonical URL for any path
 * @param path - The path (should start with /)
 * @returns Full canonical URL
 * 
 * @example
 * buildUrl('/guide/fortnite-aim') 
 * // Returns: 'https://fortnitenexus.com/guide/fortnite-aim'
 */
export function buildUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_DOMAIN}${cleanPath}`;
}

/**
 * Build a localized URL
 * @param lang - Language code (e.g., 'de', 'en')
 * @param path - The path
 * @returns Localized canonical URL
 * 
 * @example
 * buildLocalizedUrl('de', '/guide/fortnite-aim')
 * // Returns: 'https://fortnitenexus.com/de/guide/fortnite-aim'
 */
export function buildLocalizedUrl(lang: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${CANONICAL_DOMAIN}/${lang}${cleanPath}`;
}

/**
 * Build a regional URL
 * @param lang - Language code
 * @param path - The path
 * @param region - Region code
 * @returns Regional URL with query parameter
 */
export function buildRegionalUrl(lang: string, path: string, region: string): string {
  const baseUrl = buildLocalizedUrl(lang, path);
  return `${baseUrl}?region=${region}`;
}

/**
 * Build author profile URL
 * @param slug - Author slug
 * @returns Author profile URL
 */
export function buildAuthorUrl(slug: string): string {
  return buildUrl(`/author/${slug}`);
}

/**
 * Build guide URL
 * @param lang - Language code
 * @param slug - Guide slug
 * @returns Guide URL
 */
export function buildGuideUrl(lang: string, slug: string): string {
  return buildLocalizedUrl(lang, `/guide/${slug}`);
}

/**
 * Build news URL
 * @param lang - Language code
 * @param slug - News slug
 * @returns News URL
 */
export function buildNewsUrl(lang: string, slug: string): string {
  return buildLocalizedUrl(lang, `/news/${slug}`);
}

/**
 * Build hub/category URL
 * @param lang - Language code
 * @param category - Category slug
 * @returns Hub URL
 */
export function buildHubUrl(lang: string, category: string): string {
  return buildLocalizedUrl(lang, `/guides/${category}`);
}

// ============================================================================
// ASSET URLS
// ============================================================================

export const ASSETS = {
  OG_IMAGE: `${CANONICAL_DOMAIN}/og-image.png`,
  TWITTER_IMAGE: `${CANONICAL_DOMAIN}/twitter-image.png`,
  LOGO: `${CANONICAL_DOMAIN}/logo.png`,
  FAVICON: `${CANONICAL_DOMAIN}/favicon.ico`,
  
  // Image paths (relative for bundler, absolute for SEO)
  IMAGES: {
    OG: '/og-image.png',
    TWITTER: '/twitter-image.png',
    LOGO: '/logo.png',
  },
} as const;

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API = {
  BASE: '/api',
  SITEMAP: '/sitemap.xml',
  ROBOTS: '/robots.txt',
  
  // External APIs
  FORTNITE_API: 'https://fortnite-api.com',
} as const;

// ============================================================================
// VALIDATION HELPERS
// ============================================================================

/**
 * Check if a URL is using the canonical domain
 * @param url - URL to check
 * @returns boolean
 */
export function isCanonicalDomain(url: string): boolean {
  return url.includes(CANONICAL_DOMAIN.replace('https://', ''));
}

/**
 * Check if a URL needs to be redirected to canonical
 * @param url - URL to check
 * @returns boolean
 */
export function needsRedirect(url: string): boolean {
  return REDIRECT_DOMAINS.some(domain => 
    url.includes(domain.replace('https://', '').replace('http://', ''))
  );
}

/**
 * Convert any URL to canonical form
 * @param url - URL to convert
 * @returns Canonical URL
 */
export function toCanonicalUrl(url: string): string {
  // Remove protocol
  let cleanUrl = url.replace(/^https?:\/\//, '');
  
  // Remove www
  cleanUrl = cleanUrl.replace(/^www\./, '');
  
  // Remove any of the redirect domains
  REDIRECT_DOMAINS.forEach(domain => {
    const domainClean = domain.replace(/^https?:\/\//, '').replace(/^www\./, '');
    cleanUrl = cleanUrl.replace(domainClean, '');
  });
  
  // Ensure it starts with /
  if (!cleanUrl.startsWith('/')) {
    cleanUrl = '/' + cleanUrl;
  }
  
  return `${CANONICAL_DOMAIN}${cleanUrl}`;
}

// ============================================================================
// SCHEMA MARKUP HELPERS
// ============================================================================

/**
 * Generate @id for schema.org entities
 * This ensures consistent entity identification across the site
 */
export function generateSchemaId(type: string, identifier: string): string {
  return `${CANONICAL_DOMAIN}/${type}/${identifier}`;
}

/**
 * Common schema @ids used across the site
 */
export const SCHEMA_IDS = {
  WEBSITE: `${CANONICAL_DOMAIN}/#website`,
  ORGANIZATION: `${CANONICAL_DOMAIN}/#organization`,
  PERSON: (slug: string) => `${CANONICAL_DOMAIN}/author/${slug}#person`,
  ARTICLE: (slug: string) => `${CANONICAL_DOMAIN}/guide/${slug}#article`,
  FAQ: (slug: string) => `${CANONICAL_DOMAIN}/guide/${slug}#faq`,
  HOWTO: (slug: string) => `${CANONICAL_DOMAIN}/guide/${slug}#howto`,
} as const;

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  CANONICAL_DOMAIN,
  REDIRECT_DOMAINS,
  SUBDOMAINS,
  BRAND,
  SOCIAL_PROFILES,
  SEO,
  ASSETS,
  API,
  SCHEMA_IDS,
  buildUrl,
  buildLocalizedUrl,
  buildRegionalUrl,
  buildAuthorUrl,
  buildGuideUrl,
  buildNewsUrl,
  buildHubUrl,
  isCanonicalDomain,
  needsRedirect,
  toCanonicalUrl,
  generateSchemaId,
};
