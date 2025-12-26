import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Sun, Moon, MessageCircle, ArrowRight } from "lucide-react";
import { useStore } from "../state/store";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { GoogleGenAI } from "@google/genai";

// --- Navbar ---
export const Navbar: React.FC<{ onOpenWishlist: () => void }> = ({
    onOpenWishlist,
}) => {
    const { theme, toggleTheme, wishlist, isAdminMode, config } = useStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLight = theme === "light";
    const isDark = theme === "dark";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between",
                isScrolled || isLight
                    ? isDark
                        ? "glass-panel-dark text-white"
                        : "glass-panel bg-white/80 text-black border-black/5"
                    : "bg-transparent text-white", // Transparent on dark hero
            )}
        >
            <a
                href="#"
                className="text-2xl font-bold tracking-tighter"
                style={{ fontFamily: "var(--font-syne)" }}
            >
                LEVARA
            </a>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
                <Link
                    to="/products"
                    className="hover:opacity-60 transition-opacity"
                >
                    Collections
                </Link>
                <a
                    href="#featured"
                    className="hover:opacity-60 transition-opacity"
                >
                    Featured
                </a>
                <a
                    href="#bestsellers"
                    className="hover:opacity-60 transition-opacity"
                >
                    Best Sellers
                </a>
                {isAdminMode && (
                    <Link to="/admin" className="text-rose-500">
                        Admin
                    </Link>
                )}
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                    onClick={onOpenWishlist}
                    className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <Heart size={20} />
                    {wishlist.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full">
                            {wishlist.length}
                        </span>
                    )}
                </button>
            </div>
        </motion.nav>
    );
};

// --- Wishlist Sidebar ---
const WishlistSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const { wishlist, products, toggleWishlist, theme, config } = useStore();
    const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const wishlistProducts = products.filter((p) =>
        wishlist.some((w) => w.productId === p.id),
    );

    const handleWhatsAppInquiry = () => {
        const number = config.whatsappNumber;
        const names = wishlistProducts.map((p) => p.name).join(", ");
        const text = `Hi ${config.heroTitle}! I'm interested in these items: ${names}. Can you help me with sizing?`;
        window.open(
            `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
            "_blank",
        );
    };

    const handleAiConsultation = async () => {
        if (!process.env.API_KEY) {
            setAiSuggestion(
                "AI Stylist is currently offline. You have great taste!",
            );
            return;
        }

        setIsLoadingAi(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const model = "gemini-3-flash-preview";
            const productNames = wishlistProducts.map((p) => p.name).join(", ");

            const prompt = `
  Act as a personal celebrity stylist.
  I am looking at: "${productNames}" from the "${config.heroTitle}" line.
  Give me one catchy, actionable tip to complete this fit.
  Focus on creating a "moment." Suggest a specific occasion or vibe.
  Keep it clear, trendy, and under 40 words.
`;

            const response = await ai.models.generateContent({
                model: model,
                contents: prompt,
            });

            setAiSuggestion(response.text || "Timeless choices.");
        } catch (e) {
            console.error("AI Error", e);
            setAiSuggestion(
                "Our AI stylist is assisting another client. Great picks though!",
            );
        } finally {
            setIsLoadingAi(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200,
                        }}
                        className={clsx(
                            "fixed right-0 top-0 bottom-0 w-full max-w-md z-50 shadow-2xl p-6 flex flex-col",
                            theme === "dark"
                                ? "bg-neutral-900 border-l border-white/10 text-white"
                                : "bg-white border-l border-black/10 text-neutral-900",
                        )}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2
                                className="text-2xl font-bold"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                Wishlist
                            </h2>
                            <button onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4">
                            {wishlistProducts.length === 0 ? (
                                <div className="text-center opacity-50 mt-20">
                                    <Heart
                                        size={48}
                                        className="mx-auto mb-4 opacity-20"
                                    />
                                    <p>Your wardrobe is empty.</p>
                                </div>
                            ) : (
                                wishlistProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={clsx(
                                            "flex gap-4 items-center p-3 rounded-lg border",
                                            theme === "dark"
                                                ? "bg-white/5 border-white/10"
                                                : "bg-neutral-50 border-black/5",
                                        )}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">
                                                {product.name}
                                            </h4>
                                            <p className="opacity-60 text-xs">
                                                ৳{product.price}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                toggleWishlist(product.id)
                                            }
                                            className="p-2 opacity-50 hover:opacity-100 hover:text-rose-500"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))
                            )}

                            {/* AI Section */}
                            {wishlistProducts.length > 0 && (
                                <div
                                    className={clsx(
                                        "mt-8 p-4 rounded-xl border",
                                        theme === "dark"
                                            ? "bg-white/5 border-white/10"
                                            : "bg-neutral-100 border-neutral-200",
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                                            Levara Stylist
                                        </span>
                                        <button
                                            onClick={handleAiConsultation}
                                            disabled={isLoadingAi}
                                            className="text-xs underline hover:text-rose-500"
                                        >
                                            {isLoadingAi
                                                ? "Thinking..."
                                                : "Get Advice"}
                                        </button>
                                    </div>
                                    {aiSuggestion && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-sm opacity-80 leading-relaxed"
                                        >
                                            "{aiSuggestion}"
                                        </motion.p>
                                    )}
                                </div>
                            )}
                        </div>

                        {wishlistProducts.length > 0 && (
                            <div
                                className={clsx(
                                    "pt-6 border-t",
                                    theme === "dark"
                                        ? "border-white/10"
                                        : "border-black/10",
                                )}
                            >
                                <button
                                    onClick={handleWhatsAppInquiry}
                                    className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                                >
                                    <MessageCircle size={20} />
                                    Inquire via WhatsApp
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// --- Footer ---
export const Footer = () => {
    const { theme, config } = useStore();
    return (
        <footer
            className={clsx(
                "py-12 px-6 border-t transition-colors duration-300",
                theme === "dark"
                    ? "bg-neutral-950 border-white/5 text-white"
                    : "bg-white border-black/5 text-neutral-900",
            )}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                    <h3
                        className="text-xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        {config.heroTitle}
                    </h3>
                    <p className="opacity-60 text-sm leading-relaxed">
                        {config.footerText}
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Collections</h4>
                    <ul className="space-y-2 text-sm opacity-60">
                        <li>
                            <a
                                href="#"
                                className="hover:text-rose-500 transition-colors"
                            >
                                New Season
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-rose-500 transition-colors"
                            >
                                Essentials
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-rose-500 transition-colors"
                            >
                                Accessories
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Social</h4>
                    <div className="flex space-x-4 opacity-60">
                        <a
                            href="https://www.facebook.com/LevaraClothing"
                            target="_blank"
                            className="hover:text-rose-500 transition-colors"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.instagram.com/levaracloth"
                            target="_blank"
                            className="hover:text-rose-500 transition-colors"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://www.tiktok.com/@levaraCloth"
                            target="_blank"
                            className="hover:text-rose-500 transition-colors"
                        >
                            Tiktok
                        </a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4">Newsletter</h4>
                    <div className="flex border-b border-current pb-2 opacity-60 focus-within:opacity-100 transition-opacity">
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="bg-transparent outline-none w-full placeholder:text-current/50"
                        />
                        <button>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-current/10 text-center text-xs opacity-40">
                © 2024 {config.heroTitle}. All rights reserved.
            </div>
        </footer>
    );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const { theme } = useStore();

    return (
        <div
            className={clsx(
                "min-h-screen transition-colors duration-500 flex flex-col",
                theme === "dark"
                    ? "bg-neutral-950 text-white"
                    : "bg-neutral-50 text-neutral-900",
            )}
        >
            <Navbar onOpenWishlist={() => setIsWishlistOpen(true)} />
            <WishlistSidebar
                isOpen={isWishlistOpen}
                onClose={() => setIsWishlistOpen(false)}
            />
            <main className="relative pt-20 flex-1">{children}</main>
            <Footer />
        </div>
    );
};
