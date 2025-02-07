import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  planType: text('plan_type'), // 'BASIC' or 'PRO'
  amount: integer('amount'),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  transactionSignature: text('transaction_signature'),
  status: text('status'), // 'active', 'expired', 'cancelled'
}); 