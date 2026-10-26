export const projectsList = [
  {
    id: 'embedded-systems-lab',
    titleKey: 'projects.embedded_systems_lab',
    descriptionKey: 'projects.embedded_systems_labDesc',
    tagKeys: [
      'projects.tags.C',
      'projects.tags.FreeRTOS',
      'projects.tags.BareMetal',
      'projects.tags.FPGA',
    ],
    github: 'https://github.com/yigitardakidiman/embedded-systems-lab',
    image: '/img/embedded-systems.webp',
    isOpenSource: true,
    featured: true,
    category: 'embedded',
  },
  {
    id: 'gitfetch-generator',
    titleKey: 'projects.gitfetch_generator',
    descriptionKey: 'projects.gitfetch_generatorDesc',
    tagKeys: [
      'projects.tags.React',
      'projects.tags.Typescript',
      'projects.tags.Tailwind',
    ],
    github: 'https://github.com/yigitardakidiman/gitfetch-readme-generator',
    link: 'https://gitfetch.kidiman.com/',
    image: '/img/gitfetch.webp',
    isOpenSource: true,
    featured: true,
    category: 'web',
  },
  {
    id: 'volinor',
    titleKey: 'projects.volinor',
    descriptionKey: 'projects.volinorDesc',
    tagKeys: [
      'projects.tags.React',
      'projects.tags.ThreeJS',
      'projects.tags.Django',
    ],
    link: 'https://www.volinor.com/',
    image: '/img/volinor.webp',
    isOpenSource: false,
    featured: true,
    category: 'web',
  },
  {
    id: 'kidimusic-generator',
    titleKey: 'projects.kidimusic_generator',
    descriptionKey: 'projects.kidimusic_generatorDesc',
    tagKeys: [
      'projects.tags.Typescript',
      'projects.tags.JavaScript',
      'projects.tags.CSS',
    ],
    github: 'https://github.com/yigitardakidiman/kidimusic-generator-app',
    link: 'https://music.kidiman.com',
    image: '/img/kidimusic.webp',
    isOpenSource: true,
    featured: false,
    category: 'ai',
  },
  {
    id: 'simple-banking-system',
    titleKey: 'projects.simple_banking_system',
    descriptionKey: 'projects.simple_banking_systemDesc',
    tagKeys: [
      'projects.tags.Python',
      'projects.tags.OOP',
      'projects.tags.DataStructures',
    ],
    github: 'https://github.com/yigitardakidiman/CENG110-Simple-Banking-System',
    image: '/img/banking.webp',
    isOpenSource: true,
    featured: false,
    category: 'software',
  },
];

export function getProjects(t, { featuredOnly = false } = {}) {
  const source = featuredOnly
    ? projectsList.filter((project) => project.featured)
    : projectsList;

  return source.map((project) => ({
    id: project.id,
    title: t(project.titleKey),
    description: t(project.descriptionKey),
    tags: project.tagKeys.map((key) => t(key)),
    github: project.github,
    link: project.link,
    image: project.image,
    isOpenSource: project.isOpenSource,
    featured: project.featured,
    category: project.category,
  }));
}
