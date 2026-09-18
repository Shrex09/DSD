import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { companyConfig } from "@/config/company";
import { SITE_URL } from "@/config/seo";
import type { SEOProps } from "@/types";

/** Finds (or creates) a <meta>/<link> tag in <head> and sets one attribute on it. */
const setHeadTag = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const setMeta = (key: "name" | "property", id: string, content: string) =>
  setHeadTag(
    `meta[${key}="${id}"]`,
    () => {
      const meta = document.createElement("meta");
      meta.setAttribute(key, id);
      return meta;
    },
    "content",
    content
  );

/**
 * Updates the document title, description, canonical URL and social-preview
 * tags for the current route. Static defaults live in index.html so crawlers
 * that don't run JavaScript (WhatsApp, Facebook) still get a good preview.
 * Returns null — renders nothing in the DOM.
 */
const SEO = ({ title, description, noindex = false }: SEOProps): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${companyConfig.name}` : companyConfig.name;
    const desc = description ?? companyConfig.description;
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setHeadTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      url
    );
  }, [title, description, noindex, pathname]);

  return null;
};

export default SEO;
