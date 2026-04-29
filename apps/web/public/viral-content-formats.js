/*
 * FORTNITENEXUS.SPACE — VIRAL-CONTENT-FORMATE
 * 5 Content-Formate, Weekly Challenge, 6-Monats-Timeline
 * Masterplan 6 — Community-Dominanz
 */

/* ═══════════════════════════════════════════
   [1] VIRAL-CONTENT-FORMATE
   ═══════════════════════════════════════════ */

const viralContentFormats = [
    {
        name: 'Hidden Gem Discovery',
        example: 'Diese Waffe wird komplett unterschätzt – und hier ist warum',
        why_shared: 'Surprise-Faktor, Insider-Wissen',
        platforms: ['Twitter', 'Reddit', 'TikTok'],
        timing: 'Nach Patch-Updates'
    },
    {
        name: 'Data-Backed Analysis',
        example: 'Ich habe 1.000 Matches analysiert – hier sind die Ergebnisse',
        why_shared: 'Glaubwürdigkeit, Fakten-basiert',
        platforms: ['Reddit', 'YouTube', 'Twitter'],
        timing: 'Wöchentlich'
    },
    {
        name: 'Pro-Player Secret',
        example: 'Was Top-Spieler nicht über den Meta sagen',
        why_shared: 'Insider-Knowledge, Exklusivität',
        platforms: ['Twitter', 'Discord', 'Reddit'],
        timing: 'Nach Turnieren'
    },
    {
        name: 'Quick Win Tip',
        example: 'Dieser eine Tipp verbessert deinen Aim sofort',
        why_shared: 'Sofort anwendbar, hoher Value',
        platforms: ['TikTok', 'Twitter', 'Instagram'],
        timing: 'Täglich'
    },
    {
        name: 'Controversial Take',
        example: 'Warum diese Meta-Strategie eigentlich schlecht ist',
        why_shared: 'Kontroverse, Diskussion',
        platforms: ['Reddit', 'Twitter', 'YouTube'],
        timing: 'Nach Meta-Shifts'
    }
];

/* ═══════════════════════════════════════════
   [2] WEEKLY CHALLENGE SYSTEM
   ═══════════════════════════════════════════ */

const weeklyChallengeSystem = {
    challenge_flow: [
        {
            day: 'Montag',
            action: 'Neue Challenge angekündigt'
        },
        {
            day: 'Dienstag-Samstag',
            action: 'User können teilnehmen'
        },
        {
            day: 'Sonntag',
            action: 'Winner bekannt gegeben, Rewards verteilt'
        }
    ],
    challenge_examples: [
        {
            week: 1,
            challenge: '100 Kills in einer Woche'
        },
        {
            week: 2,
            challenge: 'Top 10 in 5 Matches'
        },
        {
            week: 3,
            challenge: '5 Wins in einer Woche'
        },
        {
            week: 4,
            challenge: '10.000 Damage in einer Woche'
        }
    ],
    rewards: [
        {
            tier: 'Winner',
            reward: 'Discord Role, Featured auf Website'
        },
        {
            tier: 'Top 3',
            reward: 'Discord Badge, Social Media Shoutout'
        },
        {
            tier: 'Alle Teilnehmer',
            reward: 'XP Boost in Discord'
        }
    ],
    why_it_works: [
        'Gamification: Belohnungssystem motiviert',
        'Community: Gemeinsames Ziel schafft Bindung',
        'Recurrence: Wöchentliche Wiederkehr garantiert'
    ]
};

/* ═══════════════════════════════════════════
   [3] 6-MONATS-TIMELINE
   ═══════════════════════════════════════════ */

const sixMonthTimeline = {
    monat_1: {
        weeks: [1, 2, 3, 4],
        massnahmen: [
            'Woche 1: Discord Server aufsetzen, Bot-Konfiguration',
            'Woche 2: Erste 50 Member durch Reddit und Twitter',
            'Woche 3: Erste Weekly Challenge, Creator Outreach',
            'Woche 4: Newsletter-Integration, Social Media Automation'
        ],
        erwartete_mitglieder: [25, 50, 100, 200],
        meilensteine: [
            'Woche 2: Erste 50 Member erreicht',
            'Woche 4: Erste 200 Member erreicht'
        ],
        anpassungen: [
            'Wenn <50 Member in Woche 2: Mehr Reddit-Posting',
            'Wenn <100 Member in Woche 3: Creator-Kooperationen intensivieren'
        ]
    },
    monat_2: {
        weeks: [5, 6, 7, 8],
        massnahmen: [
            'Woche 5: Erste Community Event, Tournament',
            'Woche 6: Reddit-Strategie ausweiten (mehr Subreddits)',
            'Woche 7: Creator Partnerships starten',
            'Woche 8: Discord-Features erweitern (Music Bot, etc.)'
        ],
        erwartete_mitglieder: [350, 500, 750, 1000],
        meilensteine: [
            'Woche 6: Erste 500 Member erreicht',
            'Woche 8: Erste 1.000 Member erreicht'
        ],
        anpassungen: [
            'Wenn <500 Member in Woche 6: Mehr Creator-Kooperationen',
            'Wenn <750 Member in Woche 7: Paid Promotion erwägen'
        ]
    },
    monat_3: {
        weeks: [9, 10, 11, 12],
        massnahmen: [
            'Woche 9: Erste Mid-Creator Partnerships',
            'Woche 10: YouTube-Integration starten',
            'Woche 11: TikTok-Kanal aufbauen',
            'Woche 12: Discord-Server optimieren'
        ],
        erwartete_mitglieder: [1500, 2000, 2500, 3000],
        meilensteine: [
            'Woche 10: Erste 2.000 Member erreicht',
            'Woche 12: Erste 3.000 Member erreicht'
        ],
        anpassungen: [
            'Wenn <2.000 Member in Woche 10: YouTube-Strategie intensivieren',
            'Wenn <2.500 Member in Woche 11: TikTok-Strategie ausweiten'
        ]
    },
    monat_4: {
        weeks: [13, 14, 15, 16],
        massnahmen: [
            'Woche 13: Erste Large-Creator Partnerships',
            'Woche 14: Community-Events skalieren',
            'Woche 15: Influencer-Kampagne starten',
            'Woche 16: Discord-Monetarisierung testen'
        ],
        erwartete_mitglieder: [4000, 5000, 6000, 7000],
        meilensteine: [
            'Woche 14: Erste 5.000 Member erreicht',
            'Woche 16: Erste 7.000 Member erreicht'
        ],
        anpassungen: [
            'Wenn <5.000 Member in Woche 14: Influencer-Kampagne intensivieren',
            'Wenn <6.000 Member in Woche 15: Paid Promotion testen'
        ]
    },
    monat_5: {
        weeks: [17, 18, 19, 20],
        massnahmen: [
            'Woche 17: Cross-Platform Promotion',
            'Woche 18: Community-Contest starten',
            'Woche 19: Affiliate-Programm für Creator',
            'Woche 20: Discord-Server erweitern'
        ],
        erwartete_mitglieder: [8000, 8500, 9000, 9500],
        meilensteine: [
            'Woche 17: Erste 8.000 Member erreicht',
            'Woche 20: Erste 9.500 Member erreicht'
        ],
        anpassungen: [
            'Wenn <8.000 Member in Woche 17: Cross-Platform intensivieren',
            'Wenn <9.000 Member in Woche 19: Contest ausweiten'
        ]
    },
    monat_6: {
        weeks: [21, 22, 23, 24],
        massnahmen: [
            'Woche 21: Viral-Kampagne starten',
            'Woche 22: Community-Events maximieren',
            'Woche 23: Creator-Programm skalieren',
            'Woche 24: 10.000 Member Ziel erreichen'
        ],
        erwartete_mitglieder: [9700, 9850, 9950, 10000],
        meilensteine: [
            'Woche 24: 10.000 Member erreicht (Ziel)'
        ],
        anpassungen: [
            'Wenn <9.700 Member in Woche 21: Viral-Kampagne intensivieren',
            'Wenn <10.000 Member in Woche 24: Letzter Push mit Paid Promotion'
        ]
    }
};

/* ═══════════════════════════════════════════
   [4] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann viral-content-formats.js importiert werden:

<script src="/viral-content-formats.js"></script>
<script>
    // Viral Content Formate rendern
    renderViralContentFormats(viralContentFormats);
    
    // Weekly Challenge System rendern
    renderWeeklyChallengeSystem(weeklyChallengeSystem);
    
    // 6-Monats-Timeline rendern
    renderSixMonthTimeline(sixMonthTimeline);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
