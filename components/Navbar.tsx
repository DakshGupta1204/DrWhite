"use client"
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
          
          // Check if user is admin
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            if (response.ok) {
              const userData = await response.json();
              setIsAdmin(userData.isAdmin || false);
            }
          } catch (error) {
            console.error("Error checking admin status:", error);
          }
        } else {
          setIsLoggedIn(false);
          setIsAdmin(false);
        }
      }
    };
    
    checkAuth();
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">FixKaro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/services" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            
            {isAdmin && (
              <Link href="/admin" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-150">
                Admin
              </Link>
            )}
            
            {isLoggedIn ? (
              <Link href="/profile" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition duration-150">
                Profile
              </Link>
            ) : (
              <Link href="/auth" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition duration-150">
                SignIn
              </Link>
            )}

            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  toast.success('Logged out successfully');
                  router.push('/');
                }}
                className="bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition duration-150 cursor-pointer hover:bg-red-700 hover:text-white"
              >
                LogOut
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}