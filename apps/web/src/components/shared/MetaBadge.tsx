/**
 * MetaBadge Component
 * Displays weapon/meta tier badges (SS, S, A, B, C, D)
 * UPDATED: Added season and lastUpdated props for Loadout God
 */

interface MetaBadgeProps {
  tier?: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D';
  size?: 'sm' | 'md' | 'lg';
  season?: string;
  lastUpdated?: string;
}

export default function MetaBadge({ tier = 'SS', size = 'md', season, lastUpdated }: MetaBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };
  
  const tierColors = {
    SS: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black',
    S: 'bg-gradient-to-r from-nexus-orange to-red-500 text-white',
    A: 'bg-gradient-to-r from-nexus-purple to-pink-500 text-white',
    B: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    C: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
    D: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white',
  };
  
  return (
    <div className="flex flex-col items-end gap-1">
      <span
        className={`inline-flex items-center justify-center font-bold rounded-lg ${sizeClasses[size]} ${tierColors[tier]}`}
      >
        {tier}
      </span>
      {(season || lastUpdated) && (
        <div className="text-xs text-zinc-500 text-right">
          {season && <div>{season}</div>}
          {lastUpdated && <div>{lastUpdated}</div>}
        </div>
      )}
    </div>
  );
}
