import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { metadata } from './metadata';
import { PaymentVerification } from '@/components/PaymentVerification';
import { Toaster } from 'sonner';
import { QueryProvider } from './providers/QueryProvider';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable}>
        <QueryProvider>
          <Providers>
            {children}
          </Providers>
        </QueryProvider>
        <PaymentVerification />
        <Toaster />
      </body>
    </html>
  );
} 