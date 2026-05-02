/**
 * Build Trainer Pro
 * Canvas 2D-based build practice tool for Fortnite
 * Triggers muscle memory for building patterns
 */

import { useState, useEffect, useRef } from 'react';
import { useToolLimit } from '../../hooks/useToolLimit';

interface BuildPattern {
  name: string;
  description: string;
  pattern: string[];
}

const BUILD_PATTERNS: BuildPattern[] = [
  {
    name: '90s',
    description: 'Classic 90-degree turns',
    pattern: ['wall', 'ramp', 'wall', 'ramp'],
  },
  {
    name: 'Turtle',
    description: 'Protective turtle setup',
    pattern: ['wall', 'wall', 'ramp', 'floor'],
  },
  {
    name: 'Box Fight',
    description: 'Box fighting pattern',
    pattern: ['wall', 'wall', 'wall', 'wall', 'ramp'],
  },
  {
    name: 'Double Ramp',
    description: 'Double ramp rush',
    pattern: ['ramp', 'ramp', 'wall', 'ramp'],
  },
];

type BuildType = 'wall' | 'ramp' | 'floor' | 'cone';

const BUILD_COLORS: Record<BuildType, string> = {
  wall: '#00d4ff',
  ramp: '#ff6b00',
  floor: '#10b981',
  cone: '#8b5cf6',
};

const BUILD_KEYS: Record<BuildType, string> = {
  wall: 'Q',
  ramp: 'R',
  floor: 'F',
  cone: 'V',
};

export default function BuildTrainerPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPattern, setCurrentPattern] = useState<BuildPattern>(BUILD_PATTERNS[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expectedBuild, setExpectedBuild] = useState<BuildType | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const { checkLimit, incrementUsage, hasReachedLimit, isUnlimited } = useToolLimit('build-trainer');

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGame(ctx, canvas);
      requestAnimationFrame(animate);
    };

    animate();
  }, [isPlaying, currentStep, currentPattern, expectedBuild, feedback]);

  useEffect(() => {
    if (isPlaying && currentStep < currentPattern.pattern.length) {
      const nextBuild = currentPattern.pattern[currentStep] as BuildType;
      setExpectedBuild(nextBuild);
      setStartTime(Date.now());
    }
  }, [isPlaying, currentStep, currentPattern]);

  const startGame = async () => {
    const canProceed = await checkLimit();
    if (!canProceed && !isUnlimited) {
      alert('Du hast dein tägliches Limit erreicht. Upgrade auf Pro für unbegrenzten Zugriff.');
      return;
    }

    setIsPlaying(true);
    setCurrentStep(0);
    setScore(0);
    setCombo(0);
    setReactionTimes([]);
    setCurrentPattern(BUILD_PATTERNS[Math.floor(Math.random() * BUILD_PATTERNS.length)]);
    await incrementUsage();
  };

  const handleKeyPress = async (e: KeyboardEvent) => {
    if (!isPlaying || !expectedBuild) return;

    const key = e.key.toUpperCase();
    const buildType = Object.entries(BUILD_KEYS).find(([_, k]) => k === key)?.[0] as BuildType;

    if (!buildType) return;

    if (buildType === expectedBuild) {
      const reactionTime = Date.now() - (startTime || 0);
      setReactionTimes([...reactionTimes, reactionTime]);
      
      const points = 100 + combo * 10;
      setScore(score + points);
      setCombo(combo + 1);
      setFeedback('✓');

      if (currentStep < currentPattern.pattern.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        await incrementUsage();
        setCurrentPattern(BUILD_PATTERNS[Math.floor(Math.random() * BUILD_PATTERNS.length)]);
        setCurrentStep(0);
      }
    } else {
      setCombo(0);
      setFeedback('✗');
    }

    setTimeout(() => setFeedback(null), 500);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, expectedBuild, score, combo, currentStep, currentPattern, startTime, reactionTimes]);

  const drawGame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Draw background
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw expected build indicator
    if (expectedBuild) {
      ctx.fillStyle = BUILD_COLORS[expectedBuild];
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`Press ${BUILD_KEYS[expectedBuild]}`, canvas.width / 2, canvas.height / 2 - 50);
      
      ctx.font = '24px Arial';
      ctx.fillText(`(${expectedBuild.toUpperCase()})`, canvas.width / 2, canvas.height / 2);
    }

    // Draw feedback
    if (feedback) {
      ctx.fillStyle = feedback === '✓' ? '#10b981' : '#ef4444';
      ctx.font = 'bold 72px Arial';
      ctx.fillText(feedback, canvas.width / 2, canvas.height / 2 + 80);
    }

    // Draw progress
    const progress = ((currentStep + 1) / currentPattern.pattern.length) * 100;
    ctx.fillStyle = '#333';
    ctx.fillRect(20, canvas.height - 40, canvas.width - 40, 20);
    ctx.fillStyle = '#ff6b00';
    ctx.fillRect(20, canvas.height - 40, (canvas.width - 40) * (progress / 100), 20);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-cyber text-4xl font-bold mb-4">
            Build Trainer Pro
          </h1>
          <p className="text-zinc-400">
            Trainiere deine Building-Muscle-Memory mit Canvas 2D
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full rounded-xl border border-zinc-800 bg-black"
            />
          </div>

          <div className="space-y-6">
            <div className="glass rounded-xl p-6 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4">Statistiken</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Score:</span>
                  <span className="font-bold text-nexus-orange">{score}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Combo:</span>
                  <span className="font-bold text-nexus-purple">{combo}x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Avg Reaction:</span>
                  <span className="font-bold">
                    {reactionTimes.length > 0
                      ? `${Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)}ms`
                      : '-'}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4">Build Keys</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(BUILD_KEYS).map(([type, key]) => (
                  <div
                    key={type}
                    className="flex items-center gap-2 p-3 rounded-lg bg-zinc-900 border border-zinc-700"
                  >
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: BUILD_COLORS[type as BuildType] }}
                    />
                    <span className="font-bold">{key}</span>
                    <span className="text-zinc-400 text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6 border border-zinc-800">
              <h3 className="text-xl font-bold mb-4">Pattern</h3>
              <p className="text-lg font-semibold text-nexus-orange mb-2">
                {currentPattern.name}
              </p>
              <p className="text-zinc-400 text-sm mb-4">
                {currentPattern.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {currentPattern.pattern.map((build, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${
                      i < currentStep
                        ? 'bg-nexus-green text-black'
                        : i === currentStep
                        ? 'bg-nexus-orange text-black'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {BUILD_KEYS[build as BuildType]}
                  </div>
                ))}
              </div>
            </div>

            {!isPlaying ? (
              <button
                onClick={startGame}
                disabled={hasReachedLimit && !isUnlimited}
                className="w-full py-4 bg-gradient-to-r from-nexus-orange to-nexus-purple text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {hasReachedLimit && !isUnlimited ? 'Limit erreicht' : 'Start Training'}
              </button>
            ) : (
              <button
                onClick={() => setIsPlaying(false)}
                className="w-full py-4 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition"
              >
                Stop Training
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
