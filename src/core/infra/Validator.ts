export interface Validator<T = any> {
  validate(data: T): Error | null
}