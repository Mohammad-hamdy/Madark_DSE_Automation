import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
const { config, getTestData } = configModule;

import { DSEService } from "@madark-dse-api/service/DSEService";
import LoginRequest from "@madark-dse-api/model/LoginRequest";
import EvaluateRequest from "@madark-dse-api/model/EvaluateRequest";

test.describe("DSE - Risk Engine: Evaluate Steps", () => {
  let dse: DSEService;
  let madarkApplicationId: string;
  let applicationId: string;

  test.beforeEach(async ({ request }) => {
    dse = new DSEService(request);

    const loginPayload = new LoginRequest()
      .setUsername(config.dseUsername)
      .setPassword(config.dsePassword)
      .build();

    const loginResponse = await dse.login(loginPayload);
    expect(loginResponse.token).toBeDefined();

    // TODO: Replace with actual IDs from test data or from a setup call
    madarkApplicationId = getTestData?.application?.madarkApplicationId ?? "";
    applicationId = getTestData?.application?.applicationId ?? "";
  });

  test(
    "Step 1 - Evaluate AML Fraud",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@amlFraud"] },
    async () => {
      // TODO: Build payload with actual parameters required by the AML Fraud step
      const payload = new EvaluateRequest().build();

      const response = await dse.evaluateAmlFraud(madarkApplicationId, payload);

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Step 2 - Evaluate KYC Eligibility",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@kycEligibility"] },
    async () => {
      // TODO: Build payload with actual parameters required by the KYC Eligibility step
      const payload = new EvaluateRequest().build();

      const response = await dse.evaluateKycEligibility(
        madarkApplicationId,
        payload
      );

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Step 3 - Evaluate Sector Salary (Employment)",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@sectorSalary"] },
    async () => {
      // TODO: Build payload with actual parameters required by the Sector Salary step
      const payload = new EvaluateRequest().build();

      const response = await dse.evaluateSectorSalary(applicationId, payload);

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );

  test(
    "Step 4 - Evaluate SIMAH Bureau (Credit Decision - Final Step)",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@simahBureau"] },
    async () => {
      // TODO: Build payload with actual parameters required by the SIMAH Bureau step
      const payload = new EvaluateRequest().build();

      const response = await dse.evaluateSimahBureau(applicationId, payload);

      expect(response).toBeDefined();
      // TODO: Update assertion based on actual response shape
    }
  );
});
