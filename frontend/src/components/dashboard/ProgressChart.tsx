import React from 'react';

const ProgressChart: React.FC = () => {
  const segments = [
    { id: 1, percentage: 25, color: 'bg-indigo-500' },
    { id: 2, percentage: 20, color: 'bg-blue-500' },
    { id: 3, percentage: 15, color: 'bg-green-500' },
    { id: 4, percentage: 25, color: 'bg-purple-500' },
    { id: 5, percentage: 15, color: 'bg-gray-300' },
  ];

  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200">
        {segments.map((segment) => (
          <div
            key={segment.id}
            className={`${segment.color} transition-all duration-500`}
            style={{ width: `${segment.percentage}%` }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="flex items-center">
          <span className="mr-2 h-3 w-3 rounded-full bg-indigo-500"></span>
          <span className="text-xs text-gray-500">Personal Info</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 h-3 w-3 rounded-full bg-blue-500"></span>
          <span className="text-xs text-gray-500">Experience</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 h-3 w-3 rounded-full bg-green-500"></span>
          <span className="text-xs text-gray-500">Education</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2 h-3 w-3 rounded-full bg-purple-500"></span>
          <span className="text-xs text-gray-500">Skills</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;