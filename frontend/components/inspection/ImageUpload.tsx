"use client";
import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ImageUpload({ onFilesChange }: { onFilesChange?: (files: File[]) => void }) {
  const [files, setFiles] = useState<{ file: File, label: string, preview: string }[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        file: f,
        label: 'Front',
        preview: URL.createObjectURL(f)
      }));
      setFiles([...files, ...newFiles]);
      onFilesChange?.([...files.map(f => f.file), ...newFiles.map(f => f.file)]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesChange?.(newFiles.map(f => f.file));
  };

  const updateLabel = (index: number, label: string) => {
    const newFiles = [...files];
    newFiles[index].label = label;
    setFiles(newFiles);
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
        <input 
          type="file" 
          multiple 
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={handleFileSelect}
        />
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700">Click or drag images to upload</p>
        <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG (Max 5MB each)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((item, idx) => (
            <div key={idx} className="relative border rounded-lg p-2 bg-white shadow-sm">
              <button 
                onClick={() => removeFile(idx)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow z-10"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={item.preview} alt={`Upload ${idx}`} className="w-full h-32 object-cover rounded mb-2" />
              <select 
                value={item.label} 
                onChange={(e) => updateLabel(idx, e.target.value)}
                className="w-full border border-gray-300 rounded text-sm p-1"
              >
                <option value="Front">Front</option>
                <option value="Back">Back</option>
                <option value="Side">Side</option>
                <option value="Bottom">Bottom</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
