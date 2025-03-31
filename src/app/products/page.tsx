"use client";
import { useEffect, useState } from "react";
import ProductForm from "./productForm";
import { Product, ApiResponse, ProductPayload } from "@/lib/types"; // Import types

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data: Product[] = await res.json();
    if (data?.length > 0) setProducts(data);
  };

  const deleteProduct = async (productId: number) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const addOrUpdateProduct = async (formData: ProductPayload) => {
    const url = "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    setShowModal(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const markOutOfStock = async (productId: number) => {
    try {
      await fetch(`/api/products`, {
        method: "PUT",
        body: JSON.stringify({ quantity: 0, id: productId }),
        headers: { "Content-Type": "application/json" },
      });

      fetchProducts();
    } catch (error) {
      console.error("Failed to mark as out of stock:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
          className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0"
        >
          + Add New Product
        </button>
      </div>

      {/* Product List */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 rounded-lg p-4 shadow-lg relative">
            {/* Product Image */}
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title || "Product Image"}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}

            {/* Product Details */}
            <h2 className="text-lg font-semibold">{product.title || "No Title"}</h2>
            <p className="text-sm text-gray-400">{product.description || "No Description"}</p>
            <p className="text-sm text-gray-300">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className={`text-sm ${product.quantity > 0 ? "text-gray-300" : "text-red-500"}`}>
              <strong>Stock:</strong> {product.quantity > 0 ? `${product.quantity} pcs` : "Out of Stock"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                 onClick={() => {
                    setEditingProduct(product);
                    setShowModal(true);
                  }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 text-xs rounded"
              >
                Edit
              </button>

              <button
                onClick={() => markOutOfStock(product.id!)}
                className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 text-xs rounded"
              >
                Out of Stock
              </button>

              <button
                 onClick={() => deleteProduct(product.id!)}
                className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {/* Modal for Add/Edit Product */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <ProductForm onSubmit={addOrUpdateProduct} initialData={editingProduct} />
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="mt-4 w-full bg-red-500 hover:bg-red-400 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}