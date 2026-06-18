'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ElementType } from 'react';

type CardVariant = 'glass' | 'solid' | 'outline' | 'ghost' | 'featured';

interface GlowCardProps {
  variant?: CardVariant;
  glow?: boolean;          // Shows accent glow on hover
  glowColor?: string;      // Override glow color
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: ElementType;
  href?: string;
  target?: string;
  [key: string]: any;
}

const variantStyles: Record<CardVariant, string> = {
  // PRIMARY: Glassmorphism — frosted panel over dark bg
  glass: `
    bg-bg-surface/60
    backdrop-blur-[20px] backdrop-saturate-150
    border border-white/[0.06]
    shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]
  `,
  // SECONDARY: Solid elevated surface
  solid: `
    bg-bg-elevated
    border border-[var(--border-subtle)]
    shadow-[0_1px_3px_rgba(0,0,0,0.4),0_4px_16px_rgba(0,0,0,0.3)]
  `,
  // TERTIARY: Barely-there outline
  outline: `
    bg-transparent
    border border-[var(--border-subtle)]
  `,
  // GHOST: Invisible until hover
  ghost: `
    bg-transparent
    border border-transparent
    hover:bg-bg-surface/40
    hover:border-[var(--border-subtle)]
  `,
  // FEATURED: The hero card — more drama
  featured: `
    bg-gradient-to-br from-bg-surface/80 to-bg-elevated/80
    backdrop-blur-[24px]
    border border-[var(--border-mid)]
    shadow-[0_4px_24px_rgba(0,0,0,0.5),0_0_0_1px_var(--border-mid),inset_0_1px_0_rgba(255,255,255,0.08)]
  `,
};

export function GlowCard({
  variant = 'glass',
  glow = true,
  glowColor,
  children,
  className,
  onClick,
  as: Tag = 'div',
  href,
  ...props
}: GlowCardProps) {
  const resolvedGlowColor = glowColor ?? 'rgba(124, 111, 255, 0.2)';

  const Component = motion.create(Tag as any);

  return (
    <Component
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        variantStyles[variant],
        className
      )}
      whileHover={glow ? {
        scale: 1.015,
        y: -4,
        boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px var(--border-mid), 0 0 60px ${resolvedGlowColor}`,
        borderColor: 'var(--border-mid)',
        transition: { type: 'spring', stiffness: 400, damping: 28 }
      } : {}}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      href={href}
      {...props}
    >
      {/* Top-edge light line — premium feel */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 50%, transparent)' }}
      />

      {/* Hover glow overlay — appears on hover via CSS */}
      {glow && (
        <div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${resolvedGlowColor} 0%, transparent 70%)` }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </Component>
  );
}
