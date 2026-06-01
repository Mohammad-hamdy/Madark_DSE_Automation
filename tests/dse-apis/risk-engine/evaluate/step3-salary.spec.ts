import { test, expect } from "@playwright/test";
import configModule from "@configuration/config";
import SalaryEvaluateRequest from "@madark-dse-api/model/05-SalaryEvaluateRequest";
import { setupEvaluateContext, expectErrorContract } from "./shared";

const { getTestData } = configModule;

test.describe("DSE - Risk Engine: Step 3 Salary", () => {
  test(
    "Evaluate Sector Salary (Employment)",
    { tag: ["@dse", "@riskEngine", "@evaluate", "@sectorSalary"] },
    async ({ request }) => {
      const context = await setupEvaluateContext(request);

      const payload =
        getTestData?.evaluate?.salary ?? new SalaryEvaluateRequest().build();

      const response = await context.dse.evaluateSectorSalary(
        context.applicationId,
        payload
      );

      expectErrorContract(response);
      expect(response.status).toBe(410);
      expect(response.errorCode).toBe("PIPELINE_STEP_DEPRECATED");
      expect(response.detail).toContain("employment");
    }
  );
});
