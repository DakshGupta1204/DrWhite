"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ServiceProviderProfile from '@/components/ServiceProviderProfile';
import Navbar from '@/components/Navbar';

// This would typically come from your API
const mockProvider = {
  id: "1",
  name: "John Smith",
  location: "Mumbai, Maharashtra",
  rating: "4.8",
  reviews: 156,
  experience: "8+ years",
  specializations: [
    "AC Repair",
    "AC Installation",
    "Preventive Maintenance",
    "Commercial HVAC",
    "Split AC Expert"
  ],
  certifications: [
    "Certified HVAC Technician",
    "Energy Efficiency Specialist",
    "Samsung Authorized Service",
    "LG Certified Professional"
  ],
  completedJobs: 450,
  responseTime: "Under 30 mins",
  contacts: "+91 98765 43210",
  about: "Professional HVAC technician with over 8 years of experience in residential and commercial air conditioning systems. Specialized in installation, maintenance, and repair of all major AC brands. Known for quick response times and high customer satisfaction rates."
};

export default function ProviderProfile() {
  const params = useParams();
  const [provider, setProvider] = useState(mockProvider);

  useEffect(() => {
    // In a real app, you would fetch the provider data here
    // const fetchProvider = async () => {
    //   const response = await fetch(`/api/providers/${params.id}`);
    //   const data = await response.json();
    //   setProvider(data);
    // };
    // fetchProvider();
  }, [params.id]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ServiceProviderProfile provider={provider} />
      </div>
    </>
  );
} 