import * as React from 'react';
import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 bg-surface-container-low px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-primary font-display mb-4">
              Precision in Speech, Authority in Presence
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Our philosophy centers on the transformative power of soft skills. In a digital-first world, the ability to communicate clearly and connect humanely is the ultimate competitive advantage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}