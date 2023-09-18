import { IUserRepository } from "../../repositories/IUserRepository"
import { UserIdNotFound } from "./errors/UserIdNotFound"

type RemoveUserRequest = {
  id: string
}

type RemoveUserResponse = void

export class RemoveUser {
  constructor (
    private usersRepository: IUserRepository,
  ) {}
  
  async execute ({ id }: RemoveUserRequest): Promise<RemoveUserResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserIdNotFound(id)
    }

    await this.usersRepository.delete(id)
  }
}