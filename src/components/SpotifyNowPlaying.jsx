import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSpotify } from 'react-icons/fa';
import { Music2, Radio } from 'lucide-react';

function MarqueeText({ text, href, className }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        setIsOverflowing(textRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };
    checkOverflow();
    // Small timeout to allow font rendering measurement
    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text]);

  const content = isOverflowing ? (
    <span className="inline-flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
      <span>{text}</span>
      <span className="mx-4 text-[#1DB954]/60">•</span>
      <span>{text}</span>
      <span className="mx-4 text-[#1DB954]/60">•</span>
    </span>
  ) : (
    <span ref={textRef} className="truncate block">
      {text}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden ${isOverflowing ? 'mask-fade-edges' : 'text-center'}`}
    >
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={className}
          title={text}
        >
          {content}
        </a>
      ) : (
        <div className={className} title={text}>
          {content}
        </div>
      )}
    </div>
  );
}

function formatTime(ms) {
  if (!ms || isNaN(ms)) return '0:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export default function SpotifyNowPlaying({ compact = false }) {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progressMs, setProgressMs] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchSpotify = async () => {
      try {
        const res = await fetch('/api/spotify');
        if (res.ok && isMounted) {
          const json = await res.json();
          setData(json);
          if (json?.progressMs !== undefined) {
            setProgressMs(json.progressMs);
          }
        }
      } catch (err) {
        console.error('Spotify API fetch error:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSpotify();

    // Poll every 8 seconds when tab is active for ultra-fast updates
    const interval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchSpotify();
      }
    }, 8000);

    // Immediately fetch when user returns to or focuses the tab
    const handleFocus = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
        fetchSpotify();
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    return () => {
      isMounted = false;
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
    };
  }, []);

  // Smooth live ticking while playing
  useEffect(() => {
    if (!data?.isPlaying || !data?.durationMs) return;

    const ticker = setInterval(() => {
      setProgressMs((prev) => {
        if (prev >= data.durationMs) {
          return data.durationMs;
        }
        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(ticker);
  }, [data?.isPlaying, data?.durationMs, data?.title]);

  const isPlaying = data?.isPlaying;
  const hasTrack = data?.title;
  const durationMs = data?.durationMs || 0;
  const currentProgress = Math.min(progressMs, durationMs);
  const progressPercent = durationMs > 0 ? (currentProgress / durationMs) * 100 : 0;

  if (compact) {
    return (
      <a
        href={data?.songUrl || 'https://open.spotify.com'}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-[#1DB954]/50 backdrop-blur-md text-xs transition-all duration-300 group"
      >
        <FaSpotify className={`text-base transition-transform duration-300 group-hover:scale-110 ${isPlaying ? 'text-[#1DB954]' : 'text-textMuted'}`} />
        {loading ? (
          <span className="text-textMuted animate-pulse">{t('spotify.loading')}</span>
        ) : isPlaying ? (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#1DB954] tracking-widest bg-[#1DB954]/10 px-1.5 py-0.5 rounded uppercase">
              {t('spotify.live')}
            </span>
            <span className="font-medium text-textMain max-w-[150px] truncate">{data.title}</span>
            <span className="text-textMuted max-w-[100px] truncate">• {data.artist}</span>
          </div>
        ) : (
          <span className="text-textMuted">{hasTrack ? `${t('spotify.recent')}: ${data.title}` : t('spotify.offline')}</span>
        )}
      </a>
    );
  }

  return (
    <div className="card-base h-full flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-black/60 via-black/40 to-[#1DB954]/5 border border-white/10 hover:border-[#1DB954]/30 transition-all duration-500 group">
      {/* Subtle Spotify Ambient Glow */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#1DB954]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#1DB954]/20 transition-all duration-500"></div>

      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#1DB954]/10 text-[#1DB954]">
              <FaSpotify className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-textMain tracking-wide uppercase flex items-center gap-2">
                {isPlaying ? t('spotify.nowPlaying') : t('spotify.recentlyPlayed')}
                {isPlaying && (
                  <span className="inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
                )}
              </h4>
            </div>
          </div>

          {isPlaying && (
            <div className="flex items-center justify-center px-2 py-1 rounded bg-[#1DB954]/10">
              <span className="text-[11px] font-bold text-[#1DB954] tracking-wider uppercase">
                {t('spotify.live')}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="flex flex-col items-center py-2 animate-pulse">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-white/5 flex-shrink-0"></div>
            <div className="space-y-2 w-full mt-3 flex flex-col items-center">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          </div>
        ) : hasTrack ? (
          <div className="flex flex-col items-center py-1">
            {/* Square Album Art with Vinyl / Glow effect */}
            <a
              href={data?.songUrl || 'https://open.spotify.com'}
              target="_blank"
              rel="noreferrer"
              title={t('spotify.listen')}
              className="relative group/cover flex justify-center cursor-pointer"
            >
              {data.albumImageUrl ? (
                <img
                  src={data.albumImageUrl}
                  alt={data.album || 'Spotify Album Cover'}
                  className={`w-28 h-28 sm:w-32 sm:h-32 aspect-square rounded-xl sm:rounded-2xl object-cover shadow-xl border border-white/10 transition-transform duration-300 group-hover/cover:scale-105 ${isPlaying ? 'ring-2 ring-[#1DB954]/40 shadow-[0_0_20px_rgba(29,185,84,0.15)]' : ''}`}
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 aspect-square rounded-xl sm:rounded-2xl bg-secondary/50 flex items-center justify-center text-textMuted border border-white/10">
                  <Music2 size={32} />
                </div>
              )}
              {isPlaying && (
                <div className="absolute -bottom-1.5 -right-1.5 p-1.5 bg-[#1DB954] text-black rounded-full shadow-lg">
                  <Radio size={12} />
                </div>
              )}
            </a>

            {/* Song & Artist Info Under the Image with Marquee */}
            <div className="w-full mt-3 px-2 flex flex-col items-center space-y-1">
              <MarqueeText
                text={data.title}
                href={data.songUrl}
                className="font-bold text-textMain hover:text-[#1DB954] transition-colors block text-sm sm:text-base group-hover:underline cursor-pointer"
              />
              <MarqueeText
                text={data.artist}
                className="text-textMuted text-xs sm:text-sm"
              />
              {data.album && (
                <p className="text-[11px] text-textMuted/60 truncate max-w-full text-center" title={data.album}>
                  {data.album}
                </p>
              )}
            </div>

            {/* Song Progress Timeline (Only visible when actively playing) */}
            {isPlaying && durationMs > 0 && (
              <div className="w-full mt-3 px-2">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-[#1DB954]/80 to-[#1DB954] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(29,185,84,0.4)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-medium text-textMuted/70 tabular-nums font-mono mt-1.5 px-0.5">
                  <span>{formatTime(currentProgress)}</span>
                  <span>{formatTime(durationMs)}</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center text-textMuted gap-2">
            <div className="p-3 rounded-full bg-white/5 text-textMuted/60">
              <Music2 size={24} />
            </div>
            <p className="text-xs sm:text-sm">{t('spotify.offline')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
