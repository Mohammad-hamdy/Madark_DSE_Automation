import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
const { config, getTestData } = configModule;

import { DSEService } from "@madark-dse-api/service/DSEService";
import LoginRequest from "@madark-dse-api/model/LoginRequest";
import ApplicationRequest from "@madark-dse-api/model/ApplicationRequest";

test.describe("DSE - Auth: Create Mock Application", () => {
  let dse: DSEService;

  test.beforeEach(async ({ request }) => {
    dse = new DSEService(request);

    // Authenticate first
    const loginPayload = new LoginRequest()
      .setUsername(config.dseUsername)
      .setPassword(config.dsePassword)
      .build();

    const loginResponse = await dse.login(loginPayload);
    expect(loginResponse.token).toBeDefined();
  });

  test(
    "Validate that a mock application can be created",
    { tag: ["@dse", "@auth", "@me"] },
    async () => {
      // TODO: Build the actual payload once you know the required fields
      const appPayload = new ApplicationRequest().build();

      const response = await dse.createMockApplication(appPayload);

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );
});
