import { Email } from "./Email"
import { Name } from "./Name"
import { Password } from "./Password"
import { User } from "./User"

describe('User entity', () => {
  it('deve ser possível criar um novo usuário', () => {
    expect(
      () => User.create({
        name: Name.create('John Doe'),
        email: Email.create('johndoe@example.com'),
        password: Password.create('123456')
      })
    ).not.toThrow()
  })
})