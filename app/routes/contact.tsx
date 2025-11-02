import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - LuxeShop" },
    { name: "description", content: "Get in touch with LuxeShop" },
  ];
}

export default function Contact() {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-semibold transition-colors duration-700"
                style={{ color: currentTheme.primary }}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2
              className="text-6xl font-bold mb-6 transition-all duration-700"
              style={{ color: currentTheme.primary }}
            >
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className="rounded-3xl p-8 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}10, ${currentTheme.accent}10)`,
                border: `2px solid ${currentTheme.primary}30`,
              }}
            >
              <h3
                className="text-3xl font-bold mb-6 transition-colors duration-700"
                style={{ color: currentTheme.primary }}
              >
                Send us a Message
              </h3>

              {submitted ? (
                <div
                  className="p-6 rounded-xl text-center animate-fade-in"
                  style={{
                    background: `${currentTheme.primary}20`,
                    color: currentTheme.primary,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p>We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: `${currentTheme.primary}30`,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = currentTheme.primary;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `${currentTheme.primary}30`;
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: `${currentTheme.primary}30`,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = currentTheme.primary;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `${currentTheme.primary}30`;
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300"
                      style={{
                        borderColor: `${currentTheme.primary}30`,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = currentTheme.primary;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `${currentTheme.primary}30`;
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 resize-none"
                      style={{
                        borderColor: `${currentTheme.primary}30`,
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = currentTheme.primary;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = `${currentTheme.primary}30`;
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: currentTheme.gradient }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div
                className="p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.accent}15)`,
                  border: `2px solid ${currentTheme.primary}20`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full transition-colors duration-700"
                    style={{
                      background: `${currentTheme.primary}20`,
                      color: currentTheme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <p className="text-gray-600">support@luxeshop.com</p>
                  </div>
                </div>
              </div>

              <div
                className="p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.accent}15)`,
                  border: `2px solid ${currentTheme.primary}20`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full transition-colors duration-700"
                    style={{
                      background: `${currentTheme.primary}20`,
                      color: currentTheme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div
                className="p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.accent}15)`,
                  border: `2px solid ${currentTheme.primary}20`,
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-full transition-colors duration-700"
                    style={{
                      background: `${currentTheme.primary}20`,
                      color: currentTheme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Address</h4>
                    <p className="text-gray-600">
                      123 Luxury Street
                      <br />
                      Shopping District, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-8 rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.primary}15, ${currentTheme.accent}15)`,
                  border: `2px solid ${currentTheme.primary}20`,
                }}
              >
                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {["Facebook", "Twitter", "Instagram"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: `${currentTheme.primary}15`,
                        color: currentTheme.primary,
                      }}
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
