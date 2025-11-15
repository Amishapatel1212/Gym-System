'use client';

import React from 'react';
import { Activity } from 'lucide-react';

export default function RecentActivity({ activities }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <Activity size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{activity.action}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{activity.member}</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">{activity.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
