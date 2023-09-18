import { Email } from "./Email"


describe('User email value object', () => {
  it('deve ser aceito um email válido', () => {
    expect(() => Email.create('johndoe@example.com')).not.toThrow()
  })

  it('deve rejeitar email inválido', () => {
    expect(() => Email.create('johndo')).toThrow()
    expect(() => Email.create('johndoe@example')).toThrow()
    expect(() => Email.create('@example.com')).toThrow()
    expect(() => Email.create('johndoe@example.')).toThrow()
  })

  it('deve rejeitar email com mais de 255 caracteres', () => {
    expect(() => Email.create(`johndoe@${'c'.repeat(260)}.com`)).toThrow()
  })
})