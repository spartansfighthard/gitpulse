import { NextResponse } from 'next/server';
import { sendDiscordNotification } from '@/lib/discord-bot';
import { verifyGitHubWebhook } from '@/lib/github';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const payload = await req.json();
  const signature = req.headers.get('x-hub-signature-256');
  
  // Verify GitHub webhook signature
  if (!verifyGitHubWebhook(payload, signature)) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  // Get repository details
  const repoFullName = payload.repository.full_name;
  
  try {
    // Find repository in database
    const trackedRepo = await prisma.trackedRepository.findFirst({
      where: { repoUrl: repoFullName },
      include: { notifications: true }
    });

    if (!trackedRepo?.notifications?.discordWebhook) {
      return new NextResponse('No Discord webhook configured', { status: 400 });
    }

    // Format the message based on the event type
    const message = formatGitHubEvent(payload);
    
    // Send to Discord
    await sendDiscordNotification(
      trackedRepo.notifications.discordWebhook,
      message
    );

    return new NextResponse('OK');
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

function formatGitHubEvent(payload: any) {
  const eventType = payload.action || 'push';
  
  switch (eventType) {
    case 'push':
      return {
        title: '🔨 New Push Event',
        description: `Branch: ${payload.ref}\nCommits: ${payload.commits?.length || 0}`,
        fields: payload.commits?.slice(0, 3).map((commit: any) => ({
          name: 'Commit',
          value: `${commit.message}\nBy: ${commit.author.name}`
        }))
      };
    case 'pull_request':
      return {
        title: '🔄 Pull Request',
        description: payload.pull_request.title,
        fields: [{
          name: 'Status',
          value: payload.action
        }, {
          name: 'Author',
          value: payload.pull_request.user.login
        }]
      };
    // Add more event types as needed
    default:
      return {
        title: '📢 Repository Update',
        description: `New ${eventType} event received`
      };
  }
} 