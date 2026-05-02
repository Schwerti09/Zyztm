/**
 * Register Page
 * User registration form
 */

import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(email, password, username);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm border border-zinc-800">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Registrieren
          </h1>
          <p className="text-zinc-400 text-center mb-8">
            Erstelle dein kostenloses Konto bei Fortnite Nexus
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-300 text-sm font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-nexus-orange transition"
                placeholder="Dein Username"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-nexus-orange transition"
                placeholder="deine@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-300 text-sm font-semibold mb-2">
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-nexus-orange transition"
                placeholder="Mindestens 8 Zeichen"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-nexus-orange to-nexus-purple text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registrieren...' : 'Registrieren'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm">
              Bereits ein Konto?{' '}
              <Link href="/login" className="text-nexus-orange hover:underline font-semibold">
                Einloggen
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
