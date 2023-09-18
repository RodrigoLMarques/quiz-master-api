import { IUserRepository } from "../../repositories/IUserRepository"
import { InMemoryUserRepository } from "../../repositories/in-memory/InMemoryUserRepository"
import { RegisterUser } from "./RegisterUser"

let usersRepository: IUserRepository
let registerUser: RegisterUser

describe('Register User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    registerUser = new RegisterUser(usersRepository)
  })

  it('deve ser possível registrar um novo usuário', async () => {

    const response = await registerUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.user).toHaveProperty('_id')
    expect(usersRepository.exists("john@doe.com")).toBeTruthy()
  }),

  it('não deve ser possível registrar um usuário com email existente', async () => {

    const props = { 
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    }

    await registerUser.execute(props)

    expect(async () => {
      await registerUser.execute(props)
    }).rejects.toThrow()

  })
})