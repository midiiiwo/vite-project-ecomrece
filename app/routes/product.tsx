import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import type { Route } from "../+types/root";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useCartStore } from "../stores/useStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product Details - LuxeShop" },
    {
      name: "description",
      content: "View product details",
    },
  ];
}

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useApplyTheme();
  const { addItem, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data (in a real app, fetch from API)
  const product = {
    id: id || "1",
    name: "Premium Product",
    price: 199.99,
    category: "Fashion",
    description:
      "This is a premium product with exceptional quality and craftsmanship. Perfect for those who appreciate fine details and excellent design.",
    image: "",
    features: [
      "High-quality materials",
      "Expertly crafted",
      "Sustainable production",
      "Limited edition",
    ],
    specifications: {
      Material: "Premium Cotton",
      Color: "Multiple options",
      Size: "S, M, L, XL",
      Care: "Machine washable",
    },
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    openCart();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back</span>
            </button>

            <Link to="/" className="flex items-center gap-2">
              <h1
                className="text-3xl font-bold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                LuxeShop
              </h1>
            </Link>

            <button
              onClick={openCart}
              className="p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: `${theme.accent}15`,
                color: theme.accent,
              }}
            >
              <ShoppingCartIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden sticky top-24">
              <div
                className="aspect-square flex items-center justify-center"
                style={{
                  background: `${theme.gradient}`,
                  opacity: 0.1,
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.5}
                  stroke="currentColor"
                  className="w-64 h-64 opacity-20"
                  style={{ color: theme.accent }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: `${theme.accent}15`,
                  color: theme.accent,
                }}
              >
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span
                className="text-4xl font-bold"
                style={{ color: theme.accent }}
              >
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 rounded-full hover:scale-110 transition-transform"
                style={{
                  background: `${theme.accent}15`,
                  color: theme.accent,
                }}
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${theme.accent}15`,
                    color: theme.accent,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span className="text-2xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: `${theme.accent}15`,
                    color: theme.accent,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 5v14m7-7H5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full py-4 text-white font-bold text-lg rounded-full shadow-lg mb-4"
              style={{ background: theme.gradient }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Add to Cart
            </motion.button>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: theme.accent }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Specifications
              </h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-semibold text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
