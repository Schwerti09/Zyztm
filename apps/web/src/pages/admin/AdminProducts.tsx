import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { formatEuro } from '../../utils/currency';

interface Product {
  id: string;
  emoji: string;
  name: string;
  price: number;
  salesCount: number;
  revenue: number;
}

export default function AdminProducts() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const testMode = localStorage.getItem('testMode') === 'true';
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const res = await fetch('/api/admin/products', {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });

  const testPurchaseMutation = useMutation({
    mutationFn: async (productId: string) => {
      const res = await fetch('/api/admin/products/test-purchase', {
        method: 'POST',
        headers: { 'x-admin-secret': adminSecret, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, userId: 'admin-test' }),
      });
      if (!res.ok) throw new Error('Test purchase failed');
      return res.json();
    },
    onSuccess: (_, productId) => {
      setSuccessMsg(`✅ Test purchase successful for product ${productId}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">PRODUCTS</h1>

      {testMode && (
        <div className="bg-orange-900/30 border border-orange-500 rounded p-3 font-mono text-orange-300 text-sm">
          🧪 TEST MODE ACTIVE — Purchases are free
        </div>
      )}

      {successMsg && (
        <div className="bg-green-900/30 border border-green-500 rounded p-3 font-mono text-green-300 text-sm">
          {successMsg}
        </div>
      )}

      {isLoading && <p className="font-cyber neon-text-blue animate-pulse">LOADING...</p>}
      {error && <p className="text-red-400 font-mono">Error: {(error as Error).message}</p>}

      {products && (
        <div className="cyber-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neon-pink/30">
                {['', 'Name', 'Price', 'Sales', 'Revenue', 'Actions'].map((h) => (
                  <th key={h} className="font-cyber text-xs text-neon-blue tracking-widest text-left px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-xl">{product.emoji}</td>
                  <td className="px-4 py-3 font-mono text-gray-300">{product.name}</td>
                  <td className="px-4 py-3 font-mono text-neon-gold">
                    {formatEuro(product.price)}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-400">{product.salesCount}</td>
                  <td className="px-4 py-3 font-mono text-green-400">
                    {formatEuro(product.revenue)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => testPurchaseMutation.mutate(product.id)}
                      disabled={testPurchaseMutation.isPending}
                      className="btn-secondary text-xs px-3 py-1 disabled:opacity-40"
                    >
                      TEST PURCHASE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
