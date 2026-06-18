"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

export function CaseStudyModal({ study, isOpen, onClose }: { study: any, isOpen: boolean, onClose: () => void }) {
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(0);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !study) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: "100vh" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "100vh" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed inset-0 z-[9999] bg-[var(--bg-primary)]/95 backdrop-blur-xl overflow-y-auto"
      >
        <div className="min-h-screen container mx-auto px-6 py-12 md:py-24 max-w-4xl relative">
          <button 
            onClick={onClose}
            className="fixed top-6 right-6 p-4 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:text-[var(--accent-1)] border border-[var(--card-border)] transition-colors z-50"
          >
            <X size={24} />
          </button>

          <div className="space-y-16">
            <div>
              <p className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest mb-4">
                {study.category} · {study.year}
              </p>
              <h1 className={`text-5xl md:text-7xl font-space font-black mb-6 bg-gradient-to-r ${study.gradient} text-transparent bg-clip-text`}>
                {study.title}
              </h1>
              <p className="text-2xl md:text-3xl font-space text-[var(--text-primary)] mb-8">
                {study.tagline}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm font-mono text-[var(--text-secondary)]">
                <span className="px-3 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--card-border)]">Role: {study.role}</span>
                <span className="px-3 py-1 rounded bg-[var(--bg-elevated)] border border-[var(--card-border)]">Duration: {study.duration}</span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">// THE PROBLEM</h2>
              <h3 className="text-2xl md:text-4xl font-space font-bold text-[var(--text-primary)] leading-tight">{study.problem.headline}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{study.problem.body}</p>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">// THE SOLUTION</h2>
              <h3 className="text-2xl md:text-4xl font-space font-bold text-[var(--text-primary)] leading-tight">{study.solution.headline}</h3>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{study.solution.body}</p>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {study.solution.techStack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 rounded-full text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--card-border)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">// CHALLENGES & ARCHITECTURE</h2>
              <div className="space-y-4">
                {study.challenges.map((challenge: string, i: number) => {
                  const isExpanded = expandedChallenge === i;
                  const parts = challenge.split(' — solved ');
                  return (
                    <div key={i} className="rounded-xl border border-[var(--card-border)] bg-[var(--bg-elevated)] overflow-hidden">
                      <button 
                        className="w-full flex items-center justify-between p-6 text-left"
                        onClick={() => setExpandedChallenge(isExpanded ? null : i)}
                      >
                        <span className="font-space font-bold text-[var(--text-primary)] pr-8">{parts[0]}</span>
                        {isExpanded ? <ChevronUp className="shrink-0 text-[var(--accent-1)]" /> : <ChevronDown className="shrink-0 text-[var(--text-muted)]" />}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-6 pb-6"
                          >
                            <div className="pt-4 border-t border-[var(--card-border)] text-[var(--text-secondary)] leading-relaxed">
                              <strong className="text-[var(--accent-2)]">Solution: </strong> {parts[1] || parts[0]}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-mono text-xs text-[var(--accent-2)] uppercase tracking-widest">// MEASURABLE IMPACT</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.impact.map((imp: any, i: number) => (
                  <div key={i} className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--card-border)] flex flex-col justify-center">
                    <div className={`text-5xl md:text-6xl font-space font-black mb-4 bg-gradient-to-br ${study.gradient} text-transparent bg-clip-text`}>
                      {imp.metric}
                    </div>
                    <div className="text-[var(--text-secondary)] font-space">{imp.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-[var(--card-border)] flex flex-col sm:flex-row gap-4">
              <a href={study.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-primary)] font-space font-bold transition-colors border border-[var(--card-border)]">
                <Github size={20} /> View Source Code
              </a>
              {study.liveUrl && (
                <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-gradient-to-r ${study.gradient} text-white font-space font-bold hover:opacity-90 transition-opacity shadow-lg`}>
                  <ExternalLink size={20} /> Visit Live Project
                </a>
              )}
            </div>
            
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
