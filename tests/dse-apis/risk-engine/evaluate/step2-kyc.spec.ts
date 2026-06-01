import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
import KycEvaluateRequest from "@madark-dse-api/model/04-KycEvaluateRequest";
import { setupEvaluateContext, expectErrorContract } from "./shared";

const { getTestData } = configModule;

test.describe("DSE - Risk Engine: Step 2 KYC", () => {
  test(
    "Evaluate KYC Eligibility",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@kycEligibility"] },
    async ({ request }) => {
      const context = await setupEvaluateContext(request);

      const payload =
        getTestData?.evaluate?.kycEligibility ?? new KycEvaluateRequest().build();

      const response = await context.dse.evaluateKycEligibility(
        context.madarkApplicationId,
        payload
      );

      expectErrorContract(response);
      expect([404, 422]).toContain(response.status);
      expect(["NOT_FOUND", "BUSINESS_RULE"]).toContain(response.errorCode);
    }
  );
});
