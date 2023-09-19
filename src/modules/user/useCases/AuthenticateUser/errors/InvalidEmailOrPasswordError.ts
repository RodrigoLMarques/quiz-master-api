import { UseCaseError } from "./../../../../../core/domain/errors/UseCaseError";

export class InvalidEmailOrPasswordError extends Error implements UseCaseError {
  public readonly status = 400
  constructor() {
    super(`Invalid e-mail/password combination.`)
    this.name = 'InvalidEmailOrPasswordError'
  }
}