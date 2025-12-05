import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { useState } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../stores/useAdminStore";
import { useSidebar } from "../contexts/SidebarContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Notifications - Admin - LuxeShop" },
    {
      name: "description",
      content: "Manage notifications in LuxeShop",
    },
  ];
}

export default function AdminNotifications() {
  const { isExpanded: sidebarExpanded } = useSidebar();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } =
    useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "read" | "unread">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredNotifications = notifications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .filter((notif) => {
      const matchesSearch =
        notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" ||
        (filterType === "read" && notif.read) ||
        (filterType === "unread" && !notif.read);
      return matchesSearch && matchesFilter;
    });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    endIndex
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="notifications" />

      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        sidebarExpanded ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'
      }`}>
        <div className="p-4 md:p-8">
          <div className="max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-gray-400 mt-2 text-sm md:text-base">
                  Manage all notifications ({filteredNotifications.length}{" "}
                  total)
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-sm font-semibold"
                >
                  Mark All as Read
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value as "all" | "read" | "unread");
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none backdrop-blur"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>

            {/* Notifications List */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl shadow-xl backdrop-blur overflow-hidden">
              {paginatedNotifications.length === 0 ? (
                <div className="p-8 md:p-12 text-center">
                  <p className="text-gray-400 text-sm md:text-base">
                    {searchTerm || filterType !== "all"
                      ? "No notifications match your filters"
                      : "No notifications yet"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-700/50">
                  {paginatedNotifications.map((notif, index) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markNotificationAsRead(notif.id)}
                      className={`p-4 md:p-6 cursor-pointer transition-all hover:bg-gray-700/30 ${
                        notif.read ? "bg-gray-800/30" : "bg-indigo-500/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                            notif.read ? "bg-gray-600" : "bg-indigo-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <p className="font-semibold text-white text-sm md:text-base break-words">
                              {notif.title}
                            </p>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 whitespace-nowrap ${
                                notif.read
                                  ? "bg-gray-600/50 text-gray-300"
                                  : "bg-indigo-600/50 text-indigo-200"
                              }`}
                            >
                              {notif.read ? "Read" : "New"}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs md:text-sm mb-2 break-words">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6 flex-wrap px-4 sm:px-0">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors text-sm"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1 flex-wrap justify-center">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg transition-all text-sm flex-shrink-0 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                            : "bg-gray-800/50 border border-gray-700/50 text-white hover:bg-gray-700/50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-colors text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
