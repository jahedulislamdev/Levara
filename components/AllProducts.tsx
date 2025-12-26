import React, { useState } from "react";
import { useStore } from "../state/store";
import { ProductCard } from "./ProductSection";
import { Layout } from "./Layout";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import clsx from "clsx";

export const AllProducts: React.FC = () => {
    const { products, theme, config } = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const itemsPerPage = 8;

    // Filter products based on search
    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Layout>
            <div className="pt-16 pb-24 px-6 min-h-screen max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h1
                            className="text-4xl md:text-6xl font-bold mb-2"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            All Products
                        </h1>
                        <p className="opacity-60 max-w-md">
                            Browse our complete collection of modern essentials.
                        </p>
                    </div>

                    {/* Search / Filter Placeholder */}
                    <div
                        className={clsx(
                            "flex items-center px-4 py-2 rounded-full border w-full md:w-auto min-w-[300px]",
                            theme === "dark"
                                ? "bg-white/5 border-white/10"
                                : "bg-neutral-100 border-neutral-200",
                        )}
                    >
                        <Search size={18} className="opacity-50 mr-2" />
                        <input
                            type="text"
                            placeholder="Search collection..."
                            className="bg-transparent outline-none w-full text-sm"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Reset to page 1 on search
                            }}
                        />
                    </div>
                </div>

                {/* Grid */}
                {currentItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {currentItems.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-50">
                        <p>No products found matching your criteria.</p>
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <button
                            onClick={() =>
                                handlePageChange(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                            className={clsx(
                                "p-2 rounded-full border transition-all",
                                currentPage === 1
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-current/10",
                            )}
                            style={{ borderColor: "currentColor" }}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2 mx-2">
                            {Array.from({ length: totalPages }).map(
                                (_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() =>
                                            handlePageChange(idx + 1)
                                        }
                                        className={clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                                            currentPage === idx + 1
                                                ? theme === "dark"
                                                    ? "bg-white text-black"
                                                    : "bg-black text-white"
                                                : "opacity-50 hover:opacity-100",
                                        )}
                                    >
                                        {idx + 1}
                                    </button>
                                ),
                            )}
                        </div>

                        <button
                            onClick={() =>
                                handlePageChange(
                                    Math.min(totalPages, currentPage + 1),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className={clsx(
                                "p-2 rounded-full border transition-all",
                                currentPage === totalPages
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-current/10",
                            )}
                            style={{ borderColor: "currentColor" }}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};
