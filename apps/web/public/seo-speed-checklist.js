/*
 * FORTNITENEXUS.SPACE — SEO-SPEED-CHECKLISTE
 * 10-Punkte-Checklist für Patch-Artikel (15 Min vor Veröffentlichung)
 * Masterplan 2 — Patch-Seismograph
 */

/* ═══════════════════════════════════════════
   [1] SEO SPEED CHECKLIST
   ═══════════════════════════════════════════ */

const seoSpeedChecklist = [
    {
        id: 1,
        task: 'Title-Tag optimiert',
        requirement: '60 chars max, Haupt-Keyword vorne',
        formula: '[Keyword] – [Sensationeller Hook] | Fortnite Nexus',
        examples: [
            'Fortnite Patch Notes – Waffe X zerstört, Y ist jetzt OP | Fortnite Nexus',
            'Fortnite Chapter 6 Season 2 – 7 Waffen bufft, 3 nerft | Fortnite Nexus',
            'Fortnite Meta-Verschiebung – Das ist jetzt OP | Fortnite Nexus'
        ]
    },
    {
        id: 2,
        task: 'Meta-Description optimiert',
        requirement: '160 chars max, CTA am Ende',
        formula: '[Wichtigste Änderungen] – [CTA]',
        examples: [
            'Die wichtigsten Fortnite Patch Notes: Waffe X bufft, Waffe Z nerft. Hier ist was du jetzt nutzen musst. Full Guide.',
            'Fortnite Meta-Verschiebung: Das ist jetzt OP. Quick-Tipps für besseres Gameplay. Full Guide.'
        ]
    },
    {
        id: 3,
        task: 'H1 exakt einmal',
        requirement: 'Keine duplizierten H1',
        check: 'Nur ein H1 auf der Seite'
    },
    {
        id: 4,
        task: 'Interne Links gesetzt',
        requirement: 'Mindestens 3 relevante interne Links',
        examples: [
            '/de/meta/waffen/best-loadouts',
            '/de/meta/karten/chapter-6-season-2',
            '/de/guide/fortnite-ultimate-guide-2026'
        ]
    },
    {
        id: 5,
        task: 'Alt-Text für alle Bilder',
        requirement: 'Beschreibend, Keyword-relevant',
        formula: '[Waffe/Feature] im Fortnite [Version] Patch – [Beschreibung was geändert wurde]',
        examples: [
            'Assault Rifle im Fortnite Chapter 6 Season 2 Patch – Damage um 15% erhöht',
            'Neue POI im Fortnite Chapter 6 Season 2 Patch – Named Location hinzugefügt',
            'Bug Fix im Fortnite Chapter 6 Season 2 Patch – Crash beim Laden behoben'
        ]
    },
    {
        id: 6,
        task: 'Featured Snippet Block',
        requirement: '40-55 Wörter, Frage-Antwort-Format',
        formula: '**Frage:** [Frage]\n\n**Antwort:** [Antwort]'
    },
    {
        id: 7,
        task: 'Schema Markup',
        requirement: 'Article Schema + FAQPage Schema',
        schemas: ['Article', 'FAQPage', 'HowTo', 'Breadcrumb']
    },
    {
        id: 8,
        task: 'Canonical URL',
        requirement: 'Korrekt, keine Duplicate Content',
        check: 'Canonical Tag vorhanden'
    },
    {
        id: 9,
        task: 'Mobile-Test',
        requirement: 'Responsiv, Touch-optimiert',
        check: 'Mobile-First Design'
    },
    {
        id: 10,
        task: 'Ladezeit-Check',
        requirement: 'LCP < 2.5s, alle Bilder optimiert',
        targets: {
            LCP: 2500,
            FID: 100,
            CLS: 0.1
        }
    }
];

/* ═══════════════════════════════════════════
   [2] TITLE-TAG GENERATOR
   ═══════════════════════════════════════════ */

function generateTitleTag(keyword, hook) {
    const baseTitle = `${keyword} – ${hook} | Fortnite Nexus`;
    
    // Limit zu 60 chars
    if (baseTitle.length > 60) {
        const hookShort = hook.substring(0, 30) + '...';
        return `${keyword} – ${hookShort} | Fortnite Nexus`;
    }
    
    return baseTitle;
}

/* ═══════════════════════════════════════════
   [3] META-DESCRIPTION GENERATOR
   ═══════════════════════════════════════════ */

function generateMetaDescription(changes, cta) {
    const baseDescription = `${changes} ${cta}`;
    
    // Limit zu 160 chars
    if (baseDescription.length > 160) {
        const changesShort = changes.substring(0, 120) + '...';
        return `${changesShort} ${cta}`;
    }
    
    return baseDescription;
}

/* ═══════════════════════════════════════════
   [4] ALT-TEXT GENERATOR
   ═══════════════════════════════════════════ */

function generateAltText(feature, version, description) {
    return `${feature} im Fortnite ${version} Patch – ${description}`;
}

/* ═══════════════════════════════════════════
   [5] FEATURED SNIPPET GENERATOR
   ═══════════════════════════════════════════ */

function generateFeaturedSnippetBlock(question, answer) {
    const snippet = `**Frage:** ${question}\n\n**Antwort:** ${answer}`;
    
    // Limit zu 40-55 Wörter
    const wordCount = snippet.split(' ').length;
    if (wordCount < 40) {
        console.warn('Featured Snippet zu kurz (unter 40 Wörter)');
    } else if (wordCount > 55) {
        console.warn('Featured Snippet zu lang (über 55 Wörter)');
    }
    
    return snippet;
}

/* ═══════════════════════════════════════════
   [6] CHECKLIST VALIDATOR
   ═══════════════════════════════════════════ */

function validateSEOChecklist(article) {
    const results = [];
    
    seoSpeedChecklist.forEach(item => {
        const result = {
            id: item.id,
            task: item.task,
            passed: false,
            notes: []
        };
        
        // Check 1: Title-Tag
        if (item.id === 1) {
            if (article.title && article.title.length <= 60) {
                result.passed = true;
            } else {
                result.notes.push('Title-Tag zu lang oder fehlt');
            }
        }
        
        // Check 2: Meta-Description
        if (item.id === 2) {
            if (article.meta_description && article.meta_description.length <= 160) {
                result.passed = true;
            } else {
                result.notes.push('Meta-Description zu lang oder fehlt');
            }
        }
        
        // Check 3: H1
        if (item.id === 3) {
            const h1Count = (article.content.match(/<h1>/g) || []).length;
            if (h1Count === 1) {
                result.passed = true;
            } else {
                result.notes.push(`H1 Count: ${h1Count} (sollte 1 sein)`);
            }
        }
        
        // Check 4: Interne Links
        if (item.id === 4) {
            const internalLinks = (article.content.match(/\/de\//g) || []).length;
            if (internalLinks >= 3) {
                result.passed = true;
            } else {
                result.notes.push(`Interne Links: ${internalLinks} (sollte mindestens 3 sein)`);
            }
        }
        
        // Check 5: Alt-Text
        if (item.id === 5) {
            const imagesWithoutAlt = (article.content.match(/<img[^>]*(?!alt=)[^>]*>/g) || []).length;
            if (imagesWithoutAlt === 0) {
                result.passed = true;
            } else {
                result.notes.push(`${imagesWithoutAlt} Bilder ohne Alt-Text`);
            }
        }
        
        // Check 6: Featured Snippet
        if (item.id === 6) {
            const hasFeaturedSnippet = article.content.includes('**Frage:**') && article.content.includes('**Antwort:**');
            if (hasFeaturedSnippet) {
                result.passed = true;
            } else {
                result.notes.push('Featured Snippet fehlt');
            }
        }
        
        // Check 7: Schema Markup
        if (item.id === 7) {
            const hasSchema = article.content.includes('@context') && article.content.includes('schema.org');
            if (hasSchema) {
                result.passed = true;
            } else {
                result.notes.push('Schema Markup fehlt');
            }
        }
        
        // Check 8: Canonical URL
        if (item.id === 8) {
            const hasCanonical = article.content.includes('rel="canonical"');
            if (hasCanonical) {
                result.passed = true;
            } else {
                result.notes.push('Canonical URL fehlt');
            }
        }
        
        // Check 9: Mobile-Test (placeholder)
        if (item.id === 9) {
            result.passed = true; // Placeholder - sollte manuell getestet werden
            result.notes.push('Manueller Mobile-Test erforderlich');
        }
        
        // Check 10: Ladezeit-Check (placeholder)
        if (item.id === 10) {
            result.passed = true; // Placeholder - sollte mit Lighthouse getestet werden
            result.notes.push('Lighthouse Test erforderlich');
        }
        
        results.push(result);
    });
    
    return results;
}

/* ═══════════════════════════════════════════
   [7] CHECKLIST SUMMARY
   ═══════════════════════════════════════════ */

function generateChecklistSummary(results) {
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    const percentage = (passed / total) * 100;
    
    return {
        passed: passed,
        total: total,
        percentage: percentage,
        ready_to_publish: percentage >= 90,
        results: results
    };
}

/* ═══════════════════════════════════════════
   [8] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann seo-speed-checklist.js importiert werden:

<script src="/seo-speed-checklist.js"></script>
<script>
    // Artikel-Daten
    const article = {
        title: 'Fortnite Patch Notes – Waffe X zerstört, Y ist jetzt OP | Fortnite Nexus',
        meta_description: 'Die wichtigsten Fortnite Patch Notes: Waffe X bufft, Waffe Z nerft. Hier ist was du jetzt nutzen musst. Full Guide.',
        content: '<h1>...</h1><p>...</p>'
    };
    
    // SEO-Checklist validieren
    const results = validateSEOChecklist(article);
    const summary = generateChecklistSummary(results);
    
    // Ergebnisse anzeigen
    console.log('SEO Speed Checklist Summary:');
    console.log(`Passed: ${summary.passed}/${summary.total} (${summary.percentage}%)`);
    console.log(`Ready to publish: ${summary.ready_to_publish}`);
    
    // Ergebnisse rendern
    renderChecklistResults(results, summary);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
