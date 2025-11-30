import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Cart } from "./components/Cart";
import { ThemeProvider } from "./contexts/ThemeContext";
import { errorLogger } from "./utils/errorLogger";
import { Suspense } from "react";
import { useGlobalErrorHandler } from "./hooks/useGlobalErrorHandler";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useGlobalErrorHandler();

  return (
    <ThemeProvider>
      <ErrorBoundaryWrapper>
        <Outlet />
        <Cart />
      </ErrorBoundaryWrapper>
    </ThemeProvider>
  );
}

function ErrorBoundaryWrapper({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    errorLogger.error(
      "Caught error in ErrorBoundaryWrapper",
      error instanceof Error ? error : new Error(String(error))
    );
    return (
      <main className="pt-16 p-4 container mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
        <p className="text-gray-600 mt-2">
          We've encountered an unexpected error. Please try refreshing the page.
        </p>
      </main>
    );
  }
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  // Log the error
  if (isRouteErrorResponse(error)) {
    errorLogger.warning(
      `Route error: ${error.status} ${error.statusText}`,
      undefined,
      { status: error.status, statusText: error.statusText }
    );
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    errorLogger.error("Unhandled error", error);
    details = error.message;
    stack = error.stack;
  } else {
    errorLogger.error("Unknown error type", new Error(String(error)));
    details = String(error);
  }

  return (
    <main className="pt-16 p-4 container mx-auto min-h-screen flex flex-col justify-center">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-red-600 mb-2">{message}</h1>
        <p className="text-gray-700 mb-4">{details}</p>
        {stack && (
          <details className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
              Error Details (for debugging)
            </summary>
            <pre className="w-full p-4 overflow-x-auto text-xs text-gray-600 mt-4 bg-white rounded">
              <code>{stack}</code>
            </pre>
          </details>
        )}
        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go back to home
        </button>
      </div>
    </main>
  );
}
