/**
 * ProductDetailPage
 * Detailed product page with checkout button
 */

import { useState, useEffect } from 'react';
import { useRoute, Link, useLocation } from 'wouter';
import { 
  Zap, CheckSquare, TrendingUp, Video, Eye, Star, 
  Download, Mail, Clock, Shield, FileText, ArrowLeft,
  CheckCircle2, AlertCircle, Loader2
} from 'lucide-react';
import { getProductBySlug, formatPrice } from '../data/digital-products';
import type { DigitalProduct } from '../data/digital-products';

const ICONS: Record<string, React.ComponentType<any>> = {
  Zap, CheckSquare, TrendingUp, Video, Eye,
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
        image: `https://fortnitenexus.com${product.imageUrl}`,
        offers: {
          '@type': 'Offer',
          url: `https://fortnitenexus.com/shop/${product.slug}`,
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
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
          <Link href="/shop">
            <a className="text-purple-400 hover:text-purple-300">← Zurück zum Shop</a>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link href="/shop">
          <a className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Zurück zum Shop
          </a>
        </Link>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Product Visual */}
          <div>
            <div className={`relative h-96 lg:h-[500px] rounded-2xl bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} overflow-hidden`}>
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
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/20">
                    {product.badge.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            {/* File Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {product.fileFormat && (
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Format</div>
                  <div className="text-sm font-medium text-white">
                    {product.fileFormat.join(', ')}
                  </div>
                </div>
              )}
              {product.fileSize && (
                <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Größe</div>
                  <div className="text-sm font-medium text-white">{product.fileSize}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right: Product Info & Checkout */}
          <div>
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black mb-3">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i <= Math.round(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-700'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} {product.reviewCount ? `(${product.reviewCount} Reviews)` : ''}
                </span>
              </div>
            )}
            
            {/* Description */}
            <p className="text-lg text-gray-300 mb-6">
              {product.longDescription}
            </p>
            
            {/* Price Card */}
            <div className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl mb-6">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                  {formatPrice(product.price, product.currency)}
                </span>
                {product.isSubscription && (
                  <span className="text-gray-400">/{product.subscriptionInterval === 'month' ? 'Monat' : 'Jahr'}</span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-2">
                  {product.deliveryMethod === 'instant_download' ? (
                    <><Download className="w-4 h-4 text-green-400" /> Sofort-Download nach Zahlung</>
                  ) : product.deliveryMethod === 'subscription_email' ? (
                    <><Mail className="w-4 h-4 text-blue-400" /> Wöchentlich per Email</>
                  ) : product.deliveryMethod === 'manual_review' ? (
                    <><Eye className="w-4 h-4 text-emerald-400" /> 24-48h Turnaround</>
                  ) : (
                    <><Mail className="w-4 h-4 text-blue-400" /> Email-Versand</>
                  )}
                </div>
                {!product.isSubscription && (
                  <>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      Download-Link 72h gültig
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-purple-400" />
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
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
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
                    className="mt-0.5 w-4 h-4 rounded bg-gray-900 border-gray-700"
                    disabled={isLoading}
                  />
                  <span className="text-gray-300">
                    Ich akzeptiere die <Link href="/agb"><a className="text-purple-400 hover:underline">AGB</a></Link> und <Link href="/datenschutz"><a className="text-purple-400 hover:underline">Datenschutzerklärung</a></Link>.
                  </span>
                </label>
                
                {!product.isSubscription && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={waiveWithdrawal}
                      onChange={(e) => setWaiveWithdrawal(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded bg-gray-900 border-gray-700"
                      disabled={isLoading}
                    />
                    <span className="text-gray-300">
                      Ich verzichte auf mein 14-tägiges Widerrufsrecht für die sofortige Auslieferung dieses digitalen Produkts.
                    </span>
                  </label>
                )}
              </div>
              
              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-300">{error}</span>
                </div>
              )}
              
              {/* CTA Button */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Lade...
                  </>
                ) : (
                  <>
                    {product.isSubscription ? '🎯 Jetzt abonnieren' : '⚡ Jetzt kaufen'}
                  </>
                )}
              </button>
              
              <div className="mt-3 text-center text-xs text-gray-500">
                Sichere Zahlung via Stripe • SEPA, Kreditkarte, Sofortüberweisung
              </div>
            </div>
            
            {/* Features */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
                Was du bekommst
              </h2>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Deliverables */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Auslieferung enthält
              </h2>
              <ul className="space-y-2 text-sm">
                {product.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg">
                    <span className="text-purple-400">📄</span>
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
