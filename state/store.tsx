import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, Product, Theme, WishlistItem, AppConfig } from "../types";

// Load products from local JSON file
const INITIAL_CONFIG: AppConfig = {
    heroTitle: "LEVARA",
    heroSlides: [
        // {
        //     id: "1",
        //     image: "https://i.postimg.cc/0yTYs43y/Gemini-Generated-Image-86bgtj86bgtj86bg.png",
        //     title: "Sartorial Vividness",
        //     subtitle: "Unapologetic hues defined by master tailoring.",
        // },
        {
            id: "2",
            image: "https://i.postimg.cc/g2KP39Wy/bg_1.jpg",
            title: "Ethereal Silhouette",
            subtitle: "Fluid drapes designed for the golden hour.",
        },
        {
            id: "3",
            image: "https://i.postimg.cc/cLcNfqSR/bg_2.jpg",
            title: "Metropolitan Essential",
            subtitle: "Precision cuts engineered for the modern pace.",
        },
        {
            id: "4",
            image: "https://i.postimg.cc/t4zHF0jh/bg_3.jpg",
            title: "Quiet Authority",
            subtitle: "Refined textures that speak without shouting.",
        },
    ],

    footerText:
        "Elevated essentials for the discerning modern wardobe. We bridge the gap between avant-garde design and daily utility, delivering garments that are as purposeful as they are permanent. This is minimalism, refined",
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
        return saved ? JSON.parse(saved) : [];
    });
    // load products
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch("../products.json");
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error("Failed to load products.json");
            }
        };
        loadProducts();
    }, []);

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
