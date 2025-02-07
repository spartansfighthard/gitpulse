'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWallet } from '@solana/wallet-adapter-react';
import { useSolanaPayment } from '@/lib/hooks/useSolanaPayment';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { WalletButton } from '@/components/WalletButton';
import { SUBSCRIPTION_TIERS } from '@/lib/config/solana';
import { useEffect } from 'react';
import { subscriptionService } from '@/lib/services/subscription';

// Dynamically import WalletMultiButton
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function SubscribePage() {
  const { connected } = useWallet();
  const { pay, isPending, isSuccess } = useSolanaPayment();
  const { toast } = useToast();
  const router = useRouter();

  // Check existing subscription on mount
  useEffect(() => {
    const subscription = localStorage.getItem('subscription');
    if (subscription) {
      try {
        const subData = JSON.parse(subscription);
        const now = new Date();
        const endDate = new Date(subData.endDate);
        
        if (subData.status === 'active' && now < endDate) {
          // Set cookie for middleware
          document.cookie = `subscription=${subscription}; path=/`;
          document.cookie = `wallet_address=${subData.wallet}; path=/`;
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    }
  }, [router]);

  const handleSubscribe = async (amount: number, planType: 'BASIC' | 'PRO') => {
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to subscribe",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Processing payment",
        description: "Please approve the transaction in your wallet",
      });

      const result = await pay(amount, planType);
      
      if (result.success) {
        // Set cookies for middleware
        document.cookie = `subscription=${JSON.stringify(result.subscription)}; path=/`;
        document.cookie = `wallet_address=${result.subscription.wallet}; path=/`;

        toast({
          title: "Payment successful!",
          description: `Your ${planType} subscription is now active`,
        });
        
        // Navigate to dashboard
        router.push('/dashboard');
      }

    } catch (error: any) {
      console.error('Subscribe error:', error);
      
      let errorMessage = "Please try again";
      if (error.message.includes("Insufficient balance")) {
        errorMessage = "Insufficient funds in your wallet";
      } else if (error.message.includes("User rejected")) {
        errorMessage = "Transaction was rejected";
      }

      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  // Add success state UI
  if (isSuccess) {
    // Set a small timeout to ensure localStorage is updated
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
    
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1120] text-white">
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="mb-8">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0B1120]">
      {/* Navigation */}
      <header className="fixed top-0 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center relative">
              <Activity className="h-5 w-5 text-primary pulse-animation" />
              <div className="absolute inset-0 bg-primary/20 rounded-lg animate-ping opacity-75"></div>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tighter gradient-text">
              GitPulse
            </Link>
          </div>
          
          {/* Add WalletMultiButton here */}
          <WalletMultiButton />
        </nav>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center mt-16">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
            <p className="text-gray-400 text-lg">Get started with GitPulse today</p>
          </div>

          {!connected ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Connect Your Wallet</h2>
              <p className="mb-4 text-gray-600">
                To subscribe, you'll need to connect a Solana wallet like Phantom
              </p>
              <WalletButton />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(SUBSCRIPTION_TIERS).map(([key, plan]) => (
                <Card key={key} className="p-8 bg-[#0F172A] border-gray-800 rounded-lg flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-white">{plan.amount}</span>
                    <span className="text-gray-400 ml-2">SOL/{plan.interval}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-[#00FFA3] mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                    size="lg"
                    onClick={() => handleSubscribe(plan.amount, key as 'BASIC' | 'PRO')}
                    disabled={isPending}
                  >
                    {isPending ? 'Processing...' : `Get Started with ${plan.name}`}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}