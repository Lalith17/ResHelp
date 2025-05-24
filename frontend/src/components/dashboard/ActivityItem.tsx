import React from 'react';

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, icon }) => {
  return (
    <li className="py-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 rounded-md bg-indigo-50 p-2">
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="mt-1 text-xs text-gray-400">{time}</p>
        </div>
      </div>
    </li>
  );
};

export default ActivityItem;