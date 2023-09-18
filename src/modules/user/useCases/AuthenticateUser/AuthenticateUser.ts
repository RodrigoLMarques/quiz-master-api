import { InvalidEmailOrPasswordError } from "src/modules/user/useCases/AuthenticateUser/errors/InvalidEmailOrPasswordError";
import { JWT } from "../../domain/user/JWT";
import { IUserRepository } from "../../repositories/IUserRepository"

type AuthenticateUserRequest = {
  email: string
  password: string
}

type AuthenticateUserResponse = {
  token: string
}

export class AuthenticateUser {
  constructor (
    private usersRepository: IUserRepository
  ) {}

  async execute ({ 
    email, 
    password 
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)
    
    if (!user) {
      throw new InvalidEmailOrPasswordError()
    }

    const isPasswordValid = await user.password.comparePassword(password)

    if (!isPasswordValid) {
      throw new InvalidEmailOrPasswordError()
    }

    const { token } = JWT.signUser(user)

    return { token }
  }
} 