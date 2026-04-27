/**
 * ProductCard Component
 * Displays a digital product in card format with hover effects and CTA
 */

import { Link } from 'wouter';
import { Zap, CheckSquare, TrendingUp, Video, Eye, Star, Download, Mail } from 'lucide-react';
import type { DigitalProduct } from '../../data/digital-products';
import { formatPrice } from '../../data/digital-products';

interface ProductCardProps {
  product: DigitalProduct;
  variant?: 'default' | 'compact' | 'featured';
}

const ICONS: Record<string, React.ComponentType<any>> = {
  Zap,
  CheckSquare,
  TrendingUp,
  Video,
  Eye,
};

const BADGE_STYLES: Record<string, string> = {
  new: 'bg-green-500/20 text-green-400 border-green-500/50',
  bestseller: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
  limited: 'bg-red-500/20 text-red-400 border-red-500/50',
  popular: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
};

const BADGE_LABELS: Record<string, string> = {
  new: '✨ NEU',
  bestseller: '🔥 BESTSELLER',
  limited: '⏰ LIMITIERT',
  popular: '⭐ BELIEBT',
};

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const Icon = ICONS[product.icon] || Zap;
  
  if (variant === 'compact') {
    return (
      <Link href={`/shop/${product.slug}`}>
        <a className="group block p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-purple-500/50 transition-all">
          <div className="flex items-center gap-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate group-hover:text-purple-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {product.shortDescription}
              </p>
            </div>
            <div className="text-right">
              <div className="font-bold text-white">{formatPrice(product.price)}</div>
              {product.isSubscription && (
                <div className="text-xs text-gray-500">/Monat</div>
              )}
            </div>
          </div>
        </a>
      </Link>
    );
  }
  
  return (
    <article className="group relative overflow-hidden rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1">
      {/* Gradient Header */}
      <div className={`relative h-48 bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} overflow-hidden`}>
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        
        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-20 h-20 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
        </div>
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-sm ${BADGE_STYLES[product.badge]}`}>
              {BADGE_LABELS[product.badge]}
            </span>
          </div>
        )}
        
        {/* Delivery Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-black/40 text-white backdrop-blur-sm">
            {product.deliveryMethod === 'instant_download' && (
              <>
                <Download className="w-3 h-3" />
                Sofort-Download
              </>
            )}
            {product.deliveryMethod === 'subscription_email' && (
              <>
                <Mail className="w-3 h-3" />
                Wöchentlich per Email
              </>
            )}
            {product.deliveryMethod === 'manual_review' && (
              <>
                <Eye className="w-3 h-3" />
                24-48h Turnaround
              </>
            )}
            {product.deliveryMethod === 'email_link' && (
              <>
                <Mail className="w-3 h-3" />
                Email-Versand
              </>
            )}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Title & Rating */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {product.shortDescription}
          </p>
        </div>
        
        {/* Rating & Sales */}
        {(product.rating || product.totalSales) && (
          <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-white">{product.rating}</span>
                {product.reviewCount !== undefined && product.reviewCount > 0 && (
                  <span>({product.reviewCount})</span>
                )}
              </div>
            )}
            {product.totalSales !== undefined && product.totalSales > 0 && (
              <span>· {product.totalSales} Verkäufe</span>
            )}
          </div>
        )}
        
        {/* Features Preview */}
        <ul className="space-y-1.5 mb-5">
          {product.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-purple-400 mt-0.5">✓</span>
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-xs text-gray-500 italic">
              +{product.features.length - 3} weitere Features
            </li>
          )}
        </ul>
        
        {/* Price & CTA */}
        <div className="flex items-end justify-between gap-3 pt-4 border-t border-gray-800">
          <div>
            <div className="text-2xl font-bold text-white">
              {formatPrice(product.price, product.currency)}
            </div>
            {product.isSubscription && (
              <div className="text-xs text-gray-500">/{product.subscriptionInterval === 'month' ? 'Monat' : 'Jahr'}</div>
            )}
          </div>
          
          <Link href={`/shop/${product.slug}`}>
            <a className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg transition-all transform group-hover:scale-105 shadow-lg shadow-purple-500/30">
              Details →
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
}
