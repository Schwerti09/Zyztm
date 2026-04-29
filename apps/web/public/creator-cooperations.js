/*
 * FORTNITENEXUS.SPACE — CREATOR-KOOPERATIONEN
 * Pitch-Email-Vorlagen, Was anbieten ohne Geld, 10 deutsche Creator, Kooperations-Modelle
 * Masterplan 6 — Community-Dominanz
 */

/* ═══════════════════════════════════════════
   [1] PITCH-EMAIL-VORLAGEN
   ═══════════════════════════════════════════ */

const pitchEmails = {
    micro_creator: {
        subject: 'Kooperation: Fortnite Nexus × [Creator Name]',
        body: `Hallo [Creator Name],

ich bin [Dein Name] von Fortnite Nexus – einer deutschen Fortnite Community Hub Website.

Wir suchen Creator für Kooperationen und ich glaube du wärst perfekt dafür!

Was wir anbieten:
- Exklusive Promo auf unserer Website (10k+ monatliche Besucher)
- Discord-Community Integration (500+ Member)
- Social Media Cross-Promotion (Twitter, TikTok)
- Early Access zu unseren Guides und Tools

Was wir von dir erwarten:
- 1 Social Media Post über Fortnite Nexus
- Optional: Discord Server Promotion
- Optional: Guide Contribution

Keine finanziellen Erwartungen – dies ist eine Win-Win Kooperation.

Interesse an einem kurzen Call?

Beste Grüße,
[Dein Name]
Fortnite Nexus`
    },
    mid_creator: {
        subject: 'Partnership Opportunity: Fortnite Nexus × [Creator Name]',
        body: `Hallo [Creator Name],

ich bin [Dein Name] von Fortnite Nexus – einer wachsenden deutschen Fortnite Community Hub Website.

Wir sind an einer Partnership mit dir interessiert!

Was wir anbieten:
- Premium Promo auf unserer Website (10k+ monatliche Besucher)
- Featured Creator Spotlight in unserem Newsletter
- Discord Community Integration (500+ Member)
- Cross-Promotion auf allen unseren Social Media Kanälen
- Access zu unseren exklusiven Tools und Guides

Was wir von dir erwarten:
- 2 Social Media Posts über Fortnite Nexus
- 1 Discord Server Promotion
- Optional: Guide Contribution oder Collaboration

Wir sind offen für finanzielle Kompensation bei größeren Partnerships.

Interesse an einem Partnership Call?

Beste Grüße,
[Dein Name]
Fortnite Nexus`
    }
};

/* ═══════════════════════════════════════════
   [2] WAS ANBIETEN OHNE GELD
   ═══════════════════════════════════════════ */

const valueOfferings = {
    daten: [
        'Analytics Dashboard: Access zu unseren Website-Analytics',
        'Traffic Reports: Monatliche Traffic-Berichte',
        'User Insights: Demografische Daten unserer Besucher',
        'Performance Metrics: Conversion-Rates, Engagement-Metriken'
    ],
    exposure: [
        'Website Promo: Banner oder Featured Section',
        'Newsletter: Inclusion in wöchentlichem Newsletter',
        'Social Media: Cross-Promotion auf Twitter/TikTok',
        'Discord: Promotion in unserer Community'
    ],
    tools_zugang: [
        'Early Access: Beta-Access zu neuen Tools',
        'Exclusive Content: Exklusive Guides und Tipps',
        'API Access: Access zu unserer Waffen-Datenbank API',
        'Custom Tools: Custom Tools auf Anfrage'
    ]
};

/* ═══════════════════════════════════════════
   [3] 10 DEUTSCHE FORTNITE-CREATOR
   ═══════════════════════════════════════════ */

const germanCreators = [
    {
        name: '@NinjaGermany',
        followers: 15000,
        why: 'Deutschsprachiger Content Creator mit Fokus auf Tipps',
        content: 'Guides, Meta-Analysis, Settings',
        fit: 'Perfekt für Guide-Kooperation'
    },
    {
        name: '@FortniteDE_Pro',
        followers: 25000,
        why: 'Pro-Spieler mit kompetitivem Fokus',
        content: 'Ranked-Tipps, Pro-Matches, Meta',
        fit: 'Perfekt für Competitive-Content'
    },
    {
        name: '@GermanFortnite',
        followers: 8000,
        why: 'Wachsende Community mit DE-Fokus',
        content: 'News, Updates, Community',
        fit: 'Perfekt für Community-Growth'
    },
    {
        name: '@EpicDE',
        followers: 12000,
        why: 'High-Quality Content mit Production-Value',
        content: 'Guides, Tutorials, Montages',
        fit: 'Perfekt für Video-Kooperation'
    },
    {
        name: '@BattleRoyaleDE',
        followers: 5000,
        why: 'Nische BR-Content mit Fokus auf Fortnite',
        content: 'BR-Strategien, Meta, Tips',
        fit: 'Perfekt für Strategie-Content'
    },
    {
        name: '@SettingsMasterDE',
        followers: 3000,
        why: 'Settings-Spezialist mit Expertise',
        content: 'Settings-Guides, Optimization',
        fit: 'Perfekt für Settings-Tools'
    },
    {
        name: '@MobileFortniteDE',
        followers: 6000,
        why: 'Mobile-Spezialist mit Nischen-Fokus',
        content: 'Mobile-Tips, Settings, Meta',
        fit: 'Perfekt für Mobile-Community'
    },
    {
        name: '@ConsoleFortniteDE',
        followers: 4000,
        why: 'Console-Spezialist mit Controller-Fokus',
        content: 'Controller-Tips, Settings, Meta',
        fit: 'Perfekt für Console-Community'
    },
    {
        name: '@CreativeMapsDE',
        followers: 7000,
        why: 'Creative Map Spezialist',
        content: 'Map-Recommendations, Codes',
        fit: 'Perfekt für Creative-Tools'
    },
    {
        name: '@FortniteNewsDE',
        followers: 10000,
        why: 'News-Spezialist mit schnellen Updates',
        content: 'Patch-Notes, News, Leaks',
        fit: 'Perfekt für News-Integration'
    }
];

/* ═══════════════════════════════════════════
   [4] KOOPERATIONS-MODELLE
   ═══════════════════════════════════════════ */

const cooperationModels = [
    {
        name: 'Shoutout',
        what: 'Einmalige Social Media Erwähnung',
        gegenleistung: 'Shoutout auf unserer Website',
        zeitaufwand: 'Minimal (1 Post)',
        value: 'Schneller Exposure-Boost'
    },
    {
        name: 'Exklusiv-Content',
        what: 'Exklusiver Guide oder Content',
        gegenleistung: 'Featured auf unserer Website',
        zeitaufwand: 'Mittel (Guide erstellen)',
        value: 'Langfristiger Traffic'
    },
    {
        name: 'Co-Created Guide',
        what: 'Gemeinsam erstellter Guide',
        gegenleistung: 'Split-Exposure auf beiden Kanälen',
        zeitaufwand: 'Hoch (Zusammenarbeit)',
        value: 'Maximaler Synergie-Effekt'
    }
];

/* ═══════════════════════════════════════════
   [5] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann creator-cooperations.js importiert werden:

<script src="/creator-cooperations.js"></script>
<script>
    // Pitch-Emails rendern
    renderPitchEmails(pitchEmails);
    
    // Value Offerings rendern
    renderValueOfferings(valueOfferings);
    
    // German Creators rendern
    renderGermanCreators(germanCreators);
    
    // Cooperation Models rendern
    renderCooperationModels(cooperationModels);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
