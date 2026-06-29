import * as React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Company {
  name: string;
  impact: string;
}

export default function ClientMarquee() {
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);

  const companies: Company[] = [
    { 
      name: 'HexaWare', 
      impact: 'Train and evaluate new recruits in corporate soft skills and communication through engaging activities, ensuring a smooth transition into corporate life and preparing them for future leadership.'
    },
    { 
      name: 'Times Pro', 
      impact: 'A project that was initiated by the DGP of UP and designed by TimesPro to impart Soft Skills sessions to the UP Police personnel.',
    },
    { 
      name: 'S.R.M.U University', 
      impact: 'Manage the student lifecycle from admission counseling and curriculum development to skills training and stakeholder engagement, ensuring students are fully prepared for corporate placement.',
    },
    { 
      name: 'College Dekho', 
      impact: 'Directs the end-to-end student engagement strategy, from initial admission to corporate readiness, through robust curriculum design, rigorous training evaluation, and stakeholder collaboration.',
    },
    { 
      name: 'Global Talent Track', 
      impact: 'Delivered interactive, tool-driven soft skills coaching and personality assessments across diverse disciplines to transition students from campus to corporate environments and boost employability.',
    }
  ];

  return (
    <section className="py-12 border-y border-outline-variant/20 bg-surface dark:bg-surface-container-low transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-16">
        <p className="text-center text-xs font-bold text-outline mb-8 uppercase tracking-widest font-sans">
          Trusted by Industry Leaders
        </p>

        {/* Brand Grid with Custom Interactive Hover States */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-center">
          {companies.map((co) => (
            <button
              key={co.name}
              onClick={() => setSelectedCompany(selectedCompany?.name === co.name ? null : co)}
              className={`group flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 focus:outline-none ${
                selectedCompany?.name === co.name
                  ? 'bg-surface-container border border-secondary-container shadow-inner'
                  : 'hover:bg-surface-container-low border border-transparent'
              }`}
            >
              <span className={`font-extrabold text-lg sm:text-xl md:text-2xl tracking-tighter transition-all duration-300 ${
                selectedCompany?.name === co.name
                  ? 'text-primary'
                  : 'text-outline hover:text-primary'
              }`}>
                {co.name}
              </span>
              <span className="text-[10px] mt-1 text-secondary opacity-0 group-hover:opacity-100 transition-opacity font-bold tracking-widest uppercase">
                {selectedCompany?.name === co.name ? 'Active' : 'Click to View'}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Impact Highlight Box */}
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-8 p-6 bg-surface-container-low rounded-2xl border border-secondary-container/40 max-w-2xl mx-auto shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-secondary" size={16} />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Case Study Snapshot: {selectedCompany.name}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-3">
              "{selectedCompany.impact}"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
