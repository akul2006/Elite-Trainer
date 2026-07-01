"use client";

import * as React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Services from '@/components/Services';
import ClientMarquee from '@/components/ClientMarquee';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedTrack, setSelectedTrack] = React.useState<string>('corporate');

  return (
    <main className="relative min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <ClientMarquee />
      
      <Services 
        selectedTrack={selectedTrack} 
        onTrackSelect={setSelectedTrack}
      />
      
      <Gallery />
      <Testimonials />
      
      <ContactForm 
        initialService={selectedTrack} 
        onServiceChange={setSelectedTrack} 
      />
      
      <Footer />
    </main>
  );
}