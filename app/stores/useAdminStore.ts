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
        },
        {
          id: "fashion-2",
          name: "Designer Jeans",
          price: 129.99,
          category: "Fashion",
          description: "Classic fit denim jeans with modern styling",
          image: "",
        },
        {
          id: "fashion-3",
          name: "Leather Jacket",
          price: 299.99,
          category: "Fashion",
          description: "Genuine leather jacket with premium finish",
          image: "",
        },
        {
          id: "fashion-4",
          name: "Summer Dress",
          price: 89.99,
          category: "Fashion",
          description: "Light and breezy dress perfect for summer",
          image: "",
        },
        {
          id: "fashion-5",
          name: "Formal Shirt",
          price: 79.99,
          category: "Fashion",
          description: "Crisp formal shirt for professional occasions",
          image: "",
        },
        {
          id: "fashion-6",
          name: "Casual Blazer",
          price: 199.99,
          category: "Fashion",
          description: "Versatile blazer for smart casual looks",
          image: "",
        },

        // Electronics products
        {
          id: "electronics-1",
          name: "Wireless Headphones",
          price: 199.99,
          category: "Electronics",
          description: "Premium noise-cancelling wireless headphones",
          image: "",
        },
        {
          id: "electronics-2",
          name: "Smart Speaker",
          price: 129.99,
          category: "Electronics",
          description: "Voice-activated smart speaker with AI assistant",
          image: "",
        },
        {
          id: "electronics-3",
          name: "4K Monitor",
          price: 449.99,
          category: "Electronics",
          description: "Ultra HD 27-inch display for work and gaming",
          image: "",
        },
        {
          id: "electronics-4",
          name: "Mechanical Keyboard",
          price: 159.99,
          category: "Electronics",
          description: "RGB backlit mechanical gaming keyboard",
          image: "",
        },
        {
          id: "electronics-5",
          name: "Webcam HD",
          price: 89.99,
          category: "Electronics",
          description: "High definition webcam for video calls",
          image: "",
        },
        {
          id: "electronics-6",
          name: "Portable Charger",
          price: 49.99,
          category: "Electronics",
          description: "20,000mAh power bank with fast charging",
          image: "",
        },

        // Footwear products
        {
          id: "footwear-1",
          name: "Running Shoes",
          price: 139.99,
          category: "Footwear",
          description: "Lightweight running shoes with excellent cushioning",
          image: "",
        },
        {
          id: "footwear-2",
          name: "Leather Boots",
          price: 249.99,
          category: "Footwear",
          description: "Durable leather boots for all seasons",
          image: "",
        },
        {
          id: "footwear-3",
          name: "Canvas Sneakers",
          price: 69.99,
          category: "Footwear",
          description: "Classic canvas sneakers in multiple colors",
          image: "",
        },
        {
          id: "footwear-4",
          name: "Formal Shoes",
          price: 179.99,
          category: "Footwear",
          description: "Elegant formal shoes for professional settings",
          image: "",
        },

        // Accessories
        {
          id: "accessories-1",
          name: "Leather Wallet",
          price: 59.99,
          category: "Accessories",
          description: "Genuine leather bi-fold wallet",
          image: "",
        },
        {
          id: "accessories-2",
          name: "Designer Sunglasses",
          price: 149.99,
          category: "Accessories",
          description: "UV protection sunglasses with premium frames",
          image: "",
        },
        {
          id: "accessories-3",
          name: "Leather Belt",
          price: 49.99,
          category: "Accessories",
          description: "Classic leather belt with silver buckle",
          image: "",
        },
        {
          id: "accessories-4",
          name: "Backpack",
          price: 89.99,
          category: "Accessories",
          description: "Spacious backpack with laptop compartment",
          image: "",
        },

        // Smart Watches
        {
          id: "smartwatches-1",
          name: "Fitness Tracker",
          price: 199.99,
          category: "Smart Watches",
          description: "Track your health and fitness goals",
          image: "",
        },
        {
          id: "smartwatches-2",
          name: "Premium Smartwatch",
          price: 399.99,
          category: "Smart Watches",
          description: "Full-featured smartwatch with GPS",
          image: "",
        },

        // Fragrances
        {
          id: "sprays-1",
          name: "Luxury Perfume",
          price: 119.99,
          category: "Fragrances",
          description: "Elegant fragrance for special occasions",
          image: "",
        },
        {
          id: "sprays-2",
          name: "Body Spray",
          price: 29.99,
          category: "Fragrances",
          description: "Fresh daily body spray",
          image: "",
        },

        // Children
        {
          id: "children-1",
          name: "Kids T-Shirt Set",
          price: 39.99,
          category: "Children's Wear",
          description: "Comfortable cotton t-shirts for kids",
          image: "",
        },
        {
          id: "children-2",
          name: "Kids Sneakers",
          price: 59.99,
          category: "Children's Wear",
          description: "Durable and stylish sneakers for active kids",
          image: "",
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
