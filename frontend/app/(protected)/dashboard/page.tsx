"use client";
import React from 'react';
import Link from 'next/link';
import { useDashboardStats } from '@/hooks/useDashboard';
import { StatCards } from '@/components/dashboard/StatCards';
import { RecentInspections } from '@/components/dashboard/RecentInspections';
import { InspectionChart } from '@/components/dashboard/InspectionChart';
import { IssueResolutionChart } from '@/components/dashboard/IssueResolutionChart';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-orange-500 mb-1">COMPLIANCE MONITORING</p>
          <h1 className="text-3xl font-bold text-[#0c1a4a]">Dashboard</h1>
        </div>
        <Link href="/inspections/new">
          <Button className="bg-[#0c1a4a] hover:bg-[#0c1a4a]/90">
            + New Inspection
          </Button>
        </Link>
      </div>

      <StatCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InspectionChart />
        <IssueResolutionChart />
      </div>

      <div className="flex space-x-4 mt-6 mb-4">
        <Button variant="outline" className="text-amber-600 border-amber-200 hover:bg-amber-50">View Pending Issues</Button>
        <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Resolved Issues</Button>
      </div>

      <RecentInspections />
    </div>
  );
}
