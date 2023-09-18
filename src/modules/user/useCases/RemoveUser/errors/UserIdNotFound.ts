import { UseCaseError } from "src/core/domain/errors/UseCaseError";

export class UserIdNotFound extends Error implements UseCaseError {
  public readonly status = 404;
  constructor(id: string) {
    super(`User not found for ID "${id}".`)
    this.name = 'UserIdNotFound'
  }
}