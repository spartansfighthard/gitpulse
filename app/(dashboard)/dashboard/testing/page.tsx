'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

export default function TestingPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const testWebhook = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test/webhook', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Test failed');

      toast({
        title: "Success",
        description: "Test webhook sent successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send test webhook",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#0F172A] border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Test Discord Integration</h2>
        <Button 
          onClick={testWebhook}
          disabled={isLoading}
          className="bg-[#5865F2] text-white hover:bg-[#5865F2]/90"
        >
          Send Test Notification
        </Button>
      </Card>
    </div>
  );
} 