import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    environment: "happy-dom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,

    coverage: {
      exclude: ["src/components/ui", "src/utils", "src/types"],
    },
  },
});
