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
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  coinPrice: number;
  tag: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'vip',
    name: "Zyztm's Loot Llama",
    description: 'Monatliche Überraschungsbox mit exklusiven digitalen Goodies: Wallpaper, Clips & Emotes – automatisch per E-Mail!',
    price: 499,
    emoji: '🦙',
    priceLabel: '€4,99/Monat',
    category: 'vip',
    rarity: 'legendary',
    coinPrice: 350,
    tag: 'box',
  },
  {
    id: 'voice_pack',
    name: 'Victory Royale Voice Pack',
    description: '50 Sprach-Credits + exklusive Sieg-Sprüche von Zyztm – powered by ElevenLabs AI.',
    price: 499,
    emoji: '🎤',
    priceLabel: '€4,99',
    category: 'voice',
    rarity: 'epic',
    coinPrice: 350,
    tag: 'voice',
  },
  {
    id: 'zyztm_bro',
    name: 'Zyztm Bro – Dein Gaming-Kumpel',
    description: 'KI-Chatbot, der wie Zyztm labert: Fortnite-Tipps, Stream-Storys und mehr – powered by Gemini AI.',
    price: 999,
    emoji: '🤖',
    priceLabel: '€9,99/Monat',
    category: 'ai',
    rarity: 'legendary',
    coinPrice: 700,
    tag: 'ai',
  },
  {
    id: 'card_booster',
    name: 'Clutch Moments Cards',
    description: 'Booster-Pack mit 5 digitalen Sammelkarten aus deinen Lieblings-Stream-Momenten von Zyztm.',
    price: 199,
    emoji: '🃏',
    priceLabel: '€1,99',
    category: 'cards',
    rarity: 'rare',
    coinPrice: 150,
    tag: 'cards',
  },
  {
    id: 'soundboard',
    name: 'Zyztm Soundboard Pro',
    description: '50+ Zyztm-Sprüche als Hotkeys für Discord & Stream – sofort als Download verfügbar.',
    price: 499,
    emoji: '🔊',
    priceLabel: '€4,99',
    category: 'soundboard',
    rarity: 'epic',
    coinPrice: 350,
    tag: 'soundboard',
  },
];

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  price: number; // in cents
  priceLabel: string;
  emoji: string;
  bonus?: number; // bonus coins
  popular?: boolean;
}

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'coins_100',
    name: 'Starter Pack',
    coins: 100,
    price: 100,
    priceLabel: '1,00€',
    emoji: '💎',
  },
  {
    id: 'coins_500',
    name: 'Fan Pack',
    coins: 500,
    bonus: 50,
    price: 500,
    priceLabel: '5,00€',
    emoji: '💎💎',
    popular: true,
  },
  {
    id: 'coins_1000',
    name: 'Pro Pack',
    coins: 1000,
    bonus: 200,
    price: 1000,
    priceLabel: '10,00€',
    emoji: '💎💎💎',
  },
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
