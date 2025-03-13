"use client"
import Link from 'next/link';
import { Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsLoggedIn(token ? true : false);
    }
  }, [])

  const router = useRouter();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">DrWhite</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/services" className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium">
              Services
            </Link>
            {isLoggedIn ? <Link href="/profile" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition duration-150">
              Profile
            </Link> :
              <Link href="/auth" className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition duration-150">
                SignIn
              </Link>}

            {
              isLoggedIn && (
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
              )
            }

          </div>
        </div>
      </div>
    </nav>
  );
}