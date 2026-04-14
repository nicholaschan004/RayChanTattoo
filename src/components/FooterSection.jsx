import { motion } from 'framer-motion';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function FooterSection() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Top crimson line */}
      <div className="absolute top-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-crimson/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-3 gap-16 mb-20">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-inter text-silk/30 text-sm tracking-wider leading-relaxed">
              Custom Japanese tattoo art.<br />
              Timeless ink. Modern expression.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-inter text-[10px] tracking-[0.3em] uppercase text-crimson/50 mb-6">Navigate</h4>
            <div className="space-y-3">
              {[
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Artist', href: '#artist' },
                { label: 'Process', href: '#process' },
                { label: 'Book Session', href: '#booking' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-inter text-sm text-silk/30 hover:text-crimson tracking-wider transition-colors duration-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-inter text-[10px] tracking-[0.3em] uppercase text-crimson/50 mb-6">Connect</h4>
            <div className="space-y-4">
              <a
                href="https://www.instagram.com/raychantattoo?igsh=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-silk/30 hover:text-crimson transition-colors duration-500"
              >
                <Instagram size={16} strokeWidth={1.5} />
                <span className="font-inter text-sm tracking-wider">@raychantattoo</span>
              </a>
              <a
                href="mailto:Raychantattoo@gmail.com"
                className="flex items-center gap-3 text-silk/30 hover:text-crimson transition-colors duration-500"
              >
                <Mail size={16} strokeWidth={1.5} />
                <span className="font-inter text-sm tracking-wider">Raychantattoo@gmail.com</span>
              </a>
              <a
                href="tel:9253916292"
                className="flex items-center gap-3 text-silk/30 hover:text-crimson transition-colors duration-500"
              >
                <Phone size={16} strokeWidth={1.5} />
                <span className="font-inter text-sm tracking-wider">9253916292</span>
              </a>
              <div className="flex items-center gap-3 text-silk/30">
                <MapPin size={16} strokeWidth={1.5} />
                <span className="font-inter text-sm tracking-wider">Hilltop Richmond, CA</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-silk/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[11px] text-silk/15 tracking-wider">
            © {new Date().getFullYear()} Ray Chan Tattoo. All rights reserved.
          </p>
          <p className="font-serif text-silk/10 text-sm">
            入墨 — The way of ink
          </p>
        </div>
      </div>
    </footer>
  );
}