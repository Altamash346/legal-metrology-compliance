import React from 'react';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-[#081335] text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-16 bg-white/10 rounded flex items-center justify-center text-xs text-center border border-yellow-500/30">
            Emblem
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Department of Legal Metrology</h1>
            <p className="text-sm text-gray-300">Compliance Checker</p>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">Dashboard</Link>
          <Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors text-sm font-medium">Login / Register</Link>
        </div>
      </div>
    </nav>
  );
}
