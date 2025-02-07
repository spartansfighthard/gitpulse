'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function TrackingPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddRepo = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tracking/repository', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl })
      });

      if (!response.ok) throw new Error('Failed to add repository');

      toast({
        title: "Success",
        description: "Repository added successfully",
      });
      setRepoUrl('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add repository",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-[#0F172A] border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Add Repository</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">GitHub Repository URL</label>
            <div className="flex gap-2">
              <Input 
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
              <Button 
                onClick={handleAddRepo}
                className="bg-[#00FFA3] text-black hover:bg-[#00FFA3]/90"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 