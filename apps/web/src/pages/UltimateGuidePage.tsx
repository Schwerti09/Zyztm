/**
 * Ultimate Guide Pillar Page
 * Complete Fortnite guide for all skill levels
 */

import { lazy, Suspense } from 'react';
import { Link } from 'wouter';
import SEOHead from '../components/SEOHead';

const Footer = lazy(() => import('../components/Footer'));

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Fortnite Ultimate Guide 2026 - Der komplette Guide für alle Skill-Levels',
  description: 'Der ultimative Fortnite Guide für Anfänger bis Pro-Spieler. Building, Aim, Rotation, Meta und Strategien für Chapter 6 Season 2.',
  author: {
    '@type': 'Organization',
    name: 'Fortnite Nexus',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fortnite Nexus',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fortnitenexus.space/logo.png',
    },
  },
};

export default function UltimateGuidePage() {
  return (
    <>
      <SEOHead
        title="Fortnite Ultimate Guide 2026 | Der komplette Guide für alle Skill-Levels"
        description="Der ultimative Fortnite Guide für Anfänger bis Pro-Spieler. Building, Aim, Rotation, Meta und Strategien für Chapter 6 Season 2."
        canonical="https://fortnitenexus.space/ultimate-guide"
        schema={schemaOrg}
      />

      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-nexus-green/20 to-nexus-orange/20" />
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
              FORTNITE ULTIMATE
              <span className="block text-nexus-green">GUIDE 2026</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl">
              Der komplette Guide für alle Skill-Levels. Building, Aim, Rotation, Meta und Strategien für Chapter 6 Season 2.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Skill Level Selection */}
          <div className="glass rounded-3xl p-8 mb-12 bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">🎯 Wähle dein Skill-Level</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="#beginner" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition group">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-white mb-2">Beginner</h3>
                <p className="text-zinc-400 text-sm">Starte hier wenn du neu bist</p>
              </Link>
              <Link href="#intermediate" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition group">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Intermediate</h3>
                <p className="text-zinc-400 text-sm">Verbessere dein Gameplay</p>
              </Link>
              <Link href="#advanced" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition group">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-bold text-white mb-2">Advanced</h3>
                <p className="text-zinc-400 text-sm">Werde ein Pro-Spieler</p>
              </Link>
            </div>
          </div>

          {/* Beginner Section */}
          <section id="beginner" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-nexus-green">🌱 Beginner Guide</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Die Basics</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">1. Landing Strategy</h4>
                      <p className="text-zinc-400 text-sm">Starte mit Named Locations für besseres Loot, oder Remote Drops für Survival.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">2. Building Basics</h4>
                      <p className="text-zinc-400 text-sm">Lerne die 4 Grund-Builds: Wall, Ramp, Floor, Pyramid. Übe im Creative Mode.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">3. Weapon Management</h4>
                      <p className="text-zinc-400 text-sm">Halte immer 1 AR, 1 Shotgun, 1 Healing Item. Drop schlechte Waffen sofort.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Rotation</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Early Game</h4>
                      <p className="text-zinc-400 text-sm">Loot schnell, dann zur Zone. Nutze Vehicles für schnelle Rotation.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Mid Game</h4>
                      <p className="text-zinc-400 text-sm">Bleibe am Rand der Zone. Nutze High Ground für Vorteil.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Late Game</h4>
                      <p className="text-zinc-400 text-sm">Sei geduldig. Warte auf die richtigen Engagements. Nutze Materials.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-nexus-green/10 rounded-xl border border-nexus-green/30">
                <h3 className="font-bold text-white mb-2">💡 Beginner-Tipp</h3>
                <p className="text-zinc-300">Nimm dir Zeit. Fortnite hat eine steile Lernkurve. Konzentriere dich auf eine Sache gleichzeitig (z.B. erst Building, dann Aim).</p>
              </div>
            </div>
          </section>

          {/* Intermediate Section */}
          <section id="intermediate" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-nexus-orange">⚡ Intermediate Guide</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Building</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">90°-Edits</h4>
                      <p className="text-zinc-400 text-sm">Lerne 90°-Turns mit Wall-Edit für schnelle Height-Gains.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">Box Fighting</h4>
                      <p className="text-zinc-400 text-sm">Übe Box-Fights im Creative. Lerne Turtle- und Double-Pump-Strategien.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">Free Build</h4>
                      <p className="text-zinc-400 text-sm">Nutze Free Build Maps für 1v1 Practice ohne Loot-Suche.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Aim</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Crosshair Placement</h4>
                      <p className="text-zinc-400 text-sm">Halte Crosshair auf Head-Level. Pre-aim corners.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Tracking</h4>
                      <p className="text-zinc-400 text-sm">Übe Tracking auf beweglichen Zielen. Ghost Peek Maps.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Shotgun Timing</h4>
                      <p className="text-zinc-400 text-sm">Lerne das perfekte Timing für Shotgun-Pumps und Edits.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-nexus-orange/10 rounded-xl border border-nexus-orange/30">
                <h3 className="font-bold text-white mb-2">💡 Intermediate-Tipp</h3>
                <p className="text-zinc-300">Review deine Games. Nimm dir 5 Minuten nach jedem Match um zu analysieren was du besser machen könntest.</p>
              </div>
            </div>
          </section>

          {/* Advanced Section */}
          <section id="advanced" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-nexus-purple">🔥 Advanced Guide</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Advanced Building</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">Cranked 90s</h4>
                      <p className="text-zinc-400 text-sm">Lerne Cranked 90s für extrem schnelle Height-Gains im Competitive.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">Mythic Building</h4>
                      <p className="text-zinc-400 text-sm">Nutze Mythic Items wie Grapple Blade und Kinetic Blade für Movement.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-orange mb-2">Edit Speed</h4>
                      <p className="text-zinc-400 text-sm">Übe Edit-Speed Maps. Ziel: Sub-100ms Edit-Speed.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-white">Game Sense</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Zone Prediction</h4>
                      <p className="text-zinc-400 text-sm">Lerne die Zone-Patterns. Plane Rotation 2 Circles im Voraus.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Sound Awareness</h4>
                      <p className="text-zinc-400 text-sm">Nutze Audio-Visuals. Identifiziere Enemy-Position durch Footsteps.</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <h4 className="font-semibold text-nexus-purple mb-2">Loadout Switching</h4>
                      <p className="text-zinc-400 text-sm">Wechsle dein Loadout basierend auf Zone-Stage und Enemy-Position.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-nexus-purple/10 rounded-xl border border-nexus-purple/30">
                <h3 className="font-bold text-white mb-2">💡 Advanced-Tipp</h3>
                <p className="text-zinc-300">Spiele mit Pros und besseren Spielern. Watch their streams und versuche ihre Entscheidungen zu verstehen.</p>
              </div>
            </div>
          </section>

          {/* Meta Section */}
          <div className="glass rounded-3xl p-8 mb-12 bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 text-white">📊 Current Meta (Chapter 6 Season 2)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-zinc-900 rounded-xl">
                <h3 className="font-bold text-nexus-green mb-4">Top Weapons</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• Nemesis AR (S-Tier)</li>
                  <li>• Striker AR (S-Tier)</li>
                  <li>• Maven Shotgun (S-Tier)</li>
                  <li>• Hyper SMG (A-Tier)</li>
                </ul>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl">
                <h3 className="font-bold text-nexus-orange mb-4">Top Items</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• Grapple Blade</li>
                  <li>• Shockwave Grenades</li>
                  <li>• Rift-to-Go</li>
                  <li>• Launch Pad</li>
                </ul>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl">
                <h3 className="font-bold text-nexus-purple mb-4">Top Locations</h3>
                <ul className="space-y-2 text-zinc-300 text-sm">
                  <li>• Lavish Lair</li>
                  <li>• The Underworld</li>
                  <li>• Reality Falls</li>
                  <li>• Mega City</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 text-white">🛠️ Nutze unsere Pro Tools</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link href="/tools/sensitivity-converter" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-white mb-2">Sensitivity Converter</h3>
                <p className="text-zinc-400 text-sm">Finde deine perfekte Sensitivity</p>
              </Link>
              <Link href="/tools/loadout-optimizer" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-3">🔫</div>
                <h3 className="font-bold text-white mb-2">Loadout Optimizer</h3>
                <p className="text-zinc-400 text-sm">Optimiere dein Loadout</p>
              </Link>
              <Link href="/tools/stats-dashboard" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-white mb-2">Stats Dashboard</h3>
                <p className="text-zinc-400 text-sm">Analysiere deine Stats</p>
              </Link>
              <Link href="/tools/drop-location-analyzer" className="p-6 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="font-bold text-white mb-2">Drop Analyzer</h3>
                <p className="text-zinc-400 text-sm">Finde die besten Drops</p>
              </Link>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="h-20" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
