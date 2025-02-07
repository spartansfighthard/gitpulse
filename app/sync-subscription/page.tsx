'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SyncSubscriptionPage() {
  const router = useRouter();

  useEffect(() => {
    const subscription = localStorage.getItem('subscription');
    
    if (subscription) {
      try {
        const subData = JSON.parse(subscription);
        const now = new Date();
        const endDate = new Date(subData.endDate);
        
        if (subData.status === 'active' && now < endDate) {
          // Restore cookies
          document.cookie = `subscription=${subscription}; path=/`;
          document.cookie = `wallet_address=${subData.wallet}; path=/`;
          router.push('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Error syncing subscription:', error);
      }
    }
    
    // If no valid subscription found in localStorage, redirect to subscribe
    router.push('/subscribe');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Syncing subscription...</h1>
        <p className="text-gray-600">Please wait while we restore your session.</p>
      </div>
    </div>
  );
} 