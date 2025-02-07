'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

// Dynamically import the WalletMultiButton with ssr disabled
const WalletMultiButton = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export function WalletButton() {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [hasPhantom, setHasPhantom] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check if Phantom is installed
    if (typeof window !== 'undefined') {
      setHasPhantom('solana' in window);
    }
  }, []);

  if (!mounted) return null;

  const handleInstallPhantom = () => {
    window.open('https://phantom.app/', '_blank');
  };

  if (!hasPhantom) {
    return (
      <Button 
        onClick={handleInstallPhantom}
        variant="outline"
      >
        Install Phantom Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <p className="text-sm">
          Connected: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </p>
      )}
      <WalletMultiButton className="!bg-primary hover:!bg-primary/90" />
    </div>
  );
} 