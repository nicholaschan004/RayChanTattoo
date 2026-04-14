import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingBookButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToBooking = () => {
        const el = document.querySelector('#booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    onClick={scrollToBooking}
                    className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-crimson rounded-full flex items-center justify-center shadow-lg shadow-crimson/20"
                >
                    <span className="font-serif text-obsidian text-lg">予</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}