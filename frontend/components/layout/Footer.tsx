import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#081335] text-gray-300 py-8 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Department of Legal Metrology</h3>
          <p className="text-sm leading-relaxed">
            Ensuring accuracy in measurements and compliance with legal standards across the nation.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="#" className="hover:text-yellow-400">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400">Rules & Acts</a></li>
            <li><a href="#" className="hover:text-yellow-400">Contact Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
          <p className="text-sm">Email: support@legalmetrology.gov.in</p>
          <p className="text-sm">Phone: 1800-11-4000</p>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
        <p className="mb-2">AI-assisted compliance screening tool. Final legal determination remains subject to verification by authorized authorities.</p>
        <p>© {new Date().getFullYear()} Government of India. All rights reserved.</p>
      </div>
    </footer>
  );
}
