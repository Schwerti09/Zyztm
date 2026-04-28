import React, { useState } from 'react';
import { WEAPONS, Weapon } from '../data/weapons-data';
import './TierListBuilder.css';

const TierListBuilder: React.FC = () => {
  const [tiers, setTiers] = useState({
    S: [] as Weapon[],
    A: [] as Weapon[],
    B: [] as Weapon[],
    C: [] as Weapon[],
    D: [] as Weapon[],
    pool: [...WEAPONS]
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceTier = source.droppableId as keyof typeof tiers;
    const destTier = destination.droppableId as keyof typeof tiers;

    const sourceIndex = source.index;
    const destIndex = destination.index;

    const newTiers = { ...tiers };
    if (newTiers[sourceTier]) {
      const [movedWeapon] = newTiers[sourceTier].splice(sourceIndex, 1);
      if (newTiers[destTier]) {
        newTiers[destTier].splice(destIndex, 0, movedWeapon);
      }
    }

    setTiers(newTiers);
  };

  const resetTiers = () => {
    setTiers({
      S: [],
      A: [],
      B: [],
      C: [],
      D: [],
      pool: [...WEAPONS]
    });
  };

  const assignedCount = Object.values(tiers).flat().length - tiers.pool.length;

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      S: '#EF4444',
      A: '#F59E0B',
      B: '#22C55E',
      C: '#3B82F6',
      D: '#9CA3AF'
    };
    return colors[tier] || '#9CA3AF';
  };

  const shareTierList = () => {
    const tierData = Object.entries(tiers)
      .filter(([key]) => key !== 'pool')
      .map(([tier, weapons]) => `${tier.toLowerCase()}:${weapons.map(w => w.id).join(',')}`)
      .join(';');

    const url = `${window.location.origin}${window.location.pathname}?tl=${encodeURIComponent(tierData)}`;
    navigator.clipboard.writeText(url);
    alert('Tier-List URL kopiert!');
  };

  return (
    <div className="tier-list-builder">
      <div className="header">
        <h1>🏆 Tier-List Builder</h1>
        <p>Erstelle deine eigene Fortnite Waffen Tier-List</p>
        <div className="stats">
          <span>{assignedCount} von {WEAPONS.length} Waffen eingeordnet</span>
        </div>
      </div>

      <div className="tiers-container">
        {(['S', 'A', 'B', 'C', 'D'] as const).map(tier => (
          <div key={tier} className="tier" style={{ borderColor: getTierColor(tier) }}>
            <div className="tier-header" style={{ backgroundColor: getTierColor(tier) }}>
              <h2>{tier}-Tier</h2>
              <span>{tiers[tier].length} Waffen</span>
            </div>
            <div className="tier-content">
              {tiers[tier].map((weapon, index) => (
                <div
                  key={weapon.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', JSON.stringify({ weaponId: weapon.id, sourceTier: tier, index }));
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                    onDragEnd({ source: { droppableId: data.sourceTier, index: data.index }, destination: { droppableId: tier, index: tiers[tier].length } });
                  }}
                  className="weapon-item"
                >
                  <img src={weapon.imageUrl} alt={weapon.name} />
                  <span>{weapon.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="tier pool-tier">
          <div className="tier-header">
            <h2>Pool</h2>
            <span>{tiers.pool.length} Waffen</span>
          </div>
          <div className="tier-content">
            {tiers.pool.map((weapon, index) => (
              <div
                key={weapon.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', JSON.stringify({ weaponId: weapon.id, sourceTier: 'pool', index }));
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const data = JSON.parse(e.dataTransfer.getData('text/plain'));
                  onDragEnd({ source: { droppableId: data.sourceTier, index: data.index }, destination: { droppableId: 'pool', index: tiers.pool.length } });
                }}
                className="weapon-item"
              >
                <img src={weapon.imageUrl} alt={weapon.name} />
                <span>{weapon.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="actions">
        <button onClick={resetTiers} className="reset-button">
          🔄 Reset
        </button>
        <button onClick={shareTierList} className="share-button">
          🔗 Teilen
        </button>
      </div>
    </div>
  );
};

export default TierListBuilder;
