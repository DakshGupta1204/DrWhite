"use client"
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, WashingMachine, Wind, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Trusted Partner for
            <br />
            <span className="text-emerald-600">Home Appliance Services</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Expert repair and maintenance services for all your home appliances.
            Professional technicians at your doorstep.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-150"
            >
              Book a Service
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: WashingMachine, title: 'Appliance Repair', desc: 'Expert repair services for washing machines, refrigerators, and more.' },
            { icon: Wind, title: 'AC Services', desc: 'Installation, maintenance, and repair services for all AC brands.' },
            { icon: Zap, title: 'Quick Response', desc: 'Same-day service with experienced technicians at your doorstep.' }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-emerald-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="h-12 w-12 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">Why Choose DrWhite?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {['Certified Technicians', '90-Day Warranty', 'Transparent Pricing', '24/7 Support'].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-emerald-50 p-4 rounded-lg border border-emerald-100"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <p className="font-semibold text-emerald-800">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="bg-emerald-600 text-white rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
            Book a service today and experience the best in home appliance care.
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition duration-150"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
