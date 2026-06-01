export interface ILoginRequest {
  username?: string;
  password?: string;
}

class LoginRequest {
  private request: ILoginRequest = {};

  setUsername(username: string) {
    this.request.username = username;
    return this;
  }

  setPassword(password: string) {
    this.request.password = password;
    return this;
  }

  getUsername() {
    return this.request.username;
  }

  getPassword() {
    return this.request.password;
  }

  build(): ILoginRequest {
    return { ...this.request };
  }
}

export default LoginRequest;
