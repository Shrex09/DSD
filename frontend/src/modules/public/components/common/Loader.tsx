import React from "react";
import { Shield } from "lucide-react";
import type { LoaderProps, LoaderSize } from "@/types";
import { cn } from "@/utils";

const SIZE_CLASSES: Record<LoaderSize, string> = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-3",
  lg: "w-16 h-16 border-4",
};

/**
 * Loading spinner used for async actions and lazy-loaded pages.
 *
 * @param fullScreen - Renders as a full-screen overlay when true
 * @param size       - Spinner size: "sm" | "md" | "lg"
 */
const Loader = ({ fullScreen = false, size = "md" }: LoaderProps): React.JSX.Element => {
  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
    : "flex flex-col items-center justify-center py-12";

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <div className="relative flex items-center justify-center">
        {/* Golden spinning outer ring */}
        <div
          className={cn(
            SIZE_CLASSES[size],
            "border-slate-700 border-t-accent rounded-full animate-spin"
          )}
          aria-hidden="true"
        />
        {/* Inner shield icon */}
        <Shield className="absolute text-accent w-4 h-4 animate-pulse-slow" aria-hidden="true" />
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
        Securing Connection...
      </p>
    </div>
  );
};

export default Loader;
