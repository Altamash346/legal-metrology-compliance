"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FilePlus, List, FileText, Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'New Inspection', href: '/inspections/new', icon: FilePlus },
    { name: 'Inspections', href: '/inspections', icon: List },
    { name: 'Rules Management', href: '/rules', icon: Shield },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Admin', href: '/admin', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-140px)] flex-shrink-0 overflow-y-auto">
      <div className="p-4">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
          Menu
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-[#0c1a4a]/10 text-[#0c1a4a]" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5", isActive ? "text-[#0c1a4a]" : "text-gray-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
