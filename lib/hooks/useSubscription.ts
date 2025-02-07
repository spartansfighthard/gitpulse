import { useQuery, useMutation } from '@tanstack/react-query';
import { subscriptionService } from '@/lib/services/subscription';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useSubscription() {
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString();
  const router = useRouter();

  const { data: subscription, isLoading, error, refetch } = useQuery({
    queryKey: ['subscription', walletAddress],
    queryFn: async () => {
      if (!walletAddress) return null;
      return subscriptionService.getActive(walletAddress);
    },
    staleTime: 30000,
    retry: false,
    enabled: !!walletAddress && typeof window !== 'undefined'
  });

  useEffect(() => {
    if (!isLoading && !subscription && router) {
      const currentPath = window.location.pathname;
      if (currentPath !== '/subscribe' && currentPath !== '/pricing' && currentPath !== '/') {
        router.push('/pricing');
      }
    }
  }, [subscription, isLoading, router]);

  const verifySubscription = useMutation({
    mutationFn: async ({ signature, planType, amount }: { signature: string; planType: 'BASIC' | 'PRO'; amount: number }) => {
      if (!walletAddress) throw new Error('Wallet not connected');
      
      try {
        // First verify the transaction
        const isVerified = await subscriptionService.verifyTransaction(signature, walletAddress, amount);
        if (!isVerified) {
          throw new Error('Transaction verification failed');
        }

        // Set wallet address cookie before making the request
        document.cookie = `wallet_address=${walletAddress}; path=/`;

        const data = await subscriptionService.save({
          signature,
          wallet: walletAddress,
          planType,
          amount,
          network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
        });
        
        if (data.subscription) {
          const subscriptionData = {
            status: 'active' as const,
            planType: data.subscription.planType,
            endDate: data.subscription.endDate,
            daysRemaining: 30,
            signature: signature,
            wallet: walletAddress,
            amount: amount
          };

          localStorage.setItem('subscription', JSON.stringify(subscriptionData));
          document.cookie = `subscription=${JSON.stringify(subscriptionData)}; path=/`;
          await refetch();
          return subscriptionData;
        }
        
        throw new Error('Failed to create subscription');
      } catch (error) {
        console.error('Verification error:', error);
        throw error;
      }
    },
  });

  return {
    subscription,
    isLoading,
    error,
    verifySubscription: verifySubscription.mutate,
    refetchSubscription: refetch
  };
} 