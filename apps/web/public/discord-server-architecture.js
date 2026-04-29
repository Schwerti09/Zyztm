/*
 * FORTNITENEXUS.SPACE — DISCORD-SERVER-ARCHITEKTUR
 * Channel-Struktur, Rollen-System, Onboarding-Flow, Engagement-Mechaniken
 * Masterplan 6 — Community-Dominanz
 */

/* ═══════════════════════════════════════════
   [1] CHANNEL-STRUKTUR
   ═══════════════════════════════════════════ */

const channelStructure = {
    information_channels: [
        {
            name: '#willkommen',
            purpose: 'Onboarding für neue Member',
            rules: 'Nur Begrüßung, keine Fragen',
            auto_message: 'Willkommen bei Fortnite Nexus! Lies #regeln und #info'
        },
        {
            name: '#regeln',
            purpose: 'Server-Regeln und Guidelines',
            rules: 'Nur Mods können posten',
            content: '10 Server-Regeln, Consequences'
        },
        {
            name: '#info',
            purpose: 'Wichtige Informationen und Updates',
            rules: 'Nur Mods können posten',
            content: 'Roadmap, Updates, Ankündigungen'
        },
        {
            name: '#ankündigungen',
            purpose: 'Wichtige Server-News',
            rules: 'Nur Mods können posten',
            content: 'Major Updates, Events, Changes'
        }
    ],
    general_channels: [
        {
            name: '#allgemein',
            purpose: 'Allgemeine Fortnite-Diskussion',
            rules: 'Kein Spam, respektvoll sein',
            topics: 'Alles Fortnite-bezogene'
        },
        {
            name: '#meta-diskussion',
            purpose: 'Meta-Updates und Strategien',
            rules: 'Nur Meta-bezogene Diskussionen',
            topics: 'Patch-Notes, Meta-Shifts, Loadouts'
        },
        {
            name: '#guides-tips',
            purpose: 'Guide-Sharing und Tipps',
            rules: 'Konstruktives Feedback',
            topics: 'Guides, Tipps, Tricks'
        },
        {
            name: '#lfg-suche',
            purpose: 'Looking For Group',
            rules: 'Platform, Region, Skill-Level angeben',
            topics: 'Team-Suche, Duos, Squads'
        }
    ],
    competitive_channels: [
        {
            name: '#ranked',
            purpose: 'Ranked-Diskussion',
            rules: 'Keine Toxizität',
            topics: 'Ranked-Strategien, Points, Arena'
        },
        {
            name: '#tournament',
            purpose: 'Turnier-Informationen',
            rules: 'Nur offizielle Turniere',
            topics: 'Cash Cups, FNCS, Community-Turniere'
        },
        {
            name: '#pro-talk',
            purpose: 'Pro-Player Diskussionen',
            rules: 'Respektvoll bleiben',
            topics: 'Pro-Matches, Scrims, Meta'
        }
    ],
    tools_resources: [
        {
            name: '#tools',
            purpose: 'Tool-Sharing und Recommendations',
            rules: 'Nur Fortnite-Tools',
            topics: 'Aim Lab, Sensitivity Calculator, etc.'
        },
        {
            name: '#stats',
            purpose: 'Stats-Sharing und -Analyse',
            rules: 'Kein Bragging, konstruktiv',
            topics: 'Win Rates, KD, Improvement'
        },
        {
            name: '#creator-support',
            purpose: 'Creator-Support',
            rules: 'Hilfsbereit sein',
            topics: 'Creator-Fragen, Setup, Growth'
        }
    ],
    events_activities: [
        {
            name: '#events',
            purpose: 'Event-Informationen',
            rules: 'Nur Mods posten Events',
            topics: 'Weekly Events, Tournaments, Giveaways'
        },
        {
            name: '#giveaways',
            purpose: 'Giveaway-Informationen',
            rules: 'Nur Mods posten Giveaways',
            topics: 'Skin-Giveaways, V-Bucks, etc.'
        },
        {
            name: '#weekly-challenge',
            purpose: 'Wöchentliche Challenges',
            rules: 'Jeden Montag neue Challenge',
            topics: 'Aim-Challenges, Building-Challenges, etc.'
        }
    ],
    support: [
        {
            name: '#support',
            purpose: 'Support-Tickets',
            rules: 'Support-Ticket System nutzen',
            topics: 'Technical Issues, Account Problems'
        },
        {
            name: '#feedback',
            purpose: 'Feedback und Suggestions',
            rules: 'Konstruktives Feedback',
            topics: 'Server-Feedback, Feature-Requests'
        }
    ]
};

/* ═══════════════════════════════════════════
   [2] ROLLEN-SYSTEM
   ═══════════════════════════════════════════ */

const roleSystem = {
    visitor: {
        name: 'Visitor',
        color: '#9CA3AF',
        permissions: ['read_welcome', 'read_rules'],
        promotion_criteria: 'Akzeptieren der Regeln'
    },
    member: {
        name: 'Member',
        color: '#22C55E',
        permissions: ['read_all', 'post_general'],
        promotion_criteria: '5+ Messages in 7 Tagen',
        perks: ['Zugriff auf #guides-tips', '#lfg-suche']
    },
    veteran: {
        name: 'Veteran',
        color: '#3B82F6',
        permissions: ['member_permissions', 'post_meta'],
        promotion_criteria: '100+ Messages, 30 Tage auf Server',
        perks: ['Veteran Badge', 'Priority Support']
    },
    mod: {
        name: 'Mod',
        color: '#F59E0B',
        permissions: ['moderate_all', 'give_warnings'],
        promotion_criteria: 'Von Staff ernannt',
        perks: ['Mod Badge', 'Ban-Kick Rechte']
    },
    staff: {
        name: 'Staff',
        color: '#EF4444',
        permissions: ['all_permissions', 'change_settings'],
        promotion_criteria: 'Von Server-Owner ernannt',
        perks: ['Staff Badge', 'Full Admin']
    }
};

/* ═══════════════════════════════════════════
   [3] ONBOARDING-FLOW
   ═══════════════════════════════════════════ */

const onboardingFlow = [
    {
        time: '0-10s',
        action: 'Auto-Willkommens-Message in #willkommen'
    },
    {
        time: '10-30s',
        action: 'DM mit Regeln und #regeln Channel'
    },
    {
        time: '30-45s',
        action: 'Aufforderung #regeln zu lesen und zu akzeptieren'
    },
    {
        time: '45-60s',
        action: 'Rolle "Visitor" zu "Member" upgraden'
    },
    {
        time: '60s+',
        action: 'Einführung in #allgemein mit Welcome-Post'
    }
];

/* ═══════════════════════════════════════════
   [4] STICKY ENGAGEMENT-MECHANIKEN
   ═══════════════════════════════════════════ */

const engagementMechanics = [
    {
        name: 'Daily Question of the Day',
        description: 'Jeden Tag eine Frage in #allgemein',
        frequency: 'daily'
    },
    {
        name: 'Weekly Meta Poll',
        description: 'Wöchentliche Umfrage zum aktuellen Meta',
        frequency: 'weekly'
    },
    {
        name: 'Patch-Alert Bot',
        description: 'Automatische Alerts bei neuen Patches',
        frequency: 'on_patch'
    },
    {
        name: 'Item Shop Highlight',
        description: 'Täglicher Highlight aus dem Item Shop',
        frequency: 'daily'
    },
    {
        name: 'Pro-Tip of the Day',
        description: 'Täglich ein Pro-Tip in #guides-tips',
        frequency: 'daily'
    },
    {
        name: 'Weekly Challenge',
        description: 'Wöchentliche Challenge mit Leaderboard',
        frequency: 'weekly'
    },
    {
        name: 'Creator Spotlight',
        description: 'Wöchentliche Vorstellung eines Creators',
        frequency: 'weekly'
    },
    {
        name: 'Trivia Tuesday',
        description: 'Dientags Fortnite-Trivia mit Rewards',
        frequency: 'weekly'
    },
    {
        name: 'Feedback Friday',
        description: 'Freitags Feedback-Session',
        frequency: 'weekly'
    },
    {
        name: 'Stats Sunday',
        description: 'Sonntags Stats-Sharing und -Analyse',
        frequency: 'weekly'
    }
];

/* ═══════════════════════════════════════════
   [5] BOT-KONFIGURATION
   ═══════════════════════════════════════════ */

const botConfiguration = {
    carl_bot: {
        auto_role: 'Auto-Rolle nach Regel-Akzeptierung',
        welcome_message: 'Custom Welcome-Message',
        reaction_roles: 'Reaktions-Rollen für Platform/Region',
        ticket_system: 'Support-Ticket System',
        auto_mod: 'Auto-Moderation für Spam/Toxizität'
    },
    mee6: {
        leveling_system: 'XP-System für Messages',
        role_rewards: 'Rollen basierend auf Level',
        custom_commands: 'Custom Commands für häufige Fragen',
        leaderboards: 'Leaderboards für Activity',
        notifications: 'Notifications für @mentions'
    },
    dyno: {
        music_bot: 'Music für Voice-Channels',
        reminder: 'Reminder für Events',
        polls: 'Poll-System für Umfragen',
        giveaways: 'Giveaway-System',
        moderation: 'Additional Moderation-Tools'
    }
};

/* ═══════════════════════════════════════════
   [6] WÖCHENTLICHE EVENTS-PLANUNG
   ═══════════════════════════════════════════ */

const weeklyEvents = {
    montag: [
        {
            time: '09:00 UTC',
            event: 'Weekly Challenge Announcement'
        },
        {
            time: '12:00 UTC',
            event: 'Meta Poll (Woche startet)'
        },
        {
            time: '18:00 UTC',
            event: 'Creator Spotlight'
        }
    ],
    dienstag: [
        {
            time: '09:00 UTC',
            event: 'Trivia Tuesday Start'
        },
        {
            time: '18:00 UTC',
            event: 'Trivia Tuesday Winner Announcement'
        }
    ],
    mittwoch: [
        {
            time: '12:00 UTC',
            event: 'Mid-Week Meta-Update'
        },
        {
            time: '18:00 UTC',
            event: 'Community Game Night'
        }
    ],
    donnerstag: [
        {
            time: '09:00 UTC',
            event: 'Patch-Alert Check (wenn Patch)'
        },
        {
            time: '18:00 UTC',
            event: 'Guide-Sharing Session'
        }
    ],
    freitag: [
        {
            time: '09:00 UTC',
            event: 'Feedback Friday Start'
        },
        {
            time: '18:00 UTC',
            event: 'Weekly Challenge Reminder'
        }
    ],
    samstag: [
        {
            time: '12:00 UTC',
            event: 'Community Tournament (wöchentlich)'
        },
        {
            time: '18:00 UTC',
            event: 'Tournament Results'
        }
    ],
    sonntag: [
        {
            time: '12:00 UTC',
            event: 'Stats Sunday Start'
        },
        {
            time: '18:00 UTC',
            event: 'Weekly Challenge Winner Announcement'
        }
    ]
};

/* ═══════════════════════════════════════════
   [7] INTEGRATION-ANLEITUNG
   ═══════════════════════════════════════════ */

/*
Auf jeder Seite kann discord-server-architecture.js importiert werden:

<script src="/discord-server-architecture.js"></script>
<script>
    // Channel-Struktur rendern
    renderChannelStructure(channelStructure);
    
    // Rollen-System rendern
    renderRoleSystem(roleSystem);
    
    // Onboarding-Flow rendern
    renderOnboardingFlow(onboardingFlow);
    
    // Engagement-Mechaniken rendern
    renderEngagementMechanics(engagementMechanics);
</script>
*/

/* Claude × Rolle — fortnitenexus.space — Nr. 1 */
