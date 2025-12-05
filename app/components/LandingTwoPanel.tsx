import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useThemeStore } from "../stores/useThemeStore";

export function LandingTwoPanel() {
  const navigate = useNavigate();
  const { setCategory, setPreviewCategory } = useThemeStore();

  const handleShopNow = () => {
    setCategory("fashion");
    setPreviewCategory(null);
    navigate("/shop");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* BRAND NAME TOP RIGHT */}
      <div className="fixed top-4 right-6 z-50">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-lg">
          Luxeshop
        </h1>
      </div>

      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/landing-page.jpg')",
        }}
      />

      {/* Dark Overlay for Elegance */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-8 md:py-12">
        
        {/* Middle Section - Shopping Bag & Button */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Shopping Bag Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 md:mb-12"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
              <ShoppingBagIcon className="w-28 h-28 md:w-32 md:h-32 text-white drop-shadow-lg" />
            </div>
          </motion.div>

          {/* Shop Now Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.08, y: -4, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)" }}
            onClick={handleShopNow}
            className="px-12 md:px-16 py-4 md:py-5 bg-white text-black font-bold text-lg md:text-xl rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl"
          >
            Shop Now
          </motion.button>
        </div>

        {/* Bottom Section - Catchy Phrase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full px-6 pb-12 md:pb-16 text-center"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg leading-tight max-w-4xl mx-auto">
            Looking for new clothes, accessories and more?
          </h2>
          <p className="text-lg md:text-2xl text-white/90 drop-shadow-md mt-4">
            For Men & Women - Discover your style today
          </p>
        </motion.div>
      </div>
    </div>
  );
}