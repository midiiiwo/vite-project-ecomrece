import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import type { Route } from "../+types/root";
import { ProductGrid } from "../components/ProductGrid";
import { StickyCategoryBar } from "../components/StickyCategoryBar";
import { useApplyTheme } from "../hooks/useApplyTheme";
import {
  useThemeStore,
  categoryThemes,
  type Category,
} from "../stores/useThemeStore";
import { useCartStore, type Product } from "../stores/useStore";
import { useAdminStore } from "../stores/useAdminStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop - LuxeShop" },
    {
      name: "description",
      content: "Browse our premium collection of products",
    },
  ];
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { theme, category } = useApplyTheme();
  const { setCategory } = useThemeStore();
  const { openCart, getItemCount } = useCartStore();
  const { products } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get category from URL or use current theme category
  const urlCategory = searchParams.get("category") as Category | null;

  useEffect(() => {
    if (urlCategory && urlCategory in categoryThemes) {
      setCategory(urlCategory);
    }
  }, [urlCategory, setCategory]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      // Filter products by category
      const categoryName = categoryThemes[category].name;
      let filtered = products.filter((p) =>
        p.category
          .toLowerCase()
          .includes(categoryName.toLowerCase().split(" ")[0])
      );

      // Filter by search query
      if (searchQuery.trim()) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [category, products, searchQuery]);

  const categories = Object.entries(categoryThemes) as [
    Category,
    (typeof categoryThemes)[Category],
  ][];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Category Bar */}
      <StickyCategoryBar />

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <h1
                className="text-3xl font-bold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                LuxeShop
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="font-semibold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: `${theme.accent}15`,
                color: theme.accent,
              }}
            >
              <ShoppingCartIcon className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
                  style={{ background: theme.accent }}
                >
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden p-2"
            >
              {mobileFiltersOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Current Theme Pill */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-md"
          style={{
            background: `${theme.accent}10`,
            border: `2px solid ${theme.accent}30`,
          }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{ background: theme.gradient }}
          />
          <span className="font-bold text-lg" style={{ color: theme.accent }}>
            {categoryThemes[category].name}
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map(([cat, themeData]) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3"
                    style={{
                      background:
                        category === cat
                          ? `${themeData.accent}15`
                          : "transparent",
                      color: category === cat ? themeData.accent : "#374151",
                      fontWeight: category === cat ? 600 : 400,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: themeData.gradient }}
                    />
                    <span className="flex-1">{themeData.name}</span>
                    {category === cat && (
                      <motion.div
                        layoutId="categoryIndicator"
                        className="w-2 h-2 rounded-full"
                        style={{ background: themeData.accent }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Navigation Drawer */}
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white h-full w-80 p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Navigation
                  </h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  <Link
                    to="/"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 font-semibold"
                    style={{ color: theme.accent }}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryThemes[category].name} Collection
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}{" "}
                available
              </p>

              {/* Search Bar */}
              <div className="mt-4 mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <ProductGrid products={filteredProducts} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}
