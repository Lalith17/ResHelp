import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, trend, icon }) => {
  return (
    <div className="rounded-lg bg-white p-5 shadow transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div className="truncate text-sm font-medium text-gray-500">{title}</div>
        <div className="rounded-md bg-indigo-50 p-2">{icon}</div>
      </div>
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <div className={`ml-2 flex items-center text-xs ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
          {trend === 'up' ? (
            <TrendingUp className="mr-1 h-3 w-3" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;