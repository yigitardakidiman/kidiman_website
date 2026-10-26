import { Component, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import { getProjects } from '../data/projectsData';

const Lanyard = lazy(() => import('../components/Lanyard'));

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'tr';

  const projectsData = getProjects(t, { featuredOnly: true });

  return (
    <div className="w-full space-y-16 pb-16">
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
        path=""
      />
      {/* 1. HERO SECTION */}
      <section className="w-full min-h-[calc(100vh-4rem)] flex flex-col md:flex-row items-center justify-center relative px-4 md:px-8 overflow-hidden">
        {/* 3D Lanyard Component */}
        <div className="absolute inset-0 w-full h-full z-0">
          <CanvasErrorBoundary>
            <Suspense fallback={null}>
              <Lanyard
                anchor="left"
                finish="glossy"
                metal="silver"
                size={0.56}
                strapLength={0.48}
              />
            </Suspense>
          </CanvasErrorBoundary>
        </div>

        {/* Hero Content */}
        <div className="w-full md:w-1/2 md:ml-auto flex flex-col items-center md:items-start text-center md:text-left space-y-6 z-10 px-4 pointer-events-none mb-auto mt-28 md:mb-0 md:mt-0">
          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-textMain pointer-events-auto"
          >
            {t('home.heading')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-textMuted max-w-2xl pointer-events-auto font-light"
          >
            {t('home.subtitle')}
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* 2. PROJECTS PREVIEW SECTION */}
        <section className="space-y-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-textMain tracking-tight">
                {t('home.projectsHeading')}
              </h2>
              <p className="text-sm sm:text-base text-textMuted max-w-xl">
                {t('home.projectsSubtitle')}
              </p>
            </div>

            <Link
              to={`/${lang}/projects`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 hover:bg-secondary text-sm font-semibold text-brand hover:text-white border border-brand/20 hover:border-brand/50 transition-all group self-start sm:self-auto shrink-0"
            >
              <span>{t('home.allProjects')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Projects Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </section>

        <hr className="border-secondary/60" />

        {/* 3. CONTACT PREVIEW SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-textMain tracking-tight">
                {t('home.contactHeading')}
              </h2>
              <p className="text-sm sm:text-base text-textMuted max-w-xl">
                {t('home.contactSubtitle')}
              </p>
            </div>

            <Link
              to={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 hover:bg-secondary text-sm font-semibold text-brand hover:text-white border border-brand/20 hover:border-brand/50 transition-all group self-start sm:self-auto shrink-0"
            >
              <span>{t('home.contactPageBtn')}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
