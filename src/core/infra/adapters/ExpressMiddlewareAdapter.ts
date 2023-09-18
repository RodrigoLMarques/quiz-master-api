import { Request, Response, NextFunction } from 'express'
import { Middleware } from "../Middleware";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestHeaders = {
      accessToken: request.headers?.['x-access-token'],
      ...(request.headers || {}),
    }

    const httpResponse = await middleware.handle(requestHeaders, request.body)

    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)

      return next()
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.error,
      })
    }
  }
}