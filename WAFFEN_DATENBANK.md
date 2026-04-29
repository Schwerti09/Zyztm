# FORTNITENEXUS.SPACE — WAFFEN-DATENBANK

## Ziel
Das meistverlinkte Tool der Fortnite-Community

## Strategie
Eine vollständige, fertig deploybare React-Komponente für fortnitenexus.space: eine interaktive Waffen-Datenbank die zum meistgenutzten Fortnite-Tool im deutschen Raum wird.

## Komponenten

### 1. Waffen-Datenbank
**Dateien:**
- `apps/web/src/data/weapons-data.ts` – Waffen-Daten
- `apps/web/src/components/WeaponDatabase.tsx` – React-Komponente
- `apps/web/src/components/WeaponDatabase.css` – Styling

**Waffen-Daten:**
- 25 Waffen mit vollständigen Stats
- Types: AR, SMG, Shotgun, Sniper, Pistol, Explosive
- Rarities: Common, Uncommon, Rare, Epic, Legendary
- Tiers: S, A, B, C, D

**Stats pro Waffe:**
- Damage
- Fire Rate (shots per second)
- Reload Time (seconds)
- Mag Size
- DPS (calculated)
- Range (meters)
- Headshot Multiplier

**Features:**
- Responsive Karten-Layout
- Live-Suche
- Filter nach Type, Rarity, Tier
- Sortierung nach DPS, Damage, Fire Rate
- Waffen-Vergleich (max 3 Waffen)
- Visuelle Stat-Bars im Vergleich

### 2. Tier-List Builder
**Dateien:**
- `apps/web/src/components/TierListBuilder.tsx` – React-Komponente
- `apps/web/src/components/TierListBuilder.css` – Styling

**Features:**
- 5 Tiers (S, A, B, C, D)
- Drag & Drop Waffen
- Pool mit allen Waffen
- Reset-Funktion
- Share-Funktion (URL-Parameter)
- Counter für eingeordnete Waffen

### 3. Share & Export
**URL-Parameter für Tier-List Sharing:**
- Format: `?tl=s:ar-assault,ar-heavy;a:smg-tactical,b:shotgun-pump`
- Kopieren der URL zur Zwischenablage
- Laden von Tier-List aus URL

## Integration

### WeaponDatabase nutzen:
```tsx
import WeaponDatabase from '../components/WeaponDatabase';

<WeaponDatabase />
```

### TierListBuilder nutzen:
```tsx
import TierListBuilder from '../components/TierListBuilder';

<TierListBuilder />
```

## Best Practices

1. **Responsive Design:** Mobile-First Ansatz für 70% mobile Nutzer
2. **Performance:** useMemo für Filter und Sortierung
3. **User Experience:** Visuelles Feedback für Drag & Drop
4. **SEO:** Alt-Text für Bilder, semantische HTML-Struktur
5. **Accessibility:** Keyboard-Navigation, ARIA-Labels

## Monitoring

### KPIs
- Page Views (Ziel: 10.000+/Monat)
- Time on Page (Ziel: 5+ Minuten)
- Filter Usage (Ziel: 80% der User nutzen Filter)
- Comparison Usage (Ziel: 40% der User nutzen Vergleich)
- Tier-List Sharing (Ziel: 10% der User teilen)

### Analytics
- Google Analytics 4
- Hotjar für Heatmaps
- Session Recording
- User Flow Analysis

## Next Steps

1. Waffen-Datenbank testen
2. Tier-List Builder testen
3. Share & Export testen
4. Performance optimieren
5. Mobile Testing
6. SEO optimieren
7. Deploy zu Production
8. Monitor und optimieren

---

*Last Updated: April 29, 2026*
*Version: 1.0 — Waffen-Datenbank*
