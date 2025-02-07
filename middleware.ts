import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const subscription = request.cookies.get('subscription');
  const walletAddress = request.cookies.get('wallet_address');

  // Public routes that don't need authentication
  const publicRoutes = ['/', '/pricing', '/subscribe'];
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Check for valid subscription and wallet
  if (!subscription || !walletAddress) {
    return NextResponse.redirect(new URL('/subscribe', request.url));
  }

  try {
    const subData = JSON.parse(subscription.value);
    const now = new Date();
    const endDate = new Date(subData.endDate);

    if (subData.status !== 'active' || now > endDate) {
      return NextResponse.redirect(new URL('/subscribe', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/subscribe', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 