"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import dynamic from "next/dynamic";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const DNAHelix = dynamic(() => import("@/components/three/DNAHelix").then(m => m.DNAHelix), { ssr: false });

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-12">
            <SectionHeader 
              label="// 01 · ABOUT ME"
              title={["I build systems", "that think."]}
              subtitle="Aspiring Full Stack Developer from Thane, Maharashtra — currently pursuing BCA at Sahyog College of IT and Management (KKSU University). I architect AI-powered platforms that solve real problems in Indian education, environment, and career development."
            />

            <div className="space-y-4">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                My stack of choice: MERN + LangGraph.js multi-agent workflows + Google Gemini API. I don't just integrate AI — I build agents that reason, plan, and act.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-[var(--card-border)]">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-full bg-[var(--bg-elevated)] text-[var(--accent-1)]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-space font-bold text-[var(--text-primary)]">BCA (Pursuing)</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Sahyog College, KKSU University · 2023–Present</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-full bg-[var(--bg-elevated)] text-[var(--accent-2)]">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-space font-bold text-[var(--text-primary)]">Higher Secondary</h4>
                  <p className="text-sm text-[var(--text-secondary)]">Gyanodaya Vidya Mandir</p>
                </div>
              </div>
            </div>

            <GlowCard className="p-4 inline-flex items-center gap-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border-yellow-500/20">
              <div className="p-2 rounded-full bg-yellow-500/20 text-yellow-400">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-space font-bold text-yellow-400">2nd Prize Winner</h4>
                <p className="text-sm text-yellow-400/80">Invento Competition, Sahyog College</p>
              </div>
            </GlowCard>
          </div>

          <div className="relative h-full min-h-[500px]">
            <DNAHelix />
            
            <div className="absolute inset-x-0 bottom-0 lg:-bottom-12 grid grid-cols-2 gap-4 z-10 pointer-events-auto">
              <GlowCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-space font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent-1)] to-[var(--accent-glow)] mb-2">
                  <AnimatedCounter value={3} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">Major Projects</div>
              </GlowCard>
              
              <GlowCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-space font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent-2)] to-blue-400 mb-2">
                  <AnimatedCounter value={5} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">AI Agents Built</div>
              </GlowCard>
              
              <GlowCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-space font-black text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-500 mb-2">
                  <AnimatedCounter value={10} suffix="+" />
                </div>
                <div className="text-xs md:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">APIs Integrated</div>
              </GlowCard>
              
              <GlowCard className="p-6 text-center">
                <div className="text-4xl md:text-5xl font-space font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-amber-500 mb-2">
                  <AnimatedCounter value={1} />
                </div>
                <div className="text-xs md:text-sm font-mono text-[var(--text-secondary)] uppercase tracking-wider">Award Won</div>
              </GlowCard>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
