/**
 * ShopPage - Nexus Design Update
 * Main shop landing page with product listing and filters
 * Nexus Neon Colors + Glassmorphism UI
 */

import { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Filter, Sparkles, Shield, Zap, Clock } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import { DIGITAL_PRODUCTS, getActiveProducts } from '../data/digital-products';
import type { DigitalProduct } from '../data/digital-products';
import MetaBadge from '../components/shared/MetaBadge';

type Category = 'all' | DigitalProduct['category'];

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'Alle Produkte',
  settings: 'Settings',
  guide: 'Guides',
  subscription: 'Abos',
  review: 'Reviews',
  template: 'Templates',
};

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  
  // SEO
  useEffect(() => {
    document.title = 'Shop - Fortnite Nexus | Pro Settings, Guides & mehr';
    
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Digitale Produkte für Fortnite Pros: Optimierte Settings, Stream-Setup-Guides, Meta-Reports und VOD-Reviews. Sofort-Download nach Zahlung.';
    }
  }, []);
  
  const products = useMemo(() => {
    let filtered = getActiveProducts();
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (a.badge === 'new' ? -1 : 1));
        break;
      default:
        // Featured: bestseller first, then popular, then by price
        filtered.sort((a, b) => {
          const order = { bestseller: 0, popular: 1, new: 2, limited: 3 };
          const aOrder = a.badge ? order[a.badge] ?? 4 : 4;
          const bOrder = b.badge ? order[b.badge] ?? 4 : 4;
          return aOrder - bOrder;
        });
    }
    
    return filtered;
  }, [selectedCategory, sortBy]);
  
  const categories: Category[] = ['all', 'settings', 'guide', 'subscription', 'review', 'template'];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 pb-20">
      {/* Header */}
      <div className="border-b border-nexus-orange/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-black tracking-tighter text-nexus-green">SHOP</h1>
              <h2 className="text-5xl font-black text-nexus-purple -mt-3">NEXUS</h2>
              <p className="text-zinc-400 mt-2">Pro Settings • Guides • Exklusive Meta-Reports</p>
            </div>
            <MetaBadge season="C7S2" lastUpdated="Live" />
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/10 via-pink-900/5 to-nexus-orange/10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexus-purple/10 border border-nexus-purple/30 text-nexus-purple text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Digital Products by Pros, for Pros
            </div>
            
            <p className="text-lg md:text-xl text-zinc-300 mb-8">
              Pro Settings, Stream-Setup-Guides und exklusive Meta-Reports.
              <br />
              <span className="text-nexus-green font-semibold">Sofort-Download nach Zahlung.</span>
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-nexus-orange" />
                Sofort-Auslieferung
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-nexus-green" />
                Sichere Zahlung via Stripe
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-nexus-purple" />
                72h Download-Garantie
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-nexus-purple text-black shadow-lg shadow-nexus-purple/30'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-nexus-orange"
            >
              <option value="featured">Empfohlen</option>
              <option value="price-asc">Preis: Niedrig → Hoch</option>
              <option value="price-desc">Preis: Hoch → Niedrig</option>
              <option value="newest">Neueste zuerst</option>
            </select>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">Keine Produkte in dieser Kategorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
      
      {/* Trust Section */}
      <section className="glass rounded-3xl p-12 bg-black/50 backdrop-blur-sm border border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Warum Fortnite Nexus Shop?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexus-orange/10 border border-nexus-orange/30 mb-4">
                <Zap className="w-8 h-8 text-nexus-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sofort-Auslieferung</h3>
              <p className="text-zinc-400">
                Nach erfolgreicher Zahlung bekommst du sofort einen Download-Link per Email.
                Kein Warten, kein manueller Versand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexus-green/10 border border-nexus-green/30 mb-4">
                <Shield className="w-8 h-8 text-nexus-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Sichere Zahlung</h3>
              <p className="text-zinc-400">
                Zahlung via Stripe (Kreditkarte, SEPA, Sofort, iDEAL).
                EU-konforme MwSt-Berechnung. Keine Datenspeicherung von Zahlungsinfos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexus-purple/10 border border-nexus-purple/30 mb-4">
                <Clock className="w-8 h-8 text-nexus-purple" />
              </div>
              <h3 className="text-xl font-bold mb-2">72h Download-Garantie</h3>
              <p className="text-zinc-400">
                Dein Download-Link ist 72 Stunden gültig und kann mehrfach verwendet werden.
                Probleme? Email an Support genügt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
