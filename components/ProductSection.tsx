import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "../state/store";
import { Product } from "../types";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export const ProductCard: React.FC<{
    product: Product;
    featured?: boolean;
}> = ({ product, featured }) => {
    const { toggleWishlist, wishlist, theme, config } = useStore();
    const isLiked = wishlist.some((item) => item.productId === product.id);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -5 }}
            onClick={handleCardClick}
            className={clsx(
                "group relative overflow-hidden rounded-sm cursor-pointer",
                featured ? "col-span-1 md:col-span-2 aspect-4/3" : "aspect-3/4",
                "bg-neutral-200", // Placeholder bg color while loading
            )}
        >
            <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay: Always dark for white text legibility */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

            {/* Heart Buttons */}
            <button
                onClick={handleWishlist}
                className={clsx(
                    "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all z-10",
                    isLiked
                        ? "bg-rose-500 text-white"
                        : "bg-white/10 text-red-200 hover:bg-white/20",
                )}
            >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>

            {/* Content */}
            <div className="absolute group-hover:bg-black/30 group-hover:rounded-t-2xl bottom-0 left-0 right-0 p-6 translate-y-3 group-hover:translate-y-0 transition-transform duration-700 ">
                <h3
                    className="text-lg font-bold text-white mb-1 tracking-wide"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {product.name}
                </h3>
                <p className="text-white/80 text-sm mb-4">${product.price}</p>

                <div className="h-0 group-hover:h-auto overflow-hidden transition-all opacity-0 group-hover:opacity-100 flex items-center gap-2">
                    <span className="text-white text-xs border-b border-white pb-0.5">
                        View Details
                    </span>
                    <ShoppingBag size={12} className="text-white ml-2" />
                </div>
            </div>
        </motion.div>
    );
};

export const ProductGrid = () => {
    const { products } = useStore();
    const featured = products.filter((p) => p.isFeatured);

    return (
        <section id="featured" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="w-full flex flex-col md:flex-row items-baseline justify-between py-12 border-b border-neutral-100 mb-16">
                {/* The Lead Section */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400">
                            Vol. 01
                        </span>
                        <div className="w-8 h-px bg-neutral-200" />
                    </div>

                    <h2
                        className="text-5xl md:text-6xl font-bold tracking-tighter"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        The Collection
                    </h2>
                </div>

                {/* The Balance Section */}
                <div className="mt-6 md:mt-0 flex flex-col md:items-end text-left md:text-right gap-3">
                    <p className="max-w-65 text-xs md:text-sm text-neutral-500 leading-relaxed uppercase tracking-wider">
                        Architectural silhouettes for the modern human form.
                    </p>

                    {/* Subtle status tag */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-600">
                            Available Now
                        </span>
                    </div>
                </div>
            </div>

            {/* featured Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 mb-20">
                {featured.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* regular products */}
            <div className="mb-12 flex items-end justify-between">
                <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 py-12 border-b border-neutral-100">
                    {/* Title Section */}
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold">
                            Season 2025
                        </p>
                        <h2
                            className="text-4xl md:text-5xl font-bold tracking-tighter"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            New Arrivals
                        </h2>
                    </div>

                    {/* Minimalist Action */}
                    <div className="flex md:justify-end items-center h-full">
                        <a
                            href="#/products"
                            className="px-8 py-4 bg-transparent border border-neutral-200 hover:border-black transition-all duration-500 text-xs font-bold uppercase tracking-widest flex items-center gap-4 group"
                        >
                            Browse Full Drop
                            <div className="w-6 h-px bg-neutral-300 group-hover:w-10 group-hover:bg-black transition-all duration-500" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export const Marquee = () => {
    const { products, theme } = useStore();
    const bestSellers = products.filter((p) => p.isBestSeller);

    if (bestSellers.length === 0) return null;

    return (
        <section
            id="bestsellers"
            className={clsx(
                "py-20 border-y overflow-hidden",
                theme === "dark"
                    ? "border-white/5 bg-neutral-900/30"
                    : "border-black/5 bg-neutral-100",
            )}
        >
            <div className="mb-10 text-center">
                <span className="uppercase tracking-[0.3em] text-xs font-bold opacity-50">
                    Curated
                </span>
                <h2
                    className="text-3xl font-bold mt-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    Best Sellers
                </h2>
            </div>

            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex gap-8 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 70,
                        ease: "linear",
                    }}
                >
                    {[
                        ...bestSellers,
                        ...bestSellers,
                        ...bestSellers,
                        ...bestSellers,
                    ].map((product, idx) => (
                        <div
                            key={`${product.id}-${idx}`}
                            className="w-70 shrink-0"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
