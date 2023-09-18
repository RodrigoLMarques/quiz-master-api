import { Validator } from "src/core/infra/Validator";
import { InvalidParamError } from "./errors/InvalidParamError";

export class CompareFieldsValidator<T = any> implements Validator<T> {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(data: T): Error | null {
      if (data[this.field] !== data[this.fieldToCompare]) {
        return new InvalidParamError(this.fieldToCompare)
      }
  }
}