"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--card-border)] bg-[var(--bg-elevated)] overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-space font-black text-2xl tracking-tighter text-[var(--text-primary)] mb-2">
              SHIVAM TONPE
            </h2>
            <p className="font-mono text-sm text-[var(--text-secondary)]">
              Building AI systems in Thane, India.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent-2)] transition-colors">
              <Github size={20} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[var(--text-secondary)] hover:text-[var(--accent-1)] transition-colors">
              <Mail size={20} />
            </a>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Shivam Tonpe. All rights reserved.
          </p>
          <p className="font-mono text-xs text-[var(--text-muted)]">
            Designed & Built with <span className="text-[var(--accent-1)]">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
