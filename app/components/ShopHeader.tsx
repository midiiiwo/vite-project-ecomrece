import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useThemeStore, categoryThemes } from "../stores/useThemeStore";
import { useCartStore } from "../stores/useStore";

export function ShopHeader() {
  const { theme, category } = useApplyTheme();
  const { openCart, getItemCount } = useCartStore();

  return (
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

          {/* Theme Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full"
            style={{
              background: `${theme.accent}10`,
              border: `2px solid ${theme.accent}30`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: theme.gradient }}
            />
            <span
              className="font-semibold text-sm"
              style={{ color: theme.accent }}
            >
              {categoryThemes[category].name}
            </span>
          </motion.div>

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
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse"
                style={{ background: theme.accent }}
              >
                {getItemCount()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
