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
