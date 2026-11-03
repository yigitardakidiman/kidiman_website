import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'tr';
  const newLang = currentLang === 'en' ? 'tr' : 'en';

  const toggleLanguage = () => {
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem('i18nextLng', newLang);
    } catch {
      // Ignore localStorage errors
    }

    // Replace the language prefix in the current pathname
    const pathname = location.pathname;
    const pathParts = pathname.split('/').filter(Boolean);

    if (pathParts.length > 0 && (pathParts[0] === 'tr' || pathParts[0] === 'en')) {
      pathParts[0] = newLang;
      navigate(`/${pathParts.join('/')}${location.search}${location.hash}`, { replace: true });
    } else {
      navigate(`/${newLang}${pathname}${location.search}${location.hash}`, { replace: true });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand/40 text-textMain transition-all uppercase font-mono font-medium text-[12px] cursor-pointer"
      aria-label="Toggle Language"
    >
      <Globe size={14} className="text-brand shrink-0" />
      <span>{newLang}</span>
    </motion.button>
  );
}
