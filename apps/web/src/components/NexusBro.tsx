import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { ChatMessage } from '@nexus/shared-types';

type Mood = 'chill' | 'tryhard' | 'lustig';

const MOOD_CONFIG: Record<Mood, { label: string; emoji: string; color: string; prompt: string }> = {
  chill: {
    label: 'Chill',
    emoji: '😎',
    color: '#00f2ff',
    prompt: 'chill',
  },
  tryhard: {
    label: 'Tryhard',
    emoji: '🔥',
    color: '#ff0055',
    prompt: 'tryhard',
  },
  lustig: {
    label: 'Lustig',
    emoji: '😂',
    color: '#ffd700',
    prompt: 'lustig',
  },
};

const OFFLINE_RESPONSES: Record<Mood, string[]> = {
  chill: [
    'Yo Bro, was geht ab? 😎 Ich chill gerade ab, aber für dich nehm ich mir kurz Zeit!',
    'Alles relaxed hier im Nexus 🌊 Was brauchst du?',
    'Ey, kein Stress – sag mir einfach was auf dem Herzen liegt, Diggah!',
    'Ich bin im Chill-Modus aber voll da für dich 💯',
  ],
  tryhard: [
    'LASS GOOOO! 🔥🔥🔥 Ich bin im vollen Tryhard-Modus – frag mich was!!',
    'WIR LIEFERN AB HEUTE! Was ist deine Frage? GIB ALLES!',
    'VICTORY ROYALE oder Tod! Was willst du wissen, Bruder?! ⚡',
    'FOCUS MODE AN! Ich beantworte alles in 0,1 Sekunden!',
  ],
  lustig: [
    'HAHAHA wer hat dich gelassen hier rein zu kommen?? 😂 Just kidding – was geht?',
    'Alter ich hab gerade so einen Move gebaut der war so krass ich glaub ich bin kein Mensch mehr 😭',
    'Diggah ich frag mich jeden Tag warum Fortnite noch existiert und spiel es trotzdem 24/7 lmaooo',
    'Ok ok ich hör auf zu labern – was willst du wissen bevor ich wieder auf TikTok schaue?',
  ],
};

const STRATEGY_RESPONSES: Record<Mood, Record<string, string>> = {
  chill: {
    drop: 'Ich drope am liebsten Tilted oder The Rig, da geht die Action sofort los 🪂 Aber entspannt, kein Stress beim Landen!',
    rotation: 'Safe rotieren, innen in der Zone bleiben – erst Top 10, dann W-Key-Modus an 😎',
    build: 'Ich bau nur wenn ich muss – lieber W-Key und Überraschungsangriff als 10 Minuten Box bauen, chill halt 🏗️',
    loadout: 'AR + SMG + Pump ist mein Go-To, dazu Heals und fertig ist der Grind-Loadout 🛡️',
    grind: 'Täglich 3-5 Stunden ist mein Ding – nicht zu stressig, aber konstant. Kein Grind = kein Glow-Up 💯',
    zone: 'Niemals am Rand der Zone chillen Bro – zu riskant! Immer leicht drin bleiben und relaxed rotieren 🌀',
  },
  tryhard: {
    drop: 'TILTED TOWERS ODER BUST!! 🪂🔥 Ich will SOFORT Kills, keine Zeit für sichere Drops!! VOLLE AGGRESSION AB SEKUNDE 1!',
    rotation: 'ZONE INNEN HALTEN – DANN TOP 10 ANKOMMEN UND ALLES NIEDERREISSEN!! VOLLE AGGRESSION!! 🔥',
    build: 'BUILDEN IST FÜR ANFÄNGER!! W-KEY PUSHEN, EDITIEREN, PEEKEN, KILLEN – DAS IST DER GRIND!! 🏗️🔥',
    loadout: 'AR + SMG + PUMP + HEALS = HEILIGE DREIFALTIGKEIT!! KEIN HEAL = KEIN WIN!! IMMER VOLL AUSGERÜSTET!! 🛡️⚡',
    grind: 'MINIMUM 5 STUNDEN TÄGLICH!! KEINE PAUSE BIS VICTORY ROYALE!! KEIN GRIND = KEIN GLOW-UP – PUNKT!! 🔥🔥🔥',
    zone: 'IMMER INNEN IN DER ZONE!! AM RAND STERBEN IST CRINGE!! PUSH PUSH PUSH!! 💀',
  },
  lustig: {
    drop: 'Ich drop Tilted weil ich zu faul bin für sichere Drops und eigentlich will ich einfach sofort sterben damit ich wieder was essen kann 😂🪂',
    rotation: 'Ich rotiere innen in der Zone und bete dass niemand mich sieht 😂 Meistens sehen sie mich trotzdem 💀',
    build: 'Ich bau gar nicht weil ich die Buttons nicht finde hahahaha jk jk – W-Key ist mein einziger Skill 😂🏗️',
    loadout: 'Ich nehme immer alles was auf dem Boden liegt und wundere mich dann warum ich verliere lmaooo 😭🛡️',
    grind: 'Ich grinde täglich aber hauptsächlich grinde ich Niederlagen – ich bin der Content-Creator der verliert damit ihr euch besser fühlt 😂🔥',
    zone: 'Zone? Was ist Zone? Ich lauf einfach geradeaus bis ich entweder win oder sterbe – meistens sterbe ich 😂💀',
  },
};

function getMoodResponse(input: string, mood: Mood): string {
  const lower = input.toLowerCase();
  if (lower.includes('preis') || lower.includes('kaufen') || lower.includes('shop')) {
    if (mood === 'tryhard') return 'NEXUS MARKETPLACE CHECKEN! 🔥 Voice Pack €9,99, Nexus Bro €12,99, Soundboard €7,99 – KAUFEN ODER VERLIEREN!';
    if (mood === 'lustig') return 'Alter du willst KAUFEN?? Ich dachte du liebst mich umsonst 😭 Aber ok schau mal im Shop vorbei lol';
    return 'Im LOOT PODS Shop kriegst du krasse Items! Voice Pack, Nexus Bro, Karten und mehr – scroll mal runter! 😎';
  }
  if (lower.includes('stream') || lower.includes('kick') || lower.includes('live')) {
    if (mood === 'tryhard') return 'YOUTUBE.COM/@FORTNITENEXUSDE – DA WIRD GELIEFERT! 🟢 Täglich Content, täglich Clutches!';
    if (mood === 'lustig') return 'youtube.com/@FortniteNexusDE – da post ich täglich Content und verliere stylisch 😂 Komm vorbei!';
    return 'Ich poste auf YouTube! 🟢 youtube.com/@FortniteNexusDE – täglich chill vorbei kommen!';
  }
  if (lower.includes('drop') || lower.includes('landen') || lower.includes('drop spot') || lower.includes('wo landen')) {
    return STRATEGY_RESPONSES[mood].drop;
  }
  if (lower.includes('rotation') || lower.includes('rotier') || lower.includes('zone rotier')) {
    return STRATEGY_RESPONSES[mood].rotation;
  }
  if (lower.includes('zone') || lower.includes('storm') || lower.includes('ring')) {
    return STRATEGY_RESPONSES[mood].zone;
  }
  if (lower.includes('build') || lower.includes('bau') || lower.includes('editier') || lower.includes('edit')) {
    return STRATEGY_RESPONSES[mood].build;
  }
  if (lower.includes('loadout') || lower.includes('waffe') || lower.includes('weapon') || lower.includes('gun') || lower.includes('loot')) {
    return STRATEGY_RESPONSES[mood].loadout;
  }
  if (lower.includes('grind') || lower.includes('üben') || lower.includes('besser werden') || lower.includes('tipps') || lower.includes('tipp') || lower.includes('improve')) {
    return STRATEGY_RESPONSES[mood].grind;
  }
  if (lower.includes('fortnite') || lower.includes('game') || lower.includes('strateg') || lower.includes('win')) {
    if (mood === 'tryhard') return 'FORTNITE GRIND-STRATEGIE: DROP TILTED, W-KEY ALLES, ZONE INNEN HALTEN, TOP 10 PUSHEN – VICTORY ROYALE! 🏆🔥';
    if (mood === 'lustig') return 'Mein bester Fortnite-Tipp: Log aus und geh schlafen 😂 Nein seriously – Drop Tilted, W-Key, Heals dabei und beten!';
    return 'Fortnite-Strategie vom Bro: Drop Tilted für Action, Zone innen halten, Top 10 abwarten, dann W-Key alles! Und Heals nie vergessen 🛡️😎';
  }
  if (lower.includes('discord')) {
    return mood === 'tryhard'
      ? 'DISCORD.GG/FORTNITENEXUS – 12K KRIEGER WARTEN AUF DICH! JOIN SOFORT!'
      : 'discord.gg/fortnitenexus – 12K Mitglieder, mega Community 💬';
  }
  const responses = OFFLINE_RESPONSES[mood];
  return responses[Math.floor(Math.random() * responses.length)];
}

export default function NexusBro() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState<Mood>('chill');
  const [isTalking, setIsTalking] = useState(false);
  const { chatMessages, addChatMessage } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    addChatMessage(userMsg);
    const sentInput = input;
    setInput('');
    setLoading(true);
    setIsTalking(false);
    try {
      const res = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], mood }),
      });
      const data = await res.json();
      const reply = (data.message && data.message.trim()) ? data.message : getMoodResponse(sentInput, mood);
      addChatMessage({ role: 'assistant', content: reply });
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), Math.min(reply.length * 40, 3000));
    } catch {
      const reply = getMoodResponse(sentInput, mood);
      addChatMessage({ role: 'assistant', content: reply });
      setIsTalking(true);
      setTimeout(() => setIsTalking(false), Math.min(reply.length * 40, 3000));
    } finally {
      setLoading(false);
    }
  };

  const currentMood = MOOD_CONFIG[mood];

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, rgba(8,10,18,0.97) 0%, rgba(5,7,14,0.99) 100%)',
            border: `1px solid ${currentMood.color}40`,
            boxShadow: `0 0 40px ${currentMood.color}15`,
          }}
        >
          {/* Discord-style title bar */}
          <div
            className="px-4 py-3 flex items-center gap-3 border-b"
            style={{ borderColor: `${currentMood.color}20`, background: `${currentMood.color}08` }}
          >
            {/* Avatar with talking animation */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ background: `linear-gradient(135deg, ${currentMood.color}40, ${currentMood.color}15)`, border: `2px solid ${currentMood.color}60` }}
                animate={isTalking ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.3, repeat: isTalking ? Infinity : 0 }}
              >
                🤖
              </motion.div>
              {/* Talking mouth indicator */}
              {isTalking && (
                <div className="absolute -bottom-1 -right-1 flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ background: currentMood.color }}
                      animate={{ height: ['3px', '8px', '3px'] }}
                      transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-cyber text-white font-bold text-sm">NEXUS BRO</span>
                <span className="text-xs" style={{ color: currentMood.color }}>{currentMood.emoji}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-green-400 text-xs font-cyber">ONLINE</span>
                <span className="text-white/30 text-xs">· Nexus Gaming-Kumpel</span>
              </div>
            </div>
            {/* Mood tabs */}
            <div className="flex gap-1">
              {(Object.keys(MOOD_CONFIG) as Mood[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className="px-2.5 py-1 rounded text-xs font-cyber transition-all duration-200"
                  style={{
                    background: mood === m ? `${MOOD_CONFIG[m].color}25` : 'transparent',
                    border: `1px solid ${mood === m ? MOOD_CONFIG[m].color : 'rgba(255,255,255,0.1)'}`,
                    color: mood === m ? MOOD_CONFIG[m].color : 'rgba(255,255,255,0.4)',
                  }}
                  title={MOOD_CONFIG[m].label}
                >
                  {MOOD_CONFIG[m].emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Channel name bar */}
          <div className="px-4 py-1.5 flex items-center gap-2 border-b border-white/5 bg-black/20">
            <span className="text-white/30 text-xs">#</span>
            <span className="text-white/50 text-xs font-cyber tracking-wider">nexus-bro-chat</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: `${currentMood.color}15`, color: currentMood.color }}>
              {MOOD_CONFIG[mood].label}-Modus
            </span>
          </div>

          {/* Messages area */}
          <div className="h-72 overflow-y-auto p-4 space-y-4" style={{ background: 'rgba(0,0,0,0.3)' }}>
            {chatMessages.length === 0 && (
              <div className="text-center py-10">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🤖
                </motion.div>
                <p className="text-white/40 text-sm font-cyber">Nexus Bro wartet auf dich!</p>
                <p className="text-white/25 text-xs mt-1">Wähl einen Modus und fang an zu schreiben</p>
              </div>
            )}
            <AnimatePresence>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                    style={{
                      background: msg.role === 'assistant'
                        ? `linear-gradient(135deg, ${currentMood.color}40, ${currentMood.color}15)`
                        : 'rgba(255,255,255,0.1)',
                      border: `1px solid ${msg.role === 'assistant' ? `${currentMood.color}50` : 'rgba(255,255,255,0.15)'}`,
                    }}
                  >
                    {msg.role === 'assistant' ? '🤖' : '👤'}
                  </div>
                  <div className={`max-w-xs lg:max-w-sm ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <span className="text-white/40 text-xs font-cyber px-1">
                      {msg.role === 'assistant' ? 'Nexus Bro' : 'Du'}
                    </span>
                    <div
                      className="px-4 py-2.5 rounded-lg text-sm leading-relaxed"
                      style={{
                        background: msg.role === 'user'
                          ? 'rgba(255,255,255,0.08)'
                          : `${currentMood.color}12`,
                        border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.12)' : `${currentMood.color}25`}`,
                        color: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm"
                  style={{ background: `${currentMood.color}20`, border: `1px solid ${currentMood.color}40` }}
                >
                  🤖
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-xs font-cyber px-1">Nexus Bro</span>
                  <div
                    className="px-4 py-2.5 rounded-lg flex items-center gap-1"
                    style={{ background: `${currentMood.color}12`, border: `1px solid ${currentMood.color}25` }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: currentMood.color }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            className="p-4 flex gap-3 border-t"
            style={{ borderColor: `${currentMood.color}15`, background: 'rgba(0,0,0,0.2)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`Nachricht an Nexus Bro (${MOOD_CONFIG[mood].label}-Modus)...`}
              className="flex-1 bg-white/5 border rounded px-3 py-2 text-white placeholder-white/25 text-sm focus:outline-none transition-colors"
              style={{ borderColor: `${currentMood.color}25` }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-4 rounded font-cyber text-xs tracking-widest disabled:opacity-40 transition-all duration-200"
              style={{
                background: `linear-gradient(90deg, ${currentMood.color}40, ${currentMood.color}20)`,
                border: `1px solid ${currentMood.color}60`,
                color: currentMood.color,
              }}
            >
              ▶
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
