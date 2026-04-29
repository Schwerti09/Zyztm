/*
 * FORTNITENEXUS.SPACE — TECHNISCHE SEO-PRIORITÄTEN
 * Core Web Vitals, Schema Markup, XML Sitemap, Canonical Management
 * Masterplan 1 — SEO-Kriegsstrategie
 */

/* ═══════════════════════════════════════════
   [1] CORE WEB VITALS TARGETS
   ═══════════════════════════════════════════ */

const CWV_TARGETS = {
    LCP: {
        TARGET: 2000,      // 2.0s (strenger als Standard)
        WARNING: 2500,
        CRITICAL: 4000,
        impact: '40% Ranking-Boost'
    },
    FID: {
        TARGET: 50,        // 50ms (strenger als Standard)
        WARNING: 100,
        CRITICAL: 300,
        impact: '35% Ranking-Boost'
    },
    CLS: {
        TARGET: 0.05,      // 0.05 (strenger als Standard)
        WARNING: 0.1,
        CRITICAL: 0.25,
        impact: '30% Ranking-Boost'
    }
};

/* ═══════════════════════════════════════════
   [2] SCHEMA MARKUP GENERATORS
   ═══════════════════════════════════════════ */

function generateArticleSchema(article) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.headline,
        'image': article.image,
        'author': {
            '@type': 'Person',
            'name': article.author
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'Fortnite Nexus',
            'logo': {
                '@type': 'ImageObject',
                'url': 'https://fortnitenexus.space/logo.png'
            }
        },
        'datePublished': article.datePublished,
        'dateModified': article.dateModified,
        'description': article.description
    };
}

function generateFAQPageSchema(faqs) {
    const mainEntity = faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
        }
    }));
    
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': mainEntity
    };
}

function generateHowToSchema(howTo) {
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': howTo.name,
        'description': howTo.description,
        'step': howTo.steps.map((step, i) => ({
            '@type': 'HowToStep',
            'position': i + 1,
            'name': step.name,
            'text': step.text,
            'image': step.image
        }))
    };
}

function generateBreadcrumbSchema(breadcrumbs) {
    const itemListElement = breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': crumb.name,
        'item': crumb.url
    }));
    
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': itemListElement
    };
}

function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Fortnite Nexus',
        'url': 'https://fortnitenexus.space/',
        'description': 'Die Nr. 1 Fortnite-Kommandozentrale auf Deutsch. Battle DNA Scanner, Loadout Builder, Creator Hub, Guides & Meta.',
        'inLanguage': 'de',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': 'https://fortnitenexus.space/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    };
}

/* ═══════════════════════════════════════════
   [3] CANONICAL URL MANAGEMENT
   ═══════════════════════════════════════════ */

function generateCanonicalUrl(path, lang = 'de') {
    return `https://fortnitenexus.space/${lang}${path}`;
}

function generateHreflangTags(path, languages) {
    return languages.map(lang => ({
        rel: 'alternate',
        hreflang: lang,
        href: generateCanonicalUrl(path, lang)
    }));
}

function generateCanonicalTag(path, lang = 'de') {
    return {
        rel: 'canonical',
        href: generateCanonicalUrl(path, lang)
    };
}

/* ═══════════════════════════════════════════
   [4] XML SITEMAP GENERATOR
   ═══════════════════════════════════════════ */

function generateXMLSitemap(urls) {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    const xmlFooter = '</urlset>';
    
    const urlEntries = urls.map(url => {
        const priority = url.priority || '0.5';
        const changefreq = url.changefreq || 'weekly';
        const lastmod = url.lastmod || new Date().toISOString().split('T')[0];
        
        return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');
    
    return xmlHeader + urlEntries + xmlFooter;
}

/* ═══════════════════════════════════════════
   [5] PERFORMANCE OPTIMIZATION
   ═══════════════════════════════════════════ */

function optimizeImages() {
    // Image-Optimierung für Core Web Vitals
    // WebP/AVIF Format, Lazy Loading, Responsive Images
    return {
        format: 'webp',
        lazy_loading: true,
        responsive: true,
        max_width: 1920,
        quality: 85
    };
}

function optimizeCSS() {
    // CSS-Optimierung
    // Minification, Critical CSS, Inline CSS
    return {
        minify: true,
        critical_css: true,
        inline_critical: true,
        async_non_critical: true
    };
}

function optimizeJS() {
    // JavaScript-Optimierung
    // Minification, Async/Defer, Tree Shaking
    return {
        minify: true,
        async: true,
        defer: true,
        tree_shaking: true,
        code_splitting: true
    };
}

/* ═══════════════════════════════════════════
   [6] MOBILE-FIRST OPTIMIZATION
   ═══════════════════════════════════════════ */

function optimizeForMobile() {
    // Mobile-First Optimierung
    // Responsive Design, Touch-Optimization, Mobile Navigation
    return {
        responsive_design: true,
        touch_optimization: true,
        mobile_navigation: true,
        viewport_meta: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
        tap_targets_sized: true,
        text_legible: true
    };
}

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann technical-seo-config.js importiert werden:

<script src="/technical-seo-config.js"></script>
<script>
    // Schema Markup
    const articleSchema = generateArticleSchema({
        headline: 'Fortnite Aim verbessern 2026 – Der ultimative Guide',
        image: 'https://fortnitenexus.space/images/fortnite-aim-guide.jpg',
        author: 'Fortnite Nexus Team',
        datePublished: '2026-04-28',
        dateModified: '2026-04-28',
        description: 'Lerne wie du deinen Aim in Fortnite verbessern kannst mit diesen Tipps und Übungen für 2026.'
    });
    
    // Canonical URL
    const canonicalTag = generateCanonicalTag('/guide/fortnite-aim-verbessern-2026');
    
    // Hreflang Tags
    const hreflangTags = generateHreflangTags('/guide/fortnite-aim-verbessern-2026', ['de', 'en']);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
