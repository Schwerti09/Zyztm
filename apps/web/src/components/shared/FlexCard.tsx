/**
 * FlexCard Component
 * Shareable card for Loadout God with branding
 */

import type { Loadout } from '../../lib/shared-types';

interface FlexCardProps {
  loadout: Loadout;
  username?: string;
  nexusScore?: number;
}

export default function FlexCard({ loadout, username, nexusScore }: FlexCardProps) {
  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 border-2 border-orange-500/50 rounded-2xl p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-bold tracking-widest text-orange-400">
          NEXUS LOADOUT GOD
        </div>
        <div className="text-xs text-white/40">
          THE COMMAND CENTER
        </div>
      </div>
      
      {/* Loadout Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-1">{loadout.title}</h2>
        <p className="text-white/60 text-sm">{loadout.subtitle}</p>
      </div>
      
      {/* Slots */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {loadout.slots.map((slot, index) => (
          <div
            key={index}
            className="bg-black/30 border border-white/10 rounded-lg p-2 text-center"
          >
            <div className="text-xs text-white/40 mb-1">Slot {slot.slotNumber}</div>
            <div className="text-sm font-bold text-white truncate">{slot.itemName}</div>
            <div className={`text-xs ${
              slot.rarity === 'Mythic' ? 'text-yellow-400' :
              slot.rarity === 'Legendary' ? 'text-orange-400' :
              slot.rarity === 'Epic' ? 'text-purple-400' :
              'text-white/60'
            }`}>
              {slot.rarity}
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-white/40">Win Rate:</span>
          <span className="text-white font-bold ml-2">{loadout.projectedWinrate}%</span>
        </div>
        <div>
          <span className="text-white/40">Flex Score:</span>
          <span className="text-orange-400 font-bold ml-2">{loadout.flexScore}/100</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        {username && (
          <div className="text-xs text-white/40">
            Generated for: <span className="text-white">{username}</span>
          </div>
        )}
        {nexusScore !== undefined && (
          <div className="text-xs text-white/40">
            Nexus Score: <span className="text-orange-400 font-bold">{nexusScore}</span>
          </div>
        )}
        <div className="text-xs text-white/20">
          fortnitenexus.space
        </div>
      </div>
    </div>
  );
}
