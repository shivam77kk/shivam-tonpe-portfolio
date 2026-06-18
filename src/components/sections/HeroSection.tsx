"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/MagneticButton";

const NeuralBackground = dynamic(() => import("@/components/three/NeuralBackground").then(m => m.NeuralBackground), { ssr: false });
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ChevronDown, Download } from "lucide-react";

export function HeroSection() {
  const [roleText, setRoleText] = useState("Full Stack Developer");
  
  useEffect(() => {
    const roles = [
      'Full Stack Developer',
      'AI Workflow Architect', 
      'LangGraph.js Engineer',
      'MERN Stack Builder',
      'Hackathon Champion'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      setRoleText(roles[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <NeuralBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--card-border)] mb-8 shadow-lg shadow-[var(--card-glow)]/20"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Available for Opportunities
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[var(--font-hero)] font-space font-black leading-none tracking-tighter text-[var(--text-primary)] mb-6"
          >
            SHIVAM TONPE
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="h-12 mb-6"
          >
            <p className="text-xl md:text-3xl font-mono text-[var(--accent-2)]">
              <ScrambleText text={roleText} />
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mb-12 leading-relaxed"
          >
            Building AI-powered platforms that solve real Indian problems.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <MagneticButton variant="primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work <ChevronDown size={16} />
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => window.open('/assets/resume.pdf', '_blank')}>
              Download Resume <Download size={16} />
            </MagneticButton>
          </motion.div>

        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-[var(--text-muted)]"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
