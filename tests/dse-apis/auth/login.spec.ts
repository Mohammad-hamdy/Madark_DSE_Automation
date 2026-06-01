import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
const { config, getTestData } = configModule;

import { DSEService } from "@madark-dse-api/service/DSEService";
import LoginRequest from "@madark-dse-api/model/01-LoginRequest";
import { HttpStatusCodes } from "@madark-dse-api/utils/constants/status-code/statusCode";

test.describe("DSE - Auth: Login", () => {
  test(
    "Validate successful login returns a token",
    { tag: ["@dse", "@auth", "@login"] },
    async ({ request }) => {
      const dse = new DSEService(request);

      const loginPayload = new LoginRequest()
        .setUsername(config.dseUsername)
        .setPassword(config.dsePassword)
        .build();

      const response = await dse.login(loginPayload);

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
      expect(response.token).toBeDefined();
    }
  );

  test(
    "Validate login fails with invalid credentials",
    { tag: ["@dse", "@auth", "@login", "@negative"] },
    async ({ request }) => {
      const dse = new DSEService(request);

      const loginPayload = new LoginRequest()
        .setUsername("invalid_user")
        .setPassword("invalid_pass")
        .build();

      const response = await dse.login(loginPayload);

      // TODO: Update assertion based on actual error response shape
      expect(response.token).toBeUndefined();
    }
  );
});
