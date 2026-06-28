/**
 * Common UI component prop types and primitive types shared across components.
 */

export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  fullScreen?: boolean;
  size?: LoaderSize;
}

export interface SEOProps {
  title?: string;
  description?: string;
}

/** Props for inline custom SVG icon components */
export type SvgIconProps = React.SVGProps<SVGSVGElement>;

export interface PageHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  className?: string;
  containerClassName?: string;
}

export interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
