/*
 * FORTNITENEXUS.SPACE — CONTENT-TEMPLATES
 * Brief-Template-System: Tier-List, Guide/Tutorial, Patch-News, Vergleichsartikel, Stats-/Daten-Artikel
 * Masterplan 4 — Content-Produktions-Turbo
 */

/* ═══════════════════════════════════════════
   [1] TIER-LIST TEMPLATE
   ═══════════════════════════════════════════ */

function generateTierListTemplate(data) {
    return {
        title: `${data.weapon} Tier List – ${data.season}`,
        hook: data.hook || 'Epic hat gerade die stärkste Waffe im Spiel zerstört – hier ist was du jetzt nutzen musst.',
        featured_snippet: {
            question: `Was ist die beste ${data.weapon} in ${data.season}?`,
            answer: `Die beste ${data.weapon} ist ${data.best_weapon} wegen ${data.reason}. Hier ist die komplette Tier List.`
        },
        s_tier: data.s_tier || ['Assault Rifle', 'SMG'],
        a_tier: data.a_tier || ['Sniper', 'Pistol'],
        b_tier: data.b_tier || ['Shotgun', 'Explosive'],
        c_tier: data.c_tier || ['Crossbow', 'Minigun'],
        surprise_pick: {
            weapon: data.surprise_weapon || 'SMG',
            reason: data.surprise_reason || 'Warum sie jetzt besser ist als Shotgun'
        },
        internal_links: data.internal_links || ['/meta/waffen/best-loadouts', '/guides/fortnite-weapon-tier-list']
    };
}

/* ═══════════════════════════════════════════
   [2] GUIDE/TUTORIAL TEMPLATE
   ═══════════════════════════════════════════ */

function generateGuideTemplate(data) {
    return {
        title: `${data.topic} Guide – ${data.hook}`,
        hook: data.hook || 'Du wirst nicht glauben wie einfach es ist – wenn du diese 3 Tipps befolgst.',
        featured_snippet: {
            question: data.featured_question || `Wie verbesserst du ${data.topic}?`,
            answer: data.featured_answer || `Übe täglich 30 Minuten, reduziere deine Sensitivity und nutze crosshair overlays.`
        },
        sections: [
            {
                h2: `Warum ${data.topic} wichtig ist`,
                content: data.importance_content || `${data.topic} ist der wichtigste Skill in Fortnite – 80% deiner Kills kommen daraus.`
            },
            {
                h2: `Grundlagen von ${data.topic}`,
                content: data.basics_content || 'Crosshair placement, tracking, flick shots – die drei Fundamente.'
            },
            {
                h2: 'Fortgeschrittene Techniken',
                content: data.advanced_content || 'Prefire, strafing, movement aim – Techniken die Pros nutzen.'
            },
            {
                h2: 'Häufige Fehler',
                content: data.mistakes_content || 'Zu hohe Sensitivity, kein crosshair placement, kein warm-up.'
            },
            {
                h2: 'Quick-Tipps',
                content: data.tips_content || [
                    '30 Minuten täglich üben',
                    'Sensitivity auf 0.4-0.6 eDPI',
                    'Crosshair overlay nutzen'
                ]
            }
        ],
        internal_links: data.internal_links || ['/guides/fortnite-sensitivity-calculator', '/tools/waffen-datenbank']
    };
}

/* ═══════════════════════════════════════════
   [3] PATCH-NEWS TEMPLATE
   ═══════════════════════════════════════════ */

function generatePatchNewsTemplate(data) {
    return {
        title: `${data.patch_name} Patch Notes – ${data.main_change}`,
        hook: data.hook || 'Epic hat gerade die stärkste Waffe im Spiel zerstört – hier ist was du jetzt nutzen musst.',
        featured_snippet: {
            question: `Was sind die wichtigsten Änderungen im ${data.patch_name}?`,
            answer: data.featured_answer || `Assault Rifle wurde um 20% bufft, Shotgun wurde nerft, und Thermal Scope wurde hinzugefügt.`
        },
        sections: [
            {
                h2: 'Waffen-Balance',
                content: data.weapon_balance || 'Assault Rifle +20%, Shotgun -15%, SMG -30% Reload Time'
            },
            {
                h2: 'Neue Items',
                content: data.new_items || 'Thermal Scope, Shield Bubble'
            },
            {
                h2: 'Map-Änderungen',
                content: data.map_changes || 'Crystal Cavern, Shadow Valley hinzugefügt'
            },
            {
                h2: 'Meta-Verschiebung',
                content: data.meta_shift || 'Mid-range combat jetzt dominant'
            },
            {
                h2: 'Quick-Tipps',
                content: data.quick_tips || [
                    'Nutze Assault Rifle statt Shotgun',
                    'Thermal Scope in final circles',
                    'Placements wichtiger als Kills'
                ]
            }
        ],
        internal_links: data.internal_links || ['/meta/waffen/best-loadouts', '/meta/karten/chapter-6-season-2']
    };
}

/* ═══════════════════════════════════════════
   [4] VERGLEICHSARTIKEL TEMPLATE
   ═══════════════════════════════════════════ */

function generateComparisonTemplate(data) {
    return {
        title: `${data.option_a} vs ${data.option_b} – Was ist besser für ${data.audience}?`,
        hook: data.hook || 'Die meisten denken PC ist besser – aber Console hat massive Vorteile die niemand kennt.',
        featured_snippet: {
            question: `Was ist besser: ${data.option_a} oder ${data.option_b}?`,
            answer: data.featured_answer || `${data.option_a} ist besser für Aim und Settings, aber ${data.option_b} hat Aim Assist und konsistente Hardware.`
        },
        sections: [
            {
                h2: `${data.option_a} – Vor- und Nachteile`,
                content: data.option_a_content || 'Bessere Aim, mehr Settings, aber Hardware-Kosten und Cheater'
            },
            {
                h2: `${data.option_b} – Vor- und Nachteile`,
                content: data.option_b_content || 'Aim Assist, konsistente Hardware, aber limitierte Settings'
            },
            {
                h2: 'Direkter Vergleich',
                content: data.comparison_table || {
                    [data.option_a]: 'Aim 9/10, Settings 10/10, Hardware 7/10',
                    [data.option_b]: 'Aim 8/10, Settings 6/10, Hardware 10/10'
                }
            },
            {
                h2: `Für wen ist ${data.option_a}?`,
                content: data.option_a_audience || 'Spieler die maximale Kontrolle wollen und Budget haben'
            },
            {
                h2: `Für wen ist ${data.option_b}?`,
                content: data.option_b_audience || 'Spieler die Konsistenz und Aim Assist bevorzugen'
            },
            {
                h2: 'Fazit',
                content: data.conclusion || `${data.option_a} ist besser für competitive Players, ${data.option_b} für Casual`
            }
        ],
        internal_links: data.internal_links || ['/einstellungen/pc', '/einstellungen/controller']
    };
}

/* ═══════════════════════════════════════════
   [5] STATS-/DATEN-ARTIKEL TEMPLATE
   ═══════════════════════════════════════════ */

function generateStatsTemplate(data) {
    return {
        title: `${data.stat} Statistik – Was die Daten zeigen`,
        hook: data.hook || 'Die durchschnittliche Win Rate ist 3% – aber Top-Spieler erreichen 25%+. Hier ist wie sie es machen.',
        featured_snippet: {
            question: `Was ist die ${data.stat} in Fortnite?`,
            answer: data.featured_answer || 'Die durchschnittliche Win Rate ist 3%, aber Top-Spieler erreichen 25%+ durch besseres Aim und Positioning.'
        },
        sections: [
            {
                h2: 'Die Daten im Detail',
                content: data.detail_data || {
                    'Bronze': '1% Win Rate',
                    'Silver': '2% Win Rate',
                    'Gold': '3% Win Rate',
                    'Platinum': '5% Win Rate',
                    'Diamond': '10% Win Rate',
                    'Champion': '25% Win Rate'
                }
            },
            {
                h2: 'Was das bedeutet',
                content: data.interpretation || 'Win Rate korreliert mit Skill, aber auch mit Playstyle'
            },
            {
                h2: 'Trends über Zeit',
                content: data.trends || 'Win Rate steigt mit Practice und Meta-Knowledge'
            },
            {
                h2: 'Prognose',
                content: data.projection || 'Mit 100+ Stunden Practice kannst du 5%+ erreichen'
            }
        ],
        internal_links: data.internal_links || ['/ranked/tipps', '/tools/stats-checker']
    };
}

/* ═══════════════════════════════════════════
   [6] TEMPLATE GENERATORS
   ═══════════════════════════════════════════ */

function generateContentBrief(type, data) {
    switch(type) {
        case 'tier_list':
            return generateTierListTemplate(data);
        case 'guide':
            return generateGuideTemplate(data);
        case 'patch_news':
            return generatePatchNewsTemplate(data);
        case 'comparison':
            return generateComparisonTemplate(data);
        case 'stats':
            return generateStatsTemplate(data);
        default:
            throw new Error(`Unknown template type: ${type}`);
    }
}

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann content-templates.js importiert werden:

<script src="/content-templates.js"></script>
<script>
    // Tier-List Template
    const tierListBrief = generateContentBrief('tier_list', {
        weapon: 'Waffen',
        season: 'Chapter 6 Season 2',
        best_weapon: 'Assault Rifle',
        reason: '20% Damage Buff'
    });
    
    // Guide Template
    const guideBrief = generateContentBrief('guide', {
        topic: 'Fortnite Aim',
        hook: 'So verbesserst du deinen Aim in 30 Tagen'
    });
    
    // Patch-News Template
    const patchBrief = generateContentBrief('patch_news', {
        patch_name: 'Chapter 6 Season 2',
        main_change: '7 Waffen bufft, 3 nerft'
    });
    
    // Vergleichsartikel Template
    const comparisonBrief = generateContentBrief('comparison', {
        option_a: 'PC',
        option_b: 'Console',
        audience: 'wettbewerbsorientierte Spieler'
    });
    
    // Stats-Artikel Template
    const statsBrief = generateContentBrief('stats', {
        stat: 'Win Rate'
    });
    
    // Brief rendern
    renderContentBrief(brief);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
