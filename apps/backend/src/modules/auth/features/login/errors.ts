export class AuthLoginInvalidCredentialsError extends Error {
  constructor() {
    super("Invalid username or password");
    this.name = "AuthLoginInvalidCredentialsError";
  }
}
