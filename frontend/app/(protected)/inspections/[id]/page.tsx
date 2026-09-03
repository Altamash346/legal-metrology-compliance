"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ComplianceScore } from '@/components/compliance/ComplianceScore';
import { ComplianceChecks } from '@/components/compliance/ComplianceChecks';
import { IssuesList } from '@/components/compliance/IssuesList';
import { FieldEditor } from '@/components/inspection/FieldEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown, RefreshCw } from 'lucide-react';

export default function InspectionDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('checks');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <Link href="/inspections" className="text-gray-500 hover:text-[#0c1a4a] text-sm flex items-center mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Inspections
          </Link>
          <h1 className="text-3xl font-bold text-[#0c1a4a]">Tomato Ketchup 500g</h1>
          <p className="text-gray-500">Brand: Heinz | ID: {params.id}</p>
        </div>
      </div>

      <ComplianceScore report={null} />

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'checks' ? 'border-[#0c1a4a] text-[#0c1a4a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('checks')}
          >
            Compliance Checks
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'ocr' ? 'border-[#0c1a4a] text-[#0c1a4a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('ocr')}
          >
            OCR Results
          </button>
          <button 
            className={`px-6 py-3 text-sm font-medium border-b-2 ${activeTab === 'fields' ? 'border-[#0c1a4a] text-[#0c1a4a]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('fields')}
          >
            Extracted Fields
          </button>
        </div>

        <div className="p-6 min-h-[500px]">
          {activeTab === 'checks' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#0c1a4a] mb-4">All Checks</h3>
                <ComplianceChecks checks={[]} />
              </div>
              <IssuesList issues={[]} />
            </div>
          )}
          
          {activeTab === 'ocr' && (
            <div className="flex flex-col h-full space-y-4">
              <div className="bg-gray-100 rounded-lg flex-1 min-h-[300px] flex items-center justify-center border border-gray-200 relative overflow-hidden">
                <span className="text-gray-400">Annotated Image Display Area</span>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">Raw Extracted Text</h4>
                <div className="text-sm font-mono text-gray-600 h-32 overflow-y-auto">
                  TOMATO KETCHUP
                  Net Wt: 500g
                  MRP Rs. 150.00 (incl. of all taxes)
                  Mfd: 10/05/2023
                  ...
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div className="max-w-md mx-auto h-full">
              <FieldEditor fields={[]} />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <Button variant="outline" className="text-gray-600">
          <RefreshCw className="h-4 w-4 mr-2" /> Re-validate
        </Button>
        <div className="space-x-3">
          <Button variant="outline" className="border-[#0c1a4a] text-[#0c1a4a]">
            <FileDown className="h-4 w-4 mr-2" /> Download DOCX
          </Button>
          <Button className="bg-[#0c1a4a]">
            <FileDown className="h-4 w-4 mr-2" /> Download PDF Report
          </Button>
        </div>
      </div>
    </div>
  );
}
