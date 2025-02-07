import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="p-4 bg-[#0F172A] border-gray-800">
      <div className="flex flex-col">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <h3 className="text-4xl font-semibold text-white mt-1">{value}</h3>
        </div>
      </div>
    </Card>
  );
} 