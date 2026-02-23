import { useState } from 'react';

export default function AdminAI() {
  const adminSecret = localStorage.getItem('adminSecret') || '';

  const [voiceText, setVoiceText] = useState('');
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);
  const [voiceLoading, setVoiceLoading] = useState(false);

  const [creditsUserId, setCreditsUserId] = useState('');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [creditsStatus, setCreditsStatus] = useState<string | null>(null);
  const [creditsLoading, setCreditsLoading] = useState(false);

  const handleVoiceSynth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voiceText.trim()) return;
    setVoiceLoading(true);
    setVoiceStatus(null);
    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-test-mode': 'true',
          'x-admin-secret': adminSecret,
        },
        body: JSON.stringify({ text: voiceText }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('audio')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
        setVoiceStatus('✅ Audio playing...');
      } else {
        const data = await res.json();
        setVoiceStatus(`✅ Success: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setVoiceStatus(`❌ Error: ${(err as Error).message}`);
    } finally {
      setVoiceLoading(false);
    }
  };

  const handleAddCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditsUserId.trim() || !creditsAmount.trim()) return;
    const credits = parseInt(creditsAmount, 10);
    if (isNaN(credits)) return setCreditsStatus('❌ Invalid credits amount');
    setCreditsLoading(true);
    setCreditsStatus(null);
    try {
      const res = await fetch(`/api/admin/users/${creditsUserId}/add-credits`, {
        method: 'POST',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify({ credits }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setCreditsStatus(`✅ Added ${credits} credits to ${creditsUserId}`);
    } catch (err) {
      setCreditsStatus(`❌ Error: ${(err as Error).message}`);
    } finally {
      setCreditsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">AI FUNCTIONS</h1>

      {/* Voice Synth */}
      <div className="cyber-card p-6 flex flex-col gap-4">
        <h2 className="font-cyber text-sm neon-text-blue tracking-widest">🎙 VOICE SYNTH TEST</h2>
        <form onSubmit={handleVoiceSynth} className="flex flex-col gap-3">
          <textarea
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            rows={4}
            placeholder="Enter text to synthesize..."
            className="bg-bg-darker border border-neon-blue text-white px-4 py-3 rounded font-mono resize-none focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
          <button
            type="submit"
            disabled={voiceLoading}
            className="btn-primary self-start disabled:opacity-40"
          >
            {voiceLoading ? 'GENERATING...' : 'GENERATE (FREE)'}
          </button>
          {voiceStatus && (
            <p className={`font-mono text-sm ${voiceStatus.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {voiceStatus}
            </p>
          )}
        </form>
      </div>

      {/* Credits Management */}
      <div className="cyber-card p-6 flex flex-col gap-4">
        <h2 className="font-cyber text-sm neon-text-blue tracking-widest">💎 CREDITS MANAGEMENT</h2>
        <form onSubmit={handleAddCredits} className="flex flex-col gap-3">
          <input
            type="text"
            value={creditsUserId}
            onChange={(e) => setCreditsUserId(e.target.value)}
            placeholder="User ID"
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
          <input
            type="number"
            value={creditsAmount}
            onChange={(e) => setCreditsAmount(e.target.value)}
            placeholder="Credits amount"
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
          <button
            type="submit"
            disabled={creditsLoading}
            className="btn-primary self-start disabled:opacity-40"
          >
            {creditsLoading ? 'ADDING...' : 'ADD CREDITS'}
          </button>
          {creditsStatus && (
            <p className={`font-mono text-sm ${creditsStatus.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {creditsStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
