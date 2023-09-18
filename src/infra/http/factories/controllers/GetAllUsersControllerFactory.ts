import { Controller } from "../../../../core/infra/Controller";
import { PrismaUserRepository } from "../../../../modules/user/repositories/prisma/PrismaUserRepository";
import { GetAllUsers } from "../../../../modules/user/useCases/GetAllUsers/GetAllUsers";
import { GetAllUsersController } from "../../../../modules/user/useCases/GetAllUsers/GetAllUsersController";

export function makeGetAllUsersController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const getAllUsers = new GetAllUsers(prismaUserRepository)
  const getAllUsersController = new GetAllUsersController(getAllUsers)

  return getAllUsersController
}