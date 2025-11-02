import { useState } from "react";
import { useTheme, categoryThemes } from "../contexts/ThemeContext";
import { useCartStore, type Product } from "../stores/useStore";
import { Link } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shop - LuxeShop" },
    {
      name: "description",
      content: "Browse our complete collection of premium products",
    },
  ];
}

// Generate sample products
const categories = Object.keys(categoryThemes);
const products: Product[] = categories.flatMap((category) =>
  Array.from({ length: 6 }, (_, i) => ({
    id: `${category}-${i + 1}`,
    name: `Premium ${categoryThemes[category].name} ${i + 1}`,
    price: Math.floor(Math.random() * 200) + 50,
    category: categoryThemes[category].name,
    description: `High quality ${categoryThemes[category].name.toLowerCase()} item from our premium collection`,
  }))
);

export default function Shop() {
  const { currentTheme, setActiveCategory } = useTheme();
  const { addItem, openCart } = useCartStore();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredProducts =
    selectedFilter === "all"
      ? products
      : products.filter(
          (p) => p.category === categoryThemes[selectedFilter]?.name
        );

  const handleAddToCart = (product: Product) => {
    addItem(product);
    openCart();
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div
        className="fixed inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: currentTheme.gradient,
          opacity: 0.05,
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 transition-all duration-700 ease-in-out"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1
                className="text-4xl font-bold transition-all duration-700 hover:scale-105"
                style={{ color: currentTheme.primary }}
              >
                LuxeShop
              </h1>
            </Link>
            <nav className="flex gap-8 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="font-semibold transition-colors duration-700"
                style={{ color: currentTheme.primary }}
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2
            className="text-6xl font-bold mb-6 transition-all duration-700"
            style={{ color: currentTheme.primary }}
          >
            Shop All Products
          </h2>
          <p className="text-xl text-gray-600">
            Browse our complete collection of {products.length} premium items
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => {
              setSelectedFilter("all");
            }}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              selectedFilter === "all" ? "text-white shadow-lg" : ""
            }`}
            style={{
              background:
                selectedFilter === "all"
                  ? currentTheme.gradient
                  : `${currentTheme.primary}15`,
              color: selectedFilter === "all" ? "white" : currentTheme.primary,
            }}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedFilter(cat);
                setActiveCategory(cat);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                selectedFilter === cat ? "text-white shadow-lg" : ""
              }`}
              style={{
                background:
                  selectedFilter === cat
                    ? categoryThemes[cat].gradient
                    : `${categoryThemes[cat].primary}15`,
                color:
                  selectedFilter === cat
                    ? "white"
                    : categoryThemes[cat].primary,
              }}
            >
              {categoryThemes[cat].name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Product Image */}
              <div
                className="h-48 flex items-center justify-center transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.accent}20)`,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-20 h-20 opacity-30"
                  style={{ color: currentTheme.primary }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-lg font-bold mb-2 text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold transition-colors duration-700"
                    style={{ color: currentTheme.primary }}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      background: currentTheme.gradient,
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-auto py-8 transition-all duration-700"
        style={{
          background: `linear-gradient(to top, ${currentTheme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            &copy; 2025 LuxeShop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
