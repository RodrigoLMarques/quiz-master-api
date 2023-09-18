import { Controller } from "../../../../core/infra/Controller";

import {
  clientError,
  created,
  HttpResponse,
  adapt,
} from '../../../../core/infra/HttpResponse'
import { InvalidParamError } from "./errors/InvalidParamError";
import { RegisterUser } from "./RegisterUser";

type RegisterUserControllerRequest = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export class RegisterUserController implements Controller {
  constructor (
    private registerUser: RegisterUser
  ) {}

  async handle (request: RegisterUserControllerRequest): Promise<HttpResponse> {
    try {

      const { name, email, password, password_confirmation } = request

      if (password !== password_confirmation) {
        return clientError(new InvalidParamError("password confirmation"))
      }

      await this.registerUser.execute({
        name,
        email,
        password
      })

      return created()

    } catch (err) {
      return adapt(err)
    }
  }
}