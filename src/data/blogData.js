export const blogCategories = [
  { id: 'all', labelKey: 'blog.categories.all' },
  { id: 'embedded', labelKey: 'blog.categories.embedded' },
  { id: 'systems', labelKey: 'blog.categories.systems' },
  { id: 'web', labelKey: 'blog.categories.web' },
];

/**
 * Blog / Makaleler Listesi
 * İleride yeni bir yazı eklemek istediğinde bu diziye ekleyebilirsin:
 *
 * {
 *   id: 'yazi-basligi-slug',
 *   category: 'embedded' | 'systems' | 'web',
 *   level: { tr: 'Orta Seviye', en: 'Intermediate' },
 *   readTime: { tr: '5 dk okuma', en: '5 min read' },
 *   title: { tr: '...', en: '...' },
 *   summary: { tr: '...', en: '...' },
 *   tags: ['Tag1', 'Tag2'],
 *   highlightTip: { tr: '...', en: '...' },
 *   problem: { tr: '...', en: '...' },
 *   codeTitle: 'example.c',
 *   codeLang: 'c',
 *   code: `...`,
 *   takeaways: [
 *     { tr: '...', en: '...' }
 *   ]
 * }
 */
export const blogPosts = [];

