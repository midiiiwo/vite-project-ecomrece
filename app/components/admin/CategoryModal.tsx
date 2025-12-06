import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

export function CategoryModal({ isOpen, onClose, onSubmit }: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    onSubmit(categoryName.trim());
    setCategoryName("");
    setError("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Add New Category</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g., Premium Electronics"
                  className={`w-full px-4 py-2 bg-gray-700/50 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur ${
                    error ? "border-red-500" : "border-gray-600/50"
                  }`}
                />
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-blue-500/30"
                >
                  Add Category
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
