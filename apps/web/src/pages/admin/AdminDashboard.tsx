import { useQuery } from '@tanstack/react-query';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatEuro } from '../../utils/currency';

interface SalesStats {
  totalRevenue: number;
  totalSales: number;
  todaySales: number;
  monthlySales: number;
  revenueByDay: { date: string; revenue: number }[];
  salesByProduct: { name: string; sales: number }[];
}

function KpiCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <div className="cyber-card p-6 flex flex-col gap-2">
      <span className="text-2xl">{icon}</span>
      <p className="font-cyber text-xs text-gray-400 tracking-widest">{label}</p>
      <p className="font-cyber text-2xl neon-text-pink">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const adminSecret = localStorage.getItem('adminSecret') || '';
  const { data: stats, isLoading, error } = useQuery<SalesStats>({
    queryKey: ['admin-sales-stats'],
    queryFn: async () => {
      const res = await fetch('/api/admin/sales/stats', {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="font-cyber neon-text-blue animate-pulse">LOADING...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cyber-card p-6">
        <p className="text-red-400 font-mono">Error: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-cyber text-2xl neon-text-pink tracking-widest">DASHBOARD</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon="💰" label="TOTAL REVENUE" value={formatEuro(stats?.totalRevenue ?? 0)} />
        <KpiCard icon="🛒" label="TOTAL SALES" value={stats?.totalSales ?? 0} />
        <KpiCard icon="📅" label="TODAY'S SALES" value={stats?.todaySales ?? 0} />
        <KpiCard icon="📆" label="MONTHLY SALES" value={stats?.monthlySales ?? 0} />
      </div>

      {/* Revenue Line Chart */}
      <div className="cyber-card p-6">
        <h2 className="font-cyber text-sm neon-text-blue tracking-widest mb-4">
          REVENUE LAST 30 DAYS
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={stats?.revenueByDay ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,242,255,0.1)" />
            <XAxis dataKey="date" stroke="#666" tick={{ fill: '#666', fontSize: 10 }} />
            <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 10 }} tickFormatter={(v) => `€${(v / 100).toFixed(0)}`} />
            <Tooltip
              contentStyle={{ background: '#0d1117', border: '1px solid #ff0055', color: '#fff' }}
              formatter={(v: number | undefined) => [`€${((v ?? 0) / 100).toFixed(2)}`, 'Revenue']}
            />
            <Line type="monotone" dataKey="revenue" stroke="#ff0055" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by Product Bar Chart */}
      <div className="cyber-card p-6">
        <h2 className="font-cyber text-sm neon-text-blue tracking-widest mb-4">
          SALES BY PRODUCT
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats?.salesByProduct ?? []}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,242,255,0.1)" />
            <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666', fontSize: 10 }} />
            <YAxis stroke="#666" tick={{ fill: '#666', fontSize: 10 }} />
            <Tooltip
              contentStyle={{ background: '#0d1117', border: '1px solid #00f2ff', color: '#fff' }}
            />
            <Bar dataKey="sales" fill="#00f2ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
