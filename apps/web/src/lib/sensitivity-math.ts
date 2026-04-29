/**
 * Sensitivity Math Library
 * Wissenschaftliche Cross-Game Sensitivity Berechnung
 *
 * Unterstützt: Fortnite, Valorant, CS2, Apex Legends, Overwatch 2, CoD, Rainbow Six Siege, PUBG
 *
 * Methodik:
 * - Jedes Spiel hat einen proprietären Sensitivity-Multiplier (Yaw).
 * - cm/360° = (360 / (game_sens * game_yaw)) * (2.54 / DPI) * 100
 * - Konvertierung erfolgt über cm/360° als Ankerwert (DPI-neutral).
 * - FOV-Scaling: Manche Spiele scalen Aim-Sens mit FOV. Wir korrigieren das.
 */

export interface GameConfig {
  id: string;
  name: string;
  /** Yaw-Multiplier in Grad pro Counts pro Sens-Einheit */
  yaw: number;
  /** Default-FOV in Grad (horizontal) */
  defaultFov: number;
  /** Ob das Spiel FOV-Scaling im Aim-Mode nutzt */
  fovScaling: boolean;
  /** Typische Min/Max Sens-Werte */
  sensRange: { min: number; max: number };
  /** Sens-Einheit (z.B. "Mouse Sensitivity", "eDPI-Multiplier") */
  unit: string;
}

export const GAMES: GameConfig[] = [
  {
    id: 'fortnite',
    name: 'Fortnite',
    yaw: 0.5714, // bei Sens 1.0 = 0.5714°/Count bei 800 DPI
    defaultFov: 80,
    fovScaling: false,
    sensRange: { min: 0.01, max: 10 },
    unit: 'X-Achse Sensitivität (0.01–10)',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    yaw: 0.07,
    defaultFov: 103,
    fovScaling: false,
    sensRange: { min: 0.01, max: 10 },
    unit: 'Mouse Sensitivity',
  },
  {
    id: 'cs2',
    name: 'CS2 / CS:GO',
    yaw: 0.022,
    defaultFov: 90,
    fovScaling: false,
    sensRange: { min: 0.01, max: 10 },
    unit: 'sensitivity cvar',
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    yaw: 0.022,
    defaultFov: 90,
    fovScaling: true,
    sensRange: { min: 0.1, max: 10 },
    unit: 'Mouse Sensitivity',
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    yaw: 0.0066,
    defaultFov: 103,
    fovScaling: false,
    sensRange: { min: 1, max: 100 },
    unit: 'Sensitivity (1-100)',
  },
  {
    id: 'cod',
    name: 'Call of Duty (MW3/Warzone)',
    yaw: 0.0066,
    defaultFov: 80,
    fovScaling: true,
    sensRange: { min: 0.1, max: 25 },
    unit: 'Mouse Sensitivity',
  },
  {
    id: 'r6',
    name: 'Rainbow Six Siege',
    yaw: 0.00572958,
    defaultFov: 90,
    fovScaling: false,
    sensRange: { min: 1, max: 100 },
    unit: 'Mouse Sensitivity Multiplier',
  },
  {
    id: 'pubg',
    name: 'PUBG',
    yaw: 0.03,
    defaultFov: 90,
    fovScaling: false,
    sensRange: { min: 1, max: 100 },
    unit: 'General Sensitivity',
  },
];

export interface SensitivityInput {
  gameId: string;
  sensitivity: number;
  dpi: number;
  fov?: number;
}

export interface ConversionResult {
  targetSensitivity: number;
  cm360: number;
  inches360: number;
  degreesPerCount: number;
  fovAdjusted: boolean;
  warning?: string;
}

const INCH_TO_CM = 2.54;

/**
 * Berechnet cm/360° aus einem Game-Setting.
 */
export function toCm360(input: SensitivityInput): number {
  const game = GAMES.find((g) => g.id === input.gameId);
  if (!game) throw new Error(`Unknown game: ${input.gameId}`);

  // Grad pro Count
  const degreesPerCount = input.sensitivity * game.yaw;
  // Counts für 360°
  const countsFor360 = 360 / degreesPerCount;
  // Zentimeter für 360° (cm/inch umgerechnet via DPI)
  return (countsFor360 / input.dpi) * INCH_TO_CM;
}

/**
 * Berechnet die Ziel-Sensitivity aus einem cm/360°-Wert.
 */
export function fromCm360(cm360: number, gameId: string, dpi: number): number {
  const game = GAMES.find((g) => g.id === gameId);
  if (!game) throw new Error(`Unknown game: ${gameId}`);

  // Inches für 360°
  const inches360 = cm360 / INCH_TO_CM;
  // Counts für 360°
  const countsFor360 = inches360 * dpi;
  // Grad pro Count (Target)
  const degreesPerCount = 360 / countsFor360;
  // Sens
  return degreesPerCount / game.yaw;
}

/**
 * Vollständige Konvertierung mit FOV-Adjustment.
 */
export function convertSensitivity(
  from: SensitivityInput,
  toGameId: string,
  toFov?: number,
): ConversionResult {
  const fromGame = GAMES.find((g) => g.id === from.gameId);
  const toGame = GAMES.find((g) => g.id === toGameId);

  if (!fromGame || !toGame) {
    throw new Error('Invalid game configuration');
  }

  const cm360 = toCm360(from);
  let targetSens = fromCm360(cm360, toGameId, from.dpi);

  let fovAdjusted = false;
  let warning: string | undefined;

  // FOV-Scaling-Correction für Spiele die Aim mit FOV scalen
  if (toGame.fovScaling && toFov && toFov !== toGame.defaultFov) {
    const fovRatio = Math.tan((toFov * Math.PI) / 360) / Math.tan((toGame.defaultFov * Math.PI) / 360);
    targetSens = targetSens / fovRatio;
    fovAdjusted = true;
  }

  if (fromGame.fovScaling && from.fov && from.fov !== fromGame.defaultFov) {
    warning = 'Quell-Spiel nutzt FOV-Scaling. Ergebnis basiert auf deinem aktuellen FOV.';
  }

  // Grenzwert-Check
  if (targetSens < toGame.sensRange.min) {
    warning = `Ziel-Sensitivity (${targetSens.toFixed(4)}) liegt unter Spiel-Minimum (${toGame.sensRange.min}). Erhöhe DPI.`;
  } else if (targetSens > toGame.sensRange.max) {
    warning = `Ziel-Sensitivity (${targetSens.toFixed(4)}) liegt über Spiel-Maximum (${toGame.sensRange.max}). Reduziere DPI.`;
  }

  return {
    targetSensitivity: Number(targetSens.toFixed(4)),
    cm360: Number(cm360.toFixed(2)),
    inches360: Number((cm360 / INCH_TO_CM).toFixed(2)),
    degreesPerCount: Number((cm360 > 0 ? 360 / (cm360 / INCH_TO_CM / from.dpi * INCH_TO_CM) : 0).toFixed(6)),
    fovAdjusted,
    warning,
  };
}

/**
 * Gibt eine Einschätzung zur Sens (Low/Medium/High/Flick) zurück.
 */
export function classifySensitivity(cm360: number): {
  label: string;
  description: string;
  color: string;
} {
  if (cm360 >= 60) {
    return {
      label: 'Ultra Low',
      description: 'Extrem niedrige Sens. Pro-Sniper-Level. Sehr großer Maus-Platz nötig.',
      color: '#3B82F6',
    };
  }
  if (cm360 >= 40) {
    return {
      label: 'Low',
      description: 'Niedrige Sens. Sehr präzise. Bevorzugt von CS/Valorant Pros.',
      color: '#22C55E',
    };
  }
  if (cm360 >= 25) {
    return {
      label: 'Medium',
      description: 'Mittlere Sens. Balance zwischen Präzision und Flick. Meiste Pros.',
      color: '#A855F7',
    };
  }
  if (cm360 >= 15) {
    return {
      label: 'High',
      description: 'Hohe Sens. Flick-orientiert. Schnelle Drehungen, weniger Präzision.',
      color: '#F59E0B',
    };
  }
  return {
    label: 'Flick',
    description: 'Sehr hohe Sens. Extrem schnell, erfordert viel Übung für Präzision.',
    color: '#EF4444',
  };
}

/**
 * Berechnet effective DPI (eDPI = Sens × DPI)
 */
export function calculateEDPI(sensitivity: number, dpi: number): number {
  return Math.round(sensitivity * dpi);
}
