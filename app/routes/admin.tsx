import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { CubeIcon, FolderIcon, PlusIcon, CheckIcon, DocumentTextIcon, BellIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useState } from "react";
import { ProductForm } from "../components/admin/ProductForm";
import { useAdminStore } from "../stores/useAdminStore";
import type { Product } from "../stores/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useSidebar } from "../contexts/SidebarContext";

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
  const [showNotifications, setShowNotifications] = useState(false);
  const { isExpanded: sidebarExpanded } = useSidebar();
  const { addProduct, products, orders, notifications, getUnreadCount, markNotificationAsRead } = useAdminStore();
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

  // Dynamic calculations
  const categories = Array.from(new Set(products.map(p => p.category)));
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);
  const unreadCount = getUnreadCount();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="dashboard" />

      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        sidebarExpanded ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'
      }`}>
        <div className="p-4 md:p-8">
          <div className="max-w-7xl">
            {/* Header with Notifications */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-gray-400">
                  Welcome to LuxeShop Admin Control Center
                </p>
              </div>
              
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
                >
                  <BellIcon className="w-6 h-6 text-white" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-14 w-80 bg-gray-800/95 border border-gray-700/50 rounded-lg shadow-2xl z-40 backdrop-blur max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-700/50">
                      <h3 className="text-white font-bold">Notifications</h3>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400">No notifications</div>
                    ) : (
                      <div className="divide-y divide-gray-700/50">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markNotificationAsRead(notif.id)}
                            className={`p-4 cursor-pointer transition-colors ${
                              notif.read ? 'bg-gray-800/30' : 'bg-indigo-500/10'
                            } hover:bg-gray-700/50`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${notif.read ? 'bg-gray-600' : 'bg-indigo-500'}`} />
                              <div className="flex-1">
                                <p className="font-semibold text-white text-sm">{notif.title}</p>
                                <p className="text-gray-400 text-xs mt-1">{notif.message}</p>
                                <p className="text-gray-500 text-xs mt-2">
                                  {new Date(notif.createdAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 5-Card Grid Layout - Section 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <StatCard 
                label="Pending Orders" 
                value={orders.filter(o => o.status === "Pending").length.toString()} 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                }
                gradient="from-yellow-500 to-orange-600"
                iconColor="text-yellow-300"
              />
              <StatCard 
                label="Completed Orders" 
                value={orders.filter(o => o.status === "Completed").length.toString()} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                      </svg>
                      }
                gradient="from-green-500 to-emerald-600"
                iconColor="text-green-300"
              />
              <StatCard 
                label="Failed Orders" 
                value={orders.filter(o => o.status === "Failed").length.toString()} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      }
                gradient="from-red-500 to-pink-600"
                iconColor="text-red-300"
              />
              <StatCard 
                label="Total Products" 
                value={totalProducts.toString()} 
                icon={<CubeIcon className="w-8 h-8" />}
                gradient="from-indigo-500 to-purple-600"
                iconColor="text-indigo-300"
              />
              <StatCard 
                label="Categories" 
                value={categories.length.toString()} 
                icon={<FolderIcon className="w-8 h-8" />}
                gradient="from-blue-500 to-cyan-600"
                iconColor="text-blue-300"
              />
            </div>

            {/* Quick Actions - Section 5 */}
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
                  iconColor="text-orange-200"
                />
                <QuickActionButton
                  title="View Orders"
                  description="Manage all orders"
                  href="/admin/orders"
                  icon={<CubeIcon className="w-6 h-6" />}
                  iconColor="text-cyan-300"
                />
              </div>
            </div>
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
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="block w-full text-left p-6 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer backdrop-blur"
      >
        <div className="flex items-start justify-between mb-3">
          <div />
          <span className={`text-2xl group-hover:scale-110 transition-transform ${iconColor}`}>{icon}</span>
        </div>
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{description}</p>
      </button>
    );
  }

  return (
    <Link
      to={href || "#"}
      className="block p-6 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer backdrop-blur"
    >
      <div className="flex items-start justify-between mb-3">
        <div />
        <span className={`text-2xl group-hover:scale-110 transition-transform ${iconColor}`}>{icon}</span>
      </div>
      <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{description}</p>
    </Link>
  );
}
