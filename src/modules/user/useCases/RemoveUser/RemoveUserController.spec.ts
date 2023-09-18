/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from "supertest"
import { prisma } from "./../../../../infra/prisma/client"
import crypto from 'crypto';
import { app } from "./../../../../infra/http/app";

describe('Remove user controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve ser possível remover um usuário', async () => {
    const id = crypto.randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: id,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        }
      ]
    })

    const response = await request(app)
      .delete(`/users/${id}`)
      .send()

      expect(response.status).toBe(200)
  })
})