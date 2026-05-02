/**
 * News Data for Fortnite Nexus
 * Blog/News system for fresh content and recurring visitors
 */

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'patch_notes' | 'item_shop' | 'events' | 'competitions' | 'tips' | 'leaks' | 'videos';
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  updatedAt: string;
  imageUrl?: string;
  tags: string[];
  featured: boolean;
  views: number;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'fortnite-patch-notes-v28-10',
    title: 'Fortnite Patch Notes v28.10 – Alle Änderungen im Detail',
    excerpt: 'Die neuesten Fortnite Patch Notes v28.10 sind hier! Neue Waffen, Map-Changes, Balance-Updates und mehr.',
    content: `
# Fortnite Patch Notes v28.10 – Alle Änderungen im Detail

Epic Games hat die neuen Patch Notes für Fortnite v28.10 veröffentlicht. Hier sind alle wichtigen Änderungen:

## Neue Waffen
- **Mythic Striker AR**: Exotische Version des Striker AR mit 15% mehr Damage
- **Heavy Sniper**: Rückkehr des Heavy Sniper mit erhöhtem Headshot-Damage

## Map-Changes
- **Tilted Towers**: Neue Gebäude und Loot-Location hinzugefügt
- **Pleasant Park**: Renovierung mit neuen POIs
- **Catty Corner**: Boss-Location geändert

## Balance-Updates
- Pump Shotgun: Damage leicht reduziert (-5%)
- Tactical SMG: Fire Rate erhöht (+10%)
- Striker AR: Keine Änderungen

## Bug-Fixes
- Fixed: Building-Animation bei bestimmten Sensitivity-Werten
- Fixed: Audio-Desync in Squad-Mode
- Fixed: Loot-Spawn-Rate in Named Locations

## Competitive-Changes
- Ranked-System: Neue Divisionen hinzugefügt
- Tournament-Mode: Verbesserte Matchmaking-Logik

## Was das für den Meta bedeutet
Die Balance-Updates werden den Meta leicht verschieben. Der Pump Shotgun ist immer noch dominant, aber Tactical SMG könnte mehr Usage sehen. Der neue Mythic Striker AR wird wahrscheinlich das Meta in Competitive Play dominieren.

## Pro-Tipp
Teste den neuen Mythic Striker AR in Creative bevor du ihn in Ranked nutzt. Die Recoil-Pattern ist anders als bei der normalen Version.
    `,
    category: 'patch_notes',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-25T10:00:00Z',
    updatedAt: '2026-02-25T10:00:00Z',
    tags: ['Patch Notes', 'v28.10', 'Balance', 'Map'],
    featured: true,
    views: 0,
  },
  {
    id: 'news-2',
    slug: 'fortnite-item-shop-rotation-2026-02-25',
    title: 'Fortnite Item Shop Rotation 2026-02-25 – Diese Skins sind heute im Shop',
    excerpt: 'Der aktuelle Fortnite Item Shop für den 25.02.2026. Alle Skins, Bundles und Daily Items im Überblick.',
    content: `
# Fortnite Item Shop Rotation 2026-02-25

Hier ist der aktuelle Item Shop für heute:

## Daily Items
- **Skin: Galaxy Scout** (Epic) - 1200 V-Bucks
- **Skin: Cyber Ninja** (Rare) - 800 V-Bucks
- **Back Bling: Tech Wings** (Uncommon) - 200 V-Bucks
- **Pickaxe: Neon Blade** (Rare) - 500 V-Bucks

## Featured Items
- **Bundle: Cyber Warrior Pack** (Legendary) - 2400 V-Bucks
  - Enthält: Cyber Warrior Skin, Back Bling, Pickaxe
- **Skin: Dragon Slayer** (Legendary) - 2000 V-Bucks
- **Glider: Fire Breath** (Epic) - 800 V-Bucks

## Shop-Tipps
Der Cyber Warrior Pack ist ein guter Deal wenn du noch kein Skin aus dem Set hast. Die Dragon Slayer Skin ist eine der besten Legendary Skins diese Season.

## Wann rotiert der Shop?
Der Item Shop rotiert täglich um 19:00 Uhr deutscher Zeit. Check morgen wieder für neue Items!
    `,
    category: 'item_shop',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-25T08:00:00Z',
    updatedAt: '2026-02-25T08:00:00Z',
    tags: ['Item Shop', 'Daily', 'Featured', 'Skins'],
    featured: true,
    views: 0,
  },
  {
    id: 'news-3',
    slug: 'fortnite-fncs-season-12-announcement',
    title: 'FNCS Season 12 Announcement – $3 Million Prize Pool',
    excerpt: 'Die Fortnite Championship Series Season 12 wurde offiziell angekündigt. $3 Million Prize Pool und neue Format-Änderungen.',
    content: `
# FNCS Season 12 Announcement – $3 Million Prize Pool

Epic Games hat die Fortnite Championship Series Season 12 offiziell angekündigt. Hier sind alle Details:

## Prize Pool
- **Gesamt**: $3 Million
- **Finale**: $1 Million
- **Qualifiers**: $2 Million verteilt über alle Regionen

## Format-Änderungen
- **Neue Region**: Middle East wird hinzugefügt
- **Trios statt Squads**: Format-Wechsel für mehr strategische Tiefe
- **Punkte-System**: Überarbeitet für fairere Balance

## Timeline
- **Qualifiers**: März - April 2026
- **Semifinals**: Mai 2026
- **Finale**: Juni 2026

## Qualifikation
- **Ranked-System**: Top 1000 jeder Region qualifizieren sich
- **Open Cups**: Jeder kann teilnehmen
- **Consistency-Points**: Neue Punkte für konstante Performance

## Was das für EU-Players bedeutet
EU-West und EU-Central haben separate Qualifier-Tracks. Das bedeutet mehr Chancen für EU-Players sich zu qualifizieren.

## Pro-Tipp
Starte jetzt mit Ranked-Grind wenn du dich qualifizieren willst. Die Konkurrenz wird intensiver je näher wir den Qualifiern kommen.
    `,
    category: 'competitions',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-24T15:00:00Z',
    updatedAt: '2026-02-24T15:00:00Z',
    tags: ['FNCS', 'Competitive', 'Prize Pool', 'Tournament'],
    featured: true,
    views: 0,
  },
  {
    id: 'news-4',
    slug: 'fortnite-aim-training-guide-2026',
    title: 'Fortnite Aim Training Guide 2026 – Besser Aim in 30 Tagen',
    excerpt: 'Der ultimative Aim Training Guide für Fortnite 2026. Übungen, Maps und Tipps für präzises Aim.',
    content: `
# Fortnite Aim Training Guide 2026 – Besser Aim in 30 Tagen

Besseres Aim ist einer der wichtigsten Skills in Fortnite. Hier ist dein 30-Tage Trainingsplan:

## Tag 1-7: Fundamentals
- **Crosshair Placement**: Immer auf Head-Höhe aimen
- **Tracking**: Bewegende Targets in Creative Maps tracken
- **Flick-Shots**: Schnelle Target-Wechsel üben

## Tag 8-14: Advanced Techniques
- **Prefireing**: Antizipiere Gegner-Bewegungen
- **Strafing**: Während des Aimens strafen
- **Peak-Shots**: Schnelle Peek-Shots üben

## Tag 15-21: Weapon-Specific Training
- **Shotgun**: Close-Range Aim Training
- **AR**: Mid-Range Tracking
- **Sniper**: Long-Range Precision

## Tag 22-30: Real-World Application
- **Ranked-Grind**: Aim in echten Matches anwenden
- **Review**: eigene Matches analysieren
- **Adjustment**: Sensitivity anpassen basierend auf Performance

## Empfohlene Creative Maps
- **Raider464's Aim Trainer**: Code: 6531-4403-0726
- **Skaavok Aim Trainer**: Code: 8026-7310-8225
- **Buck's Aim Duels**: Code: 5252-5243-2752

## Sensitivity-Tipps
- Starte mit niedriger Sensitivity und erhöhe langsam
- Die meisten Pros nutzen 4-6 cm/360°
- Teste verschiedene Werte über 1 Woche bevor du dich entscheidest
    `,
    category: 'tips',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-23T12:00:00Z',
    updatedAt: '2026-02-23T12:00:00Z',
    tags: ['Aim', 'Training', 'Guide', 'Improvement'],
    featured: false,
    views: 0,
  },
  {
    id: 'news-5',
    slug: 'fortnite-leaks-season-13-skins',
    title: 'Fortnite Leaks Season 13 – Diese Skins kommen in der neuen Season',
    excerpt: 'Exklusive Leaks zu den neuen Skins in Fortnite Season 13. Cyberpunk, Anime und mehr.',
    content: `
# Fortnite Leaks Season 13 – Diese Skins kommen

Reliable Leaks haben Details zu den neuen Skins in Season 13 enthüllt:

## Cyberpunk-Themed Skins
- **Neon Samurai**: Cyberpunk Samurai Skin mit Neon-Effekten
- **Cyber Hacker**: Hacker Skin mit Glitch-Effekten
- **Tech Ninja**: High-Tech Ninja Skin

## Anime-Collaboration
- **Attack on Titan**: Eren, Mikasa, Levi Skins
- **Demon Slayer**: Tanjiro, Nezuko Skins
- **My Hero Academia**: Deku, Bakugo Skins

## Battle Pass Skins
- **Chapter 1 Remakes**: Remixed Versionen von OG Skins
- **Mythic Variants**: Special Varianten von beliebten Skins

## Release-Dates
- **Battle Pass**: Start Season 13
- **Collaboration Skins**: Mitte Season 13
- **Item Shop Skins**: Wöchentliche Rotation

## Disclaimer
Diese Leaks basieren auf zuverlässigen Sources aber können sich noch ändern. Epic Games ändert oft Inhalte vor Release.
    `,
    category: 'leaks',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-22T18:00:00Z',
    updatedAt: '2026-02-22T18:00:00Z',
    tags: ['Leaks', 'Season 13', 'Skins', 'Collaboration'],
    featured: false,
    views: 0,
  },
  {
    id: 'news-6',
    slug: 'fortnite-event-fortnitemares-2026',
    title: 'Fortnite Fortnitemares 2026 – Alle Event-Details und Belohnungen',
    excerpt: 'Das jährliche Halloween-Event Fortnitemares 2026 ist da! Alle Details zu Quests, Belohnungen und Skins.',
    content: `
# Fortnite Fortnitemares 2026 – Event-Details

Fortnitemares 2026 ist das größte Halloween-Event in Fortnite. Hier sind alle Details:

## Event-Dates
- **Start**: 20. Oktober 2026
- **Ende**: 3. November 2026

## Neue Skins
- **Vampire Lord**: Legendary Vampire Skin
- **Zombie Nurse**: Epic Zombie Skin
- **Ghost Hunter**: Rare Ghost Skin
- **Witch**: Uncommon Witch Skin

## Event-Quests
- **Daily Quests**: Täglich neue Quests für XP
- **Weekly Quests**: Wöchentliche Challenge-Quests
- **Event-Quest**: Haupt-Storyline Quest

## Belohnungen
- **Free Rewards**: 3 Skins, 2 Back Blings, 1 Pickaxe
- **Premium Rewards**: 5 Skins, 3 Gliders, 2 Emotes
- **Secret Reward**: Special Skin nach Abschluss aller Quests

## Event-Modi
- **Zombie Royale**: Spezieller LTM mit Zombie-Horde
- **Ghost Hunt**: Ghost-Scavenger Hunt Mod
- **Boss Fight**: Spezieller Boss-Fight Mod

## Pro-Tipp
Fokussiere auf die Event-Quests zuerst – die Belohnungen sind limitiert und verschwinden nach dem Event.
    `,
    category: 'events',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-21T14:00:00Z',
    updatedAt: '2026-02-21T14:00:00Z',
    tags: ['Event', 'Halloween', 'Skins', 'Quests'],
    featured: false,
    views: 0,
  },
  {
    id: 'news-7',
    slug: 'fortnite-video-best-clips-february-2026',
    title: 'Beste Fortnite Clips Februar 2026 – Top Plays der Community',
    excerpt: 'Die besten Fortnite Clips aus Februar 2026. Insane Plays, Funny Moments und Pro-Highlights.',
    content: `
# Beste Fortnite Clips Februar 2026

Hier sind die besten Clips aus der Fortnite Community im Februar 2026:

## Top 5 Plays
1. **Insane 1v4 Clutch** – @FortniteProEU
   - Perfekter 1v4 mit Pump Shotgun und AR
2. **No-Scope Triple Kill** – @SniperKing
   - Drei No-Scope Kills in einer Rotation
3. **Building God** – @BuildMaster
   - Crazy 90er während Mid-Air
4. **Funny Fail** – @EpicFail
   - Hilarious Fall aus der Map
5. **Pro Highlight** – @FNCSWinner
   - Match-winning Play aus FNCS Finals

## Community Highlights
- **German Scene**: @DE_Fortnite Clips
- **EU Competitive**: @EU_Competitive
- **NA East**: @NA_East_Clips

## Wie du deinen Clip einreichen kannst
- Poste deinen Clip auf Twitter mit #FortniteNexus
- Tag uns @FortniteNexusDE
- Wir featured die besten Clips jede Woche!

## Clip-Tipps
- Nutze OBS oder NVIDIA Shadowplay für Aufnahme
- Editiere in Premiere Pro oder CapCut
- Fokus auf kurze, action-packed Clips (15-30 Sekunden)
    `,
    category: 'videos',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-20T16:00:00Z',
    updatedAt: '2026-02-20T16:00:00Z',
    tags: ['Clips', 'Highlights', 'Community', 'Best Plays'],
    featured: false,
    views: 0,
  },
  {
    id: 'news-8',
    slug: 'fortnite-building-tips-2026',
    title: 'Fortnite Building Tipps 2026 – Schneller und besser bauen',
    excerpt: 'Fortnite Building Tipps für 2026. Schnellere 90er, besser Editing und fortgeschrittene Techniken.',
    content: `
# Fortnite Building Tipps 2026

Building ist einer der wichtigsten Skills in Fortnite. Hier sind die besten Tipps für 2026:

## Grundlagen
- **Turbo Building**: Halte Build-Taste für kontinuierliches Building
- **Piece Control**: Baue um Gegner herum für Advantage
- **High Ground**: Immer höher als dein Gegner sein

## 90er-Technik
- **Edit-Reset**: Edit während des 90ers für Reset
- **Jump-90**: Springe während des 90ers für Speed
- **Cone-90**: Cone vor Ramp für Schutz

## Editing-Tipps
- **Instant Edit**: Aktiviere Instant Edit in Settings
- **Edit-Practice**: Übe täglich 30 Min in Creative
- **Edit-Shot**: Edit-Shot für schnelle Kills

## Advanced Techniken
- **Tunneling**: Tunnel durch Builds für Flucht
- **Box-Fighting**: Box-to-Box Combat
- **Retakes**: Structure Retakes für Advantage

## Creative Maps zum Üben
- **Raider464's Building**: Code: 7562-4396-0184
- **Buck's Building**: Code: 7751-5425-1287
- **CanDook's Editing**: Code: 0396-5257-5820

## Sensitivity für Building
- Build Sensitivity: 1.5x - 2.0x
- Edit Sensitivity: 2.0x - 2.5x
- Teste verschiedene Werte für deinen Style
    `,
    category: 'tips',
    author: 'Fortnite Nexus Team',
    publishedAt: '2026-02-19T10:00:00Z',
    updatedAt: '2026-02-19T10:00:00Z',
    tags: ['Building', 'Tips', 'Guide', 'Advanced'],
    featured: false,
    views: 0,
  },
];

export function getNewsArticleBySlug(slug: string): NewsArticle | undefined {
  return NEWS_ARTICLES.find((article) => article.slug === slug);
}

export function getNewsArticlesByCategory(category: string): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.category === category);
}

export function getFeaturedNews(): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.featured);
}

export function getLatestNews(limit: number = 10): NewsArticle[] {
  return NEWS_ARTICLES.slice(0, limit);
}
