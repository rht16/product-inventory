"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/types"; 

type ProductFormProps = {
    onSubmit: (product: Product) => void;
    initialData?: Product | null;
  };

export default function ProductForm({ onSubmit, initialData }: ProductFormProps) {
    const [formData, setFormData] = useState<Product>({
        title: "",
        category: "",
        price: 0,
        quantity: 0,
        description: "",
        imageUrl: "",
      });

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg"
    >
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Product Name"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Product Description"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="imageUrl"
        type="url"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className="w-full p-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit button updates dynamically based on editing or adding */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg"
      >
        {initialData ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}