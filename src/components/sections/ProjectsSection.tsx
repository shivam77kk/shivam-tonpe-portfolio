"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowCard } from "@/components/ui/GlowCard";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { FALLBACK_PROJECTS, GitHubRepo } from "@/lib/github";
import { Github, ExternalLink, GitBranch, Star } from "lucide-react";
import { motion } from "framer-motion";

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds/60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds/3600)}h ago`;
  return `${Math.floor(seconds/86400)}d ago`;
}

function ProjectCard({ repo, featured }: { repo: GitHubRepo, featured?: boolean }) {
  const hasLiveLink = repo.homepageUrl && repo.homepageUrl.trim() !== '' && repo.homepageUrl.startsWith('http');
  
  return (
    <GlowCard className={`flex flex-col h-full ${featured ? 'md:col-span-2' : ''}`} data-github-card>
      <div className="h-48 relative overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--card-border)] group">
        {repo.openGraphImageUrl ? (
          <img src={repo.openGraphImageUrl} alt={repo.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)] flex items-center justify-center">
            <Github size={48} className="text-[var(--text-muted)] opacity-20" />
          </div>
        )}
        {repo.primaryLanguage && (
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
            {repo.primaryLanguage.name}
          </div>
        )}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-space font-bold text-[var(--text-primary)] mb-2">{repo.name}</h3>
        <p className="text-[var(--text-secondary)] line-clamp-2 mb-4 flex-1">{repo.description}</p>
        
        {repo.repositoryTopics?.nodes?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {repo.repositoryTopics.nodes.slice(0, 4).map(node => (
              <span key={node.topic.name} className="px-2 py-1 rounded text-xs font-mono bg-[var(--bg-surface)] text-[var(--accent-1)]">
                #{node.topic.name}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-muted)] mb-6">
          <span className="flex items-center gap-1"><Star size={14} /> {repo.stargazerCount}</span>
          <span className="flex items-center gap-1"><GitBranch size={14} /> {repo.forkCount}</span>
          <span>Updated {timeAgo(repo.updatedAt)}</span>
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] font-space text-sm transition-colors border border-[var(--card-border)]">
            <Github size={14} /> Source
          </a>
          {hasLiveLink && (
            <a href={repo.homepageUrl!} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded bg-gradient-to-r from-[var(--accent-1)] to-[var(--accent-2)] text-white font-space text-sm transition-opacity hover:opacity-90" title="View deployed application">
              <ExternalLink size={14} /> Live Demo 🚀
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}

export function ProjectsSection() {
  const { data, loading, error } = useGitHubRepos();
  const repos = data?.repos || FALLBACK_PROJECTS;

  return (
    <section id="projects" className="relative py-24 min-h-screen">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <SectionHeader 
            label="// 03 · PROJECTS"
            title={["Code that", "shipped."]}
          />
          
          {data?.stats && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--card-border)]"
            >
              <div className="text-center px-4 border-r border-[var(--card-border)]">
                <div className="text-xl font-space font-bold text-[var(--text-primary)]">{data.stats.totalRepos}</div>
                <div className="text-xs font-mono text-[var(--text-secondary)]">REPOS</div>
              </div>
              <div className="text-center px-4 border-r border-[var(--card-border)]">
                <div className="text-xl font-space font-bold text-[var(--accent-1)]">{data.stats.totalCommits}</div>
                <div className="text-xs font-mono text-[var(--text-secondary)]">COMMITS</div>
              </div>
              <div className="text-center px-4">
                <div className="text-xl font-space font-bold text-[var(--accent-2)]">{data.stats.followers}</div>
                <div className="text-xs font-mono text-[var(--text-secondary)]">FOLLOWERS</div>
              </div>
            </motion.div>
          )}
        </div>

        {error && (
          <div className="p-4 mb-8 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-sm">
            Warning: Failed to fetch live GitHub data. Showing cached projects.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-96 rounded-2xl bg-[var(--bg-elevated)] animate-pulse border border-[var(--card-border)] ${i === 0 ? 'md:col-span-2' : ''}`} />
            ))
          ) : (
            repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} featured={i === 0} />
            ))
          )}
        </div>

        {data?.calendar && (
          <div className="mt-24">
            <p className="font-mono text-xs md:text-sm text-[var(--accent-2)] mb-8 tracking-widest uppercase">// CONTRIBUTION ACTIVITY</p>
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--card-border)] overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {data.calendar.weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.contributionDays.map((day, di) => {
                      const count = day.contributionCount;
                      let opacity = '0.1';
                      let bg = 'var(--bg-surface)';
                      if (count > 0) {
                        bg = 'var(--accent-1)';
                        if (count < 4) opacity = '0.3';
                        else if (count < 8) opacity = '0.6';
                        else opacity = '1';
                      }
                      
                      return (
                        <div 
                          key={di} 
                          className="w-3 h-3 rounded-sm transition-opacity hover:opacity-100"
                          style={{ backgroundColor: bg, opacity }}
                          title={`${count} commits on ${day.date}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
