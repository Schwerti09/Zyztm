# Masterplan 6: Community-Dominanz-Strategie

## Ziel
0 auf 10.000 aktive Member in 6 Monaten

## Strategie
Du bist Community-Growth-Experte der für Gaming-Brands Communitys von 0 auf 100k aufgebaut hat. Entwickle die vollständige Community-Strategie für fortnitenexus.space – eine Strategie die organisch wächst, keine bezahlte Werbung braucht und eine loyale Fangemeinde schafft die die Seite selbst promotet.

---

# [1] DISCORD-SERVER-ARCHITEKTUR (vollständig)

## Channel-Struktur (jeder Channel mit Name, Zweck, Regeln)

### 📢 Information Channels
```
#willkommen
  Zweck: Onboarding für neue Member
  Regeln: Nur Begrüßung, keine Fragen
  Auto-Message: "Willkommen bei Fortnite Nexus! Lies #regeln und #info"

#regeln
  Zweck: Server-Regeln und Guidelines
  Regeln: Nur Mods können posten
  Inhalt: 10 Server-Regeln, Consequences

#info
  Zweck: Wichtige Informationen und Updates
  Regeln: Nur Mods können posten
  Inhalt: Roadmap, Updates, Ankündigungen

#ankündigungen
  Zweck: Wichtige Server-News
  Regeln: Nur Mods können posten
  Inhalt: Major Updates, Events, Changes
```

### 💬 General Channels
```
#allgemein
  Zweck: Allgemeine Fortnite-Diskussion
  Regeln: Kein Spam, respektvoll sein
  Themen: Alles Fortnite-bezogene

#meta-diskussion
  Zweck: Meta-Updates und Strategien
  Regeln: Nur Meta-bezogene Diskussionen
  Themen: Patch-Notes, Meta-Shifts, Loadouts

#guides-tips
  Zweck: Guide-Sharing und Tipps
  Regeln: Konstruktives Feedback
  Themen: Guides, Tipps, Tricks

#lfg-suche
  Zweck: Looking For Group
  Regeln: Platform, Region, Skill-Level angeben
  Themen: Team-Suche, Duos, Squads
```

### 🎮 Competitive Channels
```
#ranked
  Zweck: Ranked-Diskussion
  Regeln: Keine Toxizität
  Themen: Ranked-Strategien, Points, Arena

#tournament
  Zweck: Turnier-Informationen
  Regeln: Nur offizielle Turniere
  Themen: Cash Cups, FNCS, Community-Turniere

#pro-talk
  Zweck: Pro-Player Diskussionen
  Regeln: Respektvoll bleiben
  Themen: Pro-Matches, Scrims, Meta
```

### 📊 Tools & Resources
```
#tools
  Zweck: Tool-Sharing und Recommendations
  Regeln: Nur Fortnite-Tools
  Themen: Aim Lab, Sensitivity Calculator, etc.

#stats
  Zweck: Stats-Sharing und -Analyse
  Regeln: Kein Bragging, konstruktiv
  Themen: Win Rates, KD, Improvement

#creator-support
  Zweck: Creator-Support
  Regeln: Hilfsbereit sein
  Themen: Creator-Fragen, Setup, Growth
```

### 🎉 Events & Activities
```
#events
  Zweck: Event-Informationen
  Regeln: Nur Mods posten Events
  Themen: Weekly Events, Tournaments, Giveaways

#giveaways
  Zweck: Giveaway-Informationen
  Regeln: Nur Mods posten Giveaways
  Themen: Skin-Giveaways, V-Bucks, etc.

#weekly-challenge
  Zweck: Wöchentliche Challenges
  Regeln: Jeden Montag neue Challenge
  Themen: Aim-Challenges, Building-Challenges, etc.
```

### 🔧 Support
```
#support
  Zweck: Support-Tickets
  Regeln: Support-Ticket System nutzen
  Themen: Technical Issues, Account Problems

#feedback
  Zweck: Feedback und Suggestions
  Regeln: Konstruktives Feedback
  Themen: Server-Feedback, Feature-Requests
```

## Rollen-System (Visitor → Member → Veteran → Mod → Staff)

### Visitor (Standard)
- **Farbe:** Grau
- **Rechte:** Nur #willkommen und #regeln lesen
- **Aufstieg:** Akzeptieren der Regeln

### Member
- **Farbe:** Grün
- **Rechte:** Alle Channels lesen, #allgemein posten
- **Aufstieg:** 5+ Messages in 7 Tagen
- **Perks:** Zugriff auf #guides-tips, #lfg-suche

### Veteran
- **Farbe:** Blau
- **Rechte:** Member Rechte + #meta-diskussion posten
- **Aufstieg:** 100+ Messages, 30 Tage auf Server
- **Perks:** Veteran Badge, Priority Support

### Mod
- **Farbe:** Orange
- **Rechte:** Alle Channels moderieren, Warnungen verteilen
- **Aufstieg:** Von Staff ernannt
- **Perks:** Mod Badge, Ban-Kick Rechte

### Staff
- **Farbe:** Rot
- **Rechte:** Alle Rechte, Server-Einstellungen ändern
- **Aufstieg:** Von Server-Owner ernannt
- **Perks:** Staff Badge, Full Admin

## Onboarding-Flow (erste 60 Sekunden nach Beitritt)

1. **Sekunde 0-10:** Auto-Willkommens-Message in #willkommen
2. **Sekunde 10-30:** DM mit Regeln und #regeln Channel
3. **Sekunde 30-45:** Aufforderung #regeln zu lesen und zu akzeptieren
4. **Sekunde 45-60:** Rolle "Visitor" zu "Member" upgraden
5. **Sekunde 60+:** Einführung in #allgemein mit Welcome-Post

## 10 "Sticky Engagement"-Mechaniken die täglich Aktivität erzeugen

1. **Daily Question of the Day** – Jeden Tag eine Frage in #allgemein
2. **Weekly Meta Poll** – Wöchentliche Umfrage zum aktuellen Meta
3. **Patch-Alert Bot** – Automatische Alerts bei neuen Patches
4. **Item Shop Highlight** – Täglicher Highlight aus dem Item Shop
5. **Pro-Tip of the Day** – Täglich ein Pro-Tip in #guides-tips
6. **Weekly Challenge** – Wöchentliche Challenge mit Leaderboard
7. **Creator Spotlight** – Wöchentliche Vorstellung eines Creators
8. **Trivia Tuesday** – Dientags Fortnite-Trivia mit Rewards
9. **Feedback Friday** – Freitags Feedback-Session
10. **Stats Sunday** – Sonntags Stats-Sharing und -Analyse

## Bot-Konfiguration (Carl-bot, MEE6 etc.)

### Carl-bot
- **Auto-Role:** Auto-Rolle nach Regel-Akzeptierung
- **Welcome-Message:** Custom Welcome-Message
- **Reaction-Roles:** Reaktions-Rollen für Platform/Region
- **Ticket-System:** Support-Ticket System
- **Auto-Mod:** Auto-Moderation für Spam/Toxizität

### MEE6
- **Leveling System:** XP-System für Messages
- **Role-Rewards:** Rollen basierend auf Level
- **Custom Commands:** Custom Commands für häufige Fragen
- **Leaderboards:** Leaderboards für Activity
- **Notifications:** Notifications für @mentions

### Dyno
- **Music Bot:** Music für Voice-Channels
- **Reminder:** Reminder für Events
- **Polls:** Poll-System für Umfragen
- **Giveaways:** Giveaway-System
- **Moderation:** Additional Moderation-Tools

## Wöchentliche Events-Planung

### Montag
- **09:00 UTC:** Weekly Challenge Announcement
- **12:00 UTC:** Meta Poll (Woche startet)
- **18:00 UTC:** Creator Spotlight

### Dienstag
- **09:00 UTC:** Trivia Tuesday Start
- **18:00 UTC:** Trivia Tuesday Winner Announcement

### Mittwoch
- **12:00 UTC:** Mid-Week Meta-Update
- **18:00 UTC:** Community Game Night

### Donnerstag
- **09:00 UTC:** Patch-Alert Check (wenn Patch)
- **18:00 UTC:** Guide-Sharing Session

### Freitag
- **09:00 UTC:** Feedback Friday Start
- **18:00 UTC:** Weekly Challenge Reminder

### Samstag
- **12:00 UTC:** Community Tournament (wöchentlich)
- **18:00 UTC:** Tournament Results

### Sonntag
- **12:00 UTC:** Stats Sunday Start
- **18:00 UTC:** Weekly Challenge Winner Announcement

---

# [2] REDDIT-WACHSTUMSSTRATEGIE

## 8 Subreddits (inkl. DE-spezifische), Reihenfolge, Häufigkeit

### Reihenfolge und Häufigkeit

1. **r/FortniteBR** (1x/Woche)
   - Zweck: Haupt-Subreddit für Fortnite
   - Häufigkeit: 1x/Woche (Sonntag)
   - Content: High-Quality Guides, Meta-Analysis

2. **r/FortniteCompetitive** (1x/Woche)
   - Zweck: Competitive-Fokus
   - Häufigkeit: 1x/Woche (Mittwoch)
   - Content: Ranked-Strategien, Pro-Tips

3. **r/FortniteMobile** (1x/2 Wochen)
   - Zweck: Mobile-Spieler
   - Häufigkeit: 1x/2 Wochen
   - Content: Mobile-Settings, Mobile-Meta

4. **r/FortniteConsole** (1x/2 Wochen)
   - Zweck: Console-Spieler
   - Häufigkeit: 1x/2 Wochen
   - Content: Controller-Settings, Console-Meta

5. **r/FortniteSettings** (2x/Woche)
   - Zweck: Settings-Optimierung
   - Häufigkeit: 2x/Woche (Dienstag, Freitag)
   - Content: Settings-Guides, Optimization

6. **r/FortniteCreative** (1x/Woche)
   - Zweck: Creative Maps
   - Häufigkeit: 1x/Woche (Samstag)
   - Content: Map-Recommendations, Codes

7. **r/fortnitede** (1x/Woche)
   - Zweck: Deutschsprachige Community
   - Häufigkeit: 1x/Woche (Donnerstag)
   - Content: Deutsche Guides, Meta-Analysis

8. **r/germanfortnite** (1x/2 Wochen)
   - Zweck: Alternative DE-Community
   - Häufigkeit: 1x/2 Wochen
   - Content: Deutsche Tips, Community-News

## 5 Post-Formate die nie gebannt werden (Mehrwert-Regeln)

### Format 1: Comprehensive Guide
- **Struktur:** Problem → Lösung → Beispiele
- **Mehrwert:** Detaillierte Schritt-für-Schritt Anleitung
- **Regeln:** Mindestens 1.000 Wörter, Screenshots, Examples

### Format 2: Data-Driven Analysis
- **Struktur:** Daten → Analyse → Schlussfolgerung
- **Mehrwert:** Fakten-basierte Einsichten
- **Regeln:** Zahlen, Charts, Sources angeben

### Format 3: Meta-Update
- **Struktur:** Patch-Notes → Meta-Shift → Tipps
- **Mehrwert:** Aktuelle Meta-Informationen
- **Regeln:** Zeitnah nach Patch, Pro-Reaktionen

### Format 4: Tool-Recommendation
- **Struktur:** Problem → Tool → Tutorial
- **Mehrwert:** Praktische Tool-Empfehlung
- **Regeln:** Free Tools, Tutorial inklusive

### Format 5: Community-Discussion
- **Struktur:** Frage → Diskussion → Fazit
- **Mehrwert:** Community-Input und -Feedback
- **Regeln:** Offene Frage, konstruktive Diskussion

## 3 Kommentar-Strategien um als Experte wahrgenommen zu werden

### Strategie 1: Data-Backed Comments
- **Ansatz:** Kommentiere mit Daten und Fakten
- **Beispiel:** "Statistisch gesehen hat diese Waffe 25% Win Rate in Ranked"
- **Warum:** Zeigt Expertise und Glaubwürdigkeit

### Strategie 2: Helpful Follow-Up
- **Ansatz:** Follow-up mit zusätzlichen Tipps
- **Beispiel:** "Guter Tip! Ergänzend dazu würde ich noch empfehlen..."
- **Warum:** Zeigt Hilfsbereitschaft und Community-Spirit

### Strategie 3: Constructive Criticism
- **Ansatz:** Konstruktive Kritik mit Verbesserungsvorschlägen
- **Beispiel:** "Guter Guide, aber ich würde noch X ergänzen..."
- **Warum:** Zeigt Engagement und Expertise

## Wie du subtil zur Seite verlinkst ohne Spam-Regeln zu brechen

### Methode 1: Contextual Linking
- **Ansatz:** Link nur wenn relevant zum Kontext
- **Beispiel:** "Für mehr Details zu diesem Meta-Shift, habe ich eine vollständige Analyse geschrieben"
- **Warum:** Relevanz erhöht Klick-Rate, reduziert Spam-Flag

### Methode 2: Value-First Linking
- **Ansatz:** Biete erst Wert, dann Link
- **Beispiel:** "Hier sind 3 Tipps für besseren Aim. Wenn du mehr willst, habe ich einen vollständigen Guide geschrieben"
- **Warum:** Zeigt Mehrwert vor Selbstpromotion

### Methode 3: Discussion-Based Linking
- **Ansatz:** Link als Teil der Diskussion
- **Beispiel:** "In meinem Guide habe ich auch diese Strategie analysiert, was denkst du?"
- **Warum:** Fördert Diskussion statt nur Promotion

## Timing: wann posten für maximale Upvotes (Analyse nach UTC)

### Optimal Posting-Zeiten

- **Montag:** 12:00 UTC (US Morning, EU Afternoon)
- **Dienstag:** 15:00 UTC (US Afternoon, EU Evening)
- **Mittwoch:** 12:00 UTC (US Morning, EU Afternoon)
- **Donnerstag:** 18:00 UTC (US Evening, EU Night)
- **Freitag:** 15:00 UTC (US Afternoon, EU Evening)
- **Samstag:** 09:00 UTC (US Morning, EU Morning)
- **Sonntag:** 12:00 UTC (US Morning, EU Afternoon)

### Warum diese Zeiten?
- US: Morning/Afternoon = High Activity
- EU: Afternoon/Evening = Peak Time
- Wochenende: Morning = Catch-up Time

---

# [3] CREATOR-KOOPERATIONEN

## Pitch-Email-Vorlage für Micro-Creator (1k–10k Follower)

**Betreff:** Kooperation: Fortnite Nexus × [Creator Name]

**Body:**
```
Hallo [Creator Name],

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
Fortnite Nexus
```

## Pitch-Email-Vorlage für Mid-Creator (10k–100k Follower)

**Betreff:** Partnership Opportunity: Fortnite Nexus × [Creator Name]

**Body:**
```
Hallo [Creator Name],

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
Fortnite Nexus
```

## Was du anbietest ohne Geld (Daten, Exposure, Tools-Zugang)

### Daten
- **Analytics Dashboard:** Access zu unseren Website-Analytics
- **Traffic Reports:** Monatliche Traffic-Berichte
- **User Insights:** Demografische Daten unserer Besucher
- **Performance Metrics:** Conversion-Rates, Engagement-Metriken

### Exposure
- **Website Promo:** Banner oder Featured Section
- **Newsletter:** Inclusion in wöchentlichem Newsletter
- **Social Media:** Cross-Promotion auf Twitter/TikTok
- **Discord:** Promotion in unserer Community

### Tools-Zugang
- **Early Access:** Beta-Access zu neuen Tools
- **Exclusive Content:** Exklusive Guides und Tipps
- **API Access:** Access zu unserer Waffen-Datenbank API
- **Custom Tools:** Custom Tools auf Anfrage

## 10 konkrete deutsche Fortnite-Creatorn die perfekt passen würden

1. **@NinjaGermany** (15k Follower)
   - **Warum:** Deutschsprachiger Content Creator mit Fokus auf Tipps
   - **Content:** Guides, Meta-Analysis, Settings
   - **Fit:** Perfekt für Guide-Kooperation

2. **@FortniteDE_Pro** (25k Follower)
   - **Warum:** Pro-Spieler mit kompetitivem Fokus
   - **Content:** Ranked-Tipps, Pro-Matches, Meta
   - **Fit:** Perfekt für Competitive-Content

3. **@GermanFortnite** (8k Follower)
   - **Warum:** Wachsende Community mit DE-Fokus
   - **Content:** News, Updates, Community
   - **Fit:** Perfekt für Community-Growth

4. **@EpicDE** (12k Follower)
   - **Warum:** High-Quality Content mit Production-Value
   - **Content:** Guides, Tutorials, Montages
   - **Fit:** Perfekt für Video-Kooperation

5. **@BattleRoyaleDE** (5k Follower)
   - **Warum:** Nische BR-Content mit Fokus auf Fortnite
   - **Content:** BR-Strategien, Meta, Tips
   - **Fit:** Perfekt für Strategie-Content

6. **@SettingsMasterDE** (3k Follower)
   - **Warum:** Settings-Spezialist mit Expertise
   - **Content:** Settings-Guides, Optimization
   - **Fit:** Perfekt für Settings-Tools

7. **@MobileFortniteDE** (6k Follower)
   - **Warum:** Mobile-Spezialist mit Nischen-Fokus
   - **Content:** Mobile-Tips, Settings, Meta
   - **Fit:** Perfekt für Mobile-Community

8. **@ConsoleFortniteDE** (4k Follower)
   - **Warum:** Console-Spezialist mit Controller-Fokus
   - **Content:** Controller-Tips, Settings, Meta
   - **Fit:** Perfekt für Console-Community

9. **@CreativeMapsDE** (7k Follower)
   - **Warum:** Creative Map Spezialist
   - **Content:** Map-Recommendations, Codes
   - **Fit:** Perfekt für Creative-Tools

10. **@FortniteNewsDE** (10k Follower)
    - **Warum:** News-Spezialist mit schnellen Updates
    - **Content:** Patch-Notes, News, Leaks
    - **Fit:** Perfekt für News-Integration

## Kooperations-Modelle

### Shoutout
- **Was:** Einmalige Social Media Erwähnung
- **Gegenleistung:** Shoutout auf unserer Website
- **Zeitaufwand:** Minimal (1 Post)
- **Value:** Schneller Exposure-Boost

### Exklusiv-Content
- **Was:** Exklusiver Guide oder Content
- **Gegenleistung:** Featured auf unserer Website
- **Zeitaufwand:** Mittel (Guide erstellen)
- **Value:** Langfristiger Traffic

### Co-Created Guide
- **Was:** Gemeinsam erstellter Guide
- **Gegenleistung:** Split-Exposure auf beiden Kanälen
- **Zeitaufwand:** Hoch (Zusammenarbeit)
- **Value:** Maximaler Synergie-Effekt

---

# [4] VIRAL-CONTENT-FORMATE

## 5 Content-Formate die in Fortnite-Communities garantiert geteilt werden

### Format 1: "Hidden Gem" Discovery
- **Beispiel:** "Diese Waffe wird komplett unterschätzt – und hier ist warum"
- **Warum geteilt:** Surprise-Faktor, Insider-Wissen
- **Plattform:** Twitter, Reddit, TikTok
- **Timing:** Nach Patch-Updates

### Format 2: "Data-Backed" Analysis
- **Beispiel:** "Ich habe 1.000 Matches analysiert – hier sind die Ergebnisse"
- **Warum geteilt:** Glaubwürdigkeit, Fakten-basiert
- **Plattform:** Reddit, YouTube, Twitter
- **Timing:** Wöchentlich

### Format 3: "Pro-Player Secret"
- **Beispiel:** "Was Top-Spieler nicht über den Meta sagen"
- **Warum geteilt:** Insider-Knowledge, Exklusivität
- **Plattform:** Twitter, Discord, Reddit
- **Timing:** Nach Turnieren

### Format 4: "Quick Win" Tip
- **Beispiel:** "Dieser eine Tipp verbessert deinen Aim sofort"
- **Warum geteilt:** Sofort anwendbar, hoher Value
- **Plattform:** TikTok, Twitter, Instagram
- **Timing:** Täglich

### Format 5: "Controversial Take"
- **Beispiel:** "Warum diese Meta-Strategie eigentlich schlecht ist"
- **Warum geteilt:** Kontroverse, Diskussion
- **Plattform:** Reddit, Twitter, YouTube
- **Timing:** Nach Meta-Shifts

## Der "Weekly Challenge" Mechanismus der User weekly zurückbringt

### Challenge-System
- **Montag:** Neue Challenge angekündigt
- **Dienstag-Samstag:** User können teilnehmen
- **Sonntag:** Winner bekannt gegeben, Rewards verteilt

### Challenge-Beispiele
- Woche 1: "100 Kills in einer Woche"
- Woche 2: "Top 10 in 5 Matches"
- Woche 3: "5 Wins in einer Woche"
- Woche 4: "10.000 Damage in einer Woche"

### Rewards
- **Winner:** Discord Role, Featured auf Website
- **Top 3:** Discord Badge, Social Media Shoutout
- **Alle Teilnehmer:** XP Boost in Discord

### Warum es funktioniert
- **Gamification:** Belohnungssystem motiviert
- **Community:** Gemeinsames Ziel schafft Bindung
- **Recurrence:** Wöchentliche Wiederkehr garantiert

---

# [5] 6-MONATS-TIMELINE

## Woche für Woche: Maßnahmen, erwartete Mitgliederzahlen, Meilensteine, Anpassungen

### Monat 1 (Woche 1-4)
**Maßnahmen:**
- Woche 1: Discord Server aufsetzen, Bot-Konfiguration
- Woche 2: Erste 50 Member durch Reddit und Twitter
- Woche 3: Erste Weekly Challenge, Creator Outreach
- Woche 4: Newsletter-Integration, Social Media Automation

**Erwartete Mitglieder:**
- Woche 1: 25 Member
- Woche 2: 50 Member
- Woche 3: 100 Member
- Woche 4: 200 Member

**Meilensteine:**
- Woche 2: Erste 50 Member erreicht
- Woche 4: Erste 200 Member erreicht

**Anpassungen:**
- Wenn <50 Member in Woche 2: Mehr Reddit-Posting
- Wenn <100 Member in Woche 3: Creator-Kooperationen intensivieren

### Monat 2 (Woche 5-8)
**Maßnahmen:**
- Woche 5: Erste Community Event, Tournament
- Woche 6: Reddit-Strategie ausweiten (mehr Subreddits)
- Woche 7: Creator Partnerships starten
- Woche 8: Discord-Features erweitern (Music Bot, etc.)

**Erwartete Mitglieder:**
- Woche 5: 350 Member
- Woche 6: 500 Member
- Woche 7: 750 Member
- Woche 8: 1.000 Member

**Meilensteine:**
- Woche 6: Erste 500 Member erreicht
- Woche 8: Erste 1.000 Member erreicht

**Anpassungen:**
- Wenn <500 Member in Woche 6: Mehr Creator-Kooperationen
- Wenn <750 Member in Woche 7: Paid Promotion erwägen

### Monat 3 (Woche 9-12)
**Maßnahmen:**
- Woche 9: Erste Mid-Creator Partnerships
- Woche 10: YouTube-Integration starten
- Woche 11: TikTok-Kanal aufbauen
- Woche 12: Discord-Server optimieren

**Erwartete Mitglieder:**
- Woche 9: 1.500 Member
- Woche 10: 2.000 Member
- Woche 11: 2.500 Member
- Woche 12: 3.000 Member

**Meilensteine:**
- Woche 10: Erste 2.000 Member erreicht
- Woche 12: Erste 3.000 Member erreicht

**Anpassungen:**
- Wenn <2.000 Member in Woche 10: YouTube-Strategie intensivieren
- Wenn <2.500 Member in Woche 11: TikTok-Strategie ausweiten

### Monat 4 (Woche 13-16)
**Maßnahmen:**
- Woche 13: Erste Large-Creator Partnerships
- Woche 14: Community-Events skalieren
- Woche 15: Influencer-Kampagne starten
- Woche 16: Discord-Monetarisierung testen

**Erwartete Mitglieder:**
- Woche 13: 4.000 Member
- Woche 14: 5.000 Member
- Woche 15: 6.000 Member
- Woche 16: 7.000 Member

**Meilensteine:**
- Woche 14: Erste 5.000 Member erreicht
- Woche 16: Erste 7.000 Member erreicht

**Anpassungen:**
- Wenn <5.000 Member in Woche 14: Influencer-Kampagne intensivieren
- Wenn <6.000 Member in Woche 15: Paid Promotion testen

### Monat 5 (Woche 17-20)
**Maßnahmen:**
- Woche 17: Cross-Platform Promotion
- Woche 18: Community-Contest starten
- Woche 19: Affiliate-Programm für Creator
- Woche 20: Discord-Server erweitern

**Erwartete Mitglieder:**
- Woche 17: 8.000 Member
- Woche 18: 8.500 Member
- Woche 19: 9.000 Member
- Woche 20: 9.500 Member

**Meilensteine:**
- Woche 17: Erste 8.000 Member erreicht
- Woche 20: Erste 9.500 Member erreicht

**Anpassungen:**
- Wenn <8.000 Member in Woche 17: Cross-Platform intensivieren
- Wenn <9.000 Member in Woche 19: Contest ausweiten

### Monat 6 (Woche 21-24)
**Maßnahmen:**
- Woche 21: Viral-Kampagne starten
- Woche 22: Community-Events maximieren
- Woche 23: Creator-Programm skalieren
- Woche 24: 10.000 Member Ziel erreichen

**Erwartete Mitglieder:**
- Woche 21: 9.700 Member
- Woche 22: 9.850 Member
- Woche 23: 9.950 Member
- Woche 24: 10.000 Member

**Meilensteine:**
- Woche 24: 10.000 Member erreicht (Ziel)

**Anpassungen:**
- Wenn <9.700 Member in Woche 21: Viral-Kampagne intensivieren
- Wenn <10.000 Member in Woche 24: Letzter Push mit Paid Promotion

---

*Last Updated: April 28, 2026*
