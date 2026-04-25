/**
 * News Page - Overview of all news articles
 * ENHANCED: Multi-language support
 */
import { lazy, Suspense, useState, useEffect } from 'react';
import NewsList from '../components/NewsList';
import SEOHead from '../components/SEOHead';
import { getLanguageFromPath, type Language } from '../lib/i18n';

const Footer = lazy(() => import('../components/Footer'));

export default function NewsPage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect language from URL on mount
    const lang = getLanguageFromPath(window.location.pathname);
    setCurrentLanguage(lang);
  }, []);

  const pageUrl = `https://fortnitenexus.netlify.app/${currentLanguage}/news`;

  // Language-specific titles and descriptions
  const titles: Record<Language, string> = {
    en: 'Fortnite News – Latest Updates, Patch Notes and Events',
    de: 'Fortnite News – Die neuesten Updates, Patch Notes und Events',
    es: 'Noticias de Fortnite – Últimas actualizaciones, notas de parche y eventos',
    fr: 'Actualités Fortnite – Dernières mises à jour, notes de patch et événements',
    'pt-br': 'Notícias Fortnite – Últimas atualizações, notas de patch e eventos',
    it: 'Notizie Fortnite – Ultimi aggiornamenti, patch note ed eventi',
    ru: 'Новости Fortnite – Последние обновления, патч-ноты и события',
    pl: 'Wiadomości Fortnite – Najnowsze aktualizacje, patch notes i wydarzenia',
    tr: 'Fortnite Haberleri – Son Güncellemeler, Yama Notları ve Etkinlikler',
    ja: 'Fortnite ニュース – 最新のアップデート、パッチノート、イベント',
  };

  const descriptions: Record<Language, string> = {
    en: 'All Fortnite news at a glance: Patch Notes, Item Shop Rotation, Events, Competitions and Tips. Updated daily for the global community.',
    de: 'Alle Fortnite News auf einen Blick: Patch Notes, Item Shop Rotation, Events, Wettbewerbe und Tipps. Täglich aktualisiert für die deutsche Community.',
    es: 'Todas las noticias de Fortnite de un vistazo: Patch Notes, Rotación de la Tienda, Eventos, Competiciones y Consejos. Actualizado diariamente para la comunidad global.',
    fr: 'Toutes les actualités Fortnite en un coup dœil: Patch Notes, Rotation du Shop, Événements, Compétitions et Conseils. Mis à jour quotidiennement pour la communauté mondiale.',
    'pt-br': 'Todas as notícias Fortnite em um só lugar: Patch Notes, Rotação da Loja, Eventos, Competições e Dicas. Atualizado diariamente para a comunidade global.',
    it: 'Tutte le notizie Fortnite a colpo d\'occhio: Patch Notes, Rotazione Shop, Eventi, Competizioni e Consigli. Aggiornato quotidianamente per la community globale.',
    ru: 'Все новости Fortnite в одном месте: Patch Notes, ротация магазина, события, соревнования и советы. Ежедневное обновление для мирового сообщества.',
    pl: 'Wszystkie wiadomości Fortnite w jednym miejscu: Patch Notes, Rotacja Sklepu, Wydarzenia, Zawody i Porady. Aktualizowane codziennie dla społeczności globalnej.',
    tr: 'Tüm Fortnite haberleri bir bakışta: Patch Notes, Dükkan Rotasyonu, Etkinlikler, Yarışmalar ve İpuçları. Küresel topluluk için günlük olarak güncellenir.',
    ja: 'Fortniteのすべてのニュースを一目で：パッチノート、ショップのローテーション、イベント、大会、ヒント。グローバルコミュニティのために毎日更新。',
  };

  const title = titles[currentLanguage] || titles.en;
  const description = descriptions[currentLanguage] || descriptions.en;

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Note: SEOHead only supports guide pages currently. News page SEO to be implemented separately. */}

      {/* Header */}
      <header className="border-b border-white/10 bg-bg-darker">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="font-cyber text-4xl sm:text-5xl font-bold text-white mb-4">
            Fortnite News
          </h1>
          <p className="font-body text-white/60 text-lg max-w-2xl">
            {description}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Featured News */}
        <section className="mb-12">
          <h2 className="font-cyber text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-neon-pink">★</span>
            Featured News
          </h2>
          <NewsList featured={true} limit={3} />
        </section>

        {/* All News */}
        <section>
          <h2 className="font-cyber text-2xl font-bold text-white mb-6">
            All Articles
          </h2>
          <NewsList limit={12} />
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
