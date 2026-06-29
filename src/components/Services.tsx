import * as React from 'react';
import { Users, GraduationCap, User, CheckCircle2, Video, Megaphone, Brain } from 'lucide-react';

interface ServiceTrack {
  id: string;
  title: string;
  features: string[];
  icon: React.ReactNode;
}

interface ServicesProps {
  selectedTrack: string;
  onTrackSelect: (id: string) => void;
}

export default function Services({ selectedTrack, onTrackSelect }: ServicesProps) {
  const tracks: ServiceTrack[] = [
    {
      id: 'corporate',
      title: 'Corporate & Professional Development',
      features: ['Business Etiquette', 'Email Writing', 'Telephone Etiquette', 'Time Management', 'Service Orientation'],
      icon: <Users size={24} className="text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'institutional',
      title: 'Institutional Readiness',
      features: ['Resume Writing', 'Interview Skills', 'Group Discussion Skills', 'Personality Development'],
      icon: <GraduationCap size={24} className="text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'executive',
      title: 'Executive & Leadership',
      features: ['Training and Mentoring', 'Ownership', 'SWOT Analysis', 'Problem Solving'],
      icon: <User size={24} className="text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'communication',
      title: 'Communication & Presentation',
      features: ['Communication Skills', 'Public Speaking', 'Presentation Skills'],
      icon: <Video size={24} className="text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'interpersonal',
      title: 'Interpersonal & Team Dynamics',
      features: ['Interpersonal and Teamwork', 'Johari Window'],
      icon: <Megaphone size={24} className="text-amber-600 dark:text-amber-400" />
    },
    {
      id: 'eq-training',
      title: 'Emotional Intelligence (EQ)',
      features: ['Emotional Intelligence', 'Stress Management'],
      icon: <Brain size={24} className="text-amber-600 dark:text-amber-400" />
    }
  ];

  return (
    <section id="services" className="scroll-mt-20 py-20 bg-surface dark:bg-surface-container-low px-4 md:px-16 max-w-7xl mx-auto transition-colors duration-300">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-primary font-display">
          Specialized Training Tracks
        </h2>
        <p className="text-base sm:text-lg text-on-surface-variant mt-3 max-w-2xl mx-auto">
          Tailored programs designed for every stage of your professional journey.
        </p>
      </div>

      {/* 6-Card Presentation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onTrackSelect(track.id)}
            className={`group cursor-pointer bg-surface-container-lowest rounded-2xl border p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
              selectedTrack === track.id
                ? 'border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/40 dark:ring-amber-400/40 shadow-md scale-[1.01]'
                : 'border-outline-variant/60 opacity-80 hover:opacity-100'
            }`}
          >
            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/30 rounded-xl flex items-center justify-center mb-6">
                {track.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-primary mb-5 font-display leading-tight">
                {track.title}
              </h3>
              
              {/* Features List */}
              <ul className="space-y-3.5 text-xs text-on-surface-variant">
                {track.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <CheckCircle2 size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}