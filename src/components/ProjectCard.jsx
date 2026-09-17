import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const badgeColors = {
  red: 'bg-red-500/90 text-white',
  teal: 'bg-teal-500/90 text-white',
  blue: 'bg-blue-500/90 text-white',
  purple: 'bg-purple-500/90 text-white',
  amber: 'bg-amber-500/90 text-white',
  green: 'bg-green-500/90 text-white',
};

export default function ProjectCard({ title, description, tags, link, github, comingSoon, image, badge, badgeColor = 'teal', isOpenSource }) {
  const { t } = useTranslation();

  const colorClass = badgeColors[badgeColor] || badgeColors.teal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full rounded-2xl bg-[#1a1a1f] border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1"
    >
      {/* Image Preview */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111114]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-textMuted/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
        )}

        {/* Category Badge */}
        {badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-lg ${colorClass}`}>
            {badge}
          </span>
        )}

        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-colors"
            >
              <FaGithub size={16} /> GitHub
            </a>
          )}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-brand/80 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-brand transition-colors"
            >
              <ExternalLink size={16} /> {t('projects.liveDemo')}
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-textMain leading-tight">{title}</h3>
          <div className="flex gap-1.5 flex-shrink-0 mt-0.5">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="text-textMuted hover:text-brand transition-colors">
                <FaGithub size={16} />
              </a>
            )}
            {link && (
              <a href={link} target="_blank" rel="noreferrer" className="text-textMuted hover:text-brand transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-textMuted leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        {((tags && tags.length > 0) || isOpenSource || comingSoon) && (
          <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
            {isOpenSource && (
              <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[11px] font-medium rounded-md">
                {t('projects.badges.openSource')}
              </span>
            )}
            {tags && tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-white/[0.05] text-[11px] font-medium text-textMuted rounded-md"
              >
                {tag}
              </span>
            ))}
            {comingSoon && (
              <span className="px-2 py-0.5 bg-brand/10 text-brand text-[11px] font-semibold rounded-md">
                {t('projects.comingSoon') || "Coming Soon"}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
