/**
 * MetaBadge Component
 * Displays weapon/meta tier badges (SS, S, A, B, C)
 */

interface MetaBadgeProps {
  tier: 'SS' | 'S' | 'A' | 'B' | 'C';
  size?: 'sm' | 'md' | 'lg';
}

export default function MetaBadge({ tier, size = 'md' }: MetaBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };
  
  const tierColors = {
    SS: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black',
    S: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    A: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    B: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    C: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
  };
  
  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded-lg ${sizeClasses[size]} ${tierColors[tier]}`}
    >
      {tier}
    </span>
  );
}
