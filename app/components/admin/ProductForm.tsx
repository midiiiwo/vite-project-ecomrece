import { useState, useEffect } from "react";
import type { Product } from "../../stores/useStore";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, "id">) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

const CATEGORIES = [
  "Fashion",
  "Electronics",
  "Footwear",
  "Accessories",
  "Smart Watches",
  "Fragrances",
  "Children's Wear",
];

export function ProductForm({
  product,
  onSubmit,
  isLoading = false,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        image: product.image || "",
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description.trim(),
      image: formData.image.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className={`w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur ${
            errors.name ? "border-red-500" : "border-gray-600/50"
          }`}
          placeholder="Enter product name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Price (GHS)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
          className={`w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur ${
            errors.price ? "border-red-500" : "border-gray-600/50"
          }`}
          placeholder="0.00"
        />
        {errors.price && (
          <p className="mt-1 text-sm text-red-400">{errors.price}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className={`w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur ${
            errors.category ? "border-red-500" : "border-gray-600/50"
          }`}
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-400">{errors.category}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Description <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className={`w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none backdrop-blur border-gray-600/50`}
          placeholder="Enter product description (optional)"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Image URL (optional)
        </label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors backdrop-blur"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30"
        >
          {isLoading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
