/**
 * ShopPage - Nexus Design + High-Conversion
 * Epic shop page with neon accents, glassmorphism, and aggressive Fortnite energy
 * Strong hero, trust signals, testimonials, scarcity, FAQ, exit-intent popup
 */

import { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Filter, Sparkles, Shield, Zap, Clock, Crown, Flame, Check, X, Star, TrendingUp } from 'lucide-react';
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

const TESTIMONIALS = [
  {
    name: 'Max K.',
    text: 'Die Settings haben meine FPS von 120 auf 240+ gesteigert. Absolut insane!',
    rating: 5,
    product: 'Pro Settings Pack'
  },
  {
    name: 'Lisa M.',
    text: 'Der Weekly Meta Report ist mein Geheimtipp. Immer einen Schritt voraus.',
    rating: 5,
    product: 'Weekly Meta Report'
  },
  {
    name: 'Jonas R.',
    text: 'VOD Review hat mir geholfen, meine Game Sense massiv zu verbessern.',
    rating: 5,
    product: '1-on-1 VOD Review'
  }
];

const FAQ_ITEMS = [
  {
    question: 'Wie bekomme ich Zugriff nach dem Kauf?',
    answer: 'Nach erfolgreicher Zahlung bekommst du sofort einen Download-Link per Email. Bei Abos erhältst du wöchentliche Reports direkt in dein Postfach.'
  },
  {
    question: 'Ist die Zahlung sicher?',
    answer: 'Ja, wir nutzen Stripe für sichere Zahlungen. Deine Zahlungsdaten werden niemals gespeichert. EU-konforme MwSt-Berechnung inklusive.'
  },
  {
    question: 'Kann ich abonnieren?',
    answer: 'Ja, du kannst dein Abonnement jederzeit kündigen. Der Weekly Meta Report ist monatlich kündbar.'
  },
  {
    question: 'Was ist bei VOD Review der Ablauf?',
    answer: 'Nach dem Kauf lädst du dein Gameplay hoch. Innerhalb 24-48h bekommst du ein personalisiertes Review-Video mit konkreten Tipps.'
  },
  {
    question: 'Gibt es eine Geld-zurück-Garantie?',
    answer: 'Ja, bei digitalen Produkten bieten wir eine 14-tägige Geld-zurück-Garantie, wenn du nicht zufrieden bist.'
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  
  // Exit Intent Detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);
  
  // SEO
  useEffect(() => {
    document.title = 'Shop - Fortnite Nexus | Pro Settings, Guides & mehr';
    
    const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Digitale Produkte für Fortnite Pros: Optimierte Settings, Stream-Setup-Guides, Meta-Reports und VOD-Reviews. Sofort-Download nach Zahlung.';
    }

    // Schema.org FAQ
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
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
              <p className="text-zinc-400 mt-2">Die Tools der Pros • Exklusive Meta-Reports • Sofort-Download</p>
            </div>
            <MetaBadge season="C7S2" lastUpdated="Live" />
          </div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/10 via-nexus-orange/5 to-nexus-green/10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        }} />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexus-orange/10 border border-nexus-orange/30 text-nexus-orange text-sm font-bold mb-6">
              <Flame className="w-4 h-4" />
              DIE TOOLS DER PROS
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-nexus-green via-nexus-orange to-nexus-purple">
              Level Up dein Game
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Pro Settings, Stream-Setup-Guides und exklusive Meta-Reports.
              <br />
              <span className="text-nexus-green font-semibold">Sofort-Download nach Zahlung. 100% sicher.</span>
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-zinc-400 mb-12">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-nexus-orange" />
                <span className="font-semibold text-white">Sofort-Auslieferung</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-nexus-green" />
                <span className="font-semibold text-white">Sichere Zahlung</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-nexus-purple" />
                <span className="font-semibold text-white">72h Download-Garantie</span>
              </div>
            </div>

            {/* CTA Button */}
            <a href="#products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-nexus-orange to-orange-600 hover:from-nexus-orange/80 hover:to-orange-600/80 text-white font-black text-lg rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-nexus-orange/30">
              <TrendingUp className="w-5 h-5" />
              ZUR PRODUKTÜBERSICHT
            </a>
          </div>
        </div>
      </section>
      
      {/* Filter Bar */}
      <section id="products" className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-nexus-orange text-black shadow-lg shadow-nexus-orange/30'
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
      
      {/* Testimonials */}
      <section className="glass rounded-3xl p-12 bg-black/50 backdrop-blur-sm border border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Was unsere Community sagt</h2>
            <p className="text-zinc-400">Über 1.000+ zufriedene Kunden</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-nexus-orange text-nexus-orange" />
                  ))}
                </div>
                <p className="text-zinc-300 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Häufige Fragen</h2>
          <p className="text-zinc-400">Alles was du wissen musst</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="glass rounded-2xl bg-black/50 border border-zinc-800 overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-bold text-white">{item.question}</span>
                {faqOpen === i ? (
                  <X className="w-5 h-5 text-nexus-orange flex-shrink-0" />
                ) : (
                  <Check className="w-5 h-5 text-nexus-green flex-shrink-0" />
                )}
              </button>
              {faqOpen === i && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-zinc-400">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
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
      
      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-8 bg-black/90 border border-nexus-orange/30 max-w-md w-full">
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexus-orange/10 border border-nexus-orange/30 mb-4">
                <Crown className="w-8 h-8 text-nexus-orange" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Warte! Hol dir 10% Rabatt</h3>
              
              <p className="text-zinc-400 mb-6">
                Verpass nicht die Chance, deine Fortnite Skills auf das nächste Level zu bringen.
                Nutze jetzt den Code <span className="text-nexus-orange font-bold">NEXUS10</span> für 10% Rabatt.
              </p>
              
              <a href="#products" onClick={() => setShowExitPopup(false)} className="block w-full px-6 py-3 bg-gradient-to-r from-nexus-orange to-orange-600 hover:from-nexus-orange/80 hover:to-orange-600/80 text-white font-bold rounded-xl transition-all">
                JETZT KAUFEN
              </a>
              
              <button
                onClick={() => setShowExitPopup(false)}
                className="mt-4 text-sm text-zinc-500 hover:text-zinc-300"
              >
                Nein danke, ich will nicht sparen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
