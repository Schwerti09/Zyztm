/**
 * ShopPage
 * Main shop landing page with product listing and filters
 */

import { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Filter, Sparkles, Shield, Zap, Clock } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';
import { DIGITAL_PRODUCTS, getActiveProducts } from '../data/digital-products';
import type { DigitalProduct } from '../data/digital-products';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-orange-900/20" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Digital Products by Pros, for Pros
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              Fortnite Nexus Shop
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Pro Settings, Stream-Setup-Guides und exklusive Meta-Reports.
              <br />
              <span className="text-purple-400 font-semibold">Sofort-Download nach Zahlung.</span>
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Sofort-Auslieferung
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Sichere Zahlung via Stripe
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                72h Download-Garantie
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
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
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
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
      <section className="max-w-7xl mx-auto px-4 py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Keine Produkte in dieser Kategorie.</p>
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
      <section className="bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Warum Fortnite Nexus Shop?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-4">
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sofort-Auslieferung</h3>
              <p className="text-gray-400">
                Nach erfolgreicher Zahlung bekommst du sofort einen Download-Link per Email.
                Kein Warten, kein manueller Versand.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Sichere Zahlung</h3>
              <p className="text-gray-400">
                Zahlung via Stripe (Kreditkarte, SEPA, Sofort, iDEAL).
                EU-konforme MwSt-Berechnung. Keine Datenspeicherung von Zahlungsinfos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
                <Clock className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">72h Download-Garantie</h3>
              <p className="text-gray-400">
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
