import { defineConfig } from "astro/config";

export default defineConfig({
  outDir: "dist",
  trailingSlash: "always",
  redirects: {
    "/": "/hub/",
  },
});
