/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      outDir: "./dist/types",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "CesiumMartini",
      fileName: "index",
    },
    rollupOptions: {
      external: ["cesium"],
      output: {
        globals: {
          cesium: "Cesium",
        },
      },
    },
  },
  worker: {
    format: "es",
  },
});
