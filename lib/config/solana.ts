import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Network configuration
export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';

// Connection
export const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet')
);

// Merchant wallet - using a valid default devnet address
export const merchantWallet = new PublicKey(
  process.env.NEXT_PUBLIC_MERCHANT_WALLET || '5Qk8LXQmAhmURfrg3hdDW41W7AFHpupAZEt3Kh8Kazy9'
);

// Subscription tiers with duration
export const SUBSCRIPTION_TIERS = {
  BASIC: {
    name: 'Basic',
    amount: NETWORK === 'mainnet-beta' ? 0.1 : 0.01,
    duration: 30,
    description: 'Perfect for small teams',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      'Standard support'
    ]
  },
  PRO: {
    name: 'Pro',
    amount: NETWORK === 'mainnet-beta' ? 0.25 : 0.025,
    duration: 30,
    description: 'For growing teams',
    features: [
      'Unlimited team members',
      'Advanced analytics',
      'Priority support',
      'Custom features'
    ]
  }
};