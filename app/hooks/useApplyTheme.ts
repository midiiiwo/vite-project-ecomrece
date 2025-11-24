import { useEffect } from "react";
import { useThemeStore, categoryThemes } from "../stores/useThemeStore";

export function useApplyTheme() {
  const category = useThemeStore((state) => state.category);
  const previewCategory = useThemeStore((state) => state.previewCategory);

  const activeCategory = previewCategory || category;
  const theme = categoryThemes[activeCategory];

  useEffect(() => {
    const root = document.documentElement;

    // smooth & stable theme updates (good for large desktop sections)
    const frame = requestAnimationFrame(() => {
      root.style.setProperty("--theme-accent", theme.accent);
      root.style.setProperty("--theme-foreground", theme.foreground);
      root.style.setProperty("--theme-gradient", theme.gradient);
    });

    return () => cancelAnimationFrame(frame);
  }, [theme]);

  return { theme, category: activeCategory };
}