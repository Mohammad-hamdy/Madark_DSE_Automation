import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
import SimahEvaluateRequest from "@madark-dse-api/model/SimahEvaluateRequest";
import { setupEvaluateContext, expectErrorContract } from "./shared";

const { getTestData } = configModule;

test.describe("DSE - Risk Engine: Step 4 Simah", () => {
  test(
    "Evaluate SIMAH Bureau (Credit Decision)",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@simahBureau"] },
    async ({ request }) => {
      const context = await setupEvaluateContext(request);

      const payload =
        getTestData?.evaluate?.simah ?? new SimahEvaluateRequest().build();

      const response = await context.dse.evaluateSimahBureau(
        context.applicationId,
        payload
      );

      expectErrorContract(response);
      expect(response.status).toBe(410);
      expect(response.errorCode).toBe("PIPELINE_STEP_DEPRECATED");
      expect(response.detail).toContain("credit-decision");
    }
  );
});
