import { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PortfolioSection from '../components/PortfolioSection';
import ArtistSection from '../components/ArtistSection';
import BookingSection from '../components/BookingSection';
import FooterSection from '../components/FooterSection';
import ProcessSection from '../components/ProcessSection';

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      // Interpolate from obsidian (8,8,8) to warm charcoal-canvas (20,14,16)
      const r = Math.round(8 + progress * 12);
      const g = Math.round(8 + progress * 6);
      const b = Math.round(8 + progress * 8);

      if (containerRef.current) {
        containerRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-crimson/20 selection:text-white"
      style={{ backgroundColor: 'rgb(8, 8, 8)' }}
    >
      <Navigation />
      <HeroSection />
      <PortfolioSection />
      <ProcessSection />
      <ArtistSection />
      <BookingSection />
      <FooterSection />
    </div>
  );
}
