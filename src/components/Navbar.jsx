import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { Menu, X, Search } from 'lucide-react';

function triggerCommandPalette() {
  window.dispatchEvent(new CustomEvent('kidiman:open-command-palette'));
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  const links = [
    { name: t('nav.home'), path: `/${lang}` },
    { name: t('nav.about'), path: `/${lang}/about` },
    { name: t('nav.projects'), path: `/${lang}/projects` },
    { name: t('nav.blog'), path: `/${lang}/blog` },
    { name: t('nav.gallery'), path: `/${lang}/gallery` },
    { name: t('nav.contact'), path: `/${lang}/contact` },
  ];

  const checkIsActive = (linkPath) => {
    if (linkPath === `/${lang}`) {
      return location.pathname === `/${lang}` || location.pathname === `/${lang}/`;
    }
    return location.pathname === linkPath || location.pathname.startsWith(`${linkPath}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-primary/80 border-b border-white/[0.08] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 1. LEFT: LOGO */}
          <div className="flex items-center">
            <Link
              to={`/${lang}`}
              className="py-1 text-textMain hover:text-brand transition-colors group"
              aria-label="Home"
            >
              <span className="font-black text-xl tracking-tight text-white group-hover:text-brand transition-colors">
                YK.
              </span>
            </Link>
          </div>

          {/* 2. CENTER: SEGMENTED SLIDING PILL NAVIGATION (Desktop) */}
          <nav
            className="hidden md:flex items-center gap-0.5 bg-white/[0.03] p-1 rounded-full border border-white/5 shadow-inner"
            aria-label="Main Navigation"
          >
            {links.map((link) => {
              const isActive = checkIsActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT: ACTIONS & CONTROLS (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-brand/40 text-[12px] text-zinc-400 hover:text-white transition-all cursor-pointer font-medium"
              aria-label="Open Command Palette"
              title="Command Palette (Ctrl + K)"
            >
              <Search size={13} className="text-brand" />
              <kbd className="font-mono text-[10.5px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-zinc-400">
                Ctrl K
              </kbd>
            </button>
            <LanguageToggle />
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Open Command Palette"
            >
              <Search size={16} />
            </button>
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden border-t border-white/[0.08] bg-primary/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
              {links.map((link) => {
                const isActive = checkIsActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all ${
                      isActive
                        ? 'bg-brand text-white font-semibold shadow-md'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
