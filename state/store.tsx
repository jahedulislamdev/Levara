import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, Product, Theme, WishlistItem, AppConfig } from "../types";

// Load products from local JSON file
const allProducts = async () => {
    try {
        const tryLoad = await fetch("../products.json");
        if (tryLoad.ok) {
            const data = await tryLoad.json();
            return data;
        }
    } catch (error) {
        throw new Error("Failed to load products.json");
    }
};

const INITIAL_CONFIG: AppConfig = {
    heroTitle: "LEVARA",
    heroSlides: [
        {
            id: "1",
            image: "https://images.unsplash.com/photo-1529139574466-a302d2d3f524?q=80&w=2000&auto=format&fit=crop",
            title: "Vibrant Aesthetics",
            subtitle: "Express yourself with bold colors and modern cuts.",
        },
        {
            id: "2",
            image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
            title: "Summer Ethereal",
            subtitle: "Architecture for the body. Designed for the moment.",
        },
        {
            id: "3",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop",
            title: "Urban Minimalism",
            subtitle: "Clean lines for the chaotic city.",
        },
    ],
    footerText:
        "Modern minimalist apparel designed for the contemporary individual. Crafted with purpose.",
    whatsappNumber: "+8801560057694",
};

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    // Theme
    const [theme, setTheme] = useState<Theme>("dark");
    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    // Config
    const [config, setConfig] = useState<AppConfig>(() => {
        const saved = localStorage.getItem("levara_config");
        if (saved) {
            const parsed = JSON.parse(saved);
            // Migration check for old config format
            if (!parsed.heroSlides) {
                return INITIAL_CONFIG;
            }
            return parsed;
        }
        return INITIAL_CONFIG;
    });

    useEffect(() => {
        localStorage.setItem("levara_config", JSON.stringify(config));
    }, [config]);

    const updateConfig = (updates: Partial<AppConfig>) => {
        setConfig((prev) => ({ ...prev, ...updates }));
    };

    // Products
    const [products, setProducts] = useState<Product[]>(() => {
        const saved = localStorage.getItem("levara_products");
        return saved ? JSON.parse(saved) : allProducts() || [];
    });

    useEffect(() => {
        localStorage.setItem("levara_products", JSON.stringify(products));
    }, [products]);

    // Wishlist
    const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
        const saved = localStorage.getItem("levara_wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("levara_wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (productId: string) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.productId === productId);
            if (exists) {
                return prev.filter((item) => item.productId !== productId);
            }
            return [...prev, { productId, addedAt: Date.now() }];
        });
    };

    // Admin & Analytics
    const [isAdminMode, setAdminMode] = useState(false);
    const [analytics, setAnalytics] = useState<Record<string, number>>(() => {
        const saved = localStorage.getItem("levara_analytics");
        return saved ? JSON.parse(saved) : {};
    });

    const trackClick = (productId: string) => {
        setAnalytics((prev) => {
            const next = { ...prev, [productId]: (prev[productId] || 0) + 1 };
            localStorage.setItem("levara_analytics", JSON.stringify(next));
            return next;
        });
    };

    const addProduct = (product: Omit<Product, "id">) => {
        const newProduct = {
            ...product,
            id: Math.random().toString(36).substr(2, 9),
        };
        setProducts((prev) => [newProduct, ...prev]);
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const updateProduct = (id: string, updates: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        );
    };

    return (
        <AppContext.Provider
            value={{
                theme,
                toggleTheme,
                config,
                updateConfig,
                products,
                wishlist,
                toggleWishlist,
                addProduct,
                deleteProduct,
                updateProduct,
                isAdminMode,
                setAdminMode,
                analytics,
                trackClick,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useStore must be used within AppProvider");
    return context;
};
