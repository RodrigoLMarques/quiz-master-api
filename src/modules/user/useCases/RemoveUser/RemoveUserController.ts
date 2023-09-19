import { Controller } from "./../../../../core/infra/Controller";
import { HttpResponse, adapt, ok } from "./../../../../core/infra/HttpResponse";
import { RemoveUser } from "./RemoveUser";

type RemoveUserControllerRequest = {
  userId: string
}

export class RemoveUserController implements Controller {
  constructor (
    private removeUser: RemoveUser
  ) {}

  async handle (params: RemoveUserControllerRequest): Promise<HttpResponse> {
    try {
      this.removeUser.execute({
        userId: params.userId
      })

      return ok()
    } catch (err) {
      return adapt(err)
    }
  }
}