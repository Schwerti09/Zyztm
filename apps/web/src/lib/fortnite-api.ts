/**
 * Fortnite API Client
 *
 * Nutzt fortnite-api.com (kostenlos, kein Key für meiste Endpoints).
 * Für Stats wird fortniteapi.io verwendet (benötigt API-Key im ENV).
 *
 * Alle Responses werden mit in-memory TTL-Cache versehen um Rate-Limits zu schonen.
 */

const FN_API_BASE = 'https://fortnite-api.com/v2';
const FN_STATS_API = 'https://fortniteapi.io/v2/stats/br/v2';
const SAC_CODE = 'NEXUS';

// ============================================================================
// TYPES
// ============================================================================

export interface ShopItem {
  id: string;
  name: string;
  description?: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic' | 'Exotic';
  type: string;
  price: number;
  image: string;
  featured: boolean;
  firstSeenDate?: string;
  lastSeenDate?: string;
  timesSeen?: number;
}

export interface ShopSection {
  id: string;
  name: string;
  items: ShopItem[];
}

export interface ItemShopResponse {
  hash: string;
  date: string;
  sections: ShopSection[];
  totalItems: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  type: { value: string; displayValue: string };
  rarity: { value: string; displayValue: string };
  images: { icon: string; featured?: string };
  addedAt?: string;
  shopHistory?: string[];
}

export interface PlayerStatsLive {
  username: string;
  accountId: string;
  stats: {
    overall: {
      wins: number;
      top10: number;
      top25: number;
      kills: number;
      deaths: number;
      kd: number;
      winRate: number;
      matches: number;
      killsPerMatch: number;
      killsPerMin: number;
      score: number;
      scorePerMatch: number;
      scorePerMin: number;
      minutesPlayed: number;
      playersOutlived: number;
    };
  };
}

// ============================================================================
// CACHE
// ============================================================================

interface CacheEntry<T> {
  data: T;
  expires: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCache<T>(key: string, data: T, ttlMs: number): void {
  cache.set(key, { data, expires: Date.now() + ttlMs });
}

// ============================================================================
// FETCH HELPER
// ============================================================================

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`Fortnite API ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ============================================================================
// ITEM SHOP
// ============================================================================

/**
 * Holt den aktuellen Item Shop.
 * Cached für 30 Minuten.
 */
export async function getItemShop(language: 'de' | 'en' = 'de'): Promise<ItemShopResponse> {
  const cacheKey = `shop-${language}`;
  const cached = getCached<ItemShopResponse>(cacheKey);
  if (cached) return cached;

  type RawShopEntry = {
    regularPrice: number;
    finalPrice: number;
    sortPriority?: number;
    layout?: { name?: string; id?: string };
    brItems?: {
      id: string;
      name: string;
      description?: string;
      rarity: { value: string };
      type: { displayValue: string };
      images: { icon: string; featured?: string };
      shopHistory?: string[];
    }[];
  };

  type RawShopResponse = {
    data: {
      hash: string;
      date: string;
      entries: RawShopEntry[];
    };
  };

  // /v2/shop (flat entries) — /v2/shop/br ist deprecated (410)
  const raw = await fetchJson<RawShopResponse>(
    `${FN_API_BASE}/shop?language=${language}`,
  );

  const sectionsMap = new Map<string, ShopItem[]>();
  let totalItems = 0;

  for (const entry of raw.data.entries || []) {
    if (!entry.brItems || entry.brItems.length === 0) continue;
    const firstItem = entry.brItems[0];
    const sectionName = entry.layout?.name || 'Sonstiges';

    const rarityCap =
      firstItem.rarity.value.charAt(0).toUpperCase() + firstItem.rarity.value.slice(1);

    const item: ShopItem = {
      id: firstItem.id,
      name: firstItem.name,
      description: firstItem.description,
      rarity: rarityCap as ShopItem['rarity'],
      type: firstItem.type.displayValue,
      price: entry.finalPrice,
      image: firstItem.images.featured || firstItem.images.icon,
      featured: (entry.sortPriority ?? 99) <= 0,
      timesSeen: firstItem.shopHistory?.length,
      firstSeenDate: firstItem.shopHistory?.[0],
      lastSeenDate: firstItem.shopHistory?.[firstItem.shopHistory.length - 1],
    };

    if (!sectionsMap.has(sectionName)) sectionsMap.set(sectionName, []);
    sectionsMap.get(sectionName)!.push(item);
    totalItems++;
  }

  const sections: ShopSection[] = Array.from(sectionsMap.entries()).map(([name, items]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    items,
  }));

  const response: ItemShopResponse = {
    hash: raw.data.hash,
    date: raw.data.date,
    sections,
    totalItems,
  };

  // 30 Min TTL (Shop rotiert einmal pro Tag, aber wir wollen frische Daten nach Midnight)
  setCache(cacheKey, response, 30 * 60 * 1000);
  return response;
}

/**
 * Holt Cosmetic-Details für eine ID.
 */
export async function getCosmeticById(id: string): Promise<CosmeticItem | null> {
  const cacheKey = `cosmetic-${id}`;
  const cached = getCached<CosmeticItem>(cacheKey);
  if (cached) return cached;

  try {
    type RawResponse = { data: CosmeticItem };
    const raw = await fetchJson<RawResponse>(`${FN_API_BASE}/cosmetics/br/${id}`);
    setCache(cacheKey, raw.data, 24 * 60 * 60 * 1000); // 24h
    return raw.data;
  } catch {
    return null;
  }
}

// ============================================================================
// SAC CODE HELPERS
// ============================================================================

export function getSacCode(): string {
  return SAC_CODE;
}

/**
 * Generiert einen Copy-Text für den User.
 */
export function getSacCopyText(itemName: string): string {
  return `Hol dir "${itemName}" im Fortnite Item Shop! Nutze den Code ${SAC_CODE} beim Kauf. #EpicPartner`;
}

/**
 * Berechnet wie "rar" ein Item ist basierend auf Shop-History.
 */
export function rateItemRarity(item: ShopItem): {
  rating: 'legendary' | 'rare' | 'uncommon' | 'common';
  label: string;
  daysSince: number | null;
  description: string;
} {
  if (!item.lastSeenDate || !item.timesSeen) {
    return {
      rating: 'common',
      label: 'Neu',
      daysSince: null,
      description: 'Erstes Mal im Shop oder keine Daten verfügbar.',
    };
  }

  const lastSeen = new Date(item.lastSeenDate);
  const daysSince = Math.floor((Date.now() - lastSeen.getTime()) / (1000 * 60 * 60 * 24));

  if (item.timesSeen <= 2 && daysSince > 180) {
    return {
      rating: 'legendary',
      label: '🔥 Legendary Return',
      daysSince,
      description: `Seit ${daysSince} Tagen nicht mehr im Shop! Pflicht-Kauf für Sammler.`,
    };
  }
  if (daysSince > 90) {
    return {
      rating: 'rare',
      label: '⭐ Rarer Return',
      daysSince,
      description: `Vor ${daysSince} Tagen zuletzt gesehen. Guter Zeitpunkt zu kaufen.`,
    };
  }
  if (daysSince > 30) {
    return {
      rating: 'uncommon',
      label: 'Solid Pick',
      daysSince,
      description: `Vor ${daysSince} Tagen im Shop. Wird sicher bald wiederkommen.`,
    };
  }
  return {
    rating: 'common',
    label: 'Häufig',
    daysSince,
    description: `Regelmäßig im Shop (${item.timesSeen}x gesehen). Kein Zeitdruck.`,
  };
}

/**
 * Rarity-Farbe für UI.
 */
export function getRarityColor(rarity: ShopItem['rarity']): string {
  const colors: Record<ShopItem['rarity'], string> = {
    Common: '#9CA3AF',
    Uncommon: '#22C55E',
    Rare: '#3B82F6',
    Epic: '#A855F7',
    Legendary: '#F59E0B',
    Mythic: '#EF4444',
    Exotic: '#EC4899',
  };
  return colors[rarity] ?? '#9CA3AF';
}

// ============================================================================
// PLAYER STATS (fortniteapi.io)
// ============================================================================

export interface PlayerStats {
  username: string;
  kd: number;
  winRate: number;
  top10Rate: number;
  killsPerMatch: number;
  placementAvg: number;
  matchesPlayed: number;
  accuracyEstimate?: number;
  materialsGatheredAvg?: number;
}

/**
 * Holt Spieler-Stats von fortniteapi.io.
 * Benötigt API-Key in FORTNITE_API_KEY env var.
 */
export async function getPlayerStats(username: string): Promise<PlayerStats | null> {
  const apiKey = process.env.FORTNITE_API_KEY;
  if (!apiKey) {
    console.warn('[fortnite-api] FORTNITE_API_KEY not configured, using fallback');
    return null;
  }

  try {
    const response = await fetch(
      `${FN_STATS_API}?username=${encodeURIComponent(username)}`,
      {
        headers: {
          'Authorization': apiKey,
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Spieler nicht gefunden
      }
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // fortniteapi.io Response normalisieren
    const stats: PlayerStats = {
      username: data.username || username,
      kd: data.stats?.all?.kd || 0,
      winRate: data.stats?.all?.winRate || 0,
      top10Rate: data.stats?.all?.top10 || 0,
      killsPerMatch: data.stats?.all?.killsPerMatch || 0,
      placementAvg: data.stats?.all?.avgPlacement || 50,
      matchesPlayed: data.stats?.all?.matches || 0,
      accuracyEstimate: data.stats?.all?.accuracy,
      materialsGatheredAvg: data.stats?.all?.materials,
    };

    return stats;
  } catch (error) {
    console.error('[fortnite-api] Failed to fetch player stats:', error);
    return null;
  }
}
