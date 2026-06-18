"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { PERSONAL_INFO, openEmail, WHATSAPP_URL } from "@/lib/constants";
import { Mail, MessageCircle, Linkedin, Github, Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      className="p-2 rounded-md hover:bg-[var(--bg-surface)] transition-colors absolute top-4 right-4 z-20 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      title="Copy to clipboard"
    >
      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
    </button>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 min-h-screen flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-4xl mx-auto mb-16">
          <GlowCard className="p-8 md:p-12 text-center bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)]">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-mono font-bold text-green-400 uppercase tracking-wider">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-space text-[var(--text-primary)] mb-4">
              Available for hackathons, collaborations, internships & full-time roles
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[var(--text-secondary)] font-mono text-sm mt-8">
              <span className="flex items-center gap-2">📍 {PERSONAL_INFO.location}</span>
              <span className="flex items-center gap-2">⚡ Usually responds within 24 hours</span>
            </div>
          </GlowCard>
        </div>

        <SectionHeader 
          label="// 06 · CONTACT"
          title={["Let's build", "something remarkable."]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <GlowCard 
            className="p-8 cursor-pointer group block"
            onClick={openEmail}
          >
            <CopyButton text={PERSONAL_INFO.email} />
            <motion.div
              className="w-12 h-12 rounded-2xl bg-[var(--accent-1-10)] border border-[var(--border-subtle)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent-1-20)] transition-colors duration-300"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
            >
              <Mail size={22} className="text-[var(--accent-1)]" />
            </motion.div>
            <h3 className="text-xl font-space font-bold text-[var(--text-primary)] mb-2">Email Me</h3>
            <p className="font-mono text-[var(--text-secondary)] mb-6">{PERSONAL_INFO.email}</p>
            <div className="text-sm font-space font-bold text-[var(--accent-1)] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Opens Gmail <ArrowRight size={14} />
            </div>
          </GlowCard>

          <GlowCard 
            as="a"
            href={WHATSAPP_URL}
            target="_blank"
            className="p-8 cursor-pointer group block"
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-[var(--accent-success)]/10 border border-[var(--border-subtle)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent-success)]/20 transition-colors duration-300"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
            >
              <MessageCircle size={22} className="text-[var(--accent-success)]" />
            </motion.div>
            <h3 className="text-xl font-space font-bold text-[var(--text-primary)] mb-2">WhatsApp</h3>
            <p className="font-mono text-[var(--text-secondary)] mb-6">{PERSONAL_INFO.phone}</p>
            <div className="text-sm font-space font-bold text-green-400 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Chat directly <ArrowRight size={14} />
            </div>
          </GlowCard>

          <GlowCard 
            as="a"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            className="p-8 cursor-pointer group block"
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-[var(--border-subtle)] flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-300"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
            >
              <Linkedin size={22} className="text-blue-500" />
            </motion.div>
            <h3 className="text-xl font-space font-bold text-[var(--text-primary)] mb-2">LinkedIn</h3>
            <p className="font-mono text-[var(--text-secondary)] mb-6">shivam-tonpe</p>
            <div className="text-sm font-space font-bold text-blue-400 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              Connect <ArrowRight size={14} />
            </div>
          </GlowCard>

          <GlowCard 
            as="a"
            href={PERSONAL_INFO.github}
            target="_blank"
            className="p-8 cursor-pointer group block"
          >
            <motion.div
              className="w-12 h-12 rounded-2xl bg-[var(--accent-2-10)] border border-[var(--border-subtle)] flex items-center justify-center mb-4 group-hover:bg-[var(--accent-2-20)] transition-colors duration-300"
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
            >
              <Github size={22} className="text-[var(--accent-2)]" />
            </motion.div>
            <h3 className="text-xl font-space font-bold text-[var(--text-primary)] mb-2">GitHub</h3>
            <p className="font-mono text-[var(--text-secondary)] mb-6">shivam77kk</p>
            <div className="text-sm font-space font-bold text-[var(--accent-2)] group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
              See my code <ArrowRight size={14} />
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
