import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Route } from "../+types/root";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useCartStore } from "../stores/useStore";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopping Cart - LuxeShop" },
    {
      name: "description",
      content: "Review your cart",
    },
  ];
}

export default function CartPage() {
  const { theme } = useApplyTheme();
  const { items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/shop"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Continue Shopping</span>
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 text-white font-semibold rounded-full"
              style={{ background: theme.gradient }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex gap-6">
                    <div
                      className="w-32 h-32 rounded-lg flex items-center justify-center"
                      style={{ background: `${theme.accent}10` }}
                    >
                      <span className="text-4xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{item.category}</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-4 py-2 rounded-lg"
                          style={{
                            background: `${theme.accent}15`,
                            color: theme.accent,
                          }}
                        >
                          -
                        </button>
                        <span className="font-bold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-4 py-2 rounded-lg"
                          style={{
                            background: `${theme.accent}15`,
                            color: theme.accent,
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-2xl font-bold"
                        style={{ color: theme.accent }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>

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
                  <div className="border-t pt-4 flex justify-between">
                    <span className="text-xl font-bold">Total</span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: theme.accent }}
                    >
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full py-3 text-center text-white font-bold rounded-full"
                  style={{ background: theme.gradient }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
