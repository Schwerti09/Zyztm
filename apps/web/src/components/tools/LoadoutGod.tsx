/**
 * Nexus Loadout God - Final Version
 * Produktionsreife Implementierung für Milestone 7.6
 * Adapted for Vite + React Architecture
 */

import React, { useState, useRef } from 'react';
import { useLoadoutStore } from '../../stores/loadout-store';
import { useNexusStore } from '../../stores/nexus-store';
import FlexCard from '../shared/FlexCard';
import PaywallGate from '../shared/PaywallGate';
import MetaBadge from '../shared/MetaBadge';
import type { GameMode, Playstyle } from '../../lib/shared-types';

const MODES: { value: GameMode; label: string }[] = [
  { value: 'ranked_solo', label: 'Ranked Solo' },
  { value: 'zero_build_duos', label: 'Zero Build Duos' },
  { value: 'reload', label: 'Reload' },
  { value: 'cash_cup', label: 'Cash Cup' },
  { value: 'og', label: 'OG Mode' },
];

const PLAYSTYLES: { value: Playstyle; label: string }[] = [
  { value: 'aggressive', label: 'Aggressive Rusher' },
  { value: 'zerobuild', label: 'Zero Build Controller' },
  { value: 'sniper', label: 'Sniper God' },
  { value: 'mobility', label: 'Mobility Demon' },
  { value: 'allround', label: 'Allround Pro' },
  { value: 'reload_specialist', label: 'Reload Specialist' },
];

export default function LoadoutGod() {
  const { currentLoadout, generateLoadout, saveLoadout, savedLoadouts } = useLoadoutStore();
  const { user, currentSeason, globalMeta } = useNexusStore();

  const [selectedMode, setSelectedMode] = useState<GameMode>('ranked_solo');
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<Playstyle>('aggressive');
  const [skillLevel, setSkillLevel] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);

  const flexCardRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateLoadout({
      mode: selectedMode,
      playstyle: selectedPlaystyle,
      skillLevel,
      season: currentSeason,
    });
    setIsGenerating(false);
  };

  const handleDownloadFlex = async () => {
    if (!flexCardRef.current || !currentLoadout) return;
    
    // html2canvas implementation (requires npm install html2canvas)
    // For now, show alert
    alert('Flex Card Download requires html2canvas. Install with: npm install html2canvas');
  };

  const handleShare = () => {
    if (!currentLoadout) return;
    const text = `🔥 Mein neues God Loadout von Nexus!\n${currentLoadout.title}\nWinrate: ${currentLoadout.projectedWinrate}%\n#Fortnite #NexusLoadoutGod #TheCommandCenter`;
    navigator.clipboard.writeText(text);
    alert('✅ Text für TikTok / Instagram kopiert!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 pb-20">
      {/* Hero Header */}
      <div className="border-b border-nexus-orange/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter">
                <span className="text-nexus-green">LOADOUT</span>{' '}
                <span className="text-nexus-purple">GOD</span>
              </h1>
              <p className="text-2xl text-nexus-orange mt-2 font-medium">
                by THE COMMAND CENTER • Fortnite Nexus
              </p>
              <p className="text-zinc-400 mt-1">Chapter 7 Season 2 • Meta vom 01.05.2026</p>
            </div>
            <MetaBadge tier="SS" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Eingabe Panel */}
        <div className="xl:col-span-5">
          <div className="glass rounded-3xl p-8 border border-nexus-orange/30 bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-nexus-orange">⚙️</span> DEIN SETUP
            </h2>

            <div className="space-y-8">
              {/* Modus */}
              <div>
                <label className="block text-zinc-400 text-sm mb-3">MODUS</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {MODES.map((mode) => (
                    <button
                      key={mode.value}
                      onClick={() => setSelectedMode(mode.value)}
                      className={`px-6 py-4 rounded-2xl font-semibold transition-all ${
                        selectedMode === mode.value
                          ? 'bg-nexus-orange text-black'
                          : 'bg-zinc-900 hover:bg-zinc-800 border border-zinc-700'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playstyle */}
              <div>
                <label className="block text-zinc-400 text-sm mb-3">PLAYSTYLE</label>
                <select
                  value={selectedPlaystyle}
                  onChange={(e) => setSelectedPlaystyle(e.target.value as Playstyle)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-6 py-4 text-lg focus:border-nexus-orange focus:outline-none"
                >
                  {PLAYSTYLES.map((ps) => (
                    <option key={ps.value} value={ps.value}>
                      {ps.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Level */}
              <div>
                <label className="block text-zinc-400 text-sm mb-3">
                  SKILL LEVEL — <span className="text-nexus-green">{skillLevel}/10</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                  className="w-full accent-nexus-orange"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>Casual</span>
                  <span>Unreal God</span>
                </div>
              </div>

              <PaywallGate requiredTier="free">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-7 text-2xl font-black rounded-3xl bg-gradient-to-r from-nexus-orange via-orange-500 to-nexus-orange hover:brightness-110 transition-all active:scale-[0.985] shadow-2xl shadow-orange-500/50 disabled:opacity-70"
                >
                  {isGenerating ? 'LOADOUT GOD WIRD BESCHWOREN...' : 'INVOKE LOADOUT GOD 🔥'}
                </button>
              </PaywallGate>
            </div>
          </div>
        </div>

        {/* Ergebnis Panel */}
        <div className="xl:col-span-7">
          {currentLoadout ? (
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-5xl font-black text-white tracking-tight">{currentLoadout.title}</h2>
                  <p className="text-2xl text-nexus-orange mt-2">{currentLoadout.subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-nexus-green">{currentLoadout.projectedWinrate}%</div>
                  <div className="text-sm text-zinc-500">PROJECTED WINRATE</div>
                </div>
              </div>

              {/* Flex Card */}
              <div ref={flexCardRef}>
                <FlexCard loadout={currentLoadout} username={user?.username} />
              </div>

              {/* Erklärung */}
              <div className="glass rounded-3xl p-8 border border-zinc-700 bg-black/50 backdrop-blur-sm">
                <h3 className="text-nexus-purple font-bold text-xl mb-4">WARUM DIESES LOADOUT AKTUELL ZERSTÖRT:</h3>
                <p className="text-zinc-300 leading-relaxed text-lg">{currentLoadout.explanation}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={handleDownloadFlex}
                  className="py-6 rounded-3xl bg-white text-black font-bold flex items-center justify-center gap-3 hover:bg-nexus-orange hover:text-white transition-all"
                >
                  <span>⬇️</span> FLEX CARD DOWNLOAD
                </button>

                <button
                  onClick={handleShare}
                  className="py-6 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-500 font-bold hover:brightness-110 transition-all"
                >
                  TEILEN AUF TIKTOK / INSTAGRAM
                </button>

                <PaywallGate requiredTier="pro">
                  <button
                    onClick={() => saveLoadout(currentLoadout)}
                    className="py-6 rounded-3xl bg-zinc-800 hover:bg-zinc-700 font-bold transition-all"
                  >
                    LOADOUT SPEICHERN ({savedLoadouts.length}/∞)
                  </button>
                </PaywallGate>
              </div>
            </div>
          ) : (
            <div className="glass rounded-3xl p-16 text-center bg-black/50 backdrop-blur-sm">
              <div className="text-6xl mb-6">⚔️</div>
              <h3 className="text-3xl font-bold mb-4">Bereit für den nächsten God Loadout?</h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                Wähle Modus, Playstyle und Skill Level aus und lass den Loadout God sprechen.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
