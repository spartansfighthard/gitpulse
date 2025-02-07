'use client';

import Link from 'next/link';
import { ArrowLeft, Github, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SupportPage() {
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
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Support</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              We're here to help you get the most out of GitPulse. Here are the ways you can get support:
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border bg-card">
                <Github className="h-6 w-6 mb-4" />
                <h3 className="text-lg font-medium mb-2">GitHub Issues</h3>
                <p className="text-muted-foreground mb-4">
                  Report bugs or request features through our GitHub repository.
                </p>
                <Link href="https://github.com/yourusername/gitpulse/issues" target="_blank">
                  <Button variant="outline" className="w-full">Visit GitHub</Button>
                </Link>
              </div>

              <div className="p-6 rounded-lg border bg-card">
                <MessageSquare className="h-6 w-6 mb-4" />
                <h3 className="text-lg font-medium mb-2">Discord Community</h3>
                <p className="text-muted-foreground mb-4">
                  Join our Discord community for real-time support and discussions.
                </p>
                <Link href="https://discord.gg/gitpulse" target="_blank">
                  <Button variant="outline" className="w-full">Join Discord</Button>
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Documentation</h2>
            <p className="text-muted-foreground mb-4">
              Check out our comprehensive documentation for guides and tutorials:
            </p>
            <Link href="/docs">
              <Button>View Documentation</Button>
            </Link>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-4">
              Find quick answers to common questions in our FAQ section:
            </p>
            <Link href="/faq">
              <Button>View FAQ</Button>
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
} 