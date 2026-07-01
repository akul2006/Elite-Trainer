"use client";

import * as React from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface LinkItem {
  name: string;
  href: string;
}

const navLinks: LinkItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Services', href: '#services' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = React.useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false);
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const link of navLinks) {
        const el = document.getElementById(link.href.substring(1));
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.href);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface-container-low/90 dark:bg-surface-container-low/95 backdrop-blur-md shadow-[0px_30px_50px_rgba(15,23,42,0.08)] dark:shadow-[0px_30px_50px_rgba(2,6,23,0.35)] border-b border-outline-variant/40 dark:border-outline-variant/20 transition-colors duration-300">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-7xl mx-auto">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('');
          }}
          className="text-lg md:text-xl font-bold tracking-tighter text-primary font-display"
        >
          ELITE TRAINER
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-semibold tracking-wider uppercase transition-all duration-300 relative py-1 ${
                activeSection === link.href 
                  ? 'text-primary font-bold' 
                  : 'text-on-surface-variant hover:text-primary dark:text-on-surface-variant dark:hover:text-primary'
              }`}
            >
              {link.name}
              {activeSection === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary-container" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-outline-variant/40 dark:border-outline-variant/30 text-on-surface-variant hover:text-primary hover:bg-surface-container-low dark:hover:bg-surface-container transition-all duration-300 cursor-pointer"
            aria-label="Toggle visual theme"
          >
            {/* 3. CONDITIONALLY RENDER DESKTOP ICON */}
            {mounted ? (
              theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />
            ) : (
              <div className="w-[18px] h-[18px]" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary rounded-lg font-semibold text-sm hover:bg-secondary-container hover:text-on-secondary-container transition-all duration-300 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            Book a Session
          </a>
        </div>

        {/* Mobile menu and theme buttons */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-primary focus:outline-none hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {/* 4. CONDITIONALLY RENDER MOBILE ICON */}
            {mounted ? (
              theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
            ) : (
              <div className="w-[20px] h-[20px]" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary focus:outline-none hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-low dark:bg-surface-container border-t border-outline-variant/40 dark:border-outline-variant/20 animate-fade-in transition-colors duration-300">
          <div className="flex flex-col px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-base font-semibold py-2 px-3 rounded-lg ${
                  activeSection === link.href
                    ? 'bg-secondary-container/20 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-surface-container'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="inline-flex items-center justify-center w-full py-3 bg-primary text-on-primary rounded-lg font-bold text-center hover:bg-primary/95 transition-all"
            >
              Book a Session
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}