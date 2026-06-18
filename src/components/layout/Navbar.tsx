"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const { scrollY } = useScroll();
  
  // Floating island scroll effects
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(12px)", "blur(24px)"]);
  const y = useTransform(scrollY, [0, 100], [24, 16]);

  const links = [
    { name: "About", id: "about", href: "#about" },
    { name: "Projects", id: "projects", href: "#projects" },
    { name: "Case Studies", id: "case-studies", href: "#case-studies" },
    { name: "Timeline", id: "timeline", href: "#timeline" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(l => document.getElementById(l.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 24, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ scale, y, backdropFilter: backdropBlur }}
      className="fixed left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-[var(--bg-surface)]/70 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] hidden md:flex items-center gap-2 max-w-3xl"
    >
      <a href="#" className="font-space font-bold text-lg text-gradient px-4 group">
        ST<span className="opacity-0 group-hover:opacity-100 transition-opacity">.</span>
      </a>

      <div className="flex items-center px-4 gap-6">
        {links.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a 
              key={link.name}
              href={link.href}
              className={`relative text-sm font-space py-2 transition-colors ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="active-nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent-1)] shadow-[0_0_8px_var(--accent-1-65)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>

      <MagneticButton 
        className="ml-2 px-5 py-2 rounded-full bg-[var(--accent-1)] text-white text-sm font-medium hover:bg-[var(--accent-glow)] transition-colors"
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Hire Me
      </MagneticButton>
    </motion.nav>
  );
}
