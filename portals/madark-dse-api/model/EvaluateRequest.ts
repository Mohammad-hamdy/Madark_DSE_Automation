export interface IEvaluateRequest {
  // TODO: Fill in the actual fields required for each evaluate step
  [key: string]: any;
}

class EvaluateRequest {
  private request: IEvaluateRequest = {};

  setField(key: string, value: any) {
    this.request[key] = value;
    return this;
  }

  build(): IEvaluateRequest {
    return { ...this.request };
  }
}

export default EvaluateRequest;
