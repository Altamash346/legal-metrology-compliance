"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/inspection/ImageUpload';
import { ProcessingStatus } from '@/components/inspection/ProcessingStatus';

export default function NewInspectionPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<any>('Uploading');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing steps
    const steps = ['Uploading', 'Processing Image', 'Running OCR', 'Extracting Fields', 'Checking Rules', 'Generating Report', 'Complete'];
    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setStatus(steps[stepIdx]);
      } else {
        clearInterval(interval);
        router.push('/inspections/INSP-MOCK-123'); // Redirect to mock result
      }
    }, 1500);
  };

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <ProcessingStatus currentStatus={status} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0c1a4a] mb-6">New Inspection</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <Input required placeholder="e.g. Tomato Ketchup 500g" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
            <Input placeholder="e.g. Heinz" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Commodity Type</label>
            <select className="w-full border border-input rounded-md h-10 px-3">
              <option>Pre-packaged Food</option>
              <option>Cosmetics</option>
              <option>Electronics</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full border border-input rounded-md h-10 px-3">
              <option>FMCG</option>
              <option>Retail</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images *</label>
          <ImageUpload />
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button type="button" variant="outline" className="mr-2" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">Analyze Product</Button>
        </div>
      </form>
    </div>
  );
}
