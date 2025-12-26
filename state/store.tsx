import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, Product, Theme, WishlistItem, AppConfig } from "../types";

const INITIAL_PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Essence Silk Dress",
        price: 850,
        category: "Dresses",
        image: "https://i.postimg.cc/8PW9khcw/33.png",
        description:
            "A fluid silhouette crafted from 100% mulberry silk, designed for evening elegance.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "2",
        name: "Midnight Velvet Blazer",
        price: 1200,
        category: "Outerwear",
        image: "https://i.postimg.cc/rFW3ySsJ/32.png",
        description:
            "Structured tailoring meets deep midnight velvet. A statement piece for the modern era.",
        isFeatured: true,
        isBestSeller: true,
    },
    {
        id: "3",
        name: "Urban Tech Parka",
        price: 650,
        category: "Outerwear",
        image: "https://i.postimg.cc/Qx5wNpCq/34.png",
        description:
            "Water-resistant, breathable, and cut for a contemporary oversized fit.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "4",
        name: "Linen Breeze Shirt",
        price: 220,
        category: "Tops",
        image: "https://i.postimg.cc/qMnSB8qw/35.png",
        description:
            "Organic linen weave in a relaxed cut, perfect for coastal escapes.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "5",
        name: "Sculpted Wide-Leg Trousers",
        price: 380,
        category: "Bottoms",
        image: "https://i.postimg.cc/rwkbDKt2/36.png",
        description:
            "High-waisted architectural fit with deep pleats and a flowing drape.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "6",
        name: "Merino Wool Turtle Neck",
        price: 275,
        category: "Knitwear",
        image: "https://i.postimg.cc/g2W5xn69/37.png",
        description: "Ultra-fine merino wool providing warmth without weight.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "7",
        name: "Avant-Garde Leather Jacket",
        price: 1450,
        category: "Outerwear",
        image: "https://i.postimg.cc/YCHVvhLJ/38.png",
        description:
            "Asymmetrical zip detailing with premium full-grain Italian leather.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "8",
        name: "Pleated Chiffon Midi",
        price: 420,
        category: "Skirts",
        image: "https://i.postimg.cc/sgr8MvZd/39.png",
        description:
            "Delicate accordion pleats that move beautifully with every step.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "9",
        name: "Cashmere Lounge Set",
        price: 890,
        category: "Loungewear",
        image: "https://i.postimg.cc/GmCN4HsC/40.png",
        description:
            "The ultimate luxury in comfort, featuring pure Mongolian cashmere.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "10",
        name: "Oxford Structure Shirt",
        price: 180,
        category: "Tops",
        image: "https://i.postimg.cc/FH4qY7Jr/41.png",
        description: "Crisp, clean lines suitable for boardroom or brunch.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "11",
        name: "Minimalist Chino",
        price: 210,
        category: "Bottoms",
        image: "https://i.postimg.cc/HkgKrV7T/42.png",
        description: "Tailored slim fit with a soft-touch cotton blend finish.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "12",
        name: "Vintage Wash Denim Jacket",
        price: 350,
        category: "Outerwear",
        image: "https://i.postimg.cc/JzLgsGB1/43.png",
        description:
            "A timeless classic reimagined with a modern boxy silhouette.",
        isFeatured: true,
        isBestSeller: true,
    },
    {
        id: "13",
        name: "Silk Bow Blouse",
        price: 450,
        category: "Tops",
        image: "https://i.postimg.cc/9QYkZCys/44.png",
        description:
            "Feminine elegance with a dramatic neck tie and billowed sleeves.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "14",
        name: "Camel Wool Coat",
        price: 980,
        category: "Outerwear",
        image: "https://i.postimg.cc/NjknmB1c/45.png",
        description:
            "Double-breasted warmth tailored for the coldest winter days.",
        isFeatured: true,
        isBestSeller: true,
    },
    {
        id: "15",
        name: "Utility Cargo Pants",
        price: 290,
        category: "Bottoms",
        image: "https://i.postimg.cc/bw95kpQz/46.png",
        description: "Functional pockets meet high-street fashion tailoring.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "16",
        name: "Chunky Knit Cardigan",
        price: 310,
        category: "Knitwear",
        image: "https://i.postimg.cc/P5Q7YTmH/47.png",
        description: "Oversized comfort knit from an alpaca wool blend.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "17",
        name: "Satin Evening Slip",
        price: 550,
        category: "Dresses",
        image: "https://i.postimg.cc/XYkPd4w3/48.png",
        description: "Minimalist 90s inspired cut with a lustrous finish.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "18",
        name: "Abstract Print Tee",
        price: 95,
        category: "Tops",
        image: "https://i.postimg.cc/Z5xQp4rR/49.png",
        description:
            "Heavyweight cotton featuring exclusive artwork from local designers.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "19",
        name: "Corduroy Overshirt",
        price: 240,
        category: "Tops",
        image: "https://i.postimg.cc/XYkPd4wq/50.png",
        description: "Versatile layering piece with a vintage texture.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "20",
        name: "Performance Leggings",
        price: 130,
        category: "Activewear",
        image: "https://i.postimg.cc/wjQrLgh3/51.png",
        description:
            "High-compression fabric designed for high-intensity movement.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "21",
        name: "Quilted Puffer Vest",
        price: 280,
        category: "Outerwear",
        image: "https://i.postimg.cc/L83WL2zJ/52.png",
        description: "Lightweight insulation ideal for transitional weather.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "22",
        name: "Double Breasted Suit",
        price: 1600,
        category: "Suits",
        image: "https://i.postimg.cc/MpmLVqyR/53.png",
        description: "Impeccable construction for the discerning professional.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "23",
        name: "Floral Summer Wrap",
        price: 320,
        category: "Dresses",
        image: "https://i.postimg.cc/q7B5GSL5/54.png",
        description: "Breezy viscose fabric with a hand-painted floral motif.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "24",
        name: "High-Rise Mom Jeans",
        price: 160,
        category: "Bottoms",
        image: "https://i.postimg.cc/vm8NvkzS/55.png",
        description: "Authentic denim feel with a flattering tapered leg.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "25",
        name: "Sherpa Lined Trucker",
        price: 410,
        category: "Outerwear",
        image: "https://i.postimg.cc/TPkHN07S/56.png",
        description: "Rugged exterior with a soft, warm interior lining.",
        isFeatured: false,
        isBestSeller: false,
    },
];

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
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
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
