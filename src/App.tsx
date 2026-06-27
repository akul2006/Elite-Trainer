import * as React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import ClientMarquee from './components/ClientMarquee';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [selectedTrack, setSelectedTrack] = React.useState<string>('corporate');

  return (
    <div className="relative min-h-screen bg-surface text-on-surface select-none selection:bg-secondary-container selection:text-on-secondary-container antialiased">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <ClientMarquee />
      
      {/* Clicking a card modifies selectedTrack state */}
      <Services 
        selectedTrack={selectedTrack} 
        onTrackSelect={setSelectedTrack}
      />
      
      <Gallery />
      <Testimonials />
      
      {/* Changing the dropdown selection in the form modifies selectedTrack state */}
      <ContactForm 
        initialService={selectedTrack} 
        onServiceChange={setSelectedTrack} 
      />
      
      <Footer />
    </div>
  );
} 