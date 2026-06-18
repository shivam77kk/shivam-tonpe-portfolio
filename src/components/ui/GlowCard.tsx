"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  as?: any;
  href?: string;
  target?: string;
  onClick?: () => void;
  gradient?: string;
  [key: string]: any;
}

export function GlowCard({ children, className, as: Component = "div", gradient, ...props }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowStyle = isHovered ? {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--card-glow), transparent 40%)`
  } : {};

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={twMerge(
        "relative rounded-2xl bg-[var(--bg-elevated)] border border-[var(--card-border)] overflow-hidden transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none"
        style={{ ...glowStyle, opacity: isHovered ? 1 : 0 }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
