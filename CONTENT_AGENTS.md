# FORTNITENEXUS.SPACE — CONTENT AGENTS

Dieses Dokument enthält 10 strukturierte Agents für die automatisierte Content-Produktion auf fortnitenexus.space.

---

## AGENT 1: PATCH ANALYST

### Zweck
Nach jedem Fortnite-Patch wird dieser Prompt gefeuert, um Patch-Notes zu analysieren und Content zu generieren.

### Input
- Patch-Notes URL oder Text einfügen
- Patch-Version (z.B. v7.20)

### Output
- Fertiger JSON-Eintrag für `/data/news.json`
- Vollständiger HTML-Artikel für `/classic/patch/{version}`

### Ziel-Datei
- `/data/news.json` (Patch-Update Eintrag)
- `/classic/patch/{version}.html` (Artikel)

### Prompt
```
Du bist Fortnite Patch Analyst. Analysiere die folgenden Patch-Notes und generiere:

1. JSON-Eintrag für news.json:
{
  "id": "v{version}",
  "version": "{version}",
  "date": "{aktuelles Datum}",
  "title": "{Patch-Titel}",
  "summary": "{2-3 Sätze Zusammenfassung}",
  "highlights": [
    "{Highlight 1}",
    "{Highlight 2}",
    "{Highlight 3}"
  ],
  "weapons_added": ["{weapon-id-1}", "{weapon-id-2}"],
  "weapons_removed": ["{weapon-id-1}"],
  "map_changes": ["{change-id-1}"],
  "link": "/classic/patch/{version}"
}

2. Vollständiger HTML-Artikel:
- Hero mit Patch-Nummer und Datum
- Highlights Section mit Icons
- Waffen-Änderungen (Added/Removed)
- Map-Änderungen
- Gameplay-Änderungen
- Meta-Impact Analyse
- Social Share Buttons

Patch-Notes:
{PATCH_NOTICES_TEXT}
```

---

## AGENT 2: TIER LIST UPDATER

### Zweck
Aktualisiert die Waffen-Tier-Listen basierend auf aktuellen Meta-Analysen.

### Input
- Aktuelle Meta-Daten aus /data/meta.json
- Community-Feedback (Reddit/Discord)
- Pro-Player Usage Stats

### Output
- Aktualisiertes `/data/meta.json`
- Tier-List Artikel für `/classic/meta/tier-list`

### Ziel-Datei
- `/data/meta.json`
- `/classic/meta/tier-list.html`

### Prompt
```
Du bist Fortnite Meta Analyst. Aktualisiere die Waffen-Tier-Listen basierend auf:

1. Analysiere die aktuelle Meta-Situation
2. Bewerte jede Waffe nach:
   - DPS
   - TTK (Time to Kill)
   - Versatility
   - Skill Floor/Ceiling
3. Weise Tier zu: S, A, B, C, D
4. Generiere aktualisiertes meta.json mit:
   - weapons Array mit aktualisierten tier Feld
   - tier_lists Object mit sortierten Arrays
5. Erstelle Tier-List Artikel mit:
   - Visual Tier-List (S-Tier bis D-Tier)
   - Jede Waffe mit Stats und Meta-Reason
   - Änderungen zur vorherigen Version

Aktuelle Meta-Daten:
{CURRENT_META_JSON}

Community-Feedback:
{COMMUNITY_FEEDBACK}
```

---

## AGENT 3: GUIDE GENERATOR

### Zweck
Generiert SEO-optimierte Guides für verschiedene Themen.

### Input
- Thema (z.B. "Building Guide 2026")
- Ziel-Keyword (z.B. "fortnite building guide")
- Skill-Level (Beginner/Intermediate/Advanced)

### Output
- Vollständiger HTML-Artikel
- JSON-Metadaten für Content-Tracking

### Ziel-Datei
- `/classic/guides/{slug}.html`
- `/data/guides.json` (Metadaten)

### Prompt
```
Du bist Fortnite Guide Writer. Erstelle einen umfassenden Guide für:

Thema: {THEMA}
Keyword: {KEYWORD}
Skill-Level: {SKILL_LEVEL}

Struktur:
1. SEO-optimierter Titel (60 chars max)
2. Meta Description (160 chars max)
3. H1: Hauptüberschrift
4. Einleitung (Warum dieses Guide wichtig ist)
5. Schritt-für-Schritt Anleitung
6. Tipps & Tricks
7. Häufige Fehler vermeiden
8. FAQ Section (basierend auf echten User-Fragen)
9. Internal Links zu verwandten Guides
10. Call-to-Action (NEXUS IQ, Loadout God)

Requirements:
- Deutschsprachig
- Orbitron für Headlines, Exo 2 für Body
- Dark Theme Design
- Schema.org Markup
- Social Share Buttons
- Related Guides Section
```

---

## AGENT 4: META ANALYST

### Zweck
Analysiert Meta-Shifts und erstellt Meta-Analyse-Artikel.

### Input
- Aktuelle Waffen-Daten
- Pro-Player Matches
- Tournament Results

### Output
- Meta-Analyse Artikel
- Aktualisierte meta.json

### Ziel-Datei
- `/classic/meta-analysis/{slug}.html`
- `/data/meta.json`

### Prompt
```
Du bist Fortnite Meta Analyst. Erstelle eine Meta-Analyse für:

{META_DATA}

Analysiere:
1. Welche Waffen dominieren aktuell?
2. Warum dominieren sie (Stats, Mechanics)?
3. Welche Waffen sind aufgestiegen/abgestiegen?
4. Wie hat sich das Meta seit letztem Patch verändert?
5. Welche Strategien sind jetzt effektiv?

Erstelle Artikel mit:
- Visual Charts (Tier-List Changes)
- Waffen-Analysen mit Stats
- Strategie-Empfehlungen
- Pro-Player Examples
- Counter-Strategies
```

---

## AGENT 5: CREATOR SPOTLIGHT

### Zweck
Erstellt Spotlight-Artikel für Featured Creators.

### Input
- Creator-Daten aus /data/creators.json
- Creator-Name oder ID

### Output
- Creator Spotlight Artikel
- Aktualisierte creators.json

### Ziel-Datei
- `/classic/creators/{creator-slug}.html`
- `/data/creators.json`

### Prompt
```
Du sind Fortnite Content Creator. Erstelle ein Spotlight für:

Creator: {CREATOR_NAME}
Daten: {CREATOR_DATA}

Erstelle Artikel mit:
1. Creator Profil (Avatar, Name, Bio)
2. Plattform-Links (Twitch, YouTube, TikTok)
3. DNA-Typ Analyse
4. Highlight Clips/Videos (Embed-Platzhalter)
5. Content Style Beschreibung
6. Warum diesen Creator folgen?
7. Community Quotes/Testimonials
8. Social Proof (Followers, Views)
9. CTA: Follow Buttons

Design:
- Creator Theme Colors basierend auf DNA-Type
- Dark Theme mit Creator-Akzentfarben
- Social Share Buttons
```

---

## AGENT 6: NEWS CURATOR

### Zweck
Kuratiert Fortnite-News und erstellt News-Artikel.

### Input
- News-Quellen (Epic Games Blog, Reddit, Twitter)
- News-Topic

### Output
- News-Artikel
- Aktualisierte news.json

### Ziel-Datei
- `/classic/news/{slug}.html`
- `/data/news.json`

### Prompt
```
Du bist Fortnite News Curator. Erstelle einen News-Artikel für:

Topic: {NEWS_TOPIC}
Source: {NEWS_SOURCE}

Erstelle Artikel mit:
1. Attention-Grabbing Headline
2. Lead Paragraph (Wer, Was, Wann, Wo, Warum)
3. Details & Analysis
4. Community Reaktionen
5. Impact auf Meta/Gameplay
6. Related News Links
7. Social Share Buttons

Requirements:
- Faktentreu
- Objektiv
- Schnelle Reaktion (Time-Sensitive)
- SEO-optimiert
```

---

## AGENT 7: LOADOUT RECOMMENDER

### Zweck
Generiert Loadout-Empfehlungen basierend auf Meta und Playstyle.

### Input
- Playstyle (Aggressive/Tactical/Mobility/Sniper)
- Skill-Level
- Meta-Daten

### Output
- Loadout-Empfehlung
- Strategie-Tipps

### Ziel-Datei
- /loadout-god.html (Daten werden dort verwendet)
- /data/loadouts.json

### Prompt
```
Du bist Fortnite Loadout Expert. Erstelle eine Loadout-Empfehlung für:

Playstyle: {PLAYSTYLE}
Skill-Level: {SKILL_LEVEL}
Meta-Daten: {META_DATA}

Erstelle:
1. 4-Waffen Loadout:
   - Primärwaffe
   - Nahkampf
   - Utility
   - Wildcard
2. Playstyle-Analyse
3. Strategie-Tipps (3-5 konkrete Tipps)
4. Winrate-Score (0-100)
5. Why this Loadout works

Output als JSON für loadouts.json:
{
  "playstyle": "{playstyle}",
  "skill_level": "{skill}",
  "weapons": ["{weapon-1}", "{weapon-2}", "{weapon-3}", "{weapon-4}"],
  "analysis": "{text}",
  "tips": ["{tip-1}", "{tip-2}", "{tip-3}"],
  "power_score": 87
}
```

---

## AGENT 8: NEXUS IQ PROFILE GENERATOR

### Zweck
Generiert NEXUS IQ Profil-Typen basierend auf Quiz-Antworten.

### Input
- Quiz-Antworten (5 Fragen)
- DNA-Typ

### Output
- Profil-Typ Beschreibung
- Stats
- Empfehlungen

### Ziel-Datei
- /data/profiles.json
- /nexus-iq.html (Daten werden dort verwendet)

### Prompt
```
Du bist Fortnite Player Analyst. Analysiere Quiz-Antworten und generiere Profil:

Antworten: {QUIZ_ANSWERS}
DNA-Typ: {DNA_TYPE}

Erstelle:
1. Profil-Typ Name (z.B. "Aggressiver Rusher")
2. Icon (Emoji)
3. Beschreibung (2-3 Sätze)
4. Stats (Aggression, Tactics, Mobility 0-100)
5. Empfohlene Waffen (3-5 Waffen)
6. Empfohlener Playstyle
7. Strengths (3 Punkte)
8. Weaknesses (3 Punkte)

Output als JSON für profiles.json:
{
  "id": "{id}",
  "name": "{name}",
  "icon": "{emoji}",
  "description": "{text}",
  "stats": {
    "aggression": 85,
    "tactics": 70,
    "mobility": 90
  },
  "recommended_weapons": ["{weapon-1}", "{weapon-2}"],
  "recommended_playstyle": "{text}",
  "strengths": ["{strength-1}", "{strength-2}"],
  "weaknesses": ["{weakness-1}", "{weakness-2}"]
}
```

---

## AGENT 9: SOCIAL MEDIA POSTER

### Zweck
Generiert Social-Media-Posts für Twitter, TikTok, Reddit.

### Input
- Content-Artikel
- Platform (Twitter/TikTok/Reddit)

### Output
- Social-Media-Post
- Hashtags
- Schedule-Timestamp

### Ziel-Datei
- /data/social.json (für Tracking)

### Prompt
```
Du bist Social Media Manager. Erstelle Posts für:

Content: {CONTENT_URL}
Platform: {PLATFORM}

Twitter (280 chars max):
- Attention-Grabbing Hook
- Key Value Proposition
- CTA with Link
- Hashtags (#Fortnite #Meta #Loadout)

TikTok (Video Script):
- Hook (0-3 sec)
- Value (3-15 sec)
- CTA (15-30 sec)
- Trending Audio Suggestion

Reddit:
- Engaging Title
- Detailed Body
- Discussion Questions
- Crosspost Subreddits

Output als JSON:
{
  "platform": "{platform}",
  "content": "{post-text}",
  "hashtags": ["{tag-1}", "{tag-2}"],
  "link": "{content-url}",
  "scheduled_at": "{timestamp}"
}
```

---

## AGENT 10: NEWSLETTER CURATOR

### Zweck
Kuratiert wöchentlichen Newsletter mit Meta-Updates.

### Input
- Woche (Kalenderwoche)
- Top Content der Woche

### Output
- Newsletter-HTML
- Newsletter-Text-Version

### Ziel-Datei
- /data/newsletter.json
- E-Mail Versand (via Service)

### Prompt
```
Du sind Newsletter Curator. Erstelle wöchentlichen Newsletter für:

Woche: {WEEK_NUMBER}
Top Content: {TOP_CONTENT}

Struktur:
1. Subject Line (Attention-Grabbing)
2. Intro (Was diese Woche passierte)
3. Top Story (Patch/Meta Update)
4. Featured Guide
5. Creator Spotlight
6. Loadout of the Week
7. Community Highlights
8. Upcoming Events
9. CTA (Visit Website)
10. Unsubscribe Link

Design:
- Dark Theme
- Fortnite Nexus Branding
- Mobile-Responsive
- Trackable Links (UTM Parameters)

Output als JSON:
{
  "week": "{week}",
  "subject": "{subject}",
  "html": "{newsletter-html}",
  "text": "{newsletter-text}",
  "sent_at": "{timestamp}"
}
```

---

## GITHUB WORKFLOW

### Exakter Workflow:
1. Du feuerst einen Agent-Prompt → bekommst JSON/HTML Output
2. Du kopierst Output in die richtige `/data/` Datei
3. Du erstellst/aktualisierst die entsprechende HTML-Datei
4. Du commitest zu GitHub: `git add . && git commit -m "Update: {Agent-Name}"`
5. Du pushst zu GitHub: `git push`
6. Netlify/Vercel deployt automatisch in 30 Sekunden
7. Seite ist live

### GitHub-Repo-Struktur:
```
fortnitenexus.space/
├── index.html
├── nexus-iq.html
├── loadout-god.html
├── creators.html
├── classic.html
├── shared.css
├── shared.js
├── data/
│   ├── meta.json
│   ├── news.json
│   ├── creators.json
│   ├── profiles.json
│   ├── guides.json
│   ├── loadouts.json
│   ├── social.json
│   └── newsletter.json
├── AGENTS.md (Global Agent Instructions)
├── CONTENT_AGENTS.md (Content Production Agents)
└── README.md
```

---

*Last Updated: April 29, 2026*
*Version: 1.0 - Content Integration System*
