"use client";

import { useState, useEffect } from 'react';
import { GitHubData } from '@/lib/github';

export function useGitHubRepos() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error('Failed to fetch github data');
        const json = await res.json();
        
        if (json.error) throw new Error(json.error);
        
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
