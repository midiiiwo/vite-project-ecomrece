import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

interface AdminNavProps {
  currentTab: "dashboard" | "products" | "settings";
}

export function AdminNav({ currentTab }: AdminNavProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Squares2X2Icon,
      href: "/admin",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "products",
      label: "Products",
      icon: ShoppingBagIcon,
      href: "/admin/products",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Cog6ToothIcon,
      href: "/admin/settings",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white min-h-screen flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LP</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Admin
          </h1>
        </div>
        <p className="text-gray-400 text-sm">LuxeShop Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ id, label, icon: Icon, href, color }) => {
          const isActive = currentTab === id;
          return (
            <motion.div key={id} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
              <Link
                to={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r ${color} text-white font-semibold shadow-lg shadow-indigo-500/30`
                    : "text-gray-300 hover:bg-gray-800/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/50 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 w-full group"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shop</span>
        </Link>
      </div>
    </aside>
  );
}
