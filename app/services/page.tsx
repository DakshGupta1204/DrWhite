"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from "@/components/Navbar";

// Create a loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-emerald-50">
    <div className="text-center">
      <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-emerald-600 font-medium">Loading services...</p>
    </div>
  </div>
);

// Dynamically import the entire ServicesContent component with SSR disabled
const ServicesContent = dynamic(
  () => import('../../components/ServicesContent'),
  { 
    ssr: false,
    loading: () => <LoadingFallback />
  }
);

export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Navbar />
      <ServicesContent />
    </Suspense>
  );
}
