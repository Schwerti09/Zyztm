# Masterplan 5: Interaktive Fortnite-Waffen-Datenbank

## Ziel
Das meistverlinkte Tool der Fortnite-Community

## Strategie
Du bist Senior Frontend-Entwickler spezialisiert auf Gaming-Tools. Baue eine vollständige, fertig deploybare React-Komponente für fortnitenexus.space: eine interaktive Waffen-Datenbank die zum meistgenutzten Fortnite-Tool im deutschen Raum wird.

---

# [FEATURE 1] WAFFEN-DATENBANK

## Mindestens 25 Waffen mit vollständigen Stats

```typescript
// weapons-data.ts
export interface Weapon {
  id: string;
  name: string;
  type: 'AR' | 'SMG' | 'Shotgun' | 'Sniper' | 'Pistol' | 'Explosive';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  damage: number;
  fireRate: number; // shots per second
  reloadTime: number; // seconds
  magSize: number;
  dps: number; // calculated
  range: number; // meters
  headshotMultiplier: number;
  tier: 'S' | 'A' | 'B' | 'C' | 'D';
  imageUrl: string;
  description: string;
}

export const WEAPONS: Weapon[] = [
  {
    id: 'ar-assault',
    name: 'Assault Rifle',
    type: 'AR',
    rarity: 'Rare',
    damage: 33,
    fireRate: 5.5,
    reloadTime: 2.2,
    magSize: 30,
    dps: 181.5,
    range: 50,
    headshotMultiplier: 2.0,
    tier: 'S',
    imageUrl: '/images/weapons/ar-assault.png',
    description: 'Standard Assault Rifle mit ausgeglichener Performance'
  },
  {
    id: 'ar-heavy',
    name: 'Heavy Assault Rifle',
    type: 'AR',
    rarity: 'Epic',
    damage: 44,
    fireRate: 4.0,
    reloadTime: 2.5,
    magSize: 25,
    dps: 176,
    range: 60,
    headshotMultiplier: 2.0,
    tier: 'S',
    imageUrl: '/images/weapons/ar-heavy.png',
    description: 'Hoher Damage, langsamere Fire Rate'
  },
  {
    id: 'ar-burst',
    name: 'Burst Assault Rifle',
    type: 'AR',
    rarity: 'Epic',
    damage: 36,
    fireRate: 6.0,
    reloadTime: 2.3,
    magSize: 30,
    dps: 216,
    range: 55,
    headshotMultiplier: 2.0,
    tier: 'A',
    imageUrl: '/images/weapons/ar-burst.png',
    description: 'Burst-Feuer für präzise Shots'
  },
  {
    id: 'smg-tactical',
    name: 'Tactical SMG',
    type: 'SMG',
    rarity: 'Rare',
    damage: 19,
    fireRate: 9.0,
    reloadTime: 1.8,
    magSize: 35,
    dps: 171,
    range: 25,
    headshotMultiplier: 1.5,
    tier: 'A',
    imageUrl: '/images/weapons/smg-tactical.png',
    description: 'Schnell, hohe Fire Rate, geringer Damage'
  },
  {
    id: 'smg-submachine',
    name: 'Submachine Gun',
    type: 'SMG',
    rarity: 'Uncommon',
    damage: 23,
    fireRate: 7.5,
    reloadTime: 2.0,
    magSize: 30,
    dps: 172.5,
    range: 20,
    headshotMultiplier: 1.5,
    tier: 'B',
    imageUrl: '/images/weapons/smg-submachine.png',
    description: 'Balance zwischen Damage und Fire Rate'
  },
  {
    id: 'shotgun-pump',
    name: 'Pump Shotgun',
    type: 'Shotgun',
    rarity: 'Rare',
    damage: 90,
    fireRate: 0.8,
    reloadTime: 3.0,
    magSize: 5,
    dps: 72,
    range: 8,
    headshotMultiplier: 1.5,
    tier: 'A',
    imageUrl: '/images/weapons/shotgun-pump.png',
    description: 'Hoher Damage, langsam, klassisch'
  },
  {
    id: 'shotgun-tactical',
    name: 'Tactical Shotgun',
    type: 'Shotgun',
    rarity: 'Epic',
    damage: 75,
    fireRate: 1.2,
    reloadTime: 2.5,
    magSize: 8,
    dps: 90,
    range: 10,
    headshotMultiplier: 1.5,
    tier: 'S',
    imageUrl: '/images/weapons/shotgun-tactical.png',
    description: 'Schneller als Pump, etwas weniger Damage'
  },
  {
    id: 'shotgun-combat',
    name: 'Combat Shotgun',
    type: 'Shotgun',
    rarity: 'Legendary',
    damage: 85,
    fireRate: 1.5,
    reloadTime: 2.2,
    magSize: 10,
    dps: 127.5,
    range: 12,
    headshotMultiplier: 1.5,
    tier: 'S',
    imageUrl: '/images/weapons/shotgun-combat.png',
    description: 'Beste Shotgun im Spiel'
  },
  {
    id: 'sniper-bolt',
    name: 'Bolt-Action Sniper',
    type: 'Sniper',
    rarity: 'Rare',
    damage: 105,
    fireRate: 0.6,
    reloadTime: 3.5,
    magSize: 5,
    dps: 63,
    range: 200,
    headshotMultiplier: 2.5,
    tier: 'A',
    imageUrl: '/images/weapons/sniper-bolt.png',
    description: 'Hoher Damage, langsamer Reload'
  },
  {
    id: 'sniper-semi',
    name: 'Semi-Auto Sniper',
    type: 'Sniper',
    rarity: 'Epic',
    damage: 88,
    fireRate: 1.0,
    reloadTime: 3.0,
    magSize: 5,
    dps: 88,
    range: 180,
    headshotMultiplier: 2.0,
    tier: 'A',
    imageUrl: '/images/weapons/sniper-semi.png',
    description: 'Schneller als Bolt, weniger Damage'
  },
  {
    id: 'sniper-heavy',
    name: 'Heavy Sniper',
    type: 'Sniper',
    rarity: 'Legendary',
    damage: 116,
    fireRate: 0.5,
    reloadTime: 4.0,
    magSize: 5,
    dps: 58,
    range: 250,
    headshotMultiplier: 2.5,
    tier: 'S',
    imageUrl: '/images/weapons/sniper-heavy.png',
    description: 'Höchster Damage im Spiel'
  },
  {
    id: 'pistol-standard',
    name: 'Standard Pistol',
    type: 'Pistol',
    rarity: 'Common',
    damage: 20,
    fireRate: 6.0,
    reloadTime: 1.5,
    magSize: 16,
    dps: 120,
    range: 30,
    headshotMultiplier: 2.0,
    tier: 'C',
    imageUrl: '/images/weapons/pistol-standard.png',
    description: 'Basic Pistol, früh im Spiel'
  },
  {
    id: 'pistol-suppressed',
    name: 'Suppressed Pistol',
    type: 'Pistol',
    rarity: 'Rare',
    damage: 24,
    fireRate: 5.5,
    reloadTime: 1.8,
    magSize: 16,
    dps: 132,
    range: 35,
    headshotMultiplier: 2.0,
    tier: 'B',
    imageUrl: '/images/weapons/pistol-suppressed.png',
    description: 'Leiser, etwas mehr Damage'
  },
  {
    id: 'pistol-hand',
    name: 'Hand Cannon',
    type: 'Pistol',
    rarity: 'Epic',
    damage: 74,
    fireRate: 1.2,
    reloadTime: 2.0,
    magSize: 8,
    dps: 88.8,
    range: 40,
    headshotMultiplier: 2.0,
    tier: 'A',
    imageUrl: '/images/weapons/pistol-hand.png',
    description: 'Hoher Damage wie Shotgun'
  },
  {
    id: 'explosive-rocket',
    name: 'Rocket Launcher',
    type: 'Explosive',
    rarity: 'Rare',
    damage: 110,
    fireRate: 0.4,
    reloadTime: 3.0,
    magSize: 1,
    dps: 44,
    range: 100,
    headshotMultiplier: 1.0,
    tier: 'A',
    imageUrl: '/images/weapons/explosive-rocket.png',
    description: 'Massiver AOE Damage'
  },
  {
    id: 'explosive-grenade',
    name: 'Grenade Launcher',
    type: 'Explosive',
    rarity: 'Epic',
    damage: 85,
    fireRate: 0.8,
    reloadTime: 2.5,
    magSize: 6,
    dps: 68,
    range: 80,
    headshotMultiplier: 1.0,
    tier: 'B',
    imageUrl: '/images/weapons/explosive-grenade.png',
    description: 'Mehrere Granaten, weniger Damage'
  },
  {
    id: 'explosine-rpg',
    name: 'RPG',
    type: 'Explosive',
    rarity: 'Legendary',
    damage: 135,
    fireRate: 0.3,
    reloadTime: 3.5,
    magSize: 1,
    dps: 40.5,
    range: 120,
    headshotMultiplier: 1.0,
    tier: 'S',
    imageUrl: '/images/weapons/explosive-rpg.png',
    description: 'Höchster Explosive Damage'
  },
  {
    id: 'ar-famas',
    name: 'FAMAS',
    type: 'AR',
    rarity: 'Uncommon',
    damage: 29,
    fireRate: 6.5,
    reloadTime: 2.1,
    magSize: 30,
    dps: 188.5,
    range: 45,
    headshotMultiplier: 2.0,
    tier: 'A',
    imageUrl: '/images/weapons/ar-famas.png',
    description: 'Hohe Fire Rate, geringer Damage'
  },
  {
    id: 'ar-sc',
    name: 'SCAR',
    type: 'AR',
    rarity: 'Epic',
    damage: 37,
    fireRate: 5.0,
    reloadTime: 2.3,
    magSize: 30,
    dps: 185,
    range: 55,
    headshotMultiplier: 2.0,
    tier: 'S',
    imageUrl: '/images/weapons/ar-sc.png',
    description: 'Ausgewogene Performance'
  },
  {
    id: 'smg-mp5',
    name: 'MP5',
    type: 'SMG',
    rarity: 'Epic',
    damage: 22,
    fireRate: 10.0,
    reloadTime: 1.6,
    magSize: 35,
    dps: 220,
    range: 22,
    headshotMultiplier: 1.5,
    tier: 'S',
    imageUrl: '/images/weapons/smg-mp5.png',
    description: 'Höchste Fire Rate unter SMGs'
  },
  {
    id: 'shotgun-drum',
    name: 'Drum Shotgun',
    type: 'Shotgun',
    rarity: 'Legendary',
    damage: 80,
    fireRate: 1.8,
    reloadTime: 2.8,
    magSize: 12,
    dps: 144,
    range: 10,
    headshotMultiplier: 1.5,
    tier: 'S',
    imageUrl: '/images/weapons/shotgun-drum.png',
    description: 'Hohe Mag Size, schnell'
  },
  {
    id: 'sniper-hunting',
    name: 'Hunting Rifle',
    type: 'Sniper',
    rarity: 'Uncommon',
    damage: 90,
    fireRate: 0.7,
    reloadTime: 3.2,
    magSize: 5,
    dps: 63,
    range: 150,
    headshotMultiplier: 2.0,
    tier: 'B',
    imageUrl: '/images/weapons/sniper-hunting.png',
    description: 'Basic Sniper, früh im Spiel'
  },
  {
    id: 'explosive-c4',
    name: 'C4',
    type: 'Explosive',
    rarity: 'Rare',
    damage: 200,
    fireRate: 0.2,
    reloadTime: 5.0,
    magSize: 1,
    dps: 40,
    range: 50,
    headshotMultiplier: 1.0,
    tier: 'B',
    imageUrl: '/images/weapons/explosive-c4.png',
    description: 'Massiver Damage, langsam'
  },
  {
    id: 'pistol-flint',
    name: 'Flintlock Pistol',
    type: 'Pistol',
    rarity: 'Legendary',
    damage: 90,
    fireRate: 0.5,
    reloadTime: 2.0,
    magSize: 1,
    dps: 45,
    range: 35,
    headshotMultiplier: 2.0,
    tier: 'A',
    imageUrl: '/images/weapons/pistol-flint.png',
    description: 'Hoher Damage, aber langsam'
  }
];
```

## Responsive Karten-Layout

```tsx
// WeaponDatabase.tsx
import React, { useState, useMemo } from 'react';
import { WEAPONS, Weapon } from './weapons-data';

const WeaponDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRarity, setFilterRarity] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dps' | 'damage' | 'fireRate'>('dps');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [compareWeapons, setCompareWeapons] = useState<Set<string>>(new Set());

  const filteredWeapons = useMemo(() => {
    return WEAPONS.filter(weapon => {
      const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || weapon.type === filterType;
      const matchesRarity = filterRarity === 'all' || weapon.rarity === filterRarity;
      const matchesTier = filterTier === 'all' || weapon.tier === filterTier;
      return matchesSearch && matchesType && matchesRarity && matchesTier;
    }).sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      return (aValue - bValue) * multiplier;
    });
  }, [searchTerm, filterType, filterRarity, filterTier, sortBy, sortOrder]);

  const toggleCompare = (weaponId: string) => {
    const newCompare = new Set(compareWeapons);
    if (newCompare.has(weaponId)) {
      newCompare.delete(weaponId);
    } else if (newCompare.size < 3) {
      newCompare.add(weaponId);
    }
    setCompareWeapons(newCompare);
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      Common: '#9CA3AF',
      Uncommon: '#22C55E',
      Rare: '#3B82F6',
      Epic: '#A855F7',
      Legendary: '#F59E0B'
    };
    return colors[rarity as keyof typeof colors] || '#9CA3AF';
  };

  const getTierColor = (tier: string) => {
    const colors = {
      S: '#EF4444',
      A: '#F59E0B',
      B: '#22C55E',
      C: '#3B82F6',
      D: '#9CA3AF'
    };
    return colors[tier as keyof typeof colors] || '#9CA3AF';
  };

  return (
    <div className="weapon-database">
      {/* Header */}
      <div className="header">
        <h1>🎮 Fortnite Waffen-Datenbank</h1>
        <p>Interaktive Datenbank mit 25+ Waffen und Live-Filter</p>
      </div>

      {/* Search & Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Suche Waffen..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">Alle Typen</option>
          <option value="AR">Assault Rifles</option>
          <option value="SMG">SMGs</option>
          <option value="Shotgun">Shotguns</option>
          <option value="Sniper">Snipers</option>
          <option value="Pistol">Pistols</option>
          <option value="Explosive">Explosive</option>
        </select>

        <select
          value={filterRarity}
          onChange={(e) => setFilterRarity(e.target.value)}
          className="filter-select"
        >
          <option value="all">Alle Seltenheiten</option>
          <option value="Common">Common</option>
          <option value="Uncommon">Uncommon</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
        </select>

        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value)}
          className="filter-select"
        >
          <option value="all">Alle Tiers</option>
          <option value="S">S-Tier</option>
          <option value="A">A-Tier</option>
          <option value="B">B-Tier</option>
          <option value="C">C-Tier</option>
          <option value="D">D-Tier</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="filter-select"
        >
          <option value="dps">Sortieren: DPS</option>
          <option value="damage">Sortieren: Damage</option>
          <option value="fireRate">Sortieren: Fire Rate</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="sort-button"
        >
          {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
      </div>

      {/* Weapon Grid */}
      <div className="weapon-grid">
        {filteredWeapons.map(weapon => (
          <div key={weapon.id} className="weapon-card">
            <div className="weapon-header">
              <img src={weapon.imageUrl} alt={weapon.name} className="weapon-image" />
              <div className="weapon-info">
                <h3>{weapon.name}</h3>
                <div className="badges">
                  <span className="badge rarity" style={{ backgroundColor: getRarityColor(weapon.rarity) }}>
                    {weapon.rarity}
                  </span>
                  <span className="badge tier" style={{ backgroundColor: getTierColor(weapon.tier) }}>
                    {weapon.tier}-Tier
                  </span>
                </div>
              </div>
            </div>

            <p className="description">{weapon.description}</p>

            <div className="stats">
              <div className="stat">
                <span className="label">Damage:</span>
                <span className="value">{weapon.damage}</span>
              </div>
              <div className="stat">
                <span className="label">DPS:</span>
                <span className="value">{weapon.dps.toFixed(1)}</span>
              </div>
              <div className="stat">
                <span className="label">Fire Rate:</span>
                <span className="value">{weapon.fireRate.toFixed(1)}/s</span>
              </div>
              <div className="stat">
                <span className="label">Reload:</span>
                <span className="value">{weapon.reloadTime.toFixed(1)}s</span>
              </div>
              <div className="stat">
                <span className="label">Mag Size:</span>
                <span className="value">{weapon.magSize}</span>
              </div>
              <div className="stat">
                <span className="label">Range:</span>
                <span className="value">{weapon.range}m</span>
              </div>
            </div>

            <button
              onClick={() => toggleCompare(weapon.id)}
              className={`compare-button ${compareWeapons.has(weapon.id) ? 'active' : ''}`}
              disabled={compareWeapons.size >= 3 && !compareWeapons.has(weapon.id)}
            >
              {compareWeapons.has(weapon.id) ? '✓ Vergleichen' : 'Vergleichen'}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Panel */}
      {compareWeapons.size > 0 && (
        <div className="comparison-panel">
          <h2>📊 Waffen-Vergleich ({compareWeapons.size}/3)</h2>
          <div className="comparison-grid">
            {Array.from(compareWeapons).map(id => {
              const weapon = WEAPONS.find(w => w.id === id);
              if (!weapon) return null;
              return (
                <div key={weapon.id} className="comparison-card">
                  <h3>{weapon.name}</h3>
                  <div className="comparison-stats">
                    <div className="comparison-stat">
                      <span className="label">Damage:</span>
                      <div className="bar">
                        <div className="bar-fill" style={{ width: `${(weapon.damage / 135) * 100}%` }} />
                        <span className="value">{weapon.damage}</span>
                      </div>
                    </div>
                    <div className="comparison-stat">
                      <span className="label">DPS:</span>
                      <div className="bar">
                        <div className="bar-fill" style={{ width: `${(weapon.dps / 220) * 100}%` }} />
                        <span className="value">{weapon.dps.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="comparison-stat">
                      <span className="label">Fire Rate:</span>
                      <div className="bar">
                        <div className="bar-fill" style={{ width: `${(weapon.fireRate / 10) * 100}%` }} />
                        <span className="value">{weapon.fireRate.toFixed(1)}/s</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => toggleCompare(weapon.id)}>Entfernen</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeaponDatabase;
```

## CSS Styling

```css
/* WeaponDatabase.css */
.weapon-database {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: #fff;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #39FF14, #00f2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  color: #9CA3AF;
  font-size: 1.1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 2px solid #39FF14;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.search-input::placeholder {
  color: #9CA3AF;
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 2px solid #39FF14;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.sort-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #39FF14;
  border-radius: 8px;
  background: rgba(57, 255, 20, 0.2);
  color: #39FF14;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.sort-button:hover {
  background: rgba(57, 255, 20, 0.4);
}

.weapon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.weapon-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(57, 255, 20, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.weapon-card:hover {
  border-color: #39FF14;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(57, 255, 20, 0.3);
}

.weapon-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.weapon-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.weapon-info h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #000;
}

.description {
  color: #9CA3AF;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.label {
  color: #9CA3AF;
  font-size: 0.9rem;
}

.value {
  color: #39FF14;
  font-weight: bold;
}

.compare-button {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #39FF14;
  border-radius: 8px;
  background: transparent;
  color: #39FF14;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.compare-button:hover:not(:disabled) {
  background: #39FF14;
  color: #000;
}

.compare-button.active {
  background: #39FF14;
  color: #000;
}

.compare-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.comparison-panel {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid #39FF14;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.comparison-panel h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #39FF14;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.comparison-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(57, 255, 20, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
}

.comparison-card h3 {
  text-align: center;
  margin-bottom: 1rem;
  color: #39FF14;
}

.comparison-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comparison-stat {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comparison-stat .label {
  font-size: 0.9rem;
  color: #9CA3AF;
}

.comparison-stat .bar {
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #39FF14, #00f2ff);
  transition: width 0.5s;
}

.comparison-stat .value {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-weight: bold;
  font-size: 0.85rem;
}

.comparison-card button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  border: 2px solid #EF4444;
  border-radius: 8px;
  background: transparent;
  color: #EF4444;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

.comparison-card button:hover {
  background: #EF4444;
  color: #fff;
}

/* Responsive */
@media (max-width: 768px) {
  .weapon-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    flex-direction: column;
  }

  .search-input {
    min-width: 100%;
  }

  .filter-select {
    min-width: 100%;
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
```

---

# [FEATURE 2] DRAG & DROP TIER-LIST-BUILDER

## 5 Tiers mit Drag & Drop

```tsx
// TierListBuilder.tsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { WEAPONS, Weapon } from './weapons-data';

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

    const sourceTier = source.droppableId;
    const destTier = destination.droppableId;

    const sourceIndex = source.index;
    const destIndex = destination.index;

    const newTiers = { ...tiers };
    const [movedWeapon] = newTiers[sourceTier].splice(sourceIndex, 1);
    newTiers[destTier].splice(destIndex, 0, movedWeapon);

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
    const colors = {
      S: '#EF4444',
      A: '#F59E0B',
      B: '#22C55E',
      C: '#3B82F6',
      D: '#9CA3AF'
    };
    return colors[tier as keyof typeof colors] || '#9CA3AF';
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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tiers-container">
          {(['S', 'A', 'B', 'C', 'D'] as const).map(tier => (
            <div key={tier} className="tier" style={{ borderColor: getTierColor(tier) }}>
              <div className="tier-header" style={{ backgroundColor: getTierColor(tier) }}>
                <h2>{tier}-Tier</h2>
                <span>{tiers[tier].length} Waffen</span>
              </div>
              <Droppable droppableId={tier}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="tier-content"
                  >
                    {tiers[tier].map((weapon, index) => (
                      <Draggable key={weapon.id} draggableId={weapon.id} index={index}>
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="weapon-item"
                          >
                            <img src={weapon.imageUrl} alt={weapon.name} />
                            <span>{weapon.name}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}

          <div className="tier pool-tier">
            <div className="tier-header">
              <h2>Pool</h2>
              <span>{tiers.pool.length} Waffen</span>
            </div>
            <Droppable droppableId="pool">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="tier-content"
                >
                  {tiers.pool.map((weapon, index) => (
                    <Draggable key={weapon.id} draggableId={weapon.id} index={index}>
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="weapon-item"
                        >
                          <img src={weapon.imageUrl} alt={weapon.name} />
                          <span>{weapon.name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

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
```

---

# [FEATURE 3] SHARE & EXPORT

## URL-Parameter für Tier-List Sharing

```tsx
// share-utils.ts
export const parseTierListFromURL = (urlParams: URLSearchParams) => {
  const tierData = urlParams.get('tl');
  if (!tierData) return null;

  const tiers: any = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
    pool: []
  };

  tierData.split(';').forEach(tierEntry => {
    const [tier, weaponIds] = tierEntry.split(':');
    if (tier && weaponIds) {
      const ids = weaponIds.split(',');
      tiers[tier.toUpperCase()] = ids.map(id => WEAPONS.find(w => w.id === id)).filter(Boolean);
    }
  });

  // Move remaining weapons to pool
  const assignedIds = new Set(
    Object.values(tiers).flat().filter((w: Weapon) => w).map((w: Weapon) => w.id)
  );
  tiers.pool = WEAPONS.filter(w => !assignedIds.has(w.id));

  return tiers;
};

export const generateTierListURL = (tiers: any) => {
  const tierData = Object.entries(tiers)
    .filter(([key]) => key !== 'pool')
    .map(([tier, weapons]: [string, Weapon[]]) => `${tier.toLowerCase()}:${weapons.map(w => w.id).join(',')}`)
    .join(';');

  return `?tl=${encodeURIComponent(tierData)}`;
};
```

## Als Bild speichern (html2canvas)

```tsx
// export-utils.ts
import html2canvas from 'html2canvas';

export const exportTierListAsImage = async (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    backgroundColor: '#1a1a2e',
    scale: 2,
  });

  const link = document.createElement('a');
  link.download = 'fortnite-tier-list.png';
  link.href = canvas.toDataURL();
  link.click();
};
```

---

*Last Updated: April 28, 2026*
