import * as React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Company {
  name: string;
  impact: string;
  stat: string;
}

export default function ClientMarquee() {
  const [selectedCompany, setSelectedCompany] = React.useState<Company | null>(null);

  const companies: Company[] = [
    { 
      name: 'HexaWare', 
      impact: 'Coached engineering leaders to successfully pitch enterprise architecture overhauls to non-technical executives.',
      stat: '+40% Project Approvals' 
    },
    { 
      name: 'U.P. Police', 
      impact: 'Refined presentation alignment for managing directors presenting quarterly macroeconomic forecasts.',
      stat: '98% Client Engagement Score' 
    },
    { 
      name: 'S.R.M.U University', 
      impact: 'Redesigned the onboarding communication framework to foster immediate connection in high-turnover administrative roles.',
      stat: '-20% Team Friction' 
    },
    { 
      name: 'Microsoft', 
      impact: 'Delivered customized crises response speaking courses to senior PR and developer advocates.',
      stat: 'Crisis Communications Certified' 
    },
    { 
      name: 'Azure Media', 
      impact: 'Polished creative director pitch presentations for high-stakes account campaigns.',
      stat: '$14M in New Contracts won' 
    }
  ];

  return (
    <section className="py-12 border-y border-outline-variant/20 bg-white dark:bg-surface-container-low transition-colors duration-300">
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
            <div className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-xs font-bold">
              {selectedCompany.stat}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
