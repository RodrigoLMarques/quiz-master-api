import { Email } from '../../domain/user/Email'
import { Name } from '../../domain/user/Name'
import { Password } from '../../domain/user/Password'
import { User } from '../../domain/user/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError'

type RegisterUserRequest = {
  name: string,
  email: string,
  password: string
}

type RegisterUserResponse = {
  user: User
}

export class RegisterUser {

  constructor (
    private userRepository: IUserRepository,
  ) {}

  async execute ({ 
    name, 
    email, 
    password 
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const user = User.create({
      name: Name.create(name),
      email: Email.create(email),
      password: Password.create(password, false)
    })

    const userAlreadyExists = await this.userRepository.exists(user.email)

    if (userAlreadyExists) {
      throw new AccountAlreadyExistsError(user.email)
    }

    await this.userRepository.create(user)

    return { user }
  }
}