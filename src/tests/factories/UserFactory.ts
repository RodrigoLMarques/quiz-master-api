import { Email } from "./../../modules/user/domain/user/Email"
import { JWT } from "./../../modules/user/domain/user/JWT"
import { Name } from "./../../modules/user/domain/user/Name"
import { Password } from "./../../modules/user/domain/user/Password"
import { User } from "./../../modules/user/domain/user/User"


type UserOverrides = {
  email?: string
  password?: string
}

export function createUser(overrides?: UserOverrides) {
  const user = User.create({
    name: Name.create('John Doe'),
    email: Email.create(overrides?.email ?? 'johndoe@example.com'),
    password: Password.create(overrides?.password ?? '123456')
  })

  return user
}

export function createAndAuthenticateUser(overrides?: UserOverrides) {
  const user = createUser(overrides)

  const jwt = JWT.signUser(user)

  return {
    user,
    jwt
  }
}