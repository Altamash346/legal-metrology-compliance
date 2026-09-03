import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#0c1a4a] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Legal Metrology Compliance Checker</h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Automated inspection and verification of packaged commodities to ensure compliance with Legal Metrology (Packaged Commodities) Rules.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded text-lg font-medium transition-colors">
              Get Started
            </Link>
            <Link href="/about" className="bg-transparent border border-white hover:bg-white/10 text-white px-8 py-3 rounded text-lg font-medium transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0c1a4a] mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Automated Scanning', desc: 'Extract text from product images using advanced OCR.' },
            { title: 'Rule-Based Verification', desc: 'Automatically check against latest legal metrology rules.' },
            { title: 'Detailed Reports', desc: 'Generate comprehensive compliance reports instantly.' },
            { title: 'Secure & Reliable', desc: 'Built for government use with high security standards.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold mb-3 text-[#0c1a4a]">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16 border-y border-gray-200">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around text-center gap-8">
          <div>
            <p className="text-4xl font-bold text-[#0c1a4a] mb-2">10,000+</p>
            <p className="text-gray-600">Products Scanned</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-green-600 mb-2">95%</p>
            <p className="text-gray-600">Compliance Rate</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-orange-500 mb-2">24/7</p>
            <p className="text-gray-600">Automated Monitoring</p>
          </div>
        </div>
      </section>
    </div>
  );
}
