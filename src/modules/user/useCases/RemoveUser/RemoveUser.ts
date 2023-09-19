import { IUserRepository } from "../../repositories/IUserRepository"
import { UserIdNotFound } from "./errors/UserIdNotFound"

type RemoveUserRequest = {
  userId: string
}

type RemoveUserResponse = void

export class RemoveUser {
  constructor (
    private usersRepository: IUserRepository,
  ) {}
  
  async execute ({ userId }: RemoveUserRequest): Promise<RemoveUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserIdNotFound(userId)
    }

    await this.usersRepository.delete(userId)
  }
}