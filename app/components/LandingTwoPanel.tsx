import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PiShoppingBagFill } from "react-icons/pi";
import { useThemeStore } from "../stores/useThemeStore";
import { MdShoppingCart } from "react-icons/md";

export function LandingTwoPanel() {
  const navigate = useNavigate();
  const { setCategory, setPreviewCategory } = useThemeStore();

  const [hoveredPanel, setHoveredPanel] = useState<"left" | "right" | null>(null);
  const [touchedPanel, setTouchedPanel] = useState<"left" | "right" | null>(null);

  const handlePanelHover = (panel: "left" | "right" | null) => {
    setHoveredPanel(panel);
    setPreviewCategory(panel === "left" ? "fashion" : panel === "right" ? "electronics" : null);
  };

  const handlePanelTouch = (panel: "left" | "right") => {
    if (touchedPanel === panel) handleNavigate(panel);
    else {
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
    <>
      {/* BRAND NAME TOP RIGHT */}
      <div className="fixed top-4 right-6 z-50">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-lg">
          Luxeshop
        </h1>
      </div>
    <div className="relative w-full h-screen overflow-hidden grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">

      {/* Desktop Diagonal Clip Paths */}
      <style>
        {`
          @media (min-width: 1024px) {
            .diagonal-left-panel {
              clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
            }
            .diagonal-right-panel {
              clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
            }
          }
        `}
      </style>

      {/* LEFT PANEL */}
      <motion.div
        className="relative cursor-pointer w-full h-full diagonal-left-panel"
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
        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #ce0c9dff 0%, #e6b105ff 100%)",
            opacity:
              hoveredPanel === "left" || touchedPanel === "left" ? 1 : 0.85,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-3"
          >
            Clothes
          </motion.h2>
          <p className="text-xl md:text-3xl text-white/90 mb-8">
            Men & Ladies
          </p>

          {/* ICON */}
          <AnimatePresence>
            {(hoveredPanel === "left" || touchedPanel === "left") && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45 }}
                className="mb-8"
              >
                <div className="w-56 h-56 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <PiShoppingBagFill className="w-28 h-28 text-violet-800" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA BUTTON */}
          <AnimatePresence>
            {(hoveredPanel === "left" || touchedPanel === "left") && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
                className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full shadow-2xl"
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
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        className="relative cursor-pointer w-full h-full diagonal-right-panel"
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
        {/* Background */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, #f70814ff 0%, #0260f8ff 100%)",
            opacity:
              hoveredPanel === "right" || touchedPanel === "right" ? 1 : 0.85,
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-white text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-3"
          >
            Others
          </motion.h2>
          <p className="text-xl md:text-3xl text-white/90 mb-8">
            Electronics, Accessories & More
          </p>

          {/* ICON */}
          <AnimatePresence>
            {(hoveredPanel === "right" || touchedPanel === "right") && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.45 }}
                className="mb-8"
              >
                <div className="w-56 h-56 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MdShoppingCart className="w-28 h-28 text-pink-600" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA BUTTON */}
          <AnimatePresence>
            {(hoveredPanel === "right" || touchedPanel === "right") && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ duration: 0.3 }}
                className="px-10 py-4 bg-white text-black font-bold text-lg rounded-full shadow-2xl"
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
    </>
  );
}