import { Link } from "react-router";
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, ArrowRightStartOnRectangleIcon, CubeIcon, WindowIcon, Cog6ToothIcon, BellIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";

interface AdminNavProps {
  currentTab: "dashboard" | "products" | "categories" | "settings" | "orders" | "notifications";
}

export function AdminNav({ currentTab }: AdminNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isExpanded: sidebarExpanded, toggleSidebar } = useSidebar();

  // Store expanded state in localStorage
  const handleToggleSidebar = (value: boolean) => {
    toggleSidebar(value);
  };

  const navItems: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    color: string;
  }> = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            ,
      href: "/admin",
      color: "from-purple-500 to-indigo-600",
    },
    {
      id: "products",
      label: "Products",
      icon: <CubeIcon className="w-5 h-5" />,
      href: "/admin/products",
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "categories",
      label: "Categories",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.887.887 2.318.887 3.205 0l5.734-5.734c.887-.887.887-2.318 0-3.205L9.591 3.659A2.25 2.25 0 0 0 9.568 3Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>,
      href: "/admin/categories",
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "orders",
      label: "Orders",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            ,
      href: "/admin/orders",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <BellIcon className="w-5 h-5" />,
      href: "/admin/notifications",
      color: "from-indigo-500 to-purple-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      href: "/admin/settings",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 text-white p-2 rounded-lg"
      >
        {mobileOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-0 text-white min-h-screen flex flex-col border-r border-gray-800 z-40 transition-all duration-300 md:translate-x-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black ${
        mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
      } ${!sidebarExpanded ? 'md:w-20' : 'md:w-64'}`}>
        {/* Logo */}
        <div className={`p-4 md:p-6 border-b border-gray-800/50 transition-all duration-300 flex items-center justify-between ${!sidebarExpanded ? 'md:justify-center md:px-2' : ''}`}>
          {sidebarExpanded || mobileOpen ? (
            <>
              <div className={`flex items-center gap-2 ${!sidebarExpanded ? 'md:gap-0' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">LP</span>
                </div>
                {(sidebarExpanded || mobileOpen) && (
                  <div className="hidden md:block">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      Admin
                    </h1>
                    <p className="text-gray-400 text-xs">LuxeShop</p>
                  </div>
                )}
              </div>
              {sidebarExpanded && (
                <button
                  onClick={() => handleToggleSidebar(!sidebarExpanded)}
                  className="hidden md:block text-gray-400 hover:text-white transition-colors"
                  title="Collapse"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => handleToggleSidebar(true)}
              className="hidden md:block text-gray-400 hover:text-white transition-colors w-full flex justify-center"
              title="Expand"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ id, label, icon, href, color }) => {
            const isActive = currentTab === id;
            return (
              <motion.div key={id} whileHover={{ x: sidebarExpanded ? 2 : 0 }} transition={{ duration: 0.2 }}>
                <Link
                  to={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? `bg-gradient-to-r ${color} text-white font-semibold shadow-lg shadow-indigo-500/30`
                      : "text-gray-300 hover:bg-gray-800/50"
                  } ${!sidebarExpanded ? 'md:justify-center md:px-0 md:w-fit' : ''}`}
                  title={!sidebarExpanded ? label : undefined}
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
                  <div className="w-5 h-5 relative z-10 flex items-center justify-center flex-shrink-0">{icon}</div>
                  {(sidebarExpanded || mobileOpen) && <span className="relative z-10">{label}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t border-gray-800/50 space-y-2 transition-all duration-300 ${!sidebarExpanded ? 'md:flex md:justify-center md:p-2' : ''}`}>
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-300 w-full group ${!sidebarExpanded ? 'md:justify-center md:w-fit md:px-0' : ''}`}
            title={!sidebarExpanded ? "Back to Shop" : undefined}
          >
            <ArrowRightStartOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
            {(sidebarExpanded || mobileOpen) && <span>Back to Shop</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
