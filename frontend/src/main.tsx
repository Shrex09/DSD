import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./modules/public/styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "[main.tsx] Root element with id='root' was not found in the DOM. " +
      "Ensure index.html contains <div id='root'></div>."
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
