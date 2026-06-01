export interface IApplicationRequest {
  // TODO: Fill in the actual fields required by /api/auth/me to create a mock application
  [key: string]: any;
}

class ApplicationRequest {
  private request: IApplicationRequest = {};

  setField(key: string, value: any) {
    this.request[key] = value;
    return this;
  }

  build(): IApplicationRequest {
    return { ...this.request };
  }
}

export default ApplicationRequest;
