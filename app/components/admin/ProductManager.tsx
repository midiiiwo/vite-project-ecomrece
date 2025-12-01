import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../stores/useAdminStore";
import { ProductForm } from "./ProductForm";
import type { Product } from "../../stores/useStore";

export function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useAdminStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; productId: string | null }>({ isOpen: false, productId: null });
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({ isOpen: false, message: "", type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleAdd = (data: Omit<Product, "id">) => {
    addProduct(data);
    setIsFormOpen(false);
    setEditingId(null);
    setToast({ isOpen: true, message: "Product added successfully!", type: 'success' });
    setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
  };

  const handleEdit = (data: Omit<Product, "id">) => {
    if (editingId) {
      updateProduct(editingId, data);
      setEditingId(null);
      setIsFormOpen(false);
      setToast({ isOpen: true, message: "Product updated successfully!", type: 'success' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, productId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.productId) {
      deleteProduct(deleteConfirm.productId);
      setDeleteConfirm({ isOpen: false, productId: null });
      setToast({ isOpen: true, message: "Product deleted successfully!", type: 'success' });
      
      setTimeout(() => {
        setToast({ isOpen: false, message: "", type: 'success' });
      }, 5000);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, productId: null });
  };

  const handleEditClick = (product: Product) => {
    setEditingId(product.id);
    setIsFormOpen(true);
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <>
      <main className="flex-1 overflow-auto">
      <div className="space-y-6 p-0 md:p-8">
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
          onChange={handleSearchChange}
          className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1); // Reset to first page on filter change
          }}
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
                {paginatedProducts.map((product) => (
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
                        {/* <p className="text-sm text-gray-400">{product.id}</p> */}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">
                        GHC {product.price.toFixed(2)}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-orange-900/20">
                <h2 className="text-2xl font-bold text-white">Delete Product?</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this product? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors backdrop-blur"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {toast.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm ${
              toast.type === 'success' ? 'bg-white text-green-600' : 'bg-white text-red-600'
            }`}>
              {toast.type === 'success' ? '✓' : '✕'}
            </div>
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}