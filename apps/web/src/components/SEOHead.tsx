import { useEffect } from 'react';
import type { GuideData } from '../lib/pseo';
import { buildAllSchemas, generateMetaTags } from '../lib/pseo';
import { LANGUAGES, type Language } from '../lib/i18n';
import { CANONICAL_DOMAIN, SEO } from '../lib/site-config';

interface SEOHeadProps {
  guide: GuideData;
  baseUrl?: string;
  language?: Language;
}

/**
 * Injects dynamic meta tags and JSON-LD structured data for a guide page.
 * Works in Vite SPA by manipulating document.head directly.
 * ENHANCED: Multi-language SEO with hreflang tags
 */
export default function SEOHead({ guide, baseUrl = CANONICAL_DOMAIN, language = 'en' }: SEOHeadProps) {
  const pageUrl = `${baseUrl}/${language}/guide/${guide.slug}`;
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

    // hreflang tags for multi-language SEO
    const setHreflang = (hreflang: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', hreflang);
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
    setMeta('og:locale', getLocaleCode(language), true);
    setMeta('og:site_name', SEO.DEFAULT_TITLE.split(' – ')[0], true);
    setMeta('article:author', meta.articleAuthor, true);
    setMeta('article:modified_time', meta.articleModified, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.twitterTitle);
    setMeta('twitter:description', meta.twitterDescription);
    setMeta('twitter:creator', SEO.TWITTER_HANDLE);
    setMeta('twitter:site', SEO.TWITTER_HANDLE);

    // Canonical
    setLink('canonical', meta.canonical);

    // hreflang tags for all languages
    LANGUAGES.forEach(lang => {
      setHreflang(lang.code, `${baseUrl}/${lang.code}/guide/${guide.slug}`);
    });
    setHreflang('x-default', `${baseUrl}/en/guide/${guide.slug}`);

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
  }, [guide, pageUrl, meta, language, baseUrl]);

  return null;
}

/**
 * Convert language code to locale code (e.g., 'en' -> 'en_US')
 */
function getLocaleCode(language: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en_US',
    de: 'de_DE',
    es: 'es_ES',
    fr: 'fr_FR',
    'pt-br': 'pt_BR',
    it: 'it_IT',
    ru: 'ru_RU',
    pl: 'pl_PL',
    tr: 'tr_TR',
    ja: 'ja_JP',
  };
  return localeMap[language] || 'en_US';
}
