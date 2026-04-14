import { motion } from 'framer-motion';
import { CalendarDays, FileText, ExternalLink } from 'lucide-react';

const CALENDAR_EMBED_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2sEVCmvOifHOJtFKWcnfdNbL4B0q0JSO7p0NDtlq2Lx3L5ucmcwO4m7F2snW9spLS0YTK8JEk3?gv=true';
const FORM_URL = import.meta.env.VITE_GOOGLE_FORM_URL;

export default function BookingSection() {
  return (
    <section id="booking" className="relative py-32 bg-white/[0.02] overflow-hidden">
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
            Share your vision first so Ray can come prepared, then pick a time for your consultation.
          </p>
        </motion.div>

        {/* Two-step cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {/* Step 1 — Submit tattoo details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-silk/10 bg-white/[0.02] p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-crimson text-crimson font-inter text-xs">
                1
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-crimson" strokeWidth={1.5} />
                <h3 className="font-syne text-lg font-bold text-silk uppercase tracking-wide">
                  Share Your Vision
                </h3>
              </div>
            </div>

            <p className="font-inter text-silk/40 text-xs tracking-wider leading-relaxed mb-8">
              Tell Ray about your tattoo idea, upload reference photos, and share placement details. This helps him prepare for your consultation.
            </p>

            <div className="mt-auto">
              {FORM_URL ? (
                <a
                  href={FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-crimson text-obsidian font-inter text-xs tracking-[0.15em] uppercase font-medium hover:bg-crimson-light transition-all duration-500 group"
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

          {/* Step 2 — Book consultation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-silk/10 bg-white/[0.02] p-8 md:p-10 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-silk/20 text-silk/40 font-inter text-xs">
                2
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-silk/40" strokeWidth={1.5} />
                <h3 className="font-syne text-lg font-bold text-silk/50 uppercase tracking-wide">
                  Book a Consultation
                </h3>
              </div>
            </div>

            <p className="font-inter text-silk/40 text-xs tracking-wider leading-relaxed mb-8">
              Once you've submitted your request, check Ray's availability and book a consultation to discuss your piece.
            </p>

            <div className="mt-auto">
              <a
                href={CALENDAR_EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-crimson/40 text-crimson font-inter text-xs tracking-[0.15em] uppercase hover:bg-crimson hover:text-obsidian transition-all duration-500 group"
              >
                <CalendarDays size={14} strokeWidth={1.5} />
                View Availability
                <ExternalLink size={11} className="opacity-40 group-hover:opacity-70 transition-opacity" strokeWidth={1.5} />
              </a>
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
