/**
 * Wishlist Store — Neon DB oder JSON-Fallback
 *
 * Speichert User-Wishlists in Neon DB (Production) oder JSON (Development).
 * Für Production: DATABASE_URL setzen.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { query } from './db-client.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'wishlists.json');

const USE_DB = !!process.env.DATABASE_URL;

function ensureDir() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function load() {
  ensureDir();
  if (!fs.existsSync(STORE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function save(data) {
  ensureDir();
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2));
}

/**
 * Fügt ein Item zur Wishlist eines Users hinzu.
 */
export async function addToWishlist(userId, itemName) {
  if (USE_DB) {
    try {
      await query(
        'INSERT INTO wishlist_items (user_id, item_name) VALUES ($1, $2) ON CONFLICT (user_id, item_name) DO NOTHING',
        [userId, itemName.trim()]
      );
      return true;
    } catch (err) {
      console.error('DB Error, fallback to JSON:', err);
      // Fallback zu JSON
    }
  }

  const store = load();
  if (!store[userId]) store[userId] = [];
  const normalized = itemName.toLowerCase().trim();
  if (store[userId].some((i) => i.toLowerCase() === normalized)) return false;
  store[userId].push(itemName.trim());
  save(store);
  return true;
}

/**
 * Entfernt ein Item von der Wishlist.
 */
export async function removeFromWishlist(userId, itemName) {
  if (USE_DB) {
    try {
      const result = await query(
        'DELETE FROM wishlist_items WHERE user_id = $1 AND LOWER(item_name) = LOWER($2) RETURNING id',
        [userId, itemName.trim()]
      );
      return result.length > 0;
    } catch (err) {
      console.error('DB Error, fallback to JSON:', err);
    }
  }

  const store = load();
  if (!store[userId]) return false;
  const normalized = itemName.toLowerCase().trim();
  const before = store[userId].length;
  store[userId] = store[userId].filter((i) => i.toLowerCase() !== normalized);
  save(store);
  return store[userId].length < before;
}

/**
 * Gibt die Wishlist eines Users zurück.
 */
export async function getWishlist(userId) {
  if (USE_DB) {
    try {
      const result = await query(
        'SELECT item_name FROM wishlist_items WHERE user_id = $1 ORDER BY created_at',
        [userId]
      );
      return result.map((r) => r.item_name);
    } catch (err) {
      console.error('DB Error, fallback to JSON:', err);
    }
  }

  const store = load();
  return store[userId] || [];
}

/**
 * Prüft welche User ein bestimmtes Item auf der Wishlist haben.
 */
export async function getUsersWantingItem(itemName) {
  if (USE_DB) {
    try {
      const result = await query(
        'SELECT user_id FROM wishlist_items WHERE LOWER(item_name) = LOWER($1)',
        [itemName.trim()]
      );
      return result.map((r) => r.user_id);
    } catch (err) {
      console.error('DB Error, fallback to JSON:', err);
    }
  }

  const store = load();
  const normalized = itemName.toLowerCase().trim();
  const userIds = [];
  for (const [uid, items] of Object.entries(store)) {
    if (items.some((i) => i.toLowerCase() === normalized)) {
      userIds.push(uid);
    }
  }
  return userIds;
}

/**
 * Gibt alle einzigartigen Items über alle Wishlists zurück.
 */
export async function getAllWishlistItems() {
  if (USE_DB) {
    try {
      const result = await query(
        'SELECT item_name, COUNT(*) as count FROM wishlist_items GROUP BY LOWER(item_name) ORDER BY count DESC'
      );
      const counts = new Map();
      for (const row of result) {
        counts.set(row.item_name.toLowerCase(), parseInt(row.count));
      }
      return counts;
    } catch (err) {
      console.error('DB Error, fallback to JSON:', err);
    }
  }

  const store = load();
  const counts = new Map();
  for (const items of Object.values(store)) {
    for (const item of items) {
      const key = item.toLowerCase();
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  return counts;
}
