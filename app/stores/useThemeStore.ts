import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category =
  | "fashion"
  | "electronics"
  | "children"
  | "accessories"
  | "footwear"
  | "sprays"
  | "smartwatches"
  | "ipods"
  | "electrical";

export type ThemeColors = {
  name: string;
  accent: string;
  foreground: string;
  gradient: string;
};

export const categoryThemes: Record<Category, ThemeColors> = {
  fashion: {
    name: "Fashion (Clothes)",
    accent: "#B8860B", // Golden Brown
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
  },
  electronics: {
    name: "Electronics",
    accent: "#0F62FE", // Brand Blue
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
  },
  children: {
    name: "Children's Wear",
    accent: "#60A5FA", // Lighter Blue
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)",
  },
  accessories: {
    name: "Accessories",
    accent: "#B8860B", // Golden Brown
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #B8860B 0%, #D4A017 100%)",
  },
  footwear: {
    name: "Footwear",
    accent: "#0F62FE", // Brand Blue
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #0047AB 100%)",
  },
  sprays: {
    name: "Fragrances",
    accent: "#B8860B",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #B8860B 0%, #FFD700 100%)",
  },
  smartwatches: {
    name: "Smart Watches",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #1E40AF 100%)",
  },
  ipods: {
    name: "Audio Devices",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #60A5FA 100%)",
  },
  electrical: {
    name: "Electrical Gadgets",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #3B82F6 100%)",
  },
};

interface ThemeState {
  category: Category;
  setCategory: (c: Category) => void;
  previewCategory: Category | null;
  setPreviewCategory: (c: Category | null) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      category: "fashion",
      setCategory: (c) => set({ category: c }),
      previewCategory: null,
      setPreviewCategory: (c) => set({ previewCategory: c }),
    }),
    {
      name: "theme-storage",
    }
  )
);
