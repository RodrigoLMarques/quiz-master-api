import { HttpResponse, adapt, ok } from "./../../../../core/infra/HttpResponse";
import { Controller } from "./../../../../core/infra/Controller";
import { GetUserDetails } from "./GetUserDetails";

type GetUserDetailsControllerRequest = {
  userId: string
}

export class GetUserDetailsController implements Controller {
  constructor (
    private getUserDetails: GetUserDetails
  ) {}

  async handle (params: GetUserDetailsControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getUserDetails.execute({ 
        userId: params.userId 
      })

      const user = {
        id: result.id,
        name: result.name.value,
        email: result.email.value,
      }

      return ok({ data: user })
    } catch (err) {
      return adapt(err)
    }
  }
}
