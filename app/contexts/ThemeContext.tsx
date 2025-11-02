import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type CategoryTheme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
};

export const categoryThemes: Record<string, CategoryTheme> = {
  clothes: {
    name: "Clothes",
    primary: "#1E40AF", // Blue
    secondary: "#000000", // Black
    accent: "#B8860B", // Golden Brown
    gradient: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
  },
  electrical: {
    name: "Electrical Gadgets",
    primary: "#B8860B", // Golden Brown
    secondary: "#000000", // Black
    accent: "#1E40AF", // Blue
    gradient: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
  },
  footwear: {
    name: "Footwear",
    primary: "#000000", // Black
    secondary: "#1E40AF", // Blue
    accent: "#B8860B", // Golden Brown
    gradient: "linear-gradient(135deg, #000000 0%, #374151 100%)",
  },
  sprays: {
    name: "Sprays",
    primary: "#3B82F6", // Light Blue
    secondary: "#000000", // Black
    accent: "#FFFFFF", // White
    gradient: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  },
  children: {
    name: "Children's Wear",
    primary: "#DAA520", // Goldenrod
    secondary: "#3B82F6", // Blue
    accent: "#000000", // Black
    gradient: "linear-gradient(135deg, #DAA520 0%, #F59E0B 100%)",
  },
  accessories: {
    name: "Accessories",
    primary: "#1E293B", // Dark Slate
    secondary: "#B8860B", // Golden Brown
    accent: "#3B82F6", // Blue
    gradient: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
  },
  smartwatches: {
    name: "Smart Watches",
    primary: "#0F172A", // Very Dark Blue
    secondary: "#3B82F6", // Blue
    accent: "#B8860B", // Golden Brown
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
  },
  ipods: {
    name: "iPods",
    primary: "#374151", // Gray
    secondary: "#FFFFFF", // White
    accent: "#1E40AF", // Blue
    gradient: "linear-gradient(135deg, #374151 0%, #4B5563 100%)",
  },
};

type ThemeContextType = {
  activeTheme: CategoryTheme;
  hoveredTheme: CategoryTheme | null;
  setActiveCategory: (category: string) => void;
  setHoveredCategory: (category: string | null) => void;
  currentTheme: CategoryTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategoryState] = useState<string>("clothes");
  const [hoveredCategory, setHoveredCategoryState] = useState<string | null>(
    null
  );

  const activeTheme = categoryThemes[activeCategory];
  const hoveredTheme = hoveredCategory ? categoryThemes[hoveredCategory] : null;
  const currentTheme = hoveredTheme || activeTheme;

  useEffect(() => {
    // Apply theme colors to CSS variables for smooth transitions
    document.documentElement.style.setProperty(
      "--theme-primary",
      currentTheme.primary
    );
    document.documentElement.style.setProperty(
      "--theme-secondary",
      currentTheme.secondary
    );
    document.documentElement.style.setProperty(
      "--theme-accent",
      currentTheme.accent
    );
    document.documentElement.style.setProperty(
      "--theme-gradient",
      currentTheme.gradient
    );
  }, [currentTheme]);

  const setActiveCategory = (category: string) => {
    setActiveCategoryState(category);
  };

  const setHoveredCategory = (category: string | null) => {
    setHoveredCategoryState(category);
  };

  return (
    <ThemeContext.Provider
      value={{
        activeTheme,
        hoveredTheme,
        setActiveCategory,
        setHoveredCategory,
        currentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
