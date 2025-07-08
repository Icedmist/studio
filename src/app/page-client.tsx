
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedHeroText() {
    const animatedWords = ["Learn.", "Trade.", "Dominate."];
    const animatedColors = ["text-primary", "text-secondary", "text-success"];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
        }, 2500);
        return () => clearInterval(timer);
    }, [animatedWords.length]);

    return (
        <AnimatePresence mode="wait">
            <motion.span
                key={animatedWords[wordIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`inline-block ${animatedColors[wordIndex]}`}
            >
                {animatedWords[wordIndex]}
            </motion.span>
        </AnimatePresence>
    );
}
