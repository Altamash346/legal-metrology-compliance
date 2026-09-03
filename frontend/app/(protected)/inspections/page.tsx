"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter } from 'lucide-react';

export default function InspectionsPage() {
  const data = [
    { id: 'INSP-2024-089', product: 'Oreo Biscuits 120g', date: '2024-05-14', compliance: 'COMPLIANT', issues: 0, resolution: 'RESOLVED' },
    { id: 'INSP-2024-088', product: 'Maggi Noodles 70g', date: '2024-05-14', compliance: 'NON-COMPLIANT', issues: 2, resolution: 'PENDING' },
    { id: 'INSP-2024-087', product: 'Lays Classic 50g', date: '2024-05-13', compliance: 'REVIEW', issues: 1, resolution: 'PENDING' },
  ];

  const getComplianceVariant = (status: string) => {
    if (status === 'COMPLIANT') return 'success';
    if (status === 'NON-COMPLIANT') return 'destructive';
    return 'warning';
  };

  const getResolutionVariant = (status: string) => {
    if (status === 'RESOLVED') return 'success';
    if (status === 'PENDING') return 'warning';
    return 'default';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0c1a4a]">Inspections</h1>
        <Link href="/inspections/new">
          <Button className="bg-[#0c1a4a]">
            + New Inspection
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search inspections..." className="pl-9" />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Inspection ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Issues</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Link href={`/inspections/${item.id}`} className="hover:underline text-[#0c1a4a]">{item.id}</Link>
                </TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Badge variant={getComplianceVariant(item.compliance)}>{item.compliance}</Badge>
                </TableCell>
                <TableCell>{item.issues > 0 ? <span className="text-red-500 font-medium">{item.issues}</span> : 'None'}</TableCell>
                <TableCell>
                  <Badge variant={getResolutionVariant(item.resolution)}>{item.resolution}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-gray-200 flex justify-end">
           {/* Pagination placeholder */}
           <div className="flex space-x-2">
             <Button variant="outline" size="sm" disabled>Previous</Button>
             <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
