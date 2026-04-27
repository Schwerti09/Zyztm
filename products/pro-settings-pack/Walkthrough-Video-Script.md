---
title: "Walkthrough Video Script (15 Min)"
subtitle: "Step-by-Step Setup-Video für das Pro Settings Pack"
author: "Fortnite Nexus"
version: "2.1"
date: "April 2026"
runtime: "15:00 Minuten"
---

# 🎬 Walkthrough Video Script

**Pro Settings Pack v2.1 – Komplettes Setup in 15 Minuten**

> Dieses Skript ist die Vorlage für das Walkthrough-Video. Jeder Käufer bekommt zusätzlich Zugang zum YouTube-Video (privater Link in der Email).
>
> **Format:** 1080p 60 FPS, Voice-Over Deutsch (DE-CH-AT), Untertitel EN/DE

---

## STRUKTUR

| Zeit | Modul | Inhalt |
|---|---|---|
| 00:00 – 00:45 | Intro | Hook, was du am Ende hast |
| 00:45 – 02:00 | Vorbereitung | Backup, Hardware-Check |
| 02:00 – 04:00 | Settings-Files installieren | GameUserSettings.ini etc. |
| 04:00 – 06:30 | Windows-Power-Plan | Ultimate Performance |
| 06:30 – 09:00 | NVIDIA Control Panel | Pro-Konfiguration |
| 09:00 – 10:30 | Hintergrund-Apps | Cleanup |
| 10:30 – 12:00 | In-Fortnite Settings | Final Tweaks |
| 12:00 – 13:30 | Benchmarking | FPS verifizieren |
| 13:30 – 15:00 | Outro & Bonus | Lifetime-Updates, SAC-Code |

---

## 🎬 SZENE 1 – INTRO (00:00 – 00:45)

**B-Roll:** Fortnite Gameplay mit FPS-Counter (240+) sichtbar, schnelle Builds, Edits.

**Voice-Over:**

> "Was ist los Leute! Heute zeige ich euch in 15 Minuten, wie ihr von 80 FPS auf 240+ kommt – egal mit welcher Hardware. Ich nehme euch Schritt für Schritt durch alles durch, was im Pro Settings Pack drin ist. Am Ende habt ihr die Settings, die Pros wie Bugha, Mongraal und Clix nutzen. Und ja – das ist 100% Anti-Cheat-konform. Lass uns starten!"

**Cut to:** Title Card mit "Pro Settings Pack v2.1 – Setup Guide"

---

## 🎬 SZENE 2 – VORBEREITUNG (00:45 – 02:00)

**Screen:** Windows-System-Restore-Point Dialog

**Voice-Over:**

> "Bevor wir was ändern: macht einen System-Restore-Point. Windows-Taste, "Wiederherstellungspunkt erstellen" eingeben, Erstellen, und nennt es 'Pre-Fortnite-Optimization'. Das ist eure Versicherung, falls was schief geht – einfach hier zurück und alles ist wie vorher."

**Action auf Screen:**
1. Windows + Search
2. "Wiederherstellungspunkt erstellen" eingeben
3. Erstellen klicken
4. Beschreibung tippen
5. Zoom-In auf "Erstellen" Button

**Voice-Over (fortgesetzt):**

> "Ihr braucht für 240 FPS mindestens ne RTX 3060 oder vergleichbare AMD-Karte, einen Ryzen 5600 oder Intel i5-12400, 16 GB RAM und WICHTIG – eine SSD. Auf HDD geht das nicht. Falls ihr drunter seid: keine Sorge, das Pack hat auch eine 144-FPS-Variante – die zeig ich gleich auch."

**B-Roll:** Spec-Sheet Vergleichstabelle

---

## 🎬 SZENE 3 – SETTINGS-FILES (02:00 – 04:00)

**Screen:** Datei-Explorer öffnen

**Voice-Over:**

> "Erster Schritt: die Settings-Files. Öffnet den Explorer und navigiert zu folgendem Ort. Ich kopiere den Pfad gleich in die Beschreibung."

**Pfad einblenden (Caption):**
```
%LOCALAPPDATA%\FortniteGame\Saved\Config\WindowsClient\
```

**Action auf Screen:**
1. Adressleiste mit `%LOCALAPPDATA%\FortniteGame\Saved\Config\WindowsClient\`
2. Existing GameUserSettings.ini umbenennen zu `.backup`
3. Pack-File reinkopieren
4. Rechtsklick → Eigenschaften → Schreibgeschützt anhaken

**Voice-Over:**

> "Schritt 1: Eure aktuelle GameUserSettings.ini umbenennen zu .backup – falls ihr zurück wollt. Schritt 2: aus dem Pack die GameUserSettings.ini reinziehen. Schritt 3 – und das ist KRITISCH – die Datei auf 'Schreibgeschützt' setzen. Sonst überschreibt Fortnite die beim nächsten Start. Macht das gleiche mit der Engine.ini."

**Caption auf Screen:**
- ❗ READ-ONLY setzen!
- Sonst: Fortnite überschreibt eure Settings

**Voice-Over:**

> "Wenn ihr eine Low-End-Maschine habt – GTX 1060, 8 GB RAM – dann nehmt stattdessen die GameUserSettings.Performance.ini, einfach umbenennen zu GameUserSettings.ini. Die targetet 144 FPS und ist auf den Performance Mode optimiert."

---

## 🎬 SZENE 4 – WINDOWS POWER PLAN (04:00 – 06:30)

**Screen:** PowerShell als Administrator

**Voice-Over:**

> "Jetzt zum Windows Power Plan. Standardmäßig nutzt Windows den 'Ausbalanciert'-Plan. Den könnt ihr vergessen. Wir aktivieren den versteckten 'Ultimate Performance'-Plan."

**Action auf Screen:**
1. Windows + R → `powershell` → Strg+Shift+Enter (Admin)
2. Befehl eingeben:

```powershell
powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61
```

3. Enter

**Voice-Over:**

> "Befehl wird in der Beschreibung sein. Einfach reinkopieren, Enter. Wenn das ohne Fehler durchläuft, ist der Plan da."

**Action:**
4. Systemsteuerung → Energieoptionen
5. "Ultimate Performance" auswählen
6. "Plan einstellen" → "Erweiterte Energieeinstellungen ändern"
7. Bei "Prozessor" → Min und Max auf 100%
8. USB → Selektives USB-Suspend → Deaktiviert
9. PCI Express → Link State Power Mgmt → Aus

**Voice-Over:**

> "Wichtig: Min UND Max Prozessorzustand auf 100%. Das hält eure CPU permanent im Boost-Mode. USB-Suspend aus, damit eure Maus nicht mid-fight in den Schlaf geht. Und PCI Express auf 'Aus' für eure GPU."

**Caption:** ⚠️ Bei Laptops: Netzteil immer einstecken – frisst Akku.

---

## 🎬 SZENE 5 – NVIDIA CONTROL PANEL (06:30 – 09:00)

**Screen:** NVIDIA Control Panel öffnen

**Voice-Over:**

> "Jetzt zum Game-Changer für Latenz: NVIDIA Control Panel. Rechtsklick auf Desktop, NVIDIA Control Panel öffnen. Falls ihr AMD habt – kein Stress, dafür gibt's die AMD-Anleitung in der README."

**Tab:** 3D-Einstellungen verwalten → Globale Einstellungen

**Voice-Over (Sliding Through Settings):**

> "Latenzmodus auf ULTRA – das ist der wichtigste Setting. Reduziert Input Lag um bis zu 30 Millisekunden. Power Management auf 'Maximale Leistung'. V-Sync aus – Tearing ist besser als Input Lag. Texturfilterung auf 'Hohe Leistung'. Threaded Optimierung auf 'Auto'."

**Action auf Screen:**
- Rotes Highlight auf jedem Setting beim Erklären
- Rechts neben dem Setting Caption mit Wert

**Voice-Over:**

> "Wenn ihr einen G-Sync-Monitor habt: Bildraten-Synchronisation auf 'Ein', V-Sync auf 'Schnell' – NICHT auf 'Ein'! Das ist ein häufiger Fehler. Plus: FPS-Cap auf 3 unter eurer Monitor-Refresh-Rate. Bei 240 Hz also 237. So bleibt G-Sync aktiv, kein V-Sync-Lag."

**Tab:** Programmeinstellungen

**Voice-Over:**

> "Jetzt programmspezifisch. Programm hinzufügen – Fortnite suchen, FortniteClient-Win64-Shipping.exe. Hier override-en wir nochmal Latenzmodus auf Ultra+Boost. Reflex auf 'Ein + Boost'. Damit sind wir bei NVIDIA fertig."

---

## 🎬 SZENE 6 – HINTERGRUND-APPS (09:00 – 10:30)

**Screen:** Task Manager → Autostart

**Voice-Over:**

> "Windows läuft mit ungefähr 60 Prozessen im Hintergrund. Die wenigsten brauchen wir für Gaming. Strg + Shift + Esc – Task Manager. Tab Autostart."

**Action auf Screen:**
- Spotify deaktivieren
- Adobe deaktivieren
- Skype deaktivieren
- Cortana deaktivieren

**Voice-Over:**

> "Alles, was ihr beim Booten nicht sofort braucht: Aus. Spotify, Adobe-Stuff, Skype, Cortana. Deaktivieren ist nicht 'deinstallieren' – die Apps laufen wie vorher, nur eben nicht beim Boot."

**Screen:** Einstellungen → Gaming → Aufzeichnungen

**Voice-Over:**

> "Mega wichtig: Game DVR ausschalten. Einstellungen, Gaming, Aufzeichnungen – beide Optionen aus. Das spart 5-10% Performance, weil Windows nicht mehr permanent eure letzten 30 Sekunden recordet."

**Caption:** ⚡ Game DVR aus = +5–10% FPS

---

## 🎬 SZENE 7 – IN-FORTNITE SETTINGS (10:30 – 12:00)

**Screen:** Fortnite starten → Settings

**Voice-Over:**

> "Letzter Schritt: Fortnite starten und ein paar Settings, die wir nicht in der INI festlegen können. Settings → Video."

**Action auf Screen:**
1. Display Resolution: Native (1920x1080)
2. Frame Rate Limit: 240 oder Unlimited
3. Rendering Mode: DirectX 12 (oder Performance Mode für Low-End)
4. NVIDIA Reflex Low Latency: **Ein + Boost**
5. Anti-Aliasing: Off

**Voice-Over:**

> "Display: native, kein Stretched – Epic hat Stretched eh weitestgehend gepatcht. Frame Rate Limit: 240 wenn ihr nen 240 Hz Monitor habt. Rendering Mode: DirectX 12 – außer ihr habt eine sehr alte GPU, dann Performance Mode. Reflex auf 'Ein + Boost' – das aktiviert das, was wir im NVIDIA-Panel eingestellt haben."

**Tab:** Settings → Game

**Voice-Over:**

> "Wichtig im Game-Tab: Visualizer für Sound-Effekte AN. Das blendet Footsteps und Schüsse als visuelles Overlay ein – pro-tier in Endgame-Lobbys."

---

## 🎬 SZENE 8 – BENCHMARKING (12:00 – 13:30)

**Screen:** Fortnite Lobby → in-Game Stats anzeigen

**Voice-Over:**

> "Verifizierung Zeit. Im Game: HUD-Settings, FPS-Anzeige an. Jetzt geht ihr in den Solo-Modus – nicht in die Lobby, das täuscht. Springt an drei Locations: Tilted Towers, weil das die heaviest CPU-Load ist. Open Field – euer FPS-Cap-Test. Und ein Endgame-Szenario."

**Screen-Recording:** FPS-Counter bei 240 in Tilted, 280 in Open Field

**Voice-Over:**

> "Mit RTX 3060 + Ryzen 5600 sollten 240 stabil sein. RTX 4070 + 7700X – locker 280-300+. Was ihr aber NICHT nur anschauen solltet: nur den Avg-FPS. Wichtiger ist Frame-Time-Konsistenz. Ladet euch CapFrameX runter – kostenlos – und checkt eure 1% Lows. Die sollten bei mindestens 60% eures Avg sein. Sonst stutter."

**Caption:** Tools: CapFrameX (free) · MSI Afterburner + RTSS

---

## 🎬 SZENE 9 – OUTRO (13:30 – 15:00)

**Screen:** SAC Code Animation, Discord-QR-Code

**Voice-Over:**

> "Das war's! Ihr solltet jetzt deutlich mehr FPS und weniger Latenz haben. Wenn das Pack euch geholfen hat: Lifetime-Updates inkludiert. Bei jedem Season-Update bekommt ihr die neue Version per Email."

> "Bei Problemen: ich bin auf Discord aktiv – Link in der Beschreibung. Plus: support@fortnitenexus.com mit eurer Bestellnummer."

**Caption:**
- ✅ Lifetime Updates (jede Season)
- 💬 discord.gg/fortnitenexus
- 📧 support@fortnitenexus.com

**Voice-Over:**

> "Und wenn ihr ne kleine Geste machen wollt: nutzt Code ZYZTM im Item Shop. Kostet euch nichts extra, supportet aber den Channel und macht weitere Pro-Packs möglich."

**Screen:** Code "ZYZTM" mit Pulse-Animation

**Voice-Over:**

> "In den nächsten Wochen kommt das Creator Setup Pack – wenn ihr Streamer werden wollt – und der Weekly Meta Report. Bleibt dran."

> "Frohes Fragging, ich hau ab. Cheers!"

**End-Card:**
- "Pro Settings Pack v2.1"
- "Fortnite Nexus · fortnitenexus.com"
- "Code ZYZTM ✨"

---

## ⚙️ PRODUCTION NOTES

### B-Roll Liste

| Zeit | B-Roll | Quelle |
|---|---|---|
| 00:00–00:30 | Eigener Fortnite-Gameplay 240 FPS | OBS Recording |
| 02:30 | File Explorer Animation | Premiere |
| 04:30 | PowerShell Window | Live-Recording |
| 07:00 | NVIDIA CP Tab-Navigation | Live-Recording |
| 09:30 | Task Manager Animation | Live-Recording |
| 12:30 | Tilted Towers Drop | OBS Recording |

### Audio

- **Background Music:** Lo-Fi Synthwave, –20 dB
- **Voice EQ:** High-Pass 100 Hz, Compressor 3:1, –3 dB Limiter
- **Click Sounds:** UI-Click bei jedem Setting-Change

### Untertitel

- DE (primary)
- EN (secondary, AI-translated, manual review)

### Thumbnail

- "240 FPS GUARANTIERT" Caption
- Vorher/Nachher FPS Counter
- Pro Settings Pack Branding

---

## 🎁 BONUS-MATERIAL

Nach dem Video, in der Description:

1. **Patreon-Link** mit Bonus-Settings für Top-Tier Hardware (RTX 4090 + 7800X3D)
2. **Affiliate-Links** zu Pro-Maus / Tastatur (Logitech G Pro X Superlight)
3. **Verwandte Videos:** "Welche Maus für 240 FPS?", "G-Sync vs FreeSync"
4. **Kapitel** in der YouTube-Beschreibung (für SEO + UX)

---

**Ende des Walkthrough Video Scripts**

Geplante Aufnahme: **April 26, 2026**
Geplanter Release: **April 28, 2026**

📧 **Feedback & Edits:** support@fortnitenexus.com
