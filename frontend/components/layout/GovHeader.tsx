import React from 'react';

export function GovHeader() {
  return (
    <div className="bg-[#0c1a4a] text-white py-1 px-4 text-sm flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="flex flex-col h-4 w-6">
          <div className="bg-orange-500 h-1/3"></div>
          <div className="bg-white h-1/3"></div>
          <div className="bg-green-600 h-1/3"></div>
        </div>
        <span>भारत सरकार | GOVERNMENT OF INDIA</span>
      </div>
      <div>
        <select className="bg-transparent border-none text-white text-xs outline-none cursor-pointer">
          <option value="en" className="text-black">English</option>
          <option value="hi" className="text-black">हिन्दी</option>
        </select>
      </div>
    </div>
  );
}
