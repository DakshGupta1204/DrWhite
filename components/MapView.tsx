"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Star } from 'lucide-react';

// Define interface for Leaflet icon prototype with the _getIconUrl property
interface IconDefaultPrototype extends L.Icon.Default {
  _getIconUrl?: (name: string) => string;
}

// Fix for default marker icons in Next.js
delete ((L.Icon.Default.prototype) as IconDefaultPrototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
});

// Create custom icons for user and service providers
const userIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'user-marker-icon' // This class will be used to style the marker green
});

const serviceIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'service-marker-icon' // This class will be used to style the marker blue
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

interface MapViewProps {
  services: Service[];
  userLocation: {
    lat: number;
    lng: number;
  };
}

const MapView = ({ services, userLocation }: MapViewProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <style jsx global>{`
        .user-marker-icon {
          filter: hue-rotate(225deg) saturate(4) brightness(1.2); /* Makes the marker green */
        }
        .service-marker-icon {
          filter: hue-rotate(150deg) saturate(8) brightness(1.2); /* Makes the marker red */
        }
      `}</style>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        className="rounded-xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-semibold text-emerald-600">Your Location</p>
            </div>
          </Popup>
        </Marker>

        {/* Service Provider Markers */}
        {services.map((service) => (
          service.position && (
            <Marker
              key={service.id}
              position={[service.position.lat, service.position.lng]}
              icon={serviceIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{service.location}</p>
                  <p className="text-sm text-gray-600 mb-1">Distance: {service.distance}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {service.contacts}
                  </p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </>
  );
};

export default MapView; 