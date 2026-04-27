/**
 * Digital Products Catalog
 * Source of truth for all digital products available in the shop
 */

export interface DigitalProduct {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number; // in cents
  currency: string;
  category: 'settings' | 'guide' | 'subscription' | 'review' | 'template';
  badge?: 'new' | 'bestseller' | 'limited' | 'popular';
  isSubscription: boolean;
  subscriptionInterval?: 'month' | 'year';
  
  // Visual
  imageUrl: string;
  imageAlt: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string; // Lucide icon name
  
  // Content
  features: string[];
  deliverables: string[];
  fileFormat?: string[];
  fileSize?: string;
  
  // Trust & Social Proof
  testimonials?: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  totalSales?: number;
  rating?: number;
  reviewCount?: number;
  
  // Delivery
  deliveryMethod: 'instant_download' | 'email_link' | 'subscription_email' | 'manual_review';
  deliveryTime: string; // human-readable
  downloadLimit: number;
  expiryHours: number;
  
  // SEO
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  
  // Status
  active: boolean;
  comingSoon?: boolean;
  
  // Stripe (set after creation in Stripe Dashboard)
  stripePriceId?: string;
}

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'pro-settings-pack',
    slug: 'pro-settings-pack',
    name: 'Pro Settings Pack',
    shortDescription: 'Optimierte Settings für 240+ FPS in Fortnite',
    longDescription: 'Das komplette Settings-Pack der Pros. Optimiert für maximale FPS und niedrigste Latenz. Inkludiert GameUserSettings.ini, Windows-Optimierungen, NVIDIA Control Panel Setup und ein 15-minütiges Walkthrough-Video.',
    price: 999, // €9.99
    currency: 'eur',
    category: 'settings',
    badge: 'bestseller',
    isSubscription: false,
    
    imageUrl: '/products/pro-settings-pack.jpg',
    imageAlt: 'Pro Settings Pack - Maximale FPS für Fortnite',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-600',
    icon: 'Zap',
    
    features: [
      'GameUserSettings.ini optimiert für 240+ FPS',
      'Windows 11 Gaming Performance Guide',
      'NVIDIA Control Panel Setup (Screenshots)',
      'Maus-Sensitivity Calculator',
      '15-Min Video-Walkthrough',
      'Lifetime Updates für neue Seasons',
    ],
    deliverables: [
      'GameUserSettings.ini',
      'Engine.ini',
      'Windows-Optimization.pdf (12 Seiten)',
      'NVIDIA-Setup-Screenshots.zip',
      'Sensitivity-Calculator.xlsx',
      'Walkthrough-Video.mp4 (15 min, 1080p)',
    ],
    fileFormat: ['.ini', '.pdf', '.zip', '.xlsx', '.mp4'],
    fileSize: '450 MB',
    
    totalSales: 0,
    rating: 4.9,
    reviewCount: 0,
    
    deliveryMethod: 'instant_download',
    deliveryTime: 'Sofort nach Zahlung',
    downloadLimit: 3,
    expiryHours: 72,
    
    seoTitle: 'Fortnite Pro Settings Pack 2026 - 240 FPS optimiert',
    seoDescription: 'Komplettes Settings-Pack für Fortnite Pros. GameUserSettings.ini, Windows-Optimierungen und Video-Tutorial. Sofort-Download nach Zahlung.',
    keywords: ['fortnite settings', 'pro settings', '240 fps', 'gameusersettings', 'optimization'],
    
    active: true,
  },
  
  {
    id: 'fortnite-checklist',
    slug: 'fortnite-checklist',
    name: 'Season Checklist',
    shortDescription: 'Komplette Season-Checklist als Notion-Template',
    longDescription: 'Verpass nie wieder eine Challenge oder Secret Mission. Die ultimative Season-Checklist mit allen Battle Pass Tiers, Secret Skins, Mythics und optimaler Progression-Route.',
    price: 499, // €4.99
    currency: 'eur',
    category: 'template',
    badge: 'new',
    isSubscription: false,
    
    imageUrl: '/products/fortnite-checklist.jpg',
    imageAlt: 'Fortnite Season Checklist',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-cyan-600',
    icon: 'CheckSquare',
    
    features: [
      'Alle Battle Pass Tiers',
      'Secret Skins & Mythics',
      'Optimale XP-Route',
      'Wöchentliche Quest-Tracker',
      'Notion-Template + PDF',
      'Auto-Update bei Season-Wechsel',
    ],
    deliverables: [
      'Notion-Template (Link)',
      'Season-Checklist.pdf',
      'XP-Optimization-Guide.pdf',
    ],
    fileFormat: ['.pdf', 'Notion'],
    fileSize: '15 MB',
    
    totalSales: 0,
    rating: 5.0,
    reviewCount: 0,
    
    deliveryMethod: 'instant_download',
    deliveryTime: 'Sofort nach Zahlung',
    downloadLimit: 5,
    expiryHours: 72,
    
    seoTitle: 'Fortnite Season Checklist - Battle Pass Tracker',
    seoDescription: 'Notion-Template + PDF mit allen Battle Pass Tiers, Secret Missions und optimaler XP-Route.',
    keywords: ['fortnite checklist', 'battle pass', 'season tracker', 'notion template'],
    
    active: true,
  },
  
  {
    id: 'weekly-meta-report',
    slug: 'weekly-meta-report',
    name: 'Weekly Meta Report',
    shortDescription: 'Wöchentliche Meta-Analyse direkt in dein Postfach',
    longDescription: 'Die einzige deutsche Quelle für aktuelle Fortnite-Meta-Analysen. Jeden Dienstag bekommst du Tier-Lists, Pro-Loadouts, Map-Updates und Secret-Tips aus der Competitive Scene.',
    price: 799, // €7.99/Monat
    currency: 'eur',
    category: 'subscription',
    badge: 'popular',
    isSubscription: true,
    subscriptionInterval: 'month',
    
    imageUrl: '/products/weekly-meta-report.jpg',
    imageAlt: 'Weekly Meta Report Subscription',
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-600',
    icon: 'TrendingUp',
    
    features: [
      'Wöchentlicher Report (jeden Dienstag)',
      'Weapon Tier List (immer aktuell)',
      'Pro Player Loadouts',
      'Map Changes & Landing Spots',
      'Secret Tips aus Competitive Scene',
      'Patch Notes Analyse',
      'Jederzeit kündbar',
    ],
    deliverables: [
      'Weekly Email-Report (PDF + HTML)',
      'Exclusive Discord-Channel-Zugang',
      'Archive aller bisherigen Reports',
    ],
    fileFormat: ['Email', '.pdf'],
    
    totalSales: 0,
    rating: 4.8,
    reviewCount: 0,
    
    deliveryMethod: 'subscription_email',
    deliveryTime: 'Erster Report binnen 7 Tagen, dann wöchentlich',
    downloadLimit: 999,
    expiryHours: 0, // No expiry for subscriptions
    
    seoTitle: 'Fortnite Meta Report - Wöchentliche Analyse',
    seoDescription: 'Werde Teil der deutschen Competitive Community. Wöchentliche Meta-Reports mit Tier Lists, Pro-Loadouts und Secret Tips.',
    keywords: ['fortnite meta', 'tier list', 'pro loadouts', 'competitive fortnite'],
    
    active: true,
  },
  
  {
    id: 'creator-setup-guide',
    slug: 'creator-setup-guide',
    name: 'Creator Setup Guide',
    shortDescription: 'Vom Zocker zum Streamer - kompletter Setup-Guide',
    longDescription: 'Der ultimative Guide für angehende Streamer. OBS-Konfiguration, Audio-Setup, Scene-Design, Thumbnail-Workflow, Content-Planung und Monetarisierungs-Strategien. 3h Video + PDF + Templates.',
    price: 1999, // €19.99
    currency: 'eur',
    category: 'guide',
    isSubscription: false,
    
    imageUrl: '/products/creator-setup-guide.jpg',
    imageAlt: 'Creator Setup Guide',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-purple-600',
    icon: 'Video',
    
    features: [
      '3h Video-Kurs (10 Module)',
      'OBS Studio Setup-Guide',
      'Audio-Optimierung (Voice + Game)',
      'Scene-Design Templates',
      'Thumbnail-Workflow (Photoshop/Canva)',
      'Content-Planungs-Templates',
      'Monetarisierungs-Strategien',
      'Lifetime Updates',
    ],
    deliverables: [
      '10 Video-Module (3h total, 1080p)',
      'Creator-Guide.pdf (45 Seiten)',
      'OBS-Profile.zip (fertig konfiguriert)',
      'Thumbnail-Templates (PSD + Canva)',
      'Content-Calendar.xlsx',
    ],
    fileFormat: ['.mp4', '.pdf', '.psd', '.xlsx'],
    fileSize: '2.5 GB',
    
    totalSales: 0,
    rating: 4.95,
    reviewCount: 0,
    
    deliveryMethod: 'instant_download',
    deliveryTime: 'Sofort nach Zahlung',
    downloadLimit: 3,
    expiryHours: 72,
    
    seoTitle: 'Creator Setup Guide - Vom Zocker zum Streamer',
    seoDescription: '3h Video-Kurs + PDF + Templates. OBS Setup, Audio, Thumbnails, Content-Planung. Alles was du als Streamer brauchst.',
    keywords: ['streaming setup', 'obs guide', 'streamer guide', 'content creator'],
    
    active: true,
  },
  
  {
    id: 'vod-review',
    slug: 'vod-review',
    name: '1-on-1 VOD Review',
    shortDescription: 'Personalisierte Gameplay-Analyse vom Pro',
    longDescription: 'Lade dein Gameplay hoch und bekomme eine 30-45 minütige personalisierte Analyse mit konkreten Verbesserungs-Tipps. Limitiert auf 5 Slots pro Woche.',
    price: 2999, // €29.99
    currency: 'eur',
    category: 'review',
    badge: 'limited',
    isSubscription: false,
    
    imageUrl: '/products/vod-review.jpg',
    imageAlt: '1-on-1 VOD Review',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-600',
    icon: 'Eye',
    
    features: [
      '30-45 Min personalisierte Analyse',
      'Konkrete Verbesserungs-Tipps',
      'Building, Aim, Rotations, Game Sense',
      'Video-Format mit Voice-Over',
      '24-48h Turnaround',
      'Follow-up Email nach 7 Tagen',
    ],
    deliverables: [
      'Personalisiertes Review-Video (30-45 min)',
      'PDF-Zusammenfassung mit Action Items',
      'Discord-Support für Rückfragen (7 Tage)',
    ],
    fileFormat: ['.mp4', '.pdf'],
    fileSize: '~500 MB',
    
    totalSales: 0,
    rating: 5.0,
    reviewCount: 0,
    
    deliveryMethod: 'manual_review',
    deliveryTime: '24-48 Stunden nach Upload',
    downloadLimit: 3,
    expiryHours: 168, // 7 days
    
    seoTitle: '1-on-1 Fortnite VOD Review - Personalisierte Analyse',
    seoDescription: 'Bekomme eine personalisierte Gameplay-Analyse vom Pro. 30-45 Min Video mit konkreten Verbesserungs-Tipps.',
    keywords: ['vod review', 'gameplay analyse', 'fortnite coaching', '1on1 review'],
    
    active: true,
  },
];

/**
 * Helper: Get product by slug
 */
export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return DIGITAL_PRODUCTS.find(p => p.slug === slug && p.active);
}

/**
 * Helper: Get product by ID
 */
export function getProductById(id: string): DigitalProduct | undefined {
  return DIGITAL_PRODUCTS.find(p => p.id === id && p.active);
}

/**
 * Helper: Format price for display
 */
export function formatPrice(priceCents: number, currency: string = 'eur'): string {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  return formatter.format(priceCents / 100);
}

/**
 * Helper: Get all active products
 */
export function getActiveProducts(): DigitalProduct[] {
  return DIGITAL_PRODUCTS.filter(p => p.active);
}

/**
 * Helper: Get products by category
 */
export function getProductsByCategory(category: DigitalProduct['category']): DigitalProduct[] {
  return DIGITAL_PRODUCTS.filter(p => p.category === category && p.active);
}
