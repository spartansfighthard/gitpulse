'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Github, 
  Activity,
  Bot,
  Webhook,
  LineChart,
  Shield,
  Zap,
  Code2,
  GitBranch,
  CheckCircle2,
  Twitter,
  MessageSquare,
  Menu,
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Dynamically import the WalletMultiButton with ssr disabled
const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  const router = useRouter();
  const { connected, publicKey } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasPhantom, setHasPhantom] = useState<boolean | null>(null);

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
    // Check if Phantom is installed
    const checkPhantom = () => {
      if ('solana' in window) {
        setHasPhantom(true);
      } else {
        setHasPhantom(false);
      }
    };
    checkPhantom();
  }, []);

  // Remove the automatic redirect
  useEffect(() => {
    if (connected && publicKey) {
      console.log("Wallet connected:", publicKey.toString());
    }
  }, [connected, publicKey]);

  const handleGetStarted = async () => {
    if (!hasPhantom) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      if (!connected) {
        const walletButton = document.querySelector('.wallet-adapter-button');
        if (walletButton instanceof HTMLElement) {
          walletButton.click();
        }
      } else {
        // If already connected, redirect to pricing page instead
        router.push('/pricing');
      }
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Don't render anything until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl z-50">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center relative">
              <Activity className="h-5 w-5 text-primary pulse-animation" />
              <div className="absolute inset-0 bg-primary/20 rounded-lg animate-ping opacity-75"></div>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tighter gradient-text">
              GitPulse
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/docs" className="nav-link">Documentation</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/support" className="nav-link">Support</Link>
            <div className="flex items-center gap-4 ml-4">
              <Link href="https://github.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="https://discord.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                <MessageSquare className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/subscribe" className="hidden sm:block">
              <Button 
                onClick={handleGetStarted} 
                className="w-full sm:w-auto group relative overflow-hidden bg-primary hover:bg-primary/90"
                disabled={isConnecting}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isConnecting ? 'Connecting...' : 'Start Building'}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-4">
              <Link href="/docs" className="block py-2 nav-link">Documentation</Link>
              <Link href="/faq" className="block py-2 nav-link">FAQ</Link>
              <Link href="/support" className="block py-2 nav-link">Support</Link>
              <div className="flex items-center gap-4 py-2">
                <Link href="https://github.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="https://twitter.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="https://discord.com" target="_blank" className="nav-link hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" className="w-full justify-center">
                    Sign in
                  </Button>
                </Link>
                <Link href="/subscribe">
                  <Button className="w-full justify-center">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 hero-gradient overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-8 md:mb-16">
              <div className="inline-block mb-4 animate-float">
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium tracking-wide border border-primary/20">
                  Powered by Solana
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 tracking-tighter leading-[1.1] gradient-text max-w-4xl mx-auto px-4 sm:px-6">
                Monitor Your GitHub Repositories with Precision
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 tracking-wide leading-relaxed px-4">
                Real-time analytics, instant notifications, and AI-powered insights for your GitHub repositories.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                <Link href="/subscribe" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden bg-primary hover:bg-primary/90">
                    <span className="relative z-10 flex items-center gap-2">
                      Start Building
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <Link href="https://github.com" target="_blank" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto group border-border/50">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </Button>
                </Link>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-20 max-w-4xl mx-auto px-4">
                <StatsCard 
                  value="Any" 
                  label="Repositories"
                />
                <StatsCard 
                  value="99.9%" 
                  label="Uptime"
                />
                <StatsCard 
                  value="Real-time" 
                  label="Updates"
                />
                <StatsCard 
                  value="24/7" 
                  label="Monitoring"
                />
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mt-12 md:mt-20 px-4">
              <FeatureCard
                icon={<Bot className="h-6 w-6 text-primary" />}
                title="AI-Powered Insights"
                description="Get intelligent recommendations and predictions about your repository's health."
              />
              <FeatureCard
                icon={<Webhook className="h-6 w-6 text-secondary" />}
                title="Discord Integration"
                description="Receive real-time notifications through custom Discord webhooks."
              />
              <FeatureCard
                icon={<LineChart className="h-6 w-6 text-primary" />}
                title="Advanced Analytics"
                description="Track engagement metrics, code quality, and contributor activity."
              />
            </div>

            {/* Benefits Section */}
            <div className="mt-16 md:mt-32 px-4">
              <div className="text-center mb-8 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
                  Why Choose GitPulse?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  Built with modern technologies for the modern developer
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                <BenefitCard
                  icon={<Shield className="h-6 w-6 text-primary" />}
                  title="Enterprise Security"
                  description="Bank-grade encryption and secure authentication for your data."
                />
                <BenefitCard
                  icon={<Zap className="h-6 w-6 text-secondary" />}
                  title="Lightning Fast"
                  description="Built on Solana for millisecond updates and real-time monitoring."
                />
                <BenefitCard
                  icon={<Code2 className="h-6 w-6 text-primary" />}
                  title="Developer First"
                  description="Comprehensive API and webhooks for custom integrations."
                />
                <BenefitCard
                  icon={<GitBranch className="h-6 w-6 text-secondary" />}
                  title="Version Control"
                  description="Track changes and monitor branch activity in real-time."
                />
                <BenefitCard
                  icon={<Bot className="h-6 w-6 text-primary" />}
                  title="AI Analytics"
                  description="Smart insights and predictions powered by machine learning."
                />
                <BenefitCard
                  icon={<CheckCircle2 className="h-6 w-6 text-secondary" />}
                  title="Quality Assurance"
                  description="Automated code quality checks and performance monitoring."
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Brand - Full Width on Mobile */}
            <div className="col-span-2 sm:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-primary pulse-animation" />
                </div>
                <span className="text-xl font-bold tracking-tighter gradient-text">GitPulse</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Open-source GitHub analytics and monitoring
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold mb-3">Support & Help</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-muted-foreground hover:text-foreground tracking-wide text-sm">FAQ</Link></li>
                <li><Link href="/support" className="text-muted-foreground hover:text-foreground tracking-wide text-sm">Support</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold mb-3">Technical Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="https://github.com/yourusername/gitpulse" 
                    target="_blank" 
                    className="text-muted-foreground hover:text-foreground tracking-wide text-sm inline-flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/whitepaper.pdf" 
                    target="_blank" 
                    className="text-muted-foreground hover:text-foreground tracking-wide text-sm inline-flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Whitepaper
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground tracking-wide text-sm">Privacy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground tracking-wide text-sm">Terms</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center sm:flex-row sm:justify-between mt-8 pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground text-center sm:text-left mb-4 sm:mb-0">
              © {new Date().getFullYear()} GitPulse. Open source software.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="https://github.com/yourusername/gitpulse" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/gitpulse" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://discord.gg/gitpulse" target="_blank" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Wallet Status */}
      {!hasPhantom && (
        <div className="fixed bottom-4 right-4 max-w-sm p-4 bg-card border rounded-lg shadow-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Phantom Wallet Required</h3>
              <p className="text-sm text-muted-foreground mb-3">
                To use GitPulse, you'll need to install the Phantom wallet extension.
              </p>
              <Button 
                onClick={() => window.open('https://phantom.app/', '_blank')}
                variant="outline"
                size="sm"
              >
                Install Phantom
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Replace regular button with conditional rendering */}
      {hasPhantom ? (
        <WalletMultiButtonDynamic />
      ) : (
        <Button 
          onClick={handleGetStarted} 
          className="tracking-wide relative overflow-hidden group"
        >
          <span className="relative z-10">Install Phantom Wallet</span>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      )}
    </div>
  );
}

function StatsCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors">
      <div className="text-2xl font-bold mb-1 gradient-text">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground tracking-wide leading-relaxed">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className="text-muted-foreground tracking-wide leading-relaxed">{description}</p>
    </div>
  );
} 