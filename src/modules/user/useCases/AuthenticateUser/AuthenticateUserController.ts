import { HttpResponse, ok, adapt } from "../../../../core/infra/HttpResponse"
import { AuthenticateUser } from "./AuthenticateUser"

type AuthenticateUserControllerRequest = {
  email: string
  password: string
}

export class AuthenticateUserController {
  constructor (
    private authenticateUser: AuthenticateUser
  ) {}

  async handle ({ 
    email, 
    password
  }: AuthenticateUserControllerRequest): Promise<HttpResponse> {
    try {
      const { token } =  await this.authenticateUser.execute({
        email,
        password
      })

      return ok({ token })
    } catch (err) {
      return adapt(err)
    }
  }
}