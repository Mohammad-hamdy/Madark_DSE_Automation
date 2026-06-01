export interface ISalaryEvaluateRequest {
  idNumber?: string;
  employerName?: string;
  employerSector?: string;
  employmentType?: string;
  monthlyIncome?: number;
  disclosedSalary?: number;
  jobTitle?: string;
  yearsInService?: number;
}

class SalaryEvaluateRequest {
  private request: ISalaryEvaluateRequest = {};

  setField<K extends keyof ISalaryEvaluateRequest>(
    key: K,
    value: ISalaryEvaluateRequest[K]
  ) {
    this.request[key] = value;
    return this;
  }

  build(): ISalaryEvaluateRequest {
    return { ...this.request };
  }
}

export default SalaryEvaluateRequest;
