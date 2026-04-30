/**
 * Wishlist Store — JSON-basierte Persistenz
 *
 * Speichert User-Wishlists in einer lokalen JSON-Datei.
 * Format: { "userId": ["itemName1", "itemName2"] }
 *
 * Für Production: auf Neon DB oder Redis umstellen.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, '..', '..', 'data', 'wishlists.json');

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
 * @param {string} userId
 * @param {string} itemName
 * @returns {boolean} true wenn neu hinzugefügt, false wenn bereits vorhanden
 */
export function addToWishlist(userId, itemName) {
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
 * @param {string} userId
 * @param {string} itemName
 * @returns {boolean} true wenn entfernt
 */
export function removeFromWishlist(userId, itemName) {
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
 * @param {string} userId
 * @returns {string[]}
 */
export function getWishlist(userId) {
  const store = load();
  return store[userId] || [];
}

/**
 * Prüft welche User ein bestimmtes Item auf der Wishlist haben.
 * @param {string} itemName
 * @returns {string[]} Array von User-IDs
 */
export function getUsersWantingItem(itemName) {
  const store = load();
  const normalized = itemName.toLowerCase().trim();
  const userIds = [];

  for (const [userId, items] of Object.entries(store)) {
    if (items.some((i) => i.toLowerCase() === normalized)) {
      userIds.push(userId);
    }
  }

  return userIds;
}

/**
 * Gibt alle einzigartigen Items über alle Wishlists zurück.
 * @returns {Map<string, number>} Item → Anzahl User
 */
export function getAllWishlistItems() {
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
