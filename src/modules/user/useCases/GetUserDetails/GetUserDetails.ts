import { User } from "../../domain/user/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UserIdNotFound } from "./errors/UserIdNotFound";

type GetUserDetailsRequest = {
  userId: string
} 

type GetUserDetailsResponse = User

export class GetUserDetails {
  constructor (
    private usersRepository: IUserRepository
  ) {}

  async execute ({ 
    userId 
  }: GetUserDetailsRequest): Promise<GetUserDetailsResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserIdNotFound(userId)
    }

    return user
  }
}