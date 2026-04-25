import { motion } from 'framer-motion';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function ArtistSection() {
  const { artistImage, artistBio } = useSiteSettings();
  return (
    <section id="artist" className="relative py-32 bg-white/[0.02] overflow-hidden">
      {/* Background decorative kanji */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="font-serif text-[200px] text-silk" style={{ writingMode: 'vertical-rl' }}>芸術家</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden relative bg-silk/5">
              {artistImage && (
                <img
                  src={artistImage}
                  alt="Ray Chan — Tattoo Artist"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              )}
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-crimson/30" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-crimson/30" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-serif text-crimson/40 text-sm tracking-wider">芸術家</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-silk mt-2 uppercase">
              Ray Chan
            </h2>
            <div className="w-12 h-[0.5px] bg-crimson/50 mt-6 mb-8" />

            <div className="space-y-6 font-inter text-silk/40 text-sm tracking-wider leading-relaxed">
              {artistBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Specialty', value: 'Neo-Japanese' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-syne text-2xl font-bold text-crimson">{stat.value}</div>
                  <div className="font-inter text-[10px] tracking-[0.2em] uppercase text-silk/30 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-10 px-8 py-3 border border-crimson/40 text-crimson font-inter text-xs tracking-[0.15em] uppercase hover:bg-crimson hover:text-obsidian transition-all duration-500"
            >
              Book a Session
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    </section>
  );
}
