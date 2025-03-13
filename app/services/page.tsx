"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Navbar from "@/components/Navbar";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Service{
  id: string;
  name: string;
  location: string;
  rating: string;
  reviews: number;
  price: string;
  distance: string;
  contacts: string;
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
}

const categories = [
  { id: "washing machine repair", name: "Washing Machine", icon: WashingMachine },
  { id: "AC repair", name: "Air Conditioning", icon: Wind },
  { id: "refrigerator repair", name: "Refrigerator", icon: Refrigerator },
  { id: "TV repair", name: "TV", icon: Tv },
  { id: "microwave repair", name: "Microwave", icon: Microwave },
  { id: "water purifier repair", name: "RO", icon: Droplets },
];


export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        toast.error("Please login to view services");
      }
    }
  }, [router]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchPlaces(lat, lon, selectedCategory);
      });
    } else {
      console.error("Geolocation not supported");
    }
  }, [selectedCategory]);

  const fetchPlaces = async (lat: number, lon: number, category: string | null) => {
    setLoading(true);
    try {
      const categoryQuery = category ? `q=${encodeURIComponent(category)}` : "";

      const url = `https://discover.search.hereapi.com/v1/discover?at=${lat},${lon}&limit=20&${categoryQuery}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.items) throw new Error("Invalid API response");

      const formattedData = data.items.map((place: Place) => ({
        id: place.id,
        name: place.title || "Unnamed Place",
        location: place.address?.label || "Unknown Location",
        rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Fake rating
        reviews: Math.floor(Math.random() * 200 + 50), // Fake reviews count
        price: "Varies",
        distance: place.distance ? `${(place.distance / 1000).toFixed(1)} km` : "Unknown", // Convert meters to km
        contacts: place.contacts?.[0]?.mobile?.map((c) => c.value).join(", ") || "No contact", // Join multiple numbers if available
      }));

      setServices(formattedData);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
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
                  className={`p-4 rounded-xl border transition duration-300 flex flex-col items-center ${selectedCategory === category.id
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-white border-gray-200 hover:border-emerald-200"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon
                    className={`h-8 w-8 mb-2 ${selectedCategory === category.id
                      ? "text-emerald-600"
                      : "text-gray-600"
                      }`}
                  />
                  <span
                    className={`text-sm font-medium ${selectedCategory === category.id
                      ? "text-emerald-600"
                      : "text-gray-600"
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
        {selectedCategory && <div>
          <h2 className="text-2xl font-bold mb-6">Available Services</h2>
          {loading ? (
            <p>Loading...</p>
          ) : services.length === 0 ? (
            <p>No services found in your area.</p>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-2 gap-6"
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
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                  whileHover={{ scale: 1.05 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">
                        {service.rating}
                      </span>
                      <span className="mx-1 text-gray-400">•</span>
                      <span className="text-sm text-gray-600">
                        {service.reviews} reviews
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.location} - <span className="ml-1 font-semibold">{service.distance}</span>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="mr-2">📞</span>
                      {service.contacts}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>}
        {
          !selectedCategory && (
            <div className="text-center p-6 rounded-lg shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                How It Works
              </h3>
              <p className="text-1xl text-gray-800">
                Select a category from the options above to find nearby service providers.
              </p>
              <ul className="text-gray-500 text-1xl mt-2 space-y-1 text-left w-[45%] ml-auto mr-auto">
                <li>✅ Click on a service (e.g., AC Repair, Washing Machine Repair).</li>
                <li>✅ We fetch nearby service providers based on your location.</li>
                <li>✅ View details like ratings, reviews, and locations.</li>
                <li>✅ Click on a service to get more details or book an appointment.</li>
              </ul>
              <p className="text-gray-600 mt-4">Start by selecting a category above!</p>
            </div>
          )
        }

      </div>
    </>
  );
}
