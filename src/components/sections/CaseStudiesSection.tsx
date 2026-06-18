"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyModal } from "@/components/ui/CaseStudyModal";
import { caseStudies } from "@/lib/caseStudies";
import { ArrowRight } from "lucide-react";

export function CaseStudiesSection() {
  const [selectedStudy, setSelectedStudy] = useState<any>(null);

  return (
    <section id="case-studies" className="relative py-24 min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          label="// 04 · CASE STUDIES"
          title={["The thinking behind", "the shipping."]}
          subtitle="Problem → Solution → Impact — how each project was built."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div 
              key={study.id}
              className="group cursor-pointer rounded-2xl bg-[var(--bg-elevated)] border border-[var(--card-border)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--card-glow)]"
              onClick={() => setSelectedStudy(study)}
            >
              <div className={`h-32 bg-gradient-to-br ${study.gradient} p-6 flex flex-col justify-end relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <span className="px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-white text-[10px] font-mono font-bold uppercase tracking-wider mb-2 inline-block">
                    {study.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col h-[calc(100%-8rem)]">
                <h3 className="text-xl font-space font-bold text-[var(--text-primary)] mb-1">{study.title}</h3>
                <p className="text-sm font-space text-[var(--text-secondary)] mb-6">{study.tagline}</p>
                
                <div className="mb-6">
                  <span className="text-[var(--accent-2)] font-mono text-xs uppercase tracking-wider block mb-2">Problem:</span>
                  <p className="text-sm text-[var(--text-primary)] line-clamp-3">{study.problem.headline}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {study.solution.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded-sm text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                      {tech}
                    </span>
                  ))}
                  {study.solution.techStack.length > 3 && (
                    <span className="px-2 py-1 rounded-sm text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                      +{study.solution.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--card-border)] flex items-center justify-between text-[var(--accent-1)] font-mono text-sm group-hover:text-[var(--accent-2)] transition-colors">
                  Read Case Study <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CaseStudyModal 
        study={selectedStudy} 
        isOpen={!!selectedStudy} 
        onClose={() => setSelectedStudy(null)} 
      />
    </section>
  );
}
