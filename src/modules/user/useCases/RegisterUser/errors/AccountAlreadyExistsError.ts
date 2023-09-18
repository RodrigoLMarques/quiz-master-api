import { UseCaseError } from "src/core/domain/errors/UseCaseError";

export class AccountAlreadyExistsError extends Error implements UseCaseError {
  public readonly status = 409;
  constructor(email: string) {
    super(`The email "${email}" is already registered.`)
    this.name = 'AccountAlreadyExistsError'
  }
}