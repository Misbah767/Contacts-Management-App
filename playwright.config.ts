import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e", // Folder for your Playwright tests
  timeout: 30 * 1000, // 30 seconds per test
  retries: 1, // Retry once if a test fails
  fullyParallel: true, // Run tests in parallel for speed
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]],

  use: {
    baseURL: "http://localhost:3000", // your Next.js dev server
    headless: true, // change to false to see the browser
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    trace: "on-first-retry", // keeps a trace when a test fails
    screenshot: "only-on-failure", // take screenshots only when something breaks
    video: "on", //  always record video
    // Uncomment this line if you want slow motion during debugging:
    // slowMo: 500,
  },

  // Optional: run against different browsers/devices
  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "WebKit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Automatically start the dev server before running tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    timeout: 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
