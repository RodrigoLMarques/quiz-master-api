import { DomainError } from "src/core/domain/errors/DomainError"

export class InvalidEmailError extends Error implements DomainError {
  public readonly status = 400
  constructor(email: string) {
    super(`The email "${email}" is invalid.`)
    this.name = 'InvalidEmailError'
  }
}