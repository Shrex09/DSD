import { Component } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "@/types";

/**
 * Class-based error boundary that catches unhandled React render errors.
 * Prevents a single component crash from white-screening the entire application.
 *
 * Wrap the root of your application (or subtrees) with this component.
 *
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // In production, send to an error reporting service (e.g. Sentry)
    console.error("[ErrorBoundary] Uncaught error:", error, info.componentStack);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback — styled to match the app's security console aesthetic
      return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary px-6 py-16 text-center gap-6">
          <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
              Application Error
            </h1>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              An unexpected error occurred. Please refresh the page or contact support if the
              problem persists.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-accent hover:bg-accent-hover text-primary font-bold uppercase tracking-wider text-xs rounded transition-colors duration-300"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
