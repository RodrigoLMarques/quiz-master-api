import { InvalidEmailError } from "./errors/InvalidEmailErro"

export class Email {
  private readonly email: string

  get value (): string {
    return this.email
  }

  constructor (email: string) {
    this.email = email
  }

  static validate (email: string): boolean {
    if (!email || email.trim().length > 255) {
      return false
    }

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!regex.test(email)) {
      return false
    }

    return true
  }

  static create (email: string): Email {
    if (!this.validate(email)) {
      throw new InvalidEmailError(email)
    }

    return new Email(email)
  }
}
