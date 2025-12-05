import { useEffect } from "react";
import { errorLogger } from "../utils/errorLogger";

/**
 * Hook to set up global error listeners
 * Catches unhandled errors and promise rejections
 */
export function useGlobalErrorHandler() {
  useEffect(() => {
    // Handle uncaught errors
    const handleError = (event: ErrorEvent) => {
      errorLogger.error(
        "Uncaught error",
        event.error,
        {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      );
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));

      errorLogger.error(
        "Unhandled promise rejection",
        error,
        { reason: event.reason }
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);
}
