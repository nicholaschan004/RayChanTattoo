import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import FooterSection from '../components/FooterSection';
import PortfolioLightbox from '../components/PortfolioLightbox';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { sizedImageUrl } from '../lib/sheets';

export default function PortfolioPage() {
  const { items, categories, loading } = usePortfolioData();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="min-h-screen text-white font-sans antialiased overflow-x-hidden selection:bg-crimson/20 selection:text-white bg-obsidian">
      <Navigation />

      <main className="pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-silk/40 hover:text-crimson font-inter text-xs tracking-[0.2em] uppercase transition-colors duration-300 mb-10"
            >
              <ArrowLeft size={14} /> Back
            </Link>
            <span className="block font-serif text-crimson/40 text-sm tracking-wider">作品集</span>
            <h1 className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-silk mt-2 uppercase">
              All Work
            </h1>
            <div className="w-12 h-[0.5px] bg-crimson/50 mt-6" />
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {loading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="break-inside-avoid bg-silk/5 animate-pulse"
                  style={{ height: `${280 + (i % 3) * 80}px` }}
                />
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.6 }}
                  className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={sizedImageUrl(item.src, 800)}
                    alt="Tattoo by Ray Chan"
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-500 flex items-end">
                    <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <span className="block font-serif text-crimson/60 text-xs">
                        {categories.find(c => c.id === item.category)?.kanji}
                      </span>
                      <span className="inline-block mt-2 text-crimson text-[10px] tracking-[0.3em] uppercase font-inter">
                        View Piece →
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-crimson/0 group-hover:border-crimson/40 transition-all duration-500" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-crimson/0 group-hover:border-crimson/40 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {lightboxIndex !== null && (
          <PortfolioLightbox
            items={items}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </main>

      <FooterSection />
    </div>
  );
}
