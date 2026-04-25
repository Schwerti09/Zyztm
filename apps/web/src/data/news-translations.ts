/**
 * News Translations for 10 Languages
 * Translates news titles, excerpts, and content
 */

import { type Language } from '../lib/i18n';

export interface NewsTranslation {
  language: Language;
  title: string;
  excerpt: string;
  content: string;
}

// News article slugs mapped to translations
export const NEWS_TRANSLATIONS: Record<string, NewsTranslation[]> = {
  'fortnite-patch-notes-v26-10': [
    {
      language: 'en',
      title: 'Fortnite v26.10 Patch Notes – New Weapons and Map Changes',
      excerpt: 'The latest Fortnite update brings new weapons, map changes, and balance adjustments. Here\'s everything you need to know.',
      content: 'Fortnite v26.10 introduces several exciting changes including new weapons, map updates, and balance adjustments. The update focuses on improving competitive play while adding fresh content for casual players.',
    },
    {
      language: 'de',
      title: 'Fortnite v26.10 Patch Notes – Neue Waffen und Map-Änderungen',
      excerpt: 'Das neueste Fortnite-Update bringt neue Waffen, Map-Änderungen und Balance-Anpassungen. Hier ist alles, was du wissen musst.',
      content: 'Fortnite v26.10 führt mehrere aufregende Änderungen ein, darunter neue Waffen, Map-Updates und Balance-Anpassungen. Das Update konzentriert sich auf die Verbesserung des Competitive Play und fügt frischen Content für Casual-Player hinzu.',
    },
    {
      language: 'es',
      title: 'Notas del parche Fortnite v26.10 – Nuevas armas y cambios en el mapa',
      excerpt: 'La última actualización de Fortnite trae nuevas armas, cambios en el mapa y ajustes de equilibrio. Aquí está todo lo que necesitas saber.',
      content: 'Fortnite v26.10 introduce varios cambios emocionantes, incluyendo nuevas armas, actualizaciones del mapa y ajustes de equilibrio. La actualización se centra en mejorar el juego competitivo mientras agrega contenido fresco para jugadores casuales.',
    },
    {
      language: 'fr',
      title: 'Notes de patch Fortnite v26.10 – Nouvelles armes et changements de carte',
      excerpt: 'La dernière mise à jour Fortnite apporte de nouvelles armes, des changements de carte et des ajustements d\'équilibre. Voici tout ce que vous devez savoir.',
      content: 'Fortnite v26.10 introduit plusieurs changements passionnants, y compris de nouvelles armes, des mises à jour de carte et des ajustements d\'équilibre. La mise à jour se concentre sur l\'amélioration du jeu compétitif tout en ajoutant du contenu frais pour les joueurs occasionnels.',
    },
    {
      language: 'pt-br',
      title: 'Notas do patch Fortnite v26.10 – Novas armas e mudanças no mapa',
      excerpt: 'A última atualização do Fortnite traz novas armas, mudanças no mapa e ajustes de equilíbrio. Aqui está tudo o que você precisa saber.',
      content: 'Fortnite v26.10 introduz várias mudanças emocionantes, incluindo novas armas, atualizações do mapa e ajustes de equilíbrio. A atualização se concentra em melhorar o jogo competitivo enquanto adiciona conteúdo fresco para jogadores casuais.',
    },
    {
      language: 'it',
      title: 'Note sulla patch Fortnite v26.10 – Nuove armi e modifiche alla mappa',
      excerpt: 'L\'ultimo aggiornamento Fortnite porta nuove armi, modifiche alla mappa e aggiustamenti di bilanciamento. Ecco tutto ciò che devi sapere.',
      content: 'Fortnite v26.10 introduce diverse modifiche entusiasmanti, incluse nuove armi, aggiornamenti della mappa e aggiustamenti di bilanciamento. L\'aggiornamento si concentra sul miglioramento del gioco competitivo aggiungendo contenuti freschi per i giocatori occasionali.',
    },
    {
      language: 'ru',
      title: 'Заметки о патче Fortnite v26.10 – Новое оружие и изменения карты',
      excerpt: 'Последнее обновление Fortnite приносит новое оружие, изменения карты и настройки баланса. Вот все, что вам нужно знать.',
      content: 'Fortnite v26.10 вводит несколько захватывающих изменений, включая новое оружие, обновления карты и настройки баланса. Обновление сосредоточено на улучшении соревновательной игры, добавляя свежий контент для обычных игроков.',
    },
    {
      language: 'pl',
      title: 'Notki patcha Fortnite v26.10 – Nowe bronie i zmiany na mapie',
      excerpt: 'Najnowsza aktualizacja Fortnite przynosi nowe bronie, zmiany na mapie i dostosowania równowagi. Oto wszystko, co musisz wiedzieć.',
      content: 'Fortnite v26.10 wprowadza kilka ekscytujących zmian, w tym nowe bronie, aktualizacje mapy i dostosowania równowagi. Aktualizacja koncentruje się na poprawie rozgrywki konkurencyjnej, dodając świeżą zawartość dla graczy casual.',
    },
    {
      language: 'tr',
      title: 'Fortnite v26.10 Yama Notları – Yeni silahlar ve harita değişiklikleri',
      excerpt: 'En son Fortnite güncellemesi yeni silahlar, harita değişiklikleri ve denge ayarları getiriyor. İşte bilmeniz gereken her şey.',
      content: 'Fortnite v26.10, yeni silahlar, harita güncellemeleri ve denge ayarları da dahil olmak üzere birkaç heyecan verici değişiklik sunuyor. Güncelleme, rekabetçi oyunu iyileştirmeye odaklanırken, casual oyuncular için taze içerik ekliyor.',
    },
    {
      language: 'ja',
      title: 'Fortnite v26.10パッチノート – 新武器とマップの変更',
      excerpt: '最新のFortniteアップデートは新しい武器、マップの変更、バランス調整をもたらします。知っておくべきすべてはこちらです。',
      content: 'Fortnite v26.10は、新しい武器、マップの更新、バランス調整を含むいくつかのエキサイティングな変更を導入します。アップデートは、カジュアルプレイヤー向けの新鮮なコンテンツを追加しながら、競技プレイの改善に焦点を当てています。',
    },
  ],
  'item-shop-rotation-april-2026': [
    {
      language: 'en',
      title: 'Item Shop Rotation – April 2026 Highlights',
      excerpt: 'Check out the best items in the Fortnite Item Shop for April 2026. Skins, emotes, and bundles you don\'t want to miss.',
      content: 'The April 2026 Item Shop rotation features some incredible skins and items. From rare collaborations to fan-favorite returns, there\'s something for everyone this month.',
    },
    {
      language: 'de',
      title: 'Item Shop Rotation – April 2026 Highlights',
      excerpt: 'Sieh dir die besten Items im Fortnite Item Shop für April 2026 an. Skins, Emotes und Bundles, die du nicht verpassen solltest.',
      content: 'Die Item Shop Rotation im April 2026 bietet einige unglaubliche Skins und Items. Von seltenen Kollaborationen bis zu Rückkehrer der Fans – für jeden ist dies Monat etwas dabei.',
    },
    {
      language: 'es',
      title: 'Rotación de la Tienda de Objetos – Destacados de abril de 2026',
      excerpt: 'Echa un vistazo a los mejores artículos de la Tienda de Objetos de Fortnite para abril de 2026. Skins, emotes y paquetes que no querrás perderte.',
      content: 'La rotación de la Tienda de Objetos de abril de 2026 presenta algunos skins y artículos increíbles. Desde colaboraciones raras hasta regresos favoritos de los fans, hay algo para todos este mes.',
    },
    {
      language: 'fr',
      title: 'Rotation de la Boutique d\'Objets – Avril 2026 en vedette',
      excerpt: 'Découvrez les meilleurs articles de la Boutique d\'Objets Fortnite pour avril 2026. Skins, emotes et bundles à ne pas manquer.',
      content: 'La rotation de la Boutique d\'Objets d\'avril 2026 présente des skins et articles incroyables. Des collaborations rares aux retours favoris des fans, il y a quelque chose pour tout le monde ce mois-ci.',
    },
    {
      language: 'pt-br',
      title: 'Rotação da Loja de Itens – Destaques de abril de 2026',
      excerpt: 'Confira os melhores itens da Loja de Itens Fortnite para abril de 2026. Skins, emotes e pacotes que você não vai querer perder.',
      content: 'A rotação da Loja de Itens de abril de 2026 apresenta alguns skins e itens incríveis. De colaborações raras a retornos favoritos dos fãs, há algo para todos este mês.',
    },
    {
      language: 'it',
      title: 'Rotazione del Negozio Oggetti – Aprile 2026 in evidenza',
      excerpt: 'Dai un\'occhiata ai migliori articoli del Negozio Oggetti Fortnite per aprile 2026. Skin, emote e bundle che non vuoi perderti.',
      content: 'La rotazione del Negozio Oggetti di aprile 2026 presenta alcune skin e articoli incredibili. Da collaborazioni rare a ritorni preferiti dei fan, c\'è qualcosa per tutti questo mese.',
    },
    {
      language: 'ru',
      title: 'Ротация магазина предметов – Апрель 2026 Основное',
      excerpt: 'Ознакомьтесь с лучшими предметами в магазине предметов Fortnite за апрель 2026. Скины, эмоции и наборы, которые вы не хотите пропустить.',
      content: 'Ротация магазина предметов за апрель 2026 представляет невероятные скины и предметы. От редких коллабораций до возвращений, любимых фанатами, для всех найдется что-то в этом месяце.',
    },
    {
      language: 'pl',
      title: 'Rotacja Sklepu Przedmiotów – Wyróżnienia kwietnia 2026',
      excerpt: 'Sprawdź najlepsze przedmioty w Sklepie Przedmiotów Fortnite na kwiecień 2026. Skiny, emotes i pakiety, których nie chcesz przegapić.',
      content: 'Rotacja Sklepu Przedmiotów z kwietnia 2026 prezentuje niesamowite skiny i przedmioty. Od rzadkich współprac do powrotów ulubieńców fanów, dla każdego jest coś w tym miesiącu.',
    },
    {
      language: 'tr',
      title: 'Öğe Mağazası Döngüsü – Nisan 2026 Öne Çıkanlar',
      excerpt: 'Nisan 2026 için Fortnite Öğe Mağazasındaki en iyi öğeleri kontrol edin. Kaçırmak istemeyeceğiniz skinler, emotes ve paketler.',
      content: 'Nisan 2026 Öğe Mağazası döngüsü bazı incredible skinler ve öğeler sunuyor. Nadir işbirliklerinden hayran favori dönüşlerine kadar, bu ay herkes için bir şeyler var.',
    },
    {
      language: 'ja',
      title: 'アイテムショップローテーション – 2026年4月のハイライト',
      excerpt: '2026年4月のFortniteアイテムショップのベストアイテムをチェックしてください。見逃したくないスキン、エモート、バンドル。',
      content: '2026年4月のアイテムショップローテーションは、いくつかの信じられないスキンとアイテムを特徴としています。レアなコラボレーションからファンお気に入りの復帰まで、今月は誰にでも何かがあります。',
    },
  ],
};

/**
 * Get news translation for a specific language
 */
export function getNewsTranslation(slug: string, language: Language): NewsTranslation | undefined {
  const translations = NEWS_TRANSLATIONS[slug];
  if (!translations) return undefined;
  
  // Try to get the specific language translation
  const translation = translations.find(t => t.language === language);
  if (translation) return translation;
  
  // Fall back to English if no translation available
  return translations.find(t => t.language === 'en');
}

/**
 * Get all available languages for a news article
 */
export function getAvailableLanguagesForNews(slug: string): Language[] {
  const translations = NEWS_TRANSLATIONS[slug];
  if (!translations) return ['en'];
  
  return translations.map(t => t.language);
}
