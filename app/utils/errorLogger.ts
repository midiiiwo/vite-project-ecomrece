/**
 * Error Logger Utility
 * Centralized error logging for the application
 */

export type ErrorLevel = "info" | "warning" | "error" | "critical";

export interface ErrorLog {
  level: ErrorLevel;
  message: string;
  error?: Error;
  context?: Record<string, unknown>;
  timestamp: Date;
  url?: string;
  userAgent?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;

  log(level: ErrorLevel, message: string, error?: Error, context?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      level,
      message,
      error,
      context,
      timestamp: new Date(),
      url: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
    };

    this.logs.push(errorLog);

    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group(`[${level.toUpperCase()}] ${message}`);
      if (error) console.error("Error:", error);
      if (context) console.log("Context:", context);
      console.groupEnd();
    }

    // Log to external service in production (optional)
    if (import.meta.env.PROD && level === "critical") {
      this.sendToExternalService(errorLog);
    }
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log("info", message, undefined, context);
  }

  warning(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log("warning", message, error, context);
  }

  error(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log("error", message, error, context);
  }

  critical(message: string, error?: Error, context?: Record<string, unknown>) {
    this.log("critical", message, error, context);
  }

  getLogs() {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }

  private sendToExternalService(errorLog: ErrorLog) {
    // This is a placeholder for sending errors to an external service
    // In production, you'd send to services like Sentry, LogRocket, etc.
    try {
      // Example: fetch('/api/logs', { method: 'POST', body: JSON.stringify(errorLog) })
    } catch (err) {
      console.error("Failed to send error log to external service", err);
    }
  }
}

// Export singleton instance
export const errorLogger = new ErrorLogger();
