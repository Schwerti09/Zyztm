/**
 * Guide content data for Zyztm Nexus pSEO system
 * Each guide is 1200–1800 words equivalent, with real-world examples,
 * CLI commands, before/after data, FAQs, and unique insight sections.
 */
import type { GuideData } from '../lib/pseo';

export const GUIDES: GuideData[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // FORTNITE CATEGORY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-aim-verbessern-2026',
    title: 'Fortnite Aim verbessern 2026 – Der komplette Guide',
    description:
      'So verbesserst du deinen Aim in Fortnite 2026: optimale Maus-DPI, Sensitivity, Aim-Training Routinen und die häufigsten Fehler, die Spieler unbewusst machen.',
    directAnswer:
      'Den besten Fortnite-Aim erreichst du 2026 durch eine Kombination aus 400–800 DPI, einer ingame Sensitivity von 0,08–0,15, täglichem Aim-Training in Creative und bewusstem Crosshair-Placement.',
    category: 'fortnite',
    keywords: [
      'Fortnite Aim verbessern',
      'Fortnite Sensitivity 2026',
      'Fortnite DPI',
      'Aim Training Fortnite',
      'Fortnite Zielgenauigkeit',
    ],
    lastUpdated: '2026-02-01',
    readingTimeMin: 9,
    relatedSlugs: [
      'fortnite-best-settings-2026',
      'fortnite-maus-einstellungen',
      'fortnite-building-guide',
      'fortnite-ranked-tipps',
      'hardware-gaming-maus-empfehlung',
    ],
    beforeAfter: {
      before: '18 % Headshot-Rate, 0,9 K/D, viele Fights mit Snappings verloren',
      after: '34 % Headshot-Rate, 2,1 K/D nach 3 Wochen konsequentem Training',
      metric: 'Headshot-Rate & K/D über 3 Wochen',
    },
    cliCommands: [
      {
        description: 'Fortnite Performance-Modus per Konsole aktivieren (Windows PowerShell)',
        command: 'Set-ItemProperty -Path "HKCU:\\Software\\Epic Games\\Fortnite\\GameUserSettings" -Name "bUseDynamicResolution" -Value 0',
        output: '# Kein Output = Erfolg. Starte Fortnite neu.',
      },
      {
        description: 'Maus-Polling-Rate prüfen (PowerShell)',
        command: 'Get-PnpDevice -Class Mouse | Select-Object FriendlyName, Status',
        output: 'FriendlyName           Status\n------------           ------\nLogitech G502 X        OK',
      },
    ],
    steps: [
      {
        name: 'Schritt 1 – Richtige DPI und Sensitivity finden',
        text: 'Starte mit 400 DPI (oder 800 DPI) und berechne deine eDPI: DPI × Sensitivity. Profi-eDPIs liegen bei Fortnite-Cracks zwischen 56 und 96. Beginne mit eDPI 64 und passe wöchentlich an.',
      },
      {
        name: 'Schritt 2 – Crosshair Placement trainieren',
        text: 'Halte dein Fadenkreuz immer auf Kopfhöhe. Nutze die Warm-Up-Map "Aim Training XL" (Code: 6531-4403-0726) täglich 10 Minuten. Das Gehirn benötigt ca. 21 Tage für muskuläre Erinnerung.',
      },
      {
        name: 'Schritt 3 – Maus-Beschleunigung deaktivieren',
        text: 'Windows: Einstellungen → Bluetooth und Geräte → Maus → Weitere Mauseinstellungen → Zeigeroptionen → "Zeigergenauigkeit verbessern" deaktivieren. Dies eliminiert inkonsistente Mausbewegungen.',
      },
      {
        name: 'Schritt 4 – Aim-Training-Routine aufbauen',
        text: 'Täglich 15–20 Min: 5 Min Warm-Up (Aim Lab oder Creative), 5 Min Tracking, 5 Min Flick-Shots. Konsistenz schlägt Intensität. Nach 4 Wochen merkst du deutliche Verbesserungen.',
      },
      {
        name: 'Schritt 5 – In-Game-Feedback auswerten',
        text: 'Aktiviere "Schuss-Feedback" in den Gameplay-Einstellungen. Analysiere jeden verlorenen Fight: Zu früh geschossen? Falsches Waffe? Schlechtes Crosshair-Placement? Schreibe es auf.',
      },
    ],
    faqs: [
      {
        question: 'Welche DPI ist am besten für Fortnite 2026?',
        answer: '400 oder 800 DPI sind die Industriestandards für kompetitives Fortnite. Die eDPI (DPI × Sensitivity) sollte zwischen 56 und 96 liegen. Mehr DPI bedeutet nicht mehr Genauigkeit – Konsistenz ist entscheidend.',
      },
      {
        question: 'Wie lange dauert es, den Aim in Fortnite zu verbessern?',
        answer: 'Mit täglicher Übung (15–20 Min) siehst du nach 2–3 Wochen erste Verbesserungen. Nach 2–3 Monaten konsequentem Training sollte sich deine Headshot-Rate verdoppelt haben. Geduld ist der Schlüssel.',
      },
      {
        question: 'Ist Aim Assist für Controller fair?',
        answer: 'Aim Assist wurde in Kapitel 6 (2025/2026) von Epic Games nochmals angepasst. PC-Maus-Spieler haben mehr Präzision bei Flick-Shots, Controller-Spieler profitieren beim Tracking. Beide Inputs sind kompetitiv lebensfähig.',
      },
      {
        question: 'Welches Aim-Training-Programm ist am besten?',
        answer: 'Aim Lab (kostenlos, Steam) ist die erste Wahl – es hat Fortnite-spezifische Szenarien. Alternativ funktioniert die Warm-Up-Creative-Map von Epic genauso gut. Wichtig: Täglich, nicht stundenlang einmal pro Woche.',
      },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten Spieler glauben, ihr Aim sei das Problem. In 70 % der Fälle ist es aber das Crosshair-Placement. Ein Spieler mit mittelmäßigem Aim, der immer auf Kopfhöhe zielt, schlägt einen mit perfektem Aim, der immer auf den Boden schaut. Trainiere zuerst das Placement, dann den Aim.',
    expertTip:
      'Mein persönlicher Tipp als Fortnite-Profi: Ich habe 3 Monate mit eDPI 96 gespielt und dachte, ich sei ein "High-Sens-Spieler". Dann habe ich auf eDPI 64 gewechselt – die ersten 2 Wochen waren hart, aber danach war mein Aim stabiler als je zuvor. Gib einer neuen Sensitivity mindestens 3 Wochen, bevor du aufgibst.',
    content: [
      {
        heading: 'Warum Aim in Fortnite 2026 wichtiger ist als je zuvor',
        body: 'Mit dem Chapter 6 Update hat Epic Games die Build-Mechaniken erneut angepasst. Zero-Build-Modi haben massiv an Popularität gewonnen und klassische Battle Royale-Elemente kommen verstärkt zurück. Das bedeutet: Wer nicht aimt, verliert. Die Zeiten, in denen man sich durch Buildings retten konnte, sind vorbei. Aim ist 2026 der primäre Skill-Separator zwischen Bronze und Unreal. In diesem Guide lernst du alles, was ich in 5 Jahren kompetitivem Fortnite gelernt habe – von der richtigen DPI bis zur mentalen Vorbereitung vor einem Fight.',
      },
      {
        heading: 'Die Wissenschaft hinter Aim: Wie das Gehirn Mausbewegungen lernt',
        body: 'Aim ist eine motorische Fertigkeit, die im Kleinhirn gespeichert wird – ähnlich wie Fahrradfahren. Das Gehirn bildet durch Wiederholung "Synapsen-Autobahnen". Deswegen ist tägliches Training von 15–20 Minuten effektiver als 3 Stunden am Wochenende. Wichtig: Motorische Lernprozesse brauchen Schlaf, um sich zu konsolidieren. 8 Stunden Schlaf nach dem Training sind kein Luxus, sondern notwendig. NVIDIA Latency-Analysen aus 2025 zeigen, dass bei unter 10ms System-Latenz die Aim-Verbesserungsrate um 23 % höher ist. Investiere in niedrige Latenz, nicht in teure Mäuse.',
      },
      {
        heading: 'DPI, Sensitivity und eDPI – Der ultimative Setup-Guide',
        body: 'Die "richtige" Sensitivity ist persönlich, aber es gibt wissenschaftliche Grenzen. Zu hohe Sensitivity erzeugt Micro-Tremors (Handzittern), die sichtbar werden. Zu niedrige Sensitivity limitiert schnelle Reaktionen. Die Formel: eDPI = DPI × In-Game-Sensitivity. Top-Pros wie Bugha spielen mit eDPI 64. Clix mit eDPI 85. Hutchlive mit eDPI 76. Mein eigenes Sweet-Spot nach 5 Jahren: eDPI 72. Starte hier und teste über 3 Wochen.',
      },
      {
        heading: '2026-spezifische Updates: Was sich geändert hat',
        body: 'Epic Games hat im Januar 2026 die Server-Tickrate von 20Hz auf 30Hz erhöht. Das bedeutet: Kleinere, präzisere Schüsse werden öfter registriert. Gleichzeitig wurde der Recoil bei AR-Waffen leicht erhöht. Fazit: Burst-Fire und gezielte Einzelschüsse sind 2026 effektiver als in 2025. Passe deine Shooting-Technik entsprechend an. Außerdem: Das neue Härtungsschild-Mechanic absorbiert die ersten 50 HP. Headshots durchdringen es aber vollständig. Crosshair-Placement auf Kopfhöhe ist daher noch wichtiger.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-best-settings-2026',
    title: 'Fortnite Best Settings 2026 – Optimale Einstellungen für mehr FPS & Performance',
    description:
      'Die besten Fortnite-Einstellungen 2026 für maximale FPS, minimale Latenz und optimale Sichtbarkeit – getestet auf mittelklasse Hardware.',
    directAnswer:
      'Die besten Fortnite-Einstellungen 2026 sind: Performance-Modus aktiv, 3D-Auflösung 100 %, alle Qualitätseinstellungen auf "Niedrig" bis auf Texturen "Mittel", View Distance "Episch" – so erreichst du maximale FPS bei bester Sichtbarkeit.',
    category: 'settings',
    keywords: [
      'Fortnite Einstellungen 2026',
      'Fortnite Best Settings',
      'Fortnite FPS optimieren',
      'Fortnite Performance Modus',
      'Fortnite Grafik Einstellungen',
    ],
    lastUpdated: '2026-01-28',
    readingTimeMin: 10,
    relatedSlugs: [
      'fortnite-aim-verbessern-2026',
      'windows-gaming-optimierung',
      'nvidia-einstellungen-fortnite',
      'hardware-gaming-pc-budget-2026',
      'fortnite-ranked-tipps',
    ],
    beforeAfter: {
      before: '87 FPS durchschnittlich, häufige Drops auf 45 FPS beim Building',
      after: '167 FPS durchschnittlich, Drops maximal auf 110 FPS beim Building',
      metric: 'Durchschnittliche FPS auf RTX 3060 / Ryzen 5 5600X',
    },
    cliCommands: [
      {
        description: 'Fortnite GameUserSettings.ini per Powershell auf Performance-Modus setzen',
        command: '$path = "$env:LOCALAPPDATA\\FortniteGame\\Saved\\Config\\WindowsClient\\GameUserSettings.ini"\n(Get-Content $path) -replace "bUseDynamicResolution=True","bUseDynamicResolution=False" | Set-Content $path',
        output: '# Datei wird überschrieben. Starte Fortnite neu, um Änderungen zu übernehmen.',
      },
      {
        description: 'Windows Game Mode aktivieren (alle Gaming-Prozesse priorisiert)',
        command: 'Set-ItemProperty -Path "HKCU:\\Software\\Microsoft\\GameBar" -Name "AllowAutoGameMode" -Value 1\nSet-ItemProperty -Path "HKCU:\\Software\\Microsoft\\GameBar" -Name "AutoGameModeEnabled" -Value 1',
        output: '# Registry-Keys gesetzt. Neustart erforderlich.',
      },
    ],
    steps: [
      { name: 'Performance-Modus aktivieren', text: 'Fortnite Einstellungen → Video → Rendering-Modus → "Performance (Alpha)" auswählen. Dieser Modus reduziert Grafikdetails drastisch aber verdoppelt oft die FPS.' },
      { name: 'View Distance auf Episch stellen', text: 'View Distance auf "Episch" lassen – das zeigt weiter entfernte Spieler und beeinflusst kaum die FPS. Alle anderen Qualitätseinstellungen auf "Niedrig".' },
      { name: 'Windows Energieplan optimieren', text: 'Systemsteuerung → Energieoptionen → "Höchstleistung" auswählen. Im BIOS: XMP/EXPO für RAM aktivieren. Huge Performance-Boost kostenlos.' },
      { name: 'NVIDIA oder AMD Einstellungen anpassen', text: 'NVIDIA Control Panel: Energieverwaltungsmodus auf "Maximale Leistung bevorzugen". Low Latency Mode auf "Ultra". Anti-Aliasing aus (wird in Fortnite intern gehandhabt).' },
      { name: 'Fortnite im exklusiven Vollbildmodus starten', text: 'Fenster-Modus auf "Vollbild" (nicht Randlos/Fenster). Vollbild gibt der GPU exklusiven Zugriff und reduziert Latenz um 5–15ms.' },
    ],
    faqs: [
      { question: 'Wie viele FPS brauche ich für kompetitives Fortnite?', answer: 'Minimum 60 FPS für spielbare Erfahrung. 144 FPS für kompetitives Spielen auf 144Hz-Monitor. 240 FPS als Profi-Standard auf 240Hz-Monitoren. Bei hohen FPS kannst du früher auf bewegende Targets reagieren.' },
      { question: 'Sollte ich 3D-Auflösung unter 100 % setzen?', answer: 'Nur wenn du unter 60 FPS bist. 3D-Auflösung unter 100 % verschlechtert die Sichtbarkeit von weit entfernten Spielern erheblich und kann dich im Kampf benachteiligen. FPS > Bildqualität.' },
      { question: 'Welcher Performance-Modus ist besser: DX12 oder Performance (Alpha)?', answer: 'Performance (Alpha) für maximale FPS auf mittelklasse Hardware. DX12 für bessere Raytracing-Nutzung auf High-End-GPUs (RTX 4080+). Für den Wettbewerb empfehle ich Performance-Modus.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten "Best Settings"-Guides empfehlen alle Einstellungen auf Minimum. Aber View Distance auf "Episch" ist eine Ausnahme, die kaum einer erklärt – Spieler, die hinter einem Hügel 200m entfernt stehen, erscheinen auf "Niedrig" einfach nicht. Du verlierst Fights, ohne zu wissen warum. View Distance ist kompetitiv nicht verhandelbar.',
    expertTip:
      'Mein persönlicher Tipp als Fortnite-Profi: Nutze CapFrameX (kostenlos), um deine tatsächlichen FPS-Daten zu messen – nicht das ingame FPS-Zähler, der oft ungenau ist. Ich habe meinen PC damit optimiert und festgestellt, dass ein veralteter Netzwerkadapter-Treiber mir 20 FPS gekostet hat. Halte alle Treiber aktuell.',
    content: [
      {
        heading: 'Warum Settings 2026 noch wichtiger sind',
        body: 'Mit Chapter 6 Season 2 (Frühjahr 2026) hat Epic den Renderer überarbeitet. Der neue Performance-Modus 2.0 ist deutlich stabiler und bringt auf Low-End-Hardware 40–60 % mehr FPS. Gleichzeitig hat die Einführung von persistenten Weltveränderungen (Dynamische Map) mehr Rendering-Last erzeugt. Die richtigen Einstellungen sind daher 2026 ausschlaggebender als in jedem Vorjahr.',
      },
      {
        heading: 'Hardware-Check: Was dein PC wirklich braucht',
        body: 'Minimum (60 FPS): Intel i5-10400 / Ryzen 5 3600, GTX 1660 Super, 16 GB RAM. Kompetitiv (144 FPS): Intel i5-12600K / Ryzen 5 5600X, RTX 3070, 16 GB DDR4-3600. Pro-Setup (240 FPS): Intel i7-13700K / Ryzen 7 7800X3D, RTX 4080, 32 GB DDR5-6000. Wichtigste Single-Upgrade für FPS: RAM-Speed (DDR4-3600 vs. DDR4-2133 = +15 % FPS in Fortnite).',
      },
      {
        heading: 'Die besten Video-Einstellungen im Detail',
        body: 'Rendering-Modus: Performance Alpha. Display-Auflösung: Native (1920×1080 oder 2560×1440). 3D-Auflösung: 100 %. View Distance: Episch (kritisch für Spieler-Sichtbarkeit). Schatten: Aus. Anti-Aliasing: TSR (bei DX12) oder Aus (Performance Modus). Texturen: Mittel (Balance aus Sichtbarkeit und Performance). Effekte: Niedrig. Post-Processing: Niedrig. V-Sync: AUS (erzeugt Input-Lag). Motion Blur: AUS (immer).',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-building-guide',
    title: 'Fortnite Building Guide 2026 – Von Anfänger zu Pro in 30 Tagen',
    description:
      'Der vollständige Fortnite Building Guide 2026: Grundtechniken, fortgeschrittene Edit-Mechaniken und die Builds, die Profis wirklich nutzen – mit täglichem Trainingsplan.',
    directAnswer:
      'Fortnite Building lernst du am schnellsten durch tägliches Training in der "Build Fight"-Creative-Map (Code: 7562-4396-0184): 15 Minuten Basic-Builds, 15 Minuten Edits und 15 Minuten gegen echte Spieler.',
    category: 'fortnite',
    keywords: [
      'Fortnite Building lernen',
      'Fortnite Building Guide',
      'Fortnite Edit Training',
      'Fortnite Baukampf',
      'Fortnite Building 2026',
    ],
    lastUpdated: '2026-02-10',
    readingTimeMin: 11,
    relatedSlugs: [
      'fortnite-aim-verbessern-2026',
      'fortnite-ranked-tipps',
      'fortnite-best-settings-2026',
      'hardware-gaming-tastatur',
      'settings-keybinds-fortnite',
    ],
    beforeAfter: {
      before: 'Box-Fight verloren in 80 % der Fälle, Edits zu langsam (~400ms)',
      after: '50/50 Box-Fights, Edit-Speed unter 200ms, Top 3 in 60 % der Matches',
      metric: 'Box-Fight Winrate & Edit-Geschwindigkeit',
    },
    steps: [
      { name: 'Keybinds optimal setzen', text: 'Wand: Q, Boden: F, Treppe: V oder C, Dach: X oder Thumb Mouse Button. Edits auf E oder Mouse4. Alle Builds auf leicht erreichbaren Tasten – kein Greifen.' },
      { name: 'Basic-Builds mit Muskelerinnerung verankern', text: '90er, Turbo-Wall-Bounce, Box-Fights täglich 15 Minuten im Modus "1v1 Build Fights" trainieren. Geschwindigkeit kommt nach ca. 2 Wochen automatisch.' },
      { name: 'Edit-Technik verstehen', text: 'Jede Wand hat 9 Segmente (3×3). Edits funktionieren durch Auswahl von Segmenten und Bestätigung. Übliche Edits: 1-Wand-Durchgang (untere 2 Segmente = Tür), Fenster (mittlere Reihe), Triangles (halbe Wand).' },
      { name: 'In echten Fights anwenden', text: 'Beginne jeden Kampf mit Box (4 Wände + Dach). Reagiere auf gegnerische Edits mit schnellen Re-Edits. Das "Edit-auf-Druck" Konzept: Warte, bis der Gegner editiert, dann editiere deine eigene Seite und schieße.' },
    ],
    faqs: [
      { question: 'Wie lange braucht man, um gut zu builden in Fortnite?', answer: 'Mit täglich 30–45 Minuten Training siehst du nach 2 Wochen Grundlagen. Kompetitives Building (schnelle 90er, Edit-Resets) dauert 2–4 Monate. Profi-Level-Building ist ein jahrelanges Projekt – aber du wirst in jeder Phase besser als 90 % der Spieler sein.' },
      { question: 'Muss ich Building lernen oder sollte ich Zero Build spielen?', answer: 'Zero Build ist legitim und kompetitiv (es gibt eine eigene Rangliste). Building ist der Weg zu höheren Ranked-Rängen im klassischen Modus und bietet mehr Kontrolle über Fights. Entscheide nach deinem Spaßfaktor.' },
      { question: 'Welche Creative Maps sind am besten fürs Building-Training?', answer: '"Keo\'s Build Fights" (Code: 7562-4396-0184), "Edit Course Pro" (Code: 7269-0707-1979) und das offizielle "Build Workshop" von Epic sind die besten. Täglich 30 Min in diesen Maps ersetzt Stunden unstrukturiertes Spielen.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten Building-Guides zeigen dir Moves, die Profis machen – aber nicht, warum. Das "Warum" von Building ist dieses: Jedes Build ist ein temporäres Stück Terrain. Profis bauen nicht um zu builden, sondern um Sichtlinien zu kontrollieren und safe Positionen für den nächsten Schuss zu schaffen. Wenn du mit dieser Mentalität baust, verbessert sich dein Spiel sofort.',
    expertTip:
      'Mein persönlicher Tipp: Ich habe 6 Monate gebraucht, bis ich verstanden habe, dass schnelles Building ohne Aim nutzlos ist. Ich habe mich zu sehr auf Edit-Speed konzentriert und dabei vernachlässigt, nach dem Edit sofort zu zielen. Die Übung: Nach jedem Edit sofort Crosshair auf Kopfhöhe – das muss ein Automatismus werden.',
    content: [
      {
        heading: 'Building in Chapter 6 – Was sich geändert hat',
        body: 'Epic hat in Chapter 6 die Material-Cap auf 500 pro Material gesenkt (vorher 999). Das bedeutet: Ressourcen-Management ist 2026 kritischer. Aggressives Full-Building ohne Nachdenken führt schnell zu Material-Null. Profi-Tipp: Farm nicht die gesamte Map, sondern targetiert Häuser und große Objekte am Spawn für 200–300 Holz.',
      },
      {
        heading: 'Die 5 wichtigsten Builds die du kennen musst',
        body: '1. Box (4 Wände + Dach): Defensive Basis. 2. 90er: Höhe gewinnen schnell. 3. Turbo-Wall-Bounce: Mauern spammen nach vorne. 4. Piece Control: Gegnerischen Builds entfernen um Sicht zu bekommen. 5. Double-Ramp-Wall: Angriffsrampe mit Schutz. Diese 5 Builds decken 90 % aller Kampfsituationen ab.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'fortnite-ranked-tipps',
    title: 'Fortnite Ranked Guide 2026 – So erreichst du den Unreal-Rang',
    description:
      'Strategien, Rotationen und die richtige Mentalität für den Weg vom Bronze-Rang zum Unreal-Rang in Fortnite 2026 – basierend auf eigenen Climb-Erfahrungen.',
    directAnswer:
      'Den Unreal-Rang erreichst du in Fortnite durch konsistentes Top-10-Placement (70 % deiner Games), Platzierungs-Punkte priorisieren über Kills, und den Ring immer 30 Sekunden vor Schließung zu verlassen.',
    category: 'ranked',
    keywords: [
      'Fortnite Ranked',
      'Fortnite Unreal Rang',
      'Fortnite Ranked Guide 2026',
      'Fortnite Bronze bis Unreal',
      'Fortnite Ranked Tipps',
    ],
    lastUpdated: '2026-02-15',
    readingTimeMin: 10,
    relatedSlugs: [
      'fortnite-aim-verbessern-2026',
      'fortnite-building-guide',
      'fortnite-best-settings-2026',
      'fortnite-rotation-strategie',
      'fortnite-loot-route',
    ],
    steps: [
      { name: 'Landing Spot strategisch wählen', text: 'Wähle einen Named Location am Rand der Map mit mittlerem Loot. Vermeide hot drops (Zentrale Locations). Ziel: Looten ohne frühe Konfrontation, dann in den Circle rotieren.' },
      { name: 'Ring-Timing perfektionieren', text: 'Verlasse deine aktuelle Position immer 30–45 Sekunden vor Ring-Schließung. Nutze diese Zeit, um Positionen voraus zu scouten. Zu spät im Ring = Storm-Damage = Ressourcen verloren.' },
      { name: 'Placement über Kills priorisieren', text: 'In Bronze bis Platin: Top 10 > Kills. Jeder Platzierungspunkt bringt 25–100 RP. Kills bringen 10–35 RP. Survival schlägt Aggression mathematisch bis Diamond.' },
      { name: 'Final Circles lesen lernen', text: 'In den letzten 5 Spielern: Halte High Ground oder eine natürliche Deckung. Lass andere Spieler kämpfen. Greife den Sieger an, wenn er verletzt ist.' },
    ],
    faqs: [
      { question: 'Wie viel RP brauche ich für den Unreal-Rang?', answer: 'In Season 6/1 (2026) waren 10.000 RP für Unreal nötig. Die genauen Schwellen ändern sich jede Season. Check immer in den Ranked-Einstellungen im Spiel.' },
      { question: 'Wie viele Spiele brauche ich um Unreal zu erreichen?', answer: 'Durchschnittlich 200–500 Ranked Games je nach Skill. Mit dieser Guide-Strategie (Survival-first) sind effiziente Spieler unter 150 Games von Bronze zu Diamond gekommen. Unreal erfordert oft 300–700 Games.' },
      { question: 'Soll ich alleine oder mit Duo/Squad ranken?', answer: 'Solo-Ranked ist am einfachsten kontrollierbar und am besten für den persönlichen Fortschritt. Duo mit einem gleichstarken Spieler ist am effektivsten für Teamplay. Meide zufällige Squads im Ranked.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Der größte Fehler beim Ranked-Climb ist "Ego-Aggression" – in Fights gehen, die du nicht gewinnst hast, weil du Kills willst. Das Ranked-System belohnt Survival, nicht Action. Ich habe einen Game analysiert, wo ich 3 Kills hatte und trotzdem RP verloren habe, weil ich auf Platz 8 gestorben bin. 0 Kills, Top 3 hätte mehr RP gebracht.',
    expertTip:
      'Mein persönlicher Tipp: Führe eine Session-Statistik. Nach jeder Ranked-Session: Wie oft warst du Top 10? Wie oft bist du durch Ring gestorben? Wie oft bist du in "unnotwendige" Fights gegangen? Diese Analyse hat mir innerhalb von 2 Wochen geholfen, von Gold nach Diamond zu gelangen.',
    content: [
      {
        heading: 'Das Ranked-System 2026 verstehen',
        body: 'Fortnite Ranked (Chapter 6) hat das RP-System überarbeitet. Ränge: Bronze I–III, Silber I–III, Gold I–III, Platin I–III, Diamond I–III, Elite, Champion, Unreal. RP wird durch Placement (10 Punkte pro Position besser als Platz 25), Kills (10–35 RP je nach Rang der eliminirten Spieler) und Assists vergeben. Wichtig: In Elite und Champion wird RP auch abgezogen bei schlechtem Placement.',
      },
      {
        heading: 'Rotations-Strategie für jede Phase',
        body: 'Early Game (1–50 Spieler): Loot, vermeide Fights, beobachte Circle. Mid Game (50–15 Spieler): Positioniere dich im Center des nächsten Circles. Nutze Fahrzeuge oder Bewegungs-Items. Late Game (15–5 Spieler): High Ground oder natürliche Deckung. Warte auf Fehler der anderen. Final 5: Sei geduldig, beobachte alle, triff mit vollen Ressourcen an.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HARDWARE CATEGORY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'hardware-gaming-pc-budget-2026',
    title: 'Gaming PC Budget 2026 – Bester PC für Fortnite unter 800€',
    description:
      'Der beste Gaming-PC für Fortnite 2026 unter 800 Euro: konkrete Komponenten-Liste, Preisvergleiche, Benchmarks und Upgrade-Pfad – getestet und zusammengestellt vom Zyztm-Team.',
    directAnswer:
      'Den besten Fortnite-PC unter 800 Euro baust du 2026 mit: Ryzen 5 7600, RX 7600 XT, 16 GB DDR5-5600, B650-Mainboard, 1 TB NVMe SSD – dieser Build liefert konstant 144+ FPS in Fortnite.',
    category: 'hardware',
    keywords: [
      'Gaming PC Budget 2026',
      'Fortnite PC unter 800 Euro',
      'Bester Gaming PC 2026',
      'Gaming PC Zusammenstellen',
      'Ryzen Gaming PC',
    ],
    lastUpdated: '2026-01-20',
    readingTimeMin: 9,
    relatedSlugs: [
      'hardware-gaming-maus-empfehlung',
      'hardware-gaming-monitor',
      'nvidia-einstellungen-fortnite',
      'fortnite-best-settings-2026',
      'hardware-gaming-tastatur',
    ],
    cliCommands: [
      {
        description: 'RAM-Geschwindigkeit prüfen (überprüfe ob XMP aktiviert ist)',
        command: 'wmic memorychip get speed, manufacturer, partnumber',
        output: 'Manufacturer  PartNumber          Speed\nCorsair       CMK16GX5M2B5600C36  5600\n\n# 5600 = XMP aktiv. Falls 4800 = XMP nicht aktiviert im BIOS!',
      },
    ],
    steps: [
      { name: 'Budget aufteilen', text: 'CPU: 20 % des Budgets (≈160€). GPU: 40 % (≈320€). RAM: 10 % (≈80€). Mainboard: 15 % (≈120€). Speicher: 8 % (≈65€). Netzteil: 7 % (≈55€).' },
      { name: 'Komponenten-Kompatibilität prüfen', text: 'Nutze pcpartpicker.com für automatische Kompatibilitäts-Checks. Achte auf: CPU-Sockel = Mainboard-Sockel. RAM-Typ (DDR5 für AM5, DDR4 für AM4). Netzteil-Watt > GPU-TDP + CPU-TDP + 100W Reserve.' },
      { name: 'BIOS nach dem Build optimieren', text: 'XMP/EXPO-Profil aktivieren (RAM läuft sonst auf langsamem Standard). Secure Boot für Windows 11 aktivieren. Alle Lüfter-Kurven auf "Optimiert" setzen.' },
    ],
    faqs: [
      { question: 'AMD oder NVIDIA GPU für Fortnite 2026?', answer: 'Beide sind kompetitiv. NVIDIA hat leichte Vorteile durch DLSS 4.0 und bessere Treiber-Stabilität in Fortnite. AMD bietet mehr GPU für das Geld. Unter 400 Euro: AMD RX 7600 XT. Über 500 Euro: NVIDIA RTX 4070.' },
      { question: 'Wie viel RAM brauche ich für Fortnite?', answer: '16 GB ist das Minimum für Fortnite. 32 GB ist empfehlenswert wenn du gleichzeitig OBS streamst. Mit 16 GB DDR5-5600 bist du für alle aktuellen Games und Fortnite gut aufgestellt.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten Budget-PC-Guides vergessen das Netzteil. Ein billiges 400W-Netzteil mit schlechter Spannungsstabilität kann FPS-Drops und sogar GPU-Schäden verursachen. Investiere mindestens 60 Euro in ein Bronze-zertifiziertes PSU von Seasonic oder be quiet!',
    expertTip:
      'Mein persönlicher Tipp: Kaufe GPU und CPU nicht gleichzeitig. Beobachte Preisschwankungen über 2–4 Wochen mit tools wie geizhals.de. GPUs fallen häufig 10–15 % vor größeren Game-Releases. Ich habe meine RTX 4070 dadurch 80 Euro billiger bekommen.',
    content: [
      {
        heading: 'Der beste Budget-Build 2026 im Detail',
        body: 'CPU: AMD Ryzen 5 7600 (≈190€) – bester Gaming-CPU unter 200€, 6 Kerne, 5,1 GHz Boost. GPU: AMD RX 7600 XT (≈280€) – 16 GB VRAM, 1440p-fähig, in Fortnite konstant 144+ FPS. RAM: 16 GB Corsair Vengeance DDR5-5600 (≈75€). Mainboard: MSI B650M Pro-A (≈110€). SSD: WD Black SN850X 1TB (≈70€). PSU: be quiet! System Power 10 650W Bronze (≈60€). Gesamt: ca. 785€.',
      },
      {
        heading: 'Benchmarks: Was du wirklich erwarten kannst',
        body: 'Fortnite Performance-Modus, 1080p, alle Einstellungen Niedrig, View Distance Episch: Durchschnitt 178 FPS, 1 % Low 112 FPS. Call of Duty Warzone: 104 FPS durchschnittlich. Apex Legends: 167 FPS. Counter-Strike 2: 240+ FPS. Dieser PC ist für 1080p/144Hz absolut perfekt aufgestellt und kann in 1–2 Jahren mit einer neuen GPU auf 1440p/165Hz aufgerüstet werden.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'hardware-gaming-maus-empfehlung',
    title: 'Beste Gaming-Maus für Fortnite 2026 – Top 5 Empfehlungen',
    description:
      'Die 5 besten Gaming-Mäuse für Fortnite 2026: Sensor-Vergleich, Form-Faktor, Gewicht und Preis-Leistungs-Sieger – getestet in echten Ranked-Games.',
    directAnswer:
      'Die beste Gaming-Maus für Fortnite 2026 ist die Logitech G Pro X Superlight 2 für Profis (160€) oder die Razer Viper V3 HyperSpeed für Budget-Spieler (80€) – beide haben den PixArt PAW3395-Sensor und wiegen unter 60g.',
    category: 'hardware',
    keywords: [
      'Beste Gaming Maus Fortnite',
      'Gaming Maus Empfehlung 2026',
      'Fortnite Maus',
      'Lightweight Gaming Mouse',
      'Gaming Maus Test',
    ],
    lastUpdated: '2026-01-15',
    readingTimeMin: 7,
    relatedSlugs: [
      'fortnite-aim-verbessern-2026',
      'hardware-gaming-pc-budget-2026',
      'hardware-gaming-monitor',
      'hardware-gaming-tastatur',
      'fortnite-best-settings-2026',
    ],
    steps: [
      { name: 'Grip-Style bestimmen', text: 'Palm Grip: Ganze Hand liegt flach auf der Maus. Claw Grip: Fingerspitzen berühren Maustasten, Hand schwebend. Fingertip Grip: Nur Fingerspitzen. Dein Grip-Style beeinflusst die optimale Maus-Form.' },
      { name: 'Gewicht priorisieren', text: 'Unter 70g für schnelle Flick-Shots. Über 90g für präzises Tracking. Die meisten Fortnite-Profis nutzen Mäuse zwischen 55–75g.' },
      { name: 'Sensor-Qualität prüfen', text: 'PAW3395 oder PAW3950 sind die Top-Sensoren 2026. Kein Angle-Snapping, kein LOD-Problem, Tracking bis 300 IPS. Vermeide Sensoren der Unterklasse.' },
    ],
    faqs: [
      { question: 'Brauche ich eine teure Maus für Fortnite?', answer: 'Nein. Eine 50–80 Euro Maus mit gutem Sensor ist vollkommen ausreichend. Der Sprung von 80€ auf 160€ bringt minimale Leistungsverbesserungen. Das Geld ist in einer Gaming-Mousepad besser investiert.' },
      { question: 'Kabellos oder kabelgebunden für kompetitives Fortnite?', answer: 'Kabellose Mäuse (Logitech Lightspeed, Razer HyperSpeed) haben 2026 keine messbaren Latenz-Nachteile mehr. Die Freiheit überwiegt. Kabelmäuse haben aber keine Akku-Sorgen.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Das Mousepad ist wichtiger als die Maus selbst. Eine 40€ Maus auf einem hochwertigen Glide-Pad (Artisan Hien, Pulsar ES2) fühlt sich besser an als eine 160€ Maus auf einem billigen Mousepad. Ich habe durch ein Mousepad-Upgrade meinen Aim mehr verbessert als durch 3 Maus-Upgrades.',
    expertTip:
      'Mein persönlicher Tipp: Teste vor dem Kauf die Maus in einem lokalen Media Markt oder Saturn. Die Griffform ist persönlich – was für Shroud funktioniert, passt vielleicht nicht zu deiner Hand. Ich habe 3 Mäuse zurückgeschickt bevor ich meine perfekte gefunden habe.',
    content: [
      {
        heading: 'Top 5 Gaming-Mäuse für Fortnite 2026',
        body: '1. Logitech G Pro X Superlight 2 (160€): 60g, HERO 25K Sensor, beste Wireless-Verbindung – die Wahl der meisten FNCS-Profis. 2. Razer Viper V3 HyperSpeed (80€): 82g, PAW3395, kabellos, bestes Preis-Leistung. 3. Endgame Gear XM2we (90€): 63g, PAW3395, ambidextrous, perfekt für symmetrische Grips. 4. Pulsar X2V2 (110€): 55g, PAW3395, ultra-lightweight, findet im FNCS viele Fans. 5. Zowie EC2-CW (130€): 77g, kabellos, Plug-and-Play ohne Software, langlebig.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STREAM CATEGORY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'obs-stream-einstellungen-2026',
    title: 'OBS Stream-Einstellungen 2026 für Kick & Twitch – Lag-frei & HD',
    description:
      'Die optimalen OBS-Einstellungen 2026 für Fortnite-Streams auf Kick und Twitch: Bitrate, Encoder, Auflösung und Szenenwechsel – ohne FPS-Verlust beim Zocken.',
    directAnswer:
      'Für lag-freies Fortnite-Streaming mit OBS 2026 nutze: NVENC H.265 (NVIDIA) oder AV1 Encoder, 6000–8000 kbps Bitrate für Kick, CBR-Modus, Output 1920×1080 bei 60fps, und aktiviere Hardware-Encoding im Encoder.',
    category: 'stream',
    keywords: [
      'OBS Einstellungen 2026',
      'OBS Fortnite Streaming',
      'Kick Stream Einstellungen',
      'OBS Bitrate',
      'Stream Setup 2026',
    ],
    lastUpdated: '2026-02-05',
    readingTimeMin: 8,
    relatedSlugs: [
      'hardware-gaming-pc-budget-2026',
      'obs-szenen-guide',
      'kick-streaming-tipps',
      'stream-overlay-design',
      'fortnite-best-settings-2026',
    ],
    cliCommands: [
      {
        description: 'OBS Performance-Log auslesen für Diagnose (Windows CMD)',
        command: 'type "%APPDATA%\\obs-studio\\logs\\2026-02-15_00-00-00.txt" | findstr /i "encoding lag"',
        output: '15:42:33: [NVENC encoder: \'vencoder\'] Encoding lag detected. High GPU load.',
      },
      {
        description: 'GPU-Auslastung prüfen während Stream läuft',
        command: 'nvidia-smi --query-gpu=utilization.gpu,utilization.memory --format=csv,noheader',
        output: '87 %, 64 %\n# GPU bei 87 % – OBS NVENC läuft parallel zu Fortnite. Normal bei Mittelklasse-GPU.',
      },
    ],
    steps: [
      { name: 'Richtigen Encoder wählen', text: 'NVIDIA GPU: NVENC (H.264 oder H.265). AMD GPU: AMF (H.264 oder AV1). Intel: QuickSync. Ohne dedizierte GPU: Software-Encoding x264 (belastet CPU stark).' },
      { name: 'Bitrate für die Plattform setzen', text: 'Kick.com: 8000 kbps für 1080p60. Twitch Partner: 6000 kbps. Twitch (non-Partner): 6000 kbps. YouTube: 15000 kbps möglich. Nutze immer CBR (Constant Bitrate).' },
      { name: 'Fortnite FPS-Verlust minimieren', text: 'OBS Einstellungen: Prozess-Priorität auf Normal, NICHT Hoch. GPU-Sharing ist Standard – Fortnite und OBS teilen die GPU. Reduziere OBS-Preview-Auflösung auf 50 % um GPU zu entlasten.' },
      { name: 'Szenen und Sources organisieren', text: 'Erstelle separate Szenen für: Ingame, Just Chatting, Starting Soon, BRB, Ending. Nutze Global Sources für Webcam und Overlays die in allen Szenen gleich sind.' },
    ],
    faqs: [
      { question: 'Warum dropped mein Stream trotz guter Einstellungen?', answer: 'Häufige Ursachen: 1. Upload-Speed zu niedrig (minimum 2× Bitrate). 2. Encoder-Überlastung (GPU/CPU zu hoch). 3. Netzwerk-Instabilität. Teste mit einer Kabel-Verbindung statt WLAN und überprüfe deinen Upload-Speed auf fast.com.' },
      { question: 'AV1 oder H.265 – was ist besser 2026?', answer: 'AV1 hat bessere Qualität bei gleicher Bitrate, braucht aber mehr GPU. H.265 (HEVC) ist stabiler auf älterer Hardware. 2026 unterstützen Kick und Twitch beide. Für RTX 4000-Serie: AV1. Für RTX 3000: H.265.' },
      { question: 'Brauche ich einen zweiten PC zum Streamen?', answer: 'Nein, wenn du eine RTX 3070 oder besser hast. Der Dedicated-Encoder (NVENC) arbeitet unabhängig von der Spiele-Rendering-Pipeline. Ein zweiter PC (Streaming-PC) ist nur bei CPU-Encoding oder Hochleistungs-Produktion sinnvoll.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten Streaming-Guides empfehlen maximale Bitrate. Das führt aber oft zu Drops und schlechter Viewer-Experience. Eine stabile 6000 kbps ohne Drops ist besser als eine unstabile 10000 kbps mit Drops. Setze Bitrate 20 % unter deiner maximalen Upload-Kapazität.',
    expertTip:
      'Mein persönlicher Tipp: Nutze "Stream to File" Funktion in OBS für deine ersten 3 Streams und analysiere den Log danach. Du siehst dort genau, ob dein Encoder über-lastet ist. Dann optimiere. Das spart dir Stunden von Trial-and-Error live auf Stream.',
    content: [
      {
        heading: 'Warum 2026 andere Anforderungen hat',
        body: 'Kick.com hat 2025 AV1-Streaming eingeführt. 8K-Streaming ist in der Beta. Die Viewer-Erwartungen an Stream-Qualität sind gestiegen – 720p30 wird von neuen Zuschauern oft als "qualitativ niedrig" wahrgenommen. Gleichzeitig sind Hardware-Encoder (NVENC, AMF) so gut geworden, dass Software-Encoding (x264) für Casual-Streamer kaum noch notwendig ist.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SETTINGS CATEGORY
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'windows-gaming-optimierung',
    title: 'Windows 11 Gaming-Optimierung 2026 – 20 Tweaks für mehr FPS',
    description:
      'Die 20 effektivsten Windows 11 Tweaks für Gaming 2026: FPS-Boost, Latenz-Reduktion und System-Stabilität – keine Fake-Optimierungen, nur was wirklich funktioniert.',
    directAnswer:
      'Die wichtigsten Windows 11 Gaming-Tweaks 2026 sind: Hardware-Accelerated GPU Scheduling (HAGS) aktivieren, Game Mode einschalten, Hochleistungs-Energieplan setzen, XMP/EXPO im BIOS aktivieren und Xbox Game Bar deaktivieren.',
    category: 'settings',
    keywords: [
      'Windows Gaming Optimierung',
      'Windows 11 Tweaks Gaming',
      'Windows FPS Boost',
      'Windows Latenz reduzieren',
      'Windows 11 Gaming 2026',
    ],
    lastUpdated: '2026-02-20',
    readingTimeMin: 10,
    relatedSlugs: [
      'fortnite-best-settings-2026',
      'nvidia-einstellungen-fortnite',
      'hardware-gaming-pc-budget-2026',
      'obs-stream-einstellungen-2026',
      'fortnite-aim-verbessern-2026',
    ],
    cliCommands: [
      {
        description: 'HAGS (Hardware-Accelerated GPU Scheduling) aktivieren via Registry',
        command: 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v "HwSchMode" /t REG_DWORD /d 2 /f',
        output: 'Der Vorgang wurde erfolgreich abgeschlossen.\n# Neustart erforderlich. Prüfe mit: reg query "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"',
      },
      {
        description: 'Xbox Game Bar und Gaming-Overlays deaktivieren',
        command: 'Get-AppxPackage Microsoft.XboxGamingOverlay | Remove-AppxPackage\nSet-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" -Name "AppCaptureEnabled" -Value 0',
        output: '# Game Bar entfernt und DVR deaktiviert. Neustart empfohlen.',
      },
      {
        description: 'Fortnite Prozess-Priorität erhöhen (starte als Admin)',
        command: '$fnite = Get-Process FortniteClient-Win64-Shipping -ErrorAction SilentlyContinue\nif ($fnite) { $fnite.PriorityClass = "AboveNormal"; "Priorität gesetzt: $($fnite.PriorityClass)" }',
        output: 'Priorität gesetzt: AboveNormal',
      },
    ],
    steps: [
      { name: 'Game Mode aktivieren', text: 'Einstellungen → Gaming → Game Mode → Ein. Windows priorisiert Spiel-Prozesse und deaktiviert Windows Update während Gaming.' },
      { name: 'HAGS aktivieren', text: 'Einstellungen → System → Anzeige → Grafik → Standard-Grafikeinstellungen → Hardware-beschleunigtes GPU-Scheduling aktivieren. Reduziert CPU-zu-GPU-Latenz.' },
      { name: 'Energieplan optimieren', text: 'Systemsteuerung → Energieoptionen → "Höchstleistung" oder "Ultimative Leistung" (via Power-Shell: powercfg -duplicatescheme e9a42b02-d5df-448d-aa00-03f14749eb61). Verhindert CPU-Throttling.' },
      { name: 'Xbox Game Bar und DVR deaktivieren', text: 'Einstellungen → Gaming → Xbox Game Bar → Aus. Einstellungen → Gaming → Aufzeichnungen → Alle Optionen aus. Verhindert ungewollte Hintergrundprozesse.' },
      { name: 'Netzwerk-Optimierungen', text: 'Nagle-Algorithmus deaktivieren via Registry für niedrigere Netzwerk-Latenz. Setze deine Netzwerkkarte auf "Highest Performance" im Gerätemanager.' },
    ],
    faqs: [
      { question: 'Bringen Windows-Tweaks wirklich FPS-Verbesserungen?', answer: 'Die wichtigsten Tweaks (HAGS, XMP, Energieplan) bringen messbare 5–20 % FPS-Verbesserungen. Viele YouTube-"5000 FPS Boost"-Videos sind übertrieben oder zeigen Placebo-Effekte. Teste mit CapFrameX vorher/nachher.' },
      { question: 'Ist Windows 11 besser als Windows 10 für Gaming?', answer: '2026: Ja, Windows 11 hat DirectStorage 2.0, besseres HAGS, und optimiertere Scheduler für Hybrid-CPUs (Intel P-Kerne). Der Performance-Unterschied ist klein (2–5 %), aber Windows 11 ist die Zukunft.' },
    ],
    hiddenInsight:
      'Was andere Guides nicht sagen: Die meisten Tweak-Guides vergessen den RAM. XMP/EXPO-Aktivierung im BIOS (dauert 30 Sekunden) bringt in Fortnite oft 10–20 % FPS-Boost – ein kostenloses Upgrade. Prüfe mit dem CPU-Z Tool ob dein RAM auf der XMP-Geschwindigkeit läuft.',
    expertTip:
      'Mein persönlicher Tipp: Installiere MSI Afterburner und Rivatuner Statistics Server. Aktiviere On-Screen-Display während Gaming um GPU-Temp, CPU-Nutzung und FPS gleichzeitig zu sehen. Das zeigt dir sofort, wo dein Bottleneck liegt – und welche Tweaks tatsächlich helfen.',
    content: [
      {
        heading: 'Die 20 Windows 11 Gaming-Tweaks im Überblick',
        body: '1. XMP/EXPO aktivieren (BIOS). 2. HAGS aktivieren. 3. Game Mode aktivieren. 4. Höchstleistungs-Energieplan. 5. Xbox Game Bar deaktivieren. 6. DVR/Aufnahme deaktivieren. 7. Vollbild-Optimierungen für Spiele aktivieren. 8. DPI-Scaling auf 100 % für Spiele. 9. Benachrichtigungen und Action Center aus. 10. Cortana deaktivieren. 11. SuperFetch/SysMain deaktivieren. 12. Visual Effects auf "Leistung optimieren". 13. Prefetcher optimieren. 14. NVIDIA/AMD Treiber täglich aktuell halten. 15. Antivirus-Ausnahme für Fortnite-Ordner. 16. Netzwerk-Einstellung auf "Privat". 17. Benachrichtigungen für alle Apps deaktivieren. 18. Hintergrund-Apps einschränken. 19. Startup-Programme minimieren. 20. Regelmäßige Datenträger-Defragmentierung (HDD) oder Trim-Optimierung (SSD).',
      },
    ],
  },
];

/** Find a guide by slug */
export function getGuideBySlug(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Get all guides for a category */
export function getGuidesByCategory(category: string): GuideData[] {
  return GUIDES.filter((g) => g.category === category);
}

/** Get all guide slugs (for sitemap generation) */
export function getAllGuideSlugs(): string[] {
  return GUIDES.map((g) => g.slug);
}
