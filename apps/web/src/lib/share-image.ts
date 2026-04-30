/**
 * Canvas-basierter Share-Image-Generator
 *
 * Erzeugt hochwertige PNGs (1200×630, Twitter/OG-Standard) direkt im Browser
 * mit der Canvas 2D API. Keine Dependencies, keine Server.
 *
 * Features:
 *  - Twitter Card / Open Graph Standard (1200×630)
 *  - Instagram Portrait (1080×1920) für Stories/Reels
 *  - Square (1080×1080) für Posts
 *  - Gradient-Backgrounds, Glass-Cards, Custom-Fonts
 *  - Export als PNG Blob oder Data-URL
 */

export type ShareFormat = 'og' | 'story' | 'square';

export interface ShareImageConfig {
  format?: ShareFormat;
  bgGradient?: [string, string, string];
  accentColor?: string;
  logo?: string;
}

const FORMAT_DIMENSIONS: Record<ShareFormat, { w: number; h: number }> = {
  og: { w: 1200, h: 630 },
  story: { w: 1080, h: 1920 },
  square: { w: 1080, h: 1080 },
};

const DEFAULT_GRADIENT: [string, string, string] = ['#0a0014', '#1a0033', '#0a0014'];
const DEFAULT_ACCENT = '#ff0055';

// ============================================================================
// CORE RENDERER
// ============================================================================

function createCanvas(format: ShareFormat): HTMLCanvasElement {
  const { w, h } = FORMAT_DIMENSIONS[format];
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  gradient: [string, string, string],
) {
  // Base gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, gradient[0]);
  grad.addColorStop(0.5, gradient[1]);
  grad.addColorStop(1, gradient[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Grid-overlay (cyber-aesthetic)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const gridSize = 50;
  for (let x = 0; x < w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Accent glow (bottom-right)
  const glow = ctx.createRadialGradient(w * 0.8, h * 0.7, 0, w * 0.8, h * 0.7, w * 0.5);
  glow.addColorStop(0, 'rgba(255, 0, 85, 0.25)');
  glow.addColorStop(1, 'rgba(255, 0, 85, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Accent glow (top-left)
  const glow2 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.4);
  glow2.addColorStop(0, 'rgba(0, 242, 255, 0.15)');
  glow2.addColorStop(1, 'rgba(0, 242, 255, 0)');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, w, h);
}

function drawBranding(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  format: ShareFormat,
) {
  const padding = format === 'story' ? 60 : 40;
  const y = format === 'story' ? 80 : 40;

  // Brand bar (top)
  ctx.fillStyle = '#ff0055';
  ctx.fillRect(padding, y, 8, 40);

  ctx.font = `900 ${format === 'story' ? 32 : 24}px 'Orbitron', system-ui, sans-serif`;
  ctx.fillStyle = '#ffffff';
  ctx.textBaseline = 'top';
  ctx.fillText('FORTNITE NEXUS', padding + 24, y);

  ctx.font = `${format === 'story' ? 18 : 14}px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('PRO TOOLS · DATA · INSIGHTS', padding + 24, y + 26);

  // URL badge (bottom-right)
  const urlY = h - (format === 'story' ? 100 : 65);
  const urlX = w - padding;
  ctx.font = `${format === 'story' ? 20 : 16}px system-ui, sans-serif`;
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('fortnitenexus.space', urlX, urlY);

  ctx.textAlign = 'left';
}

function drawTitle(
  ctx: CanvasRenderingContext2D,
  title: string,
  subtitle: string,
  format: ShareFormat,
  accentColor: string,
) {
  const { w, h } = FORMAT_DIMENSIONS[format];
  const padding = format === 'story' ? 60 : 60;
  const titleY = format === 'story' ? 280 : 140;

  // Subtitle
  ctx.font = `${format === 'story' ? 24 : 20}px system-ui, sans-serif`;
  ctx.fillStyle = accentColor;
  ctx.letterSpacing = '2px';
  ctx.textBaseline = 'top';
  ctx.fillText(subtitle.toUpperCase(), padding, titleY);

  // Title (large)
  const titleSize = format === 'story' ? 80 : 72;
  ctx.font = `900 ${titleSize}px 'Orbitron', system-ui, sans-serif`;
  ctx.fillStyle = '#ffffff';

  // Word-wrap
  const words = title.split(' ');
  const maxWidth = w - padding * 2;
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let lineY = titleY + (format === 'story' ? 45 : 35);
  for (const line of lines.slice(0, 3)) {
    ctx.fillText(line, padding, lineY);
    lineY += titleSize * 1.1;
  }

  return lineY;
}

function drawStatCards(
  ctx: CanvasRenderingContext2D,
  stats: { label: string; value: string; color?: string }[],
  format: ShareFormat,
  startY: number,
) {
  const { w } = FORMAT_DIMENSIONS[format];
  const padding = format === 'story' ? 60 : 60;
  const availableW = w - padding * 2;
  const gap = 20;
  const cardW = (availableW - gap * (stats.length - 1)) / stats.length;
  const cardH = format === 'story' ? 200 : 150;

  stats.forEach((stat, i) => {
    const x = padding + i * (cardW + gap);

    // Card background (glass effect)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    roundRect(ctx, x, startY, cardW, cardH, 16);
    ctx.fill();

    // Border
    ctx.strokeStyle = stat.color ?? 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    roundRect(ctx, x, startY, cardW, cardH, 16);
    ctx.stroke();

    // Label
    ctx.font = `${format === 'story' ? 20 : 16}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.textBaseline = 'top';
    ctx.fillText(stat.label.toUpperCase(), x + 20, startY + 20);

    // Value
    const valueSize = format === 'story' ? 64 : 48;
    ctx.font = `900 ${valueSize}px 'JetBrains Mono', 'Fira Code', monospace`;
    ctx.fillStyle = stat.color ?? '#ff0055';
    ctx.fillText(stat.value, x + 20, startY + (format === 'story' ? 60 : 50));
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// ============================================================================
// HIGH-LEVEL GENERATORS
// ============================================================================

export interface SensitivityShareData {
  dpi: number;
  cm360: number;
  xy: number;
  games: string[];
}

export async function generateSensitivityImage(
  data: SensitivityShareData,
  config: ShareImageConfig = {},
): Promise<Blob> {
  const format = config.format ?? 'og';
  const canvas = createCanvas(format);
  const ctx = canvas.getContext('2d')!;
  const { w, h } = FORMAT_DIMENSIONS[format];

  drawBackground(ctx, w, h, config.bgGradient ?? DEFAULT_GRADIENT);
  drawBranding(ctx, w, h, format);

  const titleY = drawTitle(
    ctx,
    'Meine Sensitivity',
    'SENS · DPI · cm/360°',
    format,
    '#ff0055',
  );

  drawStatCards(
    ctx,
    [
      { label: 'DPI', value: data.dpi.toString(), color: '#00f2ff' },
      { label: 'SENS', value: data.xy.toFixed(3), color: '#ff0055' },
      { label: 'cm/360°', value: data.cm360.toFixed(1), color: '#f5c518' },
    ],
    format,
    titleY + 40,
  );

  // Games played
  if (data.games.length > 0) {
    const gamesY = titleY + 40 + (format === 'story' ? 240 : 180);
    ctx.font = `${format === 'story' ? 24 : 20}px system-ui, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.textBaseline = 'top';
    ctx.fillText(`Konvertiert für: ${data.games.join(', ')}`, 60, gamesY);
  }

  return canvasToBlob(canvas);
}

export interface LoadoutShareData {
  weapons: { name: string; tier: string; slot: number }[];
  style: string;
  phase: string;
  score: number;
}

export async function generateLoadoutImage(
  data: LoadoutShareData,
  config: ShareImageConfig = {},
): Promise<Blob> {
  const format = config.format ?? 'og';
  const canvas = createCanvas(format);
  const ctx = canvas.getContext('2d')!;
  const { w, h } = FORMAT_DIMENSIONS[format];

  drawBackground(ctx, w, h, config.bgGradient ?? ['#001122', '#002244', '#001122']);
  drawBranding(ctx, w, h, format);

  const titleY = drawTitle(
    ctx,
    `${data.style} Loadout`,
    `OPTIMIERT · ${data.phase.toUpperCase()}`,
    format,
    '#00f2ff',
  );

  // Score-Badge
  const scoreY = titleY + 40;
  ctx.fillStyle = 'rgba(0, 242, 255, 0.15)';
  roundRect(ctx, 60, scoreY, format === 'story' ? 300 : 220, format === 'story' ? 80 : 60, 12);
  ctx.fill();
  ctx.strokeStyle = '#00f2ff';
  ctx.lineWidth = 2;
  roundRect(ctx, 60, scoreY, format === 'story' ? 300 : 220, format === 'story' ? 80 : 60, 12);
  ctx.stroke();
  ctx.font = `900 ${format === 'story' ? 36 : 28}px 'Orbitron', system-ui, sans-serif`;
  ctx.fillStyle = '#00f2ff';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    `SCORE: ${data.score}/100`,
    80,
    scoreY + (format === 'story' ? 40 : 30),
  );

  // Weapon list
  const listY = scoreY + (format === 'story' ? 130 : 100);
  ctx.textBaseline = 'top';

  data.weapons.slice(0, 5).forEach((weapon, i) => {
    const y = listY + i * (format === 'story' ? 75 : 55);

    // Slot number
    ctx.fillStyle = '#00f2ff';
    ctx.font = `900 ${format === 'story' ? 32 : 24}px 'JetBrains Mono', monospace`;
    ctx.fillText(`${weapon.slot}.`, 60, y);

    // Name
    ctx.fillStyle = '#ffffff';
    ctx.font = `700 ${format === 'story' ? 32 : 24}px system-ui, sans-serif`;
    ctx.fillText(weapon.name, 120, y);

    // Tier badge
    const tierColors: Record<string, string> = {
      S: '#ef4444',
      A: '#f59e0b',
      B: '#22c55e',
      C: '#3b82f6',
      D: '#9ca3af',
    };
    const tierColor = tierColors[weapon.tier] ?? '#9ca3af';
    const tierX = w - 60 - (format === 'story' ? 90 : 70);
    ctx.fillStyle = `${tierColor}33`;
    roundRect(ctx, tierX, y - 5, format === 'story' ? 80 : 60, format === 'story' ? 46 : 36, 8);
    ctx.fill();
    ctx.fillStyle = tierColor;
    ctx.font = `900 ${format === 'story' ? 28 : 20}px 'Orbitron', monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(
      weapon.tier,
      tierX + (format === 'story' ? 40 : 30),
      y + (format === 'story' ? 6 : 4),
    );
    ctx.textAlign = 'left';
  });

  return canvasToBlob(canvas);
}

export interface StatsShareData {
  username: string;
  kd: number;
  winRate: number;
  wins: number;
  skillScore: number;
  rank: string;
}

export async function generateStatsImage(
  data: StatsShareData,
  config: ShareImageConfig = {},
): Promise<Blob> {
  const format = config.format ?? 'og';
  const canvas = createCanvas(format);
  const ctx = canvas.getContext('2d')!;
  const { w, h } = FORMAT_DIMENSIONS[format];

  drawBackground(ctx, w, h, config.bgGradient ?? ['#001a0f', '#003322', '#001a0f']);
  drawBranding(ctx, w, h, format);

  const titleY = drawTitle(
    ctx,
    `${data.username}`,
    `STATS · ${data.rank}`,
    format,
    '#22c55e',
  );

  drawStatCards(
    ctx,
    [
      { label: 'K/D', value: data.kd.toFixed(2), color: '#22c55e' },
      { label: 'WIN %', value: `${data.winRate.toFixed(1)}%`, color: '#f5c518' },
      { label: 'WINS', value: data.wins.toString(), color: '#ff0055' },
    ],
    format,
    titleY + 40,
  );

  // Skill Score (big)
  const scoreY = titleY + 40 + (format === 'story' ? 240 : 180);
  ctx.font = `${format === 'story' ? 28 : 22}px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.textBaseline = 'top';
  ctx.fillText('SKILL-SCORE', 60, scoreY);

  ctx.font = `900 ${format === 'story' ? 120 : 90}px 'Orbitron', monospace`;
  ctx.fillStyle = '#22c55e';
  ctx.fillText(`${data.skillScore}/100`, 60, scoreY + (format === 'story' ? 40 : 32));

  return canvasToBlob(canvas);
}

export interface WeaponShareData {
  name: string;
  tier: string;
  damage: number;
  dps: number;
  range: number;
  rarity: string;
}

export async function generateWeaponImage(
  data: WeaponShareData,
  config: ShareImageConfig = {},
): Promise<Blob> {
  const format = config.format ?? 'og';
  const canvas = createCanvas(format);
  const ctx = canvas.getContext('2d')!;
  const { w, h } = FORMAT_DIMENSIONS[format];

  const tierGradients: Record<string, [string, string, string]> = {
    S: ['#2a0000', '#4d0000', '#2a0000'],
    A: ['#2a1a00', '#4d2e00', '#2a1a00'],
    B: ['#002a14', '#004d22', '#002a14'],
    C: ['#001a2a', '#002e4d', '#001a2a'],
    D: ['#1a1a1a', '#2d2d2d', '#1a1a1a'],
  };

  drawBackground(ctx, w, h, tierGradients[data.tier] ?? DEFAULT_GRADIENT);
  drawBranding(ctx, w, h, format);

  const titleY = drawTitle(ctx, data.name, `${data.rarity} · ${data.tier}-TIER`, format, '#f5c518');

  drawStatCards(
    ctx,
    [
      { label: 'DMG', value: data.damage.toString(), color: '#ff0055' },
      { label: 'DPS', value: data.dps.toFixed(0), color: '#f5c518' },
      { label: 'RANGE', value: `${data.range}m`, color: '#00f2ff' },
    ],
    format,
    titleY + 40,
  );

  return canvasToBlob(canvas);
}

export interface ProShareData {
  name: string;
  team: string;
  sens: number;
  dpi: number;
  cm360: number;
  country: string;
}

export async function generateProImage(
  data: ProShareData,
  config: ShareImageConfig = {},
): Promise<Blob> {
  const format = config.format ?? 'og';
  const canvas = createCanvas(format);
  const ctx = canvas.getContext('2d')!;
  const { w, h } = FORMAT_DIMENSIONS[format];

  drawBackground(ctx, w, h, DEFAULT_GRADIENT);
  drawBranding(ctx, w, h, format);

  const titleY = drawTitle(
    ctx,
    data.name,
    `${data.team} · ${data.country}`,
    format,
    '#a855f7',
  );

  drawStatCards(
    ctx,
    [
      { label: 'SENS', value: data.sens.toFixed(3), color: '#ff0055' },
      { label: 'DPI', value: data.dpi.toString(), color: '#00f2ff' },
      { label: 'cm/360°', value: data.cm360.toFixed(1), color: '#f5c518' },
    ],
    format,
    titleY + 40,
  );

  return canvasToBlob(canvas);
}

// ============================================================================
// EXPORT HELPERS
// ============================================================================

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob returned null'));
      },
      'image/png',
      0.95,
    );
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyBlobToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (!navigator.clipboard || !('write' in navigator.clipboard)) return false;
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch {
    return false;
  }
}

export async function shareViaWebAPI(
  blob: Blob,
  filename: string,
  text: string,
  url: string,
): Promise<boolean> {
  try {
    if (!navigator.share || !navigator.canShare) return false;
    const file = new File([blob], filename, { type: 'image/png' });
    if (!navigator.canShare({ files: [file] })) return false;
    await navigator.share({
      title: 'Fortnite Nexus',
      text,
      url,
      files: [file],
    });
    return true;
  } catch (err) {
    // User cancelled or API failure
    if ((err as Error).name === 'AbortError') return false;
    return false;
  }
}

export function openTwitterIntent(text: string, url: string, hashtags: string[] = []): void {
  const params = new URLSearchParams({
    text,
    url,
    hashtags: hashtags.join(','),
  });
  window.open(
    `https://twitter.com/intent/tweet?${params.toString()}`,
    '_blank',
    'noopener,noreferrer',
  );
}
