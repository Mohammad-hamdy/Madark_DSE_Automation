import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
import { setupEvaluateContext, buildDefaultAmlPayload } from "./shared";

const { getTestData } = configModule;

test.describe("DSE - Risk Engine: Step 1 AML", () => {
  test(
    "Evaluate AML Fraud",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@amlFraud"] },
    async ({ request }) => {
      const context = await setupEvaluateContext(request);

      const payload =
        getTestData?.evaluate?.amlFraud ?? buildDefaultAmlPayload(context.idNumber);

      const response = await context.dse.evaluateAmlFraud(
        context.madarkApplicationId,
        payload
      );

      expect(response).toBeDefined();
      expect(response.applicationId).toBe(context.madarkApplicationId);
      expect(response.decision).toBeTruthy();
      expect(response.output).toBeDefined();
      expect(response.output.stepScore).toBeDefined();
      expect(response.output.stepScore.stepScore).toBeGreaterThanOrEqual(0);
    }
  );
});
