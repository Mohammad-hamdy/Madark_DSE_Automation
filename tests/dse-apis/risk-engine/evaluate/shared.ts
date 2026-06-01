import { expect, APIRequestContext } from "@playwright/test";
import { randomUUID } from "crypto";
import configModule from "@configuration/config";
import { DSEService } from "@madark-dse-api/service/DSEService";
import LoginRequest from "@madark-dse-api/model/01-LoginRequest";
import ApplicationRequest from "@madark-dse-api/model/02-ApplicationRequest";
import AmlEvaluateRequest from "@madark-dse-api/model/03-AmlEvaluateRequest";

const { config } = configModule;

export interface EvaluateSetupContext {
  dse: DSEService;
  madarkApplicationId: string;
  applicationId: string;
  idNumber: string;
}

export async function setupEvaluateContext(
  request: APIRequestContext
): Promise<EvaluateSetupContext> {
  const dse = new DSEService(request);

  const loginPayload = new LoginRequest()
    .setUsername(config.dseUsername)
    .setPassword(config.dsePassword)
    .build();

  const loginResponse = await dse.login(loginPayload);
  expect(loginResponse.token).toBeDefined();

  const madarkApplicationId = randomUUID();
  const applicationId = madarkApplicationId;
  const idNumber = `1${String(Math.floor(Math.random() * 1e9)).padStart(9, "0")}`;

  const appPayload = new ApplicationRequest()
    .setField("madarkApplicationId", madarkApplicationId)
    .setField("applicationId", applicationId)
    .setField("idNumber", idNumber)
    .build();

  await dse.createMockApplication(appPayload);

  expect(madarkApplicationId, "madarkApplicationId is required").not.toBe("");
  expect(applicationId, "applicationId is required").not.toBe("");

  return {
    dse,
    madarkApplicationId,
    applicationId,
    idNumber,
  };
}

export function buildDefaultAmlPayload(idNumber: string) {
  return new AmlEvaluateRequest()
    .setField("fullName", "Khalid Al-Saud")
    .setField("idNumber", idNumber)
    .setField("idType", "Saudi")
    .setField("dateOfBirth", "1995-06-15")
    .setField("idExpiryDate", "2099-12-31")
    .setField("gender", "Male")
    .setField("nationality", "Saudi")
    .setField("requestedFinanceAmount", 10000)
    .setField("selectedTenureMonths", 12)
    .setField("deviceFingerprint", "fp-postman-479")
    .setField("focalResponse", {
      severity: "Low",
      scenarioFlags: [],
      ipVpnRisk: "Low",
    })
    .setField("focalApiAvailable", true)
    .setField("focalResponseValid", true)
    .build();
}

export function expectErrorContract(response: any) {
  expect(response).toBeDefined();
  expect(response.status).toBeTruthy();
  expect(response.title).toBeTruthy();
  expect(response.errorCode).toBeTruthy();
  expect(Array.isArray(response.errors)).toBeTruthy();
}
