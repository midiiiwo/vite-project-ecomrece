import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, BellIcon, CheckIcon, SunIcon } from "@heroicons/react/24/outline";
import { useSidebar } from "../contexts/SidebarContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Admin - LuxeShop" },
    {
      name: "description",
      content: "Manage settings in LuxeShop",
    },
  ];
}

export default function AdminSettings() {
  const { isExpanded: sidebarExpanded } = useSidebar();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminDarkMode") !== "false";
    }
    return true;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminNotifications") !== "false";
    }
    return true;
  });

  const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({ isOpen: false, message: "", type: "success" });

  // Apply dark mode to document
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    localStorage.setItem("adminDarkMode", value.toString());
    setToast({
      isOpen: true,
      message: `Dark mode ${value ? "enabled" : "disabled"}!`,
      type: "success",
    });
    setTimeout(
      () => setToast({ isOpen: false, message: "", type: "success" }),
      3000
    );
  };

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    localStorage.setItem("adminNotifications", value.toString());
    setToast({
      isOpen: true,
      message: `Notifications ${value ? "enabled" : "disabled"}!`,
      type: "success",
    });
    setTimeout(
      () => setToast({ isOpen: false, message: "", type: "success" }),
      3000
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="settings" />

      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        sidebarExpanded ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'
      }`}>
        <div className="p-4 md:p-8">
          <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-400">
                Manage your admin preferences
              </p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
              {/* Theme Settings */}
              <SettingsSection
                title="Appearance"
                description="Customize your admin interface"
                icon={<MoonIcon className="w-6 h-6" />}
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-4 rounded-lg border border-gray-700/50 gap-4 bg-gray-800/30">
                    <div className="flex items-center gap-3">
                      {darkMode ? (
                        <MoonIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      ) : (
                        <SunIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-white text-sm md:text-base">
                          Theme Mode
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          {darkMode ? "Dark mode" : "Light mode"} - Click to toggle
                        </p>
                      </div>
                    </div>
                    <Toggle
                      enabled={darkMode}
                      onChange={handleDarkModeToggle}
                    />
                  </div>
                </div>
              </SettingsSection>

              {/* Notification Settings */}
              <SettingsSection
                title="Notifications"
                description="Control notification preferences"
                icon={<BellIcon className="w-6 h-6" />}
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 px-4 rounded-lg border border-gray-700/50 gap-4 bg-gray-800/30">
                    <div className="flex items-center gap-3">
                      <BellIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white text-sm md:text-base">
                          Enable Notifications
                        </p>
                        <p className="text-xs md:text-sm text-gray-400">
                          Receive alerts for orders and updates
                        </p>
                      </div>
                    </div>
                    <Toggle
                      enabled={notificationsEnabled}
                      onChange={handleNotificationsToggle}
                    />
                  </div>
                </div>
              </SettingsSection>
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 m-4 ${
              toast.type === "success"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                : "bg-gradient-to-r from-red-600 to-orange-600 text-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                toast.type === "success"
                  ? "bg-white text-green-600"
                  : "bg-white text-red-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                "✕"
              )}
            </div>
            <span className="font-medium text-sm md:text-base">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur shadow-lg bg-gray-800/50">
      <div className="flex items-center gap-3 mb-6">
        {icon && <span className="text-blue-400">{icon}</span>}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
          {description && (
            <p className="text-xs md:text-sm text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-all flex-shrink-0 ${
        enabled
          ? "bg-gradient-to-r from-blue-600 to-cyan-600"
          : "bg-gray-600"
      }`}
    >
      <motion.span
        initial={false}
        animate={{
          x: enabled ? 28 : 4,
        }}
        className="inline-block w-6 h-6 transform rounded-full bg-white shadow-lg"
      />
      {enabled && (
        <CheckIcon className="absolute left-1 w-4 h-4 text-blue-600" />
      )}
    </button>
  );
}
