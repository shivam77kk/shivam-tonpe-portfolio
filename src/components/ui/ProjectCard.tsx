'use client';
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, ExternalLink, GitBranch, Star } from "lucide-react";
import { GitHubRepo } from "@/lib/github";
import { GlowCard } from "@/components/ui/GlowCard";

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds/60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds/3600)}h ago`;
  return `${Math.floor(seconds/86400)}d ago`;
}

export function ProjectCard({ repo, featured }: { repo: GitHubRepo, featured?: boolean }) {
  const hasLiveLink = repo.homepageUrl && repo.homepageUrl.trim() !== '' && repo.homepageUrl.startsWith('http');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt Logic
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <GlowCard 
        variant={featured ? "featured" : "glass"} 
        className="flex flex-col h-full group"
      >
        {/* Top Gradient Bar on Hover */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20" />
        
        <div className={`relative overflow-hidden bg-[var(--bg-elevated)] border-b border-white/5 ${featured ? 'h-64' : 'h-48'}`}>
          {repo.openGraphImageUrl ? (
            <img src={repo.openGraphImageUrl} alt={repo.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)] flex items-center justify-center relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  background: `conic-gradient(from 0deg, ${repo.primaryLanguage?.color || 'var(--accent-1)'}, transparent, ${repo.primaryLanguage?.color || 'var(--accent-1)'})`,
                  animation: 'spin 8s linear infinite'
                }}
              />
              <div className="absolute inset-1 bg-[var(--bg-elevated)] rounded flex items-center justify-center">
                <Github size={48} className="text-[var(--text-ghost)]" />
              </div>
            </div>
          )}
          
          {repo.primaryLanguage && (
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[var(--bg-surface)]/80 backdrop-blur-md text-[var(--text-primary)] border border-white/10 flex items-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform group-hover:y-[-2px]">
              <span className="w-2.5 h-2.5 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
              {repo.primaryLanguage.name}
            </div>
          )}
          
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--accent-1-20)] border border-[var(--accent-1)] text-[var(--accent-1)] font-mono text-nano tracking-widest uppercase rounded-full backdrop-blur-md">
              Featured
            </div>
          )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col relative z-10" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-heading font-space font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-2)] transition-colors">{repo.name}</h3>
          <p className="text-[var(--text-secondary)] line-clamp-2 mb-6 flex-1 text-sm">{repo.description}</p>
          
          {repo.repositoryTopics?.nodes?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {repo.repositoryTopics.nodes.slice(0, 4).map(node => (
                <span key={node.topic.name} className="px-2.5 py-1 rounded text-micro font-mono bg-white/[0.03] border border-white/5 text-[var(--text-secondary)] group-hover:bg-[var(--accent-1-10)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--accent-1-20)] transition-all">
                  #{node.topic.name}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-4 text-nano font-mono text-[var(--text-tertiary)] mb-6 uppercase tracking-wide">
            <span className="flex items-center gap-1.5"><Star size={14} className="text-[var(--accent-warm)]" /> {repo.stargazerCount}</span>
            <span className="flex items-center gap-1.5"><GitBranch size={14} /> {repo.forkCount}</span>
            <span>{timeAgo(repo.updatedAt)}</span>
          </div>
          
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.04]">
            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-white/[0.02] hover:bg-white/[0.06] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-space text-sm transition-colors border border-white/[0.05]">
              <Github size={16} /> Source
            </a>
            {hasLiveLink && (
              <a href={repo.homepageUrl!} target="_blank" rel="noopener noreferrer" className="relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 rounded bg-[var(--accent-1-10)] border border-[var(--accent-1-30)] text-[var(--accent-1)] hover:text-white font-space text-sm transition-all hover:bg-[var(--accent-1)] group/btn">
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_60%)] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-success)] animate-pulse shadow-[0_0_8px_var(--accent-success)]" />
                Live Demo 
                <ExternalLink size={14} className="transition-transform group-hover/btn:rotate-45" />
              </a>
            )}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
