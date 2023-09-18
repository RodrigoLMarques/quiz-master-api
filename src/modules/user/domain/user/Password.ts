import { InvalidPasswordLengthError } from "./errors/InvalidPasswordLengthError"
import bcrypt from 'bcryptjs'

export class Password {
  private readonly password: string
  private readonly hashed?: boolean

  constructor (password: string, hashed: boolean) {
    this.password = password
    this.hashed = hashed
  }

  static validate (password: string): boolean {
    if (
      !password ||
      password.trim().length < 6 ||
      password.trim().length > 255
    ) {
      return false
    }

    return true
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.password
    }

    return await bcrypt.hash(this.password, 8)
  }

  public async comparePassword(password: string): Promise<boolean> {
    if (this.hashed) {
      return await bcrypt.compare(password, this.password)
    }

    return this.password === password
  }

  static create (
    password: string,
    hashed: boolean = false
  ): Password {
    if (!this.validate(password)) {
      throw new InvalidPasswordLengthError() 
    }

    return new Password(password, hashed)
  } 
}