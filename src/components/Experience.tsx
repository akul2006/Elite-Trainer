"use client";

import * as React from 'react';
import { motion } from 'motion/react';
import { Award, GraduationCap, Building2, ChevronRight } from 'lucide-react';

interface MetricCard {
  id: number;
  stat: string;
  label: string;
  desc: string;
  details: string[];
  icon: React.ReactNode;
}

export default function Experience() {
  const [activeCard, setActiveCard] = React.useState<number | null>(null);

  const metrics: MetricCard[] = [
    {
      id: 1,
      stat: '11+',
      label: 'Years Global Strategy',
      desc: 'Deploying high-impact L&D frameworks to elevate corporate communication and operational efficiency.',
      icon: <Award className="text-secondary" size={24} />,
      details: [
        'Curated strategic programs for 15+ industry sectors',
        'Built scalable training templates adopted by executive suites worldwide',
      ]
    },
    {
      id: 2,
      stat: '5,000+',
      label: 'Professionals Trained',
      desc: 'Demonstrated capacity to command large cohorts and drive measurable behavioral change.',
      icon: <GraduationCap className="text-secondary" size={24} />,
      details: [
        'Over 1,200 corporate executives and mid-level managers coached',
        'Over 1,000 law enforcement officers trained in high-stakes communication',
      ]
    },
    {
      id: 3,
      stat: '100+',
      label: 'Enterprise Engagements',
      desc: 'Partnering with premium organizations to standardize internal training pipelines and resolve talent gaps.',
      icon: <Building2 className="text-secondary" size={24} />,
      details: [
        'Custom curriculum design deployed across distributed global teams',
        'Specialized modules for organizational restructuring and team cohesion',
      ]
    }
  ];

  return (
    <section id="experience" className="scroll-mt-24 py-20 bg-surface-container-low px-4 md:px-16 border-t border-surface-container/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-[1px] w-12 bg-outline-variant" />
          <span className="text-xs font-bold tracking-widest text-outline uppercase">Operational Scale</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className={`cursor-pointer bg-surface-container-lowest p-8 rounded-2xl shadow-[0px_30px_50px_rgba(15,23,42,0.03)] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
                activeCard === card.id 
                  ? 'border-secondary ring-1 ring-secondary' 
                  : 'border-outline-variant/30 dark:border-outline-variant/10 hover:border-outline-variant hover:shadow-[0px_30px_50px_rgba(15,23,42,0.06)]'
              }`}
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary-container/60" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-5xl font-extrabold text-secondary tracking-tight">{card.stat}</span>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/15 flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2 font-display">{card.label}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{card.desc}</p>
              </div>

              <div className="mt-2 pt-4 border-t border-surface-container">
                <div className="flex items-center justify-between text-xs font-bold text-secondary uppercase tracking-wider hover:text-primary transition-colors">
                  <span>{activeCard === card.id ? 'Collapse Details' : 'View Impact Insights'}</span>
                  <motion.div
                    animate={{ rotate: activeCard === card.id ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={14} />
                  </motion.div>
                </div>

                {activeCard === card.id && (
                  <motion.ul 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 space-y-2 text-xs text-on-surface-variant"
                  >
                    {card.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-secondary font-bold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}