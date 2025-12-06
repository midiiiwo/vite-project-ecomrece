import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../stores/useAdminStore";

export function CategoryManager() {
  const { products, addProduct } = useAdminStore();
  
  // Get unique categories from products
  const [categories, setCategories] = useState<Array<{ name: string; productCount: number }>>(() => {
    const categoryMap = new Map<string, number>();
    products.forEach(p => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });
    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, productCount: count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({ isOpen: false, message: "", type: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; categoryName: string | null }>({ isOpen: false, categoryName: null });

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ isOpen: true, message, type });
    setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
  };

  const handleAddCategory = () => {
    const trimmedName = newCategoryName.trim();
    
    if (!trimmedName) {
      showToast("Category name cannot be empty", "error");
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      showToast("This category already exists", "error");
      return;
    }

    setCategories([...categories, { name: trimmedName, productCount: 0 }].sort((a, b) => a.name.localeCompare(b.name)));
    setNewCategoryName("");
    setIsAddModalOpen(false);
    showToast(`Category "${trimmedName}" added successfully!`, "success");
  };

  const handleEditCategory = (oldName: string) => {
    const trimmedName = editName.trim();
    
    if (!trimmedName) {
      showToast("Category name cannot be empty", "error");
      return;
    }

    if (trimmedName === oldName) {
      setEditingId(null);
      setEditName("");
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === trimmedName.toLowerCase())) {
      showToast("This category name already exists", "error");
      return;
    }

    // Update category in the list
    const updatedCategories = categories.map(cat =>
      cat.name === oldName ? { ...cat, name: trimmedName } : cat
    ).sort((a, b) => a.name.localeCompare(b.name));
    
    setCategories(updatedCategories);
    setEditingId(null);
    setEditName("");
    showToast(`Category renamed to "${trimmedName}"`, "success");
  };

  const handleDeleteCategory = (categoryName: string) => {
    setDeleteConfirm({ isOpen: true, categoryName });
  };

  const confirmDelete = () => {
    if (deleteConfirm.categoryName) {
      const categoryToDelete = deleteConfirm.categoryName;
      const productsInCategory = products.filter(p => p.category === categoryToDelete);
      
      if (productsInCategory.length > 0) {
        showToast(`Cannot delete category with ${productsInCategory.length} product(s). Please move or delete them first.`, "error");
        setDeleteConfirm({ isOpen: false, categoryName: null });
        return;
      }

      setCategories(categories.filter(cat => cat.name !== categoryToDelete));
      setDeleteConfirm({ isOpen: false, categoryName: null });
      showToast(`Category "${categoryToDelete}" deleted successfully!`, "success");
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Category Management
            </h1>
            <p className="text-gray-400 mt-1">
              Manage your product categories ({categories.length} categories)
            </p>
          </div>
          <button
            onClick={() => {
              setNewCategoryName("");
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            <PlusIcon className="w-5 h-5" />
            Add Category
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.length === 0 ? (
            <div className="col-span-full p-8 text-center">
              <p className="text-gray-400">
                {searchTerm ? "No categories match your search" : "No categories yet. Click 'Add Category' to create one."}
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur hover:border-gray-600/80 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  {editingId === category.name ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleEditCategory(category.name);
                        }
                      }}
                      className="flex-1 px-3 py-1 bg-gray-700/50 border border-gray-600/50 rounded text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      autoFocus
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-white break-words">{category.name}</h3>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-400">Products: <span className="text-white font-semibold">{category.productCount}</span></p>
                </div>

                <div className="flex gap-2">
                  {editingId === category.name ? (
                    <>
                      <button
                        onClick={() => handleEditCategory(category.name)}
                        className="flex-1 px-3 py-2 bg-green-600/50 text-green-300 rounded text-sm hover:bg-green-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                      >
                        <CheckIcon className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditName("");
                        }}
                        className="flex-1 px-3 py-2 bg-gray-700/50 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(category.name);
                          setEditName(category.name);
                        }}
                        className="flex-1 px-3 py-2 bg-blue-600/50 text-blue-300 rounded text-sm hover:bg-blue-600 transition-colors font-medium inline-flex items-center justify-center gap-2"
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.name)}
                        disabled={category.productCount > 0}
                        className={`flex-1 px-3 py-2 text-red-300 rounded text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors ${
                          category.productCount > 0
                            ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed opacity-50'
                            : 'bg-red-600/50 hover:bg-red-600'
                        }`}
                        title={category.productCount > 0 ? `Cannot delete: ${category.productCount} product(s) in this category` : "Delete category"}
                      >
                        <TrashIcon className="w-4 h-4" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Add Category Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Add New Category</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAddCategory();
                      }
                    }}
                    placeholder="e.g., Electronics, Fashion"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-700/50 bg-gray-900/50 flex justify-end gap-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-blue-500/30 font-medium"
                >
                  Add Category
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm({ isOpen: false, categoryName: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-orange-900/20">
                <h2 className="text-2xl font-bold text-white">Delete Category?</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete "{deleteConfirm.categoryName}"? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: false, categoryName: null })}
                    className="px-4 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
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

      {/* Toast Notification */}
      {toast.isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg z-[9999] flex items-center gap-3 ${
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
    </>
  );
}
