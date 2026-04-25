import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortfolioLightbox from './PortfolioLightbox';
import { usePortfolioData } from '../hooks/usePortfolioData';

export default function PortfolioSection() {
  const { items, categories, loading } = usePortfolioData();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const sliderRef = useRef(null);

  const previewItems = items.slice(0, 8);

  const scroll = (dir) => {
    const container = sliderRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]');
    const cardWidth = card ? card.offsetWidth + 16 : 336;
    container.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="relative py-32">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="font-serif text-crimson/40 text-sm tracking-wider">作品集</span>
            <h2 className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-silk mt-2 uppercase">
              Portfolio
            </h2>
            <div className="w-12 h-[0.5px] bg-crimson/50 mt-6" />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 border border-silk/10 flex items-center justify-center text-silk/40 hover:border-crimson/40 hover:text-crimson transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 border border-silk/10 flex items-center justify-center text-silk/40 hover:border-crimson/40 hover:text-crimson transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {loading ? (
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-96 bg-silk/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {previewItems.map((item, i) => (
              <motion.div
                key={item.id}
                data-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 group relative overflow-hidden cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
                onClick={() => setLightboxIndex(i)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-500 flex items-end">
                  <div className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-serif text-crimson/60 text-xs">{categories.find(c => c.id === item.category)?.kanji}</span>
                    <h3 className="font-syne text-silk text-base font-semibold tracking-wide uppercase mt-1">
                      {item.title}
                    </h3>
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

      {/* View More */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12 flex justify-center"
      >
        <Link
          to="/portfolio"
          className="px-12 py-3.5 border border-crimson/30 text-crimson font-inter text-xs tracking-[0.2em] uppercase hover:bg-crimson hover:text-obsidian transition-all duration-500"
        >
          View All Work
        </Link>
      </motion.div>

      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={previewItems}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    </section>
  );
}
