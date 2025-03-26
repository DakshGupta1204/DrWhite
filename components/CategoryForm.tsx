"use client";

import { useState } from "react";
import { 
  WashingMachine, 
  Wind, 
  Refrigerator, 
  Tv, 
  Microwave, 
  Droplets,
  AlertCircle,
  Check
} from "lucide-react";
import toast from "react-hot-toast";

interface CategoryFormProps {
  initialData?: {
    _id?: string;
    name: string;
    iconName: string;
    description?: string;
    isActive: boolean;
  } | null;
  onSubmit: () => void;
  onCancel: () => void;
}

const icons = [
  { name: "WashingMachine", icon: WashingMachine },
  { name: "Wind", icon: Wind },
  { name: "Refrigerator", icon: Refrigerator },
  { name: "Tv", icon: Tv },
  { name: "Microwave", icon: Microwave },
  { name: "Droplets", icon: Droplets },
];

export default function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    iconName: initialData?.iconName || "",
    description: initialData?.description || "",
    isActive: initialData?.isActive ?? true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!initialData?._id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleIconSelect = (iconName: string) => {
    setFormData((prev) => ({ ...prev, iconName }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Category name is required");
      return;
    }
    
    if (!formData.iconName) {
      setError("Please select an icon");
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
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${initialData._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/categories`;
      
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
        throw new Error(error.message || "Failed to save category");
      }

      toast.success(isEditing ? "Category updated successfully" : "Category added successfully");
      onSubmit();
    } catch (error: Error | unknown) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Category Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="e.g., Washing Machine Repair"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="iconName" className="block text-sm font-medium text-gray-700 mb-1">
          Icon *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {icons.map((iconItem) => {
            const Icon = iconItem.icon;
            const isSelected = formData.iconName === iconItem.name;
            
            return (
              <button
                key={iconItem.name}
                type="button"
                onClick={() => handleIconSelect(iconItem.name)}
                className={`border p-3 rounded-md flex flex-col items-center transition-colors ${
                  isSelected
                    ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                    : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs">{iconItem.name}</span>
                {isSelected && (
                  <div className="absolute top-1 right-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Describe this category..."
          rows={3}
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 focus:ring-offset-0"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
            Active
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Inactive categories will not be visible to users.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
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
          {loading ? "Saving..." : isEditing ? "Update Category" : "Add Category"}
        </button>
      </div>
    </form>
  );
} 