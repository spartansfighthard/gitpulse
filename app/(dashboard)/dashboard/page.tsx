'use client';

import { useGitHubData } from '@/lib/hooks/useGitHubData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GitBranch, Users, Star, Activity, Clock, AlertCircle } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useSubscription } from '@/lib/hooks/useSubscription';
import { SubscriptionStatus } from '../components/SubscriptionStatus';

export default function DashboardPage() {
  const { activeRepos, contributors, totalStars, commitsToday, loading, error } = useGitHubData();
  const { subscription, isLoading } = useSubscription();

  if (loading || isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!subscription) {
    return null; // Let the useSubscription hook handle the redirect
  }

  // Rest of the component remains the same

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<GitBranch />}
          label="Active Repositories"
          value={activeRepos}
        />
        <StatCard
          icon={<Users />}
          label="Contributors"
          value={contributors}
        />
        <StatCard
          icon={<Star />}
          label="Total Stars"
          value={totalStars}
        />
        <StatCard
          icon={<Activity />}
          label="Commits Today"
          value={commitsToday}
        />
      </div>

      {/* Subscription Status */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
        <Card className="p-4 bg-[#0F172A] border-gray-800">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4">Subscription Status</h2>
            <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'} className="mb-2">
              {subscription.status}
            </Badge>
            <p className="text-3xl font-bold text-white mb-2">{subscription.planType}</p>
            <div className="flex items-center text-sm text-gray-400">
              <Clock className="mr-2 h-4 w-4" />
              {subscription.daysRemaining} days remaining
            </div>
          </div>
        </Card>
        
        {/* Activity Chart */}
        <Card className="p-4 bg-[#0F172A] border-gray-800">
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-white mb-4">Activity Overview</h2>
            {/* TODO: Implement activity chart */}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-4 p-4 bg-[#0F172A] border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">New Pull Request</h3>
                <p className="text-sm text-gray-400">Feature: Add dark mode support</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 