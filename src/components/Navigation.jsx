import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Portfolio', href: '#portfolio', kanji: '作品' },
  { label: 'Artist', href: '#artist', kanji: '芸術' },
  { label: 'Process', href: '#process', kanji: '道' },
  { label: 'Book', href: '#booking', kanji: '予約' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop corner nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'bg-obsidian/90 backdrop-blur-md border-b border-crimson/10' : ''
          }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="group relative font-inter text-xs tracking-[0.2em] uppercase text-silk/60 hover:text-crimson transition-colors duration-500"
              >
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-serif text-crimson/0 group-hover:text-crimson/40 transition-all duration-500">
                  {link.kanji}
                </span>
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#booking')}
              className="ml-4 px-6 py-2 border border-crimson/40 text-crimson text-xs tracking-[0.15em] uppercase font-inter hover:bg-crimson hover:text-obsidian transition-all duration-500"
            >
              Book Session
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-silk/70 hover:text-crimson transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(link.href)}
                className="text-center"
              >
                <span className="block font-serif text-crimson/40 text-sm mb-1">{link.kanji}</span>
                <span className="font-syne text-3xl font-bold tracking-[0.15em] uppercase text-silk hover:text-crimson transition-colors">
                  {link.label}
                </span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollTo('#booking')}
              className="mt-6 px-10 py-3 border border-crimson/40 text-crimson text-sm tracking-[0.15em] uppercase font-inter hover:bg-crimson hover:text-obsidian transition-all duration-500"
            >
              Book Session
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}