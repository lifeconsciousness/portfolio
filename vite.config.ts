import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sassDts from "vite-plugin-sass-dts";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";
const cwd = process.cwd();

// https://vite.dev/config/
export default defineConfig({
  // base: "./",
  // base: "/portfolio/",
  base: process.env.PRODUCTION == "true" ? "/portfolio/" : './',
  
  publicDir: path.join(cwd, "public"),
  root: path.join(cwd, "src"),
  server: {
    port: 8080,
    strictPort: true,
  },
  plugins: [
    mkcert(),
    react(),
    sassDts(),
    tsconfigPaths(),
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        dir: path.join(cwd, "dist"),
      },
    },
  },
})



