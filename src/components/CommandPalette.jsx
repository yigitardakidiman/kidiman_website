import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Home,
  User,
  FolderGit2,
  Image as ImageIcon,
  Mail,
  Link2,
  FileText,
  Copy,
  Check,
  Globe,
  ArrowUpRight,
  CornerDownLeft,
} from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const EMAIL_ADDRESS = 'yigitardakidiman@gmail.com';
const OPEN_COMMAND_PALETTE_EVENT = 'kidiman:open-command-palette';

export default function CommandPalette() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const inputRef = useRef(null);
  const listRef = useRef(null);

  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';
  const nextLang = lang === 'en' ? 'tr' : 'en';
  const resumeUrl = lang === 'tr' ? '/documents/resume-tr.pdf' : '/documents/resume.pdf';

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    if (!copiedEmail) return;
    const timer = setTimeout(() => {
      setCopiedEmail(false);
      closePalette();
    }, 900);
    return () => clearTimeout(timer);
  }, [copiedEmail, closePalette]);

  const switchLanguage = useCallback(() => {
    i18n.changeLanguage(nextLang);
    try {
      localStorage.setItem('i18nextLng', nextLang);
    } catch {
      // Ignore storage errors
    }

    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && (pathParts[0] === 'tr' || pathParts[0] === 'en')) {
      pathParts[0] = nextLang;
      navigate(`/${pathParts.join('/')}${location.search}${location.hash}`, { replace: true });
    } else if (location.pathname !== '/links') {
      navigate(`/${nextLang}${location.pathname}${location.search}${location.hash}`, { replace: true });
    }
    closePalette();
  }, [i18n, nextLang, location, navigate, closePalette]);

  const executeCommand = useCallback(
    async (cmdId) => {
      switch (cmdId) {
        case 'nav-home':
          navigate(`/${lang}`);
          closePalette();
          break;
        case 'nav-about':
          navigate(`/${lang}/about`);
          closePalette();
          break;
        case 'nav-projects':
          navigate(`/${lang}/projects`);
          closePalette();
          break;
        case 'nav-gallery':
          navigate(`/${lang}/gallery`);
          closePalette();
          break;
        case 'nav-contact':
          navigate(`/${lang}/contact`);
          closePalette();
          break;
        case 'nav-links':
          navigate('/links');
          closePalette();
          break;
        case 'action-resume':
          window.open(resumeUrl, '_blank', 'noopener,noreferrer');
          closePalette();
          break;
        case 'action-copy-email':
          try {
            await navigator.clipboard.writeText(EMAIL_ADDRESS);
            setCopiedEmail(true);
          } catch {
            closePalette();
          }
          break;
        case 'action-switch-lang':
          switchLanguage();
          break;
        case 'social-github':
          window.open('https://github.com/yigitardakidiman', '_blank', 'noopener,noreferrer');
          closePalette();
          break;
        case 'social-linkedin':
          window.open('https://www.linkedin.com/in/yigitardakidiman/', '_blank', 'noopener,noreferrer');
          closePalette();
          break;
        case 'social-instagram':
          window.open('https://www.instagram.com/codewithkidiman/', '_blank', 'noopener,noreferrer');
          closePalette();
          break;
        default:
          break;
      }
    },
    [navigate, lang, closePalette, resumeUrl, switchLanguage]
  );

  const commands = useMemo(
    () => [
      // Navigation
      {
        id: 'nav-home',
        section: t('commandPalette.sections.navigation'),
        label: t('nav.home'),
        keywords: 'home ana sayfa baslangic',
        icon: Home,
      },
      {
        id: 'nav-about',
        section: t('commandPalette.sections.navigation'),
        label: t('nav.about'),
        keywords: 'about hakkimda kimdir egitim deneyim skills',
        icon: User,
      },
      {
        id: 'nav-projects',
        section: t('commandPalette.sections.navigation'),
        label: t('nav.projects'),
        keywords: 'projects projeler github open source',
        icon: FolderGit2,
      },
      {
        id: 'nav-gallery',
        section: t('commandPalette.sections.navigation'),
        label: t('nav.gallery'),
        keywords: 'gallery galeri fotograflar photos',
        icon: ImageIcon,
      },
      {
        id: 'nav-contact',
        section: t('commandPalette.sections.navigation'),
        label: t('nav.contact'),
        keywords: 'contact iletisim ulasin',
        icon: Mail,
      },
      {
        id: 'nav-links',
        section: t('commandPalette.sections.navigation'),
        label: t('commandPalette.items.links'),
        keywords: 'links baglantilar bio',
        icon: Link2,
      },

      // Quick Actions
      {
        id: 'action-resume',
        section: t('commandPalette.sections.actions'),
        label: t('commandPalette.items.resume'),
        keywords: 'cv resume ozgecmis pdf indir',
        icon: FileText,
        external: true,
      },
      {
        id: 'action-copy-email',
        section: t('commandPalette.sections.actions'),
        label: copiedEmail ? t('contact.copied') : t('commandPalette.items.copyEmail'),
        keywords: 'email eposta mail copy kopyala yigitardakidiman',
        icon: copiedEmail ? Check : Copy,
      },
      {
        id: 'action-switch-lang',
        section: t('commandPalette.sections.actions'),
        label: t('commandPalette.items.switchLang'),
        keywords: 'language dil tr en english turkce',
        icon: Globe,
      },

      // Socials
      {
        id: 'social-github',
        section: t('commandPalette.sections.social'),
        label: t('commandPalette.items.github'),
        keywords: 'github repo code yigitardakidiman',
        icon: FaGithub,
        external: true,
      },
      {
        id: 'social-linkedin',
        section: t('commandPalette.sections.social'),
        label: t('commandPalette.items.linkedin'),
        keywords: 'linkedin kariyer profil',
        icon: FaLinkedin,
        external: true,
      },
      {
        id: 'social-instagram',
        section: t('commandPalette.sections.social'),
        label: t('commandPalette.items.instagram'),
        keywords: 'instagram codewithkidiman sosyal',
        icon: FaInstagram,
        external: true,
      },
    ],
    [t, copiedEmail]
  );

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.section.toLowerCase().includes(q) ||
        cmd.keywords.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const safeActiveIndex =
    filteredCommands.length > 0 ? Math.min(activeIndex, filteredCommands.length - 1) : 0;

  // Scroll the active item into view when navigating via keyboard
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-cmd-index="${safeActiveIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [safeActiveIndex, isOpen]);

  // Global keyboard shortcut (Ctrl+K / Cmd+K) and custom event listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (!next) {
            setQuery('');
            setActiveIndex(0);
          }
          return next;
        });
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filteredCommands[safeActiveIndex];
        if (selected) {
          executeCommand(selected.id);
        }
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, handleCustomOpen);
    };
  }, [isOpen, filteredCommands, safeActiveIndex, closePalette, executeCommand]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 20);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // Group filtered commands by section while keeping flat index for keyboard navigation
  const groupedSections = useMemo(() => {
    const map = new Map();
    filteredCommands.forEach((cmd, flatIndex) => {
      if (!map.has(cmd.section)) {
        map.set(cmd.section, []);
      }
      map.get(cmd.section).push({ ...cmd, flatIndex });
    });
    return Array.from(map.entries());
  }, [filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          data-lenis-prevent
          className="fixed inset-0 z-[110] flex items-start justify-center bg-black/75 backdrop-blur-md pt-[12vh] px-4"
          onClick={closePalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            data-lenis-prevent
            className="w-full max-w-lg rounded-2xl bg-[#121318] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.75)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
          >
            {/* Search Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={18} className="text-brand shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder={t('commandPalette.placeholder')}
                className="w-full bg-transparent text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={closePalette}
                className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-mono text-textMuted uppercase cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Command List */}
            <div
              ref={listRef}
              data-lenis-prevent
              className="max-h-[55vh] overflow-y-auto overscroll-contain p-2 space-y-3 scrollbar-custom"
            >
              {groupedSections.length === 0 ? (
                <div className="py-10 text-center text-sm text-textMuted">
                  {t('commandPalette.noResults')}
                </div>
              ) : (
                groupedSections.map(([sectionName, items]) => (
                  <div key={sectionName} className="space-y-1">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-textMuted/70">
                      {sectionName}
                    </div>
                    {items.map((item) => {
                      const Icon = item.icon;
                      const isActive = item.flatIndex === safeActiveIndex;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-cmd-index={item.flatIndex}
                          onMouseEnter={() => setActiveIndex(item.flatIndex)}
                          onClick={() => executeCommand(item.id)}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-brand text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                              : 'text-textMuted hover:text-textMain hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <Icon
                              size={17}
                              className={isActive ? 'text-white shrink-0' : 'text-brand shrink-0'}
                            />
                            <span className="font-medium truncate">{item.label}</span>
                          </div>
                          {item.external ? (
                            <ArrowUpRight
                              size={15}
                              className={isActive ? 'text-white/90 shrink-0' : 'text-textMuted/50 shrink-0'}
                            />
                          ) : (
                            <CornerDownLeft
                              size={14}
                              className={isActive ? 'text-white/90 shrink-0' : 'opacity-0 shrink-0'}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Keyboard Hints */}
            <div className="px-4 py-2.5 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] text-textMuted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">↑↓</kbd>
                  <span>{t('commandPalette.footer.navigate')}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">↵</kbd>
                  <span>{t('commandPalette.footer.select')}</span>
                </span>
              </div>
              <span className="font-mono text-[10px] text-textMuted/60">Ctrl + K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
