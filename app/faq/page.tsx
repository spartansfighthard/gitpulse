'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-16 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">What is GitPulse?</h2>
            <p className="text-muted-foreground">
              GitPulse is an open-source GitHub analytics and monitoring tool that helps you track repository activity and engagement metrics in real-time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Is GitPulse free to use?</h2>
            <p className="text-muted-foreground">
              Yes, GitPulse is completely free and open-source. You can use it, modify it, and contribute to its development.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How does GitPulse handle my data?</h2>
            <p className="text-muted-foreground">
              GitPulse is designed to be privacy-focused and stateless. We don't store any of your data - all processing happens client-side in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Can I contribute to GitPulse?</h2>
            <p className="text-muted-foreground">
              Absolutely! GitPulse is open-source and we welcome contributions. Visit our GitHub repository to get started.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">How do I report issues?</h2>
            <p className="text-muted-foreground">
              You can report issues directly on our GitHub repository or contact us through our support page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 