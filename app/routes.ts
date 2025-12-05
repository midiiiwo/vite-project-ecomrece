import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("shop", "routes/shop.tsx"),
  route("product/:id", "routes/product.tsx"),
  route("cart", "routes/cart.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("admin", "routes/admin.tsx"),
  route("admin/products", "routes/admin.products.tsx"),
  route("admin/orders", "routes/admin.orders.tsx"),
  route("admin/notifications", "routes/admin.notifications.tsx"),
  route("admin/settings", "routes/admin.settings.tsx"),
  route("admin/categories", "routes/admin.categories.tsx"),
] satisfies RouteConfig;