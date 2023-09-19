import { createUser } from "./../../../../tests/factories/UserFactory"
import { InMemoryUserRepository } from "../../repositories/in-memory/InMemoryUserRepository"
import { GetUserDetails } from "./GetUserDetails"
import { IUserRepository } from "../../repositories/IUserRepository"

let usersRepository: IUserRepository
let getUserDetails: GetUserDetails

describe('Get user details use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    getUserDetails = new GetUserDetails(usersRepository)
  })

  it('deve ser possível buscar um usuário', async () => {
    const user1 = createUser()

    await usersRepository.create(user1)
  
    const user = await getUserDetails.execute({ 
      userId: user1.id 
    })

    expect(user).toEqual(user1)
  })

  it('deve ser rejeitado buscar um usuário com id inválido', async () => {
    const user1 = createUser()
    await usersRepository.create(user1)

    expect(
      async () => {
        const user = await getUserDetails.execute({ 
          userId: 'invalid-id'
        })
      }
    ).rejects.toThrow()
  })
})