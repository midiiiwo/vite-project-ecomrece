import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useCartStore, type Product } from "../stores/useStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { theme } = useApplyTheme();
  const { addItem, openCart } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Show button only when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll animation
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`}>
        <motion.div
          className="bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-md cursor-pointer h-full flex flex-col"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: isHovered
              ? `0 20px 40px ${theme.accent}20`
              : "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Product Image */}
          <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden">
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                background: `${theme.gradient}`,
                opacity: 0.1,
              }}
            />

            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 opacity-20"
                  style={{ color: theme.accent }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            )}

            {/* Quick Actions (visible on hover - desktop only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:flex absolute top-4 right-4 flex-col gap-2"
            >
              <button
                onClick={handleAddToCart}
                className="p-2 md:p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                style={{ color: theme.accent }}
                aria-label="Add to cart"
              >
                <ShoppingCartIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                className="p-2 md:p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
                style={{ color: theme.accent }}
                aria-label="View details"
              >
                <EyeIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-3 md:p-6 flex-1 flex flex-col">
            <div className="mb-2">
              <span
                className="text-xs font-semibold px-2 md:px-3 py-1 rounded-full inline-block"
                style={{
                  background: `${theme.accent}15`,
                  color: theme.accent,
                }}
              >
                {product.category}
              </span>
            </div>

            <h3 className="text-base md:text-xl font-bold mb-2 text-gray-900 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-2 flex-1">
              {product.description}
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2 text-xs md:text-sm">
                <span className="font-semibold" style={{ color: theme.accent }}>
                  {product.rating}
                </span>
                <span className="text-yellow-400">★</span>
                {product.reviews && (
                  <span className="text-gray-500">({product.reviews})</span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mb-3 md:mb-4">
              <span
                className="text-lg md:text-2xl font-bold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                GHC {product.price.toFixed(2)}
              </span>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className="w-full p-2 md:p-4 text-white font-semibold text-xs md:text-base rounded-full transition-all duration-300 flex items-center justify-center gap-1 md:gap-2"
              style={{ background: theme.gradient }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCartIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add</span>
            </motion.button>
          </div>
        </motion.div>
      </Link>
      {showButton && (
        <button
          onClick={scrollToTop}
          style={{ background: theme.gradient }}
          className="fixed bottom-5 right-5 p-2 md:p-3 text-white rounded-full shadow-lg hover:opacity-90 transition z-40 text-xs md:text-base"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </motion.div>
  );
}