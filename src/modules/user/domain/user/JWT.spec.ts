import { Email } from "./Email"
import { JWT } from "./JWT"
import { Name } from "./Name"
import { Password } from "./Password"
import { User } from "./User"

describe('JWT model', () => {
  it('deve ser possível criar um novo usuário', () => {
    const user = User.create({
      name: Name.create('John Doe'),
      email: Email.create('johndoe@example.com'),
      password: Password.create('123456'),
    })

    const jwt = JWT.signUser(user)

    expect(jwt.token).toEqual(expect.any(String))
    
  })
})
