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
  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B2E6F]"
        role="status"
        aria-label="Loading"
      >
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            {/* Soft gold/blue glow behind the logo */}
            <div className="absolute w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse-slow" />
            <img
              src="/logos/logo-for-dark-bg.png"
              alt="DSD Official Logo"
              className="h-24 w-auto object-contain relative z-10 animate-pulse-slow"
              style={{
                filter: "drop-shadow(0 4px 20px rgba(214, 175, 55, 0.2))"
              }}
            />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-300 animate-pulse">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  const containerClasses = "flex flex-col items-center justify-center py-12";

  return (
    <div className={containerClasses} role="status" aria-label="Loading">
      <div className="relative flex items-center justify-center">
        {/* Golden spinning outer ring */}
        <div
          className={cn(
            SIZE_CLASSES[size],
            "border-slate-300 border-t-primary rounded-full animate-spin"
          )}
          aria-hidden="true"
        />
        {/* Inner shield icon */}
        <Shield className="absolute text-primary w-4 h-4 animate-pulse-slow" aria-hidden="true" />
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
        Securing Connection...
      </p>
    </div>
  );
};

export default Loader;
