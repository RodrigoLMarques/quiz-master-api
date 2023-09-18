import { DomainError } from "src/core/domain/errors/DomainError"

export class InvalidJWTTokenError extends Error implements DomainError {
  public readonly status = 401
  constructor() {
    super(`The JWT token is invalid.`)
    this.name = 'InvalidJWTTokenError '
  }
}