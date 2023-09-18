import { IUserProps, User } from "../domain/user/User";

export interface IUserRepository {
  findById(id: string): Promise<User>,
  findByEmail(email: string): Promise<User>,
  findAll(): Promise<User[]>,
  exists(email: string): Promise<boolean>,
  create(user: User): Promise<void>,
  delete(id: string): Promise<void>,
}