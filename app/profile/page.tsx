"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  User, 
  Shield, 
  Clock, 
  Calendar, 
  Edit, 
  MapPin, 
  History, 
  LogOut,
  Settings
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import Image1 from "../../public/rabbit.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'settings'>('profile');
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        toast.error("You are not logged in");
      }
    }
  }, [router]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    // Added fields for improved profile
    joinedDate: "April 2023",
    location: "New York, NY",
    completedServices: 12,
    favoriteServices: ["Washing Machine Repair", "AC Servicing"],
    lastLogin: "2 days ago",
  });

  // Mock service history data
  const serviceHistory = [
    { id: 1, service: "Washing Machine Repair", provider: "QuickFix Services", date: "May 15, 2023", status: "Completed", amount: "$89.99" },
    { id: 2, service: "AC Maintenance", provider: "CoolAir Technicians", date: "June 20, 2023", status: "Completed", amount: "$120.00" },
    { id: 3, service: "Refrigerator Service", provider: "ColdKeeper", date: "July 8, 2023", status: "Completed", amount: "$75.50" },
    { id: 4, service: "TV Repair", provider: "PixelPerfect", date: "August 12, 2023", status: "Cancelled", amount: "N/A" },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:3001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Merge the API data with our mock data
        setUser(prev => ({
          ...prev,
          ...response.data
        }));
        
        // Trigger the animation after data is loaded
        setTimeout(() => setShowAnimation(true), 300);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handler for logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-30 pointer-events-none"></div>
      
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
              <div className="mt-4 text-emerald-600 font-medium text-center">Loading your profile...</div>
            </div>
          </div>
        ) : (
          <>
            {/* Profile Header - Enhanced with animation and better styling */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Background gradient pattern */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
              
              <div className="relative pt-16 pb-8 px-8">
                <div className="flex flex-col md:flex-row items-center">
                  {/* Profile image with animated border */}
                  <div className="relative mb-6 md:mb-0">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 ${showAnimation ? 'animate-pulse' : ''}`} style={{ padding: '4px' }}></div>
                    <Image
                      src={Image1}
                      alt="User Profile"
                      width={120}
                      height={120}
                      priority
                      className="rounded-full border-4 border-white relative z-10"
                    />
                  </div>
                  
                  {/* User info */}
                  <div className="md:ml-8 text-center md:text-left flex-1">
                    <div className="flex items-center md:items-start mb-4 items-center gap-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {user.name || "Welcome Back!"}
                    </h2>
                    <p className="text-white font-medium my-auto">{user.role || "Customer"}</p>
                    </div>
                    
                    
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-500" />
                        <span className="text-sm">Joined {user.joinedDate}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-emerald-500" />
                        <span className="text-sm">Last login {user.lastLogin}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-6 md:mt-0 space-x-3">
                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors duration-300 inline-flex items-center cursor-pointer">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 transition-colors duration-300 inline-flex items-center cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Profile Navigation Tabs */}
              <div className="border-t border-gray-100 px-8">
                <div className="flex overflow-x-auto space-x-8">
                  {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'history', label: 'Service History', icon: History },
                    { id: 'settings', label: 'Settings', icon: Settings },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } transition-colors duration-200 flex items-center`}
                      onClick={() => setActiveTab(tab.id as 'profile' | 'history' | 'settings')}
                    >
                      <tab.icon className="h-4 w-4 mr-2" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Content Area - Changes based on active tab */}
            <div className="grid gap-8">
              {/* Profile Details */}
              {activeTab === 'profile' && (
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Contact Information */}
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 col-span-3 md:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-emerald-500" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                        <Mail className="h-5 w-5 text-emerald-600 mr-4" />
                        <div>
                          <p className="text-gray-500 text-sm">Email Address</p>
                          <p className="text-gray-800 font-medium">{user.email || "Not provided"}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                        <Phone className="h-5 w-5 text-emerald-600 mr-4" />
                        <div>
                          <p className="text-gray-500 text-sm">Phone Number</p>
                          <p className="text-gray-800 font-medium">{user.phone || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-emerald-50 rounded-lg border border-emerald-100 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                        <MapPin className="h-5 w-5 text-emerald-600 mr-4" />
                        <div>
                          <p className="text-gray-500 text-sm">Location</p>
                          <p className="text-gray-800 font-medium">{user.location || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Stats and Quick Info */}
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 col-span-3 md:col-span-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-emerald-500" />
                      Account Summary
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-lg">
                        <p className="text-gray-500 text-sm">Completed Services</p>
                        <p className="text-2xl font-bold text-emerald-600">{user.completedServices}</p>
                      </div>
                      
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-gray-500 text-sm">Member Since</p>
                        <p className="text-gray-800 font-medium">{user.joinedDate}</p>
                      </div>
                      
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <p className="text-gray-500 text-sm">Account Type</p>
                        <p className="text-gray-800 font-medium">{user.role || "Customer"}</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Favorite Services */}
                  <motion.div
                    className="bg-white p-6 rounded-xl shadow-md border border-emerald-100 col-span-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Favorite Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.favoriteServices.map((service, index) => (
                        <div 
                          key={index}
                          className="group p-4 bg-white rounded-lg border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-emerald-300 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                              <Shield className="h-5 w-5 text-emerald-600" />
                            </div>
                            <span className="font-medium text-gray-800">{service}</span>
                          </div>
                          <Link href="/services" className="text-emerald-600 text-sm hover:underline">Book Again</Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
              
              {/* Service History Tab */}
              {activeTab === 'history' && (
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-emerald-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <History className="h-5 w-5 mr-2 text-emerald-500" />
                    Service History
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {serviceHistory.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.service}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{item.provider}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{item.date}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">{item.amount}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-emerald-600 hover:text-emerald-800 cursor-pointer">View Details</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
              
              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md border border-emerald-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-emerald-500" />
                    Account Settings
                  </h3>
                  
                  <div className="space-y-6 max-w-xl">
                    {/* Profile Settings */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors duration-300">
                      <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
                      <p className="text-gray-500 text-sm mb-4">Update your personal information and how it is displayed on your profile.</p>
                      <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-300 text-sm">
                        Edit Profile
                      </button>
                    </div>
                    
                    {/* Password Settings */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors duration-300">
                      <h4 className="font-medium text-gray-900 mb-2">Password</h4>
                      <p className="text-gray-500 text-sm mb-4">Change your password and manage your account security.</p>
                      <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-300 text-sm">
                        Change Password
                      </button>
                    </div>
                    
                    {/* Notification Settings */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-emerald-200 transition-colors duration-300">
                      <h4 className="font-medium text-gray-900 mb-2">Notifications</h4>
                      <p className="text-gray-500 text-sm mb-4">Manage your email and system notifications preferences.</p>
                      <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors duration-300 text-sm">
                        Notification Settings
                      </button>
                    </div>
                    
                    {/* Account Actions */}
                    <div className="p-4 border border-red-100 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Account Actions</h4>
                      <p className="text-gray-500 text-sm mb-4">Advanced actions for your account management.</p>
                      <div className="space-x-3">
                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-300 text-sm">
                          Delete Account
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
