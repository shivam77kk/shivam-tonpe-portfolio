"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing portfolio.config...............OK",
  "Loading neural pathways....................OK",
  "Fetching GitHub repositories...............OK",
  "Compiling Three.js scene...................OK",
  "Activating cursor system...................OK",
  "SHIVAM_TONPE.DEV — SYSTEM ONLINE       ████ 100%"
];

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentLine, setCurrentLine] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const isLoaded = sessionStorage.getItem("shivam_loaded");
    if (isLoaded) {
      setIsVisible(false);
      return;
    }

    if (currentLine < BOOT_LINES.length) {
      const line = BOOT_LINES[currentLine];
      if (charIndex < line.length) {
        const timeout = setTimeout(() => {
          setCharIndex(c => c + 1);
        }, 15);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLine(l => l + 1);
          setCharIndex(0);
        }, 120);
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(() => setShowFlash(true), 100);
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("shivam_loaded", "true");
      }, 500);
    }
  }, [currentLine, charIndex]);

  useEffect(() => {
    const handleSkip = () => {
      if (!isVisible) return;
      setCurrentLine(BOOT_LINES.length);
      setCharIndex(0);
    };

    window.addEventListener("keydown", handleSkip);
    window.addEventListener("click", handleSkip);
    return () => {
      window.removeEventListener("keydown", handleSkip);
      window.removeEventListener("click", handleSkip);
    };
  }, [isVisible]);

  if (!isVisible && !showFlash) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary)] font-mono text-sm text-[var(--accent-1)]"
        >
          <div className="w-full max-w-2xl px-6">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex justify-center"
            >
              <motion.svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  d="M12 24C12 16 18 12 32 12C46 12 52 16 52 24" 
                  stroke="currentColor" strokeWidth="4" strokeLinecap="round" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  d="M12 24C12 32 52 32 52 40C52 48 46 52 32 52C18 52 12 48 12 40" 
                  stroke="currentColor" strokeWidth="4" strokeLinecap="round" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  d="M32 12V52" 
                  stroke="currentColor" strokeWidth="4" strokeLinecap="round" 
                />
              </motion.svg>
            </motion.div>

            <div className="space-y-2 min-h-[160px]">
              {BOOT_LINES.slice(0, currentLine).map((line, i) => (
                <div key={i}>{`> ${line}`}</div>
              ))}
              {currentLine < BOOT_LINES.length && (
                <div>{`> ${BOOT_LINES[currentLine].substring(0, charIndex)}█`}</div>
              )}
            </div>
          </div>

          {showFlash && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-white"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
