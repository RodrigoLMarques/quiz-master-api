import { Controller } from "../../../../core/infra/Controller";
import { AuthenticateUser } from "./../../../../modules/user/useCases/AuthenticateUser/AuthenticateUser"
import { AuthenticateUserController } from "./../../../../modules/user/useCases/AuthenticateUser/AuthenticateUserController"
import { PrismaUserRepository } from "../../../../modules/user/repositories/prisma/PrismaUserRepository";

export function makeAuthenticateUserController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUser = new AuthenticateUser(prismaUserRepository)
  const authenticateUserController = new AuthenticateUserController(authenticateUser)

  return authenticateUserController
}
