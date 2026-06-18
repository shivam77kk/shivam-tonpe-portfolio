"use client";

import { useTheme } from "@/components/layout/ThemeProvider";
import { THEMES, ThemeId } from "@/lib/themes";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2 p-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--card-border)] backdrop-blur-md shadow-lg shadow-[var(--card-glow)]">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id as ThemeId)}
          className="relative w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{ backgroundColor: t.color }}
          title={t.name}
          aria-label={`Switch to ${t.name} theme`}
        >
          {theme === t.id && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-full border-2 border-white scale-110"
              initial={false}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
