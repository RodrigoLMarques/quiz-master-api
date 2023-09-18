import { User as PersistenceUser } from '@prisma/client'
import { User } from "../domain/user/User";
import { Name } from '../domain/user/Name';
import { Email } from '../domain/user/Email';
import { Password } from '../domain/user/Password';


export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const user = User.create(
      {
        name: Name.create(raw.name),
        email: Email.create(raw.email),
        password: Password.create(raw.password, true),
      },
      raw.id
    )

    return user
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
    }
  }
}