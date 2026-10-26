import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { FileText, GraduationCap, Briefcase } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiDjango,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVite,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import SpotifyNowPlaying from '../components/SpotifyNowPlaying';
import SEO from '../components/SEO';

const skillCategories = [
  {
    key: 'frontend',
    items: [
      { name: 'React.js', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Three.js', icon: SiThreedotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
    ],
  },
  {
    key: 'backend',
    items: [
      { name: 'Django', icon: SiDjango },
      { name: 'Django REST Framework', icon: SiDjango },
      { name: 'REST API', icon: TbApi },
    ],
  },
  {
    key: 'programmingLanguages',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C', icon: SiC },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Supabase', icon: SiSupabase },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vite', icon: SiVite },
      { name: 'VS Code', icon: VscVscode },
    ],
  },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const resumeUrl = i18n.language?.startsWith('tr') ? '/documents/resume-tr.pdf' : '/documents/resume.pdf';

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 py-6"
    >
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={t('seo.about.keywords')}
        path="about"
      />
      <h1 className="sr-only">{t('about.heading')} - {t('about.subtitle')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Ben Kimim */}
        <motion.div variants={item} className="card-base flex flex-col h-full bg-transparent justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('about.whoAmI')}</h3>
            <p className="text-textMuted leading-relaxed">
              {t('about.whoAmIDesc')}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-secondary flex justify-center">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-outline flex items-center justify-center gap-2 w-full">
              <FileText size={18} />
              <span>{t('about.myResume')}</span>
            </a>
          </div>
        </motion.div>

        {/* 2. Eğitim & Deneyim */}
        <motion.div variants={item} className="card-base flex flex-col h-full bg-transparent justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="text-brand" size={22} /> {t('about.education')}
              </h3>
              <div className="relative border-l-2 border-brand/30 pl-5 ml-2.5 space-y-2">
                <div className="relative">
                  <div className="absolute w-3.5 h-3.5 bg-brand rounded-full -left-[28px] top-1 shadow-[0_0_10px_rgba(var(--brand),0.5)]"></div>
                  <h5 className="text-base font-bold">{t('about.ostim')}</h5>
                  <p className="text-brand text-sm font-medium">{t('about.softwareEng')}</p>
                  <p className="text-xs text-textMuted">{t('about.duration')}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Briefcase className="text-brand" size={22} /> {t('about.experience')}
              </h3>
              <div className="relative border-l-2 border-brand/30 pl-5 ml-2.5 space-y-5">
                {/* 1. Software Developer (Yarı Zamanlı / Güncel) */}
                <div className="relative">
                  <div className="absolute w-3.5 h-3.5 bg-brand rounded-full -left-[28px] top-1 shadow-[0_0_10px_rgba(var(--brand),0.5)]"></div>
                  <h5 className="text-base font-bold">{t('about.workPlace1')}</h5>
                  <p className="text-brand text-sm font-medium">
                    {t('about.workRole1')}{' '}
                    <span className="text-xs text-textMuted font-normal">({t('about.workType1')})</span>
                  </p>
                  <p className="text-xs text-textMuted">{t('about.workDuration1')}</p>
                </div>

                {/* 2. Yazılım Mühendisliği Stajyeri */}
                <div className="relative">
                  <div className="absolute w-2.5 h-2.5 bg-brand/50 rounded-full -left-[26px] top-1.5"></div>
                  <p className="text-textMain text-sm font-medium">
                    {t('about.workRole2')}{' '}
                    <span className="text-xs text-textMuted font-normal">({t('about.workType2')})</span>
                  </p>
                  <p className="text-xs text-textMuted">{t('about.workDuration2')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. Spotify Ne Dinliyorum */}
        <motion.div variants={item} className="h-full">
          <SpotifyNowPlaying />
        </motion.div>
      </div>

      {/* 4. Yetenekler & Teknolojiler (İkonlu rozet ve 2 sütunlu kart düzeni) */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map(({ key, items }) => (
          <div
            key={key}
            className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 p-5 space-y-3.5 transition-colors"
          >
            <h3 className="text-base font-bold text-textMain">
              {t(`about.${key}`)}
            </h3>

            <div className="flex flex-wrap gap-2">
              {items.map(({ name, icon: Icon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 text-xs sm:text-[13px] font-semibold text-textMain transition-colors"
                >
                  <Icon className="text-white/90 text-sm shrink-0" />
                  <span>{name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
