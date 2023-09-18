import { Email } from "../../domain/user/Email"
import { Name } from "../../domain/user/Name"
import { Password } from "../../domain/user/Password"
import { User } from "../../domain/user/User"
import { IUserRepository } from "../../repositories/IUserRepository"
import { InMemoryUserRepository } from "../../repositories/in-memory/InMemoryUserRepository"
import { AuthenticateUser } from "./AuthenticateUser"

let usersRepository: IUserRepository
let authenticateUser: AuthenticateUser

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    authenticateUser = new AuthenticateUser(usersRepository)
  })

  it('deve ser possível fazer autenticar um usuário', async () => {
    const user = User.create({
      name: Name.create('John Doe'),
      email: Email.create('johndoe@example.com'),
      password: Password.create('123456'),
    })

    await usersRepository.create(user)

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toEqual(
      expect.objectContaining({ token: expect.any(String) })
    )
  })

  it('deve ser rejeitado um email inválido', async () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'invalid@example.com',
        password: '123456'
      })
    }).rejects.toThrow()
  })

  it('deve ser rejeitado autenticação com senha inválida', async () => {
    const user = User.create({
      name: Name.create('John Doe'),
      email: Email.create('johndoe@example.com'),
      password: Password.create('123456'),
    })
    
    await usersRepository.create(user)
    
    expect(async () => {
      await authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'invalid-password'
      })
    }).rejects.toThrow()
  })
})