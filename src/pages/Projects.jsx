import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Layers, BookOpen, ArrowUpRight, X, FolderOpen } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useLenis } from 'lenis/react';
import Folder from '../components/Folder';
import ProjectCard from '../components/ProjectCard';
import GitHubLiveActivity from '../components/GitHubLiveActivity';
import SEO from '../components/SEO';
import { getProjects, getKnowledgeBase } from '../data/projectsData';

export default function Projects() {
  const { t } = useTranslation();
  const [activeFolder, setActiveFolder] = useState(null);
  const contentRef = useRef(null);
  const prevFolderRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const wasOpen = prevFolderRef.current !== null;
    prevFolderRef.current = activeFolder;

    if (!activeFolder) return undefined;

    // Only auto-scroll when first opening a folder from closed state
    if (!wasOpen) {
      const timer = setTimeout(() => {
        const el = contentRef.current;
        if (!el) return;
        if (lenis) {
          lenis.scrollTo(el, { offset: -84, duration: 0.8 });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeFolder, lenis]);

  const projectsData = getProjects(t);
  const knowledgeBaseData = getKnowledgeBase(t);

  const embeddedProjects = projectsData.filter((p) => p.category === 'embedded');
  const softwareProjects = projectsData.filter((p) => p.category !== 'embedded');

  const folders = [
    {
      id: 'embedded',
      icon: Cpu,
      label: 'EMBEDDED',
      title: t('projects.folders.embedded.title'),
      description: t('projects.folders.embedded.desc'),
      count: embeddedProjects.length,
      color: '#52525b',
      items: [
        {
          image: '/img/folder-bare-metal.jpg',
          title: 'Bare-Metal C & STM32',
        },
        {
          image: '/img/embedded-systems.webp',
          title: 'Embedded Systems Lab',
        },
        {
          image: '/img/folder-freertos-fpga.jpg',
          title: 'FreeRTOS & FPGA',
        },
      ],
    },
    {
      id: 'software',
      icon: Layers,
      label: 'SOFTWARE',
      title: t('projects.folders.software.title'),
      description: t('projects.folders.software.desc'),
      count: softwareProjects.length,
      color: '#52525b',
      items: [
        {
          image: '/img/volinor.webp',
          title: 'Volinor Defense',
        },
        {
          image: '/img/gitfetch.webp',
          title: 'GitFetch Generator',
        },
        {
          image: '/img/kidimusic.webp',
          title: 'KıdıMusic Generator',
        },
      ],
    },
    {
      id: 'guides',
      icon: BookOpen,
      label: 'GUIDES 101',
      title: t('projects.folders.guides.title'),
      description: t('projects.folders.guides.desc'),
      count: knowledgeBaseData.length,
      color: '#52525b',
      items: [
        {
          image: '/img/folder-ceng215.jpg',
          title: 'CENG 215 Codes',
        },
        {
          image: '/img/folder-embedded-101.jpg',
          title: 'Embedded 101',
        },
        {
          image: '/img/folder-protocols.jpg',
          title: '08. Haberleşme',
        },
      ],
    },
  ];

  const handleFolderToggle = (folderId) => {
    setActiveFolder((prev) => (prev === folderId ? null : folderId));
  };

  const activeFolderObj = folders.find((f) => f.id === activeFolder);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 py-6"
    >
      <SEO
        title={t('seo.projects.title')}
        description={t('seo.projects.description')}
        keywords={t('seo.projects.keywords')}
        path="projects"
      />
      <h1 className="sr-only">{t('projects.heading')}</h1>

      {/* GITHUB LIVE ACTIVITY HEATMAP */}
      <GitHubLiveActivity />

      {/* 3-FOLDER GRID WITH REACT BITS <Folder /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2 pb-4">
        {folders.map((folder) => {
          const Icon = folder.icon;
          const isOpen = activeFolder === folder.id;

          return (
            <div
              key={folder.id}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Interactive 3D Folder Stage (Floating freely without outer box) */}
              <div className="relative flex items-center justify-center py-4">
                <Folder
                  mode="flap"
                  variant="glass"
                  color={folder.color}
                  paperColor="#f4f4f5"
                  tabPosition="left"
                  label={folder.label}
                  items={folder.items}
                  size={1.05}
                  frost={0.3}
                  theme="dark"
                  draggable={false}
                  zoomOnClick={false}
                  open={isOpen}
                  closeOnOutsideClick={false}
                  onOpenChange={(nextOpen) => {
                    setActiveFolder(nextOpen ? folder.id : activeFolder === folder.id ? null : activeFolder);
                  }}
                />
              </div>

              {/* Clean Minimal Label Underneath */}
              <button
                type="button"
                onClick={() => handleFolderToggle(folder.id)}
                className="mt-2 flex flex-col items-center max-w-[260px] cursor-pointer focus:outline-none group/btn"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={16}
                    className={`transition-colors ${
                      isOpen ? 'text-white' : 'text-textMuted group-hover/btn:text-textMain'
                    }`}
                  />
                  <h2
                    className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                      isOpen ? 'text-white' : 'text-textMain group-hover/btn:text-white'
                    }`}
                  >
                    {folder.title}
                  </h2>
                  <span
                    className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                      isOpen
                        ? 'bg-white text-black border-white'
                        : 'bg-white/[0.05] text-textMuted border-white/[0.08]'
                    }`}
                  >
                    {folder.count}
                  </span>
                </div>
                <p className="text-xs text-textMuted line-clamp-2 mt-1 leading-relaxed">
                  {folder.description}
                </p>
              </button>
            </div>
          );
        })}
      </div>

      {/* EXPANDED FOLDER CONTENT */}
      <AnimatePresence>
        {activeFolder && activeFolderObj && (
          <motion.section
            ref={contentRef}
            key="expanded-folder-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="scroll-mt-24 rounded-2xl bg-[#121216]/90 border border-white/[0.09] p-4 sm:p-6 space-y-5"
          >
            {/* Sticky Navigation & Fast Folder Switcher */}
            <div className="sticky top-16 sm:top-20 z-20 bg-[#121216]/95 backdrop-blur-xl -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 px-4 sm:px-6 py-3 border-b border-white/[0.08] rounded-t-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl">
              {/* Folder Switcher Pills */}
              <div className="inline-flex items-center p-1 rounded-xl bg-black/50 border border-white/[0.08] gap-1 overflow-x-auto max-w-full">
                {folders.map((f) => {
                  const Icon = f.icon;
                  const isActive = activeFolder === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFolder(f.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-white text-black shadow-md'
                          : 'text-textMuted hover:text-textMain hover:bg-white/[0.06]'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-black' : 'text-textMuted'} />
                      <span>{f.title}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-black/10 text-black font-bold'
                            : 'bg-white/[0.06] text-textMuted'
                        }`}
                      >
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveFolder(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-medium text-textMuted hover:text-textMain transition-colors cursor-pointer shrink-0"
              >
                <span>{t('projects.folders.close')}</span>
                <X size={14} />
              </button>
            </div>

            {/* Folder Items */}
            {activeFolder === 'embedded' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {embeddedProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            )}

            {activeFolder === 'software' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {softwareProjects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            )}

            {activeFolder === 'guides' && (
              <div className="grid grid-cols-1 gap-4">
                {knowledgeBaseData.map((guide) => (
                  <div
                    key={guide.id}
                    className="group relative rounded-2xl bg-[#16161b] border border-white/[0.07] p-5 sm:p-6 transition-all duration-300 hover:border-white/[0.15] hover:bg-[#19191f]"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                      <div className="space-y-2.5 max-w-3xl">
                        <h4 className="text-base sm:text-lg font-bold text-textMain">
                          {guide.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
                          {guide.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {guide.modules.map((mod, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-black/40 text-zinc-300 border border-white/[0.06]"
                            >
                              {mod}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                        <a
                          href={guide.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs sm:text-sm font-semibold text-textMain transition-all"
                        >
                          <FaGithub size={16} />
                          <span>{t('projects.knowledgeBase.exploreBtn')}</span>
                          <ArrowUpRight
                            size={15}
                            className="text-textMuted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
