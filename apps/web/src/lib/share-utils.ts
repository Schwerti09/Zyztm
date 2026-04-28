import { WEAPONS, Weapon } from '../data/weapons-data';

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
      const weaponObjects = ids.map(id => WEAPONS.find(w => w.id === id)).filter(Boolean) as Weapon[];
      tiers[tier.toUpperCase()] = weaponObjects;
    }
  });

  // Update pool to exclude assigned weapons
  const assignedWeapons = Object.values(tiers).flat() as Weapon[];
  tiers.pool = WEAPONS.filter(w => !assignedWeapons.includes(w));

  return tiers;
};

export const generateTierListURL = (tiers: any) => {
  const tierData = Object.entries(tiers)
    .filter(([key]) => key !== 'pool')
    .map(([tier, weapons]: [string, any]) => `${tier.toLowerCase()}:${weapons.map((w: Weapon) => w.id).join(',')}`)
    .join(';');

  return `${window.location.origin}${window.location.pathname}?tl=${encodeURIComponent(tierData)}`;
};

export const copyTierListURL = (tiers: any) => {
  const url = generateTierListURL(tiers);
  navigator.clipboard.writeText(url);
  return url;
};

export const exportTierListAsImage = async (tiers: any) => {
  // Placeholder for image export functionality
  // This would require html2canvas or similar library
  console.log('Exporting tier list as image...', tiers);
  alert('Bild-Export wird in zukünftigen Versionen implementiert.');
};

export const exportTierListAsJSON = (tiers: any) => {
  const data = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    tiers: Object.entries(tiers)
      .filter(([key]) => key !== 'pool')
      .map(([tier, weapons]) => ({
        tier,
        weapons: (weapons as Weapon[]).map(w => w.id)
      }))
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `fortnite-tier-list-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importTierListFromJSON = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        const tiers: any = {
          S: [],
          A: [],
          B: [],
          C: [],
          D: [],
          pool: []
        };

        data.tiers.forEach((tierEntry: any) => {
          const { tier, weapons } = tierEntry;
          const weaponObjects = weapons.map((id: string) => WEAPONS.find(w => w.id === id)).filter(Boolean) as Weapon[];
          tiers[tier.toUpperCase()] = weaponObjects;
        });

        // Update pool to exclude assigned weapons
        const assignedWeapons = Object.values(tiers).flat() as Weapon[];
        tiers.pool = WEAPONS.filter(w => !assignedWeapons.includes(w));

        resolve(tiers);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
