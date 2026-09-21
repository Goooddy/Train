import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * The reduced-motion contract in §11 is part of the Definition of Done, and it
 * cannot be observed in the preview pane: the pane exposes no way to emulate
 * `prefers-reduced-motion` and stops running requestAnimationFrame, so every
 * animation appears frozen at its starting state whether or not the code is
 * correct. These tests answer the question deterministically instead.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
});
