import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  id: string;
  title: string;
  description: string;
  emoji: string;
  targetId?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero',
    title: 'Willkommen bei Zyztm Nexus!',
    description: 'Dein exklusiver Hub für Streams, digitale Produkte & die Community. Lass uns eine kurze Tour machen!',
    emoji: '👋',
  },
  {
    id: 'about',
    title: 'Meine Gaming-Reise',
    description: 'Erfahre alles über Zyztm – vom ersten Stream bis zum Creator Cup Sieg. Eine echte Erfolgsgeschichte.',
    emoji: '🚀',
    targetId: 'about',
  },
  {
    id: 'global-empire',
    title: 'Das Global Empire',
    description: 'Zyztm ist auf allen Plattformen präsent – Kick, YouTube, TikTok. Folge ihm überall!',
    emoji: '🌍',
    targetId: 'global-empire',
  },
  {
    id: 'highlights',
    title: 'Stream Highlights',
    description: 'Die besten Momente aus den Streams – epische Clutches, lustige Fails und mehr.',
    emoji: '🎬',
    targetId: 'highlights',
  },
  {
    id: 'marketplace',
    title: 'Der Marketplace',
    description: 'Exklusive digitale Produkte, Creator Codes und mehr. Unterstütze Zyztm direkt!',
    emoji: '🛒',
    targetId: 'marketplace',
  },
  {
    id: 'soundboard-pro',
    title: 'Soundboard Pro',
    description: 'Interaktives Soundboard mit den kultigsten Zyztm-Sounds. Jetzt ausprobieren!',
    emoji: '🎵',
    targetId: 'soundboard-pro',
  },
  {
    id: 'community-spotlight',
    title: 'Community Spotlight',
    description: 'Die Community macht Zyztm aus. Hier werden die besten Fans und Clips gefeiert!',
    emoji: '🤝',
    targetId: 'community-spotlight',
  },
  {
    id: 'latest-news',
    title: 'Neueste News',
    description: 'Bleib up to date mit den neuesten Infos aus der Zyztm-Welt und dem Fortnite-Universum.',
    emoji: '📰',
    targetId: 'latest-news',
  },
  {
    id: 'calendar',
    title: 'Stream-Kalender',
    description: 'Verpasse keinen Stream mehr! Hier siehst du alle geplanten Streams auf einen Blick.',
    emoji: '📅',
    targetId: 'calendar',
  },
];

export default function RundgangTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const stepRef = useRef(currentStep);
  const activeRef = useRef(isActive);

  useEffect(() => { stepRef.current = currentStep; }, [currentStep]);
  useEffect(() => { activeRef.current = isActive; }, [isActive]);

  const scrollToStep = useCallback((stepIndex: number) => {
    const step = TOUR_STEPS[stepIndex];
    if (step.targetId) {
      const el = document.getElementById(step.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stopTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
  }, []);

  const goNext = useCallback(() => {
    const next = stepRef.current + 1;
    if (next >= TOUR_STEPS.length) {
      stopTour();
      return;
    }
    setCurrentStep(next);
    scrollToStep(next);
  }, [stopTour, scrollToStep]);

  const goPrev = useCallback(() => {
    const prev = stepRef.current - 1;
    if (prev < 0) return;
    setCurrentStep(prev);
    scrollToStep(prev);
  }, [scrollToStep]);

  useEffect(() => {
    if (!isActive) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') stopTour();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isActive, stopTour, goNext, goPrev]);

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;

  return (
    <>
      {/* Start button */}
      <AnimatePresence>
        {!isActive && (
          <motion.button
            key="rundgang-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={startTour}
            className="fixed bottom-8 right-8 z-[9999] px-10 py-6 bg-[#39FF14] text-black font-black text-2xl border-8 border-black hover:scale-110 hover:border-white transition-all duration-300 shadow-2xl flex items-center gap-4 rounded-none group"
            aria-label="Rundgang starten"
          >
            <span>🪂</span>
            <span>RUNDGANG STARTEN</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tour overlay */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              key="tour-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9998] pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
              }}
            />

            {/* Tour panel */}
            <motion.div
              key="tour-panel"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 24, stiffness: 200 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xl mx-auto px-4"
            >
              <div
                className="cyber-card rounded-lg p-6"
                style={{
                  border: '1px solid rgba(0,242,255,0.4)',
                  boxShadow: '0 0 40px rgba(0,242,255,0.15), 0 0 80px rgba(255,0,85,0.1)',
                  background: 'linear-gradient(135deg, rgba(13,17,23,0.97) 0%, rgba(10,12,21,0.99) 100%)',
                }}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cyber text-xs tracking-widest text-neon-blue/70">
                    SCHRITT {currentStep + 1} / {TOUR_STEPS.length}
                  </span>
                  <div className="flex gap-1">
                    {TOUR_STEPS.map((_, i) => (
                      <div
                        key={i}
                        className="h-1 rounded-full transition-all duration-300"
                        style={{
                          width: i === currentStep ? '20px' : '6px',
                          background: i === currentStep
                            ? '#00f2ff'
                            : i < currentStep
                            ? 'rgba(0,242,255,0.4)'
                            : 'rgba(255,255,255,0.1)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-4xl shrink-0">{step.emoji}</span>
                      <div>
                        <h3 className="font-cyber text-lg font-bold text-white mb-1">{step.title}</h3>
                        <p className="text-white/60 text-sm font-body leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <button
                    onClick={goPrev}
                    disabled={currentStep === 0}
                    className="font-cyber text-sm tracking-widest px-4 py-2 border border-white/20 text-white/50 hover:text-white hover:border-neon-blue/50 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                    aria-label="Vorheriger Schritt"
                  >
                    ← ZURÜCK
                  </button>

                  <button
                    onClick={stopTour}
                    className="font-cyber text-xs tracking-widest text-white/30 hover:text-neon-pink/70 transition-colors duration-200"
                    aria-label="Rundgang abbrechen"
                  >
                    RUNDGANG ABBRECHEN
                  </button>

                  <button
                    onClick={goNext}
                    className="font-cyber text-sm tracking-widest px-4 py-2 border transition-all duration-200 rounded"
                    style={{
                      borderColor: isLast ? 'rgba(255,0,85,0.5)' : 'rgba(0,242,255,0.5)',
                      color: isLast ? '#ff0055' : '#00f2ff',
                      background: isLast ? 'rgba(255,0,85,0.1)' : 'rgba(0,242,255,0.1)',
                    }}
                    aria-label={isLast ? 'Tour beenden' : 'Nächster Schritt'}
                  >
                    {isLast ? 'FERTIG ✓' : 'WEITER →'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
