"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import dynamic from "next/dynamic";
import { skillCategories } from "@/lib/skills";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";

const SkillOrb = dynamic(() => import("@/components/three/SkillOrb").then(m => m.SkillOrb), { ssr: false });

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 min-h-screen flex items-center overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          label="// 02 · SKILLS & ARSENAL"
          title={["Tools of the", "trade."]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] w-full hidden lg:block">
            <SkillOrb />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((category) => {
              const Icon = LucideIcons[category.icon as keyof typeof LucideIcons] as any;
              return (
                <GlowCard 
                  key={category.id} 
                  className="p-6 group transition-all duration-300 hover:scale-[1.02]"
                  style={{ '--card-glow': `${category.color}40`, '--card-border': `${category.color}30` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="p-2.5 rounded-xl border"
                      style={{ 
                        color: category.color, 
                        backgroundColor: `${category.color}15`,
                        borderColor: `${category.color}30`
                      }}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon size={22} />
                    </motion.div>
                    <h3 className="font-space font-bold text-[var(--text-primary)]">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-transparent group-hover:border-[var(--card-border)] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
