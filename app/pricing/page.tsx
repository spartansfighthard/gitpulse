'use client';

import { Check } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '@/components/WalletButton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useSolanaPayment } from '@/lib/hooks/useSolanaPayment';
import { useToast } from '@/components/ui/use-toast';
import { SUBSCRIPTION_TIERS } from '@/lib/config/solana';

function PricingCard({ name, amount, interval, features, onSubscribe }: {
  name: string;
  amount: number;
  interval: string;
  features: string[];
  onSubscribe: () => void;
}) {
  return (
    <div className="rounded-lg border bg-card p-8">
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-5xl font-bold">{amount}</span>
        <span className="ml-1 text-muted-foreground"> SOL</span>
        <span className="ml-1 text-muted-foreground">/{interval}</span>
      </div>
      <ul className="mt-6 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <Check className="h-5 w-5 text-primary mr-2" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button 
        className="w-full mt-8"
        onClick={onSubscribe}
      >
        Get Started with {name}
      </Button>
    </div>
  );
}

export default function PricingPage() {
  const { connected } = useWallet();
  const { pay, isPending } = useSolanaPayment();
  const { toast } = useToast();
  const router = useRouter();

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
      const result = await pay(amount, planType);
      // The redirect will happen automatically via useSolanaPayment
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Simple, Transparent Pricing</h1>
        <p className="mt-4 text-lg text-gray-600">Choose the plan that's right for you</p>
      </div>

      {!connected && (
        <div className="text-center mb-8">
          <WalletButton />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {Object.entries(SUBSCRIPTION_TIERS).map(([key, plan]) => (
          <PricingCard
            key={key}
            {...plan}
            onSubscribe={() => handleSubscribe(plan.amount, key as 'BASIC' | 'PRO')}
          />
        ))}
      </div>
    </main>
  );
} 