import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import LightboxModal from '../components/LightboxModal';
import SEO from '../components/SEO';

function GalleryImage({ item, index, onClick, altFallback }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const isPriority = index < 4;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="break-inside-avoid relative group rounded-xl md:rounded-2xl overflow-hidden bg-[#16161a] border border-white/[0.08] hover:border-brand/40 shadow-md hover:shadow-[0_6px_24px_rgba(37,99,235,0.15)] transition-all duration-300 cursor-pointer"
      style={{
        opacity: isVisible && isLoaded ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${(index % 4) * 0.05}s, transform 0.4s ease ${(index % 4) * 0.05}s`,
        willChange: 'opacity, transform',
      }}
    >
      <div className="w-full relative overflow-hidden bg-secondary/40 aspect-auto min-h-[160px]">
        {/* Shimmer skeleton placeholder while loading */}
        {!isLoaded && isVisible && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] via-white/[0.08] to-white/[0.03] animate-pulse" />
        )}

        <img
          src={isPriority || isVisible ? item.src : undefined}
          alt={item.caption || item.title || altFallback}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-auto object-cover rounded-xl md:rounded-2xl transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            setIsLoaded(true);
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Maximize2 size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useTranslation();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={t('seo.gallery.title')}
        description={t('seo.gallery.description')}
        keywords={t('seo.gallery.keywords')}
        path="gallery"
      />
      <h1 className="sr-only">{t('gallery.heading')} - {t('gallery.subtitle')}</h1>

      {/* Masonry Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        {galleryData.map((item, index) => (
          <GalleryImage
            key={item.id || index}
            item={item}
            index={index}
            altFallback={t('gallery.photoAlt', { index: index + 1 })}
            onClick={() => openLightbox(index)}
          />
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={galleryData}
        currentIndex={selectedImageIndex}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
