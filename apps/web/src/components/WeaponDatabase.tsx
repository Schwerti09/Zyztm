import React, { useState, useMemo } from 'react';
import { WEAPONS, Weapon } from '../data/weapons-data';
import './WeaponDatabase.css';

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
    const colors: Record<string, string> = {
      Common: '#9CA3AF',
      Uncommon: '#22C55E',
      Rare: '#3B82F6',
      Epic: '#A855F7',
      Legendary: '#F59E0B'
    };
    return colors[rarity] || '#9CA3AF';
  };

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
