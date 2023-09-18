import { Controller } from './../../../../core/infra/Controller'
import { HttpResponse, adapt, ok } from "./../../../../core/infra/HttpResponse"
import { GetAllUsers } from "./GetAllUsers"

export class GetAllUsersController implements Controller {
  constructor (
    private getAllUsers: GetAllUsers
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const result = await this.getAllUsers.execute()

      const users = result.map(user => {
        return {
          id: user.id,
          name: user.name.value,
          email: user.email.value
        }
      })

      return ok({ data: users })
    } catch (err){
      return adapt(err)
    }
  } 
}