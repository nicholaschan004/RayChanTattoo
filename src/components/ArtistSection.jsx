import { motion } from 'framer-motion';

const ARTIST_IMAGE = 'https://media.base44.com/images/public/69db3eb64a1058a506af8402/0c2e1b640_generated_3d671ad0.png';

export default function ArtistSection() {
  return (
    <section id="artist" className="relative py-32 bg-charcoal overflow-hidden">
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
            <div className="aspect-[3/4] overflow-hidden relative">
              <img
                src={ARTIST_IMAGE}
                alt="Ray Chan — Tattoo Artist"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-serif text-gold/40 text-sm tracking-wider">芸術家</span>
            <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-silk mt-2 uppercase">
              Ray Chan
            </h2>
            <div className="w-12 h-[0.5px] bg-gold/50 mt-6 mb-8" />

            <div className="space-y-6 font-inter text-silk/40 text-sm tracking-wider leading-relaxed">
              <p>
                With over a decade of dedication to the craft, Ray specializes in Japanese traditional tattoo art —
                from bold Irezumi compositions to delicate fine-line work rooted in centuries of Eastern aesthetics.
              </p>
              <p>
                Each piece is custom-designed to flow with the client's natural anatomy, honoring the traditions
                of Japanese tattooing while embracing modern expression. No flash. No repeats. Every tattoo is a
                one-of-one collaboration.
              </p>
              <p>
                Based in a private studio, Ray provides a focused, judgment-free environment where the art and
                the individual come first.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { label: 'Years Experience', value: '12+' },
                { label: 'Custom Pieces', value: '2,000+' },
                { label: 'Specialty', value: 'Japanese' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-syne text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="font-inter text-[10px] tracking-[0.2em] uppercase text-silk/30 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-10 px-8 py-3 border border-gold/40 text-gold font-inter text-xs tracking-[0.15em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
            >
              Book a Session
            </button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
