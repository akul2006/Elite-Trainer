import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const reviews: Testimonial[] = [
  {
    quote: "The training transformed our leadership team's approach to communication. We've seen a marked increase in engagement and clarity across all departments.",
    author: "Jane Doe",
    role: "HR Director at TechCorp",
  },
  {
    quote: "Our graduate students entered their global interview rounds with unprecedented command over vocal range and confidence. Placement rates rose by 18% directly after.",
    author: "Prof. Alistair Vance",
    role: "Dean of Studies, Vance College",
  },
  {
    quote: "As a founder pitch-coached under the Aura framework, the systematic alignment of physical posture, pacing, and clear statements completely redefined how I raise capital.",
    author: "Marcus Sterling",
    role: "CEO & Founder, Sterling Ventures",
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="scroll-mt-20 py-24 bg-surface max-w-5xl mx-auto px-4 md:px-16 text-center">
      <div className="flex flex-col items-center">
        {/* Large Aesthetic Quote Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary-container/10 flex items-center justify-center mb-8">
          <Quote size={32} className="text-secondary fill-secondary" />
        </div>

        {/* Testimonial slider view box */}
        <div className="relative min-h-[220px] sm:min-h-[180px] w-full flex items-center justify-center px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <blockquote className="text-lg sm:text-xl md:text-2xl italic font-medium text-primary leading-relaxed">
                "{reviews[activeIndex].quote}"
              </blockquote>
              
              <div className="mt-8">
                <p className="font-extrabold text-base text-primary font-display">{reviews[activeIndex].author}</p>
                <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">{reviews[activeIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left/Right & Slider Controller indicator pagination bar */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={handlePrev}
            className="p-2 border border-outline-variant rounded-full text-on-surface hover:bg-surface-container hover:text-primary hover:border-outline transition-all duration-300 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots Indicators */}
          <div className="flex gap-2.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-6 bg-secondary' : 'w-2.5 bg-outline-variant hover:bg-outline'
                }`}
                aria-label={`Go to Testimonial ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 border border-outline-variant rounded-full text-on-surface hover:bg-surface-container hover:text-primary hover:border-outline transition-all duration-300 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
