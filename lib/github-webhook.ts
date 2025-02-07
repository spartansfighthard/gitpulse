import { Octokit } from '@octokit/rest';
import { createHmac } from 'crypto';

export async function setupWebhook(repoUrl: string, webhookUrl: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Parse repo URL to get owner and repo name
  const [owner, repo] = repoUrl.split('/').slice(-2);

  // Create webhook
  await octokit.repos.createWebhook({
    owner,
    repo,
    config: {
      url: webhookUrl,
      content_type: 'json',
      secret: process.env.WEBHOOK_SECRET,
    },
    events: ['push', 'pull_request', 'issues', 'star'], // customize events
  });
} 