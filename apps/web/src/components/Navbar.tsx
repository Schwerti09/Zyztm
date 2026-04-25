import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import LanguageSwitcher from './LanguageSwitcher';
import { getLanguageFromPath, type Language } from '../lib/i18n';

const NAV_LINKS = [
  { label: 'LIVE', href: '#highlights' },
  { label: 'SHOP', href: '#marketplace' },
  { label: 'CREATORS', href: '#creators' },
  { label: 'NEWS', href: '#latest-news' },
  { label: 'GUIDES', href: '/de/guides/fortnite', isRoute: true },
  { label: 'COMMUNITY', href: '#community-spotlight' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Detect language from URL on mount and route changes
    const lang = getLanguageFromPath(window.location.pathname);
    setCurrentLanguage(lang);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-40">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 border-neon-pink/40 shadow-[0_4px_24px_rgba(255,0,85,0.15)]'
            : 'bg-black/80 border-white/10'
        } backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-cyber font-bold tracking-widest text-base select-none">
              <span className="text-lg">🎮</span>
              <span className="text-neon-pink neon-text-pink">FORTNITE</span>
              <span className="text-white/80 hidden sm:inline">NEXUS</span>
            </a>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href, isRoute }) => (
              <li key={label}>
                {isRoute ? (
                  <Link href={href}>
                    <a
                      className="px-3 py-1.5 text-xs font-cyber tracking-widest text-white/60 hover:text-neon-blue transition-colors relative group"
                    >
                      {label}
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </a>
                  </Link>
                ) : (
                  <button
                    onClick={() => handleAnchorClick(href)}
                    className="px-3 py-1.5 text-xs font-cyber tracking-widest text-white/60 hover:text-neon-blue transition-colors relative group bg-transparent border-0 cursor-pointer"
                  >
                    {label}
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Language Switcher & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher currentLanguage={currentLanguage} />
            <a
              href="https://discord.gg/fortnitenexus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-xs font-cyber font-bold tracking-widest border border-neon-pink text-neon-pink bg-neon-pink/5 hover:bg-neon-pink/20 shadow-[0_0_10px_rgba(255,0,85,0.2)] hover:shadow-[0_0_20px_rgba(255,0,85,0.5)] transition-all duration-200"
            >
              JOIN NOW
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-transparent border-0 cursor-pointer"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px bg-neon-pink origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-neon-pink"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-neon-pink origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-bg-dark/[0.97] border-b border-neon-pink/30 backdrop-blur-xl"
          >
            <ul className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, isRoute }) => (
                <li key={label}>
                  {isRoute ? (
                    <Link href={href}>
                      <a
                        className="block px-3 py-2.5 text-sm font-cyber tracking-widest text-white/70 hover:text-neon-blue border-l-2 border-transparent hover:border-neon-blue transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {label}
                      </a>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleAnchorClick(href)}
                      className="w-full text-left px-3 py-2.5 text-sm font-cyber tracking-widest text-white/70 hover:text-neon-blue border-l-2 border-transparent hover:border-neon-blue transition-colors bg-transparent border-y-0 border-r-0 cursor-pointer"
                    >
                      {label}
                    </button>
                  )}
                </li>
              ))}
              <li className="pt-2 flex justify-center">
                <LanguageSwitcher currentLanguage={currentLanguage} />
              </li>
              <li className="pt-2">
                <a
                  href="https://discord.gg/fortnitenexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 text-sm font-cyber font-bold tracking-widest text-center text-neon-pink border border-neon-pink/40 bg-neon-pink/5"
                  onClick={() => setMenuOpen(false)}
                >
                  JOIN COMMUNITY
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
