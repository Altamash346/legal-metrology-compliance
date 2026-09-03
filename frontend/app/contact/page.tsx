"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully.");
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-140px)] py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0c1a4a] mb-4">Contact Us</h1>
          <p className="text-gray-600">Reach out to the Department of Legal Metrology for support or inquiries.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Left: Contact Form */}
          <div className="w-full md:w-3/5 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input required placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <Input type="email" required placeholder="your.email@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <Input required placeholder="Inquiry Subject" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <Textarea required placeholder="How can we help you?" className="h-32" />
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded transition-colors mt-4">
                Submit Message
              </Button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="w-full md:w-2/5 bg-[#0c1a4a] text-white p-8">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Department of Legal Metrology</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    [Placeholder Address]<br />
                    Krishi Bhawan, New Delhi<br />
                    India - 110001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                  <p className="text-gray-300 text-sm">1800-11-4000 (Toll Free)</p>
                  <p className="text-gray-300 text-sm">011-23381234</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                  <p className="text-gray-300 text-sm">support-lm@gov.in</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-orange-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                  <p className="text-gray-300 text-sm">Mon - Fri: 9:00 AM - 5:30 PM</p>
                  <p className="text-gray-300 text-sm">Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 italic">
          * This is a placeholder. Official contact information will be provided by the Department of Legal Metrology.
        </div>
      </div>
    </div>
  );
}
