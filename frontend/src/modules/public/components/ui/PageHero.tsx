import React from "react";
import type { PageHeroProps } from "@/types";

/**
 * Page hero section used on all interior pages (About, Services, Guards, Contact).
 * Renders a dark-bg section with a gradient overlay, badge, h1, and subtitle.
 *
 * @example
 * <PageHero
 *   badge="Our Story"
 *   title="Who We Are"
 *   subtitle="Description text..."
 *   className="about-header-hero"
 *   containerClassName="about-header-container"
 * />
 */
const PageHero = ({
  badge,
  title,
  subtitle,
  className = "",
  containerClassName = "",
}: PageHeroProps): React.JSX.Element => {
  return (
    <section className={`relative ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary-light),transparent_70%)] opacity-40" />
      <div className={containerClassName}>
        <span className="page-hero-badge px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full">
          {badge}
        </span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider">{title}</h1>
        <p className="text-sm md:text-base text-slate-300 max-w-lg leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
