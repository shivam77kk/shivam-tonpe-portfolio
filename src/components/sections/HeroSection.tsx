"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { heroLetterVariants, heroWordVariants } from "@/lib/animations";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { ChevronDown, Download, Terminal, Flame, GitCommit } from "lucide-react";

const NeuralBackground = dynamic(() => import("@/components/three/NeuralBackground").then(m => m.NeuralBackground), { ssr: false });

export function HeroSection() {
  const [roleText, setRoleText] = useState("Full Stack AI Developer");
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  
  useEffect(() => {
    const roles = [
      'Full Stack AI Developer',
      'AI Workflow Architect', 
      'LangGraph.js Engineer',
      'MERN Stack Builder'
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      setRoleText(roles[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const name = "SHIVAM TONPE".split("");

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Layered Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--accent-1-20)] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[var(--accent-2-10)] rounded-full blur-[120px] pointer-events-none z-0" />

      <NeuralBackground />
      
      {/* Decorative Ghost Heading */}
      <div className="ghost-heading hidden md:block">PORTFOLIO</div>

      <div className="container mx-auto px-6 relative z-10 mt-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Enhanced Open-to-Work Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/[0.08] mb-8 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
          >
            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-4 w-4 rounded-full bg-[var(--accent-success)] opacity-20 animate-ping" style={{ animationDuration: '3s' }}></span>
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-[var(--accent-success)] opacity-40 animate-ping" style={{ animationDuration: '1.5s' }}></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent-success)]"></span>
            </div>
            <span className="text-micro font-mono text-[var(--text-primary)] tracking-wide">
              Available for Opportunities
            </span>
            <span className="pl-2 border-l border-white/10 text-micro font-mono text-[var(--text-secondary)]">
              🇮🇳 Thane
            </span>
          </motion.div>

          {/* 3D Letter Flip Hero Name */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            className="text-[var(--text-hero)] font-space font-black leading-[var(--leading-hero)] tracking-[var(--tracking-tightest)] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 mb-4 flex flex-wrap justify-center"
            style={{ perspective: 1000 }}
          >
            {name.map((char, i) => (
              <motion.span 
                key={i} 
                variants={heroLetterVariants}
                custom={i}
                className={char === " " ? "w-[0.2em]" : "inline-block"}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div 
            initial="hidden"
            animate="visible"
            className="h-10 md:h-12 mb-6"
          >
            <motion.p custom={0} variants={heroWordVariants} className="text-heading font-mono text-[var(--accent-2)]">
              <ScrambleText text={roleText} />
            </motion.p>
          </motion.div>

          <motion.p 
            initial="hidden"
            animate="visible"
            custom={1}
            variants={heroWordVariants}
            className="text-subhead text-[var(--text-secondary)] max-w-2xl mb-12 leading-[var(--leading-loose)]"
          >
            Building AI-powered platforms that solve real Indian problems. From <span className="text-white">LangGraph.js</span> agents to immersive <span className="text-[var(--accent-1)]">3D web</span> experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <MagneticButton className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white font-medium border border-white/20 shadow-[0_0_20px_var(--accent-1-30)] hover:shadow-[0_0_30px_var(--accent-1-40)] transition-all overflow-hidden" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_60%)] transition-opacity duration-300 pointer-events-none" />
              <span className="relative flex items-center gap-2">
                View My Work 
                <ChevronDown size={16} className="transition-transform group-hover:translate-y-1" />
              </span>
            </MagneticButton>
            
            <MagneticButton className="group px-6 py-3 rounded-full bg-transparent text-[var(--text-primary)] font-medium border border-[var(--border-mid)] backdrop-blur-md hover:bg-[var(--accent-1-10)] hover:border-[var(--border-strong)] transition-all" onClick={() => window.open('/assets/resume.pdf', '_blank')}>
              <span className="flex items-center gap-2">
                Download Resume <Download size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
              </span>
            </MagneticButton>
          </motion.div>

          {/* GitHub Stats Bar - Glassmorphism Pill */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="hidden md:flex items-center gap-8 px-8 py-4 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-3">
              <Terminal size={18} className="text-[var(--accent-1)]" />
              <div className="text-left">
                <div className="text-xl font-bold font-space leading-none"><AnimatedCounter value={233} />+</div>
                <div className="text-nano font-mono text-[var(--text-tertiary)] uppercase tracking-wide">Commits</div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <Flame size={18} className="text-[var(--accent-warm)]" />
              <div className="text-left">
                <div className="text-xl font-bold font-space leading-none"><AnimatedCounter value={33} /></div>
                <div className="text-nano font-mono text-[var(--text-tertiary)] uppercase tracking-wide">Projects</div>
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <GitCommit size={18} className="text-[var(--accent-2)]" />
              <div className="text-left">
                <div className="text-xl font-bold font-space leading-none"><AnimatedCounter value={100} suffix="%" /></div>
                <div className="text-nano font-mono text-[var(--text-tertiary)] uppercase tracking-wide">Open Source</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-nano font-mono text-[var(--text-tertiary)] tracking-widest uppercase">Scroll to explore</span>
        <div className="flex flex-col items-center text-[var(--text-secondary)] -space-y-3">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          >
            <ChevronDown size={18} className="opacity-50" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
