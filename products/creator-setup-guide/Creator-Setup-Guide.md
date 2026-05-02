---
title: "Creator Setup Guide"
subtitle: "Vom Zocker zum Streamer – Komplettes Setup in 7 Tagen"
author: "Fortnite Nexus"
version: "1.0"
date: "April 2026"
runtime: "3 Stunden Video + 45-Seiten PDF"
---

# 🎬 Fortnite Nexus – Creator Setup Guide

**Vom Zocker zum Streamer – Komplettes Setup in 7 Tagen**

> Dieses Pack bringt dich von 0 zu deinem ersten Stream. Inkl. OBS-Konfiguration, Audio-Setup, Scene-Design, Thumbnail-Workflow und Monetarisierungs-Strategien.

---

## 📦 Was ist im Pack?

| Datei | Inhalt | Format |
|---|---|---|
| `01-Creator-Guide.md` (45 Seiten) | Komplettes Stream-Setup-PDF | Markdown / PDF |
| `02-OBS-Profile/` | Fertig konfigurierte OBS-Profile | OBS Profile Files |
| `03-Scene-Templates/` | OBS-Scenes für Fortnite | OBS Scene Collections |
| `04-Thumbnail-Templates/` | Photoshop + Canva Templates | PSD + Canva-Links |
| `05-Content-Calendar.csv` | Content-Planungs-Sheet | CSV (Excel/Google) |
| `06-Video-Modules/` | 10 Video-Module (3h total) | YouTube-Links |
| `07-Resources/` | Audio-Plugins, OBS-Plugins, etc. | Mixed |
| `08-Monetarisierung.md` | Strategien für erste 1000€ | Markdown / PDF |

---

## 🚀 Quick Start (7-Tage-Plan)

### Tag 1: Hardware-Check & OBS-Install
- Lese `01-Creator-Guide.md` Kapitel 1-3
- Schaue Video-Modul 1 (15 Min): "OBS Installation"
- Importiere unser OBS-Profil aus `02-OBS-Profile/`

### Tag 2: Audio-Setup
- Video-Modul 2 (20 Min): "Voice + Game-Audio richtig mixen"
- Plugin-Install: VoiceMeter Banana
- Test-Stream auf privaten Twitch-Channel

### Tag 3: Scene-Design
- Video-Modul 3 (25 Min): "Scenes für Fortnite-Streams"
- Importiere unsere Scene-Collection aus `03-Scene-Templates/`
- Anpassen mit eigenem Logo

### Tag 4: Thumbnail-Workflow
- Video-Modul 4 (15 Min): "Thumbnails die Klicks holen"
- Photoshop-Template oder Canva-Template wählen
- Erstes Thumbnail bauen

### Tag 5: Content-Planung
- Video-Modul 5 (15 Min): "Content-Strategie als Streamer"
- `05-Content-Calendar.csv` öffnen, ersten Monat planen

### Tag 6: Monetarisierung-Setup
- Video-Modul 6 (20 Min): "Erste Einnahmen durch Streaming"
- Twitch Affiliate-Antrag, YouTube Partner-Programm

### Tag 7: First Stream!
- Video-Modul 7 (10 Min): "Pre-Stream Checklist"
- Erster offizieller Stream
- Discord-Beitritt für Feedback ([discord.gg/fortnitenexus](https://discord.gg/fortnitenexus))

---

## 📋 KAPITEL 1 – HARDWARE BASICS

### Minimum Setup (Budget: 500-1000€)

| Komponente | Empfehlung | Preis |
|---|---|---|
| **PC** | Vorhandener Gaming-PC | – |
| **Mikrofon** | Fifine K669B USB | 35€ |
| **Kamera** | Logitech C270 | 35€ |
| **Beleuchtung** | Cheap Ringlight | 30€ |
| **Greenscreen** | Optional | 0-50€ |
| **Stream-Deck** | Touch Portal (Phone-App) | 0€ |

### Pro Setup (Budget: 2000-4000€)

| Komponente | Empfehlung | Preis |
|---|---|---|
| **PC** | Streaming-PC (separat von Gaming-PC) | 1500€ |
| **Mikrofon** | Shure SM7B + Cloudlifter + GoXLR | 700€ |
| **Kamera** | Sony ZV-1 + Capture Card | 600€ |
| **Beleuchtung** | Elgato Key Lights (2x) | 400€ |
| **Greenscreen** | Elgato Green Screen | 150€ |
| **Stream-Deck** | Elgato Stream Deck XL | 250€ |

> **Pro-Tipp:** Mit Affiliate-Links zahlst du diesen Setup zurück. Im Pack ist eine Liste mit unseren Affiliate-Partnern.

---

## 📋 KAPITEL 2 – OBS STUDIO INSTALLATION

### Download & Install

1. [obsproject.com](https://obsproject.com/) – aktuelle Version (April 2026: OBS 30.x)
2. Standard-Installation
3. **Wichtig:** "OBS-Browser" Plugin mit installieren

### Erster Start: Auto-Configuration Wizard

1. **Streaming oder Recording?** → Streaming
2. **Service:** Twitch / YouTube / TikTok / Custom
3. **Stream-Key:** aus deinem Account holen
4. **Bandbreiten-Test** durchlaufen lassen
5. OBS empfohlene Settings akzeptieren

### Empfohlene Manual-Settings

**Output Settings:**
- **Output Mode:** Advanced
- **Encoder:** NVIDIA NVENC H.264 (oder x264 wenn keine NVIDIA-GPU)
- **Rate Control:** CBR
- **Bitrate:** 6000 (Twitch Max) / 8000 (YouTube)
- **Keyframe Interval:** 2 Sekunden
- **Preset:** Quality (NVIDIA) / veryfast (x264)
- **Profile:** high
- **Look-Ahead:** Off
- **Psycho Visual Tuning:** On

**Video Settings:**
- **Base Resolution:** 1920x1080
- **Output Resolution:** 1920x1080 (Twitch) / 1080p oder 1440p (YouTube)
- **Downscale Filter:** Lanczos
- **FPS:** 60

**Audio Settings:**
- **Sample Rate:** 48 kHz
- **Channels:** Stereo

> Alle diese Settings sind in unserem fertigen OBS-Profil bereits konfiguriert. Einfach importieren!

---

## 📋 KAPITEL 3 – AUDIO-SETUP (KRITISCH!)

### Warum Audio so wichtig ist

> **Die Wahrheit:** Zuschauer verzeihen schlechtes Video, aber NICHT schlechtes Audio. Investiere 80% deines Setup-Budgets in Audio.

### Voice + Game-Audio Trennung

**Problem:** Standard-Setup mischt deine Stimme mit Game-Audio = unklare Voice.

**Lösung:** VoiceMeeter Banana (kostenlos)

1. [voicemeeter.com](https://voicemeeter.com/) downloaden
2. VoiceMeeter Banana installieren
3. Setup:
   - **Hardware Input 1:** Dein Mikrofon
   - **Virtual Input A:** Game-Audio (Fortnite)
   - **Virtual Input B:** Discord-Audio
   - **Hardware Output A1:** Deine Kopfhörer
   - **Hardware Output A2:** OBS-Output

4. In Fortnite: Audio-Output auf "VoiceMeeter Input" setzen
5. In Discord: Audio-Output auf "VoiceMeeter Aux Input"
6. In OBS: 3 separate Audio-Sources:
   - Mikrofon (direkt)
   - Game (VoiceMeeter Output A2 Channel 1)
   - Discord (VoiceMeeter Output A2 Channel 2)

### Mikrofon-Settings für OBS

**Filter Chain (in dieser Reihenfolge):**

1. **Noise Suppression:** RNNoise (-30 dB)
2. **Noise Gate:** Open -35 dB, Close -40 dB
3. **Compressor:** 
   - Ratio 4:1
   - Threshold -18 dB
   - Attack 6 ms
   - Release 60 ms
   - Output Gain +5 dB
4. **Limiter:** Threshold -1 dB, Release 60 ms

### Lautstärke-Mix (kritisch!)

| Source | Lautstärke (in OBS) |
|---|---|
| **Mikrofon (Voice)** | -15 dB |
| **Game (Fortnite)** | -25 dB |
| **Discord** | -20 dB |
| **Music (Stream-Music)** | -35 dB |
| **Alerts/Donations** | -10 dB |

> **Faustregel:** Voice immer am LAUTESTEN. Game darunter. Music ganz leise. Alerts überlauten alles.

---

## 📋 KAPITEL 4 – SCENE-DESIGN

### Empfohlene Scene-Struktur

```
SCENES:
├─ 1. Starting Soon (vor Stream-Start)
├─ 2. Just Chatting (Talk-Section)
├─ 3. Fortnite (Hauptszene während Game)
├─ 4. Be Right Back (Pause)
├─ 5. Outro / End Stream (am Ende)
```

### Scene 1: "Starting Soon"

- Hintergrund-Animation oder Loop-Video
- Countdown-Timer (5-Min Countdown)
- "Starting Soon..." Text
- Background-Music Playlist
- Discord-Channel + Social Links Sidebar

### Scene 2: "Just Chatting"

- Webcam Vollbild oder 70% Screen
- Twitch-Chat Overlay (rechte Seite)
- Background: dezent (Lavalamp, Pattern, Plant)
- "Subscribe" / "Follow" Animation alle 5 Min

### Scene 3: "Fortnite" (Hauptszene)

```
┌─────────────────────────────────────┐
│  [GAME OUTPUT: FORTNITE 1920x1080] │
│                                      │
│                                      │
│  ┌──────────┐                       │
│  │ WEBCAM   │      ┌──────────┐    │
│  │          │      │ CHAT BOX │    │
│  └──────────┘      └──────────┘    │
│                                      │
└─────────────────────────────────────┘
   [LOWER THIRD: Username + Bits]
```

- Webcam: 320x240 in Top-Left oder Bottom-Right
- Chat Overlay: Bottom-Right
- Lower Third: Username, Donation-Stats
- Subscribe-Animation: Bottom-Left

### Scene 4: "Be Right Back"

- "BRB" Text mit Loop-Animation
- Background-Music
- Discord Link, Twitter Link

### Scene 5: "End Stream"

- "Thanks for watching!" Text
- Latest Donations / Subs (Last 10)
- Discord-Server-Link
- Suggested Stream-Time nächstes Mal

---

## 📋 KAPITEL 5 – THUMBNAIL-WORKFLOW

### Was macht ein gutes Thumbnail?

**Die Formel:**
1. **Großes Gesicht** (Emotion!)
2. **Bold Text** (max 4 Wörter, super lesbar)
3. **Kontrastfarben** (Gelb/Rot/Blau auf Schwarz)
4. **In-Game Element** (Skin/Boss/Mythic)
5. **Pfeil oder Kreis** als Eye-Catcher

### Photoshop Template (im Pack)

`04-Thumbnail-Templates/Fortnite-Thumbnail-Template-v1.psd`

**Layer-Struktur:**
1. Background (game-screenshot)
2. Color-Grade (LUT)
3. Subject (deine Person, ausgeschnitten)
4. Text (großer Hauptext)
5. Sub-Text (kleiner)
6. Overlay (Pfeile, Kreise)
7. Logo / Watermark

### Canva-Templates (Alternative)

Wenn du kein Photoshop hast: Canva.com (kostenlos)

Im Pack: 5 Canva-Template-Links für:
- "First Win" Style
- "Boss-Fight" Style
- "Squad-Wipe" Style
- "Tutorial" Style
- "Reaction" Style

### Render-Settings

- **Größe:** 1280x720 (YouTube Standard)
- **Format:** JPG (PNG zu groß)
- **Qualität:** 80% (Sweet Spot Größe vs Qualität)
- **Dateigröße:** unter 2 MB

---

## 📋 KAPITEL 6 – CONTENT-PLANUNG

### Streaming-Schedule

> **Konsistenz schlägt Quantität.** 3x/Woche immer 19-22 Uhr ist besser als 7x/Woche zu random Zeiten.

**Beispiel-Schedule (Woche 1-4):**

| Tag | Zeit | Content |
|---|---|---|
| Mo | 19-22 | Fortnite Solo Grind |
| Di | – | Off (Recovery) |
| Mi | 20-23 | Squad-Stream mit Discord-Members |
| Do | – | Off (Highlights bearbeiten) |
| Fr | 19-23 | Tournament-Modus + Friends |
| Sa | 14-18 | Long-Stream + Fan-Events |
| So | 18-21 | Ranked-Push + Educational |

### Content-Mix (für verschiedene Zielgruppen)

- **70% Gameplay** (Hauptcontent)
- **15% Educational** (Tutorials, Tips)
- **10% Community** (Just Chatting, Fan-Events)
- **5% Special** (Tournaments, Events)

### Content-Calendar (CSV im Pack)

`05-Content-Calendar.csv` mit 12 Wochen pre-planning:
- Stream-Themes
- Multistream-Tage
- Special-Events
- Vacation/Off-Days

---

## 📋 KAPITEL 7 – MONETARISIERUNG

### Phase 1: First 100 Followers (0-3 Monate)

- **Kein Geld noch.** Fokus: Skill aufbauen, Schedule etablieren
- Twitch Affiliate-Antrag: 50 Followers + 500 Min Stream + 7 unique Streamern
- YouTube: Channel + 5 Videos hochladen (Highlights)

### Phase 2: First Sub (3-6 Monate)

- **Twitch Subs:** 50/50 Split bei Affiliate, 70/30 ab Partner
- **Erster Sub:** $2.50 Net (nach Twitch-Cut)
- **Goal:** 10 aktive Subs = $25/Monat

### Phase 3: First 100€/Monat (6-12 Monate)

**Einnahmequellen:**
- 25-50 Twitch Subs ($60-125/Monat)
- 500-2000 Twitch Bits ($5-25/Monat)
- 1-3 Donations ($30-100/Monat)
- YouTube AdSense (kommt langsam, $5-50/Monat)
- **Affiliate-Links** (kritisch für Wachstum!)

### Affiliate-Programme (Top-Picks)

| Program | Commission | Ziel |
|---|---|---|
| **Razer Affiliate** | 20% | Maus, Tastatur, Headset |
| **Logitech G Affiliate** | 15% | Pro-Hardware |
| **Amazon Associates** | 4% | Alles andere |
| **Kinguin** | 10% | Game-Keys |
| **NordVPN** | 30% | VPN für Geo-Region |

> **Pro-Tipp:** Affiliate-Links in jeder Stream-Description und YouTube-Description einsetzen.

### Phase 4: First 1000€/Monat (12+ Monate)

**Diversifizierung:**
- 100+ Subs ($250+)
- $200+ Donations
- $300+ Affiliate-Commissions
- $250+ YouTube AdSense + Sponsorship

**Sponsorship-Goals:**
- Bei 500+ Concurrent Viewers: erstes Sponsorship erreichbar
- Pro Sponsorship: $500-2000 (single shot)

---

## 📋 KAPITEL 8 – KRITISCHE FEHLER

### Fehler 1: "Zu viel Equipment kaufen"

> Erste 6 Monate: nutze was du hast. Investiere erst nach 100 Followern in Equipment.

### Fehler 2: "Inkonsistenter Schedule"

> Zuschauer brauchen Vorhersehbarkeit. Lieber 3x/Woche feste Zeit als 7x/Woche random.

### Fehler 3: "Mit Friends streamen"

> Anfangs solo streamen ist BESSER. Friends bringen ihren eigenen Vibe und du bleibst im Schatten.

### Fehler 4: "Skill > Charakter"

> Niemand schaut wegen Pro-Aim. Sie schauen wegen DIR. Charisma > Skill.

### Fehler 5: "Negative Energy"

> Tilt im Stream = Zuschauer-Verlust. Lerne Tilt-Management oder Stream-Pause-Technik.

---

## 📋 KAPITEL 9 – COMMUNITY-AUFBAU

### Discord-Server Setup

1. Eigener Discord (kostenlos)
2. Channel-Struktur:
   - `#announcements`
   - `#general`
   - `#looking-for-squad`
   - `#vods`
   - `#feedback`
3. Bots: Dyno (Moderation), MEE6 (Levels), StreamCord

### Twitter/X Strategy

- **3 Tweets/Tag minimum**
- Mix: Gameplay-Clips, Personal Updates, Industry-News
- Hashtags: #FortniteCommunity, #FortniteContent, #StreamerKultur

### TikTok / YouTube Shorts

- **Daily Clips** aus Streams
- Format: 15-60 Sek Vertical
- Hook: Erste 3 Sekunden = Skip-Save
- Caption: Cliffhanger-Style

---

## 📋 KAPITEL 10 – LEGAL & STEUERN

### DSGVO

- Cookie-Banner auf eigener Website (StreamElements default ok)
- Datenschutzerklärung
- Impressum (Pflicht in DE!)

### Steuern (Deutschland)

> **Achtung:** Streaming-Einnahmen sind steuerpflichtig ab dem ersten Cent (Hobby vs Gewerbe-Differenzierung wichtig!).

- **Hobby:** Kleinunternehmer-Regelung möglich (€22.000 / Jahr)
- **Gewerbe:** Anmelden bei Gewerbeamt (€20-60 einmalig)
- **Steuern:** Steuerberater empfohlen ab €5.000+/Jahr

> **Wichtig:** Wir sind keine Steuerberater. Konsultiere bitte einen Profi.

---

## 🎁 BONUS: Erstes Stream-Setup-Checklist

```
□ OBS installiert + konfiguriert
□ Stream-Key eingetragen
□ Mikrofon getestet (Voice-Memo Test-Aufnahme)
□ VoiceMeeter Banana installiert
□ Webcam funktioniert
□ Beleuchtung OK
□ Scenes importiert + angepasst
□ Twitch/YouTube Channel-Page gestyled
□ Discord-Server bereit
□ Erster Stream-Plan für nächste 7 Tage
□ Erster Test-Stream auf privatem Channel
□ Bekannte/Freunde benachrichtigt
□ Stream-Title geschrieben (clickbait but not lying)
□ Thumbnail bereit (für YouTube-Re-Upload)
□ Social-Media-Posts vorbereitet
```

---

## 📞 Support

- 📧 **Email:** support@fortnitenexus.com
- 💬 **Discord:** [discord.gg/fortnitenexus](https://discord.gg/fortnitenexus) (Channel: `#creator-support`)
- 📺 **YouTube Module:** Private Links in Email nach Kauf

### Lifetime Updates

Bei jedem Major-Plattform-Update (Twitch, YouTube, OBS) bekommst du Updates per Email:
- Neue OBS-Versions-Settings
- Neue Affiliate-Programme
- Neue Plattformen (z.B. Kick)

---

**Fortnite Nexus Creator Setup Guide v1.0**
© 2026 Fortnite Nexus. Personal Use Only.

**Code `nexus` 💜**

Frohe Streams! 🎬
