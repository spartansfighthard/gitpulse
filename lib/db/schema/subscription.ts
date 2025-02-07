import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  wallet: text('wallet').notNull(),
  planType: text('plan_type').notNull(), // 'BASIC' or 'PRO'
  status: text('status').notNull().default('active'),
  startDate: timestamp('start_date').notNull().defaultNow(),
  endDate: timestamp('end_date').notNull(),
  signature: text('signature').notNull().unique(),
  network: text('network').notNull(),
  amount: text('amount').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
}); 