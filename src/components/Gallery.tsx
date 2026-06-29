import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Grid } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  size: 'large' | 'medium' | 'small';
}

// 20 Clean Image objects with zero text attachments
const galleryItems: GalleryItem[] = [
  { id: 1, src: './images/img1.jpeg', size: 'large' },
  { id: 2, src: './images/img2.jpeg', size: 'medium' },
  { id: 4, src: './images/img4.jpeg', size: 'medium' },
  { id: 3, src: './images/img3.jpeg', size: 'small' },
  { id: 5, src: './images/img5.jpeg', size: 'large' },
  // { id: 6, src: './images/img6.jpeg', size: 'small' },
  // { id: 7, src: './images/img7.jpeg', size: 'medium' },
  // { id: 8, src: './images/img8.jpeg', size: 'medium' },
  // { id: 9, src: './images/img9.jpeg', size: 'large' },
  // { id: 10, src: './images/img10.jpeg', size: 'small' },
  // { id: 11, src: './images/img11.jpeg', size: 'medium' },
  // { id: 12, src: './images/img12.jpeg', size: 'medium' },
  // { id: 13, src: './images/img13.jpeg', size: 'large' },
  // { id: 14, src: './images/img14.jpeg', size: 'small' },
  // { id: 15, src: './images/img15.jpeg', size: 'medium' },
  // { id: 16, src: './images/img16.jpeg', size: 'medium' },
  // { id: 17, src: './images/img17.jpeg', size: 'large' },
  // { id: 18, src: './images/img18.jpeg', size: 'small' },
  // { id: 19, src: './images/img19.jpeg', size: 'medium' },
  // { id: 20, src: './images/img20.jpeg', size: 'medium' }
];

const gridSpanStyles = {
  large: 'md:col-span-8 md:row-span-2 h-[380px] md:h-[580px]',
  medium: 'md:col-span-4 md:row-span-1 h-[280px]',
  small: 'md:col-span-4 md:row-span-1 h-[280px]',
};

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === null || prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === null || prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 75, damping: 15 } }
  };

  const visibleItems = galleryItems.slice(0, 4);

  return (
    <section id="gallery" style={{backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)'}} className="scroll-mt-20 py-20 overflow-hidden transition-colors duration-300">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span style={{color: 'var(--color-on-surface-variant)'}} className="text-[10px] uppercase font-bold tracking-widest block mb-2">
              Inside Our Spaces
            </span>
            <h2 style={{color: 'var(--color-primary)'}} className="text-3xl md:text-4xl font-bold font-display">
              The Elite Experience
            </h2>
            <p style={{color: 'var(--color-on-surface-variant)'}} className="text-sm md:text-base mt-2 max-w-xl">
              Glimpses into our high-impact, prestigious communication environments designed to reflect physical presence and clarity.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="self-start md:self-auto font-bold text-xs uppercase tracking-widest pb-1 hover:scale-105 transition-all cursor-pointer"
            style={{color: 'var(--color-amber-accent)', borderBottom: '2px solid var(--color-amber-accent)'}}
          >
            Launch Full Screen
          </button>
        </div>

        {/* Fixed Bento Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px]"
        >
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              style={{borderColor: 'var(--color-outline-variant)'}}
              className={`${gridSpanStyles[item.size]} relative rounded-2xl overflow-hidden group border`}
            >
              <img
                src={item.src}
                alt="Gallery showcase item"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay button remains with just a subtle zoom indicator icon */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.4)'}}>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="p-4 bg-black/60 rounded-full hover:scale-110 transition-all cursor-pointer"
                  style={{color: 'var(--color-amber-accent)'}}
                  aria-label="Zoom image"
                >
                  <ZoomIn size={22} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Interactive "Show More" Trigger Card */}
          {galleryItems.length > 4 && (
            <motion.button
              variants={itemVariants}
              type="button"
              onClick={() => setLightboxIndex(4)}
              style={{borderColor: 'var(--color-outline-variant)', backgroundColor: 'rgba(255,255,255,0.05)'}}
              className="md:col-span-4 h-[280px] hover:opacity-80 border border-dashed transition-all duration-300 rounded-2xl flex flex-col items-center justify-center text-center p-6 group cursor-pointer backdrop-blur-sm"
            >
              <div className="p-4 rounded-full transition-all duration-300" style={{backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--color-amber-accent)'}}>
                <Grid size={24} />
              </div>
              <p style={{color: 'var(--color-primary)'}} className="mt-4 text-base font-bold tracking-wide">
                Show More Sessions
              </p>
              <p style={{color: 'var(--color-on-surface-variant)'}} className="text-xs mt-1 max-w-[200px]">
                Open full immersive screen to view all +{galleryItems.length - 4} additional workshop galleries.
              </p>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Full-Screen Immersive Lightbox Modal Slider */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[120] flex flex-col justify-between p-4"
          >
            {/* Header Controls */}
            <div className="flex justify-between items-center text-white p-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                Photo {lightboxIndex + 1} of {galleryItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Slider Engine Area */}
            <div className="flex-1 flex items-center justify-center relative max-h-[85vh]">
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-10 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={galleryItems[lightboxIndex].src}
                alt="Full screen view"
                className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white z-10 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Spacer to keep vertical distribution clean without rendering text captions */}
            <div className="h-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}