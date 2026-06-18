"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string | string[];
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const titleLines = Array.isArray(title) ? title : [title];

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs md:text-sm text-[var(--accent-2)] mb-4 tracking-widest uppercase"
      >
        {label}
      </motion.p>
      
      <div className="space-y-2">
        {titleLines.map((line, lineIndex) => (
          <div key={lineIndex} className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "100%", opacity: 0, rotateX: -90 }}
              animate={isInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.1 + lineIndex * 0.1 
              }}
              style={{ transformOrigin: "0% 50% -50px" }}
              className="font-space font-bold text-4xl md:text-6xl lg:text-7xl text-[var(--text-primary)] leading-tight tracking-heading"
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
