import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { GovHeader } from '@/components/layout/GovHeader';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Legal Metrology Compliance Checker',
  description: 'AI-Powered Legal Metrology Compliance Checker for Government of India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <GovHeader />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
