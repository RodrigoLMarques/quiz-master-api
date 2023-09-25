import { IUserProps, User } from "../domain/user/User";

export interface IUserRepository {
  exists(email: string): Promise<boolean>,
  findById(id: string): Promise<User>,
  findByEmail(email: string): Promise<User>,
  findAll(): Promise<User[]>,
  create(user: User): Promise<void>,
  save(user: User): Promise<void>,
  delete(id: string): Promise<void>,
}