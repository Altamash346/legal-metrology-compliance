"use client";
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function RuleEditor({ open, onOpenChange, rule }: { open: boolean, onOpenChange: (open: boolean) => void, rule?: any }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{rule ? 'Edit Rule' : 'Add New Rule'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">Rule ID *</label>
            <Input defaultValue={rule?.rule_id} placeholder="e.g. R-01" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <Input defaultValue={rule?.title} placeholder="Rule Title" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3">
              <option>Mandatory Declaration</option>
              <option>Format Validation</option>
              <option>Date Validation</option>
              <option>Numeric Validation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Field Name *</label>
            <Input defaultValue={rule?.field_name} placeholder="e.g. MRP" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rule Type *</label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3">
              <option>REQUIRED_FIELD</option>
              <option>REGEX</option>
              <option>NUMERIC_RANGE</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Severity *</label>
            <select className="w-full h-10 rounded-md border border-input bg-background px-3">
              <option>CRITICAL</option>
              <option>HIGH</option>
              <option>MEDIUM</option>
              <option>LOW</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Condition (JSON) *</label>
            <Textarea defaultValue={rule?.condition || "{}"} className="font-mono h-24" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Legal Reference</label>
            <Input defaultValue={rule?.legal_reference} placeholder="e.g. Rule 6(1)(e)" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Violation Message</label>
            <Textarea defaultValue={rule?.violation_message} className="h-16" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Recommendation</label>
            <Textarea defaultValue={rule?.recommendation} className="h-16" />
          </div>
          <div className="col-span-2 flex items-center space-x-2 mt-2">
            <input type="checkbox" id="is_active" defaultChecked={rule?.is_active ?? true} className="rounded text-[#0c1a4a]" />
            <label htmlFor="is_active" className="text-sm font-medium">Active Rule</label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button className="bg-[#0c1a4a]">Save Rule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
