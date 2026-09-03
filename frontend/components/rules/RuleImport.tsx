"use client";
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud } from 'lucide-react';

export function RuleImport({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [json, setJson] = useState('');
  const [preview, setPreview] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Rules JSON</DialogTitle>
        </DialogHeader>
        
        {!preview ? (
          <div className="py-4 space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 cursor-pointer">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload JSON file</p>
            </div>
            <div className="text-center text-xs text-gray-400 font-bold uppercase">OR</div>
            <div>
              <label className="block text-sm font-medium mb-1">Paste JSON</label>
              <Textarea 
                value={json} 
                onChange={(e) => setJson(e.target.value)} 
                placeholder='[{"rule_id": "R-01", ...}]' 
                className="font-mono h-40 text-xs" 
              />
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm border border-green-200">
              Successfully parsed 5 rules from JSON.
            </div>
            <div className="border rounded overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b text-left">
                  <tr><th className="p-2">Rule ID</th><th className="p-2">Title</th><th className="p-2">Category</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-2">R-01</td><td className="p-2">MRP Declaration</td><td className="p-2">Pricing</td></tr>
                  <tr className="border-b"><td className="p-2">R-02</td><td className="p-2">Net Quantity</td><td className="p-2">Measurement</td></tr>
                  <tr><td colSpan={3} className="p-2 text-center text-gray-500 italic">... 3 more rules</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          {!preview ? (
            <Button className="bg-[#0c1a4a]" onClick={() => setPreview(true)}>Preview</Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onOpenChange(false)}>Confirm Import</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
