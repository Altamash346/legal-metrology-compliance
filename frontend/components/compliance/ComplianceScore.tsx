import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ComplianceScore({ report }: { report: any }) {
  const getStatusColor = (status: string) => {
    if (status === 'COMPLIANT') return 'bg-green-50 text-green-700 border-green-200';
    if (status === 'NON-COMPLIANT') return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  };

  const getStatusBadgeVariant = (status: string) => {
    if (status === 'COMPLIANT') return 'success';
    if (status === 'NON-COMPLIANT') return 'destructive';
    return 'warning';
  };

  // Mock data if report is not provided
  const score = report?.score || 77;
  const status = report?.status || 'NON-COMPLIANT';
  const total = report?.checks?.length || 24;
  const passed = report?.checks?.filter((c: any) => c.status === 'PASS').length || 18;
  const failed = report?.checks?.filter((c: any) => c.status === 'FAIL').length || 4;
  const review = report?.checks?.filter((c: any) => c.status === 'REVIEW').length || 2;

  return (
    <div className="space-y-4">
      <Card className={`border-2 ${getStatusColor(status)} shadow-sm`}>
        <CardContent className="p-8 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold mb-4">{Math.round(score)}%</div>
          <Badge variant={getStatusBadgeVariant(status)} className="text-sm px-4 py-1">
            {status}
          </Badge>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Total Checks</div>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Passed</div>
            <div className="text-2xl font-bold text-green-600">{passed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Failed</div>
            <div className="text-2xl font-bold text-red-600">{failed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Review</div>
            <div className="text-2xl font-bold text-amber-500">{review}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
