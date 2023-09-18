import { sign, verify } from "jsonwebtoken"

import { auth } from "../../../../config/auth"

import { InvalidJWTTokenError } from "./errors/InvalidJWTTokenError"
import { User } from "./User"

type JWTData = {
  userId: string
  token: string
}

export interface JWTTokenPayload {
  exp: number
  sub: string
}

export class JWT {
  public readonly userId: string
  public readonly token: string

  private constructor ({ userId, token }: JWTData) {
    this.userId = userId
    this.token = token
  }

  static decodeToken (token: string): JWTTokenPayload {
    try {
      const decoded = verify(token, auth.secretKey) as JWTTokenPayload
      return decoded
    } catch (err) {
      throw new InvalidJWTTokenError()
    }
  }

  static createFromJWT (token: string): JWT {
    const jwtPayload = this.decodeToken(token)
    const jwt = new JWT({ userId: jwtPayload.sub, token: token })

    return jwt
  }

  static signUser (user: User): JWT {
    const token = sign({}, auth.secretKey, {
      subject: user.id,
      expiresIn: auth.expiresIn,
    })

    const jwt = new JWT({ userId: user.id, token })

    return jwt
  }
}