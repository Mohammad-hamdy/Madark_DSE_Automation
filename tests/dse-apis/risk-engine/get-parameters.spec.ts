import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
const { config, getTestData } = configModule;

import { DSEService } from "@madark-dse-api/service/DSEService";
import LoginRequest from "@madark-dse-api/model/01-LoginRequest";
import { DSE_STEP_NAMES } from "@madark-dse-api/utils/constants/steps/stepNames";

test.describe("DSE - Risk Engine: Get Step Parameters", () => {
  let dse: DSEService;

  test.beforeEach(async ({ request }) => {
    dse = new DSEService(request);

    const loginPayload = new LoginRequest()
      .setUsername(config.dseUsername)
      .setPassword(config.dsePassword)
      .build();

    const loginResponse = await dse.login(loginPayload);
    expect(loginResponse.token).toBeDefined();
  });

  test(
    "Validate Step 1 (AML Fraud) parameters are returned",
    { tag: ["@dse", "@riskEngine", "@parameters", "@amlFraud"] },
    async () => {
      const response = await dse.getAmlFraudParameters();

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Validate Step 2 (KYC Eligibility) parameters are returned",
    { tag: ["@dse", "@riskEngine", "@parameters", "@kycEligibility"] },
    async () => {
      const response = await dse.getKycEligibilityParameters();

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Validate Step 3 (Employment / Salary) parameters are returned",
    { tag: ["@dse", "@riskEngine", "@parameters", "@employment"] },
    async () => {
      const response = await dse.getEmploymentParameters();

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Validate Step 4 (Credit Decision / SIMAH) parameters are returned",
    { tag: ["@dse", "@riskEngine", "@parameters", "@creditDecision"] },
    async () => {
      const response = await dse.getCreditDecisionParameters();

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );
});
