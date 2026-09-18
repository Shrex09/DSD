/**
 * Pre-renders each public page to static HTML after `vite build`, so search
 * engines and link previews get real content, titles and canonical URLs
 * without running JavaScript. The browser then hydrates this HTML.
 *
 * Output: dist/index.html (home), dist/<page>.html (served at /<page> via
 * vercel.json cleanUrls) and dist/app-shell.html (empty shell for any other URL).
 */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Keep in sync with public/sitemap.xml
const PAGES = [
  { url: "/", file: "index.html", source: "src/modules/public/pages/Home.tsx" },
  { url: "/about", file: "about.html", source: "src/modules/public/pages/About.tsx" },
  { url: "/services", file: "services.html", source: "src/modules/public/pages/Services.tsx" },
  { url: "/team", file: "team.html", source: "src/modules/public/pages/Team.tsx" },
  { url: "/contact", file: "contact.html", source: "src/modules/public/pages/Contact.tsx" },
];

const dist = resolve("dist");
const template = readFileSync(resolve(dist, "index.html"), "utf-8");
const manifest = JSON.parse(readFileSync(resolve(dist, ".vite/manifest.json"), "utf-8"));
const { render } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);

const escapeAttr = (value) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** CSS + JS for a lazily-loaded page chunk, so it's styled on first paint. */
const assetTags = (source) => {
  const css = new Set();
  const js = new Set();
  const visit = (key) => {
    const entry = manifest[key];
    if (!entry || entry.isEntry) return;
    js.add(entry.file);
    entry.css?.forEach((file) => css.add(file));
    entry.imports?.forEach(visit);
  };
  visit(source);
  return [
    ...[...css].map((file) => `<link rel="stylesheet" href="/${file}" />`),
    ...[...js].map((file) => `<link rel="modulepreload" href="/${file}" />`),
  ].join("\n    ");
};

const seoBlock = /<!--seo-start[\s\S]*?<!--seo-end-->/;
if (!seoBlock.test(template)) throw new Error("index.html is missing the <!--seo-start--> … <!--seo-end--> markers");

writeFileSync(resolve(dist, "app-shell.html"), template);

for (const page of PAGES) {
  const { html, head } = await render(page.url);
  if (!head) throw new Error(`${page.url}: page did not render an <SEO> component`);
  if (!html.includes("<main")) throw new Error(`${page.url}: rendered HTML has no <main> content`);

  const title = escapeAttr(head.title);
  const description = escapeAttr(head.description);
  const headTags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${head.noindex ? "noindex, follow" : "index, follow"}" />`,
    `<link rel="canonical" href="${head.url}" />`,
    `<meta property="og:url" content="${head.url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    assetTags(page.source),
  ].join("\n    ");

  const output = template
    .replace(seoBlock, headTags)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  writeFileSync(resolve(dist, page.file), output);
  console.log(`prerendered ${page.url} -> dist/${page.file} (${(html.length / 1024).toFixed(1)} KB)`);
}

rmSync(resolve(dist, ".vite"), { recursive: true, force: true });
rmSync(resolve("dist-ssr"), { recursive: true, force: true });
