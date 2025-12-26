import React, { createContext, useContext, useState, useEffect } from "react";
import { AppState, Product, Theme, WishlistItem, AppConfig } from "../types";

const initialProducts: Product[] = [
    {
        id: "1",
        name: "TRUNKS 7",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/NfyvVBFj/32.jpg",
        description:
            "TRUNKS 7 premium drop-shoulder tee crafted from soft 100% cotton for relaxed street comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "2",
        name: "MUJAHID",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/gkwb5mj3/33.jpg",
        description:
            "MUJAHID classic T-shirt made with breathable 100% cotton for everyday confidence.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "3",
        name: "TREE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/7YprrdJf/34.jpg",
        description:
            "TREE minimalist cotton T-shirt designed with soft 100% cotton for daily comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "4",
        name: "MUJAHID",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/qM9HHS6N/35.jpg",
        description:
            "MUJAHID lifestyle tee built from premium 100% cotton with a clean regular fit.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "5",
        name: "SQUID GAME",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/bNKffWSG/36.jpg",
        description:
            "SQUID GAME statement drop-shoulder T-shirt made from heavyweight 100% cotton.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "6",
        name: "SQUID GAME",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/jdGYYmnz/37.jpg",
        description:
            "SQUID GAME premium cotton tee featuring a relaxed drop-shoulder street fit.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "7",
        name: "LEGEND INSIDE YOU",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/NfWvvS2k/38.jpg",
        description:
            "LEGEND INSIDE YOU bold drop-shoulder T-shirt crafted with smooth 100% cotton.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "8",
        name: "LEGEND INSIDE YOU",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/bNKffWSR/39.jpg",
        description:
            "LEGEND INSIDE YOU streetwear tee made from breathable premium cotton fabric.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "9",
        name: "ITACHI UCHIHA",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/PrBnn9v4/40.jpg",
        description:
            "ITACHI UCHIHA drop-shoulder T-shirt designed with soft-touch 100% cotton.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "10",
        name: "ITACHI UCHIHA",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/X7T66mBD/41.jpg",
        description:
            "ITACHI UCHIHA premium cotton tee offering comfort with a modern relaxed fit.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "11",
        name: "ITACHI UCHIHA",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/4NrRRqHM/42.jpg",
        description:
            "ITACHI UCHIHA street-style drop shoulder made from durable 100% cotton.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "12",
        name: "ONLY GOD CAN STOP",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/kXkPPzRH/43.jpg",
        description:
            "ONLY GOD CAN STOP statement T-shirt crafted from premium breathable cotton.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "13",
        name: "ONLY GOD CAN STOP",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/sg7djm56/44.jpg",
        description:
            "ONLY GOD CAN STOP everyday cotton tee with a clean and confident look.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "14",
        name: "FAITH",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/RZK5SdwD/45.jpg",
        description:
            "FAITH classic-fit T-shirt made from soft premium 100% cotton fabric.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "15",
        name: "SPIDER",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/wjL8q2Dr/46.jpg",
        description:
            "SPIDER graphic cotton T-shirt designed for breathable daily comfort.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "16",
        name: "OXOO",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/BnH9Sp2y/47.jpg",
        description:
            "OXOO premium cotton T-shirt offering smooth texture and lasting comfort.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "17",
        name: "OXOO",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/NjmqsD1Q/48.jpg",
        description:
            "OXOO everyday wear T-shirt crafted from breathable 100% cotton.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "18",
        name: "JAPANESE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/7Z08H9gY/49.jpg",
        description:
            "JAPANESE-inspired cotton T-shirt designed with a clean modern finish.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "19",
        name: "JAPANESE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/dVrPs68V/50.jpg",
        description:
            "JAPANESE lifestyle tee made from premium cotton for all-day comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "20",
        name: "HERO",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/2ShRkG45/51.jpg",
        description:
            "HERO classic cotton T-shirt built for a bold yet minimal daily look.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "21",
        name: "GOJO",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/2ShRkG43/52.jpg",
        description:
            "GOJO premium drop-shoulder tee crafted from heavyweight 100% cotton.",
        isFeatured: true,
        isBestSeller: false,
    },
    {
        id: "22",
        name: "COFFEE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/zfNmVhjq/53.jpg",
        description:
            "COFFEE casual cotton T-shirt designed for smooth everyday comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "23",
        name: "BREAK RULES",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/g0p9nhD2/54.jpg",
        description:
            "BREAK RULES bold drop-shoulder T-shirt made from premium cotton fabric.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "24",
        name: "BREAK RULES",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/FKvt7SZK/55.jpg",
        description:
            "BREAK RULES street-fit cotton tee offering relaxed and durable comfort.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "25",
        name: "HEROES",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/LsSdnPT5/56.jpg",
        description:
            "HEROES everyday cotton T-shirt crafted for clean lifestyle styling.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "26",
        name: "INTIFADA",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/ZYfXmRD7/1.jpg",
        description:
            "INTIFADA statement cotton T-shirt designed with breathable comfort.",
        isFeatured: false,
        isBestSeller: true,
    },
    {
        id: "27",
        name: "DISCIPLINE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/MKvNpSCf/10.jpg",
        description:
            "DISCIPLINE minimal cotton T-shirt built for focused everyday wear.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "28",
        name: "DRUSE",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/BQXkn0r8/11.jpg",
        description:
            "DRUSE premium drop-shoulder tee crafted from heavyweight cotton.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "29",
        name: "BUTTERFLY",
        price: 450,
        category: "Drop Shoulder",
        image: "https://i.postimg.cc/rFK3wkBr/12.jpg",
        description:
            "BUTTERFLY artistic cotton T-shirt with a relaxed drop-shoulder fit.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "30",
        name: "WILD LIFE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/3JdVxTsZ/13.jpg",
        description:
            "WILD LIFE casual cotton T-shirt inspired by everyday street culture.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "31",
        name: "WILD LIFE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/02bFysTf/14.jpg",
        description:
            "WILD LIFE soft cotton T-shirt offering clean comfort and durability.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "32",
        name: "WILD LIFE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/vHckZsJX/15.jpg",
        description:
            "WILD LIFE breathable cotton tee designed for all-day wear.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "33",
        name: "INTIFADA",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/3NbqFSvj/2.jpg",
        description:
            "INTIFADA modern cotton T-shirt crafted for a bold lifestyle look.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "34",
        name: "STAY TOGETHER",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/cC5zB9nR/3.jpg",
        description:
            "STAY TOGETHER premium cotton T-shirt with a timeless clean fit.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "35",
        name: "STAY TOGETHER",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/05thvQHV/4.jpg",
        description:
            "STAY TOGETHER everyday cotton tee designed for relaxed comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "36",
        name: "PROFILE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/zDd4NBcq/5.jpg",
        description:
            "PROFILE essential cotton T-shirt crafted for smooth daily wear.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "37",
        name: "PROFILE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/qBmWrR50/6.jpg",
        description:
            "PROFILE premium cotton tee with a relaxed modern silhouette.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "38",
        name: "SPACE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/T2kBxw4f/7.jpg",
        description:
            "SPACE lifestyle cotton T-shirt inspired by minimal street fashion.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "39",
        name: "SPACE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/59PDJ0RJ/8.jpg",
        description:
            "SPACE soft cotton T-shirt offering relaxed everyday comfort.",
        isFeatured: false,
        isBestSeller: false,
    },
    {
        id: "40",
        name: "DESCIPLINE",
        price: 350,
        category: "T-shirt",
        image: "https://i.postimg.cc/bNsWwh7r/9.jpg",
        description:
            "DESCIPLINE premium cotton T-shirt built for clean and focused style.",
        isFeatured: false,
        isBestSeller: true,
    },
];
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
        return saved ? JSON.parse(saved) : initialProducts;
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
