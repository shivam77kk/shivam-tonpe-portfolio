"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function MagneticButton({ children, className, onClick, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle = "relative px-8 py-4 rounded-full font-space font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white shadow-lg shadow-[var(--accent-glow)]/20 hover:shadow-[var(--accent-glow)]/40",
    secondary: "bg-transparent border border-[var(--card-border)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] hover:border-[var(--accent-1)]"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyle} ${variants[variant]} ${className || ''}`}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      )}
    </motion.button>
  );
}
