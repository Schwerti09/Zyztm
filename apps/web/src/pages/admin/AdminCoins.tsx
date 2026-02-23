import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../../components/Toast';

interface GiveCoinsResult {
  success: boolean;
  userId: string;
  email: string;
  coins: number;
}

export default function AdminCoins() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const giveMutation = useMutation<GiveCoinsResult, Error, { email: string; amount: number; reason: string }>({
    mutationFn: async (payload) => {
      const res = await fetch('/api/admin/coins/give', {
        method: 'POST',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(err.error || 'Request failed');
      }
      return res.json();
    },
    onSuccess: (data) => {
      showToast({ type: 'success', message: `✅ ${data.coins} Coins an ${data.email} vergeben!` });
      setEmail('');
      setAmount('');
      setReason('');
    },
    onError: (err) => {
      showToast({ type: 'error', message: `❌ Fehler: ${err.message}` });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(amount, 10);
    if (!email.trim() || isNaN(parsed) || parsed <= 0 || !reason.trim()) return;
    giveMutation.mutate({ email: email.trim().toLowerCase(), amount: parsed, reason: reason.trim() });
  };

  return (
    <div className="flex flex-col gap-8 max-w-lg">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">💎 JOJOJO COINS VERGEBEN</h1>

      <form onSubmit={handleSubmit} className="cyber-card p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-cyber text-xs text-neon-blue tracking-widest">E-MAIL DES USERS</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            required
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-cyber text-xs text-neon-blue tracking-widest">ANZAHL COINS</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="z.B. 100"
            min={1}
            required
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-cyber text-xs text-neon-blue tracking-widest">GRUND</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="z.B. Gewinner Giveaway"
            required
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
        </div>

        <button
          type="submit"
          disabled={giveMutation.isPending}
          className="btn-primary w-full font-cyber text-xs tracking-widest disabled:opacity-40"
          style={{ borderColor: '#ff0055', color: '#ff0055' }}
        >
          {giveMutation.isPending ? '⏳ WIRD GESENDET...' : '💎 COINS VERGEBEN'}
        </button>

        {giveMutation.isSuccess && giveMutation.data && (
          <div
            className="p-3 rounded font-mono text-xs border"
            style={{ borderColor: '#00f2ff40', color: '#00f2ff', background: 'rgba(0,242,255,0.05)' }}
          >
            ✅ Neuer Kontostand von <strong>{giveMutation.data.email}</strong>:{' '}
            <strong style={{ color: '#ff0055' }}>{giveMutation.data.coins} Coins</strong>
          </div>
        )}
      </form>

      <div
        className="cyber-card p-4 text-xs font-mono"
        style={{ borderColor: '#ffd70030', color: '#ffd700' }}
      >
        <p className="font-cyber tracking-widest mb-2">ℹ️ HINWEISE</p>
        <ul className="list-disc list-inside space-y-1 text-white/60">
          <li>Neue Benutzer werden automatisch angelegt (erster Kontakt).</li>
          <li>Jede Vergabe wird in der Transaktionshistorie gespeichert.</li>
          <li>Coins können nicht negativ werden (nur Vergabe möglich).</li>
        </ul>
      </div>
    </div>
  );
}
