/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest'
import { prisma } from "./../../../../infra/prisma/client"
import crypto from 'crypto';
import { app } from './../../../../infra/http/app';

describe('Get user details controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve ser possível buscar um usuário', async () => {
    const userId = crypto.randomUUID()

    await prisma.user.createMany({
      data: [
        {
          id: userId,
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        }
      ]
    })

    const response = await request(app)
      .get(`/users/${userId}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
      }
    })
  })
})