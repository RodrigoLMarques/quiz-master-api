import { User } from "../../domain/user/User"
import { IUserRepository } from "../../repositories/IUserRepository"

type GetAllUsersResponse = User[]

export class GetAllUsers {
  constructor (
    private usersRepository: IUserRepository
  ) {}

  async execute (): Promise<GetAllUsersResponse> {
    const users = await this.usersRepository.findAll()
    
    return users
  }
}