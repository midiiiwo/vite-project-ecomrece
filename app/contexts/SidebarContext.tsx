import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarExpanded") !== "false";
    }
    return true;
  });

  const toggleSidebar = (value: boolean) => {
    setIsExpanded(value);
    localStorage.setItem("sidebarExpanded", value.toString());
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
}
