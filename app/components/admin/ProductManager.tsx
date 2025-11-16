import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../stores/useAdminStore";
import { ProductForm } from "./ProductForm";
import type { Product } from "../../stores/useStore";

export function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } =
    useAdminStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const editingProduct = editingId
    ? products.find((p) => p.id === editingId)
    : undefined;

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = (data: Omit<Product, "id">) => {
    addProduct(data);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleEdit = (data: Omit<Product, "id">) => {
    if (editingId) {
      updateProduct(editingId, data);
      setEditingId(null);
      setIsFormOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      deleteProduct(id);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Product Manager</h1>
          <p className="text-gray-400 mt-1">
            Manage your product catalog ({filteredProducts.length} products)
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setIsFormOpen(true);
          }}
          disabled={isFormOpen}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-blue-500/30"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleFormCancel}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Edit Product" : "Add New Product"}
                </h2>
              </div>
              <div className="p-6">
                <ProductForm
                  product={editingProduct}
                  onSubmit={editingId ? handleEdit : handleAdd}
                  onCancel={handleFormCancel}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by product name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">
              {searchTerm || categoryFilter
                ? "No products match your filters"
                : "No products yet. Click 'Add Product' to create one."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {filteredProducts.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-400">{product.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">
                        ${product.price.toFixed(2)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-400 truncate max-w-xs">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-2 px-3 py-1 text-sm text-red-400 hover:bg-red-500/20 rounded transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
