import { Controller } from "../../../../core/infra/Controller";
import { PrismaUserRepository } from "../../../../modules/user/repositories/prisma/PrismaUserRepository";
import { RemoveUser } from "../../../../modules/user/useCases/RemoveUser/RemoveUser";
import { RemoveUserController } from "../../../../modules/user/useCases/RemoveUser/RemoveUserController";

export function makeRemoveUserController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const removeUser = new RemoveUser(prismaUserRepository)
  const removeUserController = new RemoveUserController(removeUser)

  return removeUserController
}