export interface ILoginRequest {
  email?: string;
  password?: string;
}

class LoginRequest {
  private request: ILoginRequest = {};

  setUsername(email: string) {
    this.request.email = email;
    return this;
  }

  setPassword(password: string) {
    this.request.password = password;
    return this;
  }

  getUsername() {
    return this.request.email;
  }

  getPassword() {
    return this.request.password;
  }

  build(): ILoginRequest {
    return { ...this.request };
  }
}

export default LoginRequest;
