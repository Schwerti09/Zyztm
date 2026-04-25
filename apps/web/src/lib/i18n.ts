/**
 * i18n Configuration for Fortnite Nexus
 * Multi-language support for 10 languages
 */

export type Language = 'en' | 'de' | 'es' | 'fr' | 'pt-br' | 'it' | 'ru' | 'pl' | 'tr' | 'ja';

export const LANGUAGES: Array<{
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'US/UK' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain/LATAM' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', nativeName: 'Português', flag: '🇧🇷', region: 'Brazil' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Italy' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Russia/Eastern Europe' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', region: 'Poland' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Turkey' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan' },
];

export const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Detect language from browser
 */
export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.split('-')[0];
  
  // Map browser language to our supported languages
  const langMap: Record<string, Language> = {
    en: 'en',
    de: 'de',
    es: 'es',
    fr: 'fr',
    pt: 'pt-br',
    it: 'it',
    ru: 'ru',
    pl: 'pl',
    tr: 'tr',
    ja: 'ja',
  };
  
  return langMap[browserLang] || DEFAULT_LANGUAGE;
}

/**
 * Get language from URL path
 */
export function getLanguageFromPath(path: string): Language {
  const segments = path.split('/').filter(Boolean);
  const langSegment = segments[0];
  
  if (LANGUAGES.some(lang => lang.code === langSegment)) {
    return langSegment as Language;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Build localized URL
 */
export function buildLocalizedUrl(path: string, language: Language): string {
  const segments = path.split('/').filter(Boolean);
  
  // If path already starts with a language code, replace it
  if (LANGUAGES.some(lang => lang.code === segments[0])) {
    segments[0] = language;
  } else {
    segments.unshift(language);
  }
  
  return `/${segments.join('/')}`;
}

/**
 * Get language name for display
 */
export function getLanguageName(code: Language): string {
  return LANGUAGES.find(lang => lang.code === code)?.name || code;
}

/**
 * Get language flag emoji
 */
export function getLanguageFlag(code: Language): string {
  return LANGUAGES.find(lang => lang.code === code)?.flag || '🌐';
}
