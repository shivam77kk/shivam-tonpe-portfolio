"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { useGitHubRepos } from "@/hooks/useGitHubRepos";
import { FALLBACK_PROJECTS } from "@/lib/github";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ContributionCalendar } from "@/components/ui/ContributionCalendar";
import { motion } from "framer-motion";

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
              className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
            >
              <div className="text-center px-4 border-r border-[var(--border-subtle)]">
                <div className="text-xl font-space font-bold text-[var(--text-primary)]">{data.stats.totalRepos}</div>
                <div className="text-xs font-mono text-[var(--text-secondary)]">REPOS</div>
              </div>
              <div className="text-center px-4 border-r border-[var(--border-subtle)]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 1000 }}>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`h-96 rounded-2xl bg-[var(--bg-elevated)] animate-pulse border border-[var(--border-subtle)] ${i === 0 ? 'md:col-span-2' : ''}`} />
            ))
          ) : (
            repos.map((repo, i) => (
              <ProjectCard key={repo.id} repo={repo} featured={i === 0} />
            ))
          )}
        </div>

        {data?.calendar && (
          <div className="mt-12">
            <ContributionCalendar 
              weeks={data.calendar.weeks} 
              totalContributions={data.stats?.totalCommits || 0} 
            />
          </div>
        )}
      </div>
    </section>
  );
}
