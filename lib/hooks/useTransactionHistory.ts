'use client';

import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { env } from '@/lib/config/env';

export function useTransactionHistory() {
  const { publicKey } = useWallet();
  const connection = new Connection(env.NEXT_PUBLIC_SOLANA_RPC_URL);

  return useQuery({
    queryKey: ['transactions', publicKey?.toString()],
    queryFn: async () => {
      if (!publicKey) throw new Error('Wallet not connected');

      const response = await fetch(`/api/subscriptions/history?wallet=${publicKey.toString()}`);
      const dbTransactions = await response.json();

      const enrichedTransactions = await Promise.all(
        dbTransactions.map(async (tx: any) => {
          const onChainTx = await connection.getTransaction(tx.signature);
          return {
            ...tx,
            confirmed: !!onChainTx,
            timestamp: onChainTx?.blockTime 
              ? new Date(onChainTx.blockTime * 1000).toISOString()
              : tx.createdAt,
          };
        })
      );

      return enrichedTransactions;
    },
    enabled: !!publicKey,
  });
} 