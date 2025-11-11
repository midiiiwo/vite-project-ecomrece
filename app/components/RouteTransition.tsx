import { motion, AnimatePresence } from "framer-motion";
import { useApplyTheme } from "../hooks/useApplyTheme";
import type { ReactNode } from "react";

interface RouteTransitionProps {
  children: ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const { theme } = useApplyTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.45,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        {/* Expanding overlay transition effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.4,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          style={{
            background: theme.gradient,
            transformOrigin: "top",
          }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
