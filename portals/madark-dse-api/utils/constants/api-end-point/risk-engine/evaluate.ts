import { DSE_STEP_NAMES } from "../../steps/stepNames";

export const DSE_EVALUATE: {
  evaluateAmlFraud: (applicationId: string) => string;
  evaluateKycEligibility: (applicationId: string) => string;
  evaluateSectorSalary: (applicationId: string) => string;
  evaluateSimahBureau: (applicationId: string) => string;
  evaluateStep: (applicationId: string, step: string) => string;
} = {
  evaluateAmlFraud: (applicationId: string) =>
    `/api/v1/risk-engine/applications/${applicationId}/steps/${DSE_STEP_NAMES.AML_FRAUD}/evaluate`,

  evaluateKycEligibility: (applicationId: string) =>
    `/api/v1/risk-engine/applications/${applicationId}/steps/${DSE_STEP_NAMES.KYC_ELIGIBILITY}/evaluate`,

  evaluateSectorSalary: (applicationId: string) =>
    `/api/v1/risk-engine/applications/${applicationId}/steps/${DSE_STEP_NAMES.SECTOR_SALARY}/evaluate`,

  evaluateSimahBureau: (applicationId: string) =>
    `/api/v1/risk-engine/applications/${applicationId}/steps/${DSE_STEP_NAMES.SIMAH_BUREAU}/evaluate`,

  evaluateStep: (applicationId: string, step: string) =>
    `/api/v1/risk-engine/applications/${applicationId}/steps/${step}/evaluate`,
};
