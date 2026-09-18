import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./modules/public/styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "[main.tsx] Root element with id='root' was not found in the DOM. " +
      "Ensure index.html contains <div id='root'></div>."
  );
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pre-rendered pages (see scripts/prerender.mjs) arrive with HTML already in #root
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
