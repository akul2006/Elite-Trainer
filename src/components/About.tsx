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
             Dream Big and Make It Happen!
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              An experienced trainer having 11 years of Sales and Training roles combined, I have trained close to 5000 trainees till now.
            </p>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed mt-4">
            With a passion for facilitating growth and development, dedicated to equipping individuals with the tools and mindset necessary to excel in their careers and beyond and to continue making a meaningful impact in empowering the next generation of professionals to thrive in the corporate arena.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}