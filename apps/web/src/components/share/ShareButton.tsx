import { useState, useCallback, useRef, useEffect } from 'react';
import {
  downloadBlob,
  copyBlobToClipboard,
  shareViaWebAPI,
  openTwitterIntent,
  type ShareFormat,
} from '../../lib/share-image';

interface ShareButtonProps {
  /** Async generator that produces the PNG blob */
  generateImage: (format: ShareFormat) => Promise<Blob>;
  /** Base filename (without extension) */
  filename: string;
  /** Tweet-text when sharing via Twitter */
  tweetText: string;
  /** URL to include in shares (absolute) */
  shareUrl: string;
  /** Hashtags (no #) */
  hashtags?: string[];
  /** Button-Style variant */
  variant?: 'primary' | 'secondary' | 'compact';
  /** Custom button label (default: "TEILEN") */
  label?: string;
}

type ActionState = 'idle' | 'generating' | 'success' | 'error';

export default function ShareButton({
  generateImage,
  filename,
  tweetText,
  shareUrl,
  hashtags = ['Fortnite', 'FortniteNexus'],
  variant = 'primary',
  label = 'TEILEN',
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ActionState>('idle');
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Click-outside to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const doGenerate = useCallback(
    async (format: ShareFormat): Promise<Blob | null> => {
      setState('generating');
      try {
        const blob = await generateImage(format);
        setState('idle');
        return blob;
      } catch (err) {
        console.error('Share image generation failed:', err);
        setState('error');
        setMessage('Bild-Generierung fehlgeschlagen');
        return null;
      }
    },
    [generateImage],
  );

  const handleDownload = useCallback(
    async (format: ShareFormat) => {
      const blob = await doGenerate(format);
      if (!blob) return;
      downloadBlob(blob, `${filename}-${format}.png`);
      setState('success');
      setMessage('Download gestartet');
      setTimeout(() => setState('idle'), 2000);
    },
    [doGenerate, filename],
  );

  const handleCopy = useCallback(async () => {
    const blob = await doGenerate('og');
    if (!blob) return;
    const ok = await copyBlobToClipboard(blob);
    setState('success');
    setMessage(ok ? 'Bild kopiert!' : 'Clipboard nicht verfügbar — lade Bild runter');
    if (!ok) downloadBlob(blob, `${filename}-og.png`);
    setTimeout(() => setState('idle'), 2500);
  }, [doGenerate, filename]);

  const handleWebShare = useCallback(async () => {
    const blob = await doGenerate('og');
    if (!blob) return;
    const ok = await shareViaWebAPI(blob, `${filename}.png`, tweetText, shareUrl);
    if (!ok) {
      // Fallback auf Download
      downloadBlob(blob, `${filename}-og.png`);
      setState('success');
      setMessage('Downloaded (Native-Share unavailable)');
    } else {
      setState('success');
      setMessage('Geteilt!');
    }
    setTimeout(() => setState('idle'), 2000);
  }, [doGenerate, filename, tweetText, shareUrl]);

  const handleTwitter = useCallback(() => {
    openTwitterIntent(tweetText, shareUrl, hashtags);
    setState('success');
    setMessage('Twitter geöffnet');
    setTimeout(() => setState('idle'), 2000);
  }, [tweetText, shareUrl, hashtags]);

  const handlePreview = useCallback(async () => {
    const blob = await doGenerate('og');
    if (!blob) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(blob));
  }, [doGenerate, previewUrl]);

  const hasWebShare =
    typeof navigator !== 'undefined' && 'share' in navigator && 'canShare' in navigator;

  const buttonClass =
    variant === 'compact'
      ? 'px-3 py-1.5 rounded-lg bg-neon-pink/20 border border-neon-pink/40 text-neon-pink text-xs font-cyber tracking-widest hover:bg-neon-pink/30 transition-colors'
      : variant === 'secondary'
      ? 'px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-cyber tracking-widest transition-colors'
      : 'px-5 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue text-bg-dark text-sm font-cyber tracking-widest font-black hover:scale-105 transition-transform';

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={buttonClass}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={state === 'generating'}
      >
        {state === 'generating'
          ? '⏳ ERZEUGE...'
          : state === 'success'
          ? `✓ ${message.toUpperCase()}`
          : state === 'error'
          ? `✗ ${message.toUpperCase()}`
          : `📤 ${label}`}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-white/15 bg-bg-darker shadow-2xl z-50 overflow-hidden"
        >
          <div className="p-2 space-y-1">
            {hasWebShare && (
              <MenuItem
                icon="📱"
                label="Native teilen"
                sub="WhatsApp, Instagram, TikTok..."
                onClick={handleWebShare}
              />
            )}
            <MenuItem
              icon="𝕏"
              label="Auf X / Twitter teilen"
              sub="Öffnet Twitter-Compose"
              onClick={handleTwitter}
            />
            <MenuItem
              icon="📋"
              label="Bild kopieren"
              sub="Paste in Discord, etc."
              onClick={handleCopy}
            />
            <MenuItem
              icon="⬇️"
              label="PNG herunterladen"
              sub="1200×630 (Twitter/OG)"
              onClick={() => handleDownload('og')}
            />
            <MenuItem
              icon="📸"
              label="Story herunterladen"
              sub="1080×1920 (Instagram/TikTok)"
              onClick={() => handleDownload('story')}
            />
            <MenuItem
              icon="🔲"
              label="Square herunterladen"
              sub="1080×1080 (Instagram-Post)"
              onClick={() => handleDownload('square')}
            />
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-xs font-body text-white/50 border-t border-white/5 mt-2 pt-3"
              onClick={handlePreview}
            >
              👁️ Vorschau anzeigen
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
          }}
        >
          <div
            className="relative max-w-3xl w-full bg-bg-dark rounded-2xl p-4 border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60"
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={previewUrl}
              alt="Share Preview"
              className="w-full rounded-xl"
            />
            <p className="text-center text-xs text-white/50 font-body mt-3">
              Rechts-Klick → "Bild kopieren" oder{' '}
              <button
                onClick={() => handleDownload('og')}
                className="text-neon-pink underline"
              >
                runterladen
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  label,
  sub,
  onClick,
}: {
  icon: string;
  label: string;
  sub: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-3"
    >
      <span className="text-xl shrink-0 w-8 text-center">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-body text-white font-medium">
          {label}
        </span>
        <span className="block text-[11px] font-body text-white/40">{sub}</span>
      </span>
    </button>
  );
}
