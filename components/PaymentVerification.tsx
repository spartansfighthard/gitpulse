'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { confirmPayment } from '@/lib/payments/solana-pay';
import { useToast } from '@/components/ui/use-toast';

export function PaymentVerification() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkPayment = async () => {
      const pendingPayment = sessionStorage.getItem('pendingPayment');
      if (!pendingPayment) return;

      const payment = JSON.parse(pendingPayment);
      
      try {
        const isConfirmed = await confirmPayment(payment.reference);
        if (isConfirmed) {
          toast({
            title: "Payment confirmed!",
            description: `Your ${payment.planType} subscription is now active`,
          });
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Payment verification failed:', error);
      } finally {
        sessionStorage.removeItem('pendingPayment');
      }
    };

    const interval = setInterval(checkPayment, 1000);
    return () => clearInterval(interval);
  }, [router, toast]);

  return null;
} 