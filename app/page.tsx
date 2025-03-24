"use client"
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ArrowRight, WashingMachine, Wind, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="relative text-center mb-24"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 3D Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 bg-emerald-400 rounded-full opacity-20 blur-2xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-20 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:text-left">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Trusted Partner for
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                  Home Appliance Services
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Expert repair and maintenance services for all your home appliances.
                Professional technicians at your doorstep.
              </motion.p>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
                >
                  Book a Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="lg:w-1/2 mt-10 lg:mt-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-2xl">
                {/* Enhanced Aceternity UI Card with hover effect */}
                <div className="h-full w-full relative group">
                  {/* Animated background gradients */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white rounded-xl transition-all duration-500 ease-out group-hover:opacity-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-white opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500"></div>
                  
                  {/* Floating particles for visual interest */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className={`absolute rounded-full ${
                          i % 3 === 0 ? 'w-3 h-3 bg-emerald-300 opacity-10' :
                          i % 3 === 1 ? 'w-4 h-4 bg-emerald-400 opacity-20' :
                          'w-5 h-5 bg-emerald-500 opacity-30'
                        }`}
                        initial={{ 
                          x: `${20 + (i * 15)}%`, 
                          y: `${15 + (i * 12)}%`,
                          scale: 0.8 + (i * 0.1)
                        }}
                        animate={{ 
                          x: [`${20 + (i * 15)}%`, `${15 + ((i+2) * 12)}%`, `${20 + (i * 15)}%`],
                          y: [`${15 + (i * 12)}%`, `${20 + ((i+1) * 10)}%`, `${15 + (i * 12)}%`],
                          scale: [0.8 + (i * 0.1), 1 + (i * 0.1), 0.8 + (i * 0.1)]
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Main card content */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full overflow-hidden bg-white/80 backdrop-blur-sm rounded-lg shadow-xl border border-white transition-all duration-500 ease-out group-hover:scale-95 group-hover:border-emerald-100">
                      {/* Border glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-lg blur opacity-30 group-hover:opacity-100 group-hover:blur-md transition duration-1000 group-hover:duration-200"></div>
                      
                      {/* Spotlight effect */}
                      <div className="absolute -inset-px bg-gradient-to-tr from-transparent via-emerald-100/50 to-transparent opacity-0 group-hover:opacity-100 rounded-lg pointer-events-none transition-opacity duration-700 blur-sm"></div>
                      
                      {/* Content container */}
                      <div className="relative bg-white/90 p-8 h-full flex flex-col justify-center items-center rounded-lg">
                        {/* Icon with enhanced animation */}
                        <div className="relative">
                          <div className="absolute -inset-4 bg-emerald-100 rounded-full opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 blur-xl"></div>
                          <WashingMachine className="h-24 w-24 text-emerald-500 relative z-10 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                        </div>
                        
                        {/* Text content with enhanced animations */}
                        <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3 text-center transition-all duration-300 group-hover:text-emerald-600 group-hover:translate-y-[-5px]">Smart Appliance Care</h3>
                        <p className="text-gray-600 text-center mb-6 max-w-xs transition-all duration-300 group-hover:text-gray-700">Expert technicians with cutting-edge diagnostics for all major brands and models</p>
                        
                        {/* Stats that appear on hover */}
                        <div className="grid grid-cols-3 gap-4 w-full opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                          {[
                            { value: '98%', label: 'Success Rate' },
                            { value: '24h', label: 'Response Time' },
                            { value: '2k+', label: 'Happy Clients' }
                          ].map((stat, index) => (
                            <div key={index} className="text-center">
                              <div className="text-lg font-bold text-emerald-600">{stat.value}</div>
                              <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: WashingMachine, title: 'Appliance Repair', desc: 'Expert repair services for washing machines, refrigerators, and more.' },
            { icon: Wind, title: 'AC Services', desc: 'Installation, maintenance, and repair services for all AC brands.' },
            { icon: Zap, title: 'Quick Response', desc: 'Same-day service with experienced technicians at your doorstep.' }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="group relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/50 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ translateY: -8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <feature.icon className="h-12 w-12 text-emerald-600 mb-4 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-600 relative z-10">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Experience Section (replaced 3D with Aceternity UI Card) */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4">Professional Repair Experience</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expert technicians are equipped with the right tools and knowledge to fix your appliances.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Refrigerator Repair', 
                description: 'Expert solutions for all refrigerator issues and maintenance needs.',
                icon: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=300&auto=format&fit=crop', 
              },
              { 
                title: 'Washing Machine Service', 
                description: 'Professional diagnostics and repairs for all washing machine models.',
                icon: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=300&auto=format&fit=crop', 
              },
              { 
                title: 'Expert Technicians', 
                description: 'Certified professionals with years of experience in appliance repair.',
                icon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=300&auto=format&fit=crop', 
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="group h-[400px] relative bg-white rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/30 to-transparent opacity-80 z-10 transition-opacity duration-300 group-hover:opacity-70"></div>
                  {item.icon && (
                    <Image 
                      src={item.icon}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  )}
                </div>
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 transition-all duration-300 group-hover:translate-y-[-15px]">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                  <div className="mt-4 opacity-0 transform translate-y-8 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link href="/services" className="inline-flex items-center text-white">
                      <span>Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-12">Why Choose DrWhite?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: 'Certified Technicians', icon: CheckCircle2 },
              { title: '90-Day Warranty', icon: CheckCircle2 },
              { title: 'Transparent Pricing', icon: CheckCircle2 },
              { title: '24/7 Support', icon: CheckCircle2 }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="group bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center">
                  <item.icon className="h-8 w-8 text-emerald-600 mb-3" />
                  <p className="font-semibold text-gray-800">{item.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full opacity-10 blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full opacity-10 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Book a service today and experience the best in home appliance care.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-white/25"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
