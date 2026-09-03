"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export function FieldEditor({ fields }: { fields: any[] }) {
  const initialFields = fields || [
    { id: '1', label: 'Product Name', value: 'Tomato Ketchup', confidence: 95, method: 'OCR', manuallyCorrected: false },
    { id: '2', label: 'Net Weight', value: '500g', confidence: 85, method: 'Pattern', manuallyCorrected: false },
    { id: '3', label: 'MRP', value: '120.00', confidence: 60, method: 'OCR', manuallyCorrected: false },
    { id: '4', label: 'Manufacturer Date', value: '10/05/2023', confidence: 99, method: 'OCR', manuallyCorrected: false }
  ];

  const [data, setData] = useState(initialFields);
  const [saved, setSaved] = useState(false);

  const handleChange = (id: string, newValue: string) => {
    setData(data.map(f => f.id === id ? { ...f, value: newValue, manuallyCorrected: true } : f));
    setSaved(false);
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'bg-green-500';
    if (conf >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const handleSave = () => {
    // API call to save fields would go here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-semibold text-[#0c1a4a]">Extracted Fields</h3>
        <span className="text-xs text-gray-500">Review and correct extracted values</span>
      </div>
      
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {data.map((field) => (
          <div key={field.id} className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                {field.label}
                {field.manuallyCorrected && <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-1 rounded border border-blue-200">Edited</span>}
              </label>
              <Badge variant="outline" className="text-[10px] uppercase text-gray-500 border-gray-300">
                {field.method}
              </Badge>
            </div>
            <Input 
              value={field.value} 
              onChange={(e) => handleChange(field.id, e.target.value)} 
              className={field.manuallyCorrected ? 'border-blue-300 bg-blue-50/30' : ''}
            />
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-full bg-gray-200 rounded-full h-1.5 flex-1">
                <div className={`${getConfidenceColor(field.confidence)} h-1.5 rounded-full`} style={{ width: `${field.confidence}%` }}></div>
              </div>
              <span className="text-[10px] text-gray-500 font-medium w-6 text-right">{field.confidence}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end items-center">
        {saved && <span className="text-green-600 text-sm mr-4 flex items-center"><Check className="h-4 w-4 mr-1" /> Saved</span>}
        <Button onClick={handleSave} className="bg-[#0c1a4a]">Save Changes</Button>
      </div>
    </div>
  );
}
