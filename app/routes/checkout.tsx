import { Link } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Route } from "../+types/root";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useCartStore } from "../stores/useStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Checkout - LuxeShop" },
    {
      name: "description",
      content: "Complete your purchase",
    },
  ];
}

export default function Checkout() {
  const { theme } = useApplyTheme();
  const { getTotal } = useCartStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Cart</span>
            </Link>
            <Link to="/">
              <h1
                className="text-3xl font-bold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                LuxeShop
              </h1>
            </Link>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shipping Information
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as any}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as any}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": theme.accent } as any}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": theme.accent } as any}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as any}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as any}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Information
                </h2>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <p className="text-gray-600 text-lg">
                    Payment integration placeholder
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    In a real application, this would integrate with a payment
                    processor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    ${(getTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-xl font-bold">Total</span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: theme.accent }}
                  >
                    ${(getTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="w-full py-3 text-white font-bold rounded-full"
                style={{ background: theme.gradient }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
