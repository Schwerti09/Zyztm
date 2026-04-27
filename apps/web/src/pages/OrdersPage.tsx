/**
 * OrdersPage
 * Customer order history with download links
 * Email-based access (no password required - simplified)
 */

import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Mail, Download, Package, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Order {
  id: string;
  product_id: string;
  amount_total: number;
  currency: string;
  status: string;
  download_url: string | null;
  download_token: string | null;
  download_expires_at: string | null;
  download_count: number;
  download_limit: number;
  created_at: string;
  products?: {
    name: string;
    description: string;
  };
}

export default function OrdersPage() {
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  useEffect(() => {
    document.title = 'Meine Bestellungen - Fortnite Nexus';
    
    // Auto-fill from URL param
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    if (emailParam) {
      setEmail(emailParam);
      handleSearch(emailParam);
    }
  }, []);
  
  const handleSearch = async (searchEmail?: string) => {
    const queryEmail = (searchEmail || email).trim().toLowerCase();
    
    if (!queryEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(queryEmail)) {
      setError('Bitte gib eine gültige Email-Adresse ein.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch('/.netlify/functions/get-customer-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: queryEmail }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Fehler beim Laden');
      }
      
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(cents / 100);
  };
  
  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Meine Bestellungen
        </h1>
        <p className="text-gray-400 mb-8">
          Gib deine Email-Adresse ein, um deine Bestellungen einzusehen.
        </p>
        
        {/* Search Form */}
        <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="deine@email.de"
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Bestellungen anzeigen'
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          )}
        </div>
        
        {/* Orders List */}
        {hasSearched && !isLoading && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-gray-900/30 border border-gray-800 rounded-xl">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Keine Bestellungen gefunden</h2>
                <p className="text-gray-400 mb-6">
                  Wir haben keine Bestellungen für diese Email-Adresse.
                </p>
                <Link href="/shop">
                  <a className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors">
                    Zum Shop
                  </a>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  {orders.length} Bestellung{orders.length !== 1 ? 'en' : ''} gefunden
                </h2>
                
                {orders.map(order => (
                  <article key={order.id} className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-white">
                              {order.products?.name || 'Produkt'}
                            </h3>
                            <p className="text-xs text-gray-500 font-mono">
                              #{order.id.substring(0, 8).toUpperCase()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-gray-500 text-xs mb-1">Datum</div>
                            <div className="text-white">{formatDate(order.created_at)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs mb-1">Preis</div>
                            <div className="text-white font-bold">{formatPrice(order.amount_total, order.currency)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs mb-1">Status</div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 capitalize">{order.status}</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 text-xs mb-1">Downloads</div>
                            <div className="text-white">
                              {order.download_count} / {order.download_limit}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Download Button */}
                      <div className="flex-shrink-0">
                        {order.download_url && order.download_token && !isExpired(order.download_expires_at) && order.download_count < order.download_limit ? (
                          <a
                            href={`/download/${order.id}/${order.download_token}`}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        ) : (
                          <div className="px-5 py-3 bg-gray-800 rounded-lg text-sm text-gray-400 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {isExpired(order.download_expires_at) ? 'Abgelaufen' : 'Limit erreicht'}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
