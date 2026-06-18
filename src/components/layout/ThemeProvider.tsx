"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeId, THEMES } from "@/lib/themes";

type ThemeContextType = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('neural-void');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as ThemeId;
    if (savedTheme && THEMES.some(t => t.id === savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'neural-void');
    }
  }, []);

  const setTheme = (newTheme: ThemeId) => {
    document.documentElement.style.transition = 'background-color 500ms, color 500ms';
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
