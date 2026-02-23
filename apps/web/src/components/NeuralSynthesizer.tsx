import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function NeuralSynthesizer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const { credits } = useStore();

  const synthesize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Fehler bei der Synthese');
        return;
      }
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
    } catch {
      setError('API nicht verfügbar. Konfiguriere ElevenLabs API Key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="cyber-card rounded-xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎙️</span>
            <div>
              <h2 className="font-cyber text-2xl font-bold text-white">
                NEURAL <span className="text-neon-blue neon-text-blue">SYNTHESIZER</span>
              </h2>
              <p className="text-white/50 text-sm">Lass Zyztm in deiner Stimme sprechen</p>
            </div>
            <div className="ml-auto text-right">
              <div className="text-neon-gold font-cyber font-bold">{credits}</div>
              <div className="text-white/40 text-xs">CREDITS</div>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Gib deinen Text ein... (max. 500 Zeichen)"
            maxLength={500}
            rows={4}
            className="w-full bg-black/50 border border-neon-blue/20 rounded p-3 text-white placeholder-white/30 resize-none focus:outline-none focus:border-neon-blue/60 text-sm mb-4 font-body"
          />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-xs">{text.length}/500</span>
            <button
              onClick={synthesize}
              disabled={loading || !text.trim()}
              className="btn-primary rounded text-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                  SYNTHETISIERE...
                </span>
              ) : '🎙️ GENERIEREN (10 CREDITS)'}
            </button>
          </div>
          
          {error && <p className="text-neon-pink text-sm mb-4">⚠️ {error}</p>}
          
          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border border-neon-blue/20 rounded p-4 bg-neon-blue/5"
            >
              <p className="text-neon-blue text-xs font-cyber mb-2">✓ AUDIO BEREIT</p>
              <audio controls src={audioUrl} className="w-full" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
