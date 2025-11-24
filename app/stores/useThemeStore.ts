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
    accent: "#916a0aff", // Golden Brown
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #916a0aff 0%, #DAA520 100%)",
  },
  electronics: {
    name: "Electronics",
    accent: "#aab602ff", // Greenish Yellow
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #aab602ff 0%, #589960ff 100%)",
  },
  children: {
    name: "Children's Wear",
    accent: "#fa60e0ff", // Vibrant Pink
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #fa60e0ff 0%, #93C5FD 100%)",
  },
  accessories: {
    name: "Accessories",
    accent: "#a87c0bff", // Dark Golden
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #a87c0bff 0%, #f8901aff 100%)",
  },
  footwear: {
    name: "Footwear",
    accent: "#0F62FE", // Brand Blue
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #023275ff 100%)",
  },
  sprays: {
    name: "Fragrances",
    accent: "#b80b0bff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #b80b0bff 0%, #FFD700 100%)",
  },
  smartwatches: {
    name: "Smart Watches",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #0f0f0fff 100%)",
  },
  ipods: {
    name: "Audio Devices",
    accent: "#909192ff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #909192ff 0%, #60A5FA 100%)",
  },
  electrical: {
    name: "Electrical Gadgets",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #e6eaf1ff 100%)",
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