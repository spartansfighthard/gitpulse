import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(req: Request) {
  const payload = await req.json();
  const signature = req.headers.get('x-hub-signature-256');

  // Verify webhook signature
  const hmac = createHmac('sha256', process.env.WEBHOOK_SECRET!);
  const calculatedSignature = `sha256=${hmac.update(JSON.stringify(payload)).digest('hex')}`;

  if (signature !== calculatedSignature) {
    return new NextResponse('Invalid signature', { status: 401 });
  }

  // Send to Discord
  await sendDiscordNotification(payload);

  return new NextResponse('OK');
}

async function sendDiscordNotification(payload: any) {
  const webhookUrl = 'USER_DISCORD_WEBHOOK'; // Get from database

  const message = formatGitHubEvent(payload);

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: message,
      username: 'GitPulse',
      avatar_url: 'https://your-avatar-url.png'
    })
  });
} 