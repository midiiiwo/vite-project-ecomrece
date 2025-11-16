import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";

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
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="dashboard" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl">
            {/* Header */}
            <div className="mb-8">
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
                icon="📦"
                gradient="from-indigo-500 to-purple-600"
              />
              <StatCard 
                label="Categories" 
                value="7" 
                icon="🏷️"
                gradient="from-blue-500 to-cyan-600"
              />
              <StatCard 
                label="Total Value" 
                value="$8,534.32" 
                icon="💰"
                gradient="from-emerald-500 to-green-600"
              />
              <StatCard 
                label="Active" 
                value="28" 
                icon="✅"
                gradient="from-orange-500 to-red-600"
              />
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
                  href="/admin/products"
                  icon="➕"
                />
                <QuickActionButton
                  title="View Products"
                  description="Manage your catalog"
                  href="/admin/products"
                  icon="📋"
                />
                <QuickActionButton
                  title="Settings"
                  description="Configure admin panel"
                  href="/admin/settings"
                  icon="⚙️"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 backdrop-blur rounded-2xl p-6 shadow-xl">
              <h3 className="font-semibold text-indigo-300 mb-2">
                🚀 Coming Soon: Firebase Integration
              </h3>
              <p className="text-indigo-200/80">
                Cloud-based product storage, real-time updates, and user authentication will be available with Firebase integration.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
}: {
  label: string;
  value: string;
  icon: string;
  gradient: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} bg-opacity-10 border border-gray-700/50 rounded-xl p-6 backdrop-blur hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        <div className="text-4xl opacity-75">{icon}</div>
      </div>
    </div>
  );
}

function QuickActionButton({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <a
      href={href}
      className="block p-6 rounded-xl border border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer backdrop-blur"
    >
      <div className="flex items-start justify-between mb-3">
        <div />
        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{description}</p>
    </a>
  );
}
