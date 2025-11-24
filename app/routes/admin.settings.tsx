import type { Route } from "../+types/root";
import { AdminNav } from "../components/admin/AdminNav";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings - Admin - LuxeShop" },
    {
      name: "description",
      content: "Admin settings for LuxeShop",
    },
  ];
}

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminNav currentTab="settings" />

      <main className="flex-1 overflow-auto ml-64">
        <div className="p-8">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">Settings</h1>
              <p className="text-gray-400">
                Configure your admin panel and store settings
              </p>
            </div>

            <div className="grid gap-6">
              {/* Store Settings */}
              <SettingsSection title="Store Information" icon="🏪">
                <SettingField label="Store Name" value="LuxeShop" />
                <SettingField label="Store Email" value="contact@luxeshop.com" />
                <SettingField label="Support Email" value="support@luxeshop.com" />
              </SettingsSection>

              {/* Firebase Settings */}
              <SettingsSection title="Firebase Integration" disabled icon="🔥">
                <p className="text-gray-300">
                  Firebase integration is coming soon. You'll be able to connect
                  your Firebase project for cloud-based data storage, real-time
                  updates, and user authentication.
                </p>
                <div className="mt-4 bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-sm text-blue-300">
                    Next: Firebase authentication, Firestore database setup, and
                    real-time product sync.
                  </p>
                </div>
              </SettingsSection>

              {/* Developer Settings */}
              <SettingsSection title="Developer" icon="⚙️">
                <SettingField
                  label="API Endpoint"
                  value="https://api.luxeshop.com"
                />
                <SettingField
                  label="Storage Provider"
                  value="Local Storage"
                />
              </SettingsSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsSection({
  title,
  children,
  disabled = false,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: string;
}) {
  return (
    <div
      className={`bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur shadow-xl transition-all ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SettingField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-700/50 last:border-0">
      <label className="text-gray-300 font-medium">{label}</label>
      <span className="text-gray-400">{value}</span>
    </div>
  );
}