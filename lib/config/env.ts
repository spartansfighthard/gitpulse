export const env = {
  NEXT_PUBLIC_SOLANA_RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'devnet',
  // Add other env vars here
} as const;

// Validate required env vars
Object.entries(env).forEach(([key, value]) => {
  if (!value) throw new Error(`Missing environment variable: ${key}`);
}); 