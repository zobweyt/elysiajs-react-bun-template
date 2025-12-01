export class AuthRegisterConflictError extends Error {
  constructor(username: string) {
    super(`User '${username}' already exists`);
    this.name = "AuthRegisterConflictError";
  }
}
