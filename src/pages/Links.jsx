import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  FileText,
  Globe2,
  Mail,
  Share2
} from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedin, FaSpotify } from 'react-icons/fa';
import SEO from '../components/SEO';

const featuredLinks = [
  {
    title: 'Özgeçmiş & Deneyimlerim',
    href: '/documents/resume-tr.pdf',
    icon: FileText,
    badge: 'CV / PDF',
    highlight: true,
    external: true
  },
  {
    title: 'Kişisel Web Sitem',
    href: '/',
    icon: Globe2,
    external: false
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yigitardakidiman/',
    icon: FaLinkedin,
    external: true
  },
  {
    title: 'GitHub',
    href: 'https://github.com/yigitardakidiman',
    icon: FaGithub,
    external: true
  },
  {
    title: 'Spotify',
    href: 'https://open.spotify.com',
    icon: FaSpotify,
    external: true
  },
  {
    title: 'E-posta',
    href: 'mailto:yigitardakidiman@gmail.com',
    icon: Mail,
    external: false
  }
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/codewithkidiman/',
    icon: FaInstagram
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yigitardakidiman',
    icon: FaGithub
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yigitardakidiman/',
    icon: FaLinkedin
  },
  {
    label: 'E-posta',
    href: 'mailto:yigitardakidiman@gmail.com',
    icon: Mail
  }
];

const MotionLink = motion.create(Link);

export default function Links() {
  const [copied, setCopied] = useState(false);
  const copyResetTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyResetTimer.current), []);

  const showCopiedState = () => {
    setCopied(true);
    clearTimeout(copyResetTimer.current);
    copyResetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Yiğit Arda Kıdıman',
      text: 'Yiğit Arda Kıdıman — bağlantılar',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      showCopiedState();
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('Bağlantı paylaşılamadı:', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07080c] text-textMain selection:bg-brand/40">
      <SEO
        title="Yiğit Arda Kıdıman | Bağlantılar"
        description="Yiğit Arda Kıdıman'ın projeleri, sosyal medya hesapları ve iletişim bağlantıları."
        keywords="Yiğit Arda Kıdıman, bağlantılar, GitHub, LinkedIn, Instagram, projeler"
        path="links"
        localized={false}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to bottom, black, transparent 75%)'
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-12rem] right-[-10rem] h-96 w-96 rounded-full bg-indigo-600/10 blur-[100px]"
        aria-hidden="true"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[460px] flex-col px-4 pb-10 pt-5 sm:pb-14 sm:pt-8">
        <div className="flex min-h-10 items-center justify-end">
          <motion.button
            type="button"
            onClick={handleShare}
            whileTap={{ scale: 0.92 }}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-textMuted backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label={copied ? 'Bağlantı kopyalandı' : 'Sayfayı paylaş'}
            title={copied ? 'Kopyalandı' : 'Paylaş'}
          >
            {copied ? <Check size={18} /> : <Share2 size={18} />}
            {copied && (
              <span className="absolute right-12 whitespace-nowrap rounded-lg border border-white/10 bg-secondary px-2.5 py-1.5 text-xs font-medium text-white shadow-xl">
                Kopyalandı
              </span>
            )}
          </motion.button>
        </div>

        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-4">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-400 via-brand to-indigo-700 opacity-75 blur-sm" />
            <img
              src="/img/resim1.png"
              alt="Yiğit Arda Kıdıman"
              className="relative h-24 w-24 rounded-full border-2 border-[#11131a] object-cover object-[center_35%] shadow-2xl sm:h-28 sm:w-28"
              width="112"
              height="112"
            />
            <span
              className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-[3px] border-[#0b0c11] bg-emerald-400"
              aria-label="Müsait"
              title="Müsait"
            />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Yiğit Arda Kıdıman</h1>
          <p className="mt-1 text-sm font-medium text-brand sm:text-base">@codewithkidiman</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-textMuted sm:text-base">
            Yazılım geliştirici ve mühendislik öğrencisi. Fikirleri işlevsel dijital ürünlere dönüştürüyorum.
          </p>

          <div className="mt-5 flex items-center gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-textMuted transition-all hover:border-brand/50 hover:bg-brand/10 hover:text-white"
                aria-label={label}
                title={label}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.header>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.12, staggerChildren: 0.065 } }
          }}
          className="mt-6 space-y-2.5 sm:space-y-3"
          aria-label="Bağlantılar"
        >
          {featuredLinks.map(({ title, href, icon: Icon, external, highlight, badge }) => {
            const isInternalRoute = !external && href.startsWith('/');
            const cardClassName = `group relative flex min-h-[56px] items-center gap-3.5 rounded-2xl border p-2.5 pl-3 pr-4 backdrop-blur-xl transition-all duration-300 sm:min-h-[62px] sm:p-3 sm:pl-3.5 sm:pr-4 ${
              highlight
                ? 'border-brand/40 bg-gradient-to-r from-brand/[0.14] via-white/[0.08] to-white/[0.05] shadow-[0_0_25px_rgba(59,130,246,0.15)] ring-1 ring-brand/30 hover:border-brand/70 hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]'
                : 'border-white/[0.09] bg-white/[0.055] shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:border-brand/45 hover:bg-white/[0.085] hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)]'
            }`;
            const itemVariants = {
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
            };

            const innerContent = (
              <>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:h-11 sm:w-11 ${
                    highlight
                      ? 'border-brand/50 bg-brand/20 text-brand shadow-[0_0_15px_rgba(59,130,246,0.25)] group-hover:scale-105 group-hover:bg-brand group-hover:text-white'
                      : 'border-white/[0.08] bg-black/25 text-brand group-hover:border-brand/30 group-hover:bg-brand group-hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                </span>

                <span className="min-w-0 flex-1 text-left">
                  <span className="flex items-center gap-2">
                    <span className="block text-[14px] font-semibold text-white sm:text-[15px]">{title}</span>
                    {badge && (
                      <span className="inline-flex items-center rounded-md border border-brand/40 bg-brand/20 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-blue-300 uppercase">
                        {badge}
                      </span>
                    )}
                  </span>
                </span>

                <ArrowUpRight
                  size={18}
                  className={`shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                    highlight
                      ? 'text-blue-400 group-hover:text-white'
                      : 'text-zinc-600 group-hover:text-brand'
                  }`}
                  aria-hidden="true"
                />
              </>
            );

            if (isInternalRoute) {
              return (
                <MotionLink
                  key={title}
                  to={href}
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  className={cardClassName}
                >
                  {innerContent}
                </MotionLink>
              );
            }

            return (
              <motion.a
                key={title}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                className={cardClassName}
              >
                {innerContent}
              </motion.a>
            );
          })}
        </motion.section>

        <footer className="mt-auto pt-10 text-center text-xs text-zinc-600">
          <Link to="/" className="transition-colors hover:text-textMuted">
            kidiman.com
          </Link>
        </footer>
      </main>
    </div>
  );
}
