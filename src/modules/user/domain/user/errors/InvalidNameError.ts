import { DomainError } from "src/core/domain/errors/DomainError"

export class InvalidNameError extends Error implements DomainError {
  public readonly status = 400
  constructor(name: string) {
    super(`The name "${name}" is invalid.`)
    this.name = 'InvalidNameError'
  }
}