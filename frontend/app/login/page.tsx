"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, FileText, BarChart3 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login({ email, password });
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex bg-gray-50">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-[#0c1a4a] text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to Legal Metrology Compliance Checker</h1>
        <p className="text-lg text-gray-300 mb-12">Automated AI-assisted screening for packaged commodities.</p>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <ShieldCheck className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Secure & Reliable</h3>
              <p className="text-gray-300 text-sm">Built for government use with high security standards.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <FileText className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Rule Based Verification</h3>
              <p className="text-gray-300 text-sm">Automatically check against latest legal metrology rules.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <BarChart3 className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold">Accurate Reports</h3>
              <p className="text-gray-300 text-sm">Generate comprehensive compliance reports instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-2">Login to Your Account</h2>
          <p className="text-gray-500 mb-6 text-sm">Enter your credentials to access the dashboard</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / Username</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@gov.in"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 text-sm"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <Link href="#" className="text-xs text-orange-600 hover:underline">Forgot Password?</Link>
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-6 bg-[#0c1a4a] hover:bg-[#0c1a4a]/90" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <Link href="/register" className="text-orange-600 font-medium hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
