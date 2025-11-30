import { Link } from "react-router";
import { motion } from "framer-motion";
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useThemeStore, categoryThemes } from "../stores/useThemeStore";
import { useCartStore } from "../stores/useStore";
import { useState } from "react";

export function ShopHeader() {
  const { theme, category } = useApplyTheme();
  const { openCart, getItemCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 transition-colors"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-gray-900" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 space-y-2 pb-4 border-t border-gray-200 pt-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
