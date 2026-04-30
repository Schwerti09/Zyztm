import { useEffect } from 'react';

const DOMAIN = 'https://fortnitenexus.space';
const DEFAULT_OG = `${DOMAIN}/og/og-default.png`;

export interface MetaTagsProps {
  title: string;
  description: string;
  /** Absolute path like /item-shop or /pro/bugha */
  path: string;
  /** Absolute URL for OG image (1200×630). Falls back to og-default.png */
  image?: string;
  type?: 'website' | 'article' | 'profile';
  twitterCard?: 'summary' | 'summary_large_image';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

/**
 * Vollständiges SEO + Open Graph + Twitter Card Meta-Tag-Management.
 * Setzt alle relevanten Tags dynamisch und bereinigt beim Unmount.
 * Ersetzt useEffect-basiertes document.title-Management in allen Pages.
 */
export default function MetaTags({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = 'website',
  twitterCard = 'summary_large_image',
  publishedTime,
  modifiedTime,
  keywords,
}: MetaTagsProps) {
  useEffect(() => {
    const canonicalUrl = `${DOMAIN}${path}`;
    const prevTitle = document.title;
    document.title = title;

    // Track which elements we created so we can clean up precisely
    const created: Element[] = [];

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      const selector = `meta[${attr}="${key}"]`;
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', content);
      el.setAttribute('data-nexus-seo', '1');
    };

    const setLink = (rel: string, href: string) => {
      const selector = `link[rel="${rel}"]`;
      let el = document.querySelector<HTMLLinkElement>(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('href', href);
      el.setAttribute('data-nexus-seo', '1');
    };

    // ── Standard SEO ─────────────────────────────────────────────
    setMeta('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMeta('name', 'keywords', keywords.join(', '));
    }
    setMeta('name', 'author', 'Fortnite Nexus');
    setMeta('name', 'robots', 'index, follow');

    // ── Canonical ─────────────────────────────────────────────────
    setLink('canonical', canonicalUrl);

    // ── Open Graph ────────────────────────────────────────────────
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);
    setMeta('property', 'og:locale', 'de_DE');
    setMeta('property', 'og:site_name', 'Fortnite Nexus');

    if (type === 'article') {
      if (publishedTime) setMeta('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMeta('property', 'article:modified_time', modifiedTime);
      setMeta('property', 'article:author', 'Fortnite Nexus');
      setMeta('property', 'article:section', 'Fortnite');
    }

    // ── Twitter Card ──────────────────────────────────────────────
    setMeta('name', 'twitter:card', twitterCard);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);
    setMeta('name', 'twitter:image:alt', title);
    setMeta('name', 'twitter:site', '@FortNiteNexusDE');
    setMeta('name', 'twitter:creator', '@FortNiteNexusDE');

    return () => {
      document.title = prevTitle;
      // Remove only elements we created (leave pre-existing ones alone)
      for (const el of created) {
        el.remove();
      }
    };
  }, [title, description, path, image, type, twitterCard, publishedTime, modifiedTime, keywords]);

  return null;
}
