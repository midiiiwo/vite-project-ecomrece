import type { Route } from "../+types/root";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - LuxeShop" },
    {
      name: "description",
      content: "Learn more about LuxeShop and our mission",
    },
  ];
}

export default function About() {
  const { currentTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div
        className="fixed inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: currentTheme.gradient,
          opacity: 0.05,
        }}
      />

      {/* Header */}
      <header
        className="relative z-10 transition-all duration-700 ease-in-out"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1
                className="text-4xl font-bold transition-all duration-700 hover:scale-105"
                style={{ color: currentTheme.primary }}
              >
                LuxeShop
              </h1>
            </Link>
            <nav className="flex gap-8 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="font-semibold transition-colors duration-700"
                style={{ color: currentTheme.primary }}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <h2
              className="text-6xl font-bold mb-6 transition-all duration-700"
              style={{ color: currentTheme.primary }}
            >
              About LuxeShop
            </h2>
            <p className="text-xl text-gray-600">
              Your premium destination for quality products
            </p>
          </div>

          {/* Story Section */}
          <div
            className="rounded-3xl p-12 mb-12 transition-all duration-700"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.accent}10)`,
              border: `2px solid ${currentTheme.primary}30`,
            }}
          >
            <h3
              className="text-3xl font-bold mb-6 transition-colors duration-700"
              style={{ color: currentTheme.primary }}
            >
              Our Story
            </h3>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
              <p>
                Founded with a vision to revolutionize online shopping, LuxeShop
                brings together the finest selection of products across multiple
                categories. From fashion to electronics, we curate only the best
                for our valued customers.
              </p>
              <p>
                Our journey began with a simple idea: create a shopping
                experience that's not just about transactions, but about
                discovery, quality, and trust. Today, we serve thousands of
                happy customers worldwide.
              </p>
              <p>
                Every product in our collection is carefully selected, ensuring
                that you receive nothing but excellence. We believe in quality
                over quantity, and our commitment to this principle has made us
                a trusted name in e-commerce.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Quality First",
                description:
                  "We never compromise on the quality of our products",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ),
              },
              {
                title: "Fast Delivery",
                description: "Quick and reliable shipping to your doorstep",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                ),
              },
              {
                title: "Customer Care",
                description: "24/7 support for all your needs",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl text-center transition-all duration-500 hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.accent}15)`,
                  border: `2px solid ${currentTheme.primary}20`,
                }}
              >
                <div
                  className="mb-4 flex justify-center transition-colors duration-700"
                  style={{ color: currentTheme.primary }}
                >
                  {value.icon}
                </div>
                <h4
                  className="text-xl font-bold mb-2 transition-colors duration-700"
                  style={{ color: currentTheme.primary }}
                >
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/shop"
              className="inline-block px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: currentTheme.gradient }}
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 mt-auto py-8 transition-all duration-700"
        style={{
          background: `linear-gradient(to top, ${currentTheme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            &copy; 2025 LuxeShop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
