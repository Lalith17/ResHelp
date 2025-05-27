import React from "react";
import { subDays, format, eachDayOfInterval, isSameDay } from "date-fns";

const ActivityHeatmap = ({ activities }) => {
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 29);

  const days = eachDayOfInterval({
    start: thirtyDaysAgo,
    end: today,
  });

  const getActivityCount = (date) => {
    const activity = activities.find((a) => isSameDay(new Date(a.date), date));
    return activity?.count || 0;
  };

  const getColorIntensity = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count <= 2) return "bg-indigo-100";
    if (count <= 4) return "bg-indigo-200";
    if (count <= 6) return "bg-indigo-300";
    if (count <= 8) return "bg-indigo-400";
    return "bg-indigo-500";
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Activity Overview</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Less</span>
          <div className="flex space-x-1">
            <div className="h-4 w-4 rounded bg-gray-100"></div>
            <div className="h-4 w-4 rounded bg-indigo-100"></div>
            <div className="h-4 w-4 rounded bg-indigo-200"></div>
            <div className="h-4 w-4 rounded bg-indigo-300"></div>
            <div className="h-4 w-4 rounded bg-indigo-400"></div>
            <div className="h-4 w-4 rounded bg-indigo-500"></div>
          </div>
          <span className="text-sm text-gray-500">More</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2">
          {days.map((date) => {
            const count = getActivityCount(date);
            return (
              <div
                key={date.toISOString()}
                className={`group relative h-8 rounded ${getColorIntensity(
                  count
                )} transition-colors duration-200`}
              >
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="relative rounded bg-gray-900 px-2 py-1">
                    <div className="text-xs text-white">
                      <div>{format(date, "MMM d, yyyy")}</div>
                      <div>{count} activities</div>
                    </div>
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Last 30 days of activity</span>
          <span>
            {activities.reduce((sum, activity) => sum + activity.count, 0)}{" "}
            total activities
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
