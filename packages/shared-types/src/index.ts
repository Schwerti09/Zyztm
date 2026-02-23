export interface User {
  id: string;
  email: string;
  stripeCustomerId?: string;
  credits: number;
  coins: number;
  lastLogin?: Date | null;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  stripePaymentIntent?: string | null;
  paymentMethod: string;
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
  coinPrice: number;
  tag: string;
}

export const PRODUCTS: Product[] = [
  { id: 'voice_pack', name: 'Voice Synth Credits', description: '50 Voice Credits für den Neural Synthesizer', price: 799, emoji: '🎙️', priceLabel: '€7.99', category: 'voice', coinPrice: 500, tag: 'voice' },
  { id: 'deepi_ai', name: 'Deepi AI', description: '1 Monat Zugang zum Zyztm AI Chatbot', price: 999, emoji: '🤖', priceLabel: '€9.99/Monat', category: 'ai', coinPrice: 800, tag: 'ai' },
  { id: 'card_booster', name: 'Legacy Card Pack', description: '5 zufällige Karten aus der Zyztm Collection', price: 399, emoji: '🃏', priceLabel: '€3.99', category: 'cards', coinPrice: 250, tag: 'cards' },
  { id: 'soundboard', name: 'Soundboard Pack', description: 'Exklusive Zyztm Sounds & Clips', price: 599, emoji: '🎵', priceLabel: '€5.99', category: 'soundboard', coinPrice: 400, tag: 'soundboard' },
  { id: 'vip', name: 'Zyztimate Box', description: 'Exklusiver Zugang zu VIP-Content & Discord', price: 799, emoji: '👑', priceLabel: '€7.99/Monat', category: 'vip', coinPrice: 500, tag: 'box' },
  { id: 'gaming_bundle', name: 'Gaming Bundle', description: 'Alles in einem: Voice + AI + Cards + VIP', price: 2999, emoji: '🎮', priceLabel: '€29.99', category: 'bundle', coinPrice: 1500, tag: 'stream' },
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
