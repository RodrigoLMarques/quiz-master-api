/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest'
import { prisma } from "./../../../../infra/prisma/client"
import crypto from 'crypto';
import { app } from './../../../../infra/http/app';

describe('Get all users controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve ser possível listar todos os usuários', async () => {
    await prisma.user.createMany({
      data: [
        {
          id: crypto.randomUUID(),
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        },
        {
          id: crypto.randomUUID(),
          name: 'John Doe 2',
          email: 'johndoe2@example.com',
          password: '123456',
        }
      ]
    })

    const response = await request(app)
      .get('/users')
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      data: [
        expect.objectContaining({
          name: 'John Doe',
        }),
        expect.objectContaining({
          name: 'John Doe 2',
        }),
      ],
    })
  })
})