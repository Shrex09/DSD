import { useEffect } from "react";
import { companyConfig } from "@/config/company";
import type { SEOProps } from "@/types";

/**
 * Dynamically updates the document title and meta description.
 * Returns null — renders nothing in the DOM.
 *
 * @param title       - Page-specific title suffix (e.g. "About Us")
 * @param description - Page-specific meta description for SEO
 */
const SEO = ({ title, description }: SEOProps): null => {
  useEffect(() => {
    // Always show the brand name in the tab — page-specific titles are kept
    // only for accessibility/SEO via the meta description below.
    document.title = companyConfig.name;

    // Manage meta description tag
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description ?? companyConfig.description;
  }, [title, description]);

  return null;
};

export default SEO;
