import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, ShoppingBag } from "lucide-react";
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
                featured
                    ? "col-span-1 md:col-span-2 aspect-[4/3]"
                    : "aspect-[3/4]",
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

            {/* Top Buttons */}
            <button
                onClick={handleWishlist}
                className={clsx(
                    "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all z-10",
                    isLiked
                        ? "bg-rose-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/20",
                )}
            >
                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
            </button>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3
                    className="text-lg font-bold text-white mb-1 tracking-wide"
                    style={{ fontFamily: "var(--font-syne)" }}
                >
                    {product.name}
                </h3>
                <p className="text-white/80 text-sm mb-4">৳{product.price}</p>

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
    const regular = products.filter((p) => !p.isFeatured && !p.isBestSeller);

    return (
        <section id="featured" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <h2
                        className="text-3xl md:text-5xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        The Collection
                    </h2>
                    <p className="opacity-60 max-w-md">
                        Timeless aesthetics for the modern wardrobe.
                    </p>
                </div>
                <div className="hidden md:block w-32 h-[1px] bg-current opacity-20 mb-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
                {featured.map((product) => (
                    <ProductCard key={product.id} product={product} featured />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {regular.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <a
                    href="#/products"
                    className="inline-block border-b border-current pb-1 uppercase text-sm tracking-widest hover:text-rose-500 transition-colors"
                >
                    View All Products
                </a>
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
                            className="w-[280px] flex-shrink-0"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
