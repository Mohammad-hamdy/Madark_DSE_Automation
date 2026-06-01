export interface IAmlEvaluateRequest {
  fullName?: string;
  idNumber?: string;
  idType?: string;
  dateOfBirth?: string;
  idExpiryDate?: string;
  gender?: string;
  nationality?: string;
  requestedFinanceAmount?: number;
  selectedTenureMonths?: number;
  deviceFingerprint?: string;
  focalResponse?: {
    severity?: string;
    scenarioFlags?: string[];
    ipVpnRisk?: string;
  };
  focalApiAvailable?: boolean;
  focalResponseValid?: boolean;
}

class AmlEvaluateRequest {
  private request: IAmlEvaluateRequest = {};

  setField<K extends keyof IAmlEvaluateRequest>(
    key: K,
    value: IAmlEvaluateRequest[K]
  ) {
    this.request[key] = value;
    return this;
  }

  build(): IAmlEvaluateRequest {
    return { ...this.request };
  }
}

export default AmlEvaluateRequest;
