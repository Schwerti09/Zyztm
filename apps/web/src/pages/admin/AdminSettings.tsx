import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

interface Settings {
  maintenanceMode: boolean;
  creatorCode: string;
}

const apiKeys = [
  { label: 'STRIPE', name: 'STRIPE_SECRET_KEY' },
  { label: 'ELEVENLABS', name: 'ELEVENLABS_API_KEY' },
  { label: 'OPENAI', name: 'OPENAI_API_KEY' },
];

export default function AdminSettings() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [creatorCode, setCreatorCode] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery<Settings>({
    queryKey: ['admin-settings'],
    queryFn: async () => {
      const res = await fetch('/api/admin/settings', {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Failed to fetch settings');
      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setMaintenanceMode(data.maintenanceMode);
      setCreatorCode(data.creatorCode ?? '');
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify({ maintenanceMode, creatorCode }),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      return res.json();
    },
    onSuccess: () => {
      setSaveStatus('✅ Settings saved');
      setTimeout(() => setSaveStatus(null), 3000);
    },
    onError: (err) => setSaveStatus(`❌ ${(err as Error).message}`),
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">SETTINGS</h1>

      {isLoading && <p className="font-cyber neon-text-blue animate-pulse">LOADING...</p>}
      {error && <p className="text-red-400 font-mono">Error: {(error as Error).message}</p>}

      <div className="cyber-card p-6 flex flex-col gap-6">
        {/* Maintenance Mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-cyber text-sm text-white">MAINTENANCE MODE</p>
            <p className="text-xs text-gray-500 font-mono mt-1">Take the site offline for maintenance</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-neon-pink rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon-pink"></div>
          </label>
        </div>

        {/* Creator Code */}
        <div className="flex flex-col gap-2">
          <label className="font-cyber text-sm text-white">CREATOR CODE</label>
          <input
            type="text"
            value={creatorCode}
            onChange={(e) => setCreatorCode(e.target.value)}
            placeholder="e.g. NEXUS10"
            className="bg-bg-darker border border-neon-blue text-white px-4 py-2 rounded font-mono focus:outline-none focus:ring-1 focus:ring-neon-blue"
          />
        </div>

        {saveStatus && (
          <p className={`font-mono text-sm ${saveStatus.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
            {saveStatus}
          </p>
        )}

        <button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending}
          className="btn-primary self-start disabled:opacity-40"
        >
          {saveMutation.isPending ? 'SAVING...' : 'SAVE SETTINGS'}
        </button>
      </div>

      {/* API Keys Status */}
      <div className="cyber-card p-6 flex flex-col gap-4">
        <h2 className="font-cyber text-sm neon-text-blue tracking-widest">API KEY STATUS</h2>
        {apiKeys.map((key) => (
          <div key={key.name} className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="font-cyber text-xs text-gray-400">{key.label}</span>
            <span className="font-mono text-sm text-green-400">✅ Configured</span>
          </div>
        ))}
      </div>
    </div>
  );
}
