/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { prisma } from '../../../../infra/prisma/client'
import { app } from '../../../../infra/http/app'
import request from 'supertest'
import crypto from 'crypto';
import bcrypt from 'bcryptjs'

describe('Authenticate user controller', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await bcrypt.hash('123456', 8),
      },
    })
  })
  
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve ser possível autenticar um usuário', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        'email': 'johndoe@example.com',
        'password': '123456'
      })
    
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String)
      })
    )
  })

  it('deve ser rejeitado ao autenticar com email inválido', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        'email': 'invalid@example.com',
        'password': '123456'
      })

    expect(response.status).toBe(400)
  })

  it('deve ser rejeitado ao autenticar com senha inválida', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        'email': 'johndoe@example.com',
        'password': 'invalid-password'
      })

    expect(response.status).toBe(400)
  })
})
