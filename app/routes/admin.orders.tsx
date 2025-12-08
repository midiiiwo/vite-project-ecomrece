import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { OrderManager } from "../components/admin/OrderManager";
import { useSidebar } from "../contexts/SidebarContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Orders - Admin - LuxeShop" },
    {
      name: "description",
      content: "Manage orders in LuxeShop",
    },
  ];
}

export default function AdminOrders() {
  const { isExpanded: sidebarExpanded } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="orders" />

      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        sidebarExpanded ? 'ml-0 md:ml-64' : 'ml-0 md:ml-20'
      }`}>
        <div className="p-4 md:p-8">
          <div className="max-w-7xl">
            <OrderManager />
          </div>
        </div>
      </main>
    </div>
  );
}
