"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function InspectionChart() {
  const data = [
    { name: 'Jan', scanned: 4000, compliant: 3800 },
    { name: 'Feb', scanned: 3000, compliant: 2800 },
    { name: 'Mar', scanned: 2000, compliant: 1800 },
    { name: 'Apr', scanned: 2780, compliant: 2500 },
    { name: 'May', scanned: 1890, compliant: 1700 },
    { name: 'Jun', scanned: 2390, compliant: 2100 },
    { name: 'Jul', scanned: 3490, compliant: 3200 },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-80">
      <h3 className="text-sm font-semibold text-gray-500 mb-4">Inspection Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area type="monotone" dataKey="scanned" stroke="#f97316" fillOpacity={1} fill="url(#colorScanned)" />
          <Area type="monotone" dataKey="compliant" stroke="#16a34a" fillOpacity={1} fill="url(#colorCompliant)" />
          <defs>
            <linearGradient id="colorScanned" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorCompliant" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
