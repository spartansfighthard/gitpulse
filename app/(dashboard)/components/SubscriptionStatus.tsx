'use client';

import { useSubscription } from '@/lib/hooks/useSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export function SubscriptionStatus() {
  const { subscription } = useSubscription();

  if (!subscription) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
        <Badge variant={subscription.status === 'active' ? 'default' : 'destructive'}>
          {subscription.status === 'active' ? 'Active' : 'Inactive'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <p className="text-2xl font-bold">{subscription.planType}</p>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            {subscription.daysRemaining} days remaining
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 