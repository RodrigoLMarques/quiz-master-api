import { Validator } from "src/core/infra/Validator"

export class ValidatorCompositor<T = any> implements Validator<T> {
  constructor(private readonly validators: Validator<T>[]) {}

  validate(input: T): Error | null {
    try {
      for (const validator of this.validators) {
        validator.validate(input)
      }
    } catch (err) {
      return err
    }

    return null
  }
}