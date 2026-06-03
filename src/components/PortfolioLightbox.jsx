import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { sizedImageUrl } from '../lib/sheets';

export default function PortfolioLightbox({ items, currentIndex, onClose, onNavigate }) {
    const item = items[currentIndex];

    const handlePrev = useCallback(() => {
        onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
    }, [currentIndex, items.length, onNavigate]);

    const handleNext = useCallback(() => {
        onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
    }, [currentIndex, items.length, onNavigate]);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, handlePrev, handleNext]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-obsidian/98 flex items-center justify-center"
                onClick={onClose}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-silk/40 hover:text-crimson transition-colors z-10"
                >
                    <X size={28} strokeWidth={1} />
                </button>

                {/* Navigation */}
                <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 md:left-8 text-silk/30 hover:text-crimson transition-colors z-10"
                >
                    <ChevronLeft size={36} strokeWidth={1} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 md:right-8 text-silk/30 hover:text-crimson transition-colors z-10"
                >
                    <ChevronRight size={36} strokeWidth={1} />
                </button>

                {/* Image */}
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-[90vw] max-h-[85vh] relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        src={sizedImageUrl(item.full || item.src, 1600)}
                        alt="Tattoo by Ray Chan"
                        decoding="async"
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                    <div className="mt-4 text-center">
                        <span className="font-inter text-silk/30 text-xs tracking-wider">
                            {currentIndex + 1} / {items.length}
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}