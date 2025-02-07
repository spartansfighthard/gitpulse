'use client';

import { useQuery } from '@tanstack/react-query';
import { Connection } from '@solana/web3.js';
import { env } from '@/lib/config/env';

export function useTransactionStatus(signature?: string) {
  const connection = new Connection(env.NEXT_PUBLIC_SOLANA_RPC_URL);

  return useQuery({
    queryKey: ['transaction', signature],
    queryFn: async () => {
      if (!signature) throw new Error('No signature provided');

      const tx = await connection.getTransaction(signature, {
        commitment: 'confirmed',
      });

      if (!tx) return { status: 'pending' };

      return {
        status: 'confirmed',
        timestamp: tx.blockTime ? new Date(tx.blockTime * 1000) : null,
        slot: tx.slot,
        confirmations: tx.confirmations,
        fee: tx.meta?.fee,
      };
    },
    enabled: !!signature,
    refetchInterval: (data) => 
      data?.status === 'confirmed' ? false : 1000, // Poll every second until confirmed
  });
} 