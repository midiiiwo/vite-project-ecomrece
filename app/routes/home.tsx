import type { Route } from "../+types/root";
import { LandingTwoPanel } from "../components/LandingTwoPanel";
import { useApplyTheme } from "../hooks/useApplyTheme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "LuxeShop - Your Premium Shopping Destination" },
    {
      name: "description",
      content:
        "Discover amazing products across fashion, electronics, and more!",
    },
  ];
}

export default function Home() {
  // Apply theme on mount
  useApplyTheme();

  return <LandingTwoPanel />;
}

/*
 * OLD IMPLEMENTATION REFERENCE
 *
 * This commented section contains the previous implementation of the Home component
 * with category grids, product displays, and shopping cart functionality.
 * It's kept for reference during development and potential future iterations.
 *
 * Key features of the old implementation:
 * - Interactive category grid with hover effects
 * - Dynamic theme switching based on category selection
 * - Product display section with add-to-cart functionality
 * - Animated background and transitions
 * - Shopping cart integration
 *
 * The current implementation uses the LandingTwoPanel component which provides
 * a different layout and user experience approach.
 */

/* OLD CATEGORIES DATA FOR REFERENCE
const categories = [
  {
    id: "clothes",
    name: "Fashion Clothing",
    description: "Trendy clothes for ladies & men",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-16"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>
    ),
  },
  {
    id: "electrical",
    name: "Electrical Gadgets",
    description: "Latest tech & electronics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-16 h-16"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
        />
      </svg>
    ),
  },
  // ... more category objects
];
*/

/* OLD HOME COMPONENT IMPLEMENTATION
function HomeOld() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId);
    // Smooth scroll to products section
    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const handleAddToCart = (productId: number) => {
    const product: Product = {
      id: `${selectedCategory}-${productId}`,
      name: `Premium Product ${productId}`,
      price: 99.99,
      category: categoryThemes[selectedCategory || "clothes"].name,
      description: "High quality item from our collection",
    };
    addItem(product);
    openCart();
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated Background */
/* Header */
/* Hero Section */
/* Category Grid */
/* Products Section */
/* Call to Action */
/* Footer */
/* </div>
  );
}
*/
