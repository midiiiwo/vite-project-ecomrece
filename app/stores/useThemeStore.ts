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
  primary: string;
  secondary: string;
  accent: string;
  foreground: string;
  gradient: string;
};

export const categoryThemes: Record<Category, ThemeColors> = {
  fashion: {
    name: "Fashion",
    primary: "#1E40AF",
    secondary: "#000000",
    accent: "#916a0aff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #916a0aff 0%, #DAA520 100%)",
  },
  electronics: {
    name: "Electronics",
    primary: "#0F62FE",
    secondary: "#000000",
    accent: "#aab602ff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #aab602ff 0%, #589960ff 100%)",
  },
  children: {
    name: "Children's Wear",
    primary: "#DAA520",
    secondary: "#3B82F6",
    accent: "#fa60e0ff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #fa60e0ff 0%, #93C5FD 100%)",
  },
  accessories: {
    name: "Accessories",
    primary: "#1E293B",
    secondary: "#B8860B",
    accent: "#a87c0bff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #a87c0bff 0%, #f8901aff 100%)",
  },
  footwear: {
    name: "Footwear",
    primary: "#000000",
    secondary: "#1E40AF",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #023275ff 100%)",
  },
  sprays: {
    name: "Fragrances",
    primary: "#3B82F6",
    secondary: "#000000",
    accent: "#b80b0bff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #b80b0bff 0%, #FFD700 100%)",
  },
  smartwatches: {
    name: "Smart Watches",
    primary: "#0F172A",
    secondary: "#3B82F6",
    accent: "#0F62FE",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #0F62FE 0%, #0f0f0fff 100%)",
  },
  ipods: {
    name: "Audio Devices",
    primary: "#374151",
    secondary: "#FFFFFF",
    accent: "#909192ff",
    foreground: "#0B0B0B",
    gradient: "linear-gradient(135deg, #909192ff 0%, #60A5FA 100%)",
  },
  electrical: {
    name: "Electrical",
    primary: "#B8860B",
    secondary: "#000000",
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