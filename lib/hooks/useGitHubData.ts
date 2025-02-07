import { useState, useEffect } from 'react';

interface GitHubData {
  activeRepos: number;
  contributors: number;
  totalStars: number;
  commitsToday: number;
  loading: boolean;
  error: string | null;
}

export function useGitHubData() {
  const [data, setData] = useState<GitHubData>({
    activeRepos: 0,
    contributors: 0,
    totalStars: 0,
    commitsToday: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    async function fetchData() {
      try {
        // TODO: Replace with actual GitHub API call
        // Temporary mock data
        setData({
          activeRepos: 5,
          contributors: 12,
          totalStars: 128,
          commitsToday: 34,
          loading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch GitHub data'
        }));
      }
    }

    fetchData();
  }, []);

  return data;
} 