"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  WashingMachine,
  Wind,
  Refrigerator,
  Tv,
  Microwave,
  Droplets,
  MapPin,
  Star,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import MapView with SSR disabled
const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
    </div>
  )
});

interface Service {
  id: string;
  name: string;
  location: string;
  rating: string;
  reviews: number;
  price: string;
  distance: string;
  contacts: string;
  position?: {
    lat: number;
    lng: number;
  };
}

interface Place {
  id: string;
  title?: string;
  address?: {
    label?: string;
  };
  distance?: number;
  contacts?: {
    mobile?: { value: string }[];
  }[];
  position?: {
    lat: number;
    lng: number;
  };
}

const categories = [
  { id: "washing machine repair", name: "Washing Machine", icon: WashingMachine },
  { id: "AC repair", name: "Air Conditioning", icon: Wind },
  { id: "refrigerator repair", name: "Refrigerator", icon: Refrigerator },
  { id: "TV repair", name: "TV", icon: Tv },
  { id: "microwave repair", name: "Microwave", icon: Microwave },
  { id: "water purifier repair", name: "RO", icon: Droplets },
];

// Function to create default mock location for initial rendering
const getDefaultLocation = () => ({ lat: 40.7128, lng: -74.0060 }); // New York coordinates as default

export default function ServicesContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>(getDefaultLocation());
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if code is running in browser environment
  useEffect(() => {
    setIsClient(true);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        toast.error("Please login to view services");
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  }, [router]);

  // Memoize the fetchPlaces function to avoid recreation on every render
  const fetchPlaces = useCallback(async (lat: number, lon: number, category: string | null) => {
    setLoading(true);
    try {
      const categoryQuery = category ? `q=${encodeURIComponent(category)}` : "";

      const url = `https://discover.search.hereapi.com/v1/discover?at=${lat},${lon}&limit=20&${categoryQuery}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      // Check if data exists and has items property
      if (!data || !data.items) {
        console.warn("API response missing items array, using fallback data");
        // Fallback data for demo purposes
        const mockData = generateMockServices(lat, lon, category, 5);
        setServices(mockData);
      } else {
        const formattedData = data.items.map((place: Place) => ({
          id: place.id || `mock-${Math.random().toString(36).substr(2, 9)}`,
          name: place.title || "Unnamed Place",
          location: place.address?.label || "Unknown Location",
          rating: (Math.random() * 1.5 + 3.5).toFixed(1),
          reviews: Math.floor(Math.random() * 200 + 50),
          price: "Varies",
          distance: place.distance ? `${(place.distance / 1000).toFixed(1)} km` : "Unknown",
          contacts: place.contacts?.[0]?.mobile?.map((c) => c.value).join(", ") || "No contact",
          position: place.position || { lat: lat + (Math.random() - 0.5) * 0.01, lng: lon + (Math.random() - 0.5) * 0.01 },
        }));

        setServices(formattedData);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
      // Fallback to mock data on error
      const mockData = generateMockServices(lat, lon, category, 5);
      setServices(mockData);
    }
    setLoading(false);
  }, []);  // Empty dependency array since it doesn't use any external variables that could change

  // Get user location and fetch places
  useEffect(() => {
    // Only run this effect in the browser and when logged in
    if (!isClient || !isLoggedIn) return;
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setUserLocation({ lat, lng: lon });
            fetchPlaces(lat, lon, selectedCategory);
          },
          (error) => {
            console.error("Geolocation error:", error);
            // Use default location if geolocation fails
            const defaultLocation = getDefaultLocation();
            fetchPlaces(defaultLocation.lat, defaultLocation.lng, selectedCategory);
          }
        );
      } else {
        console.error("Geolocation not supported");
        // Use default location if geolocation is not supported
        const defaultLocation = getDefaultLocation();
        fetchPlaces(defaultLocation.lat, defaultLocation.lng, selectedCategory);
      }
    } catch (error) {
      console.error("Error accessing geolocation:", error);
      // Use default location on any error
      const defaultLocation = getDefaultLocation();
      fetchPlaces(defaultLocation.lat, defaultLocation.lng, selectedCategory);
    }
  }, [selectedCategory, fetchPlaces, isClient, isLoggedIn]);

  // Helper function to generate mock service data
  const generateMockServices = (lat: number, lon: number, category: string | null, count: number): Service[] => {
    const categoryNames: Record<string, string[]> = {
      "washing machine repair": ["Quick Wash Repairs", "SpinMaster Fixes", "CleanCycle Services"],
      "AC repair": ["CoolAir Technicians", "Freeze Fix Pro", "Climate Control Experts"],
      "refrigerator repair": ["FridgeFix Pro", "CoolKeeper Services", "Fresh Solutions"],
      "TV repair": ["ScreenFix Masters", "PixelPerfect Repairs", "ViewTech Services"],
      "microwave repair": ["MicroWizards", "QuickHeat Repairs", "WaveMaster Services"],
      "water purifier repair": ["PureFlow Technicians", "AquaFix Pro", "ClearWater Services"],
    };
    
    const names = category ? categoryNames[category] || ["Local Repair Service"] : ["Home Appliance Repair"];
    
    return Array(count).fill(0).map((_, i) => {
      const distance = Math.random() * 5 + 0.5;
      const posVariation = distance * 0.005;
      
      return {
        id: `mock-${Math.random().toString(36).substr(2, 9)}`,
        name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
        location: `${distance.toFixed(1)} km from your location`,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        reviews: Math.floor(Math.random() * 200 + 50),
        price: "Varies",
        distance: `${distance.toFixed(1)} km`,
        contacts: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        position: { 
          lat: lat + (Math.random() - 0.5) * posVariation, 
          lng: lon + (Math.random() - 0.5) * posVariation 
        },
      };
    });
  };

  // Don't render anything on the server side
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 relative">
      {/* Background pattern using SVG */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Categories */}
        <div className="mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-8 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Select a Category
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id
                    )
                  }
                  className={`group p-6 rounded-xl border transition-all duration-300 flex flex-col items-center relative overflow-hidden ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200 shadow-lg"
                      : "bg-white/70 backdrop-blur-sm border-white/50 hover:border-emerald-200 hover:shadow-lg"
                  }`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon
                    className={`h-10 w-10 mb-3 relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                      selectedCategory === category.id
                        ? "text-emerald-600"
                        : "text-gray-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium relative z-10 transition-colors duration-300 ${
                      selectedCategory === category.id
                        ? "text-emerald-600"
                        : "text-gray-600 group-hover:text-emerald-600"
                    }`}
                  >
                    {category.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Services */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Available Services</h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <motion.div
                  className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : services.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xl text-gray-600">No services found in your area.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* List View */}
                <motion.div
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
                  }}
                >
                  {services.map((service) => (
                    <motion.div
                      key={service.id}
                      className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/50 cursor-pointer hover:shadow-xl transition-all duration-300 relative"
                      whileHover={{ scale: 1.02, y: -5 }}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      onClick={() => router.push(`/provider/${service.id}`)}
                    >
                      {/* Hover Tooltip */}
                      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-emerald-600/80 to-emerald-500/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-10">
                        <div className="bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-emerald-600 font-semibold mb-1">Click to view detailed profile</p>
                          <p className="text-gray-600 text-sm">See full information, certifications, and contact details</p>
                        </div>
                      </div>

                      <div className="p-6 relative">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.name}</h3>
                        <div className="flex items-center mb-4">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-2 text-sm font-medium text-gray-700">
                            {service.rating}
                          </span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span className="text-sm text-gray-600">
                            {service.reviews} reviews
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm mb-4">
                          <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                          <span className="text-gray-700">{service.location}</span>
                          <span className="mx-2">-</span>
                          <span className="font-medium text-emerald-600">{service.distance}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <span className="mr-2">📞</span>
                          <span className="text-gray-700">{service.contacts}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Map View */}
                {userLocation && (
                  <div className="rounded-xl overflow-hidden shadow-xl border border-white/50 h-[calc(100vh-300px)] sticky top-6 bg-white/80 backdrop-blur-sm">
                    <MapView services={services} userLocation={userLocation} />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {!selectedCategory && (
          <motion.div
            className="relative overflow-hidden text-center p-12 rounded-2xl shadow-xl border border-white/50 bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-xl text-gray-700 mb-8">
                Select a category from the options above to find nearby service providers.
              </p>
              
              {/* Aceternity UI Cards replacing 3D Model */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                {[
                  {
                    title: 'Professional Service',
                    description: 'Our vetted technicians provide top-quality repair services for all your home appliances',
                    icon: ShieldCheck,
                    image: 'https://images.unsplash.com/photo-1581092921461-7031e699bbd9?q=80&w=2070&auto=format&fit=crop'
                  },
                  {
                    title: 'Quick Response',
                    description: 'Get same-day service from experienced professionals at your doorstep',
                    icon: Clock,
                    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop'
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    className="group relative h-[300px] rounded-2xl overflow-hidden shadow-xl perspective-1000"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover="hover"
                  >
                    {/* Animated mask/overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/40 to-emerald-900/10 z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    
                    {/* Animated pattern overlay */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay z-20"></div>
                    
                    {/* Image with enhanced zoom effect */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      variants={{
                        hover: { 
                          scale: 1.15, 
                          transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] } 
                        }
                      }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </motion.div>
                    
                    {/* Content wrapper with enhanced effects */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
                      {/* Spotlight effect that follows mouse */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-radial from-white/20 to-transparent bg-[length:200px_200px] bg-[center_center] group-hover:bg-[left_center] duration-500"></div>
                      
                      {/* Card content with enhanced animations */}
                      <motion.div 
                        className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg"
                        variants={{
                          hover: { 
                            y: -15, 
                            transition: { duration: 0.5, ease: [0.1, 1, 0.3, 1] } 
                          }
                        }}
                      >
                        <div className="flex items-start mb-4">
                          <div className="p-3 bg-emerald-100 rounded-lg transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:shadow-lg">
                            <card.icon className="h-6 w-6 text-emerald-600" />
                          </div>
                          <motion.h3 
                            className="text-xl font-bold ml-4 mt-1 text-gray-900"
                            variants={{
                              hover: { 
                                color: "#059669", 
                                x: 5,
                                transition: { duration: 0.3 } 
                              }
                            }}
                          >{card.title}</motion.h3>
                        </div>
                        <p className="text-gray-700">{card.description}</p>
                        
                        {/* Action button that appears on hover */}
                        <motion.div 
                          className="mt-4 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          variants={{
                            hover: { 
                              height: 'auto', 
                              opacity: 1,
                              transition: { duration: 0.3, delay: 0.1 } 
                            }
                          }}
                        >
                          <button className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center">
                            Learn more
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Steps section with enhanced UI */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  'Select a service category',
                  'View nearby providers',
                  'Compare ratings & reviews',
                  'Book your service'
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-emerald-100/50 overflow-hidden relative shadow-md hover:shadow-xl transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(16, 185, 129, 0.15)" }}
                  >
                    {/* Background pattern */}
                    <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-100 opacity-30 group-hover:scale-150 group-hover:opacity-50 transition-all duration-700"></div>
                    
                    {/* Step number with enhanced animation */}
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-5 relative z-10 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[360deg] transform-gpu">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Content with animations */}
                    <div>
                      <h4 className="text-lg font-bold text-emerald-600 mb-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">{`Step ${index + 1}`}</h4>
                      <p className="text-gray-700 relative z-10">{step}</p>
                    </div>
                    
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-400 to-emerald-600 group-hover:w-full transition-all duration-500"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
} 