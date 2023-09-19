import { Router } from "express";
import { adaptRoute } from "./../../..//core/infra/adapters/ExpressRouterAdapter";

import { makeRegisterUserController } from "../factories/controllers/RegisterUserControllerFactory";
import { makeGetAllUsersController } from "../factories/controllers/GetAllUsersControllerFactory";
import { makeGetUserDetailsController } from "../factories/controllers/GetUserDetailsControllerFactory";
import { makeRemoveUserController } from "../factories/controllers/RemoveUserControllerFactory";

const usersRouter = Router()

usersRouter.post('/', adaptRoute(makeRegisterUserController()))
usersRouter.get('/', adaptRoute(makeGetAllUsersController()))
usersRouter.get('/:userId', adaptRoute(makeGetUserDetailsController()))
usersRouter.delete('/:userId', adaptRoute(makeRemoveUserController()))

export { usersRouter }
