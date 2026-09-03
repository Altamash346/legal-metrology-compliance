"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Upload, Download } from 'lucide-react';
import { RuleEditor } from '@/components/rules/RuleEditor';
import { RuleImport } from '@/components/rules/RuleImport';
import { useRules } from '@/hooks/useRules';

export default function RulesPage() {
  const { data: rules } = useRules();
  const [editorOpen, setEditorOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const handleEdit = (rule: any) => {
    setSelectedRule(rule);
    setEditorOpen(true);
  };

  const handleAdd = () => {
    setSelectedRule(null);
    setEditorOpen(true);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'CRITICAL': return <Badge className="bg-red-700 text-white">CRITICAL</Badge>;
      case 'HIGH': return <Badge variant="destructive">HIGH</Badge>;
      case 'MEDIUM': return <Badge variant="warning">MEDIUM</Badge>;
      case 'LOW': return <Badge className="bg-blue-500 text-white">LOW</Badge>;
      default: return <Badge>{severity}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0c1a4a]">Compliance Rules</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setImportOpen(true)}>
            <Upload className="h-4 w-4 mr-2" /> Import JSON
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export JSON
          </Button>
          <Button className="bg-[#0c1a4a]" onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" /> Add Rule
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search rules..." className="pl-9" />
        </div>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm min-w-[150px]">
          <option value="">All Categories</option>
          <option>Pricing</option>
          <option>Dates</option>
        </select>
        <select className="h-10 rounded-md border border-input bg-background px-3 text-sm min-w-[150px]">
          <option value="">All Severities</option>
          <option>CRITICAL</option>
          <option>HIGH</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules?.map((rule: any) => (
              <TableRow key={rule.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleEdit(rule)}>
                <TableCell className="font-medium">{rule.rule_id}</TableCell>
                <TableCell>{rule.title}</TableCell>
                <TableCell>{rule.category}</TableCell>
                <TableCell>{rule.field_name}</TableCell>
                <TableCell className="text-xs">{rule.rule_type}</TableCell>
                <TableCell>{getSeverityBadge(rule.severity)}</TableCell>
                <TableCell>
                  <div className={`w-3 h-3 rounded-full ${rule.is_active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RuleEditor open={editorOpen} onOpenChange={setEditorOpen} rule={selectedRule} />
      <RuleImport open={importOpen} onOpenChange={setImportOpen} />
    </div>
  );
}
