'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Our Privacy Commitment</h2>
            <p className="text-muted-foreground mb-4">
              At GitPulse, we believe in absolute privacy. We do not collect, store, or process any personal information. Our service is designed to be completely stateless and privacy-focused.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How GitPulse Works</h2>
            <p className="text-muted-foreground mb-4">
              Our service:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Operates without user accounts or login requirements</li>
              <li>Does not track or store any user activity</li>
              <li>Uses client-side processing only</li>
              <li>Does not use cookies or tracking mechanisms</li>
              <li>Makes no network requests except those explicitly initiated by you</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. GitHub Integration</h2>
            <p className="text-muted-foreground mb-4">
              When you connect to GitHub:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All GitHub API requests are made directly from your browser</li>
              <li>Access tokens are stored only in your browser's local storage</li>
              <li>No data is transmitted to our servers</li>
              <li>Connection data is cleared when you close your browser</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Technical Implementation</h2>
            <p className="text-muted-foreground mb-4">
              GitPulse is built as a client-side application that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Uses local browser storage only when necessary</li>
              <li>Processes all data locally on your device</li>
              <li>Makes direct API calls to GitHub without intermediary servers</li>
              <li>Maintains zero persistent storage on our end</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              The only third-party service we interact with is GitHub's API, and this is done directly from your browser. We recommend reviewing GitHub's privacy policy as their terms will apply to any data accessed through their API.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground">
              While we don't collect any personal information, if you have questions about our privacy practices, you can reach us at privacy@gitpulse.dev. Your email will not be stored or used for any purpose other than responding to your inquiry.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Last updated: March 14, 2024
          </p>
        </div>
      </div>
    </main>
  );
} 