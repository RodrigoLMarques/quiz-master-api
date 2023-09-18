import { prisma } from "./../../../../infra/prisma/client";
import { User } from "../../domain/user/User";
import { IUserRepository } from "../IUserRepository";
import { UserMapper } from "../../mappers/UserMapper";


export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User> {
      const user = await prisma.user.findUnique({
        where: { id }
      }) 

      if (!user) {
        return null
      }

      return UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async findAll(): Promise<User[]> {
      let users = await prisma.user.findMany()
      return users.map(user => UserMapper.toDomain(user))
  }

  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    return !!user
  }

  async create(user: User): Promise<void> {
      const data = await UserMapper.toPersistence(user)
      await prisma.user.create({ data })
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    })
  }
}