export interface ISimahEvaluateRequest {
  idNumber?: string;
  requestedFinanceAmount?: number;
  selectedTenureMonths?: number;
  existingObligationsAmount?: number;
  bureauScore?: number;
  hasAdverseRecords?: boolean;
}

class SimahEvaluateRequest {
  private request: ISimahEvaluateRequest = {};

  setField<K extends keyof ISimahEvaluateRequest>(
    key: K,
    value: ISimahEvaluateRequest[K]
  ) {
    this.request[key] = value;
    return this;
  }

  build(): ISimahEvaluateRequest {
    return { ...this.request };
  }
}

export default SimahEvaluateRequest;
