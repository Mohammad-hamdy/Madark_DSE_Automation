import configModule from "@configuration/config";
import { DSE_LOGIN } from "@madark-dse-api/utils/constants/api-end-point/auth/login";
import { DSE_ME } from "@madark-dse-api/utils/constants/api-end-point/auth/me";
import { DSE_PARAMETERS } from "@madark-dse-api/utils/constants/api-end-point/risk-engine/parameters";
import { DSE_EVALUATE } from "@madark-dse-api/utils/constants/api-end-point/risk-engine/evaluate";
import ContentTypes from "@madark-dse-api/utils/constants/content-type/contentType";

const { config } = configModule;

interface ApiContext {
  post: (
    url: string,
    options: { data: any; headers: Record<string, string> }
  ) => Promise<{ json: () => Promise<any> }>;

  get: (
    url: string,
    options?: { headers?: Record<string, string> }
  ) => Promise<{ json: () => Promise<any> }>;
}

export class DSEService {
  private apiContext: ApiContext;
  private apiBaseUrl: string;
  private token: string = "";

  constructor(apiContext: ApiContext) {
    this.apiContext = apiContext;
    this.apiBaseUrl = config.apiUrl;
  }

  private authHeader(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": ContentTypes.JSON,
    };
  }

  // ─── Auth ────────────────────────────────────────────────────────────────────

  async login(payload: any) {
    console.log(`POST ${this.apiBaseUrl + DSE_LOGIN.login()}`);
    const response = await this.apiContext.post(
      this.apiBaseUrl + DSE_LOGIN.login(),
      {
        data: payload,
        headers: { "Content-Type": ContentTypes.JSON },
      }
    );
    const json = await response.json();
    console.log(`Login response: ${JSON.stringify(json)}`);
    if (json.token) {
      this.token = json.token;
    }
    return json;
  }

  async createMockApplication(payload?: any) {
    console.log(`POST ${this.apiBaseUrl + DSE_ME.createMockApplication()}`);
    const response = await this.apiContext.post(
      this.apiBaseUrl + DSE_ME.createMockApplication(),
      {
        data: payload ?? {},
        headers: this.authHeader(),
      }
    );
    try {
      const json = await response.json();
      console.log(`Mock application response: ${JSON.stringify(json)}`);
      return json;
    } catch (error) {
      console.log(`Mock application response: empty or non-JSON body`);
      return {};
    }
  }

  // ─── Parameters ──────────────────────────────────────────────────────────────

  async getAmlFraudParameters() {
    const url = this.apiBaseUrl + DSE_PARAMETERS.getAmlFraudParameters();
    console.log(`GET ${url}`);
    const response = await this.apiContext.get(url, {
      headers: this.authHeader(),
    });
    return await response.json();
  }

  async getKycEligibilityParameters() {
    const url = this.apiBaseUrl + DSE_PARAMETERS.getKycEligibilityParameters();
    console.log(`GET ${url}`);
    const response = await this.apiContext.get(url, {
      headers: this.authHeader(),
    });
    return await response.json();
  }

  async getEmploymentParameters() {
    const url = this.apiBaseUrl + DSE_PARAMETERS.getEmploymentParameters();
    console.log(`GET ${url}`);
    const response = await this.apiContext.get(url, {
      headers: this.authHeader(),
    });
    return await response.json();
  }

  async getCreditDecisionParameters() {
    const url = this.apiBaseUrl + DSE_PARAMETERS.getCreditDecisionParameters();
    console.log(`GET ${url}`);
    const response = await this.apiContext.get(url, {
      headers: this.authHeader(),
    });
    return await response.json();
  }

  async getStepParameters(step: string) {
    const url = this.apiBaseUrl + DSE_PARAMETERS.getStepParameters(step);
    console.log(`GET ${url}`);
    const response = await this.apiContext.get(url, {
      headers: this.authHeader(),
    });
    return await response.json();
  }

  // ─── Evaluate ────────────────────────────────────────────────────────────────

  async evaluateAmlFraud(applicationId: string, payload: any) {
    const url = this.apiBaseUrl + DSE_EVALUATE.evaluateAmlFraud(applicationId);
    console.log(`POST ${url}`);
    const response = await this.apiContext.post(url, {
      data: payload,
      headers: this.authHeader(),
    });
    const json = await response.json();
    console.log(`AML Fraud evaluate response: ${JSON.stringify(json)}`);
    return json;
  }

  async evaluateKycEligibility(applicationId: string, payload: any) {
    const url =
      this.apiBaseUrl + DSE_EVALUATE.evaluateKycEligibility(applicationId);
    console.log(`POST ${url}`);
    const response = await this.apiContext.post(url, {
      data: payload,
      headers: this.authHeader(),
    });
    const json = await response.json();
    console.log(`KYC Eligibility evaluate response: ${JSON.stringify(json)}`);
    return json;
  }

  async evaluateSectorSalary(applicationId: string, payload: any) {
    const url =
      this.apiBaseUrl + DSE_EVALUATE.evaluateSectorSalary(applicationId);
    console.log(`POST ${url}`);
    const response = await this.apiContext.post(url, {
      data: payload,
      headers: this.authHeader(),
    });
    const json = await response.json();
    console.log(`Sector Salary evaluate response: ${JSON.stringify(json)}`);
    return json;
  }

  async evaluateSimahBureau(applicationId: string, payload: any) {
    const url =
      this.apiBaseUrl + DSE_EVALUATE.evaluateSimahBureau(applicationId);
    console.log(`POST ${url}`);
    const response = await this.apiContext.post(url, {
      data: payload,
      headers: this.authHeader(),
    });
    const json = await response.json();
    console.log(`SIMAH Bureau evaluate response: ${JSON.stringify(json)}`);
    return json;
  }

  async evaluateStep(applicationId: string, step: string, payload: any) {
    const url =
      this.apiBaseUrl + DSE_EVALUATE.evaluateStep(applicationId, step);
    console.log(`POST ${url}`);
    const response = await this.apiContext.post(url, {
      data: payload,
      headers: this.authHeader(),
    });
    const json = await response.json();
    console.log(`Step [${step}] evaluate response: ${JSON.stringify(json)}`);
    return json;
  }

  // ─── Token getter ─────────────────────────────────────────────────────────────

  getToken(): string {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }
}
