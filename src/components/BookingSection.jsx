import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

const FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL;

export default function BookingSection() {
  return (
    <section id="booking" className="relative py-24 md:py-32 scroll-mt-24 bg-white/[0.02] overflow-hidden">
      {/* Decorative kanji */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="font-serif text-[200px] text-silk" style={{ writingMode: 'vertical-rl' }}>予約</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="font-serif text-crimson/40 text-sm tracking-wider">予約</span>
          <h2 className="font-syne text-4xl md:text-5xl font-bold tracking-tight text-silk mt-2 uppercase">
            Book Your Session
          </h2>
          <div className="w-12 h-[0.5px] bg-crimson/50 mt-6 mb-8 mx-auto" />
          <p className="font-inter text-silk/40 text-sm tracking-wider leading-relaxed max-w-lg mx-auto">
            Share your vision so Ray can come prepared for your piece.
          </p>
        </motion.div>

        {/* Submit tattoo details */}
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-silk/10 bg-white/[0.02] p-8 md:p-10 flex flex-col hover:border-crimson/20 transition-colors duration-500"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText size={16} className="text-crimson" strokeWidth={1.5} />
              <h3 className="font-syne text-lg font-bold text-silk uppercase tracking-wide">
                Share Your Vision
              </h3>
            </div>

            <p className="font-inter text-silk/40 text-xs tracking-wider leading-relaxed mb-8">
              Tell Ray about your tattoo idea, upload reference photos, and share placement details. This helps him prepare for your piece.
            </p>

            <div className="mt-auto">
              {FORM_URL ? (
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-crimson text-obsidian font-inter text-xs tracking-[0.15em] uppercase font-medium hover:bg-crimson-light hover:-translate-y-0.5 active:translate-y-0 transition-all duration-500 ease-out group"
                >
                  <FileText size={14} strokeWidth={1.5} />
                  Submit Tattoo Request
                  <ExternalLink size={11} className="opacity-50 group-hover:opacity-80 transition-opacity" strokeWidth={1.5} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-3 px-8 py-3.5 border border-silk/10 text-silk/30 font-inter text-xs tracking-[0.15em] uppercase cursor-default">
                  <FileText size={14} strokeWidth={1.5} />
                  Coming Soon
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center font-inter text-silk/20 text-[11px] tracking-wider italic"
        >
          All bookings are reviewed and confirmed manually within 48 hours
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    </section>
  );
}
