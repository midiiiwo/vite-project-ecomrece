import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { CubeIcon, FolderIcon, PlusIcon, CheckIcon, CurrencyDollarIcon, DocumentTextIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useState } from "react";
import { ProductForm } from "../components/admin/ProductForm";
import { useAdminStore } from "../stores/useAdminStore";
import type { Product } from "../stores/useStore";
import { motion, AnimatePresence } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard - LuxeShop" },
    {
      name: "description",
      content: "LuxeShop Admin Control Panel",
    },
  ];
}

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addProduct } = useAdminStore();
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({ isOpen: false, message: "", type: 'success' });

  const handleAddProduct = (data: Omit<Product, "id">) => {
    try {
      addProduct(data);
      setIsModalOpen(false);
      setToast({ isOpen: true, message: "Product added successfully!", type: 'success' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
    } catch (error) {
      setToast({ isOpen: true, message: "Failed to add product", type: 'error' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'error' }), 3000);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="dashboard" />

      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="p-4 md:p-8">
          <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-8 justify-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-gray-400">
                Welcome to LuxeShop Admin Control Center
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                label="Total Products" 
                value="32" 
                icon={<CubeIcon className="w-8 h-8" />}
                gradient="from-indigo-500 to-purple-600"
                iconColor="text-red-300"
              />
              <StatCard 
                label="Categories" 
                value="7" 
                icon={<FolderIcon className="w-8 h-8" />}
                gradient="from-blue-500 to-cyan-600"
                iconColor="text-blue-900"
              />
              <StatCard 
                label="Total Value" 
                value="$8,534.32" 
                icon={<CurrencyDollarIcon className="w-8 h-8" />}
                gradient="from-emerald-500 to-green-600"
                iconColor="text-yellow-300"
              />
              <StatCard 
                label="Active" 
                value="28" 
                icon={<CheckIcon className="w-8 h-8" />}
                gradient="from-orange-500 to-red-600"
                iconColor="text-green-400"
              />
            </div>

            {/* Order Summary Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              <OrderSummary />
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur rounded-2xl p-8 mb-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickActionButton
                  title="Add Product"
                  description="Create a new product"
                  icon={<PlusIcon className="w-6 h-6" />}
                  iconColor="text-amber-200"
                  onClick={() => setIsModalOpen(true)}
                />
                <QuickActionButton
                  title="View Products"
                  description="Manage your catalog"
                  href="/admin/products"
                  icon={<DocumentTextIcon className="w-6 h-6" />}
                  iconColor="text-orange-300"
                />
                <QuickActionButton
                  title="Settings"
                  description="Configure admin panel"
                  href="/admin/settings"
                  icon={<Cog6ToothIcon className="w-6 h-6" />}
                  iconColor="text-slate-400"
                />
              </div>
            </div>

            {/* Info Box */}
            {/* <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 backdrop-blur rounded-2xl p-6 shadow-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">
                🚀 Coming Soon: Firebase Integration
              </h3>
              <p className="text-indigo-200/80">
                Cloud-based product storage, real-time updates, and user authentication will be available with Firebase integration.
              </p>
            </div> */}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Add New Product</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <ProductForm
                onSubmit={handleAddProduct}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
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
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  iconColor,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  iconColor: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} bg-opacity-10 border border-gray-700/50 rounded-xl p-6 backdrop-blur hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10`}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-white text-sm font-medium">{label}</p>
        <div className={`text-3xl flex items-center justify-center ${iconColor}`}>{icon}</div>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function QuickActionButton({
  title,
  description,
  href,
  icon,
  iconColor,
  onClick,
}: {
  title: string;
  description: string;
  href?: string;
  icon: React.ReactNode;
  iconColor: string;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block p-6 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer backdrop-blur"
    >
      <div className="flex items-start justify-between mb-3">
        <div />
        <span className={`text-2xl group-hover:scale-110 transition-transform ${iconColor}`}>{icon}</span>
      </div>
      <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{description}</p>
    </a>
  );
}

function OrderSummary() {
  const { orders } = useAdminStore();
  const [dateFilter, setDateFilter] = useState<"today" | "week" | "month" | "all">("all");

  const getDateRange = () => {
    const now = new Date();
    let startDate = new Date(0);

    switch (dateFilter) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "all":
        startDate = new Date(0);
        break;
    }

    return startDate;
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= getDateRange();
  });

  const statusCounts = {
    Pending: filteredOrders.filter(o => o.status === "Pending").length,
    Completed: filteredOrders.filter(o => o.status === "Completed").length,
    Failed: filteredOrders.filter(o => o.status === "Failed").length,
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {(["today", "week", "month", "all"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setDateFilter(filter)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              dateFilter === filter
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                : "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {filter === "all" ? "All Time" : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-600 bg-opacity-10 border border-yellow-500/30 rounded-xl p-6 backdrop-blur"
        >
          <p className="text-yellow-300 text-sm font-medium">Pending Orders</p>
          <p className="text-4xl font-bold text-white mt-2">{statusCounts.Pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 bg-opacity-10 border border-green-500/30 rounded-xl p-6 backdrop-blur"
        >
          <p className="text-green-300 text-sm font-medium">Completed Orders</p>
          <p className="text-4xl font-bold text-white mt-2">{statusCounts.Completed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-red-500 to-pink-600 bg-opacity-10 border border-red-500/30 rounded-xl p-6 backdrop-blur"
        >
          <p className="text-red-300 text-sm font-medium">Failed Orders</p>
          <p className="text-4xl font-bold text-white mt-2">{statusCounts.Failed}</p>
        </motion.div>
      </div>
    </div>
  );
}
