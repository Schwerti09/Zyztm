import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import type { ChatMessage } from '@zyztm/shared-types';

export default function DeepIChat() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { chatMessages, addChatMessage } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    addChatMessage(userMsg);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chatbot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] }),
      });
      const data = await res.json();
      addChatMessage({ role: 'assistant', content: data.message });
    } catch {
      addChatMessage({ role: 'assistant', content: 'Ey Diggah, irgendwas ist schiefgelaufen! Versuch es nochmal! 🎮' });
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
          className="cyber-card rounded-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 p-4 border-b border-neon-pink/20 flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <h2 className="font-cyber text-xl font-bold text-white">DEEPI AI</h2>
              <p className="text-white/50 text-xs">Zyztm's KI-Chatbot</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <motion.div className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-green-400 text-xs font-cyber">ONLINE</span>
            </div>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black/30">
            {chatMessages.length === 0 && (
              <div className="text-center text-white/30 text-sm py-10">
                <div className="text-4xl mb-3">🎮</div>
                <p>Schreib Zyztm an! Was geht ab?</p>
              </div>
            )}
            <AnimatePresence>
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && <span className="text-xl mr-2 self-end">🤖</span>}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-neon-pink/20 text-white border border-neon-pink/30'
                        : 'bg-neon-blue/10 text-white border border-neon-blue/20'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex justify-start">
                <span className="text-xl mr-2">🤖</span>
                <div className="bg-neon-blue/10 border border-neon-blue/20 px-4 py-2 rounded-lg">
                  <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-neon-blue text-sm">
                    tippt...
                  </motion.span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          
          <div className="p-4 border-t border-white/10 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Was geht ab, Bruder?"
              className="flex-1 bg-black/50 border border-white/20 rounded px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue/60"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="btn-primary rounded text-xs px-4 disabled:opacity-40">
              SENDEN
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
