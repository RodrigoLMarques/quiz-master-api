import { Controller } from "../../../../core/infra/Controller";
import { RegisterUser } from "../../../../modules/user/useCases/RegisterUser/RegisterUser";
import { RegisterUserController } from "../../../../modules/user/useCases/RegisterUser/RegisterUserController";
import { PrismaUserRepository } from "../../../../modules/user/repositories/prisma/PrismaUserRepository";

export function makeRegisterUserController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUser = new RegisterUser(prismaUserRepository)
  const registerUserController = new RegisterUserController(registerUser)

  return registerUserController
}