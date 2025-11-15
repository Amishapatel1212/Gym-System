'use client';

import React from 'react';
import { Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';
import { dashboardStats, chartData, activityFeed } from '../data/dummyData';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's your gym overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Members"
          value={dashboardStats.totalMembers}
          icon={Users}
          trend="+12.5%"
          trendUp={true}
        />
        <StatsCard
          title="Active Members"
          value={dashboardStats.activeMembers}
          icon={Users}
          trend="+8.3%"
          trendUp={true}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${dashboardStats.monthlyRevenue}`}
          icon={DollarSign}
          trend="+25.2%"
          trendUp={true}
        />
        <StatsCard
          title="Pending Payments"
          value={`$${dashboardStats.pendingPayments}`}
          icon={AlertCircle}
          trend="-5.1%"
          trendUp={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Chart data={chartData} title="Growth Trends" />
        </div>
        <div>
          <RecentActivity activities={activityFeed} />
        </div>
      </div>
    </div>
  );
}
