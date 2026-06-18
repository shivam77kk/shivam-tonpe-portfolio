"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Code2, Rocket, Award, Star } from "lucide-react";

export function TimelineSection() {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: "#timeline-wrapper",
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      }
    );
  }, []);

  const entries = [
    {
      period: "JULY 2026",
      title: "Sensei Ultra",
      status: "BUILDING",
      statusColor: "text-green-500",
      icon: Code2,
      role: "Full Stack AI Developer",
      tags: ["LangGraph.js", "Next.js 15", "Gemini", "MongoDB", "Socket.io", "Flutter"],
      desc: "Adaptive campus automation platform for Indian universities"
    },
    {
      period: "2025",
      title: "Edu-Ultra",
      status: "SHIPPED",
      statusColor: "text-[var(--accent-1)]",
      icon: Rocket,
      role: "Full Stack Developer",
      tags: ["Gemini API", "LangGraph.js", "React", "Node.js", "YouTube API"],
      desc: "AI learning hub — YouTube → study packs in 30 seconds"
    },
    {
      period: "2024",
      title: "Trivo (Jhaad-Lagao-Bidhu)",
      status: "SHIPPED (Hackathon)",
      statusColor: "text-[var(--accent-2)]",
      icon: Star,
      role: "Full Stack Developer",
      tags: ["Groq", "OpenWeather", "Three.js", "Express", "Gemini"],
      desc: "Climate-based AI plant recommendation for reforestation"
    },
    {
      period: "2024",
      title: "Invento Competition",
      status: "2ND PRIZE",
      statusColor: "text-yellow-400",
      icon: Award,
      role: "Participant — Sahyog College",
      tags: ["Award", "Competition"],
      desc: "Won 2nd Prize at Sahyog College's Invento tech competition"
    }
  ];

  return (
    <section id="timeline" className="relative py-24 min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader 
          label="// 05 · TIMELINE"
          title={["The journey", "so far."]}
        />

        <div id="timeline-wrapper" className="relative max-w-4xl mx-auto py-12">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--card-border)] -translate-x-1/2">
            <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from-[var(--accent-1)] via-[var(--accent-2)] to-transparent w-full" />
          </div>

          <div className="space-y-12 md:space-y-24">
            {entries.map((entry, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''} group`}>
                  <motion.div 
                    className={`absolute left-6 md:left-1/2 w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border-2 border-transparent flex items-center justify-center -translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 transition-colors duration-500 ${entry.statusColor}`}
                    style={{ borderColor: 'currentColor' }}
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                  >
                    <entry.icon size={18} />
                  </motion.div>
                  
                  <div className="hidden md:block w-1/2" />

                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <GlowCard className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                        <span className="font-mono text-sm text-[var(--text-secondary)]">{entry.period}</span>
                        <span className={`font-mono text-xs font-bold uppercase tracking-wider ${entry.status.includes('BUILDING') ? 'animate-pulse' : ''} ${entry.statusColor}`}>
                          {entry.status}
                        </span>
                      </div>
                      <h3 className="text-2xl font-space font-bold text-[var(--text-primary)] mb-2">{entry.title}</h3>
                      <p className="text-sm font-space text-[var(--text-secondary)] mb-4">{entry.role}</p>
                      
                      <p className="text-[var(--text-primary)] mb-6">{entry.desc}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--card-border)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
