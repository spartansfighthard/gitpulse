import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { merchantWallet } from '../config/solana';

export async function createSubscription({
  wallet,
  planType,
  amount,
  signature,
  network
}: {
  wallet: string;
  planType: 'BASIC' | 'PRO';
  amount: number;
  signature: string;
  network: string;
}) {
  try {
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');
    const tx = await connection.getTransaction(signature, {
      commitment: 'confirmed',
    });

    if (!tx) {
      console.error('Transaction not found:', signature);
      throw new Error('Transaction not found');
    }

    // Log transaction details for debugging
    console.log('Transaction details:', {
      sender: tx.transaction.message.accountKeys[0].toString(),
      recipient: tx.transaction.message.accountKeys[1].toString(),
      expectedSender: wallet,
      expectedRecipient: merchantWallet.toString(),
      preBalances: tx.meta?.preBalances,
      postBalances: tx.meta?.postBalances,
    });

    // Verify the transaction details
    if (!tx.meta || 
        tx.meta.err || 
        tx.transaction.message.accountKeys[0].toString() !== wallet ||
        tx.transaction.message.accountKeys[1].toString() !== merchantWallet.toString()) {
      throw new Error('Transaction verification failed: Invalid transaction details');
    }

    // Verify the amount
    const postBalances = tx.meta.postBalances;
    const preBalances = tx.meta.preBalances;
    const transferAmount = (preBalances[0] - postBalances[0]) / LAMPORTS_PER_SOL;
    
    if (Math.abs(transferAmount - amount) > 0.000001) { // Account for potential rounding
      console.error('Amount mismatch:', { transferAmount, expectedAmount: amount });
      throw new Error('Transaction verification failed: Amount mismatch');
    }

    // Set wallet address cookie first
    if (typeof window !== 'undefined') {
      document.cookie = `wallet_address=${wallet}; path=/; SameSite=Lax`;
    }

    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet,
        planType,
        amount,
        signature,
        network
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create subscription');
    }

    const data = await response.json();
    
    if (data.subscription && typeof window !== 'undefined') {
      const subscriptionData = {
        status: 'active',
        planType: data.subscription.planType,
        endDate: data.subscription.endDate,
        daysRemaining: 30,
        signature,
        wallet,
        amount
      };
      localStorage.setItem('subscription', JSON.stringify(subscriptionData));
      document.cookie = `subscription=${JSON.stringify(subscriptionData)}; path=/; SameSite=Lax`;
    }

    return data.subscription;
  } catch (error) {
    console.error('Subscription creation error:', error);
    throw error;
  }
}

export async function checkSubscriptionStatus(wallet: string) {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/subscriptions?wallet=${wallet}`, {
    credentials: 'include'
  });

  if (!response.ok) {
    return 'none';
  }

  const data = await response.json();
  return data?.subscription?.status === 'active' ? 'active' : 'none';
} 