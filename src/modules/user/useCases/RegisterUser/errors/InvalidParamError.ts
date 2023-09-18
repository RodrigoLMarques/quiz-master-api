import { UseCaseError } from "src/core/domain/errors/UseCaseError";

export class InvalidParamError extends Error implements UseCaseError {
  public readonly status = 400
  constructor(param: string) {
    super(`The received value for field "${param}" is invalid.`)
    this.name = 'InvalidParamError'
  }
}