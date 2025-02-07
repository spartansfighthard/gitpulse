'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function WalletAuthGuard({ children }: { children: React.ReactNode }) {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected || !publicKey) {
      // Clear wallet cookie and redirect
      Cookies.remove('wallet_address');
      router.push('/');
      return;
    }

    // Set wallet cookie
    Cookies.set('wallet_address', publicKey.toString());
  }, [connected, publicKey, router]);

  if (!connected || !publicKey) {
    return null;
  }

  return <>{children}</>;
} 