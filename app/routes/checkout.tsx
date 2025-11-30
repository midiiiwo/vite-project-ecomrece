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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/cart"
              className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-gray-900 text-sm md:text-base"
            >
              <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>Back to Cart</span>
            </Link>
            <Link to="/">
              <h1
                className="text-2xl md:text-3xl font-bold transition-colors duration-300"
                style={{ color: theme.accent }}
              >
                LuxeShop
              </h1>
            </Link>
            <div className="w-20 md:w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 md:p-8 rounded-lg md:rounded-xl shadow-md">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Shipping Information
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                  Payment Information
                </h2>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-12 text-center">
                  <p className="text-gray-600 text-base md:text-lg">
                    Payment integration placeholder
                  </p>
                  <p className="text-gray-500 text-xs md:text-sm mt-2">
                    In a real application, this would integrate with a payment
                    processor
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md lg:sticky lg:top-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    GHC {getTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-semibold">
                    GHC {(getTotal() * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 md:pt-4 flex justify-between">
                  <span className="font-bold text-base md:text-xl">Total</span>
                  <span
                    className="text-xl md:text-2xl font-bold"
                    style={{ color: theme.accent }}
                  >
                    GHC {(getTotal() * 1.1).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                className="w-full py-2 md:py-3 text-white font-bold text-sm md:text-base rounded-full"
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
