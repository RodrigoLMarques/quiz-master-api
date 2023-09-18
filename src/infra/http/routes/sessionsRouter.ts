import { Router } from "express";
import { adaptRoute } from "../../../core/infra/adapters/ExpressRouterAdapter";
import { makeAuthenticateUserController } from "../factories/controllers/AuthenticateUserControllerFactory";

const sessionsRouter = Router()

sessionsRouter.post('/', adaptRoute(makeAuthenticateUserController()))

export { sessionsRouter }
