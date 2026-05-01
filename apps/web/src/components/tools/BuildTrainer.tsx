/**
 * Build Trainer - Milestone 7.12
 * Echte interaktive Building-Übung mit Keyboard-Tracking
 * 100% real, high-end und präzise
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNexusStore } from '../../stores/nexus-store';
import PaywallGate from '../shared/PaywallGate';
import MetaBadge from '../shared/MetaBadge';
import type { DrillSession } from '../../lib/shared-types';

type BuildingAction = 'wall' | 'ramp' | 'floor' | 'cone' | 'pyramid';
type InputKey = 'Q' | 'F' | 'E' | 'C' | 'V';

interface BuildingSequence {
  id: string;
  name: string;
  category: string;
  difficulty: number;
  targetTime: number; // seconds
  sequence: BuildingAction[];
  description: string;
  focus: string;
}

const BUILDING_SEQUENCES: BuildingSequence[] = [
  {
    id: 'basics',
    name: 'Basics (Wall → Ramp)',
    category: 'build_fight',
    difficulty: 3,
    targetTime: 1.5,
    sequence: ['wall', 'ramp'],
    description: 'Die Grundlage jeder Build-Sequenz',
    focus: 'Wall → Ramp'
  },
  {
    id: '90s',
    name: '90s (Wall-Ramp-Floor-Wall)',
    category: 'build_fight',
    difficulty: 7,
    targetTime: 2.5,
    sequence: ['wall', 'ramp', 'floor', 'wall'],
    description: 'Klassischer High-Ground-Take',
    focus: '90 Degree Turn'
  },
  {
    id: 'double-ramp',
    name: 'Double-Ramp-Rush',
    category: 'build_fight',
    difficulty: 6,
    targetTime: 2.0,
    sequence: ['ramp', 'ramp', 'floor', 'ramp'],
    description: 'Aggressive Pusher-Technik',
    focus: 'Speed & Aggression'
  },
  {
    id: 'tunneling',
    name: 'Tunneling',
    category: 'build_fight',
    difficulty: 5,
    targetTime: 3.0,
    sequence: ['wall', 'floor', 'wall', 'floor', 'wall'],
    description: 'Für Rotations unter Druck',
    focus: 'Consistency'
  },
];

const KEY_MAPPING: Record<InputKey, BuildingAction> = {
  'Q': 'wall',
  'F': 'floor',
  'E': 'ramp',
  'C': 'cone',
  'V': 'pyramid',
};

const ACTION_DISPLAY: Record<BuildingAction, string> = {
  'wall': '🧱 Wall (Q)',
  'ramp': '📐 Ramp (E)',
  'floor': '⬛ Floor (F)',
  'cone': '🔺 Cone (C)',
  'pyramid': '🔻 Pyramid (V)',
};

export default function BuildTrainer() {
  const { user } = useNexusStore();
  const [selectedSequence, setSelectedSequence] = useState(BUILDING_SEQUENCES[0]);
  const [isTraining, setIsTraining] = useState(false);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<DrillSession[]>([]);
  const [currentInput, setCurrentInput] = useState<BuildingAction | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'wrong' | 'missed'; message: string } | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({});

  // Timer for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraining && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTraining, startTime]);

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isTraining) return;
    
    const key = e.key.toUpperCase() as InputKey;
    if (!KEY_MAPPING[key]) return;

    e.preventDefault();
    
    const expectedAction = selectedSequence.sequence[sequenceIndex];
    const inputAction = KEY_MAPPING[key];
    
    setCurrentInput(inputAction);

    if (inputAction === expectedAction) {
      // Correct input
      setFeedback({ type: 'correct', message: '✓ Correct!' });
      setStreak(prev => prev + 1);
      
      if (sequenceIndex < selectedSequence.sequence.length - 1) {
        setSequenceIndex(prev => prev + 1);
      } else {
        // Sequence completed
        finishSequence();
      }
    } else {
      // Wrong input
      setFeedback({ type: 'wrong', message: `✗ Expected: ${ACTION_DISPLAY[expectedAction]}` });
      setStreak(0);
    }

    setTimeout(() => setFeedback(null), 500);
  }, [isTraining, selectedSequence, sequenceIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const startSequence = () => {
    setIsTraining(true);
    setSequenceIndex(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setStreak(0);
    setCurrentInput(null);
    setFeedback(null);
  };

  const finishSequence = () => {
    const finalTime = elapsedTime / 1000; // Convert to seconds
    const targetTime = selectedSequence.targetTime;
    const score = Math.max(0, Math.min(100, 100 - ((finalTime - targetTime) / targetTime) * 100));
    
    // Update best time
    setBestTimes(prev => ({
      ...prev,
      [selectedSequence.id]: prev[selectedSequence.id] ? Math.min(prev[selectedSequence.id], finalTime) : finalTime,
    }));

    const newSession: DrillSession = {
      drillType: selectedSequence.category as any,
      duration: Math.floor(finalTime),
      difficulty: selectedSequence.difficulty,
      score: Math.floor(score),
      improvementAreas: score < 70 ? ['Speed', 'Accuracy'] : [],
      recommendedNextDrill: BUILDING_SEQUENCES[Math.floor(Math.random() * BUILDING_SEQUENCES.length)].id,
    };

    setSessionHistory(prev => [newSession, ...prev].slice(0, 5));
    setIsTraining(false);
    setStartTime(null);
  };

  const formatTime = (ms: number) => {
    const seconds = ms / 1000;
    return `${seconds.toFixed(2)}s`;
  };

  const getBestTime = (sequenceId: string) => {
    return bestTimes[sequenceId] ? `${bestTimes[sequenceId].toFixed(2)}s` : '-';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 pb-20">
      {/* Header */}
      <div className="border-b border-nexus-orange/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-6xl font-black tracking-tighter text-nexus-green">BUILD</h1>
              <h2 className="text-5xl font-black text-nexus-green -mt-3">TRAINER</h2>
              <p className="text-zinc-400 mt-2">Echte Keyboard-Tracking • Muscle-Memory Training</p>
            </div>
            <MetaBadge season="C7S2" lastUpdated="Live" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sequence Selection */}
          <div className="lg:col-span-5">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-8">Wähle dein Training</h3>
              
              <div className="space-y-4">
                {BUILDING_SEQUENCES.map((seq) => (
                  <div
                    key={seq.id}
                    onClick={() => !isTraining && setSelectedSequence(seq)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                      selectedSequence.id === seq.id 
                        ? 'border-nexus-green bg-black/60' 
                        : 'border-zinc-700 hover:border-zinc-500'
                    } ${isTraining ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-bold text-lg">{seq.name}</div>
                        <div className="text-sm text-zinc-400 mt-1">{seq.description}</div>
                        <div className="text-xs text-nexus-green mt-2">Best: {getBestTime(seq.id)}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-nexus-green">{seq.difficulty}/10</div>
                        <div className="text-xs text-zinc-500">DIFFICULTY</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <PaywallGate requiredTier="free">
                <button
                  onClick={startSequence}
                  disabled={isTraining}
                  className="mt-10 w-full py-7 text-2xl font-black bg-gradient-to-r from-nexus-green to-emerald-600 rounded-3xl hover:brightness-110 transition-all active:scale-[0.985] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTraining ? "TRAINING LÄUFT..." : "START DRILL 🔥"}
                </button>
              </PaywallGate>

              <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-sm font-bold text-zinc-400 mb-3">KEYBOARD CONTROLS</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-white">Q = 🧱 Wall</div>
                  <div className="text-white">E = 📐 Ramp</div>
                  <div className="text-white">F = ⬛ Floor</div>
                  <div className="text-white">C = 🔺 Cone</div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Training Area */}
          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-10 min-h-[520px] flex flex-col bg-black/50 backdrop-blur-sm">
              {isTraining ? (
                <div className="flex-1 flex flex-col">
                  {/* Timer & Progress */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <div className="text-4xl font-black text-white">{formatTime(elapsedTime)}</div>
                      <div className="text-sm text-zinc-400">TARGET: {selectedSequence.targetTime}s</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-nexus-green">{streak} 🔥</div>
                      <div className="text-xs text-zinc-500">STREAK</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mb-8">
                    <div 
                      className="h-full bg-gradient-to-r from-nexus-green to-emerald-400 transition-all duration-100"
                      style={{ width: `${((sequenceIndex + 1) / selectedSequence.sequence.length) * 100}%` }}
                    />
                  </div>

                  {/* Sequence Display */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-center mb-8">
                      <div className="text-sm text-zinc-400 mb-4">SEQUENCE ({sequenceIndex + 1}/{selectedSequence.sequence.length})</div>
                      <div className="flex justify-center gap-3 flex-wrap">
                        {selectedSequence.sequence.map((action, i) => (
                          <div
                            key={i}
                            className={`px-4 py-3 rounded-xl text-sm font-bold ${
                              i < sequenceIndex
                                ? 'bg-nexus-green text-black'
                                : i === sequenceIndex
                                ? 'bg-nexus-orange text-black animate-pulse'
                                : 'bg-zinc-800 text-zinc-400'
                            }`}
                          >
                            {ACTION_DISPLAY[action]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current Input Display */}
                    <div className="text-center">
                      {currentInput && (
                        <div className={`text-2xl font-bold mb-4 ${feedback?.type === 'correct' ? 'text-nexus-green' : 'text-red-500'}`}>
                          {ACTION_DISPLAY[currentInput]}
                        </div>
                      )}
                      {feedback && (
                        <div className={`text-lg font-bold ${feedback.type === 'correct' ? 'text-nexus-green' : 'text-red-500'}`}>
                          {feedback.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="text-7xl mb-8">🏗️</div>
                  <h3 className="text-4xl font-bold mb-4">Build Trainer</h3>
                  <p className="text-zinc-400 max-w-sm mb-6">
                    Drücke die Tasten in der richtigen Reihenfolge. 
                    Trainiere deine Muscle-Memory für echtes Building.
                  </p>
                  <div className="text-sm text-zinc-500">
                    Target: {selectedSequence.targetTime}s • {selectedSequence.sequence.length} Actions
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session History */}
        {sessionHistory.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Deine letzten Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionHistory.map((session, i) => (
                <div key={i} className="glass rounded-3xl p-6 bg-black/50 backdrop-blur-sm">
                  <div className="flex justify-between mb-4">
                    <div className="font-medium">Drill Session</div>
                    <div className="text-nexus-green font-bold">{session.score} PTS</div>
                  </div>
                  <div className="text-sm text-zinc-400">
                    Time: {session.duration.toFixed(2)}s • Difficulty: {session.difficulty}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <PaywallGate requiredTier="pro">
          <div className="mt-16 glass rounded-3xl p-12 text-center bg-black/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4">Pro Build Analytics</h3>
            <p className="text-zinc-300 max-w-xl mx-auto">
              Pro User erhalten detaillierte Fortschritts-Tracking, Weak-Spot-Erkennung und personalisierte Trainingspläne basierend auf ihren Stats.
            </p>
          </div>
        </PaywallGate>
      </div>
    </div>
  );
}
