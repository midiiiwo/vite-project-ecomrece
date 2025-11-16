import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";
import { ProductManager } from "../components/admin/ProductManager";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products - Admin - LuxeShop" },
    {
      name: "description",
      content: "Manage products in LuxeShop",
    },
  ];
}

export default function AdminProducts() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="products" />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl">
            <ProductManager />
          </div>
        </div>
      </main>
    </div>
  );
}
