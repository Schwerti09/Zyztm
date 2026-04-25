/**
 * News Article Page - Single news article view
 */
import { useParams } from 'wouter';
import { lazy, Suspense } from 'react';
import NewsArticle from '../components/NewsArticle';
import { getNewsArticleBySlug } from '../data/news';
import SEOHead from '../components/SEOHead';

const Footer = lazy(() => import('../components/Footer'));

export default function NewsArticlePage() {
  const params = useParams<{ slug: string }>();
  const article = getNewsArticleBySlug(params.slug ?? '');

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center px-6">
        <p className="font-cyber text-5xl text-neon-pink mb-4">404</p>
        <p className="font-body text-white/60 mb-8">Dieser Artikel existiert nicht.</p>
        <a href="/news" className="font-cyber text-neon-blue hover:text-white transition-colors border border-neon-blue/40 px-6 py-3 rounded-xl">
          Zurück zur News-Übersicht
        </a>
      </div>
    );
  }

  const pageUrl = `https://fortnitenexus.netlify.app/news/${article.slug}`;

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      <SEOHead
        title={article.title}
        description={article.excerpt}
        url={pageUrl}
        image={article.imageUrl}
      />

      <NewsArticle slug={params.slug ?? ''} />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
