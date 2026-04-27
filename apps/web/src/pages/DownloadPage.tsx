/**
 * DownloadPage
 * Token-based secure download page
 * Accessed via: /download/:orderId/:token
 */

import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Download, AlertCircle, Loader2, CheckCircle, Clock, Shield } from 'lucide-react';

interface DownloadInfo {
  success: boolean;
  downloadUrl?: string;
  expiresAt?: string;
  remainingDownloads?: number;
  productName?: string;
  error?: string;
  errorCode?: string;
}

export default function DownloadPage() {
  const [, params] = useRoute('/download/:orderId/:token');
  const [info, setInfo] = useState<DownloadInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    document.title = 'Download - Fortnite Nexus';
    
    if (!params?.orderId || !params?.token) {
      setInfo({ success: false, error: 'Ungültiger Link' });
      setIsLoading(false);
      return;
    }
    
    // Verify and get download URL
    fetch('/.netlify/functions/process-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: params.orderId,
        token: params.token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setInfo(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Download error:', err);
        setInfo({ success: false, error: 'Verbindungsfehler' });
        setIsLoading(false);
      });
  }, [params?.orderId, params?.token]);
  
  const startDownload = () => {
    if (info?.downloadUrl) {
      window.location.href = info.downloadUrl;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full">
        {isLoading ? (
          <div className="text-center p-8 bg-gray-900/50 border border-gray-800 rounded-2xl">
            <Loader2 className="w-16 h-16 animate-spin text-purple-400 mx-auto mb-4" />
            <p className="text-gray-400">Verifiziere Download-Link...</p>
          </div>
        ) : info?.success ? (
          <div className="text-center p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-2xl">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            
            <h1 className="text-3xl font-black mb-2">
              Dein Download ist bereit!
            </h1>
            
            {info.productName && (
              <p className="text-gray-400 mb-6">{info.productName}</p>
            )}
            
            <button
              onClick={startDownload}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30 inline-flex items-center justify-center gap-2 mb-6"
            >
              <Download className="w-5 h-5" />
              Jetzt herunterladen
            </button>
            
            {/* Info */}
            <div className="space-y-2 text-sm text-gray-400">
              {info.remainingDownloads !== undefined && (
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>Noch {info.remainingDownloads} Download(s) übrig</span>
                </div>
              )}
              {info.expiresAt && (
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Gültig bis: {new Date(info.expiresAt).toLocaleString('de-DE')}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Download nicht möglich</h1>
            <p className="text-gray-300 mb-2">{info?.error || 'Unbekannter Fehler'}</p>
            
            {info?.errorCode === 'EXPIRED' && (
              <p className="text-sm text-gray-400 mb-6">
                Der Download-Link ist abgelaufen. Schreibe uns eine Email an support@fortnitenexus.com 
                mit deiner Bestellnummer für einen neuen Link.
              </p>
            )}
            
            {info?.errorCode === 'LIMIT_REACHED' && (
              <p className="text-sm text-gray-400 mb-6">
                Du hast das Download-Limit erreicht. Schreibe uns eine Email an support@fortnitenexus.com 
                wenn du Probleme hattest.
              </p>
            )}
            
            <Link href="/shop">
              <a className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors">
                Zum Shop
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
