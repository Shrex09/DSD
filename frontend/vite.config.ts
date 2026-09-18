import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { sendInquiry } from "./server/sendInquiry";

// Serves POST /api/contact during `npm run dev` (production uses api/contact.ts on Vercel)
function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use("/api/contact", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          const result = await sendInquiry(body, env);
          res.statusCode = result.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(result.body));
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [tailwindcss(), react(), contactApiPlugin(env)],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});
