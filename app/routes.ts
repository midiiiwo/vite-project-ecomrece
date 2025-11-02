import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contact", "routes/contact.tsx"),
  route("shop", "routes/shop.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
