"use client";
import React from 'react';
import { UploadCloud, FileText, ShieldCheck, BarChart3, FileDown } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    { title: '1. Scan & Upload', desc: 'Upload clear images of the product packaging (front, back, sides).', icon: UploadCloud },
    { title: '2. Text Extraction', desc: 'Our AI uses advanced OCR to read text and identify labels on the packaging.', icon: FileText },
    { title: '3. Verify Compliance', desc: 'The extracted text is automatically checked against Legal Metrology Rules.', icon: ShieldCheck },
    { title: '4. View Results', desc: 'Get an instant compliance score highlighting PASS, FAIL, or REVIEW items.', icon: BarChart3 },
    { title: '5. Download Report', desc: 'Generate a detailed official report in PDF or DOCX format for legal records.', icon: FileDown },
  ];

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-[#0c1a4a] text-center mb-12">How It Works</h1>
        <div className="space-y-12 relative">
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-orange-300 hidden md:block"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-start relative bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-500 rounded-full p-4 text-white z-10 md:mr-8 mb-4 md:mb-0 shadow-md">
                <step.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0c1a4a] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
