import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./useStore";

type AdminStore = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      products: [
        // Fashion products
        {
          id: "fashion-1",
          name: "Premium Cotton T-Shirt",
          price: 49.99,
          category: "Fashion",
          description: "Soft, breathable cotton t-shirt for everyday wear",
          image: "",
          specs: ["100% Cotton", "Machine Washable", "Available sizes: XS-XXL"],
          features: ["Breathable", "Durable", "Fade-resistant"],
          rating: 4.5,
          reviews: 128,
          stock: 45,
        },
        {
          id: "fashion-2",
          name: "Designer Jeans",
          price: 129.99,
          category: "Fashion",
          description: "Classic fit denim jeans with modern styling",
          image: "",
          specs: ["98% Cotton, 2% Elastane", "Slim Fit", "Waist sizes: 28-38"],
          features: ["Stretchable", "Comfortable fit", "Premium denim"],
          rating: 4.7,
          reviews: 256,
          stock: 62,
        },
        {
          id: "fashion-3",
          name: "Leather Jacket",
          price: 299.99,
          category: "Fashion",
          description: "Genuine leather jacket with premium finish",
          image: "",
          specs: ["100% Genuine Leather", "Inner lining", "Metal zippers"],
          features: ["Premium quality", "Weather resistant", "Timeless style"],
          rating: 4.8,
          reviews: 89,
          stock: 18,
        },
        {
          id: "fashion-4",
          name: "Summer Dress",
          price: 89.99,
          category: "Fashion",
          description: "Light and breezy dress perfect for summer",
          image: "",
          specs: ["100% Rayon", "Floor length", "Sizes: XS-XL"],
          features: ["Lightweight", "Breathable", "Easy care"],
          rating: 4.4,
          reviews: 142,
          stock: 73,
        },
        {
          id: "fashion-5",
          name: "Formal Shirt",
          price: 79.99,
          category: "Fashion",
          description: "Crisp formal shirt for professional occasions",
          image: "",
          specs: ["100% Cotton Poplin", "Spread collar", "Neck: 14-17.5"],
          features: ["Wrinkle-free finish", "Professional look", "Easy iron"],
          rating: 4.6,
          reviews: 195,
          stock: 51,
        },
        {
          id: "fashion-6",
          name: "Casual Blazer",
          price: 199.99,
          category: "Fashion",
          description: "Versatile blazer for smart casual looks",
          image: "",
          specs: ["65% Polyester, 35% Cotton", "Single breasted", "Sizes: XS-XL"],
          features: ["Lightweight", "Versatile", "Structured fit"],
          rating: 4.7,
          reviews: 114,
          stock: 38,
        },

        // Electronics products
        {
          id: "electronics-1",
          name: "Wireless Headphones",
          price: 199.99,
          category: "Electronics",
          description: "Premium noise-cancelling wireless headphones",
          image: "",
          specs: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.0"],
          features: ["Comfort fit", "Built-in microphone", "Touch controls"],
          rating: 4.8,
          reviews: 412,
          stock: 34,
        },
        {
          id: "electronics-2",
          name: "Smart Speaker",
          price: 129.99,
          category: "Electronics",
          description: "Voice-activated smart speaker with AI assistant",
          image: "",
          specs: ["WiFi enabled", "360° sound", "Voice control"],
          features: ["AI assistant", "Music streaming", "Home automation"],
          rating: 4.5,
          reviews: 287,
          stock: 56,
        },
        {
          id: "electronics-3",
          name: "4K Monitor",
          price: 449.99,
          category: "Electronics",
          description: "Ultra HD 27-inch display for work and gaming",
          image: "",
          specs: ["27-inch 4K UHD", "60Hz refresh rate", "USB-C connectivity"],
          features: ["Color accurate", "HDR support", "Height adjustable"],
          rating: 4.7,
          reviews: 156,
          stock: 22,
        },
        {
          id: "electronics-4",
          name: "Mechanical Keyboard",
          price: 159.99,
          category: "Electronics",
          description: "RGB backlit mechanical gaming keyboard",
          image: "",
          specs: ["Cherry MX switches", "RGB backlighting", "Programmable keys"],
          features: ["Gaming grade", "Durable", "Customizable"],
          rating: 4.6,
          reviews: 231,
          stock: 41,
        },
        {
          id: "electronics-5",
          name: "Webcam HD",
          price: 89.99,
          category: "Electronics",
          description: "High definition webcam for video calls",
          image: "",
          specs: ["1080p HD", "Auto-focus", "Built-in microphone"],
          features: ["USB plug & play", "Wide angle lens", "Low light correction"],
          rating: 4.4,
          reviews: 178,
          stock: 67,
        },
        {
          id: "electronics-6",
          name: "Portable Charger",
          price: 49.99,
          category: "Electronics",
          description: "20,000mAh power bank with fast charging",
          image: "",
          specs: ["20,000mAh capacity", "18W fast charge", "2 USB ports"],
          features: ["Lightweight", "LED display", "Multi-device compatible"],
          rating: 4.5,
          reviews: 389,
          stock: 103,
        },

        // Footwear products
        {
          id: "footwear-1",
          name: "Running Shoes",
          price: 139.99,
          category: "Footwear",
          description: "Lightweight running shoes with excellent cushioning",
          image: "",
          specs: ["Memory foam insole", "Breathable mesh", "Sizes: 5-14"],
          features: ["Lightweight", "Cushioned", "Anti-slip sole"],
          rating: 4.7,
          reviews: 245,
          stock: 58,
        },
        {
          id: "footwear-2",
          name: "Leather Boots",
          price: 249.99,
          category: "Footwear",
          description: "Durable leather boots for all seasons",
          image: "",
          specs: ["100% Genuine Leather", "Lug sole", "Sizes: 5-13"],
          features: ["Water resistant", "Durable", "Comfortable fit"],
          rating: 4.8,
          reviews: 167,
          stock: 29,
        },
        {
          id: "footwear-3",
          name: "Canvas Sneakers",
          price: 69.99,
          category: "Footwear",
          description: "Classic canvas sneakers in multiple colors",
          image: "",
          specs: ["100% Canvas", "Rubber sole", "Sizes: 5-14"],
          features: ["Versatile", "Lightweight", "Easy to clean"],
          rating: 4.5,
          reviews: 312,
          stock: 89,
        },
        {
          id: "footwear-4",
          name: "Formal Shoes",
          price: 179.99,
          category: "Footwear",
          description: "Elegant formal shoes for professional settings",
          image: "",
          specs: ["Genuine leather", "Cushioned insole", "Sizes: 6-13"],
          features: ["Professional look", "Comfortable", "Premium finish"],
          rating: 4.7,
          reviews: 134,
          stock: 35,
        },

        // Accessories
        {
          id: "accessories-1",
          name: "Leather Wallet",
          price: 59.99,
          category: "Accessories",
          description: "Genuine leather bi-fold wallet",
          image: "",
          specs: ["100% Genuine Leather", "6 card slots", "Billfold design"],
          features: ["Durable", "RFID protection", "Quality stitching"],
          rating: 4.6,
          reviews: 201,
          stock: 74,
        },
        {
          id: "accessories-2",
          name: "Designer Sunglasses",
          price: 149.99,
          category: "Accessories",
          description: "UV protection sunglasses with premium frames",
          image: "",
          specs: ["UV400 protection", "Polarized lenses", "Designer frames"],
          features: ["Style & protection", "Lightweight", "Case included"],
          rating: 4.7,
          reviews: 163,
          stock: 42,
        },
        {
          id: "accessories-3",
          name: "Leather Belt",
          price: 49.99,
          category: "Accessories",
          description: "Classic leather belt with silver buckle",
          image: "",
          specs: ["Genuine Leather", "Metal buckle", "Sizes: 28-40"],
          features: ["Classic design", "Premium quality", "Versatile"],
          rating: 4.5,
          reviews: 145,
          stock: 81,
        },
        {
          id: "accessories-4",
          name: "Backpack",
          price: 89.99,
          category: "Accessories",
          description: "Spacious backpack with laptop compartment",
          image: "",
          specs: ["30L capacity", "Laptop sleeve", "Water-resistant"],
          features: ["Ergonomic design", "Multiple compartments", "Durable material"],
          rating: 4.6,
          reviews: 218,
          stock: 53,
        },

        // Smart Watches
        {
          id: "smartwatches-1",
          name: "Fitness Tracker",
          price: 199.99,
          category: "Smart Watches",
          description: "Track your health and fitness goals",
          image: "",
          specs: ["Heart rate monitor", "7-day battery", "Water resistant"],
          features: ["Activity tracking", "Sleep monitoring", "Notifications"],
          rating: 4.6,
          reviews: 287,
          stock: 44,
        },
        {
          id: "smartwatches-2",
          name: "Premium Smartwatch",
          price: 399.99,
          category: "Smart Watches",
          description: "Full-featured smartwatch with GPS",
          image: "",
          specs: ["GPS enabled", "3-day battery", "AMOLED display"],
          features: ["Fitness tracking", "Contactless payment", "Phone integration"],
          rating: 4.8,
          reviews: 156,
          stock: 23,
        },

        // Fragrances
        {
          id: "sprays-1",
          name: "Luxury Perfume",
          price: 119.99,
          category: "Fragrances",
          description: "Elegant fragrance for special occasions",
          image: "",
          specs: ["100ml bottle", "Eau de Parfum", "Long-lasting"],
          features: ["Premium scent", "Elegant packaging", "Unisex"],
          rating: 4.7,
          reviews: 95,
          stock: 36,
        },
        {
          id: "sprays-2",
          name: "Body Spray",
          price: 29.99,
          category: "Fragrances",
          description: "Fresh daily body spray",
          image: "",
          specs: ["150ml bottle", "Fresh scent", "All day wear"],
          features: ["Lightweight", "Refreshing", "Affordable"],
          rating: 4.4,
          reviews: 211,
          stock: 127,
        },

        // Children
        {
          id: "children-1",
          name: "Kids T-Shirt Set",
          price: 39.99,
          category: "Children's Wear",
          description: "Comfortable cotton t-shirts for kids",
          image: "",
          specs: ["100% Cotton", "3-piece set", "Sizes: 2-12 years"],
          features: ["Soft & comfortable", "Colorful designs", "Easy care"],
          rating: 4.5,
          reviews: 176,
          stock: 92,
        },
        {
          id: "children-2",
          name: "Kids Sneakers",
          price: 59.99,
          category: "Children's Wear",
          description: "Durable and stylish sneakers for active kids",
          image: "",
          specs: ["Breathable mesh", "Flexible sole", "Sizes: 10-4"],
          features: ["Comfortable fit", "Durable", "Colorful designs"],
          rating: 4.6,
          reviews: 143,
          stock: 68,
        },
      ],
      isLoading: false,
      error: null,

      addProduct: (productData) => {
        const id = `${productData.category.toLowerCase()}-${Date.now()}`;
        const newProduct: Product = {
          ...productData,
          id,
        };
        set((state) => ({
          products: [...state.products, newProduct],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },

      getProduct: (id) => {
        return get().products.find((product) => product.id === id);
      },

      setError: (error) => {
        set({ error });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "admin-storage",
    }
  )
);
