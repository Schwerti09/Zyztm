/**
 * Fortnite API Client für den Discord Bot (Node.js, kein Browser)
 *
 * Fetcht Item-Shop-Daten von fortnite-api.com/v2/shop
 */

const API_BASE = 'https://fortnite-api.com/v2';

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   rarity: string,
 *   type: string,
 *   price: number,
 *   image: string,
 *   daysSinceLast: number,
 * }} ShopItem
 */

/**
 * @returns {Promise<{date: string, items: ShopItem[]}>}
 */
export async function fetchItemShop(language = 'de') {
  const res = await fetch(`${API_BASE}/shop?language=${language}`);
  if (!res.ok) throw new Error(`Fortnite API ${res.status}`);
  const json = await res.json();
  const data = json.data;

  const items = [];
  const seen = new Set();

  for (const entry of data.entries || []) {
    if (!entry.brItems || entry.brItems.length === 0) continue;
    const item = entry.brItems[0];

    if (seen.has(item.id)) continue;
    seen.add(item.id);

    const shopHistory = item.shopHistory || [];
    const lastSeen = shopHistory.length > 1 ? shopHistory[shopHistory.length - 2] : null;
    const daysSinceLast = lastSeen
      ? Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    const rarityCap = item.rarity.value.charAt(0).toUpperCase() + item.rarity.value.slice(1);

    items.push({
      id: item.id,
      name: item.name,
      rarity: rarityCap,
      type: item.type?.displayValue || 'Cosmetic',
      price: entry.finalPrice,
      image: item.images?.featured || item.images?.icon || '',
      daysSinceLast,
    });
  }

  return { date: data.date, items };
}
