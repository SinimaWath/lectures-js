import { devices } from "@playwright/test";

// Cypress
// Selenium
export default {
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
  ],
  webServer: [
    {
      command: "npx http-server ./ui -p 3000 -c-1",
      port: 3000,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: "npm --prefix ../../lecture-7/books run dev -- --host 127.0.0.1 --port 4173",
      port: 4173,
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
};
