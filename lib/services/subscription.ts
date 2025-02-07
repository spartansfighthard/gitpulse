import { env } from '@/lib/config/env';
import { Connection } from '@solana/web3.js';
import { createSubscription } from '@/lib/utils/subscription';

export interface Subscription {
  status: 'active' | 'inactive';
  planType: 'BASIC' | 'PRO';
  endDate: string;
  daysRemaining: number;
  signature?: string;
  wallet?: string;
  amount?: number;
}

export const subscriptionService = {
  async save(subscriptionInput: {
    planType: 'BASIC' | 'PRO';
    signature: string;
    wallet: string;
    amount: number;
    network: string;
  }) {
    try {
      // Set cookies with proper attributes
      if (typeof window !== 'undefined') {
        const cookieOptions = 'path=/; SameSite=Lax';
        document.cookie = `wallet_address=${subscriptionInput.wallet}; ${cookieOptions}`;
      }

      // If we're in the browser, use the API route
      if (typeof window !== 'undefined') {
        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscriptionInput),
          credentials: 'include'
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Failed to save subscription');
        }
        
        const data = await response.json();
        
        if (data.subscription) {
          const subscriptionData = {
            status: 'active',
            planType: data.subscription.planType,
            endDate: data.subscription.endDate,
            daysRemaining: 30,
            signature: subscriptionInput.signature,
            wallet: subscriptionInput.wallet,
            amount: subscriptionInput.amount
          };
          
          localStorage.setItem('subscription', JSON.stringify(subscriptionData));
          document.cookie = `subscription=${JSON.stringify(subscriptionData)}; path=/; SameSite=Lax`;
        }
        
        return data;
      }
      
      // If we're on the server, create subscription directly
      const subscription = await createSubscription(subscriptionInput);
      return { 
        subscription: {
          status: 'active',
          planType: subscription.planType,
          endDate: subscription.endDate.toISOString(),
          daysRemaining: 30,
          signature: subscription.transactionSignature,
          wallet: subscription.walletAddress,
          amount: subscription.amount
        }
      };
      
    } catch (error) {
      console.error('Save subscription error:', error);
      throw error;
    }
  },

  async getActive(wallet: string): Promise<Subscription | null> {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/subscriptions?wallet=${wallet}`);
      const data = await response.json();
      
      if (!data || !data.subscription) {
        const stored = localStorage.getItem('subscription');
        if (!stored) return null;
        return JSON.parse(stored);
      }
      
      const now = new Date().getTime();
      const subscription = {
        status: 'active',
        planType: data.subscription.planType,
        endDate: new Date(data.subscription.endDate).toISOString(),
        daysRemaining: Math.ceil((new Date(data.subscription.endDate).getTime() - now) / (1000 * 60 * 60 * 24)),
        signature: data.subscription.signature,
        wallet: data.subscription.wallet,
        amount: parseFloat(data.subscription.amount)
      };

      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('subscription', JSON.stringify(subscription));
      }
      
      return subscription;
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  },

  async verifyTransaction(signature: string, wallet: string, amount: number) {
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');
    try {
      const tx = await connection.getTransaction(signature, {
        commitment: 'confirmed',
      });
      
      if (!tx?.meta) return false;
      
      const transferAmount = (tx.meta.preBalances[0] - tx.meta.postBalances[0]) / LAMPORTS_PER_SOL;
      return !tx.meta.err && 
             tx.transaction.message.accountKeys[0].toString() === wallet &&
             Math.abs(transferAmount - amount) < 0.000001;
    } catch (error) {
      console.error('Transaction verification failed:', error);
      return false;
    }
  },

  get: async (wallet?: string) => {
    if (wallet) {
      return subscriptionService.getActive(wallet);
    }
    
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem('subscription');
    if (!stored) return null;

    const subscription = JSON.parse(stored);
    const endDate = new Date(subscription.endDate);
    const now = new Date();
    const days = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      ...subscription,
      status: days > 0 ? 'active' : 'inactive',
      daysRemaining: Math.max(0, days)
    };
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('subscription');
    }
  }
}; 