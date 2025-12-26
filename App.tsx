import React, { useEffect } from "react";
import "./index.css";
import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import { AppProvider, useStore } from "./state/store";
import { Layout } from "./components/Layout";
import { Hero } from "./components/Hero";
import { ProductGrid, Marquee } from "./components/ProductSection";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProductDetail } from "./components/ProductDetail";
import { AllProducts } from "./components/AllProducts";

// --- Scroll To Top Utility ---
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// --- Home Page ---
const Home = () => {
    return (
        <Layout>
            <Hero />
            <Marquee />
            <ProductGrid />
        </Layout>
    );
};

// --- Admin Auth Guard ---
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAdminMode, setAdminMode } = useStore();
    const [password, setPassword] = React.useState("");

    if (isAdminMode) return <>{children}</>;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "!admin!Levara!") {
            setAdminMode(true);
        } else {
            alert("Invalid password (Try Again)");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
            <form
                onSubmit={handleLogin}
                className="p-8 border border-white/10 rounded-xl bg-neutral-900 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Admin Access
                </h2>
                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full mb-4 p-3 bg-black border border-white/20 rounded text-white outline-none focus:border-rose-500 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-white text-black py-3 font-bold rounded hover:bg-gray-200"
                >
                    Enter Dashboard
                </button>
                <div className="mt-4 text-center text-md opacity-70">!!!</div>
            </form>
        </div>
    );
};

// --- Main App Component ---
const App = () => {
    return (
        <AppProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<AllProducts />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AppProvider>
    );
};

export default App;
