"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, FileText, BarChart3 } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    organization_type: 'Officer',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const { register, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!terms) {
      setError("You must agree to the Terms and Conditions");
      return;
    }

    try {
      await register({
        full_name: formData.name,
        email: formData.email,
        phone: formData.mobile,
        organization_type: formData.organization_type,
        password: formData.password,
      });
    } catch (err: any) {
      const msg = typeof err === 'string' ? err : (err?.message || 'Registration failed');
      setError(msg);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex bg-gray-50">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-[#0c1a4a] text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-6">Join Legal Metrology Compliance Checker</h1>
        <p className="text-lg text-gray-300 mb-12">Create an account to access the automated inspection tools.</p>
        
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
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100 my-8">
          <h2 className="text-2xl font-bold text-[#0c1a4a] mb-2">Create Account</h2>
          <p className="text-gray-500 mb-6 text-sm">Register to access the compliance portal</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <Input required name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <Input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="john@gov.in" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <Input required name="mobile" value={formData.mobile} onChange={handleChange} placeholder="9876543210" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Type</label>
              <select 
                name="organization_type" 
                value={formData.organization_type} 
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0c1a4a]"
              >
                <option value="Officer">LMO Officer</option>
                <option value="Inspector">Inspector</option>
                <option value="Viewer">Viewer / Admin</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <Input type={showPassword ? "text" : "password"} required name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <Input type={showPassword ? "text" : "password"} required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-gray-500">
                {showPassword ? "Hide Passwords" : "Show Passwords"}
              </button>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="rounded text-[#0c1a4a] focus:ring-[#0c1a4a]" />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the Terms & Conditions and Privacy Policy
              </label>
            </div>
            
            <Button type="submit" className="w-full mt-4 bg-[#0c1a4a] hover:bg-[#0c1a4a]/90" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <Link href="/login" className="text-orange-600 font-medium hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
