import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { Order, OrderStatus } from "../../stores/useAdminStore";

const ORDER_STATUSES: OrderStatus[] = ["Pending", "Completed", "Failed"];

const STATUS_ICONS: Record<OrderStatus, { color: string; bgColor: string }> =
  {
    Pending: { color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    Completed: { color: "text-green-400", bgColor: "bg-green-500/20" },
    Failed: { color: "text-red-400", bgColor: "bg-red-500/20" },
  };

interface OrderDetailModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
}

export function OrderDetailModal({
  isOpen,
  order,
  onClose,
  onStatusChange,
}: OrderDetailModalProps) {
  if (!order) return null;

  const statusIcon = STATUS_ICONS[order.status];

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
            className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 sticky top-0 z-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Order Details</h2>
                <p className="text-sm text-gray-400 mt-1">{order.orderNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-700/30 rounded-lg p-4">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-medium break-words">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium break-all">{order.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Order Date</p>
                    <p className="text-white font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <p className="text-white font-medium text-lg">
                      GHC {order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Order Items
                </h3>
                <div className="space-y-3 bg-gray-700/30 rounded-lg p-4">
                  {order.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-4 bg-gray-800/50 rounded-lg border border-gray-700/50 gap-2"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium break-words">
                          {item.productName}
                        </p>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-white font-semibold whitespace-nowrap">
                        GHC {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Order Status
                </h3>
                <div className="bg-gray-700/30 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${statusIcon.color}`} />
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusIcon.bgColor} ${statusIcon.color} border-current`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2">
                      Change Status
                    </label>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        onStatusChange(order.id, e.target.value as OrderStatus)
                      }
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-700/50 bg-gray-900/50 flex justify-end gap-3 sticky bottom-0">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-600/50 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
