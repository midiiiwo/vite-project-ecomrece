import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  useThemeStore,
  categoryThemes,
  type Category,
} from "../stores/useThemeStore";
import { useApplyTheme } from "../hooks/useApplyTheme";

export function StickyCategoryBar() {
  const { category, setCategory } = useThemeStore();
  const { theme } = useApplyTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (newCategory: Category) => {
    setCategory(newCategory);
    setIsOpen(false);
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = Object.entries(categoryThemes) as [
    Category,
    (typeof categoryThemes)[Category],
  ][];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-4 z-50"
        >
          <div className="relative">
            {/* Current Category Pill */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg backdrop-blur-md border-2 transition-all duration-300 hover:scale-105"
              style={{
                background: `${theme.accent}15`,
                borderColor: theme.accent,
                color: theme.accent,
              }}
            >
              <span className="font-semibold">
                {categoryThemes[category].name}
              </span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                >
                  {categories.map(([cat, themeData]) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                      style={{
                        backgroundColor:
                          category === cat
                            ? `${themeData.accent}10`
                            : "transparent",
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: themeData.gradient }}
                      />
                      <span className="font-medium text-gray-900">
                        {themeData.name}
                      </span>
                      {category === cat && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-2 h-2 rounded-full"
                          style={{ background: themeData.accent }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Click outside to close */}
          {isOpen && (
            <div
              className="fixed inset-0 -z-10"
              onClick={() => setIsOpen(false)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
