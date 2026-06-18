"use client";

import { motion } from "framer-motion";

export function Navbar() {
  const links = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Timeline", href: "#timeline" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.6 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-[var(--bg-elevated)]/80 backdrop-blur-md border border-[var(--card-border)] shadow-lg hidden md:flex items-center gap-6"
    >
      <a href="#" className="font-space font-bold text-[var(--text-primary)] mr-4">ST.</a>
      {links.map((link) => (
        <a 
          key={link.name}
          href={link.href}
          className="text-sm font-space text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors"
        >
          {link.name}
        </a>
      ))}
    </motion.nav>
  );
}
