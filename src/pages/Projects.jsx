import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import GitHubLiveActivity from '../components/GitHubLiveActivity';
import SEO from '../components/SEO';
import { getProjects } from '../data/projectsData';

export default function Projects() {
  const { t } = useTranslation();

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

  const projectsData = getProjects(t);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 py-6"
    >
      <SEO
        title={t('seo.projects.title')}
        description={t('seo.projects.description')}
        keywords={t('seo.projects.keywords')}
        path="projects"
      />
      <h1 className="sr-only">{t('projects.heading')}</h1>
      <motion.div variants={item}>
        <GitHubLiveActivity />
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectsData.map((project) => (
          <motion.div key={project.id} variants={item}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
