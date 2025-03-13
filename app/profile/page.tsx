"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import axios from "axios"; // Import axios
import Image1 from "../../public/rabbit.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
        toast.error("You are already logged in");
      }
    }
  }, [router]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) return;

        const response = await axios.get("http://localhost:3001/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Set user data
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md text-center border border-emerald-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={Image1}
              alt="User Profile"
              width={120}
              height={120}
              className="rounded-full border-4 border-emerald-600 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {user ? user.name : "Loading..."}
            </h2>
            <p className="text-gray-600">{user ? user.role : "Loading..."}</p>
          </div>
        </motion.div>

        {/* Profile Details */}
        <div className="mt-8 space-y-4">
          {user && (
            <>
              <motion.div
                className="flex items-center bg-emerald-50 p-4 rounded-lg border border-emerald-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Mail className="h-6 w-6 text-emerald-600 mr-4" />
                <div>
                  <p className="text-gray-800 font-semibold">Email</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center bg-emerald-50 p-4 rounded-lg border border-emerald-100"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Phone className="h-6 w-6 text-emerald-600 mr-4" />
                <div>
                  <p className="text-gray-800 font-semibold">Phone</p>
                  <p className="text-gray-600">{user.phone || "Not provided"}</p>
                </div>
              </motion.div>
            </>
          )}
        </div>

      </div>
    </>
  );
}
