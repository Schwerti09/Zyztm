/**
 * CheckoutSuccessPage
 * Shown after successful Stripe checkout
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle, Mail, Download, Loader2, AlertCircle } from 'lucide-react';

interface OrderInfo {
  productName?: string;
  email?: string;
  amountTotal?: number;
  currency?: string;
  status?: string;
}

export default function CheckoutSuccessPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Kauf erfolgreich - Fortnite Nexus';
    
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    if (!sessionId) {
      setError('Keine Session-ID gefunden.');
      setIsLoading(false);
      return;
    }
    
    // Fetch order info
    fetch(`/.netlify/functions/get-checkout-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        setOrderInfo(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching session:', err);
        // Don't show error to user - email will be sent regardless
        setOrderInfo({
          productName: 'Dein Produkt',
          email: 'deine Email',
        });
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">Verarbeite Bestellung...</p>
          </div>
        ) : error ? (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Fehler</h1>
            <p className="text-gray-300 mb-6">{error}</p>
            <Link href="/shop">
              <a className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors">
                Zurück zum Shop
              </a>
            </Link>
          </div>
        ) : (
          <div className="text-center p-8 md:p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-6">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              🎉 Vielen Dank!
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
              Deine Zahlung war erfolgreich. Dein <strong>{orderInfo?.productName || 'Produkt'}</strong> wird jetzt vorbereitet.
            </p>
            
            {/* Steps */}
            <div className="space-y-4 mb-8 text-left">
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">1. Zahlung erfolgreich</h3>
                  <p className="text-sm text-gray-400">Deine Zahlung wurde von Stripe bestätigt.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">2. Email wird versendet</h3>
                  <p className="text-sm text-gray-400">
                    Wir senden dir eine Email mit dem Download-Link an{' '}
                    <strong className="text-white">{orderInfo?.email || 'deine Email-Adresse'}</strong>.
                    <br />
                    <span className="text-xs">Sollte die Email nicht innerhalb von 5 Minuten ankommen, prüfe bitte deinen Spam-Ordner.</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-gray-900/50 rounded-xl">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">3. Download starten</h3>
                  <p className="text-sm text-gray-400">
                    Klicke einfach auf den Download-Link in der Email. Der Link ist 72 Stunden gültig.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Support the Creator */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl mb-6">
              <p className="text-sm text-yellow-200">
                💙 <strong>Support the Creator:</strong> Nutze Code <strong className="text-yellow-300">ZYZTM</strong> im Fortnite Item Shop!
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop">
                <a className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors">
                  Weiter shoppen
                </a>
              </Link>
              <Link href="/dashboard">
                <a className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-colors">
                  Zu meinen Bestellungen
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
