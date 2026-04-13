import { useState } from 'react';
import { motion } from 'framer-motion';
import PortfolioLightbox from './PortfolioLightbox';

const categories = [
  { id: 'all', label: 'All Works', kanji: '全' },
  { id: 'sleeves', label: 'Sleeves', kanji: '袖' },
  { id: 'blackgrey', label: 'Black & Grey', kanji: '墨' },
  { id: 'traditional', label: 'Traditional', kanji: '伝統' },
  { id: 'custom', label: 'Custom', kanji: '独自' },
];

const portfolioItems = [
  { id: 1, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/512b1b3b4_generated_0630fb36.png', title: 'The Guardian Tiger', category: 'traditional', aspect: 'tall' },
  { id: 2, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/50d13ab2c_generated_6c23bcec.png', title: 'Kanagawa Waves', category: 'custom', aspect: 'tall' },
  { id: 3, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/8112cacd2_generated_bb4f8425.png', title: 'Hannya Mask', category: 'blackgrey', aspect: 'tall' },
  { id: 4, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/6cb9c2add_generated_07d3a6db.png', title: 'Koi Sleeve', category: 'sleeves', aspect: 'tall' },
  { id: 5, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/79f51db0b_generated_8db818fd.png', title: 'Rising Phoenix', category: 'traditional', aspect: 'tall' },
  { id: 6, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/9c23ad176_generated_5cfdf5f7.png', title: 'Dragon Forearm', category: 'custom', aspect: 'tall' },
  { id: 7, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/8c5c84f4d_generated_0aab3381.png', title: 'Samurai Spirit', category: 'blackgrey', aspect: 'tall' },
  { id: 8, src: 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/0c2e1b640_generated_3d671ad0.png', title: 'Dragon Back Piece', category: 'traditional', aspect: 'wide' },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-32">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-serif text-crimson/40 text-sm tracking-wider">作品集</span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-silk mt-2 uppercase">
            Portfolio
          </h2>
          <div className="w-12 h-[0.5px] bg-crimson/50 mt-6" />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group flex items-center gap-2 px-5 py-2.5 border text-xs tracking-[0.15em] uppercase font-inter transition-all duration-500 ${activeCategory === cat.id
                  ? 'border-crimson bg-crimson/10 text-crimson'
                  : 'border-silk/10 text-silk/40 hover:border-crimson/30 hover:text-silk/70'
                }`}
            >
              <span className="font-serif text-sm opacity-50">{cat.kanji}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Masonry grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="break-inside-avoid group relative overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-all duration-500 flex items-end">
                <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="font-serif text-crimson/60 text-xs">{categories.find(c => c.id === item.category)?.kanji}</span>
                  <h3 className="font-syne text-silk text-lg font-semibold tracking-wide uppercase mt-1">
                    {item.title}
                  </h3>
                  <span className="inline-block mt-2 text-crimson text-[10px] tracking-[0.3em] uppercase font-inter">
                    View Piece →
                  </span>
                </div>
              </div>
              {/* Gold corner accents on hover */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-crimson/0 group-hover:border-crimson/40 transition-all duration-500" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-crimson/0 group-hover:border-crimson/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PortfolioLightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {/* Bottom crimson line */}
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    </section>
  );
}