import { User } from "../../domain/user/User";
import { IUserRepository } from "../IUserRepository";

export class InMemoryUserRepository implements IUserRepository {

  constructor(
    public users: User[] = []
  ) {}

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email.value === email)
  }

  async findAll(): Promise<User[]> {
      return this.users
  }

  async exists(email: string): Promise<boolean> {
    return this.users.some(user => user.email.value === email)
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
  }
}