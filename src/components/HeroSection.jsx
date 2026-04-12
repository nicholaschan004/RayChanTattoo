import { motion } from 'framer-motion';

const HERO_IMAGE = 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/0c2e1b640_generated_3d671ad0.png';

export default function HeroSection() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-obsidian">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Japanese dragon tattoo masterwork"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/30 to-obsidian" />
      </div>

      {/* Animated ink-wash overlay shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-[120px] ink-flow" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[100px] ink-flow-delayed" />
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Gold rule line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: 'easeOut' }}
          className="w-16 h-[0.5px] bg-gold/60 mb-8"
        />

        {/* Logo monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-6"
        >
          <h1 className="font-syne text-7xl md:text-9xl font-extrabold tracking-tight text-silk">
            <span className="text-gold">R</span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-inter text-xs md:text-sm tracking-[0.35em] uppercase text-silk/60 mb-3"
        >
          Timeless Ink
          <span className="inline-block w-6 h-[0.5px] bg-gold/40 mx-3 align-middle" />
          Modern Expression
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-serif text-lg md:text-xl text-gold/70 mb-12"
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
            className="px-10 py-3.5 bg-gold/10 border border-gold/30 text-gold font-inter text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
          >
            View Portfolio
          </button>
          <button
            onClick={() => scrollTo('#booking')}
            className="px-10 py-3.5 bg-gold text-obsidian font-inter text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-all duration-500"
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
            className="w-[1px] h-8 bg-gradient-to-b from-gold/50 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}