/*
 * FORTNITENEXUS.SPACE — ARTICLE-PAGE-TEMPLATE
 * Sidebar-Inhalte, In-Content-Module, Related Content Algorithmus, Exit-Intent Mechanik
 * Masterplan 3 — Website-Architektur
 */

/* ═══════════════════════════════════════════
   [1] SIDEBAR-INHALTE (DESKTOP)
   ═══════════════════════════════════════════ */

const sidebarContents = [
    {
        id: 'sac_reminder',
        label: 'SAC-Reminder',
        content: 'Nutze Creator Code: nexus',
        sticky: true,
        position: 'top'
    },
    {
        id: 'table_of_contents',
        label: 'Inhaltsverzeichnis',
        content: 'TOC',
        sticky: true,
        position: 'top'
    },
    {
        id: 'related_guides',
        label: 'Verwandte Guides',
        content: '3 verwandte Guides',
        sticky: false,
        position: 'middle'
    },
    {
        id: 'trending_tools',
        label: 'Beliebte Tools',
        content: '3 beliebte Tools',
        sticky: false,
        position: 'middle'
    },
    {
        id: 'newsletter_signup',
        label: 'Newsletter Signup',
        content: 'Email-Form',
        sticky: false,
        position: 'bottom'
    },
    {
        id: 'social_share',
        label: 'Social Share',
        content: 'Twitter, Discord, Reddit',
        sticky: false,
        position: 'bottom'
    }
];

/* ═══════════════════════════════════════════
   [2] IN-CONTENT-MODULE
   ═══════════════════════════════════════════ */

const inContentModules = [
    {
        position: 'after_paragraph_3',
        modules: [
            {
                type: 'featured_snippet',
                content: 'FAQ-Format Featured Snippet'
            },
            {
                type: 'sac_reminder',
                content: 'Compact SAC-Code Erinnerung'
            }
        ]
    },
    {
        position: 'after_paragraph_7',
        modules: [
            {
                type: 'related_content',
                content: 'Verwandter Guide'
            },
            {
                type: 'tool_integration',
                content: 'Sensitivity Calculator'
            }
        ]
    },
    {
        position: 'after_paragraph_12',
        modules: [
            {
                type: 'newsletter_signup',
                content: 'Newsletter Form'
            },
            {
                type: 'discord_cta',
                content: 'Discord CTA'
            }
        ]
    },
    {
        position: 'after_paragraph_18',
        modules: [
            {
                type: 'related_articles',
                content: 'Verwandte Artikel'
            },
            {
                type: 'community_cta',
                content: 'Community CTA'
            }
        ]
    }
];

/* ═══════════════════════════════════════════
   [3] RELATED CONTENT ALGORITHMUS
   ═══════════════════════════════════════════ */

const relatedContentAlgorithm = {
    criteria: [
        {
            name: 'same_category',
            weight: 0.40,
            description: 'Guides aus derselben Kategorie'
        },
        {
            name: 'same_tags',
            weight: 0.30,
            description: 'Guides mit gleichen Tags'
        },
        {
            name: 'popular',
            weight: 0.15,
            description: 'Meistgelesene Guides'
        },
        {
            name: 'recent',
            weight: 0.10,
            description: 'Neueste Guides'
        },
        {
            name: 'user_behavior',
            weight: 0.05,
            description: 'Basierend auf User-Historie'
        }
    ],
    calculate_score: function(article, candidate) {
        let score = 0;
        
        // Same Category
        if (article.category === candidate.category) {
            score += 0.40;
        }
        
        // Same Tags
        const commonTags = article.tags.filter(tag => candidate.tags.includes(tag));
        if (commonTags.length > 0) {
            score += 0.30 * (commonTags.length / article.tags.length);
        }
        
        // Popular
        score += 0.15 * (candidate.views / 10000);
        
        // Recent
        const daysSincePublish = (Date.now() - new Date(candidate.publish_date)) / (1000 * 60 * 60 * 24);
        score += 0.10 * Math.max(0, 1 - daysSincePublish / 30);
        
        // User Behavior (placeholder)
        score += 0.05;
        
        return score;
    }
};

/* ═══════════════════════════════════════════
   [4] EXIT-INTENT MECHANIK
   ═══════════════════════════════════════════ */

const exitIntentModal = {
    trigger: {
        desktop: 'mouse_to_tab_close',
        mobile: 'scroll_up_fast'
    },
    modal: {
        headline: '🎮 Willst du besser in Fortnite werden?',
        content: 'Unsere Guides haben 12.500+ Spielern geholfen:',
        benefits: [
            'Aim Guide → +25% Accuracy',
            'Building Guide → +40% Win Rate',
            'Settings Guide → +30% FPS'
        ],
        cta_button: {
            label: 'Guides lesen',
            url: '/guides/'
        },
        dismiss_link: {
            label: 'Nein danke',
            action: 'dismiss'
        }
    },
    cookie: {
        show_once_per_session: true,
        dismiss_duration: 7 // days
    }
};

/* ═══════════════════════════════════════════
   [5] CONVERSION-FUNNEL
   ═══════════════════════════════════════════ */

const conversionFunnel = [
    {
        step: 1,
        from: 'Besuch',
        to: 'Email',
        measure: 'Newsletter Signup nach 30 Sekunden',
        trigger: 'Time-based (30s on page)',
        timing: 'Nach erstem Guide gelesen'
    },
    {
        step: 2,
        from: 'Email',
        to: 'Discord',
        measure: 'Discord Einladung in Welcome-Email',
        trigger: 'Email bestätigt',
        timing: 'Sofort nach Signup'
    },
    {
        step: 3,
        from: 'Discord',
        to: 'wiederkehrender User',
        measure: 'Wöchentliche Discord-Events & Tipps',
        trigger: 'Discord Membership',
        timing: 'Wöchentlich'
    },
    {
        step: 4,
        from: 'wiederkehrender User',
        to: 'Community-Mitglied',
        measure: 'Exclusive Content für Discord-Mitglieder',
        trigger: '3+ Discord Besuche',
        timing: 'Nach 1 Woche'
    }
];

/* ═══════════════════════════════════════════
   [6] ARTICLE-PAGE GENERATORS
   ═══════════════════════════════════════════ */

function generateSidebar() {
    return sidebarContents;
}

function generateInContentModules() {
    return inContentModules;
}

function generateRelatedContent(article, allArticles) {
    const scored = allArticles.map(candidate => ({
        article: candidate,
        score: relatedContentAlgorithm.calculate_score(article, candidate)
    }));
    
    const sorted = scored.sort((a, b) => b.score - a.score);
    return sorted.slice(0, 3).map(item => item.article);
}

function generateExitIntentModal() {
    return exitIntentModal;
}

function generateConversionFunnel() {
    return conversionFunnel;
}

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Artikel-Seite kann article-page-template.js importiert werden:

<script src="/article-page-template.js"></script>
<script>
    // Sidebar rendern
    const sidebar = generateSidebar();
    renderSidebar(sidebar);
    
    // In-Content Modules rendern
    const modules = generateInContentModules();
    renderInContentModules(modules);
    
    // Related Content generieren
    const related = generateRelatedContent(currentArticle, allArticles);
    renderRelatedContent(related);
    
    // Exit-Intent Modal rendern
    const exitIntent = generateExitIntentModal();
    renderExitIntentModal(exitIntent);
    
    // Conversion Funnel initialisieren
    const funnel = generateConversionFunnel();
    initConversionFunnel(funnel);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
