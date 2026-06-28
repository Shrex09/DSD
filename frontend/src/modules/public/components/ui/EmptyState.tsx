import React from "react";
import { ShieldAlert } from "lucide-react";
import type { EmptyStateProps } from "@/types";

/**
 * Empty state component for when a data list has no items.
 * Used in Guards roster (no guards loaded) and future admin views.
 *
 * @example
 * <EmptyState
 *   title="No guards found"
 *   description="Guard roster could not be loaded."
 * />
 */
const EmptyState = ({ title, description, icon, action }: EmptyStateProps): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
        {icon ?? <ShieldAlert className="w-8 h-8" />}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-slate-700 uppercase tracking-wider">{title}</h3>
        {description && (
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
