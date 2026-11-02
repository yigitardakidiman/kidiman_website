import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import {
  Search,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  X,
  Copy,
  Check,
  Tag,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Lightbulb,
  FolderGit2,
} from 'lucide-react';
import SEO from '../components/SEO';
import { blogPosts, blogCategories } from '../data/blogData';

export default function Blog() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';
  const [searchParams, setSearchParams] = useSearchParams();
  const lenis = useLenis();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState(false);
  const copyTimeoutRef = useRef(null);

  // Derive active post ID directly from URL param (?read=...)
  const readParam = searchParams.get('read');
  const activePostId =
    readParam && blogPosts.some((p) => p.id === readParam) ? readParam : null;

  const openPost = useCallback(
    (id) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set('read', id);
          return next;
        },
        { replace: false }
      );
    },
    [setSearchParams]
  );

  const closePost = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('read');
        return next;
      },
      { replace: false }
    );
  }, [setSearchParams]);

  // Lock background scroll and pause Lenis when post modal is open
  useEffect(() => {
    if (activePostId) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [activePostId, lenis]);

  // Keyboard shortcut to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activePostId) {
        closePost();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePostId, closePost]);

  // Clean up copy timeout
  useEffect(() => {
    return () => clearTimeout(copyTimeoutRef.current);
  }, []);

  const handleCopyCode = async (codeText) => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopiedCode(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopiedCode(false);
      }, 2000);
    } catch (err) {
      console.error('Clipboard copy error:', err);
    }
  };

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        activeCategory === 'all' || post.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const title = (post.title[lang] || post.title.tr).toLowerCase();
      const summary = (post.summary[lang] || post.summary.tr).toLowerCase();
      const tags = post.tags.map((tg) => tg.toLowerCase());

      return (
        title.includes(q) ||
        summary.includes(q) ||
        tags.some((tg) => tg.includes(q))
      );
    });
  }, [activeCategory, searchQuery, lang]);

  const activePost = useMemo(() => {
    return blogPosts.find((p) => p.id === activePostId) || null;
  }, [activePostId]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'embedded':
        return <Cpu size={14} className="text-emerald-400" />;
      case 'systems':
        return <Code2 size={14} className="text-cyan-400" />;
      case 'web':
        return <Layers size={14} className="text-blue-400" />;
      default:
        return <BookOpen size={14} className="text-brand" />;
    }
  };

  return (
    <div className="w-full space-y-10 pb-16">
      <SEO
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        keywords={t('seo.blog.keywords')}
        path="blog"
      />

      {/* HEADER SECTION */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-xs font-semibold text-brand">
          <Sparkles size={13} />
          <span>{blogPosts.length === 0 ? t('blog.comingSoonBadge') : t('blog.badge')}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-textMain tracking-tight">
              {t('blog.heading')}
            </h1>
            <p className="text-sm sm:text-base text-textMuted max-w-2xl mt-2 leading-relaxed">
              {blogPosts.length === 0 ? t('blog.comingSoonSubtitle') : t('blog.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-textMuted bg-secondary/60 border border-white/5 px-3 py-1.5 rounded-lg shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{blogPosts.length === 0 ? (lang === 'tr' ? 'Hazırlanıyor' : 'In Progress') : t('blog.evergreenLabel')}</span>
          </div>
        </div>
      </div>

      {/* STATE 1: COMING SOON VIEW (When blogPosts is empty) */}
      {blogPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          {/* Main Coming Soon Hero Card */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#131318] to-[#0c0c10] border border-white/10 p-8 sm:p-12 text-center shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand/15 blur-3xl pointer-events-none rounded-full" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-brand/10 border border-brand/25 flex items-center justify-center text-brand shadow-[0_0_30px_rgba(37,99,235,0.25)]">
                <BookOpen size={28} className="animate-pulse" />
              </div>

              <div className="space-y-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t('blog.comingSoonTitle')}
                </h2>
                <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                  {t('blog.comingSoonSubtitle')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to={`/${lang}/projects`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brandHover text-white text-xs sm:text-sm font-semibold transition-all shadow-md group cursor-pointer"
                >
                  <FolderGit2 size={16} />
                  <span>{t('blog.exploreProjects')}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`/${lang}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>{t('blog.backHome')}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* STATE 2: ACTIVE BLOG POSTS LIST (When posts are added to blogData.js) */
        <>
          {/* SEARCH & FILTER CONTROLS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {blogCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? blogPosts.length
                    : blogPosts.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-brand text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                        : 'bg-secondary/70 text-textMuted hover:text-textMain hover:bg-secondary border border-white/5'
                    }`}
                  >
                    <span>{t(cat.labelKey)}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white/[0.06] text-textMuted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('blog.searchPlaceholder')}
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-secondary/70 border border-white/10 text-xs text-textMain placeholder:text-textMuted/60 focus:outline-none focus:border-brand transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-textMuted hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* POSTS GRID */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-secondary/30 p-12 text-center space-y-3">
              <BookOpen size={36} className="mx-auto text-textMuted opacity-50" />
              <p className="text-textMuted text-sm">{t('blog.noResults')}</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-brand hover:underline font-semibold cursor-pointer"
              >
                {t('blog.resetFilter')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => openPost(post.id)}
                  className="group relative rounded-2xl bg-[#131317] border border-white/[0.08] hover:border-brand/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)] hover:-translate-y-1 cursor-pointer"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-textMuted font-mono text-[11px]">
                        {getCategoryIcon(post.category)}
                        <span className="capitalize">{post.category}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {post.level[lang] || post.level.tr}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-textMuted font-mono">
                          <Clock size={12} />
                          {post.readTime[lang] || post.readTime.tr}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-textMain group-hover:text-brand transition-colors line-clamp-2">
                      {post.title[lang] || post.title.tr}
                    </h3>

                    <p className="text-xs sm:text-sm text-textMuted line-clamp-3 leading-relaxed">
                      {post.summary[lang] || post.summary.tr}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tg) => (
                        <span
                          key={tg}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-black/40 text-textMuted border border-white/[0.05]"
                        >
                          <Tag size={10} className="opacity-60" />
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-brand">
                    <span>{t('blog.readCta')}</span>
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FULL POST READER MODAL */}
          <AnimatePresence>
            {activePost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                data-lenis-prevent
                className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto overscroll-contain"
                onClick={closePost}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  data-lenis-prevent
                  className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-2xl bg-[#121216] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6 text-textMain scrollbar-custom"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-brand/10 border border-brand/30 text-brand text-xs font-semibold">
                          {getCategoryIcon(activePost.category)}
                          <span className="capitalize">{activePost.category}</span>
                        </span>
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {activePost.level[lang] || activePost.level.tr}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-textMuted font-mono">
                          <Clock size={12} />
                          {activePost.readTime[lang] || activePost.readTime.tr}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {activePost.title[lang] || activePost.title.tr}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={closePost}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-textMuted hover:text-white transition-colors cursor-pointer shrink-0"
                      aria-label="Close Article"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-textMuted">
                      {t('blog.sectionContext')}
                    </h4>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                      {activePost.problem[lang] || activePost.problem.tr}
                    </p>
                  </div>

                  {activePost.highlightTip && (
                    <div className="relative rounded-xl bg-gradient-to-r from-brand/15 via-blue-500/10 to-transparent border-l-4 border-brand p-4 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                        <Lightbulb size={16} />
                        <span>{t('blog.highlightLabel')}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                        {activePost.highlightTip[lang] || activePost.highlightTip.tr}
                      </p>
                    </div>
                  )}

                  {activePost.code && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-textMuted">
                        <span className="font-mono flex items-center gap-1.5 text-zinc-400">
                          <Code2 size={14} className="text-brand" />
                          {activePost.codeTitle}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(activePost.code)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-zinc-300 transition-colors cursor-pointer"
                        >
                          {copiedCode ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">{t('blog.copied')}</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>{t('blog.copyCode')}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div
                        data-lenis-prevent
                        className="rounded-xl overflow-hidden bg-[#0a0a0d] border border-white/10 p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-200 shadow-inner"
                      >
                        <pre>
                          <code>{activePost.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {activePost.takeaways && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-textMuted">
                        {t('blog.sectionTakeaways')}
                      </h4>
                      <ul className="space-y-2">
                        {activePost.takeaways.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-emerald-400 shrink-0 mt-0.5"
                            />
                            <span>{item[lang] || item.tr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {activePost.tags.map((tg) => (
                        <span
                          key={tg}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] text-textMuted border border-white/5"
                        >
                          #{tg}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={closePost}
                      className="px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-textMain transition-colors cursor-pointer"
                    >
                      {t('blog.closeModal')}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

