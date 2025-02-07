'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { WalletAuthGuard } from '@/components/auth/WalletAuthGuard';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { 
  GitBranch, 
  Settings, 
  Activity,
  LineChart,
  Brain,
  Menu,
  Target
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { href: '/dashboard', icon: LineChart, label: 'Overview' },
    { href: '/dashboard/repositories', icon: GitBranch, label: 'Repositories' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/tracking', icon: Target, label: 'Tracking' },
    { href: '/dashboard/analysis', icon: Brain, label: 'AI Analysis' },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <WalletAuthGuard>
      <div className="flex h-screen overflow-hidden bg-[#0B1120]">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0B1120] border-r border-gray-800 ${isSidebarOpen ? '' : '-translate-x-full'} transition-transform duration-200 ease-in-out z-30`}>
          <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="p-4 border-b border-gray-800">
              <Link href="/" className="block">
                <h1 className="text-xl font-bold text-white hover:text-primary transition-colors">GitPulse</h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      pathname === item.href 
                        ? 'bg-[#00FFA3] text-black hover:bg-[#00FFA3]' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Wallet Connection */}
            <div className="p-4 border-t border-gray-800">
              <WalletMultiButton className="w-full !bg-[#00FFA3] hover:!bg-[#00FFA3]/90 !text-black" />
            </div>
          </div>
        </aside>

        {/* Main content - adjusted for proper containment */}
        <div className={`${isSidebarOpen ? 'ml-64' : 'ml-0'} flex-1 transition-all duration-200 ease-in-out`}>
          <main className="h-screen overflow-y-auto">
            <div className="container p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </WalletAuthGuard>
  );
} 