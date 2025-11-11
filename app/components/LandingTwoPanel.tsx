import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useThemeStore } from "../stores/useThemeStore";

export function LandingTwoPanel() {
  const navigate = useNavigate();
  const { setCategory, setPreviewCategory } = useThemeStore();
  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(
    null
  );
  const [touchedPanel, setTouchedPanel] = useState<"left" | "right" | null>(
    null
  );

  const handlePanelHover = (panel: "left" | "right" | null) => {
    setHoveredPanel(panel);
    if (panel === "left") {
      setPreviewCategory("fashion");
    } else if (panel === "right") {
      setPreviewCategory("electronics");
    } else {
      setPreviewCategory(null);
    }
  };

  const handlePanelTouch = (panel: "left" | "right") => {
    if (touchedPanel === panel) {
      // Second tap - navigate
      handleNavigate(panel);
    } else {
      // First tap - preview
      setTouchedPanel(panel);
      handlePanelHover(panel);
    }
  };

  const handleNavigate = (panel: "left" | "right") => {
    const category = panel === "left" ? "fashion" : "electronics";
    setCategory(category);
    setPreviewCategory(null);
    navigate(`/shop?category=${category}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, panel: "left" | "right") => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNavigate(panel);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col md:block">
      <style>{`
        @media (min-width: 768px) {
          .diagonal-left-panel {
            clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%) !important;
          }
          .diagonal-right-panel {
            clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%) !important;
          }
        }
      `}</style>

      {/* Left Panel - Fashion/Clothes */}
      <motion.div
        className="relative md:absolute md:inset-0 cursor-pointer w-full h-1/2 md:h-full diagonal-left-panel"
        onMouseEnter={() => handlePanelHover("left")}
        onMouseLeave={() => handlePanelHover(null)}
        onClick={() => handleNavigate("left")}
        onTouchStart={() => handlePanelTouch("left")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, "left")}
        aria-label="Shop Fashion & Clothes"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
            opacity:
              hoveredPanel === "left" || touchedPanel === "left" ? 1 : 0.85,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-4 text-center">
              Clothes
            </h2>
            <p className="text-2xl md:text-3xl text-center text-white/90 mb-8">
              Men & Ladies
            </p>
          </motion.div>

          {/* Decorative Image/Illustration */}
          <AnimatePresence>
            {(hoveredPanel === "left" || touchedPanel === "left") && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="mb-8"
              >
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <ShoppingBagIcon className="w-32 h-32 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shop Now CTA */}
          <AnimatePresence>
            {(hoveredPanel === "left" || touchedPanel === "left") && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
                className="px-12 py-6 bg-white text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("left");
                }}
              >
                Shop Now
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Diagonal Edge Highlight */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1 bg-white/20"
          style={{ transform: "skewY(0deg)" }}
        />
      </motion.div>

      {/* Right Panel - Electronics/Others */}
      <motion.div
        className="relative md:absolute md:inset-0 cursor-pointer w-full h-1/2 md:h-full diagonal-right-panel"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        onMouseEnter={() => handlePanelHover("right")}
        onMouseLeave={() => handlePanelHover(null)}
        onClick={() => handleNavigate("right")}
        onTouchStart={() => handlePanelTouch("right")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e, "right")}
        aria-label="Shop Electronics & Others"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
            opacity:
              hoveredPanel === "right" || touchedPanel === "right" ? 1 : 0.85,
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-4 text-center">
              Others
            </h2>
            <p className="text-2xl md:text-3xl text-center text-white/90 mb-8">
              Electronics, Accessories & More
            </p>
          </motion.div>

          {/* Decorative Image/Illustration */}
          <AnimatePresence>
            {(hoveredPanel === "right" || touchedPanel === "right") && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.45 }}
                className="mb-8"
              >
                <div className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-32 h-32"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                    />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shop Now CTA */}
          <AnimatePresence>
            {(hoveredPanel === "right" || touchedPanel === "right") && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
                className="px-12 py-6 bg-white text-black font-bold text-xl rounded-full shadow-2xl hover:shadow-white/50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate("right");
                }}
              >
                Shop Now
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
