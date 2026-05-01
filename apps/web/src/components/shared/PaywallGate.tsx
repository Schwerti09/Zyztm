/**
 * PaywallGate Component
 * Shared component for Pro/Elite feature gates
 * UPDATED: Added 'free' tier support (no gate for free tier)
 */

interface PaywallGateProps {
  children: React.ReactNode;
  requiredTier?: 'free' | 'pro' | 'elite';
  fallback?: React.ReactNode;
}

export default function PaywallGate({ 
  children, 
  requiredTier = 'pro',
  fallback 
}: PaywallGateProps) {
  // Free tier: no gate, always show children
  if (requiredTier === 'free') {
    return <>{children}</>;
  }
  
  // Check if user has access (placeholder logic)
  const hasAccess = requiredTier === 'elite' ? false : true;
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Default fallback
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl">
      <div className="text-4xl mb-4">🔒</div>
      <h3 className="text-xl font-bold text-white mb-2">
        {requiredTier === 'elite' ? 'Elite Feature' : 'Pro Feature'}
      </h3>
      <p className="text-white/60 text-sm mb-4">
        Upgrade to {requiredTier === 'elite' ? 'Elite' : 'Pro'} to unlock this feature.
      </p>
      <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold text-white">
        Upgrade Now
      </button>
    </div>
  );
}
