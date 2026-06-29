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
      label: 'Years Experience',
      desc: 'Dedicated to refining executive communication across global markets.',
      icon: <Award className="text-secondary" size={24} />,
      details: [
        'Curated programs for 15+ sectors',
        'Built templates adopted by executive suites worldwide',
        'Pioneered the "Executive Presence Index" methodology'
      ]
    },
    {
      id: 2,
      stat: '4000+',
      label: 'Trainees',
      desc: 'Empowered professionals reaching their full speaking potential.',
      icon: <GraduationCap className="text-secondary" size={24} />,
      details: [
        'Over 1,200 senior VPs and board coaches',
        'Alumni in prestigious Forbes lists',
        '94% self-reported career advancement within 6 months'
      ]
    },
    {
      id: 3,
      stat: '100+',
      label: 'Corporate Workshops',
      desc: 'Partnering with premium companies to build trustworthy leaders.',
      icon: <Building2 className="text-secondary" size={24} />,
      details: [
        'Delivered on-site across 4 continents',
        'Custom modules for team cohesion',
        'Included in annual leadership summits'
      ]
    }
  ];

  return (
    <section id="experience" className="scroll-mt-24 py-20 bg-surface-container-low px-4 md:px-16 border-t border-surface-container/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="h-[1px] w-12 bg-outline-variant" />
          <span className="text-xs font-bold tracking-widest text-outline uppercase">Interactive Milestones</span>
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
              {/* Highlight line */}
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

              {/* tional metric details toggle */}
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