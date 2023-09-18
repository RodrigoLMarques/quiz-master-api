import { Name } from './Name'

describe('User name value object', () => {
  it('deve aceitar um nome válido', () => {
    expect(() => Name.create('John Doe')).not.toThrow()
  });  

  it('deve rejeitar nome com menos de 2 caracteres', () => {
    expect(() => Name.create('J')).toThrow()
  })

  it('deve rejeitar nome com mais de 255 caracteres', () => {
    expect(() => Name.create('J'.repeat(260))).toThrow()
  })
})