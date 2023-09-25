import { IUserRepository } from "../../repositories/IUserRepository";
import { UserIdNotFound } from "./errors/UserIdNotFound";

type UpdateUseRequest = {
  userId: string
  data: {
    name: string
    email: string
  }
}

export class UpdateUser {
  constructor (
    private usersRepository: IUserRepository,
  ) {}

  async execute ({
    userId,
    data,
  }: UpdateUseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserIdNotFound(userId)
    }

    user.name = data.name
    user.email = data.email

    await this.usersRepository.save(user)
  }
}