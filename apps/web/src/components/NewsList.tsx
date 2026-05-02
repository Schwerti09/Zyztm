/**
 * NewsList Component
 * Displays a list of news articles with filtering and pagination
 */
'use client';

import { useState } from 'react';
import { Link } from 'wouter';
import { NEWS_ARTICLES, getNewsArticlesByCategory, getFeaturedNews, type NewsArticle } from '../data/news';

interface NewsListProps {
  category?: string;
  limit?: number;
  featured?: boolean;
}

export default function NewsList({ category, limit, featured }: NewsListProps) {
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [showFeatured, setShowFeatured] = useState(featured || false);

  let articles = NEWS_ARTICLES;

  if (showFeatured) {
    articles = getFeaturedNews();
  } else if (selectedCategory !== 'all') {
    articles = getNewsArticlesByCategory(selectedCategory);
  }

  if (limit) {
    articles = articles.slice(0, limit);
  }

  const categories = ['all', 'patch_notes', 'item_shop', 'events', 'competitions', 'tips', 'leaks', 'videos'];

  return (
    <div className="bg-bg-dark">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-body transition-colors ${
              selectedCategory === cat
                ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/40'
                : 'bg-bg-card/50 text-white/60 border border-white/10 hover:border-white/30'
            }`}
          >
            {cat === 'all' ? 'Alle' : cat.replace('_', ' ')}
          </button>
        ))}
        <button
          onClick={() => setShowFeatured(!showFeatured)}
          className={`px-4 py-2 rounded-lg text-sm font-body transition-colors ${
            showFeatured
              ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/40'
              : 'bg-bg-card/50 text-white/60 border border-white/10 hover:border-white/30'
          }`}
        >
          {showFeatured ? '★ Featured' : 'Featured'}
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-16">
          <p className="font-body text-white/40">Keine Artikel in dieser Kategorie.</p>
        </div>
      )}
    </div>
  );
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <Link href={`/news/${article.slug}`}>
      <a className="group flex flex-col h-full bg-bg-card/60 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-blue/50 hover:bg-bg-card transition-all duration-200">
        {article.imageUrl && (
          <div className="relative h-48 bg-bg-darker overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent z-10" />
            <div className="absolute top-4 left-4 z-20">
              <span className="text-xs font-cyber text-white bg-black/60 backdrop-blur px-3 py-1 rounded-full">
                {article.category.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="font-cyber text-lg text-white group-hover:text-neon-blue transition-colors leading-snug mb-3">
            {article.title}
          </h3>
          
          <p className="font-body text-white/50 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-purple-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {article.author.charAt(0)}
              </div>
              <span className="text-xs font-body text-white/40">{article.author}</span>
            </div>
            <span className="text-xs font-body text-white/30">
              {new Date(article.publishedAt).toLocaleDateString('de-DE')}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
