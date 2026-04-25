/**
 * Guide Translations for 10 Languages
 * Translates guide titles, descriptions, and direct answers
 */

import { type Language } from '../lib/i18n';

export interface GuideTranslation {
  language: Language;
  title: string;
  description: string;
  directAnswer: string;
}

// Guide slugs mapped to translations
export const GUIDE_TRANSLATIONS: Record<string, GuideTranslation[]> = {
  'fortnite-aim-guide': [
    {
      language: 'en',
      title: 'Fortnite Aim Guide – How to Improve Your Aim in 2026',
      description: 'The ultimate aim guide for Fortnite. Learn aim training, sensitivity settings, and techniques to hit more shots and win more games.',
      directAnswer: 'Improve your aim by practicing 30 minutes daily in aim trainers, using 0.6-0.8 sensitivity, and focusing on crosshair placement.',
    },
    {
      language: 'de',
      title: 'Fortnite Aim Guide – So verbesserst du dein Aim in 2026',
      description: 'Der ultimative Aim-Guide für Fortnite. Lerne Aim-Training, Sensitivity-Einstellungen und Techniken für mehr Treffer und mehr Wins.',
      directAnswer: 'Verbessere dein Aim durch tägliches 30-minütiges Training in Aim-Trainers, 0.6-0.8 Sensitivity und Fokus auf Crosshair-Placement.',
    },
    {
      language: 'es',
      title: 'Guía de Aim de Fortnite – Cómo mejorar tu puntería en 2026',
      description: 'La guía definitiva de aim para Fortnite. Aprende entrenamiento de aim, configuración de sensibilidad y técnicas para acertar más tiros y ganar más partidas.',
      directAnswer: 'Mejora tu aim entrenando 30 minutos diarios en aim trainers, usando sensibilidad 0.6-0.8 y enfocándote en la colocación de la mira.',
    },
    {
      language: 'fr',
      title: 'Guide de Visée Fortnite – Comment améliorer votre visée en 2026',
      description: 'Le guide ultime de visée pour Fortnite. Apprenez l\'entraînement de visée, les réglages de sensibilité et les techniques pour toucher plus de tirs et gagner plus de parties.',
      directAnswer: 'Améliorez votre visée en vous entraînant 30 minutes par jour dans les aim trainers, en utilisant une sensibilité de 0.6-0.8 et en vous concentrant sur le placement du réticule.',
    },
    {
      language: 'pt-br',
      title: 'Guia de Aim do Fortnite – Como melhorar sua mira em 2026',
      description: 'O guia definitivo de aim para Fortnite. Aprenda treinamento de aim, configurações de sensibilidade e técnicas para acertar mais tiros e ganhar mais jogos.',
      directAnswer: 'Melhore seu aim treinando 30 minutos diariamente em aim trainers, usando sensibilidade 0.6-0.8 e focando no posicionamento da mira.',
    },
    {
      language: 'it',
      title: 'Guida alla Punteria Fortnite – Come migliorare la tua mira nel 2026',
      description: 'La guida definitiva alla punteria per Fortnite. Impara l\'allenamento della mira, le impostazioni di sensibilità e le tecniche per colpire più colpi e vincere più partite.',
      directAnswer: 'Migliora la tua mira allenandoti 30 minuti al giorno negli aim trainer, usando sensibilità 0.6-0.8 e concentrandoti sul posizionamento del mirino.',
    },
    {
      language: 'ru',
      title: 'Руководство по прицеливанию Fortnite – Как улучшить прицел в 2026',
      description: 'Полное руководство по прицеливанию для Fortnite. Узнайте о тренировке прицеливания, настройках чувствительности и методах для большего попадания и побед.',
      directAnswer: 'Улучшите прицел, тренируясь 30 минут ежедневно в aim trainers, используя чувствительность 0.6-0.8 и фокусируясь на размещении прицела.',
    },
    {
      language: 'pl',
      title: 'Przewodnik po celowaniu Fortnite – Jak poprawić celowanie w 2026',
      description: 'Ostateczny przewodnik po celowaniu dla Fortnite. Naucz się treningu celowania, ustawień czułości i technik, aby trafiać więcej strzałów i wygrywać więcej gier.',
      directAnswer: 'Popraw celowanie, trenując 30 minut dziennie w aim trainers, używając czułości 0.6-0.8 i skupiając się na umieszczaniu celownika.',
    },
    {
      language: 'tr',
      title: 'Fortnite Nişan Rehberi – 2026\'da nişanınızı nasıl geliştirirsiniz',
      description: 'Fortnite için nihai nişan rehberi. Nişan eğitimi, hassasiyet ayarları ve daha fazla vuruş yapmak ve daha fazla oyun kazanmak için teknikler öğrenin.',
      directAnswer: 'Nişanınızı aim trainers\'da günde 30 dakika egzersiz yaparak, 0.6-0.8 hassasiyet kullanarak ve nişangah yerleşimine odaklanarak geliştirin.',
    },
    {
      language: 'ja',
      title: 'Fortnite 照準ガイド – 2026年に照準を向上させる方法',
      description: 'Fortniteの究極の照準ガイド。照準トレーニング、感度設定、およびより多くのショットをヒットし、より多くのゲームに勝つためのテクニックを学びます。',
      directAnswer: 'aim trainersで毎日30分練習し、感度0.6-0.8を使用し、照準の配置に集中することで照準を向上させます。',
    },
  ],
  'fortnite-building-guide': [
    {
      language: 'en',
      title: 'Fortnite Building Guide – Master Building in 2026',
      description: 'Complete building guide for Fortnite. Learn 90s, edits, box fighting, and advanced building techniques for competitive play.',
      directAnswer: 'Master building by practicing 90s daily, learning cone edits, and using box fighting in creative maps.',
    },
    {
      language: 'de',
      title: 'Fortnite Building Guide – Baumeister werden in 2026',
      description: 'Vollständiger Building-Guide für Fortnite. Lerne 90er, Edits, Box-Fighting und fortgeschrittene Building-Techniken für Competitive Play.',
      directAnswer: 'Werde Building-Meister durch tägliches Üben von 90ern, Lernen von Cone-Edits und Box-Fighting in Creative Maps.',
    },
    {
      language: 'es',
      title: 'Guía de Construcción Fortnite – Domina la construcción en 2026',
      description: 'Guía completa de construcción para Fortnite. Aprende 90s, ediciones, box fighting y técnicas avanzadas de construcción para juego competitivo.',
      directAnswer: 'Domina la construcción practicando 90s diariamente, aprendiendo ediciones de conos y usando box fighting en mapas creativos.',
    },
    {
      language: 'fr',
      title: 'Guide de Construction Fortnite – Maîtrisez la construction en 2026',
      description: 'Guide complet de construction pour Fortnite. Apprenez les 90s, les éditions, le box fighting et les techniques de construction avancées pour le jeu compétitif.',
      directAnswer: 'Maîtrisez la construction en pratiquant les 90s quotidiennement, en apprenant les éditions de cônes et en utilisant le box fighting dans les cartes créatives.',
    },
    {
      language: 'pt-br',
      title: 'Guia de Construção do Fortnite – Domine a construção em 2026',
      description: 'Guia completo de construção para Fortnite. Aprenda 90s, edições, box fighting e técnicas avançadas de construção para jogo competitivo.',
      directAnswer: 'Domine a construção praticando 90s diariamente, aprendendo edições de cones e usando box fighting em mapas criativos.',
    },
    {
      language: 'it',
      title: 'Guida alla Costruzione Fortnite – Padroneggia la costruzione nel 2026',
      description: 'Guida completa alla costruzione per Fortnite. Impara i 90s, le modifiche, il box fighting e le tecniche di costruzione avanzate per il gioco competitivo.',
      directAnswer: 'Padroneggia la costruzione praticando i 90s quotidianamente, imparando le modifiche dei coni e usando il box fighting nelle mappe creative.',
    },
    {
      language: 'ru',
      title: 'Руководство по строительству Fortnite – Мастерство строительства в 2026',
      description: 'Полное руководство по строительству для Fortnite. Научитесь 90s, редактированию, box fighting и продвинутым методам строительства для соревновательной игры.',
      directAnswer: 'Освойте строительство, ежедневно практикуя 90s, изучая редактирование конусов и используя box fighting в творческих картах.',
    },
    {
      language: 'pl',
      title: 'Przewodnik po budowaniu Fortnite – Opanuj budowanie w 2026',
      description: 'Kompletny przewodnik po budowaniu dla Fortnite. Naucz się 90s, edycji, box fighting i zaawansowanych technik budowania do gry konkurencyjnej.',
      directAnswer: 'Opanuj budowanie, codziennie ćwicząc 90s, ucząc się edycji stożków i używając box fighting w mapach kreatywnych.',
    },
    {
      language: 'tr',
      title: 'Fortnite İnşa Rehberi – 2026\'da inşaatı ustala',
      description: 'Fortnite için kapsamlı inşa rehberi. Rekabetçi oyun için 90s, düzenlemeler, box fighting ve gelişmiş inşa tekniklerini öğrenin.',
      directAnswer: '90s\'i her gün pratik yaparak, konu düzenlemelerini öğrenerek ve yaratıcı haritalarda box fighting kullanarak inşaatı ustala.',
    },
    {
      language: 'ja',
      title: 'Fortnite 建築ガイド – 2026年に建築をマスターする',
      description: 'Fortniteの完全な建築ガイド。競技プレイのための90s、編集、box fighting、および高度な建築テクニックを学びます。',
      directAnswer: '90sを毎日練習し、コーン編集を学び、クリエイティブマップでbox fightingを使用して建築をマスターします。',
    },
  ],
  'fortnite-weapon-guide': [
    {
      language: 'en',
      title: 'Fortnite Weapon Guide – All Weapons & Meta 2026',
      description: 'Complete weapon guide for Fortnite. Learn about all weapons, damage stats, reload times, and the current meta for competitive play.',
      directAnswer: 'The current meta weapons are Pump Shotgun, Striker AR, and Tactical SMG. Focus on these three weapons for best results.',
    },
    {
      language: 'de',
      title: 'Fortnite Waffen Guide – Alle Waffen & Meta 2026',
      description: 'Vollständiger Waffen-Guide für Fortnite. Lerne über alle Waffen, Damage-Stats, Reload-Zeiten und das aktuelle Meta für Competitive Play.',
      directAnswer: 'Die aktuellen Meta-Waffen sind Pump Shotgun, Striker AR und Tactical SMG. Fokus auf diese drei Waffen für beste Ergebnisse.',
    },
    {
      language: 'es',
      title: 'Guía de Armas Fortnite – Todas las armas y meta 2026',
      description: 'Guía completa de armas para Fortnite. Aprende sobre todas las armas, estadísticas de daño, tiempos de recarga y el meta actual para juego competitivo.',
      directAnswer: 'Las armas meta actuales son Pump Shotgun, Striker AR y Tactical SMG. Enfócate en estas tres armas para mejores resultados.',
    },
    {
      language: 'fr',
      title: 'Guide des Armes Fortnite – Toutes les armes et méta 2026',
      description: 'Guide complet des armes pour Fortnite. Apprenez toutes les armes, les statistiques de dégâts, les temps de rechargement et le méta actuel pour le jeu compétitif.',
      directAnswer: 'Les armes méta actuelles sont Pump Shotgun, Striker AR et Tactical SMG. Concentrez-vous sur ces trois armes pour de meilleurs résultats.',
    },
    {
      language: 'pt-br',
      title: 'Guia de Armas do Fortnite – Todas as armas e meta 2026',
      description: 'Guia completo de armas para Fortnite. Aprenda sobre todas as armas, estatísticas de dano, tempos de recarga e o meta atual para jogo competitivo.',
      directAnswer: 'As armas meta atuais são Pump Shotgun, Striker AR e Tactical SMG. Foque nestas três armas para melhores resultados.',
    },
    {
      language: 'it',
      title: 'Guida alle Armi Fortnite – Tutte le armi e meta 2026',
      description: 'Guida completa alle armi per Fortnite. Impara tutte le armi, le statistiche dei danni, i tempi di ricarica e il meta attuale per il gioco competitivo.',
      directAnswer: 'Le armi meta attuali sono Pump Shotgun, Striker AR e Tactical SMG. Concentrati su queste tre armi per i migliori risultati.',
    },
    {
      language: 'ru',
      title: 'Руководство по оружию Fortnite – Все оружие и мета 2026',
      description: 'Полное руководство по оружию для Fortnite. Узнайте обо всем оружии, статистике урона, времени перезарядки и текущей мете для соревновательной игры.',
      directAnswer: 'Текущее мета-оружие: Pump Shotgun, Striker AR и Tactical SMG. Сосредоточьтесь на этих трех видах оружия для лучших результатов.',
    },
    {
      language: 'pl',
      title: 'Przewodnik po broni Fortnite – Wszystkie bronie i meta 2026',
      description: 'Kompletny przewodnik po broni dla Fortnite. Naucz się o wszystkich broniach, statystykach obrażeń, czasach przeładowania i aktualnej mecie do gry konkurencyjnej.',
      directAnswer: 'Aktualne bronie meta to Pump Shotgun, Striker AR i Tactical SMG. Skup się na tych trzech broniach dla najlepszych wyników.',
    },
    {
      language: 'tr',
      title: 'Fortnite Silah Rehberi – Tüm silahlar ve meta 2026',
      description: 'Fortnite için kapsamlı silah rehberi. Tüm silahlar, hasar istatistikleri, yeniden yükleme süreleri ve rekabetçi oyun için güncel meta hakkında bilgi edinin.',
      directAnswer: 'Güncel meta silahları Pump Shotgun, Striker AR ve Tactical SMG. En iyi sonuçlar için bu üç silaha odaklanın.',
    },
    {
      language: 'ja',
      title: 'Fortnite 武器ガイド – 全武器とメタ2026',
      description: 'Fortniteの完全な武器ガイド。すべての武器、ダメージ統計、リロード時間、および競技プレイの現在のメタについて学びます。',
      directAnswer: '現在のメタ武器はPump Shotgun、Striker AR、Tactical SMGです。最高の結果のためにこれら3つの武器に集中してください。',
    },
  ],
  'fortnite-aim-verbessern-2026': [
    {
      language: 'en',
      title: 'Fortnite Aim Improvement 2026 – Complete Guide',
      description: 'Master your aim in Fortnite with this comprehensive guide. Learn sensitivity settings, aim training routines, and pro techniques.',
      directAnswer: 'Improve your aim by practicing 30 minutes daily in aim trainers, using 0.6-0.8 sensitivity, and focusing on crosshair placement.',
    },
    {
      language: 'de',
      title: 'Fortnite Aim Verbessern 2026 – Der komplette Guide',
      description: 'Meistere dein Aim in Fortnite mit diesem umfassenden Guide. Lerne Sensitivity-Einstellungen, Aim-Training-Routinen und Pro-Techniken.',
      directAnswer: 'Verbessere dein Aim durch tägliches 30-minütiges Training in Aim-Trainers, 0.6-0.8 Sensitivity und Fokus auf Crosshair-Placement.',
    },
    {
      language: 'es',
      title: 'Mejora de Aim Fortnite 2026 – Guía completa',
      description: 'Domina tu puntería en Fortnite con esta guía completa. Aprende configuraciones de sensibilidad, rutinas de entrenamiento y técnicas profesionales.',
      directAnswer: 'Mejora tu aim entrenando 30 minutos diarios en aim trainers, usando sensibilidad 0.6-0.8 y enfocándote en la colocación de la mira.',
    },
    {
      language: 'fr',
      title: 'Amélioration de Visée Fortnite 2026 – Guide complet',
      description: 'Maîtrisez votre visée dans Fortnite avec ce guide complet. Apprenez les réglages de sensibilité, les routines d\'entraînement et les techniques professionnelles.',
      directAnswer: 'Améliorez votre visée en vous entraînant 30 minutes par jour dans les aim trainers, en utilisant une sensibilité de 0.6-0.8 et en vous concentrant sur le placement du réticule.',
    },
    {
      language: 'pt-br',
      title: 'Melhoria de Aim Fortnite 2026 – Guia completo',
      description: 'Domine sua mira no Fortnite com este guia completo. Aprenda configurações de sensibilidade, rotinas de treinamento e técnicas profissionais.',
      directAnswer: 'Melhore seu aim treinando 30 minutos diariamente em aim trainers, usando sensibilidade 0.6-0.8 e focando no posicionamento da mira.',
    },
    {
      language: 'it',
      title: 'Miglioramento Punteria Fortnite 2026 – Guida completa',
      description: 'Padroneggia la tua mira in Fortnite con questa guida completa. Impara le impostazioni di sensibilità, le routine di allenamento e le tecniche professionali.',
      directAnswer: 'Migliora la tua mira allenandoti 30 minuti al giorno negli aim trainer, usando sensibilità 0.6-0.8 e concentrandoti sul posizionamento del mirino.',
    },
    {
      language: 'ru',
      title: 'Улучшение прицеливания Fortnite 2026 – Полное руководство',
      description: 'Освойте прицеливание в Fortnite с этим полным руководством. Узнайте о настройках чувствительности, тренировочных рутинах и профессиональных методах.',
      directAnswer: 'Улучшите прицел, тренируясь 30 минут ежедневно в aim trainers, используя чувствительность 0.6-0.8 и фокусируясь на размещении прицела.',
    },
    {
      language: 'pl',
      title: 'Poprawa celowania Fortnite 2026 – Kompletny przewodnik',
      description: 'Opanuj celowanie w Fortnite z tym kompletnym przewodnikiem. Naucz się ustawień czułości, rutyn treningowych i technik profesjonalnych.',
      directAnswer: 'Popraw celowanie, trenując 30 minut dziennie w aim trainers, używając czułości 0.6-0.8 i skupiając się na umieszczaniu celownika.',
    },
    {
      language: 'tr',
      title: 'Fortnite Nişan İyileştirme 2026 – Tam rehber',
      description: 'Fortnite\'da nişanınızı bu kapsamlı rehberle ustala. Hassasiyet ayarlarını, nişan eğitim rutinlerini ve profesyonel teknikleri öğrenin.',
      directAnswer: 'Nişanınızı aim trainers\'da günde 30 dakika egzersiz yaparak, 0.6-0.8 hassasiyet kullanarak ve nişangah yerleşimine odaklanarak geliştirin.',
    },
    {
      language: 'ja',
      title: 'Fortnite 照準向上2026 – 完全ガイド',
      description: 'この完全なガイドでFortniteの照準をマスターします。感度設定、照準トレーニングルーチン、プロのテクニックを学びます。',
      directAnswer: 'aim trainersで毎日30分練習し、感度0.6-0.8を使用し、照準の配置に集中することで照準を向上させます。',
    },
  ],
  'fortnite-best-settings-2026': [
    {
      language: 'en',
      title: 'Fortnite Best Settings 2026 – Optimal Settings for FPS & Performance',
      description: 'The best Fortnite settings for 2026. Maximize FPS, reduce input lag, and optimize your gameplay with these pro settings.',
      directAnswer: 'Use Performance Mode, 3D Resolution 100%, Frame Rate Limit to 0, and turn off shadows and reflections for maximum FPS.',
    },
    {
      language: 'de',
      title: 'Fortnite Best Settings 2026 – Optimale Einstellungen für FPS & Performance',
      description: 'Die besten Fortnite-Einstellungen für 2026. Maximiere FPS, reduziere Input-Lag und optimiere dein Gameplay mit diesen Pro-Einstellungen.',
      directAnswer: 'Verwende Performance Mode, 3D Resolution 100%, Frame Rate Limit auf 0 und schalte Schatten und Reflexionen aus für maximale FPS.',
    },
    {
      language: 'es',
      title: 'Fortnite Mejores Configuraciones 2026 – Configuraciones óptimas para FPS y rendimiento',
      description: 'Las mejores configuraciones de Fortnite para 2026. Maximiza FPS, reduce el retraso de entrada y optimiza tu juego con estas configuraciones profesionales.',
      directAnswer: 'Usa Modo Rendimiento, Resolución 3D 100%, Límite de FPS en 0 y desactiva sombras y reflejos para máximo FPS.',
    },
    {
      language: 'fr',
      title: 'Fortnite Meilleurs Paramètres 2026 – Paramètres optimaux pour FPS et performances',
      description: 'Les meilleurs paramètres Fortnite pour 2026. Maximisez les FPS, réduisez le délai d\'entrée et optimisez votre gameplay avec ces paramètres professionnels.',
      directAnswer: 'Utilisez le Mode Performance, Résolution 3D 100%, Limite de FPS à 0 et désactivez les ombres et les réflexions pour un FPS maximum.',
    },
    {
      language: 'pt-br',
      title: 'Fortnite Melhores Configurações 2026 – Configurações ótimas para FPS e desempenho',
      description: 'As melhores configurações do Fortnite para 2026. Maximize FPS, reduza o atraso de entrada e otimize seu jogo com essas configurações profissionais.',
      directAnswer: 'Use Modo de Desempenho, Resolução 3D 100%, Limite de FPS em 0 e desative sombras e reflexos para FPS máximo.',
    },
    {
      language: 'it',
      title: 'Fortnite Impostazioni Migliori 2026 – Impostazioni ottimali per FPS e prestazioni',
      description: 'Le migliori impostazioni Fortnite per il 2026. Massimizza FPS, riduci il ritardo di input e ottimizza il gameplay con queste impostazioni professionali.',
      directAnswer: 'Usa la modalità Prestazioni, Risoluzione 3D 100%, Limite FPS a 0 e disattiva ombre e riflessi per FPS massimo.',
    },
    {
      language: 'ru',
      title: 'Fortnite Лучшие настройки 2026 – Оптимальные настройки для FPS и производительности',
      description: 'Лучшие настройки Fortnite для 2026. Максимизируйте FPS, уменьшите задержку ввода и оптимизируйте игровой процесс с этими профессиональными настройками.',
      directAnswer: 'Используйте режим производительности, 3D разрешение 100%, лимит FPS 0 и отключите тени и отражения для максимального FPS.',
    },
    {
      language: 'pl',
      title: 'Fortnite Najlepsze ustawienia 2026 – Optymalne ustawienia dla FPS i wydajności',
      description: 'Najlepsze ustawienia Fortnite na 2026 rok. Zmaksymalizuj FPS, zmniejsz opóźnienie wejścia i zoptymalizuj rozgrywkę tymi profesjonalnymi ustawieniami.',
      directAnswer: 'Użyj trybu wydajności, rozdzielczości 3D 100%, limitu FPS 0 i wyłącz cienie i odbicia dla maksymalnego FPS.',
    },
    {
      language: 'tr',
      title: 'Fortnite En İyi Ayarlar 2026 – FPS ve performans için optimal ayarlar',
      description: '2026 için en iyi Fortnite ayarları. Bu profesyonel ayarlarla FPS\'i maksimize edin, gecikmeyi azaltın ve oyun deneyiminizi optimize edin.',
      directAnswer: 'Performans Modu, 3D Çözünürlük %100, FPS Sınırı 0 kullanın ve maksimum FPS için gölgeleri ve yansımaları kapatın.',
    },
    {
      language: 'ja',
      title: 'Fortnite 最高設定2026 – FPSとパフォーマンスの最適設定',
      description: '2026年の最高のFortnite設定。これらのプロ設定でFPSを最大化し、入力遅延を減らし、ゲームプレイを最適化します。',
      directAnswer: 'パフォーマンスモード、3D解像度100%、FPS制限0を使用し、最大FPSのために影と反射をオフにします。',
    },
  ],
  'fortnite-ranked-tipps': [
    {
      language: 'en',
      title: 'Fortnite Ranked Guide 2026 – How to Reach Unreal Rank',
      description: 'Complete ranked guide for Fortnite. Learn strategies, tips, and tricks to climb from Bronze to Unreal rank.',
      directAnswer: 'Focus on improving aim, building, and game sense. Play consistently, review your gameplay, and adapt to the meta.',
    },
    {
      language: 'de',
      title: 'Fortnite Ranked Guide 2026 – So erreichst du den Unreal-Rang',
      description: 'Vollständiger Ranked-Guide für Fortnite. Lerne Strategien, Tipps und Tricks um von Bronze auf Unreal aufzusteigen.',
      directAnswer: 'Fokus auf Aim-Verbesserung, Building und Game Sense. Spiele konsistent, analysiere dein Gameplay und passe dich dem Meta an.',
    },
    {
      language: 'es',
      title: 'Guía de Ranked Fortnite 2026 – Cómo alcanzar el rango Unreal',
      description: 'Guía completa de ranked para Fortnite. Aprende estrategias, consejos y trucos para subir de Bronce a Unreal.',
      directAnswer: 'Enfócate en mejorar tu puntería, construcción y sentido del juego. Juega consistentemente, revisa tu juego y adapta al meta.',
    },
    {
      language: 'fr',
      title: 'Guide Classé Fortnite 2026 – Comment atteindre le rang Unreal',
      description: 'Guide complet classé pour Fortnite. Apprenez les stratégies, astuces et techniques pour monter de Bronze à Unreal.',
      directAnswer: 'Concentrez-vous sur l\'amélioration de la visée, de la construction et du sens du jeu. Jouez régulièrement, révisez votre gameplay et adaptez-vous au méta.',
    },
    {
      language: 'pt-br',
      title: 'Guia Ranqueado Fortnite 2026 – Como alcançar o rank Unreal',
      description: 'Guia completo de ranqueado para Fortnite. Aprenda estratégias, dicas e truques para subir de Bronze a Unreal.',
      directAnswer: 'Foque em melhorar sua mira, construção e senso de jogo. Jogue consistentemente, revise seu jogo e adapte ao meta.',
    },
    {
      language: 'it',
      title: 'Guida Classificata Fortnite 2026 – Come raggiungere il rango Unreal',
      description: 'Guida completa classificata per Fortnite. Impara strategie, consigli e trucchi per salire da Bronzo a Unreal.',
      directAnswer: 'Concentrati sul miglioramento della mira, della costruzione e del senso di gioco. Gioca costantemente, rivedi il tuo gameplay e adattati al meta.',
    },
    {
      language: 'ru',
      title: 'Руководство по ранжированию Fortnite 2026 – Как достичь ранга Unreal',
      description: 'Полное руководство по ранжированию для Fortnite. Узнайте стратегии, советы и трюки для подъема с Бронзы до Unreal.',
      directAnswer: 'Сосредоточьтесь на улучшении прицеливания, строительства и игрового чутья. Играйте последовательно, анализируйте свой геймплей и адаптируйтесь к мете.',
    },
    {
      language: 'pl',
      title: 'Przewodnik po rankingach Fortnite 2026 – Jak osiągnąć rangę Unreal',
      description: 'Kompletny przewodnik po rankingach dla Fortnite. Naucz się strategii, wskazówek i trików, aby awansować z Brązu do Unreal.',
      directAnswer: 'Skup się na poprawie celowania, budowania i zrozumienia gry. Graj konsekwentnie, przeglądaj swoją rozgrywkę i dostosuj się do mety.',
    },
    {
      language: 'tr',
      title: 'Fortnite Sıralı Rehber 2026 – Unreal rütbesine nasıl ulaşılır',
      description: 'Fortnite için kapsamlı sıralı rehber. Bronz\'dan Unreal\'a yükselmek için stratejiler, ipuçları ve püf noktaları öğrenin.',
      directAnswer: 'Nişan, inşa ve oyun hissini iyileştirmeye odaklanın. Tutarlı oynayın, oyununuzu inceleyin ve meta\'ya uyum sağlayın.',
    },
    {
      language: 'ja',
      title: 'Fortnite ランク付きガイド2026 – Unrealランクに到達する方法',
      description: 'Fortniteの完全なランク付きガイド。ブロンズからアンリアルまで上昇するための戦略、ヒント、トリックを学びます。',
      directAnswer: '照準、建築、ゲームセンスの向上に集中してください。一貫してプレイし、ゲームプレイを確認し、メタに適応してください。',
    },
  ],
  'hardware-gaming-pc-budget-2026': [
    {
      language: 'en',
      title: 'Gaming PC Budget 2026 – Best PC for Fortnite under 800€',
      description: 'Best budget gaming PC for Fortnite in 2026. Get high FPS without breaking the bank with our recommended builds.',
      directAnswer: 'Build with Ryzen 5 5600, RTX 3060, 16GB RAM, and 500GB SSD for excellent Fortnite performance under 800€.',
    },
    {
      language: 'de',
      title: 'Gaming PC Budget 2026 – Bester PC für Fortnite unter 800€',
      description: 'Bester Budget-Gaming-PC für Fortnite 2026. Erhalte hohe FPS ohne das Budget zu sprengen mit unseren empfohlenen Builds.',
      directAnswer: 'Baue mit Ryzen 5 5600, RTX 3060, 16GB RAM und 500GB SSD für exzellente Fortnite-Performance unter 800€.',
    },
    {
      language: 'es',
      title: 'PC Gaming Presupuesto 2026 – Mejor PC para Fortnite bajo 800€',
      description: 'Mejor PC gaming de presupuesto para Fortnite en 2026. Obtén alto FPS sin gastar mucho con nuestros builds recomendados.',
      directAnswer: 'Construye con Ryzen 5 5600, RTX 3060, 16GB RAM y 500GB SSD para excelente rendimiento de Fortnite bajo 800€.',
    },
    {
      language: 'fr',
      title: 'PC Gaming Budget 2026 – Meilleur PC pour Fortnite sous 800€',
      description: 'Meilleur PC gaming budget pour Fortnite en 2026. Obtenez un FPS élevé sans vous ruiner avec nos builds recommandés.',
      directAnswer: 'Construisez avec Ryzen 5 5600, RTX 3060, 16GB RAM et 500GB SSD pour d\'excellentes performances Fortnite sous 800€.',
    },
    {
      language: 'pt-br',
      title: 'PC Gaming Orçamento 2026 – Melhor PC para Fortnite abaixo de 800€',
      description: 'Melhor PC gaming de orçamento para Fortnite em 2026. Tenha alto FPS sem gastar muito com nossos builds recomendados.',
      directAnswer: 'Construa com Ryzen 5 5600, RTX 3060, 16GB RAM e 500GB SSD para excelente desempenho Fortnite abaixo de 800€.',
    },
    {
      language: 'it',
      title: 'PC Gaming Budget 2026 – Miglior PC per Fortnite sotto 800€',
      description: 'Miglior PC gaming budget per Fortnite nel 2026. Ottieni alto FPS senza spendere troppo con i nostri build consigliati.',
      directAnswer: 'Costruisci con Ryzen 5 5600, RTX 3060, 16GB RAM e 500GB SSD per eccellenti prestazioni Fortnite sotto 800€.',
    },
    {
      language: 'ru',
      title: 'Игровой ПК Бюджет 2026 – Лучший ПК для Fortnite до 800€',
      description: 'Лучший бюджетный игровой ПК для Fortnite в 2026. Получите высокий FPS без больших затрат с нашими рекомендуемыми сборками.',
      directAnswer: 'Соберите с Ryzen 5 5600, RTX 3060, 16GB RAM и 500GB SSD для отличной производительности Fortnite до 800€.',
    },
    {
      language: 'pl',
      title: 'PC Gaming Budżet 2026 – Najlepszy PC do Fortnite poniżej 800€',
      description: 'Najlepszy budżetowy PC gamingowy do Fortnite w 2026. Uzyskaj wysoki FPS bez przepłacania z naszymi zalecanymi konfiguracjami.',
      directAnswer: 'Zbuduj z Ryzen 5 5600, RTX 3060, 16GB RAM i 500GB SSD dla doskonałej wydajności Fortnite poniżej 800€.',
    },
    {
      language: 'tr',
      title: 'Oyun PC Bütçe 2026 – 800€ altında Fortnite için en iyi PC',
      description: '2026 için Fortnite\'a en iyi bütçe oyun PC\'si. Önerilen yapılarımızla yüksek FPS\'i uygun fiyatla alın.',
      directAnswer: 'Ryzen 5 5600, RTX 3060, 16GB RAM ve 500GB SSD ile 800€ altında mükemmel Fortnite performansı için inşa edin.',
    },
    {
      language: 'ja',
      title: 'ゲーミングPC予算2026 – 800€未満のFortnite最適PC',
      description: '2026年のFortnite用最高の予算ゲーミングPC。推奨ビルドで高FPSを予算内で実現します。',
      directAnswer: '800€未満で優れたFortniteパフォーマンスを実現するために、Ryzen 5 5600、RTX 3060、16GB RAM、500GB SSDで構築します。',
    },
  ],
  'hardware-gaming-maus-empfehlung': [
    {
      language: 'en',
      title: 'Best Gaming Mouse for Fortnite 2026 – Top 5 Recommendations',
      description: 'Top 5 gaming mice for Fortnite in 2026. Find the perfect mouse for your playstyle and budget.',
      directAnswer: 'The Logitech G Pro X Superlight 2, Razer Viper V3 Pro, and Finalmouse Starlight Pro are top choices for Fortnite players.',
    },
    {
      language: 'de',
      title: 'Beste Gaming-Maus für Fortnite 2026 – Top 5 Empfehlungen',
      description: 'Top 5 Gaming-Mäuse für Fortnite 2026. Finde die perfekte Maus für deinen Spielstil und dein Budget.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro und Finalmouse Starlight Pro sind Top-Wahlen für Fortnite-Spieler.',
    },
    {
      language: 'es',
      title: 'Mejor Ratón Gaming para Fortnite 2026 – Top 5 Recomendaciones',
      description: 'Los 5 mejores ratones gaming para Fortnite en 2026. Encuentra el ratón perfecto para tu estilo de juego y presupuesto.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro y Finalmouse Starlight Pro son las mejores opciones para jugadores de Fortnite.',
    },
    {
      language: 'fr',
      title: 'Meilleure Souris Gaming pour Fortnite 2026 – Top 5 Recommandations',
      description: 'Top 5 souris gaming pour Fortnite en 2026. Trouvez la souris parfaite pour votre style de jeu et votre budget.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro et Finalmouse Starlight Pro sont les meilleurs choix pour les joueurs Fortnite.',
    },
    {
      language: 'pt-br',
      title: 'Melhor Mouse Gaming para Fortnite 2026 – Top 5 Recomendações',
      description: 'Top 5 mouses gaming para Fortnite em 2026. Encontre o mouse perfeito para seu estilo de jogo e orçamento.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro e Finalmouse Starlight Pro são as melhores opções para jogadores de Fortnite.',
    },
    {
      language: 'it',
      title: 'Miglior Mouse Gaming per Fortnite 2026 – Top 5 Raccomandazioni',
      description: 'Top 5 mouse gaming per Fortnite nel 2026. Trova il mouse perfetto per il tuo stile di gioco e budget.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro e Finalmouse Starlight Pro sono le migliori scelte per i giocatori Fortnite.',
    },
    {
      language: 'ru',
      title: 'Лучшая игровая мышь для Fortnite 2026 – Топ 5 рекомендаций',
      description: 'Топ 5 игровых мышей для Fortnite в 2026. Найдите идеальную мышь для вашего стиля игры и бюджета.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro и Finalmouse Starlight Pro — лучшие варианты для игроков Fortnite.',
    },
    {
      language: 'pl',
      title: 'Najlepsza mysz gamingowa do Fortnite 2026 – Top 5 rekomendacji',
      description: 'Top 5 myszy gamingowych do Fortnite w 2026. Znajdź idealną mysz dla swojego stylu gry i budżetu.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro i Finalmouse Starlight Pro to najlepsze wybory dla graczy Fortnite.',
    },
    {
      language: 'tr',
      title: 'Fortnite için En İyi Oyun Faresi 2026 – Top 5 Öneri',
      description: '2026 için Fortnite\'a en iyi 5 oyun faresi. Oyun tarzınıza ve bütçenize uygun mousu bulun.',
      directAnswer: 'Logitech G Pro X Superlight 2, Razer Viper V3 Pro ve Finalmouse Starlight Pro, Fortnite oyuncuları için en iyi seçeneklerdir.',
    },
    {
      language: 'ja',
      title: 'Fortnite用最高ゲーミングマウス2026 – Top 5おすすめ',
      description: '2026年のFortnite用トップ5ゲーミングマウス。プレイスタイルと予算に最適なマウスを見つけます。',
      directAnswer: 'Logitech G Pro X Superlight 2、Razer Viper V3 Pro、Finalmouse Starlight ProはFortniteプレイヤーにとって最高の選択肢です。',
    },
  ],
  'obs-stream-einstellungen-2026': [
    {
      language: 'en',
      title: 'OBS Stream Settings 2026 for Kick & Twitch – Lag-free & HD',
      description: 'Best OBS settings for streaming Fortnite on Kick and Twitch in 2026. Get crystal clear quality without lag.',
      directAnswer: 'Use 1080p at 60fps, 6000 Kbps bitrate, NVENC encoder, and keyframe interval of 2 for optimal streaming quality.',
    },
    {
      language: 'de',
      title: 'OBS Stream-Einstellungen 2026 für Kick & Twitch – Lag-frei & HD',
      description: 'Beste OBS-Einstellungen für Fortnite-Streaming auf Kick und Twitch 2026. Erhalte kristallklare Qualität ohne Lag.',
      directAnswer: 'Verwende 1080p bei 60fps, 6000 Kbps Bitrate, NVENC Encoder und Keyframe-Intervall von 2 für optimale Streaming-Qualität.',
    },
    {
      language: 'es',
      title: 'Configuraciones OBS Stream 2026 para Kick y Twitch – Sin lag y HD',
      description: 'Mejores configuraciones OBS para transmitir Fortnite en Kick y Twitch en 2026. Obtén calidad cristalina sin lag.',
      directAnswer: 'Usa 1080p a 60fps, 6000 Kbps bitrate, codificador NVENC e intervalo de keyframe de 2 para calidad de transmisión óptima.',
    },
    {
      language: 'fr',
      title: 'Paramètres OBS Stream 2026 pour Kick et Twitch – Sans lag et HD',
      description: 'Meilleurs paramètres OBS pour diffuser Fortnite sur Kick et Twitch en 2026. Obtenez une qualité cristalline sans lag.',
      directAnswer: 'Utilisez 1080p à 60fps, 6000 Kbps bitrate, encodeur NVENC et intervalle d\'image clé de 2 pour une qualité de diffusion optimale.',
    },
    {
      language: 'pt-br',
      title: 'Configurações OBS Stream 2026 para Kick e Twitch – Sem lag e HD',
      description: 'Melhores configurações OBS para transmitir Fortnite no Kick e Twitch em 2026. Tenha qualidade cristalina sem lag.',
      directAnswer: 'Use 1080p a 60fps, 6000 Kbps bitrate, codificador NVENC e intervalo de keyframe de 2 para qualidade de transmissão ideal.',
    },
    {
      language: 'it',
      title: 'Impostazioni OBS Stream 2026 per Kick e Twitch – Senza lag e HD',
      description: 'Migliori impostazioni OBS per lo streaming di Fortnite su Kick e Twitch nel 2026. Ottieni qualità cristallina senza lag.',
      directAnswer: 'Usa 1080p a 60fps, 6000 Kbps bitrate, encoder NVENC e intervallo keyframe di 2 per qualità di streaming ottimale.',
    },
    {
      language: 'ru',
      title: 'Настройки OBS Stream 2026 для Kick и Twitch – Без задержек и HD',
      description: 'Лучшие настройки OBS для стриминга Fortnite на Kick и Twitch в 2026. Получите кристальное качество без задержек.',
      directAnswer: 'Используйте 1080p при 60fps, 6000 Kbps битрейт, кодировщик NVENC и интервал ключевого кадра 2 для оптимального качества стриминга.',
    },
    {
      language: 'pl',
      title: 'Ustawienia OBS Stream 2026 dla Kick i Twitch – Bez lagów i HD',
      description: 'Najlepsze ustawienia OBS do streamowania Fortnite na Kick i Twitch w 2026. Uzyskaj kryształową jakość bez lagów.',
      directAnswer: 'Użyj 1080p przy 60fps, 6000 Kbps bitrate, koder NVENC i interwał kluczowej klatki 2 dla optymalnej jakości streamu.',
    },
    {
      language: 'tr',
      title: 'Kick ve Twitch için OBS Stream Ayarları 2026 – Gecikmesiz ve HD',
      description: '2026\'da Kick ve Twitch\'te Fortnite yayınlamak için en iyi OBS ayarları. Gecikme olmadan kristal net kalite alın.',
      directAnswer: 'Optimal yayın kalitesi için 1080p 60fps, 6000 Kbps bit hızı, NVENC kodlayıcı ve 2 anahtar kare aralığı kullanın.',
    },
    {
      language: 'ja',
      title: 'KickとTwitch用OBSストリーム設定2026 – ラグなしHD',
      description: '2026年のKickとTwitchでFortniteをストリーミングするための最高のOBS設定。ラグなしでクリアな品質を実現します。',
      directAnswer: '最適なストリーミング品質のために、1080p 60fps、6000 Kbpsビットレート、NVENCエンコーダ、キーフレーム間隔2を使用します。',
    },
  ],
  'windows-gaming-optimierung': [
    {
      language: 'en',
      title: 'Windows 11 Gaming Optimization 2026 – 20 Tweaks for More FPS',
      description: 'Optimize Windows 11 for gaming in 2026. 20 tweaks and settings to boost your FPS and reduce input lag.',
      directAnswer: 'Enable Game Mode, disable Game DVR, turn off background apps, and use high performance power plan for maximum FPS.',
    },
    {
      language: 'de',
      title: 'Windows 11 Gaming-Optimierung 2026 – 20 Tweaks für mehr FPS',
      description: 'Optimiere Windows 11 für Gaming 2026. 20 Tweaks und Einstellungen um dein FPS zu erhöhen und Input-Lag zu reduzieren.',
      directAnswer: 'Aktiviere Game Mode, deaktiviere Game DVR, schalte Hintergrund-Apps aus und verwende High Performance Power Plan für maximale FPS.',
    },
    {
      language: 'es',
      title: 'Optimización de Gaming Windows 11 2026 – 20 ajustes para más FPS',
      description: 'Optimiza Windows 11 para gaming en 2026. 20 ajustes y configuraciones para aumentar tu FPS y reducir el retraso de entrada.',
      directAnswer: 'Activa el modo de juego, desactiva Game DVR, apaga aplicaciones en segundo plano y usa el plan de energía de alto rendimiento para máximo FPS.',
    },
    {
      language: 'fr',
      title: 'Optimisation Gaming Windows 11 2026 – 20 réglages pour plus de FPS',
      description: 'Optimisez Windows 11 pour le gaming en 2026. 20 réglages et paramètres pour augmenter vos FPS et réduire le délai d\'entrée.',
      directAnswer: 'Activez le Mode Jeu, désactivez Game DVR, éteignez les applications en arrière-plan et utilisez le plan d\'alimentation haute performance pour un FPS maximum.',
    },
    {
      language: 'pt-br',
      title: 'Otimização de Gaming Windows 11 2026 – 20 ajustes para mais FPS',
      description: 'Otimize o Windows 11 para gaming em 2026. 20 ajustes e configurações para aumentar seu FPS e reduzir o atraso de entrada.',
      directAnswer: 'Ative o Modo de Jogo, desative o Game DVR, desligue aplicativos em segundo plano e use o plano de energia de alto desempenho para máximo FPS.',
    },
    {
      language: 'it',
      title: 'Ottimizzazione Gaming Windows 11 2026 – 20 modifiche per più FPS',
      description: 'Ottimizza Windows 11 per il gaming nel 2026. 20 modifiche e impostazioni per aumentare i FPS e ridurre il ritardo di input.',
      directAnswer: 'Attiva la modalità gioco, disattiva Game DVR, spegni le app in background e usa il piano di alimentazione ad alte prestazioni per FPS massimo.',
    },
    {
      language: 'ru',
      title: 'Оптимизация Windows 11 для игр 2026 – 20 настроек для большего FPS',
      description: 'Оптимизируйте Windows 11 для игр в 2026. 20 настроек и параметров для увеличения FPS и уменьшения задержки ввода.',
      directAnswer: 'Включите игровой режим, отключите Game DVR, выключите фоновые приложения и используйте план питания высокой производительности для максимального FPS.',
    },
    {
      language: 'pl',
      title: 'Optymalizacja Windows 11 do gier 2026 – 20 poprawek dla więcej FPS',
      description: 'Zoptymalizuj Windows 11 do gier w 2026. 20 poprawek i ustawień, aby zwiększyć FPS i zmniejszyć opóźnienie wejścia.',
      directAnswer: 'Włącz tryb gry, wyłącz Game DVR, wyłącz aplikacje w tle i użyj planu zasilania wysokiej wydajności dla maksymalnego FPS.',
    },
    {
      language: 'tr',
      title: 'Windows 11 Oyun Optimizasyonu 2026 – Daha fazla FPS için 20 ayar',
      description: '2026 için Windows 11\'i oyun için optimize edin. FPS\'i artırmak ve gecikmeyi azaltmak için 20 ayar ve ayar.',
      directAnswer: 'Oyun Modunu etkinleştirin, Game DVR\'yi devre dışı bırakın, arka plan uygulamalarını kapatın ve maksimum FPS için yüksek performans güç planını kullanın.',
    },
    {
      language: 'ja',
      title: 'Windows 11ゲーム最適化2026 – FPS向上のための20の調整',
      description: '2026年のゲーム用にWindows 11を最適化します。FPSを向上し、入力遅延を減らすための20の調整と設定。',
      directAnswer: 'ゲームモードを有効にし、Game DVRを無効にし、バックグラウンドアプリをオフにし、最大FPSのために高パフォーマンス電源プランを使用します。',
    },
  ],
};

/**
 * Get guide translation for a specific language
 */
export function getGuideTranslation(slug: string, language: Language): GuideTranslation | undefined {
  const translations = GUIDE_TRANSLATIONS[slug];
  if (!translations) return undefined;
  
  // Try to get the specific language translation
  const translation = translations.find(t => t.language === language);
  if (translation) return translation;
  
  // Fall back to English if no translation available
  return translations.find(t => t.language === 'en');
}

/**
 * Get all available languages for a guide
 */
export function getAvailableLanguagesForGuide(slug: string): Language[] {
  const translations = GUIDE_TRANSLATIONS[slug];
  if (!translations) return ['en'];
  
  return translations.map(t => t.language);
}
