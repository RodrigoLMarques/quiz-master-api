import { createUser } from "./../../../../tests/factories/UserFactory"
import { IUserRepository } from "../../repositories/IUserRepository"
import { InMemoryUserRepository } from "../../repositories/in-memory/InMemoryUserRepository"
import { RemoveUser } from "./RemoveUser"

let usersRepository: IUserRepository
let removeUser: RemoveUser

describe('Remove user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    removeUser = new RemoveUser(usersRepository)
  })

  it('deve ser possível remover um usuário', async () => {
    const user = createUser()

    await usersRepository.create(user)
    await removeUser.execute({ 
      id: user.id
    })

    const result = await usersRepository.findById('user-id')

    expect(!result).toBeTruthy()
  })

  it('deve ser rejeitado remover id inválido', async () => {
    expect(async () => {
      await removeUser.execute({ 
        id: 'invalid-id' 
      })
    }).rejects.toThrow()
  })
})