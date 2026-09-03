import React from 'react';
import { Zap, Target, Shield, Maximize } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0c1a4a] text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">About Legal Metrology Compliance Checker</h1>
          <p className="text-xl text-gray-300">Modernizing compliance monitoring for packaged commodities in India.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12 space-y-12 text-gray-800">
        <section>
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4 border-b pb-2">What is Legal Metrology?</h2>
          <p className="leading-relaxed">
            Legal Metrology is the branch of metrology that deals with units of weighment and measurement, methods of weighment and measurement and weighing and measuring instruments, in relation to the mandatory technical and legal requirements which have the object of ensuring public guarantee from the point of view of security and accuracy of the weighments and measurements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4 border-b pb-2">Why Compliance Matters</h2>
          <p className="leading-relaxed">
            Ensuring compliance with the Legal Metrology (Packaged Commodities) Rules protects consumers from being cheated or misled. Mandatory declarations such as Maximum Retail Price (MRP), net weight, manufacturing date, and manufacturer details provide essential information allowing consumers to make informed choices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4 border-b pb-2">Challenges with Manual Inspection</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Scale:</strong> Millions of packaged commodities enter the market daily, making manual inspection of every product impossible.</li>
            <li><strong>Accuracy:</strong> Human error can lead to oversight of minor but critical compliance violations.</li>
            <li><strong>Time:</strong> Manual verification of complex regulations across different product categories is extremely time-consuming.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-4 border-b pb-2">AI-Assisted Inspection</h2>
          <p className="leading-relaxed">
            This platform utilizes advanced Artificial Intelligence, including Optical Character Recognition (OCR) and Computer Vision, to automatically extract text and visual information from product packaging. Our robust rules engine then instantly validates these extracted data points against the latest Legal Metrology rules, generating comprehensive compliance reports in seconds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-6 border-b pb-2">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Zap className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Speed</h3>
              <p className="text-sm text-gray-600">Reduce inspection time from hours to seconds with automated scanning.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Target className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
              <p className="text-sm text-gray-600">Eliminate human error and ensure consistent application of rules.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Shield className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-sm text-gray-600">Generate clear, objective evidence for all compliance decisions.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Maximize className="h-8 w-8 text-orange-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Scalability</h3>
              <p className="text-sm text-gray-600">Process thousands of products simultaneously without adding resources.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
