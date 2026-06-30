import * as React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Play, X, Volume2 } from 'lucide-react';

export default function Hero() {
  const [showAudio, setShowAudio] = React.useState(false);

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

  const showCV = () => {
    window.open('/resume.pdf', '_blank', 'noreferrer');
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
            Master the art of executive presence. My tailored leadership training programs equip modern professionals with the soft skills needed to lead with authority and empathy.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={showCV}
              className="px-8 py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-[#1a2333] hover:-translate-y-0.5 transition-all duration-300 shadow-md cursor-pointer"
            >
              View Resumé
            </button>
            <button
              onClick={() => setShowAudio(true)}
              className="px-8 py-4 border border-outline text-primary rounded-xl font-bold hover:bg-surface-container transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Volume2 size={18} fill="currentColor" />
              Listen to Interview
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
                src="./images/hero.jpeg"
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

      {showAudio && (
        <div className="fixed inset-0 bg-primary-container/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl w-full max-w-md border border-outline-variant/30 dark:border-outline-variant/10 relative text-on-surface">
            <div className="p-4 bg-surface-container border-b border-outline-variant flex justify-between items-center">
              <span className="font-bold text-sm tracking-wider uppercase text-on-surface">INTERVIEW ON AKASHWANI IGNOU FM</span>
              <button
                onClick={() => setShowAudio(false)}
                className="p-1 hover:bg-surface-container-high rounded-full transition-colors"
                aria-label="Close Audio"
              >
                <X size={20} className="text-on-surface" />
              </button>
            </div>

            <div className="p-8 bg-surface-container-lowest flex flex-col items-center justify-center gap-6 relative w-full">
              <div className="w-20 h-20 rounded-full bg-secondary-container flex items-center justify-center text-[#1e150a] shadow-inner animate-pulse">
                <Volume2 size={36} />
              </div>

              <audio
                className="w-full outline-none"
                controls
                autoPlay
                src="/showreel.mp3"
              >
                Your browser does not support the audio element.
              </audio>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}