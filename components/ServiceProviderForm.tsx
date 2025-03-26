"use client";

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
  iconName: string;
  description?: string;
  isActive: boolean;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  label: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface Contact {
  type: "mobile" | "landline" | "email";
  value: string;
}

interface OpeningHours {
  open: string;
  close: string;
}

interface ServiceProviderFormProps {
  initialData?: {
    _id?: string;
    name?: string;
    category?: { _id: string } | string;
    address?: Address;
    location?: Location;
    contacts?: Contact[];
    rating?: number;
    reviews?: number;
    priceRange?: string;
    isVerified?: boolean;
    isAvailable?: boolean;
    description?: string;
    images?: string[];
    openingHours?: Record<string, OpeningHours>;
    services?: string[];
    experienceYears?: number;
    certifications?: string[];
  } | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function ServiceProviderForm({
  initialData,
  onSubmit,
  onCancel,
}: ServiceProviderFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category ? 
      (typeof initialData.category === 'string' ? initialData.category : initialData.category._id) : 
      "",
    address: {
      street: initialData?.address?.street || "",
      city: initialData?.address?.city || "",
      state: initialData?.address?.state || "",
      zipCode: initialData?.address?.zipCode || "",
      label: initialData?.address?.label || "",
    },
    location: {
      lat: initialData?.location?.lat || 0,
      lng: initialData?.location?.lng || 0,
    },
    contacts: initialData?.contacts || [{ type: "mobile", value: "" }],
    rating: initialData?.rating || 0,
    reviews: initialData?.reviews || 0,
    priceRange: initialData?.priceRange || "Varies",
    isVerified: initialData?.isVerified || false,
    isAvailable: initialData?.isAvailable ?? true,
    description: initialData?.description || "",
    images: initialData?.images || [],
    openingHours: initialData?.openingHours || {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: "09:00", close: "17:00" },
      sunday: { open: "", close: "" },
    },
    services: initialData?.services || [""],
    experienceYears: initialData?.experienceYears || 0,
    certifications: initialData?.certifications || [],
  });

  const isEditing = !!initialData?._id;
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error loading categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => {
        // Create a type-safe copy of the parent object
        const parentKey = parent as keyof typeof prev;
        const parentValue = prev[parentKey];
        const updatedParentValue = typeof parentValue === 'object' && parentValue !== null 
          ? { ...parentValue as object, [child]: value }
          : { [child]: value };
        
        return {
          ...prev,
          [parent]: updatedParentValue
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));

    // Auto-generate the label if street, city, and state are filled
    if (
      name === "street" ||
      name === "city" ||
      name === "state" ||
      name === "zipCode"
    ) {
      const updatedAddress = {
        ...formData.address,
        [name]: value,
      };

      if (
        updatedAddress.street &&
        updatedAddress.city &&
        updatedAddress.state
      ) {
        const label = `${updatedAddress.street}, ${updatedAddress.city}, ${
          updatedAddress.state
        }${updatedAddress.zipCode ? ` ${updatedAddress.zipCode}` : ""}`;
        
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            [name]: value,
            label,
          },
        }));
      }
    }
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: parseFloat(value) || 0,
      },
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleContactChange = (
    index: number,
    field: "type" | "value",
    value: string
  ) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  const handleAddContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { type: "mobile", value: "" }],
    }));
  };

  const handleRemoveContact = (index: number) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts.splice(index, 1);
    setFormData((prev) => ({ ...prev, contacts: updatedContacts }));
  };

  const handleHoursChange = (
    day: string,
    field: "open" | "close",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: {
          ...prev.openingHours[day as keyof typeof prev.openingHours],
          [field]: value,
        },
      },
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = value;
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, ""],
    }));
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = [...formData.services];
    updatedServices.splice(index, 1);
    setFormData((prev) => ({ ...prev, services: updatedServices }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError("Provider name is required");
      return;
    }
    
    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    if (!formData.address.street || !formData.address.city || !formData.address.state) {
      setError("Please fill in all address fields");
      return;
    }

    if (formData.location.lat === 0 && formData.location.lng === 0) {
      setError("Please provide valid coordinates");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const url = isEditing 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/providers/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/providers`;
      
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save service provider");
      }

      toast.success(isEditing ? "Provider updated successfully" : "Provider added successfully");
      onSubmit();
    } catch (error: Error | unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto p-2">
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Provider Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="e.g., Quick Fix Appliances"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Describe this service provider..."
              rows={3}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Address & Location</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="123 Main St"
                required
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Anytown"
                required
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="CA"
                required
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="12345"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
              Full Address (Auto-generated)
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={formData.address.label}
              onChange={handleAddressChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="lat" className="block text-sm font-medium text-gray-700 mb-1">
                Latitude *
              </label>
              <input
                type="number"
                id="lat"
                name="lat"
                value={formData.location.lat}
                onChange={handleLocationChange}
                step="0.0000001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label htmlFor="lng" className="block text-sm font-medium text-gray-700 mb-1">
                Longitude *
              </label>
              <input
                type="number"
                id="lng"
                name="lng"
                value={formData.location.lng}
                onChange={handleLocationChange}
                step="0.0000001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Contact Information</h3>
          
          {formData.contacts.map((contact: Contact, index: number) => (
            <div key={index} className="flex items-end space-x-2">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {index === 0 ? "Contact Type *" : "Contact Type"}
                </label>
                <select
                  value={contact.type}
                  onChange={(e) => handleContactChange(index, "type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required={index === 0}
                >
                  <option value="mobile">Mobile</option>
                  <option value="landline">Landline</option>
                  <option value="email">Email</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {index === 0 ? "Contact Value *" : "Contact Value"}
                </label>
                <input
                  type={contact.type === "email" ? "email" : "text"}
                  value={contact.value}
                  onChange={(e) => handleContactChange(index, "value", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder={
                    contact.type === "email" ? "email@example.com" : "Contact number"
                  }
                  required={index === 0}
                />
              </div>
              
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveContact(index)}
                  className="px-2 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddContact}
            className="text-sm text-emerald-600 hover:text-emerald-800"
          >
            + Add another contact
          </button>
        </div>

        {/* Business Details */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Business Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <input
                type="text"
                id="priceRange"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., $50-$100"
              />
            </div>
            
            <div>
              <label htmlFor="experienceYears" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                min="0"
                value={formData.experienceYears}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isVerified"
                    name="isVerified"
                    checked={formData.isVerified}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="isVerified" className="ml-2 text-sm text-gray-700">
                    Verified
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="isAvailable" className="ml-2 text-sm text-gray-700">
                    Available
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Offered */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Services Offered</h3>
          
          {formData.services.map((service: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Washing Machine Repair"
                required={index === 0}
              />
              
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveService(index)}
                  className="px-2 py-2 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddService}
            className="text-sm text-emerald-600 hover:text-emerald-800"
          >
            + Add another service
          </button>
        </div>

        {/* Business Hours */}
        <div className="space-y-4 col-span-2">
          <h3 className="font-medium text-gray-900 border-b pb-1">Business Hours</h3>
          
          <div className="grid grid-cols-7 gap-2 text-xs font-medium text-center">
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div key={day} className="space-y-1">
                <input
                  type="time"
                  value={formData.openingHours[day as keyof typeof formData.openingHours]?.open || ""}
                  onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                  className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="time"
                  value={formData.openingHours[day as keyof typeof formData.openingHours]?.close || ""}
                  onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                  className="w-full px-1 py-1 border border-gray-300 rounded-md text-sm"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">Leave both fields empty for closed days.</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Saving..." : isEditing ? "Update Provider" : "Add Provider"}
        </button>
      </div>
    </form>
  );
} 