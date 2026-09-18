import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "@/modules/public/routes";
import ErrorBoundary from "@/modules/public/components/common/ErrorBoundary";
import { ssrHead, type SEOHead } from "@/modules/public/components/common/seoHead";

/**
 * Build-time renderer used by scripts/prerender.mjs. Must mirror the tree in
 * App.tsx / main.tsx so the browser can hydrate the generated HTML.
 */
export async function render(url: string): Promise<{ html: string; head: SEOHead | null }> {
  ssrHead.current = null;
  const { prelude } = await prerender(
    <StrictMode>
      <ErrorBoundary>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </ErrorBoundary>
    </StrictMode>
  );
  const html = await new Response(prelude).text();
  return { html, head: ssrHead.current };
}
