import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import ProjectCard from '../components/ProjectCard';
import GitHubLiveActivity from '../components/GitHubLiveActivity';
import SEO from '../components/SEO';

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

  const projectsData = [
    {
      title: t('projects.kidimusic_generator'),
      description: t('projects.kidimusic_generatorDesc'),
      tags: [t('projects.tags.Typescript'), t('projects.tags.JavaScript'), t('projects.tags.CSS')],
      github: "https://github.com/yigitardakidiman/kidimusic-generator-app",
      link: "https://music.kidiman.com",
      image: "/img/kidimusic.png",
      isOpenSource: true
    },
    {
      title: t('projects.volinor'),
      description: t('projects.volinorDesc'),
      tags: [t('projects.tags.React'), t('projects.tags.ThreeJS'), t('projects.tags.Django')],
      link: "https://www.volinor.com/",
      image: "/img/volinor.png"
    },
    {
      title: t('projects.gitfetch_generator'),
      description: t('projects.gitfetch_generatorDesc'),
      tags: [t('projects.tags.React'), t('projects.tags.Typescript'), t('projects.tags.Tailwind')],
      github: "https://github.com/yigitardakidiman/gitfetch-readme-generator",
      link: "https://gitfetch.kidiman.com/",
      image: "/img/gitfetch.png",
      isOpenSource: true
    }
  ];

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
        {projectsData.map((project, index) => (
          <motion.div key={index} variants={item}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
