export interface User {
  id: string;
  email: string;
  stripeCustomerId?: string;
  credits: number;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  stripePaymentIntent: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  createdAt: Date;
}

export interface VoiceCredits {
  userId: string;
  credits: number;
  lastUpdated: Date;
}

export interface Card {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  emoji: string;
  description: string;
}

export interface CardBoosterPack {
  id: string;
  userId: string;
  cards: Card[];
  purchasedAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  priceLabel: string;
  category: 'voice' | 'ai' | 'cards' | 'soundboard' | 'vip' | 'bundle';
}

export const PRODUCTS: Product[] = [
  { id: 'voice_pack', name: 'Voice Pack', description: '50 Voice Credits für den Neural Synthesizer', price: 499, emoji: '🎙️', priceLabel: '€4.99', category: 'voice' },
  { id: 'deepi_ai', name: 'Deepi AI', description: '1 Monat Zugang zum Zyztm AI Chatbot', price: 999, emoji: '🤖', priceLabel: '€9.99/month', category: 'ai' },
  { id: 'card_booster', name: 'Card Booster Pack', description: '5 zufällige Karten aus der Zyztm Collection', price: 299, emoji: '🃏', priceLabel: '€2.99', category: 'cards' },
  { id: 'soundboard', name: 'Soundboard Pack', description: 'Exklusive Zyztm Sounds & Clips', price: 1499, emoji: '🎵', priceLabel: '€14.99', category: 'soundboard' },
  { id: 'vip', name: 'VIP Membership', description: 'Exklusiver Zugang zu VIP-Content & Discord', price: 1999, emoji: '👑', priceLabel: '€19.99/month', category: 'vip' },
  { id: 'gaming_bundle', name: 'Gaming Bundle', description: 'Alles in einem: Voice + AI + Cards + VIP', price: 2999, emoji: '🎮', priceLabel: '€29.99', category: 'bundle' },
];

export const ALL_CARDS: Card[] = [
  { id: 'c1', name: 'Zyztm Legend', rarity: 'legendary', emoji: '👑', description: 'Der König des Fortnite' },
  { id: 'c2', name: 'Victory Royale', rarity: 'legendary', emoji: '🏆', description: 'Unbesiegbar in der Arena' },
  { id: 'c3', name: 'Neon Striker', rarity: 'epic', emoji: '⚡', description: 'Schneller als das Licht' },
  { id: 'c4', name: 'Stream Demon', rarity: 'epic', emoji: '😈', description: 'Absolute Dominanz live' },
  { id: 'c5', name: 'Cyber Warrior', rarity: 'epic', emoji: '🤖', description: 'Halb Mensch, halb Maschine' },
  { id: 'c6', name: 'Kill Leader', rarity: 'rare', emoji: '🎯', description: 'Jeder Schuss ein Treffer' },
  { id: 'c7', name: 'Drop Master', rarity: 'rare', emoji: '🪂', description: 'Perfekter Drop jedes Mal' },
  { id: 'c8', name: 'Loot Goblin', rarity: 'rare', emoji: '💎', description: 'Findet immer die beste Loot' },
  { id: 'c9', name: 'Rush King', rarity: 'rare', emoji: '💨', description: 'Niemand baut schneller' },
  { id: 'c10', name: 'Sniper Elite', rarity: 'rare', emoji: '🔭', description: 'Präzision auf höchstem Niveau' },
  { id: 'c11', name: 'Storm Rider', rarity: 'common', emoji: '⛈️', description: 'Überlebt jeden Storm' },
  { id: 'c12', name: 'Chill Gamer', rarity: 'common', emoji: '😎', description: 'Cool under pressure' },
  { id: 'c13', name: 'Chat Warrior', rarity: 'common', emoji: '💬', description: 'König im Chat' },
  { id: 'c14', name: 'Emote God', rarity: 'common', emoji: '🕺', description: 'Beste Emotes im Game' },
  { id: 'c15', name: 'Fortnite Fan', rarity: 'common', emoji: '🎮', description: 'Echter Fan seit Tag 1' },
  { id: 'c16', name: 'Clip Hunter', rarity: 'common', emoji: '🎬', description: 'Immer die besten Clips' },
  { id: 'c17', name: 'Sub Badge', rarity: 'common', emoji: '⭐', description: 'Treuer Subscriber' },
  { id: 'c18', name: 'Hype Train', rarity: 'rare', emoji: '🚂', description: 'Bringt immer den Hype' },
  { id: 'c19', name: 'Night Owl', rarity: 'common', emoji: '🦉', description: 'Schaut die Late Night Streams' },
  { id: 'c20', name: 'Diggah Card', rarity: 'epic', emoji: '🤝', description: 'Echter Zyztm Diggah' },
];
