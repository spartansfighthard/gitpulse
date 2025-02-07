'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { createPaymentRequest, confirmPayment } from './solana-pay';
import { createSubscription } from '@/lib/utils/subscription';

export async function createCheckoutSession({
  wallet,
  planType
}: {
  wallet: string;
  planType: 'BASIC' | 'PRO'
}) {
  if (!wallet) {
    redirect(`/subscribe?plan=${planType}`);
  }

  const { url, reference } = await createPaymentRequest(planType);
  
  // Store the payment reference for later verification
  await prisma.pendingPayment.create({
    data: {
      reference,
      walletAddress: wallet,
      planType,
      status: 'pending'
    }
  });

  return url;
}

export async function verifyPayment(reference: string, wallet: string) {
  const isConfirmed = await confirmPayment(reference);
  
  if (isConfirmed) {
    const pendingPayment = await prisma.pendingPayment.findUnique({
      where: { reference }
    });

    if (pendingPayment && pendingPayment.walletAddress === wallet) {
      await createSubscription({
        wallet,
        planType: pendingPayment.planType as 'BASIC' | 'PRO',
        amount: pendingPayment.amount,
        signature: reference,
        network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
      });

      await prisma.pendingPayment.delete({
        where: { reference }
      });
    }
  }
  
  return isConfirmed;
} 