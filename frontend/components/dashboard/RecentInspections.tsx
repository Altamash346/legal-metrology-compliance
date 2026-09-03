import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function RecentInspections() {
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Inspections</h3>
        <Link href="/inspections" className="text-sm text-[#0c1a4a] hover:underline font-medium">View All Inspections →</Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Inspection ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>Issues Found</TableHead>
            <TableHead>Resolution Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <Link href={`/inspections/${item.id}`} className="hover:underline">{item.id}</Link>
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
    </div>
  );
}
