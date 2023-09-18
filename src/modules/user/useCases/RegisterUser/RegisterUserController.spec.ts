/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { prisma } from '../../../../infra/prisma/client'
import { app } from '../../../../infra/http/app'
import request from 'supertest'

describe('Register User Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('deve ser possível registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
        password_confirmation: '123456'
      })

      expect(response.status).toBe(201)
      expect(response).toHaveProperty('error')

      const userInDatabase = await prisma.user.findUnique({
        where: { email: 'john@doe.com' },
      })
  
      expect(userInDatabase).toBeTruthy()
  })

  it('deve retornar um erro se a validação de confirmação de senha falhar', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
        password_confirmation: '654321'
      })

      expect(response.status).toBe(400)
  })

  it('deve retornar um erro se a validação do corpo de requisição', async () => {
    const response = await request(app)
      .post('/users')
      .send({})

      expect(response.status).toBe(400)
  })
})