import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

// With a custom domain (client/public/CNAME) the site is served from the root;
// otherwise from the GitHub Pages project subpath. VITE_BASE_PATH overrides both.
const hasCustomDomain = fs.existsSync(path.resolve(import.meta.dirname, "client", "public", "CNAME"));
const productionBase = hasCustomDomain ? "/" : "/maanav-sahayatha-trust/";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === "production" ? productionBase : "/"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
