import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatEuro } from '../../utils/currency';

interface Sale {
  id: string;
  createdAt: string;
  userEmail: string;
  productId: string;
  amount: number;
  status: 'completed' | 'pending' | 'refunded';
}

interface SalesResponse {
  sales: Sale[];
  total: number;
  page: number;
  totalPages: number;
}

const statusBadge: Record<Sale['status'], string> = {
  completed: 'bg-green-900/40 text-green-400 border-green-500',
  pending: 'bg-yellow-900/40 text-yellow-400 border-yellow-500',
  refunded: 'bg-red-900/40 text-red-400 border-red-500',
};

export default function AdminSales() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<SalesResponse>({
    queryKey: ['admin-sales', page],
    queryFn: async () => {
      const res = await fetch(`/api/admin/sales?page=${page}&limit=20`, {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Failed to fetch sales');
      return res.json();
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/sales/${id}/refund`, {
        method: 'POST',
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Refund failed');
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-sales'] }),
  });

  const [exportError, setExportError] = useState<string | null>(null);

  const handleExportCsv = async () => {
    setExportError(null);
    try {
      const res = await fetch('/api/admin/analytics/export', {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error(`Export failed (HTTP ${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sales-export.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setExportError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">SALES</h1>
        <button onClick={handleExportCsv} className="btn-secondary text-xs px-4 py-2">
          📥 EXPORT CSV
        </button>
      </div>

      {isLoading && <p className="font-cyber neon-text-blue animate-pulse">LOADING...</p>}
      {error && <p className="text-red-400 font-mono">Error: {(error as Error).message}</p>}
      {exportError && <p className="text-red-400 font-mono">Export error: {exportError}</p>}

      {data && (
        <>
          <div className="cyber-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neon-pink/30">
                  {['Date', 'User Email', 'Product ID', 'Amount', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="font-cyber text-xs text-neon-blue tracking-widest text-left px-4 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-gray-500 text-xs">
                      {new Date(sale.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono text-gray-300">{sale.userEmail}</td>
                    <td className="px-4 py-3 font-mono text-gray-400 text-xs">{sale.productId}</td>
                    <td className="px-4 py-3 font-mono text-neon-gold">
                      {formatEuro(sale.amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-cyber text-xs px-2 py-1 rounded border ${statusBadge[sale.status]}`}
                      >
                        {sale.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {sale.status === 'completed' && (
                        <button
                          onClick={() => refundMutation.mutate(sale.id)}
                          disabled={refundMutation.isPending}
                          className="text-xs px-3 py-1 rounded font-cyber border border-red-500 text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                        >
                          REFUND
                        </button>
                      )}
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
