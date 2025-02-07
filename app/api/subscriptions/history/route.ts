import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { subscriptions } from '@/lib/db/schema/subscription';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const transactions = await db.query.subscriptions.findMany({
      where: eq(subscriptions.userId, userId),
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.createdAt)],
    });

    return NextResponse.json(transactions);
  } catch (error: any) {
    console.error('Failed to fetch transaction history:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 