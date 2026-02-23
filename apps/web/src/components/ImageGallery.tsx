import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  { emoji: '🏆', label: 'Victory Royale', bg: 'from-yellow-900/40 to-bg-card' },
  { emoji: '🎮', label: 'Gaming Setup', bg: 'from-blue-900/40 to-bg-card' },
  { emoji: '📺', label: 'Stream Highlights', bg: 'from-red-900/40 to-bg-card' },
  { emoji: '🎯', label: 'Clutch Moments', bg: 'from-pink-900/40 to-bg-card' },
  { emoji: '🤝', label: 'Community', bg: 'from-purple-900/40 to-bg-card' },
  { emoji: '⚡', label: 'Epic Plays', bg: 'from-cyan-900/40 to-bg-card' },
  { emoji: '🦋', label: 'Butterfly Knife', bg: 'from-green-900/40 to-bg-card' },
  { emoji: '🔥', label: 'Fire Moments', bg: 'from-orange-900/40 to-bg-card' },
];

export default function ImageGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<(typeof galleryItems)[0] | null>(null);

  const openLightbox = (item: (typeof galleryItems)[0]) => {
    setCurrentItem(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentItem(null);
  };

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            MEDIA <span className="text-neon-pink neon-text-pink">GALLERY</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => openLightbox(item)}
              className={`aspect-square cyber-card rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br ${item.bg} group overflow-hidden`}
            >
              <span className="text-6xl group-hover:scale-125 transition-transform duration-300">{item.emoji}</span>
              <span className="text-white/50 text-xs font-cyber mt-3 tracking-widest group-hover:text-white transition-colors">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-xl flex flex-col items-center justify-center p-12 md:p-20 max-w-lg w-full mx-4"
              style={{
                background: 'linear-gradient(135deg, rgba(13,17,23,0.97) 0%, rgba(10,12,21,0.99) 100%)',
                border: '1px solid rgba(0,242,255,0.3)',
                boxShadow: '0 0 60px rgba(0,242,255,0.15), 0 0 120px rgba(255,0,85,0.08)',
              }}
            >
              <button
                onClick={closeLightbox}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors font-cyber text-lg cursor-pointer"
              >
                ✕
              </button>
              <span className="text-8xl mb-6">{currentItem.emoji}</span>
              <p className="font-cyber text-2xl font-bold text-white tracking-widest text-center">
                {currentItem.label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
