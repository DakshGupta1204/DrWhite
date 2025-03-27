import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/components/ToasterProvider";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixKaro Home Services | Professional Appliance Repair",
  description: "Expert home appliance repair services at your doorstep. Professional technicians for AC, refrigerator, washing machine repair and maintenance services with same-day appointments.",
  keywords: "home appliance repair, washing machine repair, refrigerator service, AC maintenance, appliance technician, same day repair, home services, FixKaro",
  metadataBase: new URL('https://dr-white.vercel.app'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FixKaro Home Services | Professional Appliance Repair",
    description: "Expert home appliance repair services at your doorstep. Professional technicians for all major appliance brands.",
    url: 'https://dr-white.vercel.app',
    siteName: 'FixKaro Home Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FixKaro Home Services - Professional Appliance Repair',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FixKaro Home Services | Professional Appliance Repair',
    description: 'Expert home appliance repair services with certified technicians. Same-day service available.',
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToasterProvider/>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
