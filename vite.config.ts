import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// GitHub Pages serves this project from /Mammina/, same as the previous static site.
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const base = isGitHubPages ? "/Mammina/" : "/";

export default defineConfig({
  base,
  plugins: [tsConfigPaths(), tailwindcss(), viteReact()],
  build: {
    outDir: "dist",
  },
});
