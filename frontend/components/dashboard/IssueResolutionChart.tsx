"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function IssueResolutionChart() {
  const data = [
    { name: 'Resolved', value: 850, color: '#16a34a' },
    { name: 'Pending', value: 300, color: '#f59e0b' },
    { name: 'Critical', value: 193, color: '#dc2626' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 h-80 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">Issue Resolution</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} Issues`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
