import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) {
      setError('Secret is required');
      return;
    }
    localStorage.setItem('adminSecret', secret);
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="cyber-card p-10 w-full max-w-md"
      >
        <h1 className="font-cyber text-3xl neon-text-pink text-center mb-8 tracking-widest">
          NEXUS ADMIN
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-cyber text-xs text-neon-blue tracking-widest">
            ADMIN SECRET
          </label>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="bg-bg-darker border border-neon-pink text-white px-4 py-3 rounded font-mono focus:outline-none focus:ring-2 focus:ring-neon-pink"
            placeholder="••••••••••••"
          />
          {error && (
            <p className="text-red-400 text-sm font-mono">{error}</p>
          )}
          <button type="submit" className="btn-primary mt-2">
            AUTHENTICATE
          </button>
        </form>
      </motion.div>
    </div>
  );
}
