import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import type { AdminNotification } from "../../stores/useAdminStore";

interface NotificationModalProps {
  isOpen: boolean;
  notifications: AdminNotification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationModal({
  isOpen,
  notifications,
  onClose,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationModalProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-end"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-gray-800/95 border border-gray-700/50 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden backdrop-blur flex flex-col m-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-700/50 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 flex items-center justify-between sticky top-0 z-10">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-400 mt-1">
                    {unreadCount} unread
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  No notifications yet
                </div>
              ) : (
                <div className="divide-y divide-gray-700/50">
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => onMarkAsRead(notif.id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-gray-700/30 ${
                        notif.read ? "bg-gray-800/30" : "bg-indigo-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notif.read ? "bg-gray-600" : "bg-indigo-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm break-words">
                            {notif.title}
                          </p>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2 break-words">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-2">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!notif.read && (
                          <CheckIcon className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {unreadCount > 0 && (
              <div className="p-4 border-t border-gray-700/50 bg-gray-900/50 sticky bottom-0">
                <button
                  onClick={onMarkAllAsRead}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-sm font-semibold"
                >
                  Mark All as Read
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
