import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const DEMO_LIMIT = 3;
const DEMO_KEY = 'synth_demo';

interface DemoData {
  date: string;
  count: number;
}

function getDemoData(): DemoData {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (raw) return JSON.parse(raw) as DemoData;
  } catch { /* ignore */ }
  return { date: '', count: 0 };
}

function saveDemoData(data: DemoData) {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function getDemoUsed(): number {
  const data = getDemoData();
  if (data.date !== todayStr()) return 0;
  return data.count;
}

function incrementDemo(): number {
  const today = todayStr();
  const data = getDemoData();
  const current = data.date === today ? data.count : 0;
  const next = current + 1;
  saveDemoData({ date: today, count: next });
  return next;
}

export default function NeuralSynthesizer() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [demoMode, setDemoMode] = useState(false);
  const [demoUsed, setDemoUsed] = useState(getDemoUsed);
  const { credits } = useStore();

  const demoRemaining = Math.max(0, DEMO_LIMIT - demoUsed);

  const synthesize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setDemoMode(false);

    const useBrowserTTS = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
        setDemoMode(true);
        setError('ElevenLabs API nicht konfiguriert – Browser-Demo aktiv');
        return true;
      }
      return false;
    };

    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const data = await res.json();
        if (res.status === 503 && useBrowserTTS()) {
          const used = incrementDemo();
          setDemoUsed(used);
          return;
        }
        setError(data.error || 'Fehler bei der Synthese');
        return;
      }
      const blob = await res.blob();
      setAudioUrl(URL.createObjectURL(blob));
      const used = incrementDemo();
      setDemoUsed(used);
    } catch {
      if (useBrowserTTS()) {
        const used = incrementDemo();
        setDemoUsed(used);
      } else {
        setError('API nicht verfügbar. Konfiguriere ElevenLabs API Key.');
      }
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
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              className="text-4xl"
              animate={{ rotate: loading ? 360 : 0 }}
              transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: 'linear' }}
            >
              🎙️
            </motion.span>
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

          {/* Demo badge */}
          <div className="mb-5 flex items-center gap-3 px-4 py-2.5 rounded-lg border border-neon-blue/20 bg-neon-blue/5">
            <span className="text-neon-blue text-lg">🆓</span>
            <div className="flex-1">
              <p className="text-neon-blue text-xs font-cyber font-bold">KOSTENLOSE DEMO</p>
              <p className="text-white/50 text-xs">
                {demoRemaining > 0
                  ? `Noch ${demoRemaining} von ${DEMO_LIMIT} kostenlosen Synthesen heute`
                  : 'Demo-Limit erreicht – kaufe Voice Credits für unbegrenzte Nutzung!'}
              </p>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: DEMO_LIMIT }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border border-neon-blue/40"
                  style={{ background: i < demoUsed ? 'rgba(0,242,255,0.3)' : 'rgba(0,242,255,0.1)' }}
                />
              ))}
            </div>
          </div>

          {/* VU meter decoration */}
          <div className="flex items-end gap-1 h-8 mb-4 px-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{ background: i < 12 ? '#00f2ff' : i < 16 ? '#ffd700' : '#ff0055' }}
                animate={loading
                  ? { height: `${Math.random() * 100}%` }
                  : { height: `${10 + Math.sin(i * 0.8) * 40 + 40}%` }}
                transition={{ duration: 0.1 + i * 0.02, repeat: Infinity, repeatType: 'mirror' }}
              />
            ))}
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
            <div className="flex gap-2">
              <button
                onClick={synthesize}
                disabled={loading || !text.trim() || demoRemaining === 0}
                className="btn-primary rounded text-xs disabled:opacity-40 disabled:cursor-not-allowed"
                title={demoRemaining === 0 ? 'Demo-Limit erreicht – kaufe Credits!' : undefined}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>⚙️</motion.span>
                    SYNTHETISIERE...
                  </span>
                ) : demoRemaining > 0 ? '🎙️ DEMO GENERIEREN' : '🔒 LIMIT ERREICHT'}
              </button>
            </div>
          </div>
          
          {error && (
            <p className={`text-sm mb-4 ${demoMode ? 'text-neon-blue' : 'text-neon-pink'}`}>
              {demoMode ? '🎙️ ' : '⚠️ '}{error}
            </p>
          )}
          
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

          {demoRemaining === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-lg border border-neon-gold/30 bg-neon-gold/5 text-center"
            >
              <p className="text-neon-gold font-cyber text-sm mb-2">🏆 UNLOCK VOLLVERSION</p>
              <p className="text-white/60 text-xs mb-3">50 Credits · Keine Limits · Keine Wasserzeichen</p>
              <a
                href="#marketplace"
                className="inline-block px-4 py-2 rounded font-cyber text-xs tracking-widest"
                style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid rgba(255,215,0,0.4)', color: '#ffd700' }}
              >
                VOICE PACK KAUFEN →
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
