import * as React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Play, X, Volume2, VolumeX } from 'lucide-react';

export default function Hero() {
  const [showVideo, setShowVideo] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-24 px-4 md:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column (Text & CTAs) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider"
          >
            PREMIUM COACHING
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-primary font-display"
          >
            Transforming Corporate Teams Through Impactful Communication
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-on-surface-variant max-w-xl font-normal leading-relaxed"
          >
            Master the art of executive presence. Our tailored leadership training programs equip modern professionals with the soft skills needed to lead with authority and empathy.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={scrollToServices}
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-[#1a2333] hover:-translate-y-0.5 transition-all duration-300 shadow-md cursor-pointer"
            >
              Explore Modules
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="px-8 py-4 border border-outline text-primary rounded-xl font-bold hover:bg-surface-container transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Play size={18} fill="currentColor" />
              Watch Showreel
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column (Featured Image & Floating Stat) */}
        <div className="relative justify-self-center lg:justify-self-end w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Background ambient glow matching secondary color */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10" />

            <div className="rounded-2xl overflow-hidden shadow-[0px_30px_50px_rgba(15,23,42,0.1)] border border-white/20">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmfvyPGSNgV2RoQx-sgXRe-w8cepzFHyiB7OAmLVcNqAJMlhuu-D9GMrA5fMretpNJy0vIq4ByPYvC2oaSIMNtTT7FwMOLckk_i9O8JlqrHn-QdTg3GmkDYLHA2TmLOMXOvWocCFR40Af5a-23I5ueI47W1btC1pWhNzNL7WJkcY8P6sF6ieQDMFIA7u07UXcJ_k-qlN-GJh9X7VQ3GGLh-KrVDp8If3azB1jT5aVxnZVfn9eeVq0dYlcBSAvM5D4IeEtDH-uU-Orj"
                alt="Executive portrait of mid-40s professional woman in light-flooded modern office representing master soft skills coach"
                className="w-full h-auto object-cover aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Stats Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-8 -left-6 glass-card p-4 sm:p-5 rounded-2xl shadow-xl border border-white/40 flex items-center gap-3.5 max-w-[280px]"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-secondary-container rounded-xl flex items-center justify-center text-on-secondary-container shadow-inner">
                <ShieldCheck size={24} className="text-secondary" />
              </div>
              <div>
                <p className="font-extrabold text-base text-primary">98% Success</p>
                <p className="text-xs text-on-surface-variant font-medium">Trainee satisfaction rate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Showreel Interactive Video Modal Popup */}
      {showVideo && (
        <div className="fixed inset-0 bg-primary-container/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl border border-outline-variant/30 dark:border-outline-variant/10 relative text-on-surface">
            <div className="p-4 bg-surface-container border-b border-outline-variant flex justify-between items-center">
              <span className="font-bold text-sm tracking-wider uppercase text-on-surface">ELITE COMMUNICATOR SHOWREEL</span>
              <button
                onClick={() => setShowVideo(false)}
                className="p-1 hover:bg-surface-container-high rounded-full transition-colors"
                aria-label="Close Showreel"
              >
                <X size={20} className="text-on-surface" />
              </button>
            </div>

            {/* Custom Interactive Simulated Video Player Interface */}
            <div className="aspect-[16/9] bg-primary relative group">
              {isPlaying ? (
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-transparent to-black/30 text-white select-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-lg font-semibold animate-pulse">
                      AURA
                    </div>
                  </div>
                  
                  <div className="space-y-3 z-10">
                    <p className="text-sm font-bold tracking-widest text-secondary-container">CHAPTER 1: POWER & EMPATHY</p>
                    <h3 className="text-xl md:text-2xl font-bold font-display">Refining the Voice of Modern Leadership</h3>
                    
                    {/* Progress Bar scrubber */}
                    <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-secondary-container h-full w-2/3 rounded-full animate-[shrink-width_20s_infinite_linear]" style={{ transformOrigin: 'left' }} />
                    </div>
                    
                    {/* Simulated Controls */}
                    <div className="flex justify-between items-center text-xs mt-2 text-white/80">
                      <div className="flex items-center gap-4">
                        <button onClick={() => setIsPlaying(false)} className="hover:text-white font-bold">PAUSE</button>
                        <span>01:14 / 02:30</span>
                      </div>
                      <button 
                        onClick={() => setIsMuted(!isMuted)} 
                        className="hover:text-white flex items-center gap-1.5"
                      >
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        {isMuted ? 'UNMUTE AUDIOS' : 'SOUND ON'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <div className="w-20 h-20 rounded-full bg-secondary-container text-[#1e150a] flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                    <Play size={32} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Under Video Content */}
            <div className="p-6 bg-surface-container-low text-on-surface">
              <p className="text-sm font-medium mb-2 text-on-surface-variant">
                Featuring highlights from our specialized 2026 Executive Bootcamp. Learn how to control vocal fry, master non-verbal authority cues, and deliver statements with extreme precision.
              </p>
              <div className="text-xs bg-secondary-container/20 text-on-secondary-container p-3 rounded-lg flex items-center justify-between border border-secondary-container/40">
                <span>⚡ Limited Capacity: Our winter cohorts are currently 90% booked.</span>
                <button 
                  onClick={() => {
                    setShowVideo(false);
                    scrollToServices();
                  }}
                  className="font-bold underline uppercase tracking-widest text-[10px] hover:text-primary transition-colors"
                >
                  View Cohorts →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
