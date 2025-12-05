import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, CheckIcon, ClockIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useAdminStore, type Order, type OrderStatus } from "../../stores/useAdminStore";
import { OrderDetailModal } from "./OrderDetailModal";

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Completed", "Failed"];

export function OrderManager() {
  const { orders, updateOrder, deleteOrder } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; orderId: string | null }>({ isOpen: false, orderId: null });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({ isOpen: false, message: "", type: 'success' });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    setDeleteConfirm({ isOpen: true, orderId: id });
  };

  const confirmDelete = () => {
    if (deleteConfirm.orderId) {
      deleteOrder(deleteConfirm.orderId);
      setDeleteConfirm({ isOpen: false, orderId: null });
      setToast({ isOpen: true, message: "Order deleted successfully!", type: 'success' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
    }
  };

  const handleStatusUpdate = (orderId: string, status: OrderStatus) => {
    updateOrder(orderId, { status });
    setEditingId(null);
    setToast({ isOpen: true, message: `Order status updated to ${status}!`, type: 'success' });
    setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 3000);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  // Count orders by status
  const statusCounts = {
    Pending: orders.filter(o => o.status === "Pending").length,
    Completed: orders.filter(o => o.status === "Completed").length,
    Failed: orders.filter(o => o.status === "Failed").length,
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return <ClockIcon className="w-6 h-6 text-yellow-400" />;
      case "Completed":
        return <CheckIcon className="w-6 h-6 text-green-400" />;
      case "Failed":
        return <XCircleIcon className="w-6 h-6 text-red-400" />;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Order Management
            </h1>
            <p className="text-gray-400 mt-1">
              Manage customer orders ({filteredOrders.length} orders)
            </p>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { status: "Pending" as OrderStatus, label: "Pending Orders", color: "from-yellow-500 to-orange-600", count: statusCounts.Pending },
            { status: "Completed" as OrderStatus, label: "Completed Orders", color: "from-green-500 to-emerald-600", count: statusCounts.Completed },
            { status: "Failed" as OrderStatus, label: "Failed Orders", color: "from-red-500 to-pink-600", count: statusCounts.Failed },
          ].map(({ status, label, color, count }) => (
            <motion.div
              key={status}
              className={`bg-gradient-to-br ${color} bg-opacity-10 border border-gray-700/50 rounded-xl p-6 backdrop-blur hover:border-gray-600/80 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-white text-sm font-medium">{label}</p>
                <div className="flex-shrink-0">
                  {getStatusIcon(status)}
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{count}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by order number, customer name or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as OrderStatus | "");
              setCurrentPage(1);
            }}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
          >
            <option value="">All Status</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">
                {searchTerm || statusFilter
                  ? "No orders match your filters"
                  : "No orders yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Order #
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {paginatedOrders.map((order) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-700/30 transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(order)}
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{order.orderNumber}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white">{order.customerName}</p>
                          <p className="text-sm text-gray-400">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-white">
                          GHC {order.totalAmount.toFixed(2)}
                        </p>
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        {editingId === order.id ? (
                          <div className="flex gap-2">
                            <select
                              value={newStatus}
                              onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                              className="px-2 py-1 bg-gray-700/50 border border-gray-600/50 rounded text-white text-sm"
                            >
                              {ORDER_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleStatusUpdate(order.id, newStatus)}
                              className="px-2 py-1 bg-green-600/50 text-green-300 rounded text-sm hover:bg-green-600 transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                : order.status === "Completed"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingId(order.id);
                              setNewStatus(order.status);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-400 hover:bg-blue-500/20 rounded transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(order.id)}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
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
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm({ isOpen: false, orderId: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-sm w-full backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-red-900/20 to-orange-900/20">
                <h2 className="text-2xl font-bold text-white">Delete Order?</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this order? This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => setDeleteConfirm({ isOpen: false, orderId: null })}
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

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onStatusChange={(orderId, status) => {
          handleStatusUpdate(orderId, status);
          setDetailModalOpen(false);
        }}
      />

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
