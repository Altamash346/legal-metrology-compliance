"use client";
import React from 'react';
import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react';
import { ProcessingStatus as StatusType } from '@/types';

export function ProcessingStatus({ currentStatus }: { currentStatus: StatusType }) {
  const steps = [
    'Uploading',
    'Processing Image',
    'Running OCR',
    'Extracting Fields',
    'Checking Rules',
    'Generating Report',
    'Complete'
  ];

  const currentIndex = steps.indexOf(currentStatus);
  const progressPercent = currentIndex === -1 ? 0 : Math.round((currentIndex / (steps.length - 1)) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-[#0c1a4a]">Analyzing Product</h3>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
        <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentIndex || currentStatus === 'Complete';
          const isActive = idx === currentIndex && currentStatus !== 'Complete';
          const isPending = idx > currentIndex;

          return (
            <div key={step} className={`flex items-center ${isPending ? 'text-gray-400' : isActive ? 'text-[#0c1a4a] font-medium' : 'text-green-600'}`}>
              {isCompleted ? (
                <CheckCircle2 className="h-5 w-5 mr-3 flex-shrink-0" />
              ) : isActive ? (
                <Loader2 className="h-5 w-5 mr-3 animate-spin text-orange-500 flex-shrink-0" />
              ) : (
                <CircleDashed className="h-5 w-5 mr-3 flex-shrink-0 text-gray-300" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
