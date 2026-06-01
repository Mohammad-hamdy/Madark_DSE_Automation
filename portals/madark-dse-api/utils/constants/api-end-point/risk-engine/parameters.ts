import { DSE_STEP_NAMES } from "../../steps/stepNames";

export const DSE_PARAMETERS: {
  getAmlFraudParameters: () => string;
  getKycEligibilityParameters: () => string;
  getEmploymentParameters: () => string;
  getCreditDecisionParameters: () => string;
  getStepParameters: (step: string) => string;
} = {
  getAmlFraudParameters: () =>
    `/api/v1/risk-engine/steps/${DSE_STEP_NAMES.AML_FRAUD}/parameters`,

  getKycEligibilityParameters: () =>
    `/api/v1/risk-engine/steps/${DSE_STEP_NAMES.KYC_ELIGIBILITY}/parameters`,

  getEmploymentParameters: () =>
    `/api/v1/risk-engine/steps/${DSE_STEP_NAMES.EMPLOYMENT}/parameters`,

  getCreditDecisionParameters: () =>
    `/api/v1/risk-engine/steps/${DSE_STEP_NAMES.CREDIT_DECISION}/parameters`,

  getStepParameters: (step: string) =>
    `/api/v1/risk-engine/steps/${step}/parameters`,
};
