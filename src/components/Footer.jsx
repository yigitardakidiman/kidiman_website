import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-secondary mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-textMuted text-sm">
          &copy; {currentYear} Yiğit Arda Kıdıman. {t('footer.rights')}
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://github.com/yigitardakidiman" target="_blank" rel="noreferrer" className="text-textMuted hover:text-brand transition-colors">
            <span className="sr-only">GitHub</span>
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/yigitardakidiman/" target="_blank" rel="noreferrer" className="text-textMuted hover:text-brand transition-colors">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.instagram.com/codewithkidiman/" target="_blank" rel="noreferrer" className="text-textMuted hover:text-brand transition-colors">
            <span className="sr-only">Instagram</span>
            <FaInstagram size={20} />
          </a>
          <a href="mailto:yigitardakidiman@gmail.com" className="text-textMuted hover:text-brand transition-colors">
            <span className="sr-only">Email</span>
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
