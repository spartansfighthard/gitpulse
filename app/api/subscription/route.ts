import { dbService } from '@/lib/services/db.server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  
  if (!wallet) {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
  }

  const subscription = await dbService.getSubscription(wallet);
  return NextResponse.json({ subscription });
}

export async function POST(request: Request) {
  const data = await request.json();
  const subscription = await dbService.createSubscription(data);
  return NextResponse.json({ subscription });
} 