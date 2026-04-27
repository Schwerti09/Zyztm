# Changelog – Pro Settings Pack

Alle Änderungen am Pack werden hier dokumentiert.
Format: [Keep a Changelog](https://keepachangelog.com/de/1.1.0/)

---

## [2.1.0] – 2026-04-25 (Chapter 6, Season 2)

### Hinzugefügt
- NVIDIA Reflex Boost in `GameUserSettings.ini` aktiviert (`bNVIDIAReflexBoostEnabled=True`)
- DLSS Frame Generation Setting (default: false, für Competitive optimal)
- Mouse Polling Rate 8000 Hz Support im Sensitivity Calculator
- Pro Presets: Benjyfishy hinzugefügt
- Performance Mode Variante (`GameUserSettings.Performance.ini`) für Low-End PCs

### Geändert
- `r.Streaming.PoolSize` von 1024 → 2048 (mehr VRAM für RTX 3060+)
- ADS Sensitivity Default von 50% → 60% (Pro-Standard 2026)
- Frame Rate Cap von 144 → 240 (Standard-Variante)
- Audio: SFX Volume 0.85 (statt 1.0) – verhindert Clipping bei Loud-Sounds

### Entfernt
- Stretched Resolution Tweaks (Epic hat in Chapter 4 deaktiviert)
- Legacy Mouse Acceleration Workarounds (nicht mehr nötig auf Win 11)

### Behoben
- Crash beim Start, wenn `Engine.ini` mit veralteten Flags
- G-Sync flackern bei FPS-Cap = Refresh Rate (jetzt: Cap 3 unter Refresh)

---

## [2.0.0] – 2026-01-15 (Chapter 6, Season 1)

### Hinzugefügt
- Erste Version mit Windows 11 Optimierungen
- NVIDIA Control Panel Guide
- Sensitivity Calculator (HTML)
- 12-Seiten Windows Optimization Guide
- Walkthrough Video-Script (15 Min)

### Geändert
- Komplett neue Settings-Files für Chapter 6
- Migration zu DirectX 12 als Default

---

## [1.5.0] – 2025-10-10 (Chapter 5, Season 4)

### Hinzugefügt
- AMD Radeon Empfehlungen (separater Tab im Guide)
- HDR Settings für HDR-Monitore

### Geändert
- View Distance auf "Near" für Performance-Variante (Loot-Spawn besser sichtbar)

---

## [1.0.0] – 2025-07-01 (Initial Release, Chapter 5, Season 3)

### Hinzugefügt
- Erste öffentliche Version
- `GameUserSettings.ini` für 144 FPS Target
- Basic Windows-Power-Plan Anleitung
- README mit Quick-Start

---

## Roadmap

### [2.2.0] – Geplant für Mai 2026 (Chapter 6, Season 3)

- [ ] Wayland-Support für Linux/Steam Deck (über Proton-Konfiguration)
- [ ] Standalone AMD-Setup-Guide
- [ ] Discord-Bot Integration für Auto-Update-Notifications
- [ ] Pro Settings Vergleich für Console-Players (PS5/Xbox)
- [ ] Video-Update mit neuen Pro-Sens

### [3.0.0] – Geplant für Q3 2026

- [ ] Major Refactor: Modularisierung der INI-Files
- [ ] Web-basiertes Setup-Wizard
- [ ] Multi-Monitor-Konfiguration

---

**Hinweis:** Alle Updates werden automatisch per Email an Käufer geschickt.
Falls du keine Email bekommen solltest: support@fortnitenexus.com
