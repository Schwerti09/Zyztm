import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  publishedAt: string;
}

const CHANNEL_URL = 'https://www.youtube.com/@Zyztm';
const FALLBACK_THUMBNAIL = '/images/yt-fallback.jpg';
const API_URL = '/.netlify/functions/get-youtube-videos';

export default function YouTubeLatest() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Video | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data: Video[] | { error: string }) => {
        if (!Array.isArray(data)) {
          setError((data as { error: string }).error ?? 'Unbekannter Fehler');
        } else {
          setVideos(data);
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            📺 NEUESTE{' '}
            <span className="text-red-500" style={{ textShadow: '0 0 15px #ff0000' }}>
              YOUTUBE-VIDEOS
            </span>
          </h2>
          <p className="text-white/50">
            Die letzten Videos von{' '}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              @Zyztm
            </a>
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,0,0,0.15)',
                }}
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-4">
                  <div className="h-3 bg-white/10 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-white/5 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error || videos.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            {error && (
              <p className="text-red-400 text-sm font-mono">{error}</p>
            )}
            <motion.a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -3 }}
              className="rounded-lg overflow-hidden no-underline block group max-w-sm w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,0,0,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                <img
                  src={FALLBACK_THUMBNAIL}
                  alt="YouTube Kanal Vorschau"
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="text-5xl">📺</div>
                  <p className="font-cyber text-lg font-bold text-red-500">ZYZTM AUF YOUTUBE</p>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-white/50 text-sm mb-2">Alle Videos & Highlights ansehen</p>
                <div className="text-xs font-cyber tracking-widest py-2 px-6 border border-red-500/50 rounded text-red-500 inline-block">
                  KANAL ÖFFNEN →
                </div>
              </div>
            </motion.a>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setLightbox(v)}
                className="rounded-lg overflow-hidden cursor-pointer group"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,0,0,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,0,0,0.5)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 22px rgba(255,0,0,0.2), 0 4px 30px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,0,0,0.2)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                }}
              >
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                  <img
                    src={v.thumbnail || FALLBACK_THUMBNAIL}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-5xl drop-shadow-lg">▶</span>
                  </div>
                  <span
                    className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-cyber tracking-widest"
                    style={{ background: 'rgba(255,0,0,0.85)', color: '#fff' }}
                  >
                    YT
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-white text-sm font-body font-bold line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                    {v.title}
                  </p>
                  <p className="text-red-500 text-xs font-cyber mt-1 tracking-widest">YOUTUBE ▶</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-cyber tracking-widest py-2 px-6 border border-red-500/50 rounded text-red-500 hover:border-red-500 hover:text-red-400 transition-all inline-block"
            >
              KANAL ÖFFNEN →
            </a>
          </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="yt-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-3xl rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,0,0,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${lightbox.id}?autoplay=1`}
                  title={lightbox.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
              <div
                className="p-4 flex items-center justify-between gap-3"
                style={{ background: 'rgba(3,5,10,0.95)' }}
              >
                <p className="text-white/80 text-sm line-clamp-1 flex-1">{lightbox.title}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={lightbox.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-cyber px-3 py-2 rounded border transition-all"
                    style={{ borderColor: 'rgba(255,0,0,0.4)', color: '#ff4444' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    YOUTUBE ↗
                  </a>
                  <button
                    onClick={() => setLightbox(null)}
                    className="text-white/50 hover:text-white text-lg px-1 transition-colors"
                    aria-label="Schließen"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
