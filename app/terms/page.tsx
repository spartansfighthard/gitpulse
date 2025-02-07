'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Service Usage</h2>
            <p className="text-muted-foreground mb-4">
              By using GitPulse, you agree to use the service responsibly and in accordance with these terms. The service is provided as-is, without any warranties or guarantees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Privacy and Data</h2>
            <p className="text-muted-foreground mb-4">
              GitPulse is designed to be privacy-focused and stateless. We do not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Collect or store personal information</li>
              <li>Track user activity</li>
              <li>Use cookies or tracking mechanisms</li>
              <li>Share any data with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. GitHub Integration</h2>
            <p className="text-muted-foreground mb-4">
              When using GitHub integration features:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>You must comply with GitHub's terms of service</li>
              <li>You are responsible for managing your GitHub access tokens</li>
              <li>You understand that all API calls are made directly from your browser</li>
              <li>You acknowledge that no data is stored on our servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Open Source</h2>
            <p className="text-muted-foreground mb-4">
              GitPulse is open-source software provided under the MIT license. You are free to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Use the software for any purpose</li>
              <li>Study how the program works and modify it</li>
              <li>Redistribute copies</li>
              <li>Distribute modified versions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
            <p className="text-muted-foreground mb-4">
              The software is provided "as is", without warranty of any kind. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the software.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-muted-foreground">
              These terms may be updated as the service evolves. Significant changes will be announced through the project's GitHub repository.
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