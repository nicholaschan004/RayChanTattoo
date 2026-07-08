import { motion } from 'framer-motion';

const steps = [
  {
    num: '一',
    digit: '01',
    title: 'Submit Idea',
    desc: 'Share your vision, references, and placement preferences through our booking form.',
  },
  {
    num: '二',
    digit: '02',
    title: 'Consultation',
    desc: 'We discuss your concept in depth — symbolism, sizing, composition, and flow with your body.',
  },
  {
    num: '三',
    digit: '03',
    title: 'Design Approval',
    desc: 'A custom design is crafted for you. Revisions continue until every line is perfect.',
  },
  {
    num: '四',
    digit: '04',
    title: 'Tattoo Session',
    desc: 'The ritual begins. Precision meets patience as your vision comes to life in ink.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 md:py-32 scroll-mt-24 overflow-hidden">
      {/* Background decorative */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.03]">
        <span className="font-serif text-[240px] text-silk" style={{ writingMode: 'vertical-rl' }}>
          道
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-serif text-crimson/40 text-sm tracking-wider">工程</span>
          <h2 className="font-syne text-4xl md:text-6xl font-bold tracking-tight text-silk mt-2 uppercase">
            The Process
          </h2>
          <div className="w-12 h-[0.5px] bg-crimson/50 mt-6 mx-auto" />
          <p className="font-inter text-silk/40 text-sm tracking-wider mt-6 max-w-md mx-auto">
            The way of the needle — from vision to permanence
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical crimson line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[0.5px] bg-gradient-to-b from-crimson/40 via-crimson/20 to-transparent" />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={step.digit}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex items-start gap-6 mb-20 last:mb-0 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Node on timeline */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-crimson/50 bg-obsidian flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-crimson/70" />
                </div>

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                  <div className="flex items-center gap-3 mb-3" style={{ justifyContent: isLeft ? undefined : undefined }}>
                    <span className="font-serif text-3xl text-crimson/30">{step.num}</span>
                    <div className={`flex items-center gap-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <h3 className="font-syne text-lg font-semibold tracking-[0.1em] uppercase text-silk">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-inter text-sm text-silk/40 leading-relaxed tracking-wide">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom crimson line */}
      <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
    </section>
  );
}