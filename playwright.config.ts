import { defineConfig } from "@playwright/test";
import configModule from "@configuration/config";
const { loadConfig } = configModule;
loadConfig();

export default defineConfig({
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 60 * 1000,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ["list"],
    ["junit", { outputFile: "test-results/junit-results.xml" }],
  ],
  use: {
    headless: true,
    trace: "on",
  },
  projects: [
    {
      name: "API Tests",
      use: {},
    },
  ],
  testDir: "./tests",
});
