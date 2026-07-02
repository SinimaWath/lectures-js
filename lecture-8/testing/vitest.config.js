import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["unit/**/*.test.js", "task/**/*.test.js"],
    setupFiles: ["./vitest.setup.js"],
    clearMocks: true,
  },
});
