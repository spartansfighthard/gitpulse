import { db } from './index';
import { subscriptions } from './schema/subscription';
import { nanoid } from 'nanoid';

async function seed() {
  const now = new Date();
  const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await db.insert(subscriptions).values({
    id: nanoid(),
    wallet: '5Qk8LXQmAhmURfrg3hdDW41W7AFHpupAZEt3Kazy9',
    planType: 'BASIC',
    status: 'active',
    startDate: now.getTime(),
    endDate: endDate.getTime(),
    signature: 'test_signature',
    network: 'devnet',
    amount: '0.1',
  });

  console.log('Seed data inserted successfully');
}

seed().catch(console.error); 