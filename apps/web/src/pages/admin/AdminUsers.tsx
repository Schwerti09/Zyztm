import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  email: string;
  credits: number;
  isBanned: boolean;
  createdAt: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminUsers() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ['admin-users', page, search],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/users?${params}`, {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
  });

  const banMutation = useMutation({
    mutationFn: async ({ id, isBanned }: { id: string; isBanned: boolean }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify({ isBanned }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const creditsMutation = useMutation({
    mutationFn: async ({ id, credits }: { id: string; credits: number }) => {
      const res = await fetch(`/api/admin/users/${id}/add-credits`, {
        method: 'POST',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify({ credits }),
      });
      if (!res.ok) throw new Error('Failed to add credits');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleAddCredits = (user: User) => {
    const input = window.prompt(`Add credits to ${user.email}:`);
    if (input === null) return;
    const credits = parseInt(input, 10);
    if (isNaN(credits)) return alert('Invalid number');
    creditsMutation.mutate({ id: user.id, credits });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">USERS</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by email..."
          className="flex-1 bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
        />
        <button type="submit" className="btn-secondary px-6">SEARCH</button>
      </form>

      {isLoading && <p className="font-cyber neon-text-blue animate-pulse">LOADING...</p>}
      {error && <p className="text-red-400 font-mono">Error: {(error as Error).message}</p>}

      {data && (
        <>
          <div className="cyber-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neon-pink/30">
                  {['Email', 'Credits', 'Status', 'Created', 'Actions'].map((h) => (
                    <th key={h} className="font-cyber text-xs text-neon-blue tracking-widest text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-800 hover:bg-white/5 transition-colors ${
                      user.isBanned ? 'bg-red-900/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 font-mono text-neon-gold">{user.credits}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-cyber text-xs px-2 py-1 rounded ${
                          user.isBanned
                            ? 'bg-red-900/40 text-red-400 border border-red-500'
                            : 'bg-green-900/40 text-green-400 border border-green-500'
                        }`}
                      >
                        {user.isBanned ? 'BANNED' : 'ACTIVE'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleAddCredits(user)}
                        className="btn-secondary text-xs px-3 py-1"
                      >
                        CREDITS +
                      </button>
                      <button
                        onClick={() => banMutation.mutate({ id: user.id, isBanned: !user.isBanned })}
                        className={`text-xs px-3 py-1 rounded font-cyber border transition-colors ${
                          user.isBanned
                            ? 'border-green-500 text-green-400 hover:bg-green-500/10'
                            : 'border-red-500 text-red-400 hover:bg-red-500/10'
                        }`}
                      >
                        {user.isBanned ? 'UNBAN' : 'BAN'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn-secondary px-4 disabled:opacity-40"
            >
              ← PREV
            </button>
            <span className="font-cyber text-xs text-gray-400">
              PAGE {page} / {data.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= data.totalPages}
              className="btn-secondary px-4 disabled:opacity-40"
            >
              NEXT →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
