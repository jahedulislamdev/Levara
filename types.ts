export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    isFeatured: boolean;
    isBestSeller: boolean;
}

export interface WishlistItem {
    productId: string;
    addedAt: number;
}

export interface HeroSlide {
    id: string;
    image: string;
    title: string;
    subtitle: string;
}

export interface AppConfig {
    heroTitle: string; // Acts as Brand Name
    heroSlides: HeroSlide[];
    footerText: string;
    whatsappNumber: string;
}

export type Theme = "dark" | "light";

export interface AppState {
    theme: Theme;
    toggleTheme: () => void;
    config: AppConfig;
    updateConfig: (updates: Partial<AppConfig>) => void;
    products: Product[];
    wishlist: WishlistItem[];
    toggleWishlist: (productId: string) => void;
    addProduct: (product: Omit<Product, "id">) => void;
    deleteProduct: (id: string) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    isAdminMode: boolean;
    setAdminMode: (isAdmin: boolean) => void;
    analytics: Record<string, number>; // productId -> clicks
    trackClick: (productId: string) => void;
}
