import { NextResponse } from 'next/server';

const QUERY = `
  query LatestRepos($username: String!) {
    user(login: $username) {
      recentRepositories: repositories(first: 6, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
            updatedAt
            openGraphImageUrl
            object(expression: "HEAD:README.md") {
              ... on Blob { text }
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
              weekday
            }
          }
        }
      }
      repositories(first: 1, privacy: PUBLIC) { totalCount }
      followers { totalCount }
      following { totalCount }
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'User-Agent': 'shivam-portfolio',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: process.env.GITHUB_USERNAME ?? 'shivam77kk' },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const { data, errors } = await res.json();
    if (errors) throw new Error(errors[0].message);

    return NextResponse.json({
      repos: data.user.recentRepositories.nodes,
      calendar: data.user.contributionsCollection.contributionCalendar,
      stats: {
        totalCommits: data.user.contributionsCollection.totalCommitContributions,
        totalPRs: data.user.contributionsCollection.totalPullRequestContributions,
        totalRepos: data.user.repositories.totalCount,
        followers: data.user.followers.totalCount,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'GitHub API failed' }, { status: 500 });
  }
}
