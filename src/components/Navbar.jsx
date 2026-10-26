import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useLocation, Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

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
    { name: t('nav.gallery'), path: `/${lang}/gallery` },
    { name: t('nav.contact'), path: `/${lang}/contact` }
  ];

  const checkIsActive = (linkPath) => {
    if (linkPath === `/${lang}`) {
      return location.pathname === `/${lang}` || location.pathname === `/${lang}/`;
    }
    return location.pathname === linkPath || location.pathname.startsWith(`${linkPath}/`);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-primary/80 border-b border-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to={`/${lang}`}
              className="text-xl font-bold tracking-tighter text-brand hover:opacity-90 transition-opacity"
            >
              YK.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = checkIsActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link relative py-2 ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-brand"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <div className="flex items-center gap-2.5 pl-4 border-l border-secondary">
              <button
                type="button"
                onClick={triggerCommandPalette}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary border border-white/10 hover:border-brand/40 text-xs text-textMuted hover:text-white transition-all cursor-pointer"
                aria-label="Open Command Palette"
                title="Command Palette (Ctrl + K)"
              >
                <Search size={14} className="text-brand" />
                <kbd className="font-mono text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10">
                  Ctrl K
                </kbd>
              </button>
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2.5">
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="p-2 rounded-full bg-secondary text-textMain hover:bg-brand hover:text-white transition-colors cursor-pointer"
              aria-label="Open Command Palette"
            >
              <Search size={18} />
            </button>
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textMain p-1 rounded-md hover:bg-secondary transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-card/95 backdrop-blur-xl border-b border-secondary"
        >
          <div className="px-3 pt-2 pb-4 space-y-1 flex flex-col">
            {links.map((link) => {
              const isActive = checkIsActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-brand text-white shadow-md'
                      : 'text-textMuted hover:text-white hover:bg-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
