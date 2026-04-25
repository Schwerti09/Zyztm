import { useEffect } from 'react';
import type { GuideData } from '../lib/pseo';
import { buildAllSchemas, generateMetaTags } from '../lib/pseo';

interface SEOHeadProps {
  guide: GuideData;
  baseUrl?: string;
}

/**
 * Injects dynamic meta tags and JSON-LD structured data for a guide page.
 * Works in Vite SPA by manipulating document.head directly.
 */
export default function SEOHead({ guide, baseUrl = 'https://fortnitenexus.netlify.app' }: SEOHeadProps) {
  const pageUrl = `${baseUrl}/de/guide/${guide.slug}`;
  const meta = generateMetaTags(guide, pageUrl);

  useEffect(() => {
    // Title
    document.title = meta.title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Core meta
    setMeta('description', meta.description);
    setMeta('robots', meta.robots);
    setMeta('author', meta.articleAuthor);

    // Open Graph
    setMeta('og:title', meta.ogTitle, true);
    setMeta('og:description', meta.ogDescription, true);
    setMeta('og:url', meta.ogUrl, true);
    setMeta('og:type', 'article', true);
    setMeta('og:locale', 'de_DE', true);
    setMeta('og:site_name', 'Fortnite Nexus', true);
    setMeta('article:author', meta.articleAuthor, true);
    setMeta('article:modified_time', meta.articleModified, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.twitterTitle);
    setMeta('twitter:description', meta.twitterDescription);
    setMeta('twitter:creator', '@FortniteNexusDE');
    setMeta('twitter:site', '@FortniteNexusDE');

    // Canonical
    setLink('canonical', meta.canonical);

    // JSON-LD structured data
    const schemaId = 'nexus-guide-schemas';
    let existingScript = document.getElementById(schemaId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = schemaId;
      existingScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingScript);
    }
    existingScript.textContent = buildAllSchemas(guide, pageUrl);

    return () => {
      // Cleanup on unmount – restore defaults
      document.title = 'Fortnite Nexus';
      const schemaEl = document.getElementById(schemaId);
      if (schemaEl) schemaEl.remove();
    };
  }, [guide, pageUrl, meta]);

  return null;
}
