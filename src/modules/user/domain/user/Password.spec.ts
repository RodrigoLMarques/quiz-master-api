import { Password } from "./Password"
import bcrypt from 'bcryptjs'

describe('User password value object', () => {
  it('deve ser aceito uma senha válida', () => {
    expect(() => Password.create('123456')).not.toThrow()
  })

  it('deve ser rejeitado uma senha com menos de 6 caracteres', () => {
    expect(() => Password.create('12345')).toThrow()
  })

  it('deve ser rejeitado uma senha com menos de 6 caracteres', () => {
    expect(() => Password.create('1'.repeat(260))).toThrow()
  })

  it('deve ser possível fazer o hash da senha', async () => {
    const password = Password.create('123456')
    const hashedPassword = await password.getHashedValue()

    expect(await bcrypt.compare('123456', hashedPassword)).toBeTruthy()
  })

  it('deve ser possível comparar senha quando não está em hash', async () => {
    const password = Password.create('123456')
    
    expect(password.comparePassword('123456')).toBeTruthy()
  })

  it('deve ser possível comparar senha quando está em hash', async () => {
    const hashedPassword = await bcrypt.hash('123456', 8)
    const password = Password.create(hashedPassword, true)
    
    expect(password.comparePassword('123456')).toBeTruthy()
  })
})