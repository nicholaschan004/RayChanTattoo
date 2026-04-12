import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PortfolioSection from '../components/PortfolioSection';
import ArtistSection from '../components/ArtistSection';
import BookingSection from '../components/BookingSection';
import FooterSection from '../components/FooterSection';
import ProcessSection from '../components/ProcessSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-white">
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
