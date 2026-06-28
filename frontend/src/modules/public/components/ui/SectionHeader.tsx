import React from "react";
import type { SectionHeaderProps } from "@/types";
import { cn } from "@/utils";

/**
 * Section header with badge tag, heading, and optional subtitle.
 * Used in every section on every page (~20+ occurrences).
 *
 * @example
 * <SectionHeader
 *   badge="Our Services"
 *   title="Premium Protection Solutions"
 *   subtitle="Optional subtitle text"
 *   centered
 * />
 */
const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeaderProps): React.JSX.Element => {
  return (
    <div className={cn("flex flex-col gap-3", centered && "text-center items-center", className)}>
      <span className="section-tag-gold">{badge}</span>
      <h2 className="section-headline-dark">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 max-w-lg leading-relaxed">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
