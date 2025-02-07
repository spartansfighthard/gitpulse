if (!process.env.NEXT_PUBLIC_TREASURY_ADDRESS) {
  throw new Error('NEXT_PUBLIC_TREASURY_ADDRESS is not set in environment variables');
}

export const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS;

export const PLANS = {
  BASE: {
    name: 'Base',
    price: 0.1,
    interval: 'month',
    features: [
      'Monitor up to 5 repositories',
      'Basic GitHub analytics',
      'Email notifications'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 0.25,
    interval: 'month', 
    features: [
      'Unlimited repositories',
      'Advanced analytics',
      'Discord + Telegram notifications',
      'Priority support'
    ]
  }
} as const;

export type PlanType = keyof typeof PLANS; 