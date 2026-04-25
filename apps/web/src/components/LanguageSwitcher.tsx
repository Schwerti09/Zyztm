/**
 * Language Switcher Component
 * Allows users to switch between 10 supported languages
 */
'use client';

import { useState } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE, type Language, getLanguageFlag, detectBrowserLanguage } from '../lib/i18n';
import { Link } from 'wouter';

interface LanguageSwitcherProps {
  currentLanguage?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export default function LanguageSwitcher({ currentLanguage = DEFAULT_LANGUAGE, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [autoDetect, setAutoDetect] = useState(false);

  const handleLanguageSelect = (lang: Language) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    } else {
      // Store preference in localStorage
      localStorage.setItem('preferred-language', lang);
      // Reload page with new language
      window.location.href = buildLanguageUrl(lang);
    }
    setIsOpen(false);
  };

  const handleAutoDetect = () => {
    const detectedLang = detectBrowserLanguage();
    setAutoDetect(true);
    handleLanguageSelect(detectedLang);
  };

  const buildLanguageUrl = (lang: Language): string => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    // Replace first segment if it's a language code
    if (LANGUAGES.some(l => l.code === segments[0])) {
      segments[0] = lang;
      return `/${segments.join('/')}`;
    }
    
    // Prepend language code
    return `/${lang}${currentPath}`;
  };

  const currentLangData = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card/50 border border-white/10 hover:border-neon-blue/50 transition-all text-white font-body text-sm"
      >
        <span className="text-xl">{getLanguageFlag(currentLanguage)}</span>
        <span className="hidden sm:inline">{currentLangData.nativeName}</span>
        <span className="text-white/30">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-bg-card border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-3 border-b border-white/10">
            <button
              onClick={handleAutoDetect}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-white/80 text-sm font-body"
            >
              <span className="text-xl">🌐</span>
              <span>Auto-detect</span>
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${
                  currentLanguage === lang.code ? 'bg-neon-blue/10 text-neon-blue' : 'text-white/80'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-body text-sm">{lang.nativeName}</div>
                  <div className="font-body text-xs text-white/40">{lang.name} - {lang.region}</div>
                </div>
                {currentLanguage === lang.code && (
                  <span className="text-neon-blue">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
