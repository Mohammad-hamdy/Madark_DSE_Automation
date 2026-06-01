export interface IKycEvaluateRequest {
  fullName?: string;
  idNumber?: string;
  idType?: string;
  dateOfBirth?: string;
  idExpiryDate?: string;
  gender?: string;
  nationality?: string;
  disclosedSalary?: number;
  employmentStatus?: string;
  monthlyObligations?: number;
}

class KycEvaluateRequest {
  private request: IKycEvaluateRequest = {};

  setField<K extends keyof IKycEvaluateRequest>(
    key: K,
    value: IKycEvaluateRequest[K]
  ) {
    this.request[key] = value;
    return this;
  }

  build(): IKycEvaluateRequest {
    return { ...this.request };
  }
}

export default KycEvaluateRequest;
