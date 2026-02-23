import { useLocation } from 'wouter';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { icon: '📊', label: 'Dashboard', path: '/admin' },
  { icon: '👥', label: 'Users', path: '/admin/users' },
  { icon: '🛒', label: 'Products', path: '/admin/products' },
  { icon: '💳', label: 'Sales', path: '/admin/sales' },
  { icon: '💎', label: 'Coins', path: '/admin/coins' },
  { icon: '🤖', label: 'AI Functions', path: '/admin/ai' },
  { icon: '⚙️', label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location, navigate] = useLocation();
  const testMode = localStorage.getItem('testMode') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('adminSecret');
    navigate('/');
  };

  const toggleTestMode = () => {
    localStorage.setItem('testMode', testMode ? 'false' : 'true');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg-dark flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-bg-darker border-r border-neon-pink flex flex-col z-10">
        <div className="p-6 border-b border-neon-pink">
          <h2 className="font-cyber text-lg neon-text-pink tracking-widest">⚡ NEXUS ADMIN</h2>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location === link.path;
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded text-left font-cyber text-xs tracking-wider transition-all ${
                  isActive
                    ? 'bg-neon-pink text-white'
                    : 'text-gray-400 hover:text-neon-pink hover:bg-neon-pink/10'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neon-pink flex flex-col gap-2">
          <button
            onClick={toggleTestMode}
            className={`w-full py-2 rounded font-cyber text-xs tracking-wider border ${
              testMode
                ? 'border-orange-500 text-orange-400 bg-orange-500/10'
                : 'border-gray-600 text-gray-500'
            }`}
          >
            🧪 TEST MODE {testMode ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={handleLogout}
            className="btn-secondary w-full font-cyber text-xs tracking-wider"
          >
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
