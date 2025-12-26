import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../state/store";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, MessageCircle, Check } from "lucide-react";
import clsx from "clsx";
import { Layout } from "./Layout";

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, toggleWishlist, wishlist, trackClick, theme, config } =
        useStore();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    const product = products.find((p) => p.id === id);
    const isLiked = product
        ? wishlist.some((item) => item.productId === product.id)
        : false;

    if (!product) {
        return (
            <Layout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center">
                    <h2 className="text-2xl mb-4">Product not found</h2>
                    <button onClick={() => navigate("/")} className="underline">
                        Back to Home
                    </button>
                </div>
            </Layout>
        );
    }

    const sizes = ["S", "M", "L", "XL"];

    const handleInquiry = () => {
        trackClick(product.id);
        const sizeText = selectedSize ? ` in size ${selectedSize}` : "";
        const number = config.whatsappNumber;
        const text = `Hi ${config.heroTitle}! I am interested in purchasing the ${product.name}${sizeText}. ${window.location.href}`;
        window.open(
            `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
            "_blank",
        );
    };

    return (
        <Layout>
            <div className="pt-3 min-h-screen">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 mb-2 bg-black/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-black/40 transition-all duration-300"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            // aspect-[4/5] ensures the box is always 4 units wide by 5 units tall
                            className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden bg-neutral-100 shadow-lg"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                // h-full w-full with object-cover fills the 4:5 container perfectly
                                className="w-full h-full object-cover object-center"
                                loading="eager"
                            />

                            {/* Back Button */}
                        </motion.div>
                    </div>

                    {/* Details Section */}
                    <div className="md:mt-5 flex flex-col py-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-50">
                                    {product.category}
                                </span>
                                <button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={clsx(
                                        "transition-colors",
                                        isLiked
                                            ? "text-rose-500"
                                            : "opacity-30 hover:opacity-100",
                                    )}
                                >
                                    <Heart
                                        fill={isLiked ? "currentColor" : "none"}
                                        size={24}
                                    />
                                </button>
                            </div>

                            <h1
                                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {product.name}
                            </h1>
                            <p className="text-2xl opacity-90 mb-8 font-light">
                                ${product.price}
                            </p>

                            <div className="prose prose-sm dark:prose-invert opacity-80 mb-10 leading-relaxed">
                                <p>{product.description}</p>
                                <p>
                                    Designed with precision, this piece embodies
                                    the {config.heroTitle} commitment to quality
                                    and modern aesthetics.
                                </p>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-10">
                                <h4 className="text-xs font-bold uppercase tracking-wider mb-4 opacity-70">
                                    Select Size
                                </h4>
                                <div className="flex gap-3">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                            className={clsx(
                                                "w-12 h-12 flex items-center justify-center border rounded-full transition-all text-sm",
                                                selectedSize === size
                                                    ? theme === "dark"
                                                        ? "bg-white text-black border-white"
                                                        : "bg-black text-white border-black"
                                                    : "border-current opacity-40 hover:opacity-100",
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleInquiry}
                                    disabled={!selectedSize}
                                    className={clsx(
                                        "flex-1 py-4 font-bold rounded-lg flex items-center justify-center gap-3 transition-all",
                                        !selectedSize
                                            ? "opacity-50 cursor-not-allowed bg-neutral-500 text-white"
                                            : theme === "dark"
                                            ? "bg-white text-black hover:bg-neutral-200"
                                            : "bg-black text-white hover:bg-neutral-800",
                                    )}
                                >
                                    <MessageCircle size={20} />
                                    {selectedSize
                                        ? "Inquire to Buy"
                                        : "Select a Size"}
                                </button>
                            </div>

                            {/* Assurance */}
                            <div className="mt-8 flex gap-6 text-xs opacity-50">
                                <div className="flex items-center gap-2">
                                    <Check size={14} /> Premium Material
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={14} /> Free Global Shipping
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={14} /> Secure Checkout
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
