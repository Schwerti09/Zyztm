/**
 * ProductDetailPage - Nexus Design
 * Epic product detail page with neon accents, glassmorphism, and aggressive Fortnite energy
 * Real Stripe checkout integration with Nexus branding
 */

import { useState, useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { 
  Zap, CheckSquare, TrendingUp, Video, Eye, Star, 
  Download, Mail, Clock, Shield, FileText, ArrowLeft,
  CheckCircle2, AlertCircle, Loader2, Flame, Crown, TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { getProductBySlug, formatPrice } from '../data/digital-products';
import type { DigitalProduct } from '../data/digital-products';
import MetaBadge from '../components/shared/MetaBadge';

const ICONS: Record<string, React.ComponentType<any>> = {
  Zap, CheckSquare, TrendingUp, Video, Eye,
};

const BADGE_STYLES: Record<string, string> = {
  new: 'bg-nexus-green/20 text-nexus-green border-nexus-green/50',
  bestseller: 'bg-nexus-orange/20 text-nexus-orange border-nexus-orange/50',
  limited: 'bg-red-500/20 text-red-400 border-red-500/50',
  popular: 'bg-nexus-purple/20 text-nexus-purple border-nexus-purple/50',
};

const BADGE_LABELS: Record<string, string> = {
  new: '✨ NEU',
  bestseller: '🔥 BESTSELLER',
  limited: '⏰ LIMITIERT',
  popular: '⭐ BELIEBT',
};

export default function ProductDetailPage() {
  const [, params] = useRoute('/shop/:slug');
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [waiveWithdrawal, setWaiveWithdrawal] = useState(false);
  
  const product = params?.slug ? getProductBySlug(params.slug) : null;
  
  // SEO
  useEffect(() => {
    if (product) {
      document.title = product.seoTitle || `${product.name} - Fortnite Nexus`;
      
      const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (metaDesc && product.seoDescription) {
        metaDesc.content = product.seoDescription;
      }
      
      // JSON-LD Product Schema
      const schemaId = 'product-schema';
      let scriptEl = document.getElementById(schemaId);
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = schemaId;
        scriptEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptEl);
      }
      
      scriptEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.longDescription,
        image: `https://fortnitenexus.space${product.imageUrl}`,
        offers: {
          '@type': 'Offer',
          url: `https://fortnitenexus.space/shop/${product.slug}`,
          priceCurrency: product.currency.toUpperCase(),
          price: (product.price / 100).toFixed(2),
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Fortnite Nexus',
          },
        },
        ...(product.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
          },
        }),
      });
      
      return () => {
        const el = document.getElementById(schemaId);
        if (el) el.remove();
      };
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Link href="/shop">
            <a className="text-nexus-orange hover:text-nexus-orange/80">← Zurück zum Shop</a>
          </Link>
        </div>
      </div>
    );
  }
  
  const Icon = ICONS[product.icon] || Zap;
  
  const handleCheckout = async () => {
    if (!email) {
      setError('Bitte gib deine Email-Adresse ein.');
      return;
    }
    if (!acceptedTerms) {
      setError('Bitte akzeptiere die AGB.');
      return;
    }
    if (!waiveWithdrawal && !product.isSubscription) {
      setError('Bitte bestätige den Verzicht auf das Widerrufsrecht für die sofortige Auslieferung.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerEmail: email,
          successUrl: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/shop/${product.slug}`,
          referrer: document.referrer,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Checkout fehlgeschlagen');
      }
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Keine Checkout-URL erhalten');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-nexus-orange/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/shop">
            <a className="inline-flex items-center gap-2 text-zinc-400 hover:text-nexus-orange transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Shop
            </a>
          </Link>
          <MetaBadge season="C7S2" lastUpdated="Live" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Product Visual */}
          <div>
            <div className={`relative h-96 lg:h-[500px] rounded-3xl bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} overflow-hidden glass`}>
              {/* Pattern */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-40 h-40 text-white/90 drop-shadow-2xl" strokeWidth={1.2} />
              </div>
              
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 bg-black/40 backdrop-blur-md text-white text-sm font-bold rounded-full border ${BADGE_STYLES[product.badge]}`}>
                    {BADGE_LABELS[product.badge]}
                  </span>
                </div>
              )}
            </div>
            
            {/* File Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {product.fileFormat && (
                <div className="p-4 glass rounded-xl bg-black/50 border border-zinc-800">
                  <div className="text-xs text-zinc-500 mb-1">Format</div>
                  <div className="text-sm font-medium text-white">
                    {product.fileFormat.join(', ')}
                  </div>
                </div>
              )}
              {product.fileSize && (
                <div className="p-4 glass rounded-xl bg-black/50 border border-zinc-800">
                  <div className="text-xs text-zinc-500 mb-1">Größe</div>
                  <div className="text-sm font-medium text-white">{product.fileSize}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Product Info & Checkout */}
          <div>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r from-nexus-green via-nexus-orange to-nexus-purple">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i <= Math.round(product.rating!) ? 'fill-nexus-orange text-nexus-orange' : 'text-zinc-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  {product.rating} {product.reviewCount ? `(${product.reviewCount} Reviews)` : ''}
                </span>
              </div>
            )}
            
            {/* Description */}
            <p className="text-lg text-zinc-300 mb-6">
              {product.longDescription}
            </p>
            
            {/* Price Card */}
            <div className="p-6 glass rounded-3xl bg-black/50 border border-nexus-orange/30 mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black text-nexus-green">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.isSubscription && (
                  <span className="text-zinc-400">/{product.subscriptionInterval === 'month' ? 'Monat' : 'Jahr'}</span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-zinc-300 mb-4">
                <div className="flex items-center gap-2">
                  {product.deliveryMethod === 'instant_download' ? (
                    <><Download className="w-4 h-4 text-nexus-green" /> Sofort-Download nach Zahlung</>
                  ) : product.deliveryMethod === 'subscription_email' ? (
                    <><Mail className="w-4 h-4 text-nexus-purple" /> Wöchentlich per Email</>
                  ) : product.deliveryMethod === 'manual_review' ? (
                    <><Eye className="w-4 h-4 text-nexus-orange" /> 24-48h Turnaround</>
                  ) : (
                    <><Mail className="w-4 h-4 text-nexus-purple" /> Email-Versand</>
                  )}
                </div>
                {!product.isSubscription && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-nexus-purple" />
                      Download-Link 72h gültig
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-nexus-green" />
                      {product.downloadLimit}x Download möglich
                    </div>
                  </>
                )}
              </div>
              
              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.de"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-nexus-orange"
                  disabled={isLoading}
                />
              </div>
              
              {/* Compliance Checkboxes */}
              <div className="space-y-2 mb-4 text-sm">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded bg-zinc-900 border-zinc-700"
                    disabled={isLoading}
                  />
                  <span className="text-zinc-300">
                    Ich akzeptiere die <Link href="/agb"><a className="text-nexus-orange hover:underline">AGB</a></Link> und <Link href="/datenschutz"><a className="text-nexus-orange hover:underline">Datenschutzerklärung</a></Link>.
                  </span>
                </label>
                
                {!product.isSubscription && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={waiveWithdrawal}
                      onChange={(e) => setWaiveWithdrawal(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded bg-zinc-900 border-zinc-700"
                      disabled={isLoading}
                    />
                    <span className="text-zinc-300">
                      Ich verzichte auf mein 14-tägiges Widerrufsrecht für die sofortige Auslieferung dieses digitalen Produkts.
                    </span>
                  </label>
                )}
              </div>
              
              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}
              
              {/* CTA Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-nexus-orange to-orange-600 hover:from-nexus-orange/80 hover:to-orange-600/80 text-white font-black text-lg rounded-2xl transition-all transform hover:scale-105 shadow-lg shadow-nexus-orange/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Lade...
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5" />
                    {product.isSubscription ? 'JETZT ABONNIEREN' : 'JETZT KAUFEN'}
                  </>
                )}
              </button>
              
              <div className="mt-3 text-center text-xs text-zinc-500">
                Sichere Zahlung via Stripe • SEPA, Kreditkarte, Sofortüberweisung
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-nexus-orange">
                <CheckCircle2 className="w-5 h-5" />
                Was du bekommst
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-nexus-green flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Deliverables */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-nexus-purple">
                <FileText className="w-5 h-5" />
                Auslieferung enthält
              </h2>
              <ul className="space-y-2 text-sm">
                {product.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300 px-4 py-2 glass rounded-xl bg-black/50 border border-zinc-800">
                    <span className="text-nexus-purple">📄</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
