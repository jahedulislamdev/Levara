import React, { useState, useEffect } from "react";
import { useStore } from "../state/store";
import {
    Plus,
    Trash,
    Edit,
    BarChart,
    Settings,
    Package,
    X,
    Check,
    Save,
    ChevronLeft,
    ChevronRight,
    Image as ImageIcon,
} from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Product, HeroSlide } from "../types";

export const AdminDashboard: React.FC = () => {
    const {
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        analytics,
        theme,
        setAdminMode,
        config,
        updateConfig,
    } = useStore();
    const [activeTab, setActiveTab] = useState<"inventory" | "settings">(
        "inventory",
    );

    // Product Form State
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [productForm, setProductForm] = useState({
        name: "",
        price: 0,
        category: "",
        image: "",
        description: "",
        isFeatured: false,
        isBestSeller: false,
    });

    // Delete Confirmation State
    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Config Form State
    const [configForm, setConfigForm] = useState(config);

    // New Slide Form State
    const [newSlide, setNewSlide] = useState<Omit<HeroSlide, "id">>({
        title: "",
        subtitle: "",
        image: "",
    });

    useEffect(() => {
        setConfigForm(config);
    }, [config]);

    const resetProductForm = () => {
        setProductForm({
            name: "",
            price: 0,
            category: "",
            image: `https://images.unsplash.com/photo-${Math.floor(
                Math.random() * 100000,
            )}?q=80&w=1000`,
            description: "",
            isFeatured: false,
            isBestSeller: false,
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleEditClick = (product: Product) => {
        setProductForm({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            isFeatured: product.isFeatured,
            isBestSeller: product.isBestSeller,
        });
        setEditingId(product.id);
        setIsEditing(true);
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateProduct(editingId, productForm);
        } else {
            addProduct(productForm);
        }
        resetProductForm();
    };

    const confirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete);
            setProductToDelete(null);
        }
    };

    const handleConfigSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateConfig(configForm);
        alert("Settings saved successfully!");
    };

    // Slide Management
    const handleAddSlide = () => {
        if (!newSlide.image || !newSlide.title) {
            alert("Please provide at least an image URL and a title.");
            return;
        }
        const slide: HeroSlide = {
            ...newSlide,
            id: Math.random().toString(36).substr(2, 9),
        };
        setConfigForm((prev) => ({
            ...prev,
            heroSlides: [...prev.heroSlides, slide],
        }));
        setNewSlide({ title: "", subtitle: "", image: "" });
    };

    const removeSlide = (id: string) => {
        setConfigForm((prev) => ({
            ...prev,
            heroSlides: prev.heroSlides.filter((s) => s.id !== id),
        }));
    };

    return (
        <div
            className={clsx(
                "min-h-screen p-8 transition-colors duration-300 relative",
                theme === "dark"
                    ? "bg-neutral-950 text-white"
                    : "bg-neutral-50 text-neutral-900",
            )}
        >
            {/* Delete Confirmation Modal */}
            {productToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div
                        className={clsx(
                            "p-6 rounded-xl shadow-2xl max-w-sm w-full",
                            theme === "dark"
                                ? "bg-neutral-900 border border-white/10"
                                : "bg-white border border-black/10",
                        )}
                    >
                        <h3 className="text-xl font-bold mb-2">
                            Delete Product?
                        </h3>
                        <p className="opacity-60 mb-6">
                            Are you sure you want to remove this item? This
                            action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setProductToDelete(null)}
                                className="flex-1 py-2 rounded-lg font-medium opacity-60 hover:opacity-100 hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Levara Dashboard
                        </h1>
                        <Link
                            to="/"
                            className="text-sm opacity-50 hover:underline"
                        >
                            ← Back to Showroom
                        </Link>
                    </div>
                    <button
                        onClick={() => setAdminMode(false)}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 border-b border-current/10 pb-1">
                    <button
                        onClick={() => setActiveTab("inventory")}
                        className={clsx(
                            "pb-2 flex items-center gap-2 transition-all",
                            activeTab === "inventory"
                                ? "border-b-2 border-rose-500 font-bold"
                                : "opacity-50",
                        )}
                    >
                        <Package size={18} /> Inventory
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={clsx(
                            "pb-2 flex items-center gap-2 transition-all",
                            activeTab === "settings"
                                ? "border-b-2 border-rose-500 font-bold"
                                : "opacity-50",
                        )}
                    >
                        <Settings size={18} /> Settings & Content
                    </button>
                </div>

                {activeTab === "inventory" ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Analytics */}
                        <div
                            className={clsx(
                                "p-6 rounded-xl border",
                                theme === "dark"
                                    ? "bg-neutral-900 border-white/10"
                                    : "bg-white border-black/10",
                            )}
                        >
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <BarChart size={18} /> Lead Gen Analytics
                            </h3>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                                {products.map((p) => {
                                    const clicks = analytics[p.id] || 0;
                                    if (clicks === 0) return null;
                                    return (
                                        <div
                                            key={p.id}
                                            className="flex justify-between items-center text-sm"
                                        >
                                            <span className="truncate max-w-[200px]">
                                                {p.name}
                                            </span>
                                            <span className="font-mono bg-green-500/20 text-green-500 px-2 py-1 rounded">
                                                {clicks} Clicks
                                            </span>
                                        </div>
                                    );
                                })}
                                {Object.keys(analytics).length === 0 && (
                                    <p className="opacity-50 text-sm">
                                        No interaction data yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Product Management */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-xl">
                                    {isEditing
                                        ? "Edit Product"
                                        : "Add New Product"}
                                </h3>
                                {isEditing && (
                                    <button
                                        onClick={resetProductForm}
                                        className="text-sm opacity-50 hover:opacity-100 flex items-center gap-1"
                                    >
                                        <X size={14} /> Cancel Edit
                                    </button>
                                )}
                            </div>

                            {/* Product Form */}
                            <form
                                onSubmit={handleProductSubmit}
                                className={clsx(
                                    "p-6 rounded-xl border mb-8 transition-all",
                                    theme === "dark"
                                        ? "bg-neutral-900 border-white/10"
                                        : "bg-white border-black/10",
                                )}
                            >
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <input
                                        required
                                        placeholder="Name"
                                        className="p-2 rounded bg-transparent border border-current opacity-70"
                                        value={productForm.name}
                                        onChange={(e) =>
                                            setProductForm({
                                                ...productForm,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        required
                                        type="number"
                                        placeholder="Price"
                                        className="p-2 rounded bg-transparent border border-current opacity-70"
                                        value={productForm.price}
                                        onChange={(e) =>
                                            setProductForm({
                                                ...productForm,
                                                price: Number(e.target.value),
                                            })
                                        }
                                    />
                                    <input
                                        required
                                        placeholder="Category"
                                        className="p-2 rounded bg-transparent border border-current opacity-70"
                                        value={productForm.category}
                                        onChange={(e) =>
                                            setProductForm({
                                                ...productForm,
                                                category: e.target.value,
                                            })
                                        }
                                    />
                                    <input
                                        required
                                        placeholder="Image URL"
                                        className="p-2 rounded bg-transparent border border-current opacity-70"
                                        value={productForm.image}
                                        onChange={(e) =>
                                            setProductForm({
                                                ...productForm,
                                                image: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <textarea
                                    required
                                    placeholder="Description"
                                    className="w-full p-2 rounded bg-transparent border border-current opacity-70 mb-4"
                                    value={productForm.description}
                                    onChange={(e) =>
                                        setProductForm({
                                            ...productForm,
                                            description: e.target.value,
                                        })
                                    }
                                />
                                <div className="flex gap-4 mb-4">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={productForm.isFeatured}
                                            onChange={(e) =>
                                                setProductForm({
                                                    ...productForm,
                                                    isFeatured:
                                                        e.target.checked,
                                                })
                                            }
                                        />{" "}
                                        Featured
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={productForm.isBestSeller}
                                            onChange={(e) =>
                                                setProductForm({
                                                    ...productForm,
                                                    isBestSeller:
                                                        e.target.checked,
                                                })
                                            }
                                        />{" "}
                                        Best Seller
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className={clsx(
                                        "w-full py-2 font-bold rounded flex items-center justify-center gap-2",
                                        isEditing
                                            ? "bg-yellow-500 text-black hover:bg-yellow-400"
                                            : "bg-blue-600 text-white hover:bg-blue-500",
                                    )}
                                >
                                    {isEditing ? (
                                        <>
                                            <Check size={18} /> Update Product
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={18} /> Create Product
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Inventory List with Pagination */}
                            <div className="space-y-4">
                                {currentItems.map((p) => (
                                    <div
                                        key={p.id}
                                        className={clsx(
                                            "flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-rose-500/30",
                                            theme === "dark"
                                                ? "bg-neutral-900 border-white/5"
                                                : "bg-white border-black/5",
                                        )}
                                    >
                                        <img
                                            src={p.image}
                                            className="w-12 h-12 rounded object-cover"
                                            alt=""
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold">
                                                {p.name}
                                            </h4>
                                            <p className="text-xs opacity-50">
                                                ৳{p.price} • {p.category}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(p)
                                                }
                                                className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded text-blue-400 transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setProductToDelete(p.id)
                                                }
                                                className="p-2 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 pt-4 border-t border-current/10">
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1),
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="p-2 rounded hover:bg-current/10 disabled:opacity-30"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="text-sm opacity-60">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.min(totalPages, prev + 1),
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded hover:bg-current/10 disabled:opacity-30"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Settings Tab
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            {/* Global Config Form */}
                            <div
                                className={clsx(
                                    "p-8 rounded-xl border space-y-6",
                                    theme === "dark"
                                        ? "bg-neutral-900 border-white/10"
                                        : "bg-white border-black/10",
                                )}
                            >
                                <h3 className="text-xl font-bold mb-6">
                                    Global Configuration
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs uppercase font-bold opacity-60 mb-2">
                                            Brand Name
                                        </label>
                                        <input
                                            className="w-full p-3 rounded bg-transparent border border-current opacity-80"
                                            value={configForm.heroTitle}
                                            onChange={(e) =>
                                                setConfigForm({
                                                    ...configForm,
                                                    heroTitle: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold opacity-60 mb-2">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-3 rounded bg-transparent border border-current opacity-80"
                                            value={configForm.whatsappNumber}
                                            onChange={(e) =>
                                                setConfigForm({
                                                    ...configForm,
                                                    whatsappNumber:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                        <p className="text-[10px] mt-1 opacity-40">
                                            Format: Country code + number (e.g.,
                                            1234567890)
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase font-bold opacity-60 mb-2">
                                            Footer Description
                                        </label>
                                        <textarea
                                            className="w-full p-3 rounded bg-transparent border border-current opacity-80"
                                            rows={3}
                                            value={configForm.footerText}
                                            onChange={(e) =>
                                                setConfigForm({
                                                    ...configForm,
                                                    footerText: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Slider Management */}
                            <div
                                className={clsx(
                                    "p-8 rounded-xl border",
                                    theme === "dark"
                                        ? "bg-neutral-900 border-white/10"
                                        : "bg-white border-black/10",
                                )}
                            >
                                <h3 className="text-xl font-bold mb-6">
                                    Hero Slider Images
                                </h3>

                                <div className="space-y-4 mb-6">
                                    {configForm.heroSlides.map(
                                        (slide, index) => (
                                            <div
                                                key={slide.id}
                                                className="flex gap-4 items-center p-3 rounded border border-current/10"
                                            >
                                                <img
                                                    src={slide.image}
                                                    alt="Thumbnail"
                                                    className="w-16 h-10 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-sm truncate">
                                                        {slide.title}
                                                    </div>
                                                    <div className="text-xs opacity-60 truncate">
                                                        {slide.subtitle}
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        removeSlide(slide.id)
                                                    }
                                                    className="p-2 hover:bg-red-500/20 text-red-500 rounded transition-colors"
                                                    title="Remove Slide"
                                                >
                                                    <Trash size={14} />
                                                </button>
                                            </div>
                                        ),
                                    )}
                                    {configForm.heroSlides.length === 0 && (
                                        <p className="opacity-50 text-sm">
                                            No slides added.
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-current/10 pt-4">
                                    <h4 className="font-bold text-sm mb-4">
                                        Add New Slide
                                    </h4>
                                    <div className="space-y-3">
                                        <input
                                            placeholder="Title (e.g., Summer Collection)"
                                            className="w-full p-2 rounded bg-transparent border border-current opacity-80 text-sm"
                                            value={newSlide.title}
                                            onChange={(e) =>
                                                setNewSlide({
                                                    ...newSlide,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            placeholder="Subtitle (Optional)"
                                            className="w-full p-2 rounded bg-transparent border border-current opacity-80 text-sm"
                                            value={newSlide.subtitle}
                                            onChange={(e) =>
                                                setNewSlide({
                                                    ...newSlide,
                                                    subtitle: e.target.value,
                                                })
                                            }
                                        />
                                        <input
                                            placeholder="Image URL"
                                            className="w-full p-2 rounded bg-transparent border border-current opacity-80 text-sm"
                                            value={newSlide.image}
                                            onChange={(e) =>
                                                setNewSlide({
                                                    ...newSlide,
                                                    image: e.target.value,
                                                })
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSlide}
                                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-sm flex items-center justify-center gap-2"
                                        >
                                            <Plus size={16} /> Add Slide
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                onClick={handleConfigSubmit}
                                className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                                <Save size={20} /> Save All Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
