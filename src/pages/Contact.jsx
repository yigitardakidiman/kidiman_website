import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Copy, Check } from 'lucide-react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import SEO from '../components/SEO';

const EMAIL_ADDRESS = "yigitardakidiman@gmail.com";

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  const contacts = [
    {
      title: t('contact.email'),
      value: EMAIL_ADDRESS,
      href: `mailto:${EMAIL_ADDRESS}`,
      icon: <Mail size={28} />,
      isEmail: true
    },
    {
      title: t('contact.linkedin'),
      value: "linkedin.com/in/yigitardakidiman",
      href: "https://www.linkedin.com/in/yigitardakidiman/",
      icon: <FaLinkedin size={28} />
    },
    {
      title: t('contact.instagram'),
      value: "@codewithkidiman",
      href: "https://www.instagram.com/codewithkidiman/",
      icon: <FaInstagram size={28} />
    }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 py-6 max-w-5xl mx-auto px-4"
    >
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        keywords={t('seo.contact.keywords')}
        path="contact"
      />
      <h1 className="sr-only">{t('contact.heading')} - {t('contact.subtitle')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {contacts.map((contact, index) => (
          <motion.div key={index} variants={item} className="relative">
            <a
              href={contact.href}
              target={contact.isEmail ? undefined : "_blank"}
              rel={contact.isEmail ? undefined : "noreferrer"}
              className="card-base flex flex-col items-center text-center gap-3 group h-full bg-[#16161a] border border-white/[0.08] hover:border-brand/40 hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] transition-all py-5 px-4 relative"
            >
              <div className="p-3 bg-secondary rounded-2xl text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300">
                {contact.icon}
              </div>
              <div className="w-full">
                <h3 className="text-base font-bold mb-1 text-textMain">{contact.title}</h3>
                <p className="text-xs text-textMuted break-all">{contact.value}</p>
              </div>
            </a>

            {contact.isEmail && (
              <button
                type="button"
                onClick={handleCopyEmail}
                title={copied ? t('contact.copied') : t('contact.copyEmail')}
                aria-label={copied ? t('contact.copied') : t('contact.copyEmail')}
                className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border backdrop-blur-md transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 hover:bg-brand/20 border-white/10 hover:border-brand/40 text-textMuted hover:text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={13} />
                    <span>{t('contact.copied')}</span>
                  </>
                ) : (
                  <Copy size={13} />
                )}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
