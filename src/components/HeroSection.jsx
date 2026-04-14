import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function HeroSection() {
  const { heroImage } = useSiteSettings();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const rayX = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const chanX = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Japanese dragon tattoo masterwork"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
      </div>

      {/* Animated ink-wash overlay shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-crimson/5 blur-[120px] ink-flow" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-crimson/3 blur-[100px] ink-flow-delayed" />
      </div>

      {/* Vertical side text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2, duration: 2 }}
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2"
      >
        <span className="font-serif text-[120px] text-silk writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
          入墨
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
      >
        <span className="font-serif text-[120px] text-silk" style={{ writingMode: 'vertical-rl' }}>
          芸術
        </span>
      </motion.div>

      {/* Center content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Gold rule line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
          className="w-16 h-[0.5px] bg-crimson/60 mb-8"
        />

        {/* Animated name */}
        <div className="mb-8 flex justify-center items-center gap-4 md:gap-8">
          <motion.div style={{ x: rayX }} className="overflow-hidden pr-2">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.15em] md:tracking-[0.2em] text-silk whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              RAY
            </motion.h1>
          </motion.div>
          <motion.div style={{ x: chanX }} className="overflow-hidden pl-2">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.15em] md:tracking-[0.2em] text-silk whitespace-nowrap"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              CHAN
            </motion.h1>
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-inter text-xs md:text-sm tracking-[0.35em] uppercase text-silk/60 mb-3"
        >
          Timeless Ink
          <span className="inline-block w-6 h-[0.5px] bg-crimson/40 mx-3 align-middle" />
          Modern Expression
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif text-lg md:text-xl text-crimson/70 mb-12"
        >
          Custom Japanese Tattoo Art
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => scrollTo('#portfolio')}
            className="px-10 py-3.5 bg-crimson/10 border border-crimson/30 text-crimson font-inter text-xs tracking-[0.2em] uppercase hover:bg-crimson hover:text-obsidian transition-all duration-500"
          >
            View Portfolio
          </button>
          <button
            onClick={() => scrollTo('#booking')}
            className="px-10 py-3.5 bg-crimson text-obsidian font-inter text-xs tracking-[0.2em] uppercase font-medium hover:bg-crimson-light transition-all duration-500"
          >
            Book Appointment
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
        >
          <span className="font-inter text-[10px] tracking-[0.3em] uppercase text-silk/30">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-8 bg-gradient-to-b from-crimson/50 to-transparent"
          />
        </motion.div>
      </motion.div>

      {/* Bottom crimson line */}
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />
    </section>
  );
}