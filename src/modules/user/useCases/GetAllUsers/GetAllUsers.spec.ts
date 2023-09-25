import { createUser } from "./../../../../tests/factories/UserFactory"
import { IUserRepository } from "../../repositories/IUserRepository"
import { InMemoryUserRepository } from "../../repositories/in-memory/InMemoryUserRepository"
import { GetAllUsers } from "./GetAllUsers"

let usersRepository: IUserRepository
let getAllUsers: GetAllUsers

describe('Get all users use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    getAllUsers = new GetAllUsers(usersRepository)
  })
  
  it('deve ser possível listar os usuários', async () => {
    const user1 = createUser()
    const user2 = createUser({
      email: 'johndoe2@example.com'
    })

    await usersRepository.create(user1)
    await usersRepository.create(user2)

    const response = await getAllUsers.execute()

    expect(response.length).toBe(2)
    expect(response[0].email).toEqual(user1.email)
    expect(response[1].email).toEqual(user2.email)
  })
})