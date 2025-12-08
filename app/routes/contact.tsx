import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "../+types/root";
import { useApplyTheme } from "../hooks/useApplyTheme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us - LuxeShop" },
    { name: "description", content: "Get in touch with LuxeShop" },
  ];
}

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<FormData>;

export default function Contact() {
  const { theme } = useApplyTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Here you would typically send the form data to a server
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-white">
      {/* Animated Background */}
      <div
        className="fixed inset-0 transition-all duration-1000 ease-in-out -z-10"
        style={{
          background: theme.gradient,
          opacity: 0.05,
        }}
      />

      {/* Header */}
      <header
        className="relative z-20 transition-all duration-700 ease-in-out sticky top-0"
        style={{
          background: `linear-gradient(to bottom, ${theme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-4 py-4 md:py-6 lg:py-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Link to="/">
              <h1
                className="text-xl md:text-3xl lg:text-4xl font-bold transition-all duration-700 hover:scale-105"
                style={{ color: theme.primary }}
              >
                LuxeShop
              </h1>
            </Link>
            <nav className="flex gap-3 md:gap-6 lg:gap-8 items-center text-xs md:text-sm lg:text-base flex-wrap justify-center">
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
                style={{ color: theme.primary }}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 container mx-auto px-4 py-6 md:py-12 lg:py-16 w-full">
        <div className="max-w-6xl mx-auto w-full">
          {/* Page Header */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 lg:mb-6 transition-all duration-700"
              style={{ color: theme.primary }}
            >
              Get In Touch
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">
              We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Contact Form */}
            <div
              className="rounded-lg md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8 transition-all duration-700"
              style={{
                background: `linear-gradient(135deg, ${theme.primary}10, ${theme.accent}10)`,
                border: `2px solid ${theme.primary}30`,
              }}
            >
              <h3
                className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 transition-colors duration-700"
                style={{ color: theme.primary }}
              >
                Send us a Message
              </h3>

              {submitted ? (
                <div
                  className="p-4 md:p-6 rounded-lg md:rounded-xl text-center"
                  style={{
                    background: `${theme.primary}20`,
                    color: theme.primary,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-10 md:w-12 lg:w-16 h-10 md:h-12 lg:h-16 mx-auto mb-3 md:mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h4 className="text-base md:text-lg lg:text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-sm md:text-base">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lg:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 bg-white focus:outline-none transition-all duration-300 text-sm md:text-base ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.name ? "#ef4444" : `${theme.primary}50`,
                      }}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 bg-white focus:outline-none transition-all duration-300 text-sm md:text-base ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.email ? "#ef4444" : `${theme.primary}50`,
                      }}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 bg-white focus:outline-none transition-all duration-300 text-sm md:text-base ${
                        errors.subject ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.subject ? "#ef4444" : `${theme.primary}50`,
                      }}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 bg-white focus:outline-none transition-all duration-300 resize-none text-sm md:text-base ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      style={{
                        borderColor: errors.message ? "#ef4444" : `${theme.primary}50`,
                      }}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs md:text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 md:py-3 lg:py-4 rounded-full text-white font-semibold text-sm md:text-base lg:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: theme.gradient }}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div
                className="p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
                  border: `2px solid ${theme.primary}20`,
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className="p-2 md:p-3 rounded-full transition-colors duration-700 flex-shrink-0 mt-1"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 md:w-6 h-4 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base lg:text-lg mb-1">Email</h4>
                    <p className="text-gray-600 text-xs md:text-sm lg:text-base">support@luxeshop.com</p>
                  </div>
                </div>
              </div>

              <div
                className="p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
                  border: `2px solid ${theme.primary}20`,
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className="p-2 md:p-3 rounded-full transition-colors duration-700 flex-shrink-0 mt-1"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 md:w-6 h-4 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm md:text-base lg:text-lg mb-1">Phone</h4>
                    <p className="text-gray-600 text-xs md:text-sm lg:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div
                className="p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
                  border: `2px solid ${theme.primary}20`,
                }}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div
                    className="p-2 md:p-3 rounded-full transition-colors duration-700 flex-shrink-0 mt-1"
                    style={{
                      background: `${theme.primary}20`,
                      color: theme.primary,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 md:w-6 h-4 md:h-6"
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
                    <h4 className="font-bold text-sm md:text-base lg:text-lg mb-1">Address</h4>
                    <p className="text-gray-600 text-xs md:text-sm lg:text-base">
                      123 Luxury Street<br />
                      Shopping District, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl lg:rounded-2xl transition-all duration-700"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
                  border: `2px solid ${theme.primary}20`,
                }}
              >
                <h4 className="font-bold text-sm md:text-base lg:text-lg mb-3 md:mb-4">Follow Us</h4>
                <div className="flex gap-3 md:gap-4">
                  {["Facebook", "Twitter", "Instagram"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: `${theme.primary}15`,
                        color: theme.primary,
                      }}
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
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
        className="relative z-10 py-4 md:py-6 lg:py-8 transition-all duration-700 mt-auto"
        style={{
          background: `linear-gradient(to top, ${theme.primary}15, transparent)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-xs md:text-sm lg:text-base">
            &copy; 2025 LuxeShop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}