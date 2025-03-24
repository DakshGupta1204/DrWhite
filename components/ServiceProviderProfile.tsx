"use client";

import { Star, MapPin, Phone, Award, Wrench, Clock, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

interface ServiceProviderProfileProps {
  provider: {
    id: string;
    name: string;
    profileImage?: string;
    location: string;
    rating: string;
    reviews: number;
    experience: string;
    specializations: string[];
    certifications: string[];
    completedJobs: number;
    responseTime: string;
    contacts: string;
    about: string;
  };
}

const ServiceProviderProfile = ({ provider }: ServiceProviderProfileProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start gap-8 mb-8 pb-8 border-b border-gray-100">
        <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gray-100 shadow-md transition-transform hover:scale-105">
          {provider.profileImage ? (
            <Image
              src={provider.profileImage}
              alt={provider.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white text-3xl font-bold">
              {provider.name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">{provider.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-sm font-medium">{provider.location}</span>
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
                <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{provider.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({provider.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md">
              Contact Now
            </button>
            <button className="bg-white text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="font-semibold">Experience</span>
          </div>
          <p className="text-gray-700 font-medium">{provider.experience}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <span className="font-semibold">Completed</span>
          </div>
          <p className="text-gray-700 font-medium">{provider.completedJobs}+ jobs</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <span className="font-semibold">Response</span>
          </div>
          <p className="text-gray-700 font-medium">{provider.responseTime}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all duration-200 group">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Award className="w-5 h-5" />
            </div>
            <span className="font-semibold">Certified</span>
          </div>
          <p className="text-gray-700 font-medium">{provider.certifications.length} certifications</p>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-8 bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900">About</h2>
        <p className="text-gray-600 leading-relaxed">{provider.about}</p>
      </div>

      {/* Two Column Layout for Specializations and Certifications */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Specializations</h2>
          <div className="flex flex-wrap gap-2">
            {provider.specializations.map((spec, index) => (
              <span
                key={index}
                className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Certifications</h2>
          <div className="space-y-3">
            {provider.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Award className="w-5 h-5 text-emerald-600" />
                <span className="font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-xl border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="font-medium">{provider.contacts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile; 