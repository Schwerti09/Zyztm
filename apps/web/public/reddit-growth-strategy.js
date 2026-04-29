/*
 * FORTNITENEXUS.SPACE — REDDIT-WACHSTUMSSTRATEGIE
 * 8 Subreddits, Post-Formate, Kommentar-Strategien, Linking, Timing
 * Masterplan 6 — Community-Dominanz
 */

/* ═══════════════════════════════════════════
   [1] SUBREDDITS
   ═══════════════════════════════════════════ */

const subreddits = [
    {
        name: 'r/FortniteBR',
        purpose: 'Haupt-Subreddit für Fortnite',
        frequency: '1x/Woche',
        day: 'Sonntag',
        content: 'High-Quality Guides, Meta-Analysis'
    },
    {
        name: 'r/FortniteCompetitive',
        purpose: 'Competitive-Fokus',
        frequency: '1x/Woche',
        day: 'Mittwoch',
        content: 'Ranked-Strategien, Pro-Tips'
    },
    {
        name: 'r/FortniteMobile',
        purpose: 'Mobile-Spieler',
        frequency: '1x/2 Wochen',
        day: 'Freitag',
        content: 'Mobile-Settings, Mobile-Meta'
    },
    {
        name: 'r/FortniteConsole',
        purpose: 'Console-Spieler',
        frequency: '1x/2 Wochen',
        day: 'Dienstag',
        content: 'Controller-Settings, Console-Meta'
    },
    {
        name: 'r/FortniteSettings',
        purpose: 'Settings-Optimierung',
        frequency: '2x/Woche',
        days: ['Dienstag', 'Freitag'],
        content: 'Settings-Guides, Optimization'
    },
    {
        name: 'r/FortniteCreative',
        purpose: 'Creative Maps',
        frequency: '1x/Woche',
        day: 'Samstag',
        content: 'Map-Recommendations, Codes'
    },
    {
        name: 'r/fortnitede',
        purpose: 'Deutschsprachige Community',
        frequency: '1x/Woche',
        day: 'Donnerstag',
        content: 'Deutsche Guides, Meta-Analysis'
    },
    {
        name: 'r/germanfortnite',
        purpose: 'Alternative DE-Community',
        frequency: '1x/2 Wochen',
        day: 'Montag',
        content: 'Deutsche Tips, Community-News'
    }
];

/* ═══════════════════════════════════════════
   [2] POST-FORMATE
   ═══════════════════════════════════════════ */

const postFormats = [
    {
        name: 'Comprehensive Guide',
        structure: 'Problem → Lösung → Beispiele',
        value: 'Detaillierte Schritt-für-Schritt Anleitung',
        rules: 'Mindestens 1.000 Wörter, Screenshots, Examples'
    },
    {
        name: 'Data-Driven Analysis',
        structure: 'Daten → Analyse → Schlussfolgerung',
        value: 'Fakten-basierte Einsichten',
        rules: 'Zahlen, Charts, Sources angeben'
    },
    {
        name: 'Meta-Update',
        structure: 'Patch-Notes → Meta-Shift → Tipps',
        value: 'Aktuelle Meta-Informationen',
        rules: 'Zeitnah nach Patch, Pro-Reaktionen'
    },
    {
        name: 'Tool-Recommendation',
        structure: 'Problem → Tool → Tutorial',
        value: 'Praktische Tool-Empfehlung',
        rules: 'Free Tools, Tutorial inklusive'
    },
    {
        name: 'Community-Discussion',
        structure: 'Frage → Diskussion → Fazit',
        value: 'Community-Input und -Feedback',
        rules: 'Offene Frage, konstruktive Diskussion'
    }
];

/* ═══════════════════════════════════════════
   [3] KOMMENTAR-STRATEGIEN
   ═══════════════════════════════════════════ */

const commentStrategies = [
    {
        name: 'Data-Backed Comments',
        approach: 'Kommentiere mit Daten und Fakten',
        example: 'Statistisch gesehen hat diese Waffe 25% Win Rate in Ranked',
        why: 'Zeigt Expertise und Glaubwürdigkeit'
    },
    {
        name: 'Helpful Follow-Up',
        approach: 'Follow-up mit zusätzlichen Tipps',
        example: 'Guter Tip! Ergänzend dazu würde ich noch empfehlen...',
        why: 'Zeigt Hilfsbereitschaft und Community-Spirit'
    },
    {
        name: 'Constructive Criticism',
        approach: 'Konstruktive Kritik mit Verbesserungsvorschlägen',
        example: 'Guter Guide, aber ich würde noch X ergänzen...',
        why: 'Zeigt Engagement und Expertise'
    }
];

/* ═══════════════════════════════════════════
   [4] LINKING-STRATEGIEN
   ═══════════════════════════════════════════ */

const linkingStrategies = [
    {
        name: 'Contextual Linking',
        approach: 'Link nur wenn relevant zum Kontext',
        example: 'Für mehr Details zu diesem Meta-Shift, habe ich eine vollständige Analyse geschrieben',
        why: 'Relevanz erhöht Klick-Rate, reduziert Spam-Flag'
    },
    {
        name: 'Value-First Linking',
        approach: 'Biete erst Wert, dann Link',
        example: 'Hier sind 3 Tipps für besseren Aim. Wenn du mehr willst, habe ich einen vollständigen Guide geschrieben',
        why: 'Zeigt Mehrwert vor Selbstpromotion'
    },
    {
        name: 'Discussion-Based Linking',
        approach: 'Link als Teil der Diskussion',
        example: 'In meinem Guide habe ich auch diese Strategie analysiert, was denkst du?',
        why: 'Fördert Diskussion statt nur Promotion'
    }
];

/* ═══════════════════════════════════════════
   [5] OPTIMAL POSTING-ZEITEN
   ═══════════════════════════════════════════ */

const optimalPostingTimes = {
    montag: '12:00 UTC (US Morning, EU Afternoon)',
    dienstag: '15:00 UTC (US Afternoon, EU Evening)',
    mittwoch: '12:00 UTC (US Morning, EU Afternoon)',
    donnerstag: '18:00 UTC (US Evening, EU Night)',
    freitag: '15:00 UTC (US Afternoon, EU Evening)',
    samstag: '09:00 UTC (US Morning, EU Morning)',
    sonntag: '12:00 UTC (US Morning, EU Afternoon)'
};

/* ═══════════════════════════════════════════
   [6] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann reddit-growth-strategy.js importiert werden:

<script src="/reddit-growth-strategy.js"></script>
<script>
    // Subreddits rendern
    renderSubreddits(subreddits);
    
    // Post-Formate rendern
    renderPostFormats(postFormats);
    
    // Kommentar-Strategien rendern
    renderCommentStrategies(commentStrategies);
    
    // Linking-Strategien rendern
    renderLinkingStrategies(linkingStrategies);
    
    // Posting-Zeiten rendern
    renderPostingTimes(optimalPostingTimes);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
