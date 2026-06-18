export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  updatedAt: string;
  openGraphImageUrl: string;
  object?: { text: string } | null;
}

export interface ContributionDay {
  contributionCount: number;
  date: string;
  color: string;
}

export interface GitHubData {
  repos: GitHubRepo[];
  calendar: {
    totalContributions: number;
    weeks: { contributionDays: ContributionDay[] }[];
  };
  stats: {
    totalCommits: number;
    totalPRs: number;
    totalRepos: number;
    followers: number;
  };
}

export const FALLBACK_PROJECTS: GitHubRepo[] = [
  {
    id: "fallback-1",
    name: "Sensei-Ultra",
    description: "Adaptive Campus Automation Platform",
    url: "https://github.com/shivam77kk",
    homepageUrl: null,
    stargazerCount: 5,
    forkCount: 2,
    primaryLanguage: { name: "TypeScript", color: "#3178c6" },
    repositoryTopics: { nodes: [{ topic: { name: "nextjs" } }, { topic: { name: "langgraph" } }] },
    updatedAt: new Date().toISOString(),
    openGraphImageUrl: "",
  },
  {
    id: "fallback-2",
    name: "Edu-Ultra",
    description: "AI Learning Hub from YouTube",
    url: "https://github.com/shivam77kk",
    homepageUrl: null,
    stargazerCount: 3,
    forkCount: 1,
    primaryLanguage: { name: "JavaScript", color: "#f1e05a" },
    repositoryTopics: { nodes: [{ topic: { name: "react" } }, { topic: { name: "gemini" } }] },
    updatedAt: new Date().toISOString(),
    openGraphImageUrl: "",
  }
];
