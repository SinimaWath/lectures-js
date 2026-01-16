import { devices } from "@playwright/test";

export default {
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: {
    command: "npx http-server ./ -p 3000 -c-1",
    port: 3000,
    reuseExistingServer: true,
    timeout: 120_000
  }
};
