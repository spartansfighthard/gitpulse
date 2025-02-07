'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { useState, useCallback } from 'react';
import { NETWORK, merchantWallet } from '../config/solana';
import { subscriptionService } from '../services/subscription';

export function useSolanaPayment() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pay = useCallback(async (amount: number, planType: 'BASIC' | 'PRO') => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsPending(true);
    setIsSuccess(false);

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: merchantWallet,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash('confirmed');
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
        maxRetries: 3,
      });

      await connection.confirmTransaction(signature, 'confirmed');

      // Save subscription data
      const subscription = await subscriptionService.save({
        planType,
        signature,
        wallet: publicKey.toString(),
        amount,
        network: NETWORK,
      });

      setIsSuccess(true);
      
      return { success: true, signature, subscription };

    } catch (error) {
      console.error('Payment error:', error);
      setIsSuccess(false);
      throw error;
    } finally {
      setIsPending(false);
    }
  }, [publicKey, connection, sendTransaction]);

  return { pay, isPending, isSuccess };
}