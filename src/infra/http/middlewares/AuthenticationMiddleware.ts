import { decode } from "jsonwebtoken";
import { HttpResponse, fail, forbidden, ok } from "src/core/infra/HttpResponse";
import { Middleware } from "src/core/infra/Middleware";
import { AccessDeniedError } from "../errors/AccessDeniedError";

type AuthenticationMiddlewareRequest = {
  accessToken: string
}

export class AuthenticationMiddleware implements Middleware {

  async handle (
    request: AuthenticationMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const { accessToken } = request

      if (accessToken) {
        try {
          const decoded = decode(accessToken)

          return ok({ id: decoded.sub })
        } catch (err) {
          return forbidden(new AccessDeniedError())
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (err) {
      return fail(err)
    }
  }
}