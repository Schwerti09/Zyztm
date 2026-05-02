/**
 * Settings Guide Pillar Page
 * Complete guide for Fortnite settings optimization
 */

import { lazy, Suspense, useEffect } from 'react';
import { Link } from 'wouter';

const Footer = lazy(() => import('../components/Footer'));

export default function SettingsGuidePage() {
  useEffect(() => {
    document.title = 'Fortnite Settings Guide 2026 | Die ultimative Einstellungs-Optimierung';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Die besten Fortnite Settings für PC, Controller, Mobile und Konsolen. Sensitivity, Keybinds, Grafik und Audio für maximale Performance.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Die besten Fortnite Settings für PC, Controller, Mobile und Konsolen. Sensitivity, Keybinds, Grafik und Audio für maximale Performance.';
      document.head.appendChild(meta);
    }

    // Set canonical URL
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://fortnitenexus.space/settings-guide');
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-nexus-orange/20 to-nexus-purple/20" />
          <div className="relative max-w-7xl mx-auto px-6 py-20">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
              FORTNITE SETTINGS
              <span className="block text-nexus-orange">GUIDE 2026</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl">
              Die ultimative Einstellungs-Optimierung für PC, Controller, Mobile und Konsolen. 
              Sensitivity, Keybinds, Grafik und Audio für maximale Performance.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Quick Navigation */}
          <div className="glass rounded-3xl p-8 mb-12 bg-black/50 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-6 text-white">🎯 Schnellnavigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="#pc-settings" className="p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-2">🖥️</div>
                <div className="text-white font-semibold">PC Settings</div>
              </Link>
              <Link href="#controller-settings" className="p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-2">🎮</div>
                <div className="text-white font-semibold">Controller</div>
              </Link>
              <Link href="#mobile-settings" className="p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-2">📱</div>
                <div className="text-white font-semibold">Mobile</div>
              </Link>
              <Link href="#console-settings" className="p-4 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition text-center">
                <div className="text-3xl mb-2">🕹️</div>
                <div className="text-white font-semibold">Konsolen</div>
              </Link>
            </div>
          </div>

          {/* PC Settings Section */}
          <section id="pc-settings" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-white">🖥️ PC Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-orange">Sensitivity</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Mouse Sensitivity</span>
                        <span className="text-nexus-green">0.08 - 0.12</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Pro-Spieler nutzen meist 0.08-0.12 für präzises Aim</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">ADS Sensitivity</span>
                        <span className="text-nexus-green">0.04 - 0.06</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Langsamer für präzises Zielen im ADS</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Build Sensitivity</span>
                        <span className="text-nexus-green">1.4x - 1.8x</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Schneller für schnelle Building-Edits</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-purple">Grafik</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Resolution</span>
                        <span className="text-nexus-green">1920x1080</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Native 1080p für beste Balance</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">FPS Limit</span>
                        <span className="text-nexus-green">Unlimited / 240</span>
                      </div>
                      <p className="text-zinc-400 text-sm">So hoch wie möglich dein Monitor erlaubt</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Quality</span>
                        <span className="text-nexus-green">Performance</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Performance Mode für maximale FPS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Controller Settings Section */}
          <section id="controller-settings" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-white">🎮 Controller Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-orange">Sensitivity</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Build Sensitivity</span>
                        <span className="text-nexus-green">1.3x - 1.5x</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Balanced für schnelles Building</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Edit Sensitivity</span>
                        <span className="text-nexus-green">1.8x - 2.2x</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Schneller für präzise Edits</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-purple">Controller Layout</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Builder Pro</span>
                        <span className="text-nexus-green">Empfohlen</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Bestes Layout für competitive Building</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Deadzone</span>
                        <span className="text-nexus-green">5% - 10%</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Niedrig für bessere Responsiveness</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Settings Section */}
          <section id="mobile-settings" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-white">📱 Mobile Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-orange">Touch Controls</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">HUD Scale</span>
                        <span className="text-nexus-green">100%</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Full HUD für beste Übersicht</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Fire Button Size</span>
                        <span className="text-nexus-green">Large</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Größer für bessere Trefferquote</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-purple">Performance</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Graphics</span>
                        <span className="text-nexus-green">Performance</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Performance Mode für 60 FPS</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">3D Resolution</span>
                        <span className="text-nexus-green">100%</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Native für beste Sicht</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Console Settings Section */}
          <section id="console-settings" className="mb-16">
            <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-8 text-white">🕹️ Konsolen Settings</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-orange">PS5 / Xbox Series X</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Performance Mode</span>
                        <span className="text-nexus-green">120 FPS</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Favor Performance für 120 FPS</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Controller</span>
                        <span className="text-nexus-green">Builder Pro</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Standard Competitive Layout</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 text-nexus-purple">Switch / PS4 / Xbox One</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Performance</span>
                        <span className="text-nexus-green">60 FPS</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Standard für ältere Konsolen</p>
                    </div>
                    <div className="p-4 bg-zinc-900 rounded-xl">
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-semibold">Graphics</span>
                        <span className="text-nexus-green">Balanced</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Balance aus FPS und Qualität</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pro Tips Section */}
          <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 text-nexus-purple">💡 Pro-Tipps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-zinc-900 rounded-xl border-l-4 border-nexus-orange">
                <h3 className="font-bold text-white mb-2">Sensitivity nicht zu oft ändern</h3>
                <p className="text-zinc-400 text-sm">Gib deinen Settings 2-3 Wochen Zeit bevor du sie änderst. Muskelgedächtnis braucht Zeit.</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl border-l-4 border-nexus-green">
                <h3 className="font-bold text-white mb-2">Crosshair Placement üben</h3>
                <p className="text-zinc-400 text-sm">Besserer Crosshair Placement ist wichtiger als höhere Sensitivity.</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl border-l-4 border-nexus-purple">
                <h3 className="font-bold text-white mb-2">Audio Settings anpassen</h3>
                <p className="text-zinc-400 text-sm">Audio-Visuals auf High für bessere Schuss-Erkennung.</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl border-l-4 border-nexus-orange">
                <h3 className="font-bold text-white mb-2">Keybinds personalisieren</h3>
                <p className="text-zinc-400 text-sm">Finde Keybinds die sich für dich natürlich anfühlen, nicht was Pros nutzen.</p>
              </div>
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
