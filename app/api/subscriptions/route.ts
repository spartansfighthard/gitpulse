import { NextResponse } from 'next/server';
import { createSubscription } from '@/lib/utils/subscription';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const walletAddress = req.cookies.get('wallet_address');
    if (!walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { planType, signature, amount, network } = body;

    const subscription = await createSubscription({
      planType,
      signature,
      wallet: walletAddress.value,
      amount,
      network,
    });

    return NextResponse.json({ subscription });
  } catch (error: any) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.cookies.get('wallet_address');
    if (!walletAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await subscriptionService.getActive(walletAddress.value);
    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
} 