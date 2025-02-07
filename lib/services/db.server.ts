import { db } from '@/lib/db';
import { subscriptions } from '@/lib/db/schema/subscription';
import { eq, and, gte } from 'drizzle-orm';

export const dbService = {
  async getSubscription(wallet: string) {
    const now = new Date();
    return await db.query.subscriptions.findFirst({
      where: and(
        eq(subscriptions.wallet, wallet),
        eq(subscriptions.status, 'active'),
        gte(subscriptions.endDate, now)
      ),
      orderBy: (subscriptions, { desc }) => [desc(subscriptions.endDate)]
    });
  },

  async createSubscription(data: {
    wallet: string;
    planType: 'BASIC' | 'PRO';
    signature: string;
    network: string;
    amount: number;
  }) {
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    return await db.insert(subscriptions).values({
      wallet: data.wallet,
      planType: data.planType,
      status: 'active',
      startDate,
      endDate,
      signature: data.signature,
      network: data.network,
      amount: data.amount.toString(),
    }).returning();
  }
}; 