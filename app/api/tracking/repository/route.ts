import { NextResponse } from 'next/server';
import { setupGitHubWebhook } from '@/lib/github';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { repoUrl } = await req.json();

  try {
    // Setup GitHub webhook
    const webhookId = await setupGitHubWebhook(repoUrl);

    // Store in database
    await prisma.trackedRepository.create({
      data: {
        repoUrl,
        webhookId,
      }
    });

    return new NextResponse('Repository added successfully');
  } catch (error) {
    console.error('Failed to add repository:', error);
    return new NextResponse('Failed to add repository', { status: 500 });
  }
} 