import { WalletProvider } from '@/components/providers/WalletProvider';

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletProvider>
      {children}
    </WalletProvider>
  );
}