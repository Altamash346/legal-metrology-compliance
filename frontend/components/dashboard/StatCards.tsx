import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PackageSearch, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function StatCards({ stats }: { stats: any }) {
  const cards = [
    { title: 'Total Products Scanned', value: stats.totalScanned?.toLocaleString(), icon: PackageSearch, color: 'text-orange-500', trend: '+12% from last month' },
    { title: 'Compliant Products', value: stats.compliantCount?.toLocaleString(), icon: CheckCircle2, color: 'text-green-500', trend: '+5% from last month' },
    { title: 'Issues Resolved', value: stats.issuesResolved?.toLocaleString(), icon: CheckCircle2, color: 'text-green-500', trend: '+18% from last month' },
    { title: 'Issues Pending', value: stats.issuesPending?.toLocaleString(), icon: AlertCircle, color: 'text-red-500', trend: '-2% from last month' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <Card key={idx}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <div className="text-3xl font-bold mb-1">{card.value}</div>
            <p className="text-xs text-gray-400">{card.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
