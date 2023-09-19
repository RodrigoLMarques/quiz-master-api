import { Controller } from "../../../../core/infra/Controller";
import { PrismaUserRepository } from "../../../../modules/user/repositories/prisma/PrismaUserRepository";
import { GetUserDetailsController } from "./../../../../modules/user/useCases/GetUserDetails/GetUserDetailsController";
import { GetUserDetails } from "./../../../../modules/user/useCases/GetUserDetails/GetUserDetails";

export function makeGetUserDetailsController(): Controller {
  const prismaUserRepository = new PrismaUserRepository()
  const getUserDetails = new GetUserDetails(prismaUserRepository)
  const getUserDetailsController = new GetUserDetailsController(getUserDetails)

  return getUserDetailsController
}