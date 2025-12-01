import { Link } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import type { Route } from "../+types/root";
import { useApplyTheme } from "../hooks/useApplyTheme";
import { useCartStore, type CartItem } from "../stores/useStore";
import { useAdminStore } from "../stores/useAdminStore";
import { useState } from "react";
import { motion } from "framer-motion";

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
  const { getTotal, items: cart, clearCart } = useCartStore();
  const { addOrder, addNotification } = useAdminStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({ isOpen: false, message: "", type: 'success' });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToast({ isOpen: true, message: "Please fill in all required fields", type: 'error' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'error' }), 3000);
      return;
    }

    if (cart.length === 0) {
      setToast({ isOpen: true, message: "Your cart is empty", type: 'error' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'error' }), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      const total = getTotal() * 1.1; // Include 10% tax

      // Create order object
      const newOrder = {
        orderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        totalAmount: total,
        status: "Pending" as const,
        items: cart.map((item: CartItem) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add order to admin store
      addOrder(newOrder);

      // Trigger admin notification
      addNotification({
        type: "order_created",
        title: "New Order Received",
        message: `Order #${orderNumber} from ${formData.firstName} ${formData.lastName} (GHC ${total.toFixed(2)})`,
        read: false,
        metadata: {
          orderNumber,
          customerName: formData.firstName + " " + formData.lastName,
          customerEmail: formData.email,
          totalAmount: total,
        },
      });

      // Clear cart
      clearCart();

      // Show success message
      setToast({ isOpen: true, message: `Order placed successfully! Order #${orderNumber}`, type: 'success' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'success' }), 4000);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zipCode: "",
      });

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    } catch (error) {
      setToast({ isOpen: true, message: "Order processing failed. Please try again.", type: 'error' });
      setTimeout(() => setToast({ isOpen: false, message: "", type: 'error' }), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                    {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                    {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                  />
                  {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                    {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ "--tw-ring-color": theme.accent } as React.CSSProperties}
                    />
                    {errors.zipCode && <p className="text-red-600 text-xs mt-1">{errors.zipCode}</p>}
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
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-2 md:py-3 text-white font-bold text-sm md:text-base rounded-full disabled:opacity-70 disabled:cursor-not-allowed transition-transform hover:scale-105 active:scale-95"
                style={{ background: theme.gradient }}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
              : 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
          }`}
        >
          <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-sm ${
            toast.type === 'success' ? 'bg-white text-green-600' : 'bg-white text-red-600'
          }`}>
            {toast.type === 'success' ? '✓' : '✕'}
          </div>
          <span className="font-medium">{toast.message}</span>
        </motion.div>
      )}
    </div>
  );
}
