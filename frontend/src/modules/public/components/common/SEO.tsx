import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { companyConfig } from "@/config/company";
import { SITE_URL } from "@/config/seo";
import type { SEOProps } from "@/types";
import { ssrHead, type SEOHead } from "./seoHead";

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
 * Sets the document title, description, canonical URL and social-preview
 * tags for the current route. Pages are also pre-rendered at build time with
 * these tags baked into their HTML, so crawlers don't depend on JavaScript.
 * Returns null — renders nothing in the DOM.
 */
const SEO = ({ title, description, noindex = false }: SEOProps): null => {
  const { pathname } = useLocation();
  const head: SEOHead = {
    title: title ? `${title} | ${companyConfig.name}` : companyConfig.name,
    description: description ?? companyConfig.description,
    url: `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`,
    noindex,
  };

  if (typeof document === "undefined") ssrHead.current = head;

  useEffect(() => {
    document.title = head.title;
    setMeta("name", "description", head.description);
    setMeta("name", "robots", head.noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", head.title);
    setMeta("property", "og:description", head.description);
    setMeta("property", "og:url", head.url);
    setMeta("name", "twitter:title", head.title);
    setMeta("name", "twitter:description", head.description);
    setHeadTag(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      head.url
    );
  }, [head.title, head.description, head.url, head.noindex]);

  return null;
};

export default SEO;
