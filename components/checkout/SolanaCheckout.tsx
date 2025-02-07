import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function SolanaCheckout({ amount, onSuccess }: { 
  amount: number;
  onSuccess: () => void;
}) {
  const { publicKey, sendTransaction } = useWallet();
  
  const handlePayment = async () => {
    if (!publicKey) return;
    
    const paymentUrl = await createPaymentSession({
      team: currentTeam,
      amount,
      reference: generateUniqueRef(),
    });

    // Handle payment confirmation
    const result = await handleSolanaPayment(paymentUrl);
    if (result.success) {
      onSuccess();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton />
      {publicKey && (
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
        >
          Pay {amount} SOL
        </button>
      )}
    </div>
  );
} 