
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import svgLoader from "vite-svg-loader";
import viteCompression from 'vite-plugin-compression'
import {defineConfig} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
  ],
  optimizeDeps: {
    include: ["ogl"],
    force: true,
  },
  build: {
    cssCodeSplit: true,
    minify: "esbuild",
  },
  server: {
    allowedHosts: [""]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})