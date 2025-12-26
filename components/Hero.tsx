import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../state/store";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";

export const Hero: React.FC = () => {
    const { config } = useStore();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % config.heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [config.heroSlides.length]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prev) => {
            let next = prev + newDirection;
            if (next < 0) next = config.heroSlides.length - 1;
            if (next >= config.heroSlides.length) next = 0;
            return next;
        });
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1.1, // Start slightly zoomed in
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1, // Zoom to normal
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 1,
        }),
    };

    const currentSlide = config.heroSlides[currentIndex];

    if (!currentSlide) return null;

    return (
        <section className="relative h-[20rem] md:h-[35rem] w-full overflow-hidden bg-black text-white">
            {/* Slider Container */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.8 },
                            scale: { duration: 6, ease: "linear" }, // Slow Ken Burns effect
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        {/* Dark Overlay for text contrast */}
                        <div className="absolute inset-0 bg-black/30 z-10" />
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-start  max-w-7xl mx-auto pointer-events-none">
                {/* Animate text separately when slide changes */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`text-${currentIndex}`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: "easeOut",
                        }}
                        className="pointer-events-auto h-full w-full grid place-content-center bg-black/20 px-3"
                    >
                        <motion.h1
                            className="text-3xl md:text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 leading-tight drop-shadow-lg"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            {currentSlide.title}
                        </motion.h1>
                        <motion.p
                            className="text-sm md:text-2xl font-light tracking-wide opacity-90 mb-8 max-w-lg drop-shadow-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {currentSlide.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 bg-white text-black p-2 md:px-8 md:py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 hover:scale-105 transition-all shadow-lg group"
                            >
                                Explore Collection
                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="hidden absolute bottom-10 right-6 md:right-20 z-30 flex items-center gap-4">
                <button
                    onClick={() => paginate(-1)}
                    className="p-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => paginate(1)}
                    className="p-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-md hover:bg-white hover:text-black transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-10 left-6 md:left-20 z-30 flex gap-3">
                {config.heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setDirection(idx > currentIndex ? 1 : -1);
                            setCurrentIndex(idx);
                        }}
                        className={clsx(
                            "h-1 transition-all duration-300 rounded-full shadow-sm",
                            idx === currentIndex
                                ? "w-12 bg-white"
                                : "w-4 bg-white/40 hover:bg-white/70",
                        )}
                    />
                ))}
            </div>
        </section>
    );
};
