import * as React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Privacy Policy', href: './terms.pdf' },
    { name: 'Terms of Service', href: './terms.pdf' },
    { name: 'Consultation', href: '#contact' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/garima-s-spn' },
    { name: 'Media Kit', href: '#gallery' }
  ];

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left branding copyright info */}
        <div className="space-y-3">
          <p className="text-lg md:text-xl font-bold text-primary font-display tracking-tight">
            ELITE TRAINER
          </p>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
            © {currentYear} Elite Trainer. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed max-w-sm">
            Dream Big and Make It Happen.
          </p>
        </div>

        {/* Right navigation links list */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end items-center">
          {footerLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs sm:text-sm text-on-surface-variant hover:text-secondary transition-colors duration-200 font-semibold uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
