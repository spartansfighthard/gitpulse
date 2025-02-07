import { createTransfer, encodeURL, parseURL, TransferRequestURL } from '@solana/pay';
import { PublicKey, Connection, clusterApiUrl, Keypair } from '@solana/web3.js';
import { SUBSCRIPTION_TIERS, merchantWallet, connection } from '../config/solana';
import BigNumber from 'bignumber.js';

export async function createPaymentRequest({
  planType,
  wallet
}: {
  planType: 'BASIC' | 'PRO';
  wallet: string;
}) {
  const plan = SUBSCRIPTION_TIERS[planType];
  const amount = new BigNumber(plan.amount);
  const reference = Keypair.generate().publicKey;
  
  const url = encodeURL({
    recipient: merchantWallet,
    amount,
    reference,
    label: `GitPulse ${plan.name} Subscription`,
    message: `Monthly subscription payment for GitPulse ${plan.name} plan`,
    memo: `sub_${planType.toLowerCase()}_${wallet}`
  });

  return {
    url: url.toString(),
    reference: reference.toString()
  };
}

export async function confirmPayment(reference: string): Promise<boolean> {
  try {
    const ref = new PublicKey(reference);
    const signatures = await connection.getSignaturesForAddress(ref);
    
    if (signatures.length === 0) return false;
    
    // Get the most recent signature
    const signature = signatures[0].signature;
    const tx = await connection.getTransaction(signature, {
      maxSupportedTransactionVersion: 0
    });
    
    return tx !== null;
  } catch (error) {
    console.error('Error confirming payment:', error);
    return false;
  }
} 