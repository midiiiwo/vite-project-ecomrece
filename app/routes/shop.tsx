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

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop - LuxeShop" },
    {
      name: "description",
      content: "Browse our premium collection of products",
    },
  ];
}

// Mock product data
const mockProducts: Product[] = [
  // Fashion products
  {
    id: "fashion-1",
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    category: "Fashion",
    description: "Soft, breathable cotton t-shirt for everyday wear",
    image: "",
  },
  {
    id: "fashion-2",
    name: "Designer Jeans",
    price: 129.99,
    category: "Fashion",
    description: "Classic fit denim jeans with modern styling",
    image: "",
  },
  {
    id: "fashion-3",
    name: "Leather Jacket",
    price: 299.99,
    category: "Fashion",
    description: "Genuine leather jacket with premium finish",
    image: "",
  },
  {
    id: "fashion-4",
    name: "Summer Dress",
    price: 89.99,
    category: "Fashion",
    description: "Light and breezy dress perfect for summer",
    image: "",
  },
  {
    id: "fashion-5",
    name: "Formal Shirt",
    price: 79.99,
    category: "Fashion",
    description: "Crisp formal shirt for professional occasions",
    image: "",
  },
  {
    id: "fashion-6",
    name: "Casual Blazer",
    price: 199.99,
    category: "Fashion",
    description: "Versatile blazer for smart casual looks",
    image: "",
  },

  // Electronics products
  {
    id: "electronics-1",
    name: "Wireless Headphones",
    price: 199.99,
    category: "Electronics",
    description: "Premium noise-cancelling wireless headphones",
    image: "",
  },
  {
    id: "electronics-2",
    name: "Smart Speaker",
    price: 129.99,
    category: "Electronics",
    description: "Voice-activated smart speaker with AI assistant",
    image: "",
  },
  {
    id: "electronics-3",
    name: "4K Monitor",
    price: 449.99,
    category: "Electronics",
    description: "Ultra HD 27-inch display for work and gaming",
    image: "",
  },
  {
    id: "electronics-4",
    name: "Mechanical Keyboard",
    price: 159.99,
    category: "Electronics",
    description: "RGB backlit mechanical gaming keyboard",
    image: "",
  },
  {
    id: "electronics-5",
    name: "Webcam HD",
    price: 89.99,
    category: "Electronics",
    description: "High definition webcam for video calls",
    image: "",
  },
  {
    id: "electronics-6",
    name: "Portable Charger",
    price: 49.99,
    category: "Electronics",
    description: "20,000mAh power bank with fast charging",
    image: "",
  },

  // Footwear products
  {
    id: "footwear-1",
    name: "Running Shoes",
    price: 139.99,
    category: "Footwear",
    description: "Lightweight running shoes with excellent cushioning",
    image: "",
  },
  {
    id: "footwear-2",
    name: "Leather Boots",
    price: 249.99,
    category: "Footwear",
    description: "Durable leather boots for all seasons",
    image: "",
  },
  {
    id: "footwear-3",
    name: "Canvas Sneakers",
    price: 69.99,
    category: "Footwear",
    description: "Classic canvas sneakers in multiple colors",
    image: "",
  },
  {
    id: "footwear-4",
    name: "Formal Shoes",
    price: 179.99,
    category: "Footwear",
    description: "Elegant formal shoes for professional settings",
    image: "",
  },

  // Accessories
  {
    id: "accessories-1",
    name: "Leather Wallet",
    price: 59.99,
    category: "Accessories",
    description: "Genuine leather bi-fold wallet",
    image: "",
  },
  {
    id: "accessories-2",
    name: "Designer Sunglasses",
    price: 149.99,
    category: "Accessories",
    description: "UV protection sunglasses with premium frames",
    image: "",
  },
  {
    id: "accessories-3",
    name: "Leather Belt",
    price: 49.99,
    category: "Accessories",
    description: "Classic leather belt with silver buckle",
    image: "",
  },
  {
    id: "accessories-4",
    name: "Backpack",
    price: 89.99,
    category: "Accessories",
    description: "Spacious backpack with laptop compartment",
    image: "",
  },

  // Smart Watches
  {
    id: "smartwatches-1",
    name: "Fitness Tracker",
    price: 199.99,
    category: "Smart Watches",
    description: "Track your health and fitness goals",
    image: "",
  },
  {
    id: "smartwatches-2",
    name: "Premium Smartwatch",
    price: 399.99,
    category: "Smart Watches",
    description: "Full-featured smartwatch with GPS",
    image: "",
  },

  // Fragrances
  {
    id: "sprays-1",
    name: "Luxury Perfume",
    price: 119.99,
    category: "Fragrances",
    description: "Elegant fragrance for special occasions",
    image: "",
  },
  {
    id: "sprays-2",
    name: "Body Spray",
    price: 29.99,
    category: "Fragrances",
    description: "Fresh daily body spray",
    image: "",
  },

  // Children
  {
    id: "children-1",
    name: "Kids T-Shirt Set",
    price: 39.99,
    category: "Children's Wear",
    description: "Comfortable cotton t-shirts for kids",
    image: "",
  },
  {
    id: "children-2",
    name: "Kids Sneakers",
    price: 59.99,
    category: "Children's Wear",
    description: "Durable and stylish sneakers for active kids",
    image: "",
  },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const { theme, category } = useApplyTheme();
  const { setCategory } = useThemeStore();
  const { openCart, getItemCount } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
      const filtered = mockProducts.filter((p) =>
        p.category
          .toLowerCase()
          .includes(categoryName.toLowerCase().split(" ")[0])
      );
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [category]);

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

          {/* Mobile Filters Drawer */}
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
                    Categories
                  </h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-2">
                  {categories.map(([cat, themeData]) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setMobileFiltersOpen(false);
                      }}
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
                    </button>
                  ))}
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
            </div>

            <ProductGrid products={filteredProducts} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}
