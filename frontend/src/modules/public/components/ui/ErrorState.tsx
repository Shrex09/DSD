import React from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";
import type { ErrorStateProps } from "@/types";

/**
 * Error state component for failed data fetches.
 * Used in Guards page on fetch error and future admin data grids.
 *
 * @example
 * <ErrorState
 *   title="Failed to load guard roster"
 *   description="Connection to the server failed."
 *   onRetry={handleRetry}
 * />
 */
const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-400">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-slate-700 uppercase tracking-wider">{title}</h3>
        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">{description}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-accent hover:bg-accent-hover text-primary rounded transition-colors duration-200"
          aria-label="Retry loading data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
