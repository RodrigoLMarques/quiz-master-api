import { DomainError } from "src/core/domain/errors/DomainError"

export class InvalidPasswordLengthError extends Error implements DomainError {
  public readonly status = 400
  constructor() {
    super(`The password must have between 6 and 255 characters.`)
    this.name = 'InvalidPasswordLengthError'
  }
}