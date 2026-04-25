/**
 * NewsArticle Component
 * Displays a single news article with full content
 */
'use client';

import { Link } from 'wouter';
import { NEWS_ARTICLES, type NewsArticle } from '../data/news';

interface NewsArticleProps {
  slug: string;
}

export default function NewsArticle({ slug }: NewsArticleProps) {
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-center px-6">
        <p className="font-cyber text-5xl text-neon-pink mb-4">404</p>
        <p className="font-body text-white/60 mb-8">Dieser Artikel existiert nicht.</p>
        <Link href="/news">
          <a className="font-cyber text-neon-blue hover:text-white transition-colors border border-neon-blue/40 px-6 py-3 rounded-xl">
            Zurück zur News-Übersicht
          </a>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-bg-dark text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-bg-darker">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav className="text-xs font-body text-white/40 flex gap-2 mb-6 flex-wrap">
            <Link href="/"><a className="hover:text-neon-blue transition-colors">Home</a></Link>
            <span>/</span>
            <Link href="/news"><a className="hover:text-neon-blue transition-colors">News</a></Link>
            <span>/</span>
            <span className="text-white/60">{article.title.slice(0, 30)}...</span>
          </nav>

          {/* Category & Meta */}
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="text-xs font-cyber text-neon-blue/80 bg-neon-blue/10 border border-neon-blue/20 px-3 py-1 rounded-full">
              {article.category.replace('_', ' ')}
            </span>
            <span className="text-xs font-body text-white/30">
              📅 {new Date(article.publishedAt).toLocaleDateString('de-DE')}
            </span>
            <span className="text-xs font-body text-white/30">
              👁 {article.views} Views
            </span>
          </div>

          {/* Title */}
          <h1 className="font-cyber text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="font-body text-white/60 text-lg max-w-3xl">
            {article.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-purple-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="font-body text-white font-semibold">{article.author}</p>
              <p className="font-body text-white/40 text-sm">Fortnite Nexus Team</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {article.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-white/10">
            <div className="aspect-video bg-bg-darker flex items-center justify-center">
              <span className="font-body text-white/30">Bild: {article.imageUrl}</span>
            </div>
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="font-body text-white/80 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs font-body text-white/40 bg-bg-card/50 border border-white/10 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-sm font-body text-white/30 mb-4">Diesen Artikel teilen:</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://fortnitenexus.netlify.app/news/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-neon-blue border border-neon-blue/30 px-4 py-2 rounded-lg hover:bg-neon-blue/10 transition-colors"
            >
              Twitter/X
            </a>
            <a
              href={`https://discord.gg/fortnitenexus`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-body text-purple-400 border border-purple-400/30 px-4 py-2 rounded-lg hover:bg-purple-400/10 transition-colors"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Related News */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="font-cyber text-xl font-bold text-white mb-6">Weitere Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NEWS_ARTICLES
              .filter((a) => a.id !== article.id)
              .slice(0, 4)
              .map((related) => (
                <Link key={related.id} href={`/news/${related.slug}`}>
                  <a className="group p-4 rounded-xl border border-white/10 bg-bg-card/50 hover:border-neon-blue/50 hover:bg-bg-card transition-all">
                    <h3 className="font-cyber text-sm text-white group-hover:text-neon-blue transition-colors leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="font-body text-white/40 text-xs">
                      {new Date(related.publishedAt).toLocaleDateString('de-DE')}
                    </p>
                  </a>
                </Link>
              ))}
          </div>
        </div>
      </main>
    </article>
  );
}
