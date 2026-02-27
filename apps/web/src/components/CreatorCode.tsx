import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatorCode() {
  const [copied, setCopied] = useState(false);
  const code = 'JOJOJO';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-12 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-lg border border-neon-pink/60 p-6 md:p-8 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,0,85,0.08) 0%, rgba(10,12,21,0.95) 60%, rgba(255,0,85,0.05) 100%)',
            boxShadow: '0 0 30px rgba(255,0,85,0.25), inset 0 0 30px rgba(255,0,85,0.05)',
          }}
        >
          {/* Animated top border line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #ff0055, transparent)' }}
          />

          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-neon-pink text-xs font-cyber tracking-widest mb-3 uppercase"
          >
            Fortnite Item Shop
          </motion.p>

          <h2
            className="font-cyber text-2xl md:text-3xl font-black mb-2 text-neon-pink"
            style={{ textShadow: '0 0 10px #ff0055, 0 0 30px #ff0055, 0 0 60px #ff0055' }}
          >
            ⚡ MEIN CREATOR CODE: JOJOJO ⚡
          </h2>

          <p className="text-white/60 text-sm font-body mb-2">
            Gib meinen Code im Fortnite Item Shop ein und unterstütze mich direkt!{' '}
            <span className="font-cyber font-bold text-white">5–10%</span> gehen{' '}
            <span className="text-neon-pink font-cyber font-bold">direkt an Zyztm</span>!
          </p>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="font-cyber text-2xl md:text-3xl font-bold tracking-widest px-6 py-3 rounded border border-neon-pink/50 text-neon-pink select-all"
              style={{ background: 'rgba(255,0,85,0.1)' }}
            >
              {code}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="font-cyber text-sm tracking-widest px-5 py-3 rounded border cursor-pointer transition-all duration-300"
              style={{
                background: copied ? 'rgba(255,0,85,0.3)' : 'rgba(255,0,85,0.1)',
                borderColor: '#ff0055',
                color: '#ff0055',
                boxShadow: copied ? '0 0 20px rgba(255,0,85,0.5)' : '0 0 10px rgba(255,0,85,0.2)',
              }}
            >
              {copied ? '✓ KOPIERT!' : '📋 KOPIEREN'}
            </motion.button>
          </div>

          <motion.a
            href="https://www.fortnite.com/item-shop?lang=de"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,0,85,0.6)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-block font-cyber text-sm font-black tracking-widest px-8 py-3.5 rounded-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #ff0055, #cc0044)',
              color: '#fff',
              boxShadow: '0 0 24px rgba(255,0,85,0.4), 0 6px 24px rgba(0,0,0,0.5)',
              border: '1px solid #ff0055',
              textDecoration: 'none',
            }}
          >
            🛒 JETZT KAUFEN & ZYZTM SUPPORTEN
          </motion.a>

          {/* Bottom decoration */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #ff0055, transparent)' }}
          />
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-50 font-cyber text-sm tracking-widest px-6 py-3 rounded border border-neon-pink/60"
            style={{
              background: 'rgba(10,12,21,0.97)',
              color: '#ff0055',
              boxShadow: '0 0 20px rgba(255,0,85,0.4)',
            }}
          >
            ⚡ Code kopiert!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
