"use client";
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ComplianceChecks({ checks }: { checks: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mockChecks = checks || [
    { id: '1', field_name: 'MRP Declaration', description: 'Maximum Retail Price must be printed clearly.', category: 'Pricing', reference: 'Rule 6(1)(e)', status: 'PASS', detected_value: 'Rs. 150.00', expected_value: 'Number with currency', confidence: 98, recommendation: 'None' },
    { id: '2', field_name: 'Net Quantity', description: 'Net quantity must be declared in standard units.', category: 'Measurement', reference: 'Rule 6(1)(c)', status: 'FAIL', detected_value: 'Missing', expected_value: 'Number with unit (g, kg, ml, L)', confidence: 95, recommendation: 'Ensure net quantity is printed prominently on the principal display panel.' },
    { id: '3', field_name: 'Manufacturer Address', description: 'Complete address of manufacturer must be present.', category: 'Origin', reference: 'Rule 6(1)(a)', status: 'REVIEW', detected_value: 'Partial address found', expected_value: 'Full postal address', confidence: 65, recommendation: 'Verify if the printed address is legally sufficient.' }
  ];

  const getBadgeVariant = (status: string) => {
    if (status === 'PASS') return 'success';
    if (status === 'FAIL') return 'destructive';
    return 'warning';
  };

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {mockChecks.map((check) => (
        <div key={check.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <div 
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => setExpandedId(expandedId === check.id ? null : check.id)}
          >
            <div>
              <h4 className="font-bold text-[#0c1a4a] mb-1">{check.field_name}</h4>
              <p className="text-sm text-gray-600 mb-1">{check.description}</p>
              <div className="text-xs text-gray-400 space-x-4">
                <span>Category: {check.category}</span>
                <span>Reference: {check.reference}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={getBadgeVariant(check.status)}>{check.status}</Badge>
              {expandedId === check.id ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </div>
          </div>
          
          {expandedId === check.id && (
            <div className="p-4 bg-gray-50 border-t border-gray-200 text-sm">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Detected Value:</span>
                  <span className="text-gray-600">{check.detected_value}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700 block mb-1">Expected Condition:</span>
                  <span className="text-gray-600">{check.expected_value}</span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-semibold text-gray-700 block mb-1">Confidence Score:</span>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-[#0c1a4a] h-2 rounded-full" style={{ width: `${check.confidence}%` }}></div>
                  </div>
                  <span className="text-xs font-medium">{check.confidence}%</span>
                </div>
              </div>
              {check.status !== 'PASS' && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded text-orange-800">
                  <span className="font-semibold block mb-1">Recommendation:</span>
                  {check.recommendation}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
