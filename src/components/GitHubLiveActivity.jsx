import { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub } from 'react-icons/fa';
import { ExternalLink, CalendarDays } from 'lucide-react';

export default function GitHubLiveActivity() {
  const { t, i18n } = useTranslation();
  const [userStats, setUserStats] = useState(null);
  const [contributionsData, setContributionsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const heatmapContainerRef = useRef(null);
  const tooltipRef = useRef(null);
  const tooltipDateRef = useRef(null);
  const tooltipCountRef = useRef(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const [userRes, contribRes] = await Promise.all([
          fetch('https://api.github.com/users/yigitardakidiman'),
          fetch('https://github-contributions-api.jogruber.de/v4/yigitardakidiman?y=last'),
        ]);

        if (userRes.ok) {
          const userData = await userRes.json();
          setUserStats(userData);
        }

        if (contribRes.ok) {
          const contribJson = await contribRes.json();
          setContributionsData(contribJson);
        }
      } catch (err) {
        console.error('GitHub API fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  // Group contributions into 7-day columns (weeks) memoized with localized tooltip labels
  const weeks = useMemo(() => {
    if (!contributionsData?.contributions) return [];
    const list = contributionsData.contributions;
    const isTr = (i18n.language || 'tr').startsWith('tr');
    const res = [];
    for (let i = 0; i < list.length; i += 7) {
      const week = list.slice(i, i + 7).map((day) => {
        let formattedDate = day.date;
        if (day.date) {
          const [y, m, d] = day.date.split('-').map(Number);
          const dateObj = new Date(y, m - 1, d);
          formattedDate = dateObj.toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        }
        const countText = isTr
          ? `${day.count} katkı`
          : `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`;

        return {
          ...day,
          dateFormatted: formattedDate,
          countText,
          tooltip: `${formattedDate}: ${countText}`,
        };
      });
      res.push(week);
    }
    return res;
  }, [contributionsData, i18n.language]);

  const handleGridMouseOver = (e) => {
    const target = e.target.closest('[data-day]');
    if (!target || !heatmapContainerRef.current || !tooltipRef.current) return;

    const date = target.getAttribute('data-date');
    const count = Number(target.getAttribute('data-count') || 0);
    const countText = target.getAttribute('data-count-text');

    if (tooltipDateRef.current) tooltipDateRef.current.textContent = `${date}:`;
    if (tooltipCountRef.current) {
      tooltipCountRef.current.textContent = countText;
      tooltipCountRef.current.className = count > 0
        ? 'font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[10px]'
        : 'text-zinc-400 text-[10px] px-1 py-0.5';
    }

    const containerRect = heatmapContainerRef.current.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    let x = targetRect.left - containerRect.left + targetRect.width / 2;
    const y = targetRect.top - containerRect.top - 2;

    // Clamp horizontal position so tooltip stays within the card bounds
    const minX = 70;
    const maxX = containerRect.width - 70;
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;

    tooltipRef.current.style.left = `${x}px`;
    tooltipRef.current.style.top = `${y}px`;
    tooltipRef.current.style.opacity = '1';
    tooltipRef.current.style.transform = 'translate(-50%, -100%) scale(1)';
  };

  const handleGridMouseLeave = () => {
    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
      tooltipRef.current.style.transform = 'translate(-50%, -100%) scale(0.95)';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return 'bg-[#0e4429] border-[#006d32]/40 hover:bg-[#006d32]';
      case 2:
        return 'bg-[#006d32] border-[#26a641]/50 hover:bg-[#26a641]';
      case 3:
        return 'bg-[#26a641] border-[#39d353]/60 hover:bg-[#39d353] shadow-[0_0_4px_rgba(38,166,65,0.4)]';
      case 4:
        return 'bg-[#39d353] border-white/60 hover:bg-[#56e36d] shadow-[0_0_8px_rgba(57,211,83,0.6)]';
      default:
        return 'bg-[#161b22]/90 border-white/[0.04] hover:bg-[#21262d]';
    }
  };

  return (
    <div className="rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] p-3.5 sm:p-5 relative overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 mb-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 border-b border-white/5 text-xs">
        {/* Profile Info */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <FaGithub className="text-lg sm:text-base text-textMain shrink-0" />
            <a
              href="https://github.com/yigitardakidiman"
              target="_blank"
              rel="noreferrer"
              className="font-mono font-medium text-textMain hover:text-brand transition-colors flex items-center gap-2"
            >
              <span className="text-xs sm:text-sm font-semibold">@yigitardakidiman</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </a>
          </div>

          {/* Mobile Profile Link */}
          <a
            href="https://github.com/yigitardakidiman"
            target="_blank"
            rel="noreferrer"
            className="sm:hidden text-textMuted hover:text-brand transition-colors flex items-center gap-1 font-medium bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md text-[11px]"
          >
            <span>{t('github.viewProfile')}</span>
            <ExternalLink size={11} />
          </a>
        </div>

        {/* Stats & Action on sm+ */}
        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 text-textMuted w-full sm:w-auto">
          {contributionsData?.total?.lastYear !== undefined && (
            <span className="text-textMain font-medium flex items-center gap-1.5 text-[11px] sm:text-xs bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 sm:py-1 rounded-full text-emerald-400 whitespace-nowrap">
              <CalendarDays size={12} className="text-emerald-400 shrink-0" />
              <span>{t('github.contributionsYear', { count: contributionsData.total.lastYear })}</span>
            </span>
          )}

          {userStats?.public_repos !== undefined && (
            <span className="hidden md:inline text-xs text-textMuted">
              <span className="text-textMain font-semibold">{userStats.public_repos}</span> {t('github.publicRepos').toLowerCase()}
            </span>
          )}

          <a
            href="https://github.com/yigitardakidiman"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex text-textMuted hover:text-brand transition-colors items-center gap-1 font-medium text-xs ml-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
          >
            <span>{t('github.viewProfile')}</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="pt-3 relative" ref={heatmapContainerRef}>
        {/* Custom Styled Tooltip */}
        <div
          ref={tooltipRef}
          className="pointer-events-none absolute z-30 opacity-0 -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-lg bg-zinc-900/95 backdrop-blur-md border border-white/15 text-[11px] font-mono shadow-[0_8px_24px_rgba(0,0,0,0.7)] whitespace-nowrap flex items-center gap-1.5 transition-[opacity,transform] duration-100 ease-out will-change-transform"
          style={{ left: 0, top: 0, transform: 'translate(-50%, -100%) scale(0.95)' }}
        >
          <span ref={tooltipDateRef} className="text-zinc-300 font-medium"></span>
          <span ref={tooltipCountRef}></span>
        </div>

        {loading ? (
          <div className="h-20 sm:h-28 bg-white/5 rounded-xl animate-pulse flex items-center justify-center text-xs text-textMuted">
            {t('github.loading')}
          </div>
        ) : (
          <div
            className="w-full flex justify-between gap-[1px] xs:gap-[1.5px] sm:gap-[2.5px] md:gap-[3px] select-none pt-1 [contain:content]"
            onMouseMove={handleGridMouseOver}
            onMouseLeave={handleGridMouseLeave}
            onTouchStart={handleGridMouseOver}
          >
            {weeks.map((week, wIndex) => (
              <div key={wIndex} className="flex flex-col flex-1 gap-[1px] xs:gap-[1.5px] sm:gap-[2.5px] md:gap-[3px]">
                {week.map((day, dIndex) => (
                  <div
                    key={dIndex}
                    data-day="true"
                    data-date={day.dateFormatted}
                    data-count={day.count}
                    data-count-text={day.countText}
                    className={`w-full aspect-square rounded-[1px] sm:rounded-[2px] border-[0.5px] sm:border cursor-pointer ${getLevelColor(day.level)}`}
                    aria-label={day.tooltip}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
