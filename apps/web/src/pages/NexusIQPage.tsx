import { useState, useEffect } from 'react';
import { Link } from 'wouter';

export default function NexusIQPage() {
  const [step, setStep] = useState(0);
  const [epicName, setEpicName] = useState('');
  const [platform, setPlatform] = useState('pc');
  const [loading, setLoading] = useState(false);
  const [dnaResult, setDnaResult] = useState<any>(null);

  useEffect(() => {
    document.title = 'NEXUS IQ - Deine Battle DNA | Fortnite Nexus';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Entdecke deine einzigartige Fortnite Battle DNA in 3 Klicks. Kostenlos, viral, einzigartig.');
    }
  }, []);

  const steps = [
    {
      title: 'Dein Epic Name',
      description: 'Gib deinen Fortnite-Benutzernamen ein',
      placeholder: 'z.B. Ninja',
      input: epicName,
      setInput: setEpicName,
      type: 'text'
    },
    {
      title: 'Deine Plattform',
      description: 'Auf welchem Plattform spielst du?',
      options: [
        { value: 'pc', label: 'PC', emoji: '🖥️' },
        { value: 'psn', label: 'PlayStation', emoji: '🎮' },
        { value: 'xbl', label: 'Xbox', emoji: '🎯' },
        { value: 'switch', label: 'Nintendo Switch', emoji: '🕹️' },
        { value: 'mobile', label: 'Mobile', emoji: '📱' }
      ],
      input: platform,
      setInput: setPlatform,
      type: 'select'
    },
    {
      title: 'Deine Spielweise',
      description: 'Wie spielst du meistens?',
      options: [
        { value: 'aggressive', label: 'Aggressiv', emoji: '⚔️' },
        { value: 'passive', label: 'Passiv', emoji: '🛡️' },
        { value: 'builder', label: 'Builder', emoji: '🏗️' },
        { value: 'sniper', label: 'Sniper', emoji: '🎯' }
      ],
      input: step === 2 ? (dnaResult?.playstyle || '') : '',
      setInput: (val: string) => setDnaResult({ ...dnaResult, playstyle: val }),
      type: 'select'
    }
  ];

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      // Simulate DNA analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock DNA result
      const dnaResult = {
        epicName,
        platform,
        playstyle: steps[2].input,
        stats: {
          aim: Math.floor(Math.random() * 30) + 70,
          building: Math.floor(Math.random() * 30) + 70,
          gameSense: Math.floor(Math.random() * 30) + 70,
          aggression: Math.floor(Math.random() * 30) + 70,
          survival: Math.floor(Math.random() * 30) + 70
        },
        archetype: [
          'Aggressive Rusher',
          'Tactical Builder',
          'Sniper Assassin',
          'Survival Master',
          'All-Rounder Pro'
        ][Math.floor(Math.random() * 5)],
        rank: [
          'Bronze',
          'Silver',
          'Gold',
          'Platinum',
          'Diamond',
          'Champion',
          'Unreal'
        ][Math.floor(Math.random() * 7)],
        winRate: (Math.random() * 15 + 5).toFixed(1),
        kd: (Math.random() * 2 + 0.5).toFixed(2),
        matches: Math.floor(Math.random() * 5000 + 500)
      };
      
      setDnaResult(dnaResult);
      setLoading(false);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const getArchetypeColor = (archetype: string) => {
    const colors: Record<string, string> = {
      'Aggressive Rusher': 'from-red-500 to-orange-500',
      'Tactical Builder': 'from-blue-500 to-cyan-500',
      'Sniper Assassin': 'from-purple-500 to-pink-500',
      'Survival Master': 'from-green-500 to-emerald-500',
      'All-Rounder Pro': 'from-yellow-500 to-amber-500'
    };
    return colors[archetype] || 'from-neon-blue to-neon-pink';
  };

  const getRankColor = (rank: string) => {
    const colors: Record<string, string> = {
      'Bronze': '#CD7F32',
      'Silver': '#C0C0C0',
      'Gold': '#FFD700',
      'Platinum': '#E5E4E2',
      'Diamond': '#B9F2FF',
      'Champion': '#FF69B4',
      'Unreal': '#FF4500'
    };
    return colors[rank] || '#FFFFFF';
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 via-purple-500/10 to-neon-blue/20 animate-pulse"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-neon-pink/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-blue/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h1 className="font-cyber text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-neon-pink via-purple-500 to-neon-blue bg-clip-text text-transparent animate-pulse">
              NEXUS IQ
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/80 mb-2">
              Deine Battle DNA
            </p>
            <p className="font-body text-white/60 text-sm md:text-base">
              3 Klicks. Einzigartig. Viral.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between mb-2">
              <span className="font-cyber text-xs text-white/50">SCHRITT {Math.min(step + 1, 4)}/4</span>
              <span className="font-cyber text-xs text-white/50">{Math.min((step + 1) / 4 * 100, 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-pink to-neon-blue transition-all duration-500 ease-out"
                style={{ width: `${Math.min((step + 1) / 4 * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Input Steps */}
          {step < 3 && (
            <div className="max-w-xl mx-auto">
              <div className="bg-bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="font-cyber text-2xl font-bold text-white mb-2">
                  {steps[step]?.title || ''}
                </h2>
                <p className="font-body text-white/60 mb-6">
                  {steps[step]?.description || ''}
                </p>

                {steps[step]?.type === 'text' && (
                  <input
                    type="text"
                    value={steps[step]?.input || ''}
                    onChange={(e) => steps[step]?.setInput(e.target.value)}
                    placeholder={steps[step]?.placeholder || ''}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-neon-blue focus:outline-none transition-colors font-body text-lg mb-6"
                  />
                )}

                {steps[step]?.type === 'select' && steps[step]?.options && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {steps[step].options.map((option: any) => (
                      <button
                        key={option.value}
                        onClick={() => steps[step]?.setInput(option.value)}
                        className={`p-4 rounded-xl border transition-all ${
                          steps[step]?.input === option.value
                            ? 'border-neon-blue bg-neon-blue/20 text-white'
                            : 'border-white/10 bg-black/30 text-white/60 hover:border-white/30'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.emoji}</div>
                        <div className="font-cyber text-sm">{option.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white/60 hover:border-white/40 transition-colors font-cyber"
                    >
                      Zurück
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!steps[step]?.input || loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl text-white font-cyber font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    {loading ? 'Analysiere...' : step === 2 ? 'Jetzt analysieren' : 'Weiter'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between mb-2">
              <span className="font-cyber text-xs text-white/50">SCHRITT {Math.min(step + 1, 4)}/4</span>
              <span className="font-cyber text-xs text-white/50">{Math.min((step + 1) / 4 * 100, 100)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-pink to-neon-blue transition-all duration-500 ease-out"
                style={{ width: `${Math.min((step + 1) / 4 * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Input Steps */}
          {step < 3 && (
            <div className="max-w-xl mx-auto">
              <div className="bg-bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="font-cyber text-2xl font-bold text-white mb-2">
                  {steps[step].title}
                </h2>
                <p className="font-body text-white/60 mb-6">
                  {steps[step].description}
                </p>

                {steps[step]?.type === 'text' && (
                  <input
                    type="text"
                    value={steps[step]?.input || ''}
                    onChange={(e) => steps[step]?.setInput?.(e.target.value)}
                    placeholder={steps[step]?.placeholder || ''}
                    className="w-full px-6 py-4 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-neon-blue focus:outline-none transition-colors font-body text-lg mb-6"
                  />
                )}

                {steps[step]?.type === 'select' && steps[step]?.options && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {steps[step].options.map((option: any) => (
                      <button
                        key={option.value}
                        onClick={() => steps[step].setInput(option.value)}
                        className={`p-4 rounded-xl border transition-all ${
                          steps[step].input === option.value
                            ? 'border-neon-blue bg-neon-blue/20 text-white'
                            : 'border-white/10 bg-black/30 text-white/60 hover:border-white/30'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.emoji}</div>
                        <div className="font-cyber text-sm">{option.label}</div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 px-6 py-3 border border-white/20 rounded-xl text-white/60 hover:border-white/40 transition-colors font-cyber"
                    >
                      Zurück
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!steps[step]?.input || loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl text-white font-cyber font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    {loading ? 'Analysiere...' : step === 2 ? 'Jetzt analysieren' : 'Weiter'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DNA Result */}
          {step === 4 && dnaResult && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-bg-card/90 to-bg-card/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                {/* DNA Card Header */}
                <div className="text-center mb-8">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full mb-4">
                    <span className="font-cyber text-sm font-bold text-white">BATTLE DNA</span>
                  </div>
                  <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-2">
                    {dnaResult.epicName}
                  </h2>
                  <p className="font-body text-white/60">
                    {dnaResult.matches.toLocaleString()} Matches · {dnaResult.platform.toUpperCase()}
                  </p>
                </div>

                {/* Archetype Badge */}
                <div className="text-center mb-8">
                  <div className={`inline-block px-8 py-4 bg-gradient-to-r ${getArchetypeColor(dnaResult.archetype)} rounded-2xl mb-4`}>
                    <span className="font-cyber text-2xl font-bold text-white">{dnaResult.archetype}</span>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: getRankColor(dnaResult.rank) }}
                    ></div>
                    <span className="font-cyber text-lg text-white">{dnaResult.rank}</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {[
                    { label: 'Aim', value: dnaResult.stats.aim, color: 'from-red-500 to-orange-500' },
                    { label: 'Building', value: dnaResult.stats.building, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Game Sense', value: dnaResult.stats.gameSense, color: 'from-purple-500 to-pink-500' },
                    { label: 'Aggression', value: dnaResult.stats.aggression, color: 'from-yellow-500 to-amber-500' },
                    { label: 'Survival', value: dnaResult.stats.survival, color: 'from-green-500 to-emerald-500' }
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className={`w-full h-2 bg-gradient-to-r ${stat.color} rounded-full mb-2`}></div>
                      <div className="font-cyber text-2xl font-bold text-white">{stat.value}%</div>
                      <div className="font-body text-xs text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-black/30 rounded-xl p-4 text-center">
                    <div className="font-cyber text-3xl font-bold text-neon-pink">{dnaResult.winRate}%</div>
                    <div className="font-body text-xs text-white/50">Win Rate</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-center">
                    <div className="font-cyber text-3xl font-bold text-neon-blue">{dnaResult.kd}</div>
                    <div className="font-body text-xs text-white/50">K/D</div>
                  </div>
                  <div className="bg-black/30 rounded-xl p-4 text-center md:col-span-1 col-span-2">
                    <div className="font-cyber text-3xl font-bold text-neon-green">{dnaResult.matches.toLocaleString()}</div>
                    <div className="font-body text-xs text-white/50">Matches</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      // Share functionality
                      if (navigator.share) {
                        navigator.share({
                          title: 'Meine Battle DNA',
                          text: `Ich bin ein ${dnaResult.archetype} in Fortnite! 🎮`,
                          url: window.location.href
                        });
                      }
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl text-white font-cyber font-bold hover:shadow-lg hover:shadow-neon-blue/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>🔥</span>
                    <span>Teilen</span>
                  </button>
                  
                  <Link href="/shop/nexus-iq-premium">
                    <a className="block w-full px-6 py-4 border border-neon-green/50 rounded-xl text-neon-green font-cyber font-bold hover:bg-neon-green/10 transition-all text-center">
                      ⚡ Wöchentliche DNA-Updates - €4.99/Monat
                    </a>
                  </Link>

                  <button
                    onClick={() => setStep(0)}
                    className="w-full px-6 py-4 border border-white/20 rounded-xl text-white/60 font-cyber hover:border-white/40 transition-all"
                  >
                    Neue Analyse
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
