import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle } from 'lucide-react';

export function IssuesList({ issues }: { issues: any[] }) {
  const mockIssues = issues || [
    { id: '1', field_name: 'Net Quantity', description: 'Net quantity must be declared in standard units.', severity: 'HIGH', recommendation: 'Ensure net quantity is printed prominently on the principal display panel in metric units.' },
    { id: '2', field_name: 'Manufacturer Address', description: 'Complete address of manufacturer is missing pin code.', severity: 'MEDIUM', recommendation: 'Update packaging to include the complete postal address with PIN code.' }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return <Badge className="bg-red-700">CRITICAL</Badge>;
      case 'HIGH': return <Badge variant="destructive">HIGH</Badge>;
      case 'MEDIUM': return <Badge variant="warning">MEDIUM</Badge>;
      case 'LOW': return <Badge className="bg-blue-500">LOW</Badge>;
      default: return <Badge>{severity}</Badge>;
    }
  };

  const getIcon = (severity: string) => {
    if (severity === 'CRITICAL' || severity === 'HIGH') return <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />;
    return <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />;
  };

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-bold text-[#0c1a4a] border-b pb-2">Issues Requiring Attention</h3>
      {mockIssues.length === 0 ? (
        <p className="text-gray-500 italic">No issues found.</p>
      ) : (
        <div className="space-y-4">
          {mockIssues.map((issue) => (
            <div key={issue.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm flex items-start">
              {getIcon(issue.severity)}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">{issue.field_name}</h4>
                  {getSeverityBadge(issue.severity)}
                </div>
                <p className="text-gray-700 text-sm mb-3">{issue.description}</p>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 mb-3 border border-gray-100">
                  <span className="font-semibold text-gray-800">Recommendation:</span> {issue.recommendation}
                </div>
                <Button variant="outline" size="sm" className="text-xs">View Evidence</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
