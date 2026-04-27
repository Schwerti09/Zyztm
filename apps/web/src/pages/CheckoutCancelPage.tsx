/**
 * CheckoutCancelPage
 * Shown when user cancels Stripe checkout
 */

import { useEffect } from 'react';
import { Link } from 'wouter';
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  useEffect(() => {
    document.title = 'Kauf abgebrochen - Fortnite Nexus';
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center p-8 md:p-12 bg-gray-900/50 border border-gray-800 rounded-2xl">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/20 border-2 border-orange-500/50 mb-6">
          <XCircle className="w-12 h-12 text-orange-400" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black mb-4">
          Kauf abgebrochen
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Kein Problem! Du wurdest nicht belastet. 
          <br />
          Komm gerne wieder, falls du es dir anders überlegst.
        </p>
        
        {/* Reasons */}
        <div className="text-left mb-8 p-6 bg-gray-900/50 rounded-xl">
          <h3 className="font-bold text-white mb-3">Hattest du Fragen oder Probleme?</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Brauchst du eine andere Zahlungsmethode? Wir akzeptieren SEPA, Kreditkarte, Sofortüberweisung und iDEAL.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Bist du dir unsicher bezüglich des Inhalts? Schau dir gerne nochmal die Produkt-Details an.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">→</span>
              <span>Hast du andere Fragen? Schreib uns auf Discord!</span>
            </li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <a className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors inline-flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Shop
            </a>
          </Link>
          <a 
            href="https://discord.gg/fortnitenexus" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg font-bold transition-colors inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Auf Discord fragen
          </a>
        </div>
      </div>
    </div>
  );
}
