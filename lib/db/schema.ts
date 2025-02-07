// Remove these fields from the teams table:
stripeCustomerId: text('stripe_customer_id').unique(),
stripeSubscriptionId: text('stripe_subscription_id'),
stripeProductId: text('stripe_product_id'),

// Add these fields instead:
solanaWalletAddress: text('solana_wallet_address'),
subscriptionTier: text('subscription_tier'), // 'BASE' or 'PRO'
subscriptionEndsAt: timestamp('subscription_ends_at'),

// Add to teams table
pendingPaymentRef: text('pending_payment_ref'),
pendingPlanType: text('pending_plan_type'), 