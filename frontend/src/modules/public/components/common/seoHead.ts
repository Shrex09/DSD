export interface SEOHead {
  title: string;
  description: string;
  url: string;
  noindex: boolean;
}

/**
 * Head tags captured by <SEO> while pre-rendering pages at build time
 * (see scripts/prerender.mjs). Always null in the browser.
 */
export const ssrHead: { current: SEOHead | null } = { current: null };
